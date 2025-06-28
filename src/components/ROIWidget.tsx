"use client";
import React from "react";
import { Calculator, Wallet } from "lucide-react";

export default function ROIWidget() {
  return (
    <div className="flex-1 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg p-6 flex flex-col gap-4 min-w-[300px]">
      <div className="flex items-center gap-3 mb-2">
        <Calculator className="w-6 h-6 text-green-600" />
        <span className="text-lg font-bold text-gray-900">ROI Calculator</span>
      </div>
      <div className="flex flex-col gap-3">
        <ROIStat icon={<Wallet className="w-5 h-5 text-blue-600" />} label="Avg. Monthly ROI" value="7.6%" />
        <ROIStat icon={<Calculator className="w-5 h-5 text-green-600" />} label="Best Performing Unit" value="12.2%" />
      </div>
      <button className="mt-2 py-2 px-4 bg-green-600 text-white rounded-xl font-semibold shadow hover:bg-green-700 transition">
        Simulate Investment
      </button>
    </div>
  );
}

function ROIStat({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-gray-600 flex-1">{label}</span>
      <span className="text-gray-900 font-bold">{value}</span>
    </div>
  );
}