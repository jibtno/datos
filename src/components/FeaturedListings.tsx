'use client'
import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, TrendingUp, Plus, UserCheck, Filter, ChevronDown } from "lucide-react";
import PropertyComparisonBar from "./PropertyComparisonBar";
import PriceTooltip from "./PriceTooltip";

import bgcListings from "@/public/data/bgc.json";
import rockwellListings from "@/public/data/rockwell.json";
import ortigasListings from "@/public/data/ortigas.json";
import moaListings from "@/public/data/moa.json";
import katipunanListings from "@/public/data/katipunan.json";

const ZONE_LABELS: Record<string, string> = {
  bgc: "Bonifacio Global City",
  rockwell: "Makati",
  ortigas: "Ortigas",
  katipunan: "Quezon City",
  moa: "Pasay",
};

const ALL_LISTINGS = [
  ...bgcListings.map((l) => ({ ...l, __zone: "bgc" })),
  ...rockwellListings.map((l) => ({ ...l, __zone: "rockwell" })),
  ...ortigasListings.map((l) => ({ ...l, __zone: "ortigas" })),
  ...moaListings.map((l) => ({ ...l, __zone: "moa" })),
  ...katipunanListings.map((l) => ({ ...l, __zone: "katipunan" })),
];

const PAGE_SIZE = 6;

const FeaturedListings = () => {
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const [zoneFilter, setZoneFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [bedroomFilter, setBedroomFilter] = useState("");

  const zoneOptions = useMemo(
    () =>
      [
        ...new Set(
          ALL_LISTINGS.map((l) =>
            l.__zone ? ZONE_LABELS[l.__zone] : l.zone || l.location || "Zone"
          )
        ),
      ].filter(Boolean),
    []
  );
  const typeOptions = useMemo(
    () =>
      [
        ...new Set(
          ALL_LISTINGS.map((l) =>
            l.type && l.type.trim()
              ? l.type
              : (l.building || l.title || "")
                  .toLowerCase()
                  .includes("condo")
              ? "Condo"
              : (l.building || l.title || "")
                  .toLowerCase()
                  .includes("loft")
              ? "Loft"
              : (l.building || l.title || "")
                  .toLowerCase()
                  .includes("apartment")
              ? "Apartment"
              : (l.building || l.title || "")
                  .toLowerCase()
                  .includes("tower")
              ? "Tower"
              : (l.building || l.title || "")
                  .toLowerCase()
                  .includes("suite")
              ? "Suite"
              : (l.building || l.title || "")
                  .toLowerCase()
                  .includes("house")
              ? "House"
              : "Property"
          )
        ),
      ].filter(Boolean),
    []
  );
  const bedroomOptions = useMemo(
    () =>
      [
        ...new Set(
          ALL_LISTINGS
            .map((l) => l.bedrooms && typeof l.bedrooms === "number" ? l.bedrooms : null)
            .filter((v): v is number => v !== null)
        ),
      ]
        .sort((a, b) => a - b)
        .map(String),
    []
  );

  const filteredListings = useMemo(() => {
    return ALL_LISTINGS.filter((l) => {
      const matchesZone =
        !zoneFilter ||
        (l.__zone && ZONE_LABELS[l.__zone] === zoneFilter) ||
        (l.zone && l.zone === zoneFilter) ||
        (l.location && l.location === zoneFilter);
      const type =
        l.type && l.type.trim()
          ? l.type
          : (l.building || l.title || "")
                .toLowerCase()
                .includes("condo")
          ? "Condo"
          : (l.building || l.title || "")
                .toLowerCase()
                .includes("loft")
          ? "Loft"
          : (l.building || l.title || "")
                .toLowerCase()
                .includes("apartment")
          ? "Apartment"
          : (l.building || l.title || "")
                .toLowerCase()
                .includes("tower")
          ? "Tower"
          : (l.building || l.title || "")
                .toLowerCase()
                .includes("suite")
          ? "Suite"
          : (l.building || l.title || "")
                .toLowerCase()
                .includes("house")
          ? "House"
          : "Property";
      const matchesType = !typeFilter || type === typeFilter;
      const matchesBedroom =
        !bedroomFilter ||
        String(l.bedrooms) === bedroomFilter;
      return matchesZone && matchesType && matchesBedroom;
    });
  }, [zoneFilter, typeFilter, bedroomFilter]);

  const paginatedListings = filteredListings.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
  const totalPages = Math.ceil(filteredListings.length / PAGE_SIZE);

  const handleCompareToggle = (propertyId: string) => {
    setSelectedProperties((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : prev.length < 3
        ? [...prev, propertyId]
        : prev
    );
  };

  const handleRemoveProperty = (propertyId: string) => {
    setSelectedProperties((prev) => prev.filter((id) => id !== propertyId));
  };

  const handleCompare = () => {
    console.log("Comparing properties:", selectedProperties);
  };

  const getRoiColor = (roi: string) => {
    switch (roi) {
      case "High ROI":
        return "bg-green-100 text-green-800 border-green-200";
      case "Good ROI":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Growing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Properties</h2>
          <p className="text-gray-600">
            Top performing Airbnb-ready properties in Metro Manila
          </p>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <Badge variant="outline" className="text-sm">
            <TrendingUp className="h-4 w-4 mr-1" />
            Updated Today
          </Badge>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => {setZoneFilter("");setTypeFilter("");setBedroomFilter("");}}>
              <Filter className="h-4 w-4 mr-2" />
              All Properties
            </Button>
            <DropdownFilter
              label="Zones"
              options={zoneOptions}
              value={zoneFilter}
              onChange={setZoneFilter}
            />
            <DropdownFilter
              label="Type"
              options={typeOptions}
              value={typeFilter}
              onChange={setTypeFilter}
            />
            <DropdownFilter
              label="Bedroom"
              options={bedroomOptions}
              value={bedroomFilter}
              onChange={setBedroomFilter}
            />
            <Button variant="outline" size="sm">
              Trending Areas
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedListings.map((listing) => {
          const type =
            listing.type && listing.type.trim()
              ? listing.type
              : "Property";
          const zoneLabel =
            (listing.__zone && ZONE_LABELS[listing.__zone]) ||
            listing.zone ||
            listing.location ||
            "Zone";
          let displayPrice: number = typeof listing.price === "number" ? listing.price : parseFloat(listing.price);
          let showNightly = displayPrice > 100000;
          let priceToShow = showNightly
            ? Math.round(displayPrice / 30)
            : displayPrice;

          return (
            <Card
              key={listing.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-48 relative bg-gray-200 flex items-center justify-center">
                {listing.image ? (
                  <img
                    src={listing.image}
                    alt={type}
                    className="object-cover w-full h-full"
                    style={{ objectPosition: "center" }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl text-gray-300">
                    🏢
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="secondary"
                    className="bg-white/90 text-gray-800 capitalize"
                  >
                    {type}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className={getRoiColor(listing.roi)}>
                    {listing.roi}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <div className="font-semibold text-gray-900 mb-2">
                  {listing.building}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {zoneLabel}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <PriceTooltip price={priceToShow}>
                      <span className="text-2xl font-bold text-gray-900 cursor-help">
                        ₱{Number(priceToShow).toLocaleString()}
                      </span>
                    </PriceTooltip>
                    <span className="text-sm text-gray-600">
                      {showNightly ? "/night" : "/month"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{listing.rating}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-green-600">
                        {listing.occupancy}%
                      </span>
                      <span className="text-gray-600 ml-1">occupied</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${listing.occupancy}%` }}
                    ></div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant={
                        selectedProperties.includes(listing.id)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => handleCompareToggle(listing.id)}
                      disabled={
                        !selectedProperties.includes(listing.id) &&
                        selectedProperties.length >= 3
                      }
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      {selectedProperties.includes(listing.id)
                        ? "Selected"
                        : "Compare"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <UserCheck className="h-4 w-4 mr-1" />
                      Claim
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center items-center gap-4 mt-10">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </Button>
      </div>

      <PropertyComparisonBar
        selectedProperties={selectedProperties}
        onRemoveProperty={handleRemoveProperty}
        onCompare={handleCompare}
      />
    </section>
  );
};

function DropdownFilter({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center"
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <span>{label}</span>
        <ChevronDown className="w-4 h-4 ml-1" />
      </Button>
      {open && (
        <div className="absolute z-20 mt-2 bg-white border rounded shadow min-w-[140px]">
          {options.map((option) => (
            <button
              key={option}
              className={`block w-full text-left px-4 py-2 hover:bg-blue-50 ${
                option === value ? "font-bold text-blue-700" : ""
              }`}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              type="button"
            >
              {option}
            </button>
          ))}
          <button
            className="block w-full text-left px-4 py-2 text-gray-500 hover:bg-blue-50"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            type="button"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default FeaturedListings;