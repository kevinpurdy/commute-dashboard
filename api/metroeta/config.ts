export default {
  wmataAPIKey: process.env.WMATA_API_KEY as string,
  metroTrainPredictionsEndpoint:
    "http://api.wmata.com/StationPrediction.svc/json/GetPrediction/",
  maxMetroTrainETACount: Number(process.env.MAX_METRO_TRAIN_ETA_COUNT) || 10,
};
