"use client";
import React from "react";
import { Star } from "lucide-react";
import listingsData from "@/public/data/bgc.json";

export interface Listing {
  title: string;
  price: string | number;
  image?: string;
  rating?: number;
  bedrooms?: number;
  bathrooms?: number;
  address?: string;
  [key: string]: any;
}

const listings: Listing[] = listingsData as Listing[];

const FeaturedPropertyCard: React.FC<{ listing?: Listing }> = ({
  listing = listings[0],
}) => {
  const { image, title, rating, bedrooms, bathrooms, price, address } = listing;

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl shadow-lg overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl max-w-xs w-full">
      <div className="relative h-56 w-full bg-gray-200">
        <img
          src={image ?? "/images/placeholder-property.png"}
          alt={title}
          className="object-cover w-full h-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/images/placeholder-property.png";
          }}
        />
        <div className="absolute top-2 left-2 bg-white bg-opacity-80 rounded-lg px-2 py-1 text-xs font-semibold shadow text-gray-700">
          {bedrooms != null ? (
            <span className="mr-2">🛏 {bedrooms}</span>
          ) : (
            <span className="mr-2 text-gray-400">🛏 &ndash;</span>
          )}
          {bathrooms != null ? (
            <span>🛁 {bathrooms}</span>
          ) : (
            <span className="text-gray-400">🛁 &ndash;</span>
          )}
        </div>
        <div className="absolute top-2 right-2 flex items-center bg-white bg-opacity-80 rounded-lg px-2 py-1 text-xs font-semibold shadow">
          <Star
            className="w-4 h-4 text-yellow-400 mr-1"
            fill={rating != null ? "#facc15" : "none"}
          />
          {rating != null ? (
            <span className="text-gray-800">{rating.toFixed(1)}</span>
          ) : (
            <span className="text-gray-400">&ndash;</span>
          )}
        </div>
      </div>
      <div className="p-4">
        <h2 className="font-bold text-lg text-gray-900 truncate" title={title}>
          {title}
        </h2>
        <div
          className="text-gray-500 text-sm mb-2 truncate"
          title={address ?? ""}
        >
          {address ?? "\u2014"}
        </div>
        <div className="flex items-end justify-between mt-2">
          <span className="text-xl font-bold text-blue-700">
            {typeof price === "number" ? `₱${price.toLocaleString()}` : price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertyCard;