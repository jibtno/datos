"use client";
import dynamic from "next/dynamic";

/*  👉  Loads the real map only in the browser  */
const InteractiveMarketMap = dynamic(
  () => import("./InteractiveMarketMap"), // ← your existing file (shown above)
  { ssr: false }
);

export default InteractiveMarketMap;