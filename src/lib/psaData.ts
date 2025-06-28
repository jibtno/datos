import fs from "fs";
import path from "path";
import csv from "csv-parser";

export async function getBarangayStats(barangayName: string) {
  const results: any[] = [];
  const filePath = path.join(process.cwd(), "data", "psa_barangay.csv");
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
const match = results.find((row) =>
  typeof row.Barangay === "string" &&
  row.Barangay.toLowerCase().includes(barangayName.toLowerCase())
);
        resolve(match || null);
      })
      .on("error", reject);
  });
}