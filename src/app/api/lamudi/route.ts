import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  const filePath = path.resolve(process.cwd(), "public/data/lamudi.json"); // adjust if your file is elsewhere
  const jsonData = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(jsonData);
  return NextResponse.json(data);
}