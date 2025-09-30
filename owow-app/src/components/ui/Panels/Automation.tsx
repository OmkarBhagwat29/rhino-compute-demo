import React, { useCallback } from "react";
import Slider from "../ParamInputs/Slider";
import { useOWowApp } from "@/context/OWowAppProvider";
import { themes } from "@/components/ui/theme";
import { debounce } from "lodash";
import { IWallProps } from "@/props/IWallProps";
const Automation = () => {
  const { wallParams, setWallParams } = useOWowApp();
  const theme = themes.gray;

  const debouncedValueChange = useCallback(
    debounce((value: IWallProps) => {
      //update wall params
      console.log("updateing...", value);
      setWallParams(value);
    }, 500),
    []
  );
  return (
    <div className="w-72 h-full bg-gray-300/75 border rounded-md select-none overflow-y-auto">
      <div className="text-black px-4 p-2">
        <div>
          <div>
            <div>
              <label className="text-sm">Window_A Width:</label>
              <div className="py-8">
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

            <div>
              <label className="text-sm">Window_A Height:</label>
              <div className="py-8">
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

          <div>
            <div>
              <label className="text-sm">Window_B Width:</label>
              <div className="py-8">
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

            <div>
              <label className="text-sm">Window_B Height:</label>
              <div className="py-8">
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

          <div>
            <label className="text-sm">Gap Between Studs:</label>
            <div className="py-8">
              <Slider
                value={wallParams.stud_gap}
                start={0.05}
                end={1}
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
                    stud_gap: e,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Automation;
