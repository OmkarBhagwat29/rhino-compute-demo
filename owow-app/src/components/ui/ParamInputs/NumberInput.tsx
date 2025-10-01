import React, { FC, useState } from "react";

interface NumberInputProps {
  value: number;
  min: number;
  max: number;
  step: number;
  units: string;
  onValueChange: (value: number) => void;
  groupClassnames?: string;
  inputClassnames?: string;
}

const NumberInput: FC<NumberInputProps> = ({
  value,
  min,
  max,
  step,
  units,
  onValueChange,
  groupClassnames = "",
  inputClassnames = "",
}) => {
  const [localVal, setLocalVal] = useState(value);
  return (
    <div className={`flex items-center gap-x-1 ${groupClassnames}`}>
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={localVal}
        onChange={(e) => {
          const val = parseFloat(e.target.value);
          if (val < min || val > max) return;
          onValueChange(val);
          setLocalVal(val);
          //const depth = parseFloat(e.target.value) || 60;
          // setParcelDepth(depth);
          // sendParcelUpdate(depth, parcelWidth);
        }}
        className={`border p-1 ${inputClassnames}`}
      />
      <span>{units}</span>
    </div>
  );
};

export default NumberInput;
