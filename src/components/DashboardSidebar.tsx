"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X as Close,
  Home,            // NEW  icon
  Search,          // NEW  icon
  Calculator,
  TrendingUp,
  Zap,
  GitCompare,
  Lock,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- nav data ---------- */
const NAV = [
  {
    title: "Dashboard",
    items: [
      { name: "Overview",       href: "/admin/dashboard",            icon: TrendingUp },
      { name: "My Properties",  href: "/admin/dashboard/properties", icon: Home },        // icon changed
    ],
  },
  {
    title: "Analytics",
    items: [
      { name: "Property Analyzer",   href: "/admin/analytics/analyzer", icon: Search },   // icon changed
      { name: "Market Map & Trends", href: "/admin/analytics/market",   icon: TrendingUp },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Pricing Coach",    href: "/admin/tools/pricing",  icon: Zap },
      { name: "Alerts Center",    href: "/admin/tools/alerts",   icon: Lock },
      { name: "Comparison Radar", href: "/admin/tools/compare",  icon: GitCompare },
    ],
  },
  {
    title: "Account",
    items: [
      { name: "Profile & Plan", href: "/admin/account/profile",      icon: Check },
      { name: "Integrations",   href: "/admin/account/integrations", icon: Close },
    ],
  },
];

/* ---------- component ---------- */
export default function DashboardSidebar() {
  const pathname        = usePathname();
  const [mobileOpen, s] = useState(false);
  const [hovered,    h] = useState(false);
  const expanded       = hovered || mobileOpen;
  const w              = expanded ? "w-64" : "w-[60px]";

  return (
    <>
      {/* mobile hamburger */}
      <button
        onClick={() => s(true)}
        className="md:hidden fixed top-4 left-4 z-[999] bg-white/90 backdrop-blur p-2 rounded shadow"
      >
        <Menu className="h-5 w-5 text-gray-700" />
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-[998]" onClick={() => s(false)} />
      )}

      {/* sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-[999] flex flex-col
                    transition-all duration-200 ${w}
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        onMouseEnter={() => h(true)}
        onMouseLeave={() => h(false)}
      >
        {/* logo / close */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Calculator className="h-7 w-7 text-blue-600" />
            {expanded && <span className="text-lg font-bold">PropROI</span>}
          </div>
          {mobileOpen && (
            <button onClick={() => s(false)}>
              <Close className="h-5 w-5 text-gray-600" />
            </button>
          )}
        </div>

        {/* nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-8">
          {NAV.map(({ title, items }) => (
            <div key={title}>
              {expanded && (
                <h3 className="mb-3 pl-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {title}
                </h3>
              )}
              <div className="space-y-[2px]">{/* equal vertical spacing */ }
                {items.map(({ name, href, icon: Icon }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={name}
                      href={href ?? "#"}
                      onClick={() => s(false)}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {expanded && <span>{name}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}