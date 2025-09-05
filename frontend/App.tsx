import React, { useState, useEffect } from "react";
import { CommuteDataResponse } from "../api";
import { fetchCommuteData } from "./api-client";

import { BusETAList } from "./BusETA";
import { CabiStationList } from "./CabiStations";
import { TrainETAList } from "./TrainETA";

const App: React.FC = () => {
  const [commuteDataResponse, setCommuteDataResponse] = useState<
    CommuteDataResponse | undefined
  >(undefined);

  const fetchAndUpdateCommuteData = () => {
    fetchCommuteData().then((apiResponse) =>
      setCommuteDataResponse(apiResponse),
    );
  };

  useEffect(() => {
    fetchAndUpdateCommuteData();
    const intervalId = setInterval(() => {
      fetchAndUpdateCommuteData();
    }, 10 * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <BusETAList busETAs={commuteDataResponse?.busETAs} />
      <TrainETAList trainETAs={commuteDataResponse?.trainETAs} />
      <CabiStationList cabiStations={commuteDataResponse?.cabiStations} />
    </>
  );
};

export default App;
