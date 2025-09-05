import config from "./config";

type StationStatusResponseStation = {
  station_id: string;
  num_docks_available: number;
  num_bikes_available: number;
  num_ebikes_available: number;
};

type StationStatusResponseBody = {
  data: {
    stations: StationStatusResponseStation[];
  };
};

type StationInfoResponseBody = {
  data: {
    stations: {
      station_id: string;
      name: string;
    }[];
  };
};

export type StationStatus = {
  stationName: string;
  docksAvailable: number;
  ebikesAvailable: number;
  classicBikesAvailable: number;
};

const getStationNamesById = async (): Promise<Record<string, string>> => {
  const apiResponse = (await fetch(config.cabiStationInfoEndpont).then(
    (response) => response.json(),
  )) as StationInfoResponseBody;
  const result: Record<string, string> = {};
  apiResponse.data.stations.forEach((stationInfo) => {
    result[stationInfo.station_id] = stationInfo.name;
  });
  return result;
};

const getStationStatusesById = async (): Promise<
  Record<string, StationStatusResponseStation>
> => {
  const apiResponse = (await fetch(config.cabiStationStatusEndpoint).then(
    (response) => response.json(),
  )) as StationStatusResponseBody;
  const result: Record<string, StationStatusResponseStation> = {};
  apiResponse.data.stations.forEach((stationStatus) => {
    result[stationStatus.station_id] = stationStatus;
  });
  return result;
};

export const getCabiStationStatuses = async ({
  stationIDs,
}: {
  stationIDs: string[];
}): Promise<StationStatus[]> => {
  const stationNamesById = await getStationNamesById();
  const stationStatusesById = await getStationStatusesById();
  return stationIDs.map((stationID) => {
    const stationStatusResponse = stationStatusesById[stationID];
    return {
      stationName: stationNamesById[stationID],
      docksAvailable: stationStatusResponse.num_docks_available,
      ebikesAvailable: stationStatusResponse.num_ebikes_available,
      classicBikesAvailable:
        stationStatusResponse.num_bikes_available -
        stationStatusResponse.num_ebikes_available,
    };
  });
};
