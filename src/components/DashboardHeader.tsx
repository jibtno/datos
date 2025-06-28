"use client";
import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserDropdown from "@/components/UserDropdown";

const DashboardHeader = () => (
  <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
    {/* Search / Quick-analyzer */}
    <div className="flex-1 max-w-xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Paste listing URL or type a location…"
          className="w-full pl-12 pr-4 py-2.5 rounded-full border border-gray-300 bg-gray-50
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    {/* Actions */}
    <div className="flex items-center gap-4 ml-6">
      <Button variant="outline" size="sm">
        Upgrade Plan
      </Button>
      <UserDropdown userName="Alice" userEmail="alice@example.com" userInitials="A" isPremium />
    </div>
  </header>
);

export default DashboardHeader;