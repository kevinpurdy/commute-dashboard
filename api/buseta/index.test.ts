import { getBusETAs, BusETA } from ".";
import nock from "nock";

jest.mock("./config.ts", () => ({
  wmataAPIKey: "test-api-key",
  wmataBusPredictionsEndpoint: "http://example.com/predictions",
  maxBusETACount: 10,
}));

describe("getBusETAs", () => {
  it("makes a request to the Predication API and returns the ETAs", async () => {
    const apiResponse = {
      Predictions: [
        {
          RouteID: "D70",
          DirectionText: "South to Farragut Sq",
          DirectionNum: "1",
          Minutes: 5,
          VehicleID: "123",
          TripID: "321",
        },
        {
          RouteID: "D70",
          DirectionText: "South to Farragut Sq",
          DirectionNum: "1",
          Minutes: 10,
          VehicleID: "456",
          TripID: "654",
        },
      ],
    };

    nock("http://example.com")
      .get("/predictions")
      .query({ api_key: "test-api-key", StopID: "test-id" })
      .reply(200, apiResponse);

    const expectedResult: BusETA[] = [
      {
        minutes: 5,
        routeID: "D70",
        vehicleID: "123",
        directionText: "South to Farragut Sq",
      },
      {
        minutes: 10,
        routeID: "D70",
        vehicleID: "456",
        directionText: "South to Farragut Sq",
      },
    ];

    const result = await getBusETAs({ stopIDs: ["test-id"] });
    expect(result).toEqual(expectedResult);
  });
});
