import React, { useState, useEffect } from "react";
import { CommuteDataResponse } from "../api";
import { fetchCommuteData } from "./api-client";

import { BusETAList } from "./BusETA";

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
    }, 60 * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <h1>Commute Dashboard</h1>
      <BusETAList busETAs={commuteDataResponse?.busETAs || []} />
      <p>Frontend is ready with vigor!</p>
    </div>
  );
};

export default App;
