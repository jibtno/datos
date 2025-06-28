import time, random, json, os, csv
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.firefox.options import Options

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
]

# All zone URLs now restrict to apartment, condo, house listings ONLY
ZONES = {
    "bgc": "https://www.lamudi.com.ph/taguig/rent/?propertyTypeGroups=apartment,condo,house&page=",
    "rockwell": "https://www.lamudi.com.ph/makati/rent/?propertyTypeGroups=apartment,condo,house&page=",
    "ortigas": "https://www.lamudi.com.ph/mandaluyong/rent/?propertyTypeGroups=apartment,condo,house&page=",
    "katipunan": "https://www.lamudi.com.ph/quezon-city/rent/?propertyTypeGroups=apartment,condo,house&page=",
    "moa": "https://www.lamudi.com.ph/pasay/rent/?propertyTypeGroups=apartment,condo,house&page=",
}
PAGES_PER_ZONE = 10
MAX_LISTINGS_PER_ZONE = 100
MAX_PER_BUILDING_UNIT = 5
DETAIL_DELAY = 0.6
DELAY_BETWEEN_PAGES = [5, 12]
SESSION_PATH = "scraping_session.json"

def clean_text(text):
    if text:
        return " ".join(text.replace("\n", " ").replace("\r", " ").split())
    return ""

def extract_unit_type(title, bedrooms):
    t = str(title).lower()
    if bedrooms == 1 or "1 bedroom" in t or "1br" in t: return "1BR"
    if bedrooms == 2 or "2 bedroom" in t or "2br" in t: return "2BR"
    if bedrooms == 3 or "3 bedroom" in t or "3br" in t: return "3BR"
    if "studio" in t: return "Studio"
    if "loft" in t: return "Loft"
    if "penthouse" in t: return "Penthouse"
    return f"{bedrooms}BR" if bedrooms else "Unknown"

def extract_building(title, location):
    for field in [title, location]:
        if not field: continue
        parts = field.split(",")
        name = parts[0].strip()
        if len(name) > 6 and not name.lower().startswith("condo"):
            return name
    return "Unknown"

def save_cookies(driver, path=SESSION_PATH):
    cookies = driver.get_cookies()
    with open(path, "w") as f:
        json.dump(cookies, f)

def load_cookies(driver, path=SESSION_PATH):
    if os.path.exists(path):
        with open(path, "r") as f:
            cookies = json.load(f)
        for cookie in cookies:
            try:
                driver.add_cookie(cookie)
            except Exception:
                continue

def get_bs4(url, retries=3, cookies=None, bad_urls_file="bad_urls.txt"):
    headers = {"User-Agent": random.choice(USER_AGENTS)}
    session = requests.Session()
    if cookies:
        for cookie in cookies:
            session.cookies.set(cookie['name'], cookie['value'])
    for _ in range(retries):
        try:
            r = session.get(url, headers=headers, timeout=15)
            if r.status_code == 200:
                return BeautifulSoup(r.text, "html.parser")
            if "not sure you are a human" in r.text.lower() or "captcha" in r.text.lower():
                with open(bad_urls_file, "a") as f:
                    f.write(url + "\n")
                return None
        except Exception as e:
            print(f"[Warning] Failed to fetch {url}: {e}")
        time.sleep(2)
    with open(bad_urls_file, "a") as f:
        f.write(url + "\n")
    return None

def extract_coords_from_jsonld(soup):
    for script in soup.find_all("script", type="application/ld+json"):
        try:
            d = json.loads(script.string)
            if isinstance(d, dict) and "geo" in d:
                geo = d["geo"]
                return float(geo.get("latitude", 0)), float(geo.get("longitude", 0)), "jsonld"
        except Exception:
            continue
    return None, None, None

def geocode(address, cache):
    if address in cache:
        return cache[address], "nominatim"
    url = f"https://nominatim.openstreetmap.org/search?format=json&q={address}, Philippines"
    headers = {"User-Agent": random.choice(USER_AGENTS)}
    try:
        r = requests.get(url, headers=headers, timeout=10)
        data = r.json()
        if data and len(data) > 0:
            latlng = (float(data[0]["lat"]), float(data[0]["lon"]))
            cache[address] = latlng
            return latlng, "nominatim"
    except Exception as e:
        print(f"[Geocode error] {address}: {e}")
    cache[address] = (None, None)
    return (None, None), "nominatim"

def scrape_detail(url, geocode_cache, cookies, bad_urls):
    soup = get_bs4(url, cookies=cookies, bad_urls_file=bad_urls)
    if not soup:
        return None, None, None, None, "badurl"
    lat, lng, geo_source = extract_coords_from_jsonld(soup)
    desc = soup.find("meta", {"name": "description"})
    desc_text = desc["content"] if desc else ""
    furnished = "furnished" in desc_text.lower()
    prop_type = None
    main_type = soup.find("span", class_="PropertyMainType")
    if main_type:
        prop_type = main_type.get_text(strip=True)
    return lat, lng, furnished, prop_type, geo_source

def merge_to_csv():
    fieldnames = None
    rows = []
    for fname in os.listdir("./data"):
        if fname.endswith(".json"):
            with open(f"./data/{fname}", "r") as f:
                data = json.load(f)
                rows.extend(data)
                if data and not fieldnames:
                    fieldnames = data[0].keys()
    with open("./data/all_listings.csv", "w", newline='', encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
    print("✅ Merged CSV written to ./data/all_listings.csv")

def scrapeLamudiZones():
    geocode_cache = {}
    opts = Options()
    opts.headless = False
    ua = random.choice(USER_AGENTS)
    opts.set_preference("general.useragent.override", ua)
    driver = webdriver.Firefox(options=opts)

    driver.get("https://www.lamudi.com.ph/")
    input("🛑 Please solve any captcha and accept cookies on the homepage, then press Enter to continue...")

    for zone, base_url in ZONES.items():
        results = []
        per_building_unit = {}
        seen_urls = set()

        try:
            for page in range(1, PAGES_PER_ZONE + 1):
                url = base_url + str(page)
                driver.get(url)
                input("🛑 Solve captcha if needed, then press Enter to continue...")
                save_cookies(driver)
                cookies = driver.get_cookies()

                html = driver.page_source
                soup = BeautifulSoup(html, "html.parser")
                cards = soup.select("div.listings__cards > div.snippet")
                print(f"Found {len(cards)} property cards on page {page}")

                for idx, card in enumerate(cards):
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

                        if url_detail in seen_urls:
                            continue
                        seen_urls.add(url_detail)

                        listing_id = ""
                        if "/property/" in url_detail:
                            listing_id = url_detail.split("/property/")[1].split("/")[0]

                        lat, lng, furnished, prop_type, geo_source = scrape_detail(
                            url_detail, geocode_cache, cookies, "bad_urls.txt"
                        )
                        if (lat is None or lng is None) and location:
                            bkey = extract_building(title, location)
                            if geocode_cache.get(bkey) is None or geocode_cache.get(bkey) == (None, None):
                                (lat, lng), geo_source = geocode(location, geocode_cache)
                            else:
                                lat, lng = geocode_cache.get(bkey, (None, None))
                                geo_source = "nominatim"

                        # No need for post-scrape filtering: all URLs already limit to apartments/condos/houses

                        unit_type = extract_unit_type(title, bedrooms)
                        building = extract_building(title, location)
                        key = (building.lower(), unit_type.lower())
                        if key not in per_building_unit:
                            per_building_unit[key] = 0
                        if per_building_unit[key] >= MAX_PER_BUILDING_UNIT:
                            continue

                        results.append({
                            "zone": zone,
                            "building": building,
                            "unit_type": unit_type,
                            "title": title,
                            "price": price,
                            "floor_area": size,
                            "bedrooms": bedrooms,
                            "bathrooms": bathrooms,
                            "image": image,
                            "url": url_detail,
                            "listing_id": listing_id,
                            "description": description,
                            "latitude": lat,
                            "longitude": lng,
                            "furnished": furnished,
                            "propertyType": prop_type,
                            "geocode_source": geo_source,
                        })
                        per_building_unit[key] += 1
                        print(f"  ✅ {title} | {building} {unit_type} ({per_building_unit[key]}) | ₱{price} | {lat},{lng} | {geo_source}")

                    except Exception as e:
                        print(f"[Warning] Failed to parse a property: {e}")
                    if idx % 10 == 0 and idx > 0:
                        time.sleep(DETAIL_DELAY + random.uniform(0, 1.0))
                time.sleep(random.uniform(*DELAY_BETWEEN_PAGES))
            final = results[:MAX_LISTINGS_PER_ZONE]
            print(f"➡️ {zone.title()}: {len(final)} listings (max {MAX_PER_BUILDING_UNIT} per building/unit • max {MAX_LISTINGS_PER_ZONE} total)")
            os.makedirs(f"./data", exist_ok=True)
            with open(f"./data/{zone}.json", "w", encoding="utf-8") as f:
                json.dump(final, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"[Error] Problem scraping zone {zone}: {e}")
            try:
                driver.quit()
            except Exception:
                pass
            continue  # Continue to next zone

    driver.quit()
    merge_to_csv()
    print("🎉 All done! Listings saved per zone in /data/.")

if __name__ == "__main__":
    scrapeLamudiZones()