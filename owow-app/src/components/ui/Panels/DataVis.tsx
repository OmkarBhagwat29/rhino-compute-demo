import { useOWowApp } from "@/context/OWowAppProvider";
import { IDataCategory } from "@/props/IDataVisProps";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

const DataVis = () => {
  const { dataViz } = useOWowApp();
  const [hide, setHide] = useState(false);
  const onEyeClick = (ct: IDataCategory) => {
    ct.objects.forEach((obj) => {
      obj.visible = !obj.visible;
    });
    ct.hide = !ct.hide;
    setHide(!hide);
  };

  return (
    <div className="w-72 h-80 bg-gray-300/75  rounded-md overflow-auto border">
      <div className="text-black p-2 px-4">
        {dataViz.categories.map((ct) => {
          return (
            <div
              className="cursor-pointer select-none flex flex-col gap-1 hover:bg-amber-300/70 p-1 rounded-sm"
              key={ct.name}
            >
              <div className="flex flex-row gap-2 ">
                {ct.hide ? (
                  <EyeOff size={16} onClick={() => onEyeClick(ct)} />
                ) : (
                  <Eye
                    size={16}
                    onClick={() => {
                      onEyeClick(ct);
                    }}
                  />
                )}

                <label>
                  {ct.name} ({ct.objects.length})
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataVis;
