"use client";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

const PropertyMap = dynamic(() => import("./PropertyMap"), { ssr: false });

export default PropertyMap;