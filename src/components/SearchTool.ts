"use client";
import { useState } from "react";

export default function SearchTool() {
  const [address, setAddress] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    const res = await fetch(`/api/search?address=${encodeURIComponent(address)}`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter address or barangay (e.g., Makati, BGC)"
        className="border rounded px-3 py-2 w-2/3"
      />
      <button
        onClick={search}
        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Search
      </button>
      {loading && <div>Loading...</div>}
      {data && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">{data.barangay?.displayName}</h2>
          <p>Population: {data.psa?.Population}</p>
          <p>Income: {data.psa?.Income}</p>
          <h3 className="mt-4 font-semibold">Listings:</h3>
          <ul>
            {data.listings?.map((l: any, i: number) => (
              <li key={i} className="border-b py-2">
                <span className="font-medium">{l.title}</span> – {l.price}
                <br />
                <span className="text-gray-500">{l.location}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}