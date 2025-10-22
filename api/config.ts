const splitCommaSeperatedValue = (value: string | undefined): string[] => {
  if (!value) {
    return [];
  } else {
    return value.split(",");
  }
};

export default {
  wmataBusStopIDs: {
    home: splitCommaSeperatedValue(process.env.WMATA_BUS_STOP_IDS_HOME),
    work: splitCommaSeperatedValue(process.env.WMATA_BUS_STOP_IDS_WORK),
  },
  metroRailStationCodes: {
    home: splitCommaSeperatedValue(process.env.METRO_RAIL_STATION_CODES_HOME),
    work: splitCommaSeperatedValue(process.env.METRO_RAIL_STATION_CODES_WORK),
  },
  cabiStationIDs: {
    home: splitCommaSeperatedValue(process.env.CABI_STATION_IDS_HOME),
    work: splitCommaSeperatedValue(process.env.CABI_STATION_IDS_WORK),
  },
};
