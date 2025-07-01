// src/utils/analyze.ts
import fetch from 'node-fetch';
import { load } from "cheerio";

export interface PropertyAnalysisResponse {
  address: string;
  propertyType: string;
  estimatedRevenue: { monthly: number; annual: number };
  occupancyRate: number;
  averageNightlyRate: number;
  investmentScore: number;
  roi: number;
  insights: string[];
  amenities: string[];
  risks: string[];
  marketTrends: { priceGrowth: number; demandGrowth: number; competitionLevel: string };
  comps: Array<{ address: string; price: number; occupancy: number; rating: number }>;
}

// NAMED EXPORT (not default!)
export async function analyzeListing(url: string): Promise<PropertyAnalysisResponse> {
  const resp = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; HostLensBot/1.0)",
      "Accept-Language": "en-US,en;q=0.9",
    },
  });
  const html = await resp.text();
  const $ = load(html);

  // Try to get Airbnb embedded bootstrap data
  const scriptTag = $('script[data-state]').html();
  let listingData: any = {};
  try {
    const parsed = JSON.parse(scriptTag || "{}");
    listingData = parsed?.bootstrapData?.reduxData?.homePDP || {};
  } catch {}

  const listingInfo = listingData?.listingInfo?.listing || {};
  const pricingQuote = listingData?.pricingQuotes?.[0] || {};

  const beds = listingInfo.bedrooms || 2;
  const baths = listingInfo.bathrooms || 1;
  const city = listingInfo.city || '';
  const address = `${listingInfo.name || 'Unnamed Airbnb'}, ${city}`;
  const nightlyRate = pricingQuote.rate?.amount || 250;

  // Simulated market logic
  const occupancy = 75 + Math.floor(Math.random() * 21); // 75–95%
  const comps = Array.from({ length: 5 }, (_, i) => ({
    address: `Comp ${i + 1}, ${city}`,
    price: Math.round(nightlyRate * (0.9 + Math.random() * 0.2)),
    occupancy: Math.round(60 + Math.random() * 30),
    rating: Number((4.0 + Math.random()).toFixed(1)),
  }));

  const avgCompPrice = comps.reduce((sum, c) => sum + c.price, 0) / comps.length;
  const avgCompOcc = comps.reduce((sum, c) => sum + c.occupancy, 0) / comps.length;

  const monthlyRev = nightlyRate * (occupancy / 100) * 30;
  const annualRev = monthlyRev * 12;
  const estimatedValue = monthlyRev * 80;
  const roi = (annualRev / estimatedValue) * 100;
  const investmentScore = Math.min(10, ((roi / 10) + (occupancy / 10)));

  const insights: string[] = [
    nightlyRate < avgCompPrice
      ? `Your rate is ₱${nightlyRate}, ₱${Math.round(avgCompPrice - nightlyRate)} below area average`
      : 'You’re pricing competitively vs nearby listings',
    occupancy > avgCompOcc
      ? 'Your occupancy is higher than similar listings'
      : 'Slight occupancy lag compared to area comps'
  ];

  const amenities = listingInfo.amenityIds?.length
    ? ['WiFi', 'Kitchen', 'Pool', 'Aircon']
    : ['WiFi', 'Kitchen'];

  return {
    address,
    propertyType: `${beds}BR${baths ? ` ${baths}BA` : ""} ${city}`,
    estimatedRevenue: { monthly: Math.round(monthlyRev), annual: Math.round(annualRev) },
    occupancyRate: occupancy,
    averageNightlyRate: nightlyRate,
    investmentScore: Number(investmentScore.toFixed(1)),
    roi: Number(roi.toFixed(1)),
    insights,
    amenities,
    risks: ['Seasonal dips', 'HOA rules'],
    marketTrends: {
      priceGrowth: Number((5 + Math.random() * 10).toFixed(1)),
      demandGrowth: Number((3 + Math.random() * 8).toFixed(1)),
      competitionLevel: 'Medium'
    },
    comps
  };
}