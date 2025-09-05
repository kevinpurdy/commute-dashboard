import { getTrainEtas, TrainETA } from ".";
import nock from "nock";

jest.mock("./config.ts", () => ({
  wmataAPIKey: "test-api-key",
  metroTrainPredictionsEndpoint: "http://example.com/trains",
  maxMetroTrainETACount: 10,
}));

describe("getTrainEtas", () => {
  it("makes a request to the Predication API and returns the ETAs", async () => {
    const apiResponse = {
      Trains: [
        {
          Car: "8",
          Destination: "Glenmont",
          DestinationCode: "B11",
          DestinationName: "Glenmont",
          Group: "1",
          Line: "RD",
          LocationCode: "A01",
          LocationName: "Metro Center",
          Min: "4",
        },
        {
          Car: "6",
          Destination: "Shady Grove",
          DestinationCode: null,
          DestinationName: "Shady Grove",
          Group: "2",
          Line: "RD",
          LocationCode: "A01",
          LocationName: "Metro Center",
          Min: "5",
        },
      ],
    };

    nock("http://example.com")
      .get("/trains/A01")
      .query({ api_key: "test-api-key" })
      .reply(200, apiResponse);

    const expectedResult: TrainETA[] = [
      {
        minutes: 4,
        line: "RD",
        destination: "Glenmont",
        carCount: 8,
      },
      {
        minutes: 5,
        line: "RD",
        destination: "Shady Grove",
        carCount: 6,
      },
    ];

    const result = await getTrainEtas({ stationIDs: ["A01"] });
    expect(result).toEqual(expectedResult);
  });
});
