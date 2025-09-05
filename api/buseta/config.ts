export default {
  wmataAPIKey: process.env.WMATA_API_KEY as string,
  wmataBusPredictionsEndpoint:
    "http://api.wmata.com/NextBusService.svc/json/jPredictions",
  maxBusETACount: Number(process.env.MAX_BUS_ETA_COUNT) || 10,
};
