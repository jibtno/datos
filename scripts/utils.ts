import cheerio from "cheerio";

// Extract coordinates from a Google Maps link in the page, if present
export function extractLatLngFromPage(html: string): { latitude: number; longitude: number } | null {
  const match = html.match(/google\.com\/maps\?q=([\d.-]+),([\d.-]+)/);
  if (match) {
    return {
      latitude: parseFloat(match[1]),
      longitude: parseFloat(match[2]),
    };
  }
  return null;
}

// Fallback: Geocode using Nominatim (OpenStreetMap)
export async function geocodeAddress(address: string): Promise<{ latitude: number; longitude: number } | null> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  const res = await fetch(url, { headers: { "User-Agent": "PropertyIQ Lamudi Scraper" } });
  const data = await res.json();
  if (data[0]) {
    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
    };
  }
  return null;
}

// Clean a price string
export function parsePrice(priceStr: string): number | null {
  const cleaned = priceStr.replace(/[₱,]/g, "").trim();
  const n = parseFloat(cleaned);
  return isNaN(n) ? null : n;
}

// Scrape a Lamudi listing page for details (uses cheerio)
export function parseListing(html: string): any {
  const $ = cheerio.load(html);
  // Example structure: adapt as needed
  const title = $("h1").first().text().trim();
  const location = $(".TitleArea-location").text().trim() || "";
  const price = parsePrice($(".PriceSection-amount").text());
  // ...add parsing for bedrooms, bathrooms, size, etc.
  return {
    title,
    location,
    price,
    // ...more fields
  };
}