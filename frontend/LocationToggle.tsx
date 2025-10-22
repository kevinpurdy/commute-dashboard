import React from "react";
import { Header } from "./Header";

export type LocationToggleProps = {
  currentLocation: string;
  onToggleCurrentLocation: (newLocation: string) => void;
};
const LocationToggleButtons: React.FC<LocationToggleProps> = ({
  currentLocation,
  onToggleCurrentLocation,
}) => {
  return (
    <div className="location-toggle">
      <a
        className={
          currentLocation === "home"
            ? "location-toggle-button location-toggle-button-active"
            : "location-toggle-button"
        }
        href="#"
        onClick={() => onToggleCurrentLocation("home")}
      >
        Home
      </a>
      <a
        className={
          currentLocation === "work"
            ? "location-toggle-button location-toggle-button-active"
            : "location-toggle-button"
        }
        href="#"
        onClick={() => onToggleCurrentLocation("work")}
      >
        Work
      </a>
    </div>
  );
};

export const LocationToggle: React.FC<LocationToggleProps> = (props) => {
  return (
    <>
      <Header>Location</Header>
      <LocationToggleButtons {...props} />
    </>
  );
};
