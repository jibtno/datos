"use client";
import React from "react";
import { useRouter } from "next/navigation";

import HeroValueProp       from "@/components/HeroValueProp";
import HowItWorks          from "@/components/HowItWorks";
import ComparisonGrid      from "@/components/ComparisonGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingTeaser       from "@/components/PricingTeaser";

import ProvinceHero        from "@/components/ProvinceHero";
import MarketStats         from "@/components/MarketStats";
import FeaturedListings    from "@/components/FeaturedListings";
import BeforeAfterSection  from "@/components/BeforeAfterSection";
import TopAreas            from "@/components/TopAreas";

/* ── shared pay-wall wrapper ───────────────────────────── */
const BlurLock: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  return (
    <div className="relative">
      {/* slightly blurred & inert content */}
      <div className="filter blur-[2px] select-none pointer-events-none">
        {children}
      </div>

      {/* overlay intercepting all clicks */}
      <div
        className="absolute inset-0 z-20 flex items-center justify-center
                   bg-white/10 backdrop-blur-md cursor-pointer"
        onClick={() => router.push("/subscribe")}
      >
        <span className="text-white font-medium">Create a free account to unlock</span>
      </div>
    </div>
  );
};
/* ───────────────────────────────────────────────────────── */

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Sticky nav */}
      <StickyHeader />

      {/* Marketing section above the fold */}
      <div className="-mt-14 pt-0">
        <HeroValueProp />
      </div>
      <HowItWorks />
      <ComparisonGrid />
      <TestimonialsSection />
      <PricingTeaser />

      {/* Premium-gated province details (one combined blur) */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50">
        <BlurLock>
          <ProvinceHero />

          <MarketStats />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-16">
            <FeaturedListings />
          </div>
        </BlurLock>

        {/* Free content continues */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-16">
          <BeforeAfterSection />

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left side left blank because MarketTrends was removed */}
            <div className="lg:col-span-2" />

            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;