"use client";
import React, { useState } from "react";
import Link from "next/link";
import { TrendingUp, Calculator, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import InvestmentCalculatorModal from "./InvestmentCalculatorModal";

const HeroValueProp = () => {
  const [propertyPrice, setPropertyPrice] = useState(5_000_000);
  const [monthlyRent, setMonthlyRent] = useState(25_000);

  const calculateROI = () => {
    const annualRent = monthlyRent * 12 * 0.78; // 78 % occupancy
    return ((annualRent / propertyPrice) * 100).toFixed(1);
  };

  const calculateBreakeven = () => {
    const annualRent = monthlyRent * 12 * 0.78;
    return (propertyPrice / annualRent).toFixed(1);
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-8">
          {/* Core promise */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Zap className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium">Know Before You Buy</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Know exactly how much<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                your rental will earn
              </span>
              <br />— before you buy.
            </h1>

            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Turn any property listing into an ROI machine. Get exact rental income
              projections for Metro Manila in under 10 seconds.
            </p>
          </div>

          {/* Interactive preview */}
          <Card className="max-w-2xl mx-auto p-8 bg-white/10 backdrop-blur-sm border-white/20">
            <div className="space-y-6">
              {/* Inputs */}
              <div className="text-left">
                <h3 className="text-lg font-semibold mb-4">
                  Try it now – BGC 1BR Condo sample
                </h3>

                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="text-blue-200">Purchase Price</p>
                    <input
                      type="text"
                      value={`₱${propertyPrice.toLocaleString()}`}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[₱,]/g, "");
                        if (!isNaN(Number(val))) setPropertyPrice(Number(val));
                      }}
                      className="text-2xl font-bold bg-transparent border-b border-white/30 focus:border-white outline-none w-full"
                    />
                  </div>

                  <div>
                    <p className="text-blue-200">Location Score</p>
                    <p className="text-2xl font-bold text-green-300">8.7/10</p>
                  </div>
                </div>
              </div>

              {/* ROI block */}
              <div className="bg-green-500/20 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-200 text-sm">Expected Monthly Rent</p>
                    <input
                      type="text"
                      value={`₱${monthlyRent.toLocaleString()}`}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[₱,]/g, "");
                        if (!isNaN(Number(val))) setMonthlyRent(Number(val));
                      }}
                      className="text-3xl font-bold text-green-300 bg-transparent border-b border-green-300/30 focus:border-green-300 outline-none w-full"
                    />
                  </div>

                  <div className="text-right">
                    <p className="text-green-200 text-sm">Annual ROI</p>
                    <p className="text-3xl font-bold text-green-300">
                      {calculateROI()}%
                    </p>
                    <p className="text-xs text-green-200">
                      Net after fees, based on avg occupancy
                    </p>
                  </div>
                </div>

                <p className="text-green-200 text-sm mt-2">
                  Breakeven in {calculateBreakeven()} years • 78 % occupancy expected
                </p>
              </div>

              {/* Call-to-action buttons */}
              <div className="flex gap-3">
                <InvestmentCalculatorModal
                  trigger={
                    <Button
                      size="lg"
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4"
                    >
                      <Calculator className="h-5 w-5 mr-2" />
                      Calculate Your Property&rsquo;s ROI Now
                    </Button>
                  }
                />

                {/* Next.js Link instead of react-router */}
                <Link href="/dashboard" passHref>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-semibold py-4"
                  >
                    <span>Browse Metro Manila Data</span>
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-blue-200 text-center">
                Based on real Airbnb and Lamudi market data from the past 90 days.
              </p>
            </div>
          </Card>

          {/* Quick benefits */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: <TrendingUp className="h-6 w-6 text-green-300" />,
                title: "Exact ROI Predictions",
                desc: "No more guessing. Get precise rental income forecasts.",
              },
              {
                icon: <Zap className="h-6 w-6 text-yellow-300" />,
                title: "Market Insights in 1 Click",
                desc: "Skip weeks of research. Get answers instantly.",
              },
              {
                icon: <Calculator className="h-6 w-6 text-blue-300" />,
                title: "Live Market Data",
                desc: "Updated daily, not from last year's reports.",
              },
            ].map((b) => (
              <div key={b.title} className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  {b.icon}
                </div>
                <h4 className="font-semibold mb-2">{b.title}</h4>
                <p className="text-blue-200 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroValueProp;