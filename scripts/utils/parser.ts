const axios = require('axios');
import * as cheerio from 'cheerio';
import * as fs from 'fs';

async function scrapeLamudi() {
  const url = 'https://www.lamudi.com.ph/manila/';
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const listings: Array<{
    title: string;
    price: string;
    location: string;
    link: string;
  }> = [];

  $('.ListingCell-AllInfo').each((_: number, el: any) => {
  listings.push({
    title: $(el).find('.ListingCell-KeyInfo-title').text().trim(),
    price: $(el).find('.PriceSection-FirstPrice').text().trim(),
    location: $(el).find('.ListingCell-KeyInfo-address').text().trim(),
    link: 'https://www.lamudi.com.ph' + $(el).find('a').attr('href'),
  });
});

  fs.writeFileSync('./public/lamudi-listings.json', JSON.stringify(listings, null, 2));
  console.log(`Scraped ${listings.length} listings.`);
}

scrapeLamudi();