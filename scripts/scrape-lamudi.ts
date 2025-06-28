import puppeteer from "puppeteer";
import fs from "fs/promises";
import path from "path";
import readline from "readline";

const BASE_URL = "https://www.lamudi.com.ph/metro-manila/rent/?page=";
const OUTPUT_DIR = "./data";

const DELAY_BETWEEN_REQUESTS = [2500, 4000];
const DEFAULT_MAX_PAGES = 3;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const randomDelay = () =>
  delay(
    Math.floor(
      Math.random() * (DELAY_BETWEEN_REQUESTS[1] - DELAY_BETWEEN_REQUESTS[0])
    ) + DELAY_BETWEEN_REQUESTS[0]
  );

interface Property {
  title: string;
  price: number | null;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  image?: string;
  url: string;
  description?: string;
}

/**
 * Ask user for max pages to scrape from CLI.
 */
async function askMaxPages(): Promise<number> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (q: string) =>
    new Promise<string>((resolve) => rl.question(q, resolve));

  let pagesStr = await question(
    `Enter max pages to scrape (default ${DEFAULT_MAX_PAGES}): `
  );
  rl.close();

  const pages = parseInt(pagesStr);
  if (isNaN(pages) || pages < 1) {
    return DEFAULT_MAX_PAGES;
  }
  return pages;
}

/**
 * Launches Puppeteer and returns browser and page instances.
 */
async function setupBrowser() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
  );
  await page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.9",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  });

  return { browser, page };
}

/**
 * Scrape listings from the given page URL.
 */
async function scrapePage(page: puppeteer.Page, url: string): Promise<Property[]> {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await delay(3000);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await delay(2000);

  // Save debug HTML for inspection (optional, comment out to disable)
  // const html = await page.content();
  // await fs.writeFile(`debug-${path.basename(url)}.html`, html, "utf-8");

  const listings: Property[] = await page.$$eval(
    "div.listings__cards > div.snippet",
    (nodes) => {
      return Array.from(nodes)
        .map((node) => {
          const getText = (sel: string) => {
            const el = node.querySelector(sel);
            return el ? (el.textContent || "").trim() : "";
          };

          const title = getText(".snippet__content__title");
          const priceText = getText(".snippet__content__price");
          const price = priceText ? parseInt(priceText.replace(/[^\d]/g, "")) : null;
          const location = getText("span[data-test='snippet-content-location']");

          let bedroomsText = getText(
            "span.property__number.bedrooms[data-test='bedrooms-value']"
          );
          let bathroomsText = getText(
            "span.property__number.bathrooms[data-test='full-bathrooms-value']"
          );
          const bedrooms = bedroomsText ? parseInt(bedroomsText) : undefined;
          const bathrooms = bathroomsText ? parseInt(bathroomsText) : undefined;

          let image = "";
          const imgNode = node.querySelector("div.snippet__image img");
          if (imgNode) image = imgNode.getAttribute("src") || "";

          let url = "";
          const hrefNode = node.querySelector("a[href^='/property/']");
          if (hrefNode) url = hrefNode.getAttribute("href") || "";

          const description = getText("div.snippet__content__description");

          return {
            title,
            price,
            location,
            bedrooms: isNaN(bedrooms!) ? undefined : bedrooms,
            bathrooms: isNaN(bathrooms!) ? undefined : bathrooms,
            image,
            url: url ? `https://www.lamudi.com.ph${url}` : "",
            description,
          };
        })
        .filter(
          (property) => property.title && property.price !== null && !isNaN(property.price)
        );
    }
  );

  return listings;
}

/**
 * Main scraping orchestration.
 */
async function main() {
  // Get user input for pages to scrape
  const maxPages = await askMaxPages();

  // Prepare output directory
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const outputFilePath = path.join(OUTPUT_DIR, `lamudi-metro-manila-p${maxPages}.json`);

  const { browser, page } = await setupBrowser();
  const results: Property[] = [];

  try {
    for (let i = 1; i <= maxPages; i++) {
      const url = BASE_URL + i;
      console.log(`🔍 Visiting page ${i}: ${url}`);

      try {
        const listings = await scrapePage(page, url);
        results.push(...listings);
        console.log(`✅ Scraped ${listings.length} listings from page ${i}. Total so far: ${results.length}`);
      } catch (scrapeErr) {
        console.error(`❌ Error scraping page ${i}:`, scrapeErr);
      }

      await randomDelay();
    }

    // Save all results at once
    await fs.writeFile(outputFilePath, JSON.stringify(results, null, 2), "utf-8");
    console.log(`🎉 Scraping complete. Data saved to ${outputFilePath}`);
  } catch (err) {
    console.error("❌ Unexpected error:", err);
  } finally {
    await browser.close();
  }
}

// Run main flow, catch unhandled rejections
main().catch(console.error);