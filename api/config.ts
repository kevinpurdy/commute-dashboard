export default {
  wmataBusStopIDs: (process.env.WMATA_BUS_STOP_IDS || "").split(","),
  metroRailStationCodes: (process.env.METRO_RAIL_STATION_CODES || "").split(
    ",",
  ),
};
