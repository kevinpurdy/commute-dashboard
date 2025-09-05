import "dotenv/config";

import config from "./config";

import { getBusETAs } from "./buseta";
import { getTrainEtas } from "./metroeta";
import { getCabiStationStatuses } from "./cabistatus";

import express from "express";
import { createServer } from "http";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", async (req, res) => {
  const busETAs = await getBusETAs({ stopIDs: config.wmataBusStopIDs });
  const trainETAs = await getTrainEtas({
    stationIDs: config.metroRailStationCodes,
  });
  const cabiStations = await getCabiStationStatuses({
    stationIDs: config.cabiStationIDs,
  });
  res.send({ busETAs, trainETAs, cabiStations });
});

const server = createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
