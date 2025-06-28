"use client";
import React from "react";
import { TrendingUp, BarChart2, Calendar, Home } from "lucide-react";

export default function MarketInsights() {
  return (
    <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6 min-w-[300px]">
      <div className="flex items-center gap-3 mb-2">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        <span className="text-lg font-bold text-gray-900">Market Insights</span>
      </div>
      <div className="flex flex-col gap-4">
        <InsightRow
          icon={<BarChart2 className="w-5 h-5 text-green-600" />}
          label="Revenue Growth"
          value="+12%"
        />
        <InsightRow
          icon={<Calendar className="w-5 h-5 text-purple-600" />}
          label="Peak Season"
          value="Dec - Mar"
        />
        <InsightRow
          icon={<Home className="w-5 h-5 text-blue-500" />}
          label="Avg. Stay"
          value="4.2 nights"
        />
      </div>
      <button className="mt-3 py-2 px-4 bg-blue-600 text-white rounded-xl font-semibold shadow hover:bg-blue-700 transition">
        View Full Report
      </button>
    </div>
  );
}

function InsightRow({ icon, label, value }: { icon: React.ReactNode; label: string, value: string }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-gray-600 flex-1">{label}</span>
      <span className="text-gray-900 font-bold">{value}</span>
    </div>
  );
}