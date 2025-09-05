import React from "react";
import { BusETA } from "../api/buseta";
import { Header } from "./Header";

type BusETAListProps = {
  busETAs?: BusETA[];
};
type BusETATableProps = {
  busETAs: BusETA[];
};

const BusETATable: React.FC<BusETATableProps> = ({
  busETAs,
}: BusETATableProps) => {
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
        {busETAs.map((busETA, index) => {
          return (
            <tr key={index}>
              <td className="line-cell">{busETA.routeID}</td>
              <td>{busETA.directionText}</td>
              <td>{busETA.minutes} min</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export const BusETAList: React.FC<BusETAListProps> = ({
  busETAs,
}: BusETAListProps) => {
  let content;
  if (busETAs === undefined) {
    content = <p>Loading...</p>;
  } else if (busETAs.length === 0) {
    content = <p>There are no buses to display.</p>;
  } else {
    content = <BusETATable busETAs={busETAs} />;
  }

  return (
    <>
      <Header>Bus ETAs</Header>
      {content}
    </>
  );
};
