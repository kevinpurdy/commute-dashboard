import React from "react";
import { BusETA } from "../api/buseta";

type BusETAListProps = {
  busETAs: BusETA[];
};

export const BusETAList: React.FC<BusETAListProps> = ({
  busETAs,
}: BusETAListProps) => {
  return <div>Bus ETAs here: {JSON.stringify(busETAs)}</div>;
};
