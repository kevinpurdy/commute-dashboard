import React from "react";

export const Header: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <header className="header">
      <h1>{children}</h1>
    </header>
  );
};
