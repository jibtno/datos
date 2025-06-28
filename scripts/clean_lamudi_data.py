import json
import os
from collections import defaultdict

RAW_PATH = "./data/lamudi-metro-manila.json"
CLEAN_PATH = "./data/clean-listings.json"
SUMMARY_PATH = "./data/summary-by-building.json"

def normalize_location(location):
    return location.title().replace("Metro Manila", "Metro Manila") if location else ""

def normalize_url(url):
    if not url:
        return ""
    if url.startswith("http"):
        return url
    if url.startswith("/"):
        return "https://www.lamudi.com.ph" + url
    return url

def normalize_price(price):
    if not price:
        return None
    if isinstance(price, str):
        price = ''.join(filter(str.isdigit, price))
    try:
        return int(price)
    except Exception:
        return None

def round_coord(val, precision=5):
    try:
        return round(float(val), precision)
    except Exception:
        return None

def clean_listings(listings):
    seen_urls = set()
    seen_coords = set()
    clean = []
    for l in listings:
        url = normalize_url(l.get("url", ""))
        lat = round_coord(l.get("latitude"))
        lng = round_coord(l.get("longitude"))
        # Remove duplicates by URL or by coordinate
        coord_key = f"{lat},{lng}" if lat and lng else None
        if url and url in seen_urls:
            continue
        if coord_key and coord_key in seen_coords:
            continue
        seen_urls.add(url)
        if coord_key:
            seen_coords.add(coord_key)
        # Standardize fields
        price = normalize_price(l.get("price"))
        location = normalize_location(l.get("location", ""))
        floor_area = None
        if "floorArea" in l:
            try:
                floor_area = float(str(l["floorArea"]).replace("sqm", "").replace("m²", "").strip())
            except Exception:
                floor_area = None
        price_per_sqm = price / floor_area if price and floor_area else None
        clean.append({
            "title": l.get("title", ""),
            "price": price,
            "location": location,
            "bedrooms": l.get("bedrooms"),
            "bathrooms": l.get("bathrooms"),
            "image": l.get("image"),
            "url": url,
            "description": l.get("description", ""),
            "latitude": lat,
            "longitude": lng,
            "floorArea": floor_area,
            "pricePerSqm": round(price_per_sqm, 2) if price_per_sqm else None
        })
    return clean

def group_by_building(clean):
    buildings = defaultdict(list)
    for l in clean:
        key = l["location"]
        if l["latitude"] and l["longitude"]:
            key += f" [{l['latitude']:.5f},{l['longitude']:.5f}]"
        buildings[key].append(l)
    summary = []
    for building, props in buildings.items():
        summary.append({
            "building": building,
            "totalListings": len(props),
            "avgPrice": int(sum(p["price"] or 0 for p in props)/len(props)) if props else None,
            "avgPricePerSqm": (sum(p["pricePerSqm"] or 0 for p in props if p["pricePerSqm"]) / max(1, len([p for p in props if p["pricePerSqm"]])))
                                if props else None,
            "listings": props
        })
    return summary

def main():
    with open(RAW_PATH, "r", encoding="utf-8") as f:
        raw = json.load(f)
    clean = clean_listings(raw)
    print(f"✅ Cleaned {len(clean)} unique listings.")
    os.makedirs(os.path.dirname(CLEAN_PATH), exist_ok=True)
    with open(CLEAN_PATH, "w", encoding="utf-8") as f:
        json.dump(clean, f, indent=2, ensure_ascii=False)
    summary = group_by_building(clean)
    with open(SUMMARY_PATH, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2, ensure_ascii=False)
    print(f"🎉 Saved clean listings to {CLEAN_PATH} and summary to {SUMMARY_PATH}")

if __name__ == "__main__":
    main()