import "dotenv/config";

import config from "./config";
import { cacheApiResponse } from "./cache";

import { BusETA, getBusETAs } from "./buseta";
import { getTrainEtas, TrainETA } from "./metroeta";
import {
  getCabiStationStatuses,
  StationStatus as CabiStation,
} from "./cabistatus";

import express from "express";
import { createServer } from "http";
import morgan from "morgan";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("common"));
app.use(express.json());

app.use(express.static(path.join(process.cwd(), "public")));

export type CommuteDataResponse = {
  busETAs: BusETA[];
  trainETAs: TrainETA[];
  cabiStations: CabiStation[];
};
app.get("/api/commute-data", async (req, res) => {
  const responseBody = await cacheApiResponse<CommuteDataResponse>(
    "/api/commute-data",
    10,
    async () => {
      const busETAs = await getBusETAs({ stopIDs: config.wmataBusStopIDs });
      const trainETAs = await getTrainEtas({
        stationIDs: config.metroRailStationCodes,
      });
      const cabiStations = await getCabiStationStatuses({
        stationIDs: config.cabiStationIDs,
      });
      return { busETAs, trainETAs, cabiStations };
    },
  );

  res.send(responseBody);
});

const server = createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
