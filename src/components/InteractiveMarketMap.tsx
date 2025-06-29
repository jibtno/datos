"use client";
import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Tooltip,
  useMap,
  AttributionControl,
} from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { Crosshair } from "lucide-react";
import provincePaths from "@/data/provincePaths";

/* ─────────────────────── helper types ────────────────────── */
interface Listing {
  id: string;
  title: string;
  location: string;
  price: string;
  rating: number;
  image: string;
  occupancy: number;
  roi: string | number;
  url: string;
  coordinates: [number, number];
}

interface Zone {
  id: string;
  name: string;
  coordinates: [number, number][] | [number, number][][];
  roi: string | number;
  nightlyRate: string;
  occupancy: number;
}

interface InteractiveMarketMapProps {
  listings?: Listing[];
  center?: [number, number];
  selectedId?: string | null;
  setSelectedId?: (id: string) => void;
  onZoneClick?: (zoneId: string) => void;
  selectedZoneId?: string | null;
  zoom?: number;
}

/* ─────────────────────── colour helpers ──────────────────── */
function getRoiColor(roi: string | number) {
  const num = typeof roi === "number" ? roi : Number(roi);
  if (!isNaN(num)) {
    if (num >= 8) return "#22c55e";
    if (num >= 5) return "#facc15";
    return "#ef4444";
  }
  const str = String(roi).toLowerCase();
  if (str.includes("high")) return "#22c55e";
  if (str.includes("mid") || str.includes("good") || str.includes("growing"))
    return "#facc15";
  return "#ef4444";
}

/* ──────────────── leaflet marker icons (unchanged) ───────── */
const markerIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const highlightedMarkerIcon = new L.Icon({
  iconUrl:
    "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon-red.png",
  iconRetinaUrl:
    "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon-red-2x.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

/* flatten a province’s coords to LatLng[] so we can fitBounds */
const flatCoords = (
  coords: [number, number][] | [number, number][][]
): LatLngExpression[] => {
  if (!coords.length) return [];
  if (Array.isArray(coords[0][0])) {
    // Multi-polygon
    return (coords as [number, number][][])[0] as LatLngExpression[];
  }
  return coords as LatLngExpression[];
};

/* ─────────────── Re-center FAB (now fitBounds) ───────────── */
const RecenterButton: React.FC<{
  defaultCenter: [number, number];
  defaultZoom: number;
  activeZoneCoords?: LatLngExpression[];
}> = ({ defaultCenter, defaultZoom, activeZoneCoords }) => {
  const map = useMap();
  const handleClick = () => {
    if (activeZoneCoords && activeZoneCoords.length > 0) {
      const bounds = L.latLngBounds(activeZoneCoords);
      map.fitBounds(bounds, { padding: [40, 40] });
    } else {
      map.setView(defaultCenter, defaultZoom);
    }
  };
  return (
    <button
      aria-label="Recenter"
      className="absolute top-4 right-4 z-[999] bg-white rounded-full shadow p-2 hover:bg-blue-50"
      type="button"
      onClick={handleClick}
      style={{ display: "flex", alignItems: "center" }}
    >
      <Crosshair className="w-5 h-5 text-blue-600" />
    </button>
  );
};

/* ─────────────────────── MAIN COMPONENT ──────────────────── */
const InteractiveMarketMap: React.FC<InteractiveMarketMapProps> = ({
  listings = [],
  center = [14.5995, 120.9842],
  selectedId = null,
  setSelectedId,
  onZoneClick,
  selectedZoneId = null,
  zoom = 11,
}) => {
  /* track which zone is open / active */
  const [openPopupZoneId, setOpenPopupZoneId] =
    useState<string | null>(selectedZoneId);
  const [activeZoneId, setActiveZoneId] =
    useState<string | null>(selectedZoneId);

  useEffect(() => {
    setActiveZoneId(selectedZoneId ?? null);
    setOpenPopupZoneId(selectedZoneId ?? null);
  }, [selectedZoneId]);

  const activeZone = provincePaths.find((z) => z.id === activeZoneId);

  /* listings filter unchanged */
  const filteredListings =
    activeZone && listings.length
      ? listings.filter(
          (l) =>
            l.location &&
            (l.location.toLowerCase().includes(activeZone.name.toLowerCase()) ||
              l.location.toLowerCase().includes(activeZone.id.toLowerCase()))
        )
      : [];

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        <AttributionControl position="bottomright" prefix={false} />

        {/* ─────────── Provinces ─────────── */}
        {provincePaths.map((zone) => {
          if (
            !Array.isArray(zone.coordinates) ||
            !zone.coordinates.length ||
            (Array.isArray(zone.coordinates[0]) &&
              !(zone.coordinates[0] as any).length)
          )
            return null;

          const isActive = zone.id === activeZoneId;
          const fillColor = getRoiColor(zone.roi);

          return (
            <Polygon
              key={zone.id}
              positions={zone.coordinates as LatLngExpression[] | LatLngExpression[][]}
              pathOptions={{
                fillColor,
                fillOpacity: 0.4,
                color: isActive ? "#2563eb" : fillColor, // blue outline when active
                weight: isActive ? 3 : 1,
              }}
              eventHandlers={{
                click: () => {
                  onZoneClick?.(zone.id);
                  setActiveZoneId(zone.id);
                  setOpenPopupZoneId(zone.id);
                },
              }}
            >
              <Tooltip direction="top" offset={[0, -8]} sticky>
                <div className="flex flex-col">
                  <span className="font-bold">{zone.name}</span>
                  <span>Nightly Rate: {zone.nightlyRate}</span>
                  <span>Occupancy: {zone.occupancy}%</span>
                </div>
              </Tooltip>

              {openPopupZoneId === zone.id && (
                <Popup
                  position={polygonCenter(zone.coordinates)}
                  onClose={() => setOpenPopupZoneId(null)}
                  autoPan={false}
                  closeButton
                  closeOnClick={false}
                  autoClose={false}
                  className="z-[10000]"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-lg">{zone.name}</span>
                    <span>Nightly Rate: {zone.nightlyRate}</span>
                    <span>Occupancy: {zone.occupancy}%</span>
                    <span>ROI: {zone.roi}</span>
                    <a
                      href={`/listings?area=${zone.id}`}
                      className="mt-2 text-blue-600 underline hover:text-blue-800"
                    >
                      View Listings
                    </a>
                  </div>
                </Popup>
              )}
            </Polygon>
          );
        })}

        {/* ─────────── Markers (unchanged) ─────────── */}
        {filteredListings.map((l) => (
          <Marker
            key={l.id}
            position={l.coordinates as LatLngExpression}
            icon={selectedId === l.id ? highlightedMarkerIcon : markerIcon}
            eventHandlers={{ click: () => setSelectedId?.(l.id) }}
          >
            <Popup>
              <div className="flex flex-col gap-1">
                <span className="font-bold">{l.title}</span>
                <span>{l.location}</span>
                <span>{l.price}</span>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Listing
                </a>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* ─────────── Re-center FAB ─────────── */}
        <RecenterButton
          defaultCenter={center}
          defaultZoom={zoom}
          activeZoneCoords={activeZone ? flatCoords(activeZone.coordinates) : undefined}
        />
      </MapContainer>
    </div>
  );
};

export default InteractiveMarketMap;

/* helper reused from your original file */
function polygonCenter(
  coords: [number, number][] | [number, number][][]
): [number, number] {
  if (!coords?.length) return [0, 0];
  const pts = flatCoords(coords);
  const [latSum, lngSum] = pts.reduce(
    (acc, [lat, lng]) => [acc[0] + lat, acc[1] + lng],
    [0, 0]
  );
  return [latSum / pts.length, lngSum / pts.length];
}