"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, GitCompare } from "lucide-react";

const StickyHeader = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll(); // run once on mount
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* colour helpers */
  const linkClass = scrolled
    ? "text-gray-600 hover:text-gray-900"
    : "text-white/90 hover:text-white";
  const brandText = scrolled ? "text-gray-900" : "text-white";
  const buttonClass = scrolled
    ? "border-blue-600 text-blue-600 hover:bg-blue-50"
    : "border-white text-white hover:bg-white/10";

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* brand */}
          <div className="flex items-center gap-2">
            <Calculator
              className={`h-6 w-6 ${scrolled ? "text-blue-600" : "text-white"}`}
            />
            <span className={`text-lg font-bold ${brandText}`}>PropROI</span>
          </div>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <button className={`${linkClass} font-medium`}>
              Explore Markets
            </button>
            <button className={`flex items-center gap-1 ${linkClass} font-medium`}>
              <GitCompare className="h-4 w-4" />
              Compare
            </button>
            <button className={`flex items-center gap-1 ${linkClass} font-medium`}>
              <TrendingUp className="h-4 w-4" />
              ROI Calculator
            </button>
          </nav>

          {/* actions */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className={buttonClass}>
              Sign&nbsp;In
            </Button>
            <Button variant="outline" size="sm" className={buttonClass}>
              Start&nbsp;Free
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;