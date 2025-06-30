import Image from "next/image";
import React, { useState } from "react";

interface AvatarProps {
  src: string;
  alt?: string;
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge";
  status?: "online" | "offline" | "busy" | "none";
  className?: string;
}

const sizeClasses = {
  xsmall: "h-6 w-6",
  small: "h-8 w-8",
  medium: "h-10 w-10",
  large: "h-12 w-12",
  xlarge: "h-14 w-14",
  xxlarge: "h-16 w-16",
};

const statusSizeClasses = {
  xsmall: "h-2 w-2",
  small: "h-2.5 w-2.5",
  medium: "h-3 w-3",
  large: "h-3.5 w-3.5",
  xlarge: "h-4 w-4",
  xxlarge: "h-5 w-5",
};

const statusColorClasses = {
  online: "bg-green-500",
  offline: "bg-red-400",
  busy: "bg-yellow-400",
};

const fallbackColors = [
  "bg-purple-500", "bg-blue-500", "bg-green-500", "bg-amber-500", "bg-pink-500"
];

const getInitials = (alt: string) => {
  return alt
    .split(" ")
    .map(s => s.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
};

// Named export
export function Avatar({
  src,
  alt = "User Avatar",
  size = "medium",
  status = "none",
  className = "",
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const fallbackColor = fallbackColors[Math.abs(alt.length) % fallbackColors.length];

  return (
    <div className={`relative rounded-full overflow-hidden ${sizeClasses[size]} bg-white/30 border border-white/20 ${className}`}>
      {!imgError && src ? (
        <Image
          width={80}
          height={80}
          src={src}
          alt={alt}
          className="object-cover w-full h-full rounded-full"
          onError={() => setImgError(true)}
          priority
        />
      ) : (
        <AvatarFallback alt={alt} fallbackColor={fallbackColor} />
      )}
      {status !== "none" && (
        <span
          className={`absolute bottom-0 right-0 rounded-full border-[2px] border-white shadow ${statusSizeClasses[size]} ${statusColorClasses[status] || ""}`}
        ></span>
      )}
    </div>
  );
}

// Named export for fallback
export function AvatarFallback({
  alt = "User",
  fallbackColor = "bg-purple-500",
  className = "",
}: {
  alt?: string;
  fallbackColor?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center w-full h-full rounded-full font-bold text-white uppercase ${fallbackColor} select-none ${className}`}>
      {getInitials(alt)}
    </div>
  );
}

// Default export for compatibility
export default Avatar;