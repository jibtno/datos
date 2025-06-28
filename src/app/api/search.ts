import { getBarangayInfo } from "@/lib/osm";
import { getBarangayStats } from "@/lib/psaData";
import { scrapeMakatiListings } from "../../../scrape-lamudi";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");
  if (!address) return new Response("Missing address", { status: 400 });

  const barangay = await getBarangayInfo(address);
  const psa = await getBarangayStats(barangay?.displayName || "");
  const listings = await scrapeMakatiListings();

  return Response.json({ barangay, psa, listings });
}