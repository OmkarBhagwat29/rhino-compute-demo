import React, { useCallback } from "react";
import CollapsablePanel from "../../ParamInputs/CollapsablePanel";
import { useOWowApp } from "@/context/OWowAppProvider";
import { themes } from "../../theme";
import { debounce } from "lodash";
import { IWallProps } from "@/props/IWallProps";
import Slider from "../../ParamInputs/Slider";
import NumberInput from "../../ParamInputs/NumberInput";

const ConfigAutomation = () => {
  const { wallParams, setWallParams } = useOWowApp();
  const theme = themes.gray;

  const debouncedValueChange = useCallback(
    debounce((value: IWallProps) => {
      //update wall params
      //console.log("updateing...", value);
      setWallParams(value);
    }, 500),
    []
  );
  return (
    <div className="flex justify-center items-center w-full bg-gray-300/75 border rounded-md select-none overflow-y-auto">
      <div className="text-black px-4 p-2">
        <div className="flex flex-col gap-4">
          <div>
            <CollapsablePanel
              title="Window - A"
              className={`${theme.collapseContainer} rounded-md relative`}
              headerClassName={`${theme.collapseHeader}  p-1 h-full border-2 rounded-md`}
            >
              <div className="mt-2 px-4 pb-2">
                <div className="flex flex-row pt-8">
                  <label className="text-sm">Width:</label>
                  <div className="px-4 w-full">
                    <Slider
                      value={wallParams.width_A}
                      start={0.25}
                      end={2.5}
                      units="mts"
                      step={0.01}
                      theme={{
                        track: theme.sliderTrack,
                        fill: theme.sliderFill,
                        thumb: theme.sliderThumb,
                        valueLabel: theme.sliderValue,
                      }}
                      onChange={(e) => {
                        debouncedValueChange({
                          ...wallParams,
                          width_A: e,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-row pt-10 text-sm">
                  <label className="text-sm">Height:</label>
                  <div className="w-full px-4">
                    <Slider
                      value={wallParams.height_A}
                      start={1}
                      end={2}
                      units="mts"
                      step={0.01}
                      theme={{
                        track: theme.sliderTrack,
                        fill: theme.sliderFill,
                        thumb: theme.sliderThumb,
                        valueLabel: theme.sliderValue,
                      }}
                      onChange={(e) => {
                        debouncedValueChange({
                          ...wallParams,
                          height_A: e,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </CollapsablePanel>
          </div>

          <div>
            <CollapsablePanel
              title="Window - B"
              className={`${theme.collapseContainer} rounded-md relative`}
              headerClassName={`${theme.collapseHeader}  p-1 h-full border-2 rounded-md`}
            >
              <div className="mt-2 px-4 pb-2">
                <div className="flex flex-row pt-8">
                  <label className="text-sm">Width:</label>
                  <div className="w-full px-4">
                    <Slider
                      value={wallParams.width_B}
                      start={0.25}
                      end={2.5}
                      units="mts"
                      step={0.01}
                      theme={{
                        track: theme.sliderTrack,
                        fill: theme.sliderFill,
                        thumb: theme.sliderThumb,
                        valueLabel: theme.sliderValue,
                      }}
                      onChange={(e) => {
                        debouncedValueChange({
                          ...wallParams,
                          width_B: e,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-row pt-10">
                  <label className="text-sm">Height:</label>
                  <div className="w-full px-4">
                    <Slider
                      value={wallParams.height_B}
                      start={1}
                      end={2}
                      units="mts"
                      step={0.01}
                      theme={{
                        track: theme.sliderTrack,
                        fill: theme.sliderFill,
                        thumb: theme.sliderThumb,
                        valueLabel: theme.sliderValue,
                      }}
                      onChange={(e) => {
                        debouncedValueChange({
                          ...wallParams,
                          height_B: e,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </CollapsablePanel>
          </div>

          <div
            className={`flex flex-row gap-2 items-center ${theme.background} p-2 rounded-2xl`}
          >
            <label className="text-sm">Gap Between Studs:</label>

            <NumberInput
              value={wallParams.stud_gap}
              min={0.05}
              max={1}
              step={0.01}
              units="mts"
              onValueChange={(value) => {
                debouncedValueChange({
                  ...wallParams,
                  stud_gap: value,
                });
              }}
              groupClassnames="text-sm"
              inputClassnames="rounded-md w-14"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigAutomation;
