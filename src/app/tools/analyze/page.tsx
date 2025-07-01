"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProgressLoading from "@/components/ProgressLoading";
import {
  Link2,
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
import Layout from '@/components/Layout';

const HeroValueProp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const glass = {
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.2)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "1.5rem",
  };

  const ctaButton =
    "bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-500 hover:from-blue-800 hover:to-indigo-600 text-white font-bold shadow-lg text-lg rounded-xl px-7 py-4 transition duration-200 h-[56px] md:h-[56px]";

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    // Airbnb URL detection
    if (/^https:\/\/(www\.)?airbnb\.com\/rooms\//.test(trimmed)) {
      setLoading(true);
      const res = await fetch("/api/scrape-airbnb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const propertyInfo = await res.json();
      setLoading(false);

      // Pass all relevant info via query params
      const params = new URLSearchParams({
        address: propertyInfo.address || "",
        beds: propertyInfo.beds || "",
        baths: propertyInfo.baths || "",
        latitude: propertyInfo.latitude || "",
        longitude: propertyInfo.longitude || "",
        city: propertyInfo.city || "",
        region: propertyInfo.region || "",
        // ...add more as needed
      }).toString();

      router.push(`/tools/analyze/results?${params}`);
      return;
    }

    // Default: show loading and go to dashboard/results
    setLoading(true);
  };

  // When loading completes, check auth and route accordingly
  const handleLoadingComplete = async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      router.push(`/tools/analyze/results?query=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/dashboard");
    }
  };

  if (loading) return <ProgressLoading searchQuery={searchQuery} onComplete={handleLoadingComplete} />;

  return (
    <Layout pageTitle="Property Analyzer" showAnalyzeButton={false}>
      <div className="min-h-screen overflow-hidden relative">
        {/* Floating background elements */}
        <div className="absolute top-20 left-10 w-96 h-96 gradient-primary opacity-15 rounded-full filter blur-3xl float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 gradient-secondary opacity-10 rounded-full filter blur-3xl float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 gradient-accent opacity-8 rounded-full filter blur-3xl morph-shape"></div>

        <main className="container mx-auto px-4 py-16 relative z-10">
          {/* Hero headline */}
          <div className="text-center mb-16 pt-28 md:pt-36">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-7 bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-400 bg-clip-text text-transparent drop-shadow-md">
              Let us do the rest.
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
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="flex-1 flex flex-col items-center text-center px-6 py-8 glass-subtle rounded-xl shadow">
                <div className="mb-4 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-300 rounded-full">
                  <Link2 className="w-7 h-7 text-white" />
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
          {/* ...rest of your component remains unchanged... */}
        </main>
      </div>
    </Layout>
  );
};

export default HeroValueProp;