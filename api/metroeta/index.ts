import config from "./config";

// This is the type returned by the API
type Train = {
  Car: string;
  Destination: string;
  DestinationCode: string;
  DestinationName: string;
  Group: string;
  Line: string;
  LocationCode: string;
  LocationName: string;
  Min?: string;
};

export type TrainETA = {
  minutes: number;
  line: string;
  destination: string;
  carCount: number;
};

const buildTrainRequestUrl = (stationIDs: string[]): string => {
  const parsedUrl = new URL(config.metroTrainPredictionsEndpoint);
  parsedUrl.pathname += "/" + stationIDs.join(",");
  parsedUrl.searchParams.append("api_key", config.wmataAPIKey);
  return parsedUrl.toString();
};

const convertTrainResponseToTrainETA = (trains: Train[]): TrainETA[] => {
  return trains.map((train) => ({
    minutes: Number(train.Min) || 0,
    line: train.Line,
    destination: train.Destination,
    carCount: Number(train.Car),
  }));
};

export const getTrainEtas = async ({
  stationIDs,
}: {
  stationIDs: string[];
}): Promise<TrainETA[]> => {
  const url = buildTrainRequestUrl(stationIDs);
  const apiResponse = await fetch(url).then((response) => response.json());
  const trains = apiResponse["Trains"] as Train[];
  return convertTrainResponseToTrainETA(trains)
    .sort((a, b) => a.minutes - b.minutes)
    .slice(0, config.maxMetroTrainETACount);
};
