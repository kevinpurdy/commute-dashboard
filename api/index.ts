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

type Location = "home" | "work";

export type CommuteDataResponse = {
  busETAs: BusETA[];
  trainETAs: TrainETA[];
  cabiStations: CabiStation[];
};

const parseLocationParam = (param: string): Location | null => {
  if (param === "home" || param === "work") {
    return param;
  }
  return null;
};

app.get("/api/commute-data/:location", async (req, res) => {
  const location = parseLocationParam(req.params.location);

  if (!location) {
    return res.status(404).json({ message: "Location not found" });
  }

  const responseBody = await cacheApiResponse<CommuteDataResponse>(
    `/api/commute-data/${location}`,
    10,
    async () => {
      const busETAs = await getBusETAs({
        stopIDs: config.wmataBusStopIDs[location],
      });
      const trainETAs = await getTrainEtas({
        stationIDs: config.metroRailStationCodes[location],
      });
      const cabiStations = await getCabiStationStatuses({
        stationIDs: config.cabiStationIDs[location],
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
