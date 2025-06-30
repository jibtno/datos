import React from "react";

export type ProgressProps = {
  value: number;
  className?: string;
  "aria-label"?: string;
};

export const Progress: React.FC<ProgressProps> = ({
  value,
  className = "",
  "aria-label": ariaLabel = "Progress bar",
}) => (
  <div
    className={`relative w-full h-3 bg-blue-100 rounded-full overflow-hidden ${className}`}
    role="progressbar"
    aria-valuenow={value}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-label={ariaLabel}
  >
    <div
      className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
      style={{
        width: `${Math.max(0, Math.min(100, value))}%`,
        borderRadius: "inherit",
      }}
    />
  </div>
);