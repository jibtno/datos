import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}
export function Avatar({ className, children, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-lg shadow-md border-2 border-white/30 glass",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function AvatarFallback({
  children,
  className,
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full h-full text-white font-medium",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}