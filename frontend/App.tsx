import React, { useState, useEffect } from "react";
import { CommuteDataResponse } from "../api";
import { fetchCommuteData } from "./api-client";

import { LocationToggle } from "./LocationToggle";
import { BusETAList } from "./BusETA";
import { CabiStationList } from "./CabiStations";
import { TrainETAList } from "./TrainETA";

const App: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<string>("home");

  const [commuteDataResponse, setCommuteDataResponse] = useState<
    CommuteDataResponse | undefined
  >(undefined);


  const fetchAndUpdateCommuteData = (location: string) => {
    fetchCommuteData(location).then((apiResponse) =>
      setCommuteDataResponse(apiResponse),
    );
  };

  useEffect(() => {
    fetchAndUpdateCommuteData(currentLocation);
    const intervalId = setInterval(() => {
      fetchAndUpdateCommuteData(currentLocation);
    }, 10 * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [currentLocation]);

  return (
    <>
      <LocationToggle
        currentLocation={currentLocation}
        onToggleCurrentLocation={(newLocation) => {
          setCommuteDataResponse(undefined);
          setCurrentLocation(newLocation);
        }}
      />
      <BusETAList busETAs={commuteDataResponse?.busETAs} />
      <TrainETAList trainETAs={commuteDataResponse?.trainETAs} />
      <CabiStationList cabiStations={commuteDataResponse?.cabiStations} />
    </>
  );
};

export default App;
