import { CommuteDataResponse } from "../api";

export const fetchCommuteData = async (
  location: string,
): Promise<CommuteDataResponse> => {
  const url = `/api/commute-data/${location}`;
  const apiResponse = (await fetch(url).then((repsonse) =>
    repsonse.json(),
  )) as CommuteDataResponse;
  return apiResponse;
};
