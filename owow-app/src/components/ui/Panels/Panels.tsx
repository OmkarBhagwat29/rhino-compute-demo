import React from "react";
import DataVis from "./DataVis";
import { useOWowApp } from "@/context/OWowAppProvider";
import Automation from "./Automation";
import IO from "./IO";

const Panels = () => {
  const { topFeatureBtn } = useOWowApp();
  return (
    <div className="absolute right-5 top-10 bottom-10 z-50 ">
      {topFeatureBtn.name === "Data Visualization" && topFeatureBtn.active && (
        <DataVis />
      )}

      {topFeatureBtn.name === "Automation" && topFeatureBtn.active && (
        <Automation />
      )}

      {topFeatureBtn.name === "I/O" && topFeatureBtn.active && <IO />}
    </div>
  );
};

export default Panels;
