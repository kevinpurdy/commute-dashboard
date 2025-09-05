import { CommuteDataResponse } from "../api";

export const fetchCommuteData = async (): Promise<CommuteDataResponse> => {
  const url = "/api/commute-data";
  const apiResponse = (await fetch(url).then((repsonse) =>
    repsonse.json(),
  )) as CommuteDataResponse;
  return apiResponse;
};
