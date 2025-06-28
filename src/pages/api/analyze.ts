import { NextApiRequest, NextApiResponse } from "next";

// Replace with real data later
const dataMock = {
  makati: { occupancy: 72, nightlyRate: 2400, listingsNearby: 132 },
  bgc: { occupancy: 78, nightlyRate: 2600, listingsNearby: 150 },
  qc: { occupancy: 60, nightlyRate: 1700, listingsNearby: 89 },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { location } = req.query;

  const cleanLoc = String(location || "").toLowerCase();

  const stats = dataMock[cleanLoc] || {
    occupancy: 50,
    nightlyRate: 1500,
    listingsNearby: 30,
  };

  const monthlyIncome = Math.round((stats.occupancy / 100) * 30 * stats.nightlyRate);

  res.status(200).json({
    ...stats,
    monthlyIncome,
  });
}