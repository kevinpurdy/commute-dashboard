require("dotenv").config();

import config from "./config";

import { getBusETAs } from "./buseta";

import express from "express";
import { createServer } from "http";
import { getTrainEtas } from "./metroeta";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", async (req, res) => {
  const busETAs = await getBusETAs({ stopIDs: config.wmataBusStopIDs });
  const trainETAs = await getTrainEtas({
    stationIDs: config.metroRailStationCodes,
  });
  res.send({ busETAs, trainETAs });
});

const server = createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
