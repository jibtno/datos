# scripts/scrape_lamudi_top_locations.py

import time, random, json, os
import requests
from bs4 import BeautifulSoup
from selenium import webdriver

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
]
TOP_ZONES = {
    "bgc": "https://www.lamudi.com.ph/taguig/rent/?page=",
    "rockwell": "https://www.lamudi.com.ph/makati/rent/?page=",
    "ortigas": "https://www.lamudi.com.ph/mandaluyong/rent/?page=",
    "katipunan": "https://www.lamudi.com.ph/quezon-city/rent/?page=",
    "moa": "https://www.lamudi.com.ph/pasay/rent/?page=",
    "cebu-it-park": "https://www.lamudi.com.ph/cebu-city/rent/?page=",
}
PAGES_PER_ZONE = 8
MAX_PER_BUILDING = 5
DETAIL_DELAY = 2.0
DELAY_BETWEEN_REQUESTS = [2.5, 4.0]

def delay():
    time.sleep(random.uniform(*DELAY_BETWEEN_REQUESTS))

def geocode(address):
    time.sleep(1.2)
    url = f"https://nominatim.openstreetmap.org/search?format=json&q={address}, Philippines"
    headers = {"User-Agent": random.choice(USER_AGENTS)}
    try:
        r = requests.get(url, headers=headers, timeout=10)
        data = r.json()
        if data and len(data) > 0:
            return float(data[0]["lat"]), float(data[0]["lon"])
    except Exception as e:
        print(f"Geocode error: {e}")
    return None, None

def extract_coords_from_jsonld(soup):
    for script in soup.find_all("script", type="application/ld+json"):
        try:
            d = json.loads(script.string)
            if isinstance(d, dict) and "geo" in d:
                geo = d["geo"]
                return float(geo.get("latitude", 0)), float(geo.get("longitude", 0))
        except Exception:
            continue
    return None, None

def clean_text(text):
    if text:
        return " ".join(text.replace("\n", " ").replace("\r", " ").split())
    return ""

OFFICE_KEYWORDS = [
    "office", "bpo", "seat leasing", "commercial", "warehouse", "retail",
    "serviced office", "cowork", "workspace", "business center"
]
def is_residential(title, desc, location, prop_type):
    text = " ".join([str(title), str(desc), str(location), str(prop_type)]).lower()
    return not any(word in text for word in OFFICE_KEYWORDS)

def scrape_detail(url):
    try:
        resp = requests.get(url, headers={"User-Agent": random.choice(USER_AGENTS)}, timeout=20)
        soup = BeautifulSoup(resp.text, "html.parser")
        lat, lng = extract_coords_from_jsonld(soup)
        # Try to find building name, furnished, property type
        furnished, prop_type, building = None, None, None
        desc = soup.find("meta", {"name": "description"})
        desc_text = desc["content"] if desc else ""
        if "furnished" in desc_text.lower():
            furnished = True
        main_type = soup.find("span", class_="PropertyMainType")
        if main_type:
            prop_type = main_type.get_text(strip=True)
        bldg_field = soup.find("div", class_="PropertyBuildingName")
        if bldg_field:
            building = bldg_field.get_text(strip=True)
        return lat, lng, furnished, prop_type, building
    except Exception as e:
        print(f"Detail scrape failed: {e}")
        return None, None, None, None, None

def group_key(listing):
    # Prefer building name, else location, else lat/lng
    if listing.get("building"):
        return listing["building"].strip().lower()
    if listing.get("location"):
        return listing["location"].strip().lower()
    if listing.get("latitude") and listing.get("longitude"):
        return f"{listing['latitude']},{listing['longitude']}"
    return "unknown"

def scrapeLamudiZones():
    ua = random.choice(USER_AGENTS)
    profile = webdriver.FirefoxProfile()
    profile.set_preference("general.useragent.override", ua)
    options = webdriver.FirefoxOptions()
    options.headless = False
    options.profile = profile
    options.add_argument(f"--window-size={random.randint(1200,1800)},{random.randint(700,1000)}")
    driver = webdriver.Firefox(options=options)

    for zone, base_url in TOP_ZONES.items():
        results = []
        per_building = {}  # {building_key: count}
        for page in range(1, PAGES_PER_ZONE + 1):
            url = base_url + str(page)
            print(f"🔍 {zone.upper()} page {page}: {url}")
            driver.get(url)
            time.sleep(3 + random.uniform(0, 2))
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(1.5 + random.uniform(0, 2))
            html = driver.page_source
            soup = BeautifulSoup(html, "html.parser")
            cards = soup.select("div.listings__cards > div.snippet")
            print(f"Found {len(cards)} property cards on page {page}")

            for card in cards:
                try:
                    title = card.select_one(".snippet__content__title")
                    title = clean_text(title.get_text()) if title else ""
                    price = card.select_one(".snippet__content__price")
                    price = int("".join(filter(str.isdigit, price.get_text()))) if price else None
                    location = card.select_one(".snippet__content__location span[data-test='snippet-content-location']")
                    location = clean_text(location.get_text()) if location else ""
                    bedrooms = card.select_one("span.property__number.bedrooms[data-test='bedrooms-value']")
                    bedrooms = int(bedrooms.get_text()) if bedrooms else None
                    bathrooms = card.select_one("span.property__number.bathrooms[data-test='full-bathrooms-value']")
                    bathrooms = int(bathrooms.get_text()) if bathrooms else None
                    image = card.select_one("div.snippet__image img")
                    image = image["src"] if image else ""
                    href_node = card.select_one("a[href^='/property/']")
                    url_detail = "https://www.lamudi.com.ph" + href_node["href"] if href_node else ""
                    description = card.select_one("div.snippet__content__description")
                    description = clean_text(description.get_text()) if description else ""
                    size = None
                    size_tag = card.find("span", class_="property__number area")
                    if size_tag:
                        try:
                            size = float("".join(filter(lambda x: x.isdigit() or x==".", size_tag.get_text())))
                        except Exception:
                            size = None
                    # Get details / coords / building/furnished/type
                    lat, lng, furnished, prop_type, building = None, None, None, None, None
                    if url_detail:
                        lat, lng, furnished, prop_type, building = scrape_detail(url_detail)
                    if (lat is None or lng is None) and location:
                        lat, lng = geocode(location)

                    # Only condos/apartments, skip offices/commercials
                    prop_type_val = (prop_type or "").lower()
                    if not is_residential(title, description, location, prop_type_val):
                        print(f"⏭️ Skipping commercial/office: {title} | {location}")
                        continue
                    if not ("condo" in prop_type_val or "apartment" in prop_type_val or "condo" in title.lower() or "apartment" in title.lower()):
                        continue

                    bkey = building or location or f"{lat},{lng}"
                    bkey = bkey.strip().lower()
                    if bkey not in per_building:
                        per_building[bkey] = 0
                    if per_building[bkey] >= MAX_PER_BUILDING:
                        continue

                    results.append({
                        "title": title,
                        "price": price,
                        "location": location,
                        "bedrooms": bedrooms,
                        "bathrooms": bathrooms,
                        "image": image,
                        "url": url_detail,
                        "description": description,
                        "size": size,
                        "latitude": lat,
                        "longitude": lng,
                        "furnished": furnished,
                        "propertyType": prop_type,
                        "building": building,
                        "city": zone,
                    })
                    per_building[bkey] += 1
                    print(f"  ✅ {title} | {location} | ₱{price} | {lat},{lng} | {bkey}: {per_building[bkey]}")

                    time.sleep(DETAIL_DELAY + random.uniform(0, 1.5))
                except Exception as e:
                    print(f"[Warning] Failed to parse a property: {e}")

            delay()

        print(f"➡️ {zone.title()}: {len(results)} listings (max {MAX_PER_BUILDING} per building)")

        # Save output
        os.makedirs(f"./data", exist_ok=True)
        with open(f"./data/{zone}.json", "w", encoding="utf-8") as f:
            json.dump(results, f, indent=2, ensure_ascii=False)

    driver.quit()
    print("🎉 All done! Listings saved per zone in /data/.")

if __name__ == "__main__":
    scrapeLamudiZones()