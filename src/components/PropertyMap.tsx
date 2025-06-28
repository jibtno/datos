"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Fix Leaflet marker icon issue in Next.js
import L from "leaflet";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function PropertyMap() {
  const [geoJson, setGeoJson] = useState<any>(null);

  useEffect(() => {
    fetch('/listings.geojson').then(res => res.json()).then(setGeoJson);
  }, []);

  if (!geoJson) return <div>Loading map...</div>;

  return (
    <MapContainer
      center={[14.5547, 121.0244]}
      zoom={8}
      style={{ width: "100%", height: 600, borderRadius: 12 }}
      scrollWheelZoom={true}
    >
      <TileLayer
    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
  />
      {geoJson.features.map((f: any, i: number) => (
        <Marker
          key={i}
          position={[
            f.geometry.coordinates[1],
            f.geometry.coordinates[0]
          ]}
        >
          <Popup>
            <div>
              <div className="font-bold">{f.properties.title}</div>
              <div>{f.properties.price}</div>
              <div>{f.properties.type}</div>
              <a
                href={f.properties.link}
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >View Listing</a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}