// pages/api/scrape.ts
import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = req.query.url as string;

  if (!url || !url.includes("airbnb.com/rooms/")) {
    return res.status(400).json({ error: 'Invalid or missing Airbnb URL' });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

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

      return {
        title: getText('h1'),
        location: getText('._9xiloll'),
        price: getText('._tyxjp1')?.replace(/[^\d]/g, '') || '0',
        amenities: getAllTexts('[data-section-id="AMENITIES_DEFAULT"] li')
      };
    });

    await browser.close();
    return res.status(200).json({ success: true, data });
  } catch (err: any) {
    await browser.close();
    return res.status(500).json({ error: err.message || 'Scraping failed' });
  }
}
