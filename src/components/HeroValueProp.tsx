"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TrendingUp,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  Calculator,
  Zap,
  Target,
  Banknote,
  ArrowRight,
} from "lucide-react";

const HeroValueProp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const glass = {
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.2)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "1.5rem",
  };

  const ctaButton =
    "bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-500 hover:from-blue-800 hover:to-indigo-600 text-white font-bold shadow-lg text-lg rounded-xl px-7 py-4 transition duration-200 h-[56px] md:h-[56px]";

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-96 h-96 gradient-primary opacity-15 rounded-full filter blur-3xl float"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 gradient-secondary opacity-10 rounded-full filter blur-3xl float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 gradient-accent opacity-8 rounded-full filter blur-3xl morph-shape"></div>

      <main className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero headline */}
        <div className="text-center mb-16 pt-28 md:pt-36">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-7 bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-400 bg-clip-text text-transparent drop-shadow-md">
            Buy Smarter — Host Smarter
          </h1>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-7 bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-400 bg-clip-text text-transparent drop-shadow-md">
            Earn Smarter.
          </h1>
          {/* Glassmorphic Search */}
          <form
            onSubmit={handleSearch}
            style={{
              ...glass,
              background: "rgba(255,255,255,0.22)",
              border: "1px solid rgba(255,255,255,0.28)",
              boxShadow: "0 8px 32px rgba(31,38,135,0.17)",
            }}
            className="rounded-2xl px-4 py-5 sm:px-8 sm:py-7 max-w-2xl mx-auto mb-7 shadow-xl"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Enter address, location, or Airbnb URL..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-4 h-[56px] text-base md:text-lg bg-white/60 border-white/40 text-blue-900 placeholder:text-blue-400 font-medium rounded-xl shadow-sm flex-1"
                style={{ minWidth: 0 }}
              />
              <button
                type="submit"
                className={`${ctaButton} flex items-center justify-center gap-2 w-full md:w-auto`}
                style={{
                  minHeight: "56px",
                  fontWeight: 700,
                  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
                }}
              >
                <Zap className="w-5 h-5" />
                Analyze Property
              </button>
            </div>
          </form>
        </div>


        {/* How It Works Section - moved further down */}
        <div className="mt-40 md:mt-56 pb-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex-1 flex flex-col items-center text-center px-6 py-8 glass-subtle rounded-xl shadow">
              <div className="mb-4 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-300 rounded-full">
              </div>
              <h4 className="font-bold text-lg mb-2 text-blue-900">Paste Property Link</h4>
              <p className="text-md text-blue-800">
                Drop any Airbnb, Lamudi, or property listing URL
              </p>
            </div>
            <ArrowRight className="hidden md:inline-block w-8 h-8 text-blue-400 mx-2 flex-shrink-0" />
            <div className="flex-1 flex flex-col items-center text-center px-6 py-8 glass-subtle rounded-xl shadow">
              <div className="mb-4 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-green-400 to-emerald-400 rounded-full">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-blue-900">Instant Analysis</h4>
              <p className="text-md text-blue-800">
                Get ROI, occupancy rates, and market scores in seconds
              </p>
            </div>
            <ArrowRight className="hidden md:inline-block w-8 h-8 text-blue-400 mx-2 flex-shrink-0" />
            <div className="flex-1 flex flex-col items-center text-center px-6 py-8 glass-subtle rounded-xl shadow">
              <div className="mb-4 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-300 rounded-full">
                <Calculator className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-blue-900">Make Smart Decisions</h4>
              <p className="text-md text-blue-800">
                Compare properties and invest with confidence
              </p>
            </div>
          </div>
        </div>

        {/* Value Proposition/Why Section */}
        <div style={glass} className="rounded-3xl p-12 max-w-4xl mx-auto text-center shadow-2xl">
          <h2 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Why HostLens Pro?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Calendar className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-bold text-blue-900 mb-2">Seasonal Demand Forecasting</h4>
                  <p className="text-md text-blue-700">Plan pricing and availability around local tourism patterns.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-bold text-blue-900 mb-2">Guest Behavior Analysis</h4>
                  <p className="text-md text-blue-700">See what drives bookings and guest satisfaction in your market.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-bold text-blue-900 mb-2">ROI Calculations</h4>
                  <p className="text-md text-blue-700">See returns and payback periods for any investment, instantly.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <DollarSign className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <h4 className="font-bold text-blue-900 mb-2">Dynamic Pricing Insights</h4>
                  <p className="text-md text-blue-700">Optimize rates for profitability, year-round.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <button
              className={`${ctaButton} px-12 py-4`}
              onClick={() => document.querySelector('input')?.focus()}
              type="button"
            >
              Start Your Free Analysis
            </button>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
          {/* Add your footer CTAs here if needed */}
        </div>
      </main>
    </div>
  );
};

export default HeroValueProp;