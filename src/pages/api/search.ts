import { getBarangayInfo } from "@/lib/osm";
import { getBarangayStats } from "@/lib/psaData";
import { scrapeMakatiListings } from "../../../scrape-lamudi";

export default async function handler(req, res) {
  const { address } = req.query;
  if (!address) return res.status(400).json({ error: "Missing address" });

  const barangay = await getBarangayInfo(address as string);
  const psa = await getBarangayStats(barangay?.displayName || "");
  const listings = await scrapeMakatiListings();

  res.status(200).json({ barangay, psa, listings });
}