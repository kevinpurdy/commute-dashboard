import { URL } from "url";
import config from "./config";

// This is the type returned from the WMATA API
type Prediction = {
  RouteID: string;
  DirectionText: string;
  DirectionNum: string;
  Minutes: number;
  VehicleID: string;
  TripID: string;
};

export type BusETA = {
  minutes: number;
  routeID: string;
  vehicleID: string;
  directionText: string;
};

const buildPredictionsRequestUrl = (stopID: string): string => {
  const parsedUrl = new URL(config.wmataBusPredictionsEndpoint);
  parsedUrl.searchParams.append("StopID", stopID);
  parsedUrl.searchParams.append("api_key", config.wmataAPIKey);
  return parsedUrl.toString();
};

const convertPredicationsIntoBusEta = (predictions: Prediction[]): BusETA[] => {
  return predictions.map((prediction) => ({
    minutes: prediction.Minutes,
    routeID: prediction.RouteID,
    vehicleID: prediction.VehicleID,
    directionText: prediction.DirectionText.replace(
      /(North|South|East|West) to /,
      "",
    ),
  }));
};

const getBusETAsForStop = async (stopID: string): Promise<BusETA[]> => {
  const url = buildPredictionsRequestUrl(stopID);
  const apiResponse = await fetch(url).then((response) => response.json());
  const predictions = apiResponse["Predictions"] as Prediction[];
  return convertPredicationsIntoBusEta(predictions);
};

export const getBusETAs = async ({
  stopIDs,
}: {
  stopIDs: string[];
}): Promise<BusETA[]> => {
  const result = await Promise.all(
    stopIDs.map((stopID) => getBusETAsForStop(stopID)),
  );
  return result
    .flat()
    .sort((a, b) => a.minutes - b.minutes)
    .slice(0, config.maxBusETACount);
};
