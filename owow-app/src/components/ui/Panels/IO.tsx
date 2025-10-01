import React from "react";
import Button from "../ParamInputs/Button";
import { writeIfc } from "@/core/ifc/ifc-export-helper";
import { themes } from "../theme";
import { useOWowApp } from "@/context/OWowAppProvider";

const IO = () => {
  const theme = themes.gray;
  const { wallResult } = useOWowApp();
  return (
    <div className="flex justify-center w-32 h-full bg-gray-300/75 rounded-md p-2">
      <Button
        className={`${theme.button} p-2 text-black border`}
        name="Export IFC"
        onClick={async () => {
          if (!wallResult) return;

          await writeIfc(wallResult.wall, wallResult.studs);
        }}
      />
    </div>
  );
};

export default IO;
