// App Router version (Edge-compatible)
import { NextRequest } from 'next/server';
import { analyzeListing } from '@/utils/analyze'; // adjust as needed

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url || !url.includes("airbnb.com/rooms/")) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid Airbnb URL' }), {
      status: 400,
    });
  }

  try {
    const data = await analyzeListing(url);
    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: 'Scraping failed' }), {
      status: 500,
    });
  }
}
