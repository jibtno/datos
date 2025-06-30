import * as React from "react";
import { cn } from "@/lib/utils";

// Container for the select
export function Select({ value, onValueChange, children, className, ...props }: any) {
  return (
    <div className={cn("relative", className)} {...props}>
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child, { value, onValueChange })
          : child
      )}
    </div>
  );
}

export function SelectTrigger({ children, className, ...props }: any) {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-between w-full px-4 py-2 rounded-xl border bg-white/60 text-slate-800",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function SelectContent({ children, className, ...props }: any) {
  return (
    <div
      className={cn(
        "absolute mt-2 w-full z-20 rounded-xl shadow-lg bg-white/90 border border-white/40 backdrop-blur-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectItem({ value, children, onClick, className, ...props }: any) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "cursor-pointer px-4 py-2 hover:bg-purple-100 rounded-lg text-slate-700",
        className
      )}
      data-value={value}
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectValue({ children, placeholder }: any) {
  return (
    <span className="truncate text-left">{children || placeholder}</span>
  );
}