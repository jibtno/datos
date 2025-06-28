"use client";

import { useState } from "react";

export default function HostAnalyzerPage() {
  const [location, setLocation] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!location.trim()) return;
    const res = await fetch(`/api/analyze?location=${encodeURIComponent(location.trim())}`);
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">🏡 Airbnb Profit Analyzer</h1>

      <input
        type="text"
        placeholder="Enter location (e.g., Makati)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />

      <button
        onClick={handleAnalyze}
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        Analyze
      </button>

      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Results:</h2>
          <p>📈 Avg Occupancy Rate: {result.occupancy}%</p>
          <p>💰 Estimated Monthly Income: ₱{result.monthlyIncome}</p>
          <p>🏙️ Listings Nearby: {result.listingsNearby}</p>
        </div>
      )}
    </div>
  );
}