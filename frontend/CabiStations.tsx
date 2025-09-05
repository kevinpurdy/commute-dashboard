import React from "react";
import { StationStatus as CabiStation } from "../api/cabistatus";
import { Header } from "./Header";

type CabiStationListProps = {
  cabiStations?: CabiStation[];
};
type CabiStationTableProps = {
  cabiStations: CabiStation[];
};

const CabiStationTable: React.FC<CabiStationTableProps> = ({
  cabiStations,
}: CabiStationTableProps) => {
  return (
    <table className="bus-eta-table">
      <thead>
        <tr>
          <th>Station</th>
          <th>eBikes</th>
          <th>Classic</th>
          <th>Open</th>
        </tr>
      </thead>
      <tbody>
        {cabiStations.map((cabiStation, index) => {
          return (
            <tr key={index}>
              <td className="line-cell">{cabiStation.stationName}</td>
              <td className="count-cell">{cabiStation.ebikesAvailable}</td>
              <td className="count-cell">
                {cabiStation.classicBikesAvailable}
              </td>
              <td className="count-cell">{cabiStation.docksAvailable}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export const CabiStationList: React.FC<CabiStationListProps> = ({
  cabiStations,
}: CabiStationListProps) => {
  let content;
  if (cabiStations === undefined) {
    content = <p>Loading...</p>;
  } else if (cabiStations.length === 0) {
    content = <p>There are no stations to display.</p>;
  } else {
    content = <CabiStationTable cabiStations={cabiStations} />;
  }

  return (
    <>
      <Header>CaBi Stations</Header>
      {content}
    </>
  );
};
