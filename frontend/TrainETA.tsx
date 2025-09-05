import React from "react";
import { TrainETA } from "../api/metroeta";
import { Header } from "./Header";

type TrainETAListProps = {
  trainETAs?: TrainETA[];
};
type TrainETATableProps = {
  trainETAs: TrainETA[];
};

const TrainETATable: React.FC<TrainETATableProps> = ({
  trainETAs,
}: TrainETATableProps) => {
  return (
    <table className="bus-eta-table">
      <thead>
        <tr>
          <th>Line</th>
          <th>Destination</th>
          <th>ETA</th>
        </tr>
      </thead>
      <tbody>
        {trainETAs.map((trainETA, index) => {
          return (
            <tr key={index}>
              <td className="line-cell">{trainETA.line}</td>
              <td>{trainETA.destination}</td>
              {trainETA.minutes > 0 ? (
                <td>{trainETA.minutes} min</td>
              ) : (
                <td>ARR</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export const TrainETAList: React.FC<TrainETAListProps> = ({
  trainETAs,
}: TrainETAListProps) => {
  let content;
  if (trainETAs === undefined) {
    content = <p>Loading...</p>;
  } else if (trainETAs.length === 0) {
    content = <p>There are no trains to display.</p>;
  } else {
    content = <TrainETATable trainETAs={trainETAs} />;
  }

  return (
    <>
      <Header>Train ETAs</Header>
      {content}
    </>
  );
};
