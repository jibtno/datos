"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

import ProvinceHero    from "@/components/ProvinceHero";
import MarketStats     from "@/components/MarketStats";
import FeaturedListings from "@/components/FeaturedListings";
import TopAreas        from "@/components/TopAreas";
import MarketTrends    from "@/components/MarketTrends";
import HostInsights    from "@/components/HostInsights";

import listingsData from "@/public/data/bgc.json";   // <- your sample data

/* ------------  Types (optional but handy) ------------ */
interface Listing {
  title: string;
  location?: string;
  province?: string;
  image?: string;
  bedrooms?: number;
  bathrooms?: number;
  price?: number;
  url?: string;
}

/* ===================================================== */
export default function ProvincePage() {
  /* ─ 1.  Read & normalise the slug ────────────────── */
  const { province } = useParams() as { province: string };
  const slug = province.replace(/_/g, " ").toLowerCase().trim();

  /* ─ 2.  Match helper ─────────────────────────────── */
  const matchesSlug = (raw?: string | null) => {
    if (!raw) return false;
    return raw.replace(/_/g, " ").toLowerCase().includes(slug);
  };

  /* ─ 3.  Filter listings (province OR location) ───── */
  const filteredListings: Listing[] = (listingsData as Listing[]).filter(
    (l) => matchesSlug(l.province) || matchesSlug(l.location)
  );

  /* ─ 4.  Map centre lookup (unchanged) ────────────── */
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    14.5995, 120.9842,
  ]);

  useEffect(() => {
    const fetchCenter = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
            `${slug}, philippines`
          )}`
        );
        const data = await res.json();
        if (data?.[0]) {
          setMapCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      } catch {
        /* fall back to default centre */
      }
    };
    fetchCenter();
  }, [slug]);

  /* ─ 5.  Card scroll-into-view on click ───────────── */
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (selectedId && cardRefs.current[selectedId]) {
      cardRefs.current[selectedId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedId]);

  /* ─ 6.  Featured listing (first in list) ─────────── */
  const featuredListing = filteredListings[0];

  /* ─ 7.  Render page ──────────────────────────────── */
  return (
    <div className="w-full bg-white">
      <ProvinceHero featuredListing={featuredListing} mapCenter={mapCenter} />
      <MarketStats listings={filteredListings} />

      <div className="w-full max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-8 pb-16 space-y-16">
        <FeaturedListings listings={filteredListings} />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left / main column */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <MarketTrends listings={filteredListings} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {filteredListings.map((listing, idx) => {
                const id = listing.url ?? String(idx);
                return (
                  <div
                    key={id}
                    ref={(el) => (cardRefs.current[id] = el)}
                    onClick={() => setSelectedId(id)}
                    className={`bg-white rounded-2xl shadow hover:shadow-xl transition p-4 flex flex-col cursor-pointer ring-2 ${
                      selectedId === id ? "ring-blue-500" : "ring-transparent"
                    }`}
                  >
                    <img
                      src={
                        listing.image ??
                        "https://source.unsplash.com/400x300/?condo,philippines"
                      }
                      alt={listing.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />

                    <div className="flex-1">
                      <div className="text-lg font-bold text-gray-900">
                        {listing.title}
                      </div>
                      <div className="text-sm text-gray-500 mb-2">
                        {listing.location}
                      </div>
                      <div className="flex gap-2 text-xs text-gray-500">
                        {listing.bedrooms && <span>{listing.bedrooms}BR</span>}
                        {listing.bathrooms && (
                          <span>• {listing.bathrooms}BA</span>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-blue-700 font-bold text-lg">
                        ₱{listing.price?.toLocaleString()}
                      </span>
                    </div>

                    {listing.url && (
                      <a
                        href={listing.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-blue-600 underline"
                      >
                        View Listing
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right / side column */}
          <div className="flex flex-col gap-8">
            <TopAreas listings={filteredListings} />
          </div>
        </div>

        <HostInsights listings={filteredListings} />
      </div>
    </div>
  );
}