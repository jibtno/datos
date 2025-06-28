import axios from "axios";

export async function getBarangayInfo(address: string) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + ', Philippines')}`;
  const res = await axios.get(url);
  const [firstResult] = res.data;

  if (!firstResult) return null;

  return {
    lat: firstResult.lat,
    lon: firstResult.lon,
    displayName: firstResult.display_name,
  };
}