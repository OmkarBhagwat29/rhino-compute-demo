import React from "react";
import DataVis from "./DataVis";
import { useOWowApp } from "@/context/OWowAppProvider";
import Automation from "./Automation";
import IO from "./IO";
import TextResult from "../TextResult";

const Panels = () => {
  const { topFeatureBtn } = useOWowApp();
  return (
    <>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col justify-center">
        {topFeatureBtn.name === "Data Visualization" &&
          topFeatureBtn.active && <DataVis />}

        {topFeatureBtn.name === "Automation" && topFeatureBtn.active && (
          <>
            <Automation />
          </>
        )}

        {topFeatureBtn.name === "I/O" && topFeatureBtn.active && <IO />}
      </div>

      {<TextResult />}
    </>
  );
};

export default Panels;
