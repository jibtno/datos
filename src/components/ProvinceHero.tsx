"use client";
import React from "react";
import { useParams } from "next/navigation";
import {
  MapPin,
  TrendingUp,
  Star,
  Calculator,
} from "lucide-react";

import { Card }    from "@/components/ui/card";
import { Button }  from "@/components/ui/button";
import { Badge }   from "@/components/ui/badge";

import InvestmentCalculatorModal from "./InvestmentCalculatorModal";
import InteractiveMarketMap from "@/components/InteractiveMarketMap.client";
import MiniROISimulator          from "./MiniROISimulator";

/* ---------- Types for safety (optional) ---------- */
interface Listing {
  title: string;
  location?: string;
  price?: number;
  image?: string;
  occupancy?: number;
  nightlyRate?: number;
  url?: string;
}

/* ---------- Helper: slug → Title Case ---------- */
const toTitleCase = (raw: string) =>
  raw
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

/* ================================================= */
interface ProvinceHeroProps {
  featuredListing?: Listing | null;
  mapCenter?: [number, number];
}

const ProvinceHero: React.FC<ProvinceHeroProps> = ({
  featuredListing,
  mapCenter,
}) => {
  /* 1) Province name from the URL slug */
  const { province } = useParams() as { province: string };
  const provinceName = toTitleCase(decodeURIComponent(province));

  /* 2) Some quick placeholders / fallbacks */
  const {
    title       = "Featured Property",
    location    = provinceName,
    price       = 0,
    occupancy   = 0,
    image       = "https://source.unsplash.com/400x300/?condo,philippines",
    url         = "#",
  } = featuredListing ?? {};

  return (
    <div className="relative bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* ───────────────────────────────── Left column ───────────────────────────── */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900">
                  {provinceName}
                </h1>

                {/* Example ranking badge; replace with real data if available */}
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 border-green-200"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Hot Market
                </Badge>
              </div>

              <p className="text-lg text-gray-600">
                Key insights and investment stats for {provinceName}
              </p>
            </div>

            {/* Market-score CTA */}
            <Card className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    Market Score
                  </p>
                  {/* Static placeholder – swap for real value if available */}
                  <p className="text-4xl font-bold">8.2</p>
                  <p className="text-blue-100 text-sm">
                    Excellent Investment Potential
                  </p>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <Star className="h-8 w-8 text-yellow-300 fill-current" />
                  <InvestmentCalculatorModal
                    trigger={
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-white text-blue-600 hover:bg-blue-50"
                      >
                        <Calculator className="h-4 w-4 mr-1" />
                        Should I Invest?
                      </Button>
                    }
                  />
                </div>
              </div>
            </Card>

            {/* Quick stats – replace placeholders with real aggregated data if desired */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center hover:shadow-md transition-shadow">
                <p className="text-2xl font-bold text-gray-900">51%</p>
                <p className="text-sm text-gray-600">Avg&nbsp;Occupancy</p>
              </Card>

              <Card className="p-4 text-center hover:shadow-md transition-shadow">
                <p className="text-2xl font-bold text-gray-900">₱2,200</p>
                <p className="text-sm text-gray-600">Avg&nbsp;Nightly&nbsp;Rate</p>
              </Card>

              <Card className="p-4 text-center hover:shadow-md transition-shadow">
                <p className="text-2xl font-bold text-gray-900">25,700</p>
                <p className="text-sm text-gray-600">Active&nbsp;Listings</p>
              </Card>
            </div>

            {/* Mini ROI simulator */}
            <MiniROISimulator />
          </div>

          {/* ───────────────────────────────── Right column ──────────────────────────── */}
          <div className="space-y-4">
            {/* Map preview */}
            <Card className="p-0 h-80 flex items-stretch">
              <div className="h-full w-full rounded-xl overflow-hidden">
                <InteractiveMarketMap center={mapCenter} />
              </div>
            </Card>

            {/* Featured property card */}
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <img
                  src={image}
                  alt={title}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Featured Property</p>
                  <p className="text-sm text-gray-600">{title}</p>
                  <p className="text-sm font-medium text-green-600">
                    ₱{price?.toLocaleString()}/night • {occupancy || 89}% occupied
                  </p>
                </div>
              </div>

              {url !== "#" && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-3 text-blue-600 underline text-sm"
                >
                  View Listing
                </a>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProvinceHero;