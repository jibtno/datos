// utils/scrapeAirbnb.ts

import puppeteer from 'puppeteer';

export async function scrapeAirbnbListing(url: string) {
  const browser = await puppeteer.launch({
    headless: "new", // for newer Puppeteer versions
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36'
  );

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    await page.waitForSelector('h1', { timeout: 10000 });

    const data = await page.evaluate(() => {
      const getText = (selector: string) => {
        const el = document.querySelector(selector);
        return el ? el.textContent?.trim() : null;
      };

      const getAllTexts = (selector: string) => {
        return Array.from(document.querySelectorAll(selector)).map(el =>
          el.textContent?.trim()
        ).filter(Boolean);
      };

      const title = getText('h1');
      const location = getText('._9xiloll'); // location string
      const details = getAllTexts('._tqmy57');
      const priceRaw = getText('._tyxjp1');

      const amenities = getAllTexts('[data-section-id="AMENITIES_DEFAULT"] li');

      return {
        title,
        location,
        details,
        price: priceRaw?.replace(/[^\d]/g, '') || '0',
        amenities,
      };
    });

    await browser.close();

    return {
      success: true,
      data
    };
  } catch (error: any) {
    await browser.close();
    return {
      success: false,
      error: error.message || 'Unknown error',
    };
  }
}
