import * as React from "react";

export type SliderProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className = "", ...props }, ref) => (
    <input
      type="range"
      ref={ref}
      className={`w-full accent-blue-500 cursor-pointer ${className}`}
      {...props}
    />
  )
);

Slider.displayName = "Slider";

export default Slider;