import fs from "fs/promises";
import path from "path";
// Optionally: import { Parser as Json2csvParser } from "json2csv";

// Save data to a JSON file
export async function saveToJson(data: any, filename: string) {
  const filePath = path.resolve(process.cwd(), filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`✅ Saved JSON: ${filePath}`);
}

// Optional: Save data to CSV file
/*
export async function saveToCsv(data: any[], filename: string) {
  const filePath = path.resolve(process.cwd(), filename);
  const parser = new Json2csvParser();
  const csv = parser.parse(data);
  await fs.writeFile(filePath, csv, "utf-8");
  console.log(`✅ Saved CSV: ${filePath}`);
}
*/