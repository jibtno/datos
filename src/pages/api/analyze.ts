import type { NextApiRequest, NextApiResponse } from "next";
import { analyzeListing } from "@/utils/analyze"; // make sure this is exported correctly

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ success: false, error: "Missing or invalid URL" });
  }

  try {
    const data = await analyzeListing(url);
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Scrape error:", err);
    res.status(500).json({ success: false, error: "Failed to analyze listing" });
  }
}