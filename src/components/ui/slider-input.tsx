import React from "react";

type SliderInputProps = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
};

export const SliderInput: React.FC<SliderInputProps> = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  label,
  onChange,
  disabled = false,
  className = "",
}) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === "" ? "" : Number(e.target.value);
    if (val === "" || (typeof val === "number" && !isNaN(val))) {
      onChange(val as number);
    }
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {label && (
        <label className="font-medium text-gray-700 min-w-[80px]">
          {label}
        </label>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSliderChange}
        disabled={disabled}
        className="w-full accent-blue-500"
      />
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        className="w-20 px-2 py-1 border border-gray-300 rounded text-right"
      />
    </div>
  );
};

export default SliderInput;