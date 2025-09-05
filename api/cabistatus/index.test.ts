import { getCabiStationStatuses, StationStatus } from ".";
import nock from "nock";

jest.mock("./config.ts", () => ({
  cabiStationInfoEndpont: "http://example.com/info.json",
  cabiStationStatusEndpoint: "http://example.com/status.json",
}));

describe("getCabiStationStatuses", () => {
  it("gets the status of the given cabi stations", async () => {
    const infoAPIResponse = {
      data: {
        stations: [
          {
            station_id: "station-123",
            name: "Test Station",
          },
        ],
      },
    };
    const statusApiResponse = {
      data: {
        stations: [
          {
            station_id: "station-123",
            num_docks_available: 1,
            num_bikes_available: 5,
            num_ebikes_available: 3,
          },
        ],
      },
    };

    nock("http://example.com").get("/info.json").reply(200, infoAPIResponse);
    nock("http://example.com")
      .get("/status.json")
      .reply(200, statusApiResponse);

    const expectedResult: StationStatus[] = [
      {
        stationName: "Test Station",
        docksAvailable: 1,
        ebikesAvailable: 3,
        classicBikesAvailable: 2,
      },
    ];

    const result = await getCabiStationStatuses({
      stationIDs: ["station-123"],
    });
    expect(result).toEqual(expectedResult);
  });
});
