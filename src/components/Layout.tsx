"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar";
import {
  LayoutDashboard, Search, FolderKanban, BarChart2, TrendingUp, Globe, CalendarCheck,
  FileText, Star, Bell, Settings, MessageSquareHeart, Home, Menu, X, Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  showAnalyzeButton?: boolean;
}

const sidebarLinks = [
  {
    section: "Overview",
    items: [{ label: "Dashboard", path: "/dashboard", icon: LayoutDashboard }],
  },
  {
    section: "Tools",
    items: [
      { label: "Analyze Property", path: "/tools/analyze", icon: Search },
      { label: "Compare Properties", path: "/tools/compare", icon: BarChart2 },
      { label: "Pricing Coach", path: "/tools/pricing-coach", icon: TrendingUp },
      { label: "Market Explorer", path: "/tools/market-explorer", icon: Globe },
    ],
  },
  {
    section: "Your Data",
    items: [
      { label: "Saved Portfolio", path: "/mydata/portfolio", icon: FolderKanban },
      { label: "Calendar View", path: "/mydata/calendar", icon: CalendarCheck },
      { label: "Reports", path: "/mydata/reports", icon: FileText },
      { label: "Watchlist", path: "/mydata/watchlist", icon: Star },
    ],
  },
  {
    section: "Engagement",
    items: [
      { label: "Alerts & Insights", path: "/engagement/alerts", icon: Bell },
      { label: "Feedback & Roadmap", path: "/engagement/feedback", icon: MessageSquareHeart },
    ],
  },
  {
    section: "Settings",
    items: [{ label: "Settings", path: "/settings", icon: Settings }],
  },
];

export default function Layout({ children, pageTitle, showAnalyzeButton = false }: LayoutProps) {
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Expanded if hovered on desktop, or open on mobile
  const desktopSidebarExpanded = !sidebarOpenMobile && sidebarHovered;
  const sidebarExpanded = sidebarOpenMobile || desktopSidebarExpanded;

  // Sidebar width for layout
  const sidebarWidth = sidebarExpanded ? "w-56" : "w-16";
  const headerMarginLeft = sidebarExpanded ? "lg:ml-56" : "lg:ml-16";
  // Opacity for mobile (higher opacity when mobile sidebar open)
  const sidebarBg = sidebarOpenMobile
    ? "bg-white/60"
    : "bg-white/20";

  const handleAnalyzeClick = () => {
    router.push('/tools/analyze');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Floating background elements */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-indigo-600/20 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="fixed bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-400/15 to-purple-600/15 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-blue-600/10 rounded-full filter blur-3xl animate-pulse delay-500"></div>

      <div className="relative z-10 flex">
        {/* Sidebar */}
        <div
          className={cn(
            "fixed top-0 left-0 z-50 h-screen", sidebarBg,
            "backdrop-blur-xl border-r border-white/30 transition-all duration-300 flex flex-col group/sidebar",
            sidebarOpenMobile ? "translate-x-0" : "-translate-x-full",
            "lg:translate-x-0",
            sidebarExpanded ? "w-56" : "w-16"
          )}
          onMouseEnter={() => !sidebarOpenMobile && setSidebarHovered(true)}
          onMouseLeave={() => !sidebarOpenMobile && setSidebarHovered(false)}
        >
          {/* Logo/Brand area */}
          <div className={cn(
            "flex items-center justify-center gap-3 px-2 py-5 border-b border-white/20",
            sidebarExpanded && "justify-start px-3"
          )}>
            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-1.5 border border-white/30 flex items-center justify-center">
              <Home className="w-6 h-6 text-purple-600" />
            </div>
            {sidebarExpanded && (
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  HostLens Pro
                </h1>
                <p className="text-xs text-slate-600">Investment Dashboard</p>
              </div>
            )}
          </div>

          {/* Navigation Sections */}
          <nav className="flex-1 px-1 py-2 space-y-4 overflow-y-auto">
            {sidebarLinks.map(section => (
              <div key={section.section}>
                {sidebarExpanded && (
                  <div className="text-xs uppercase font-semibold tracking-wide text-slate-500 mb-2 text-center w-full">
                    {section.section}
                  </div>
                )}
                <div className="space-y-1">
                  {section.items.map(item => {
                    const isActive = pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.label}
                        onClick={() => {
                          router.push(item.path);
                          setSidebarOpenMobile(false);
                        }}
                        className={cn(
                          "w-full flex items-center transition-all duration-200 rounded-xl text-left",
                          sidebarExpanded
                            ? "gap-2 px-3 py-2"
                            : "justify-center px-2 py-3",
                          isActive
                            ? "bg-gradient-to-r from-purple-500/20 to-indigo-600/20 text-purple-700 border border-purple-200/50 shadow-lg"
                            : "text-slate-700 hover:bg-white/30 hover:text-slate-900"
                        )}
                      >
                        <span className="flex items-center justify-center">
                          <Icon className="w-5 h-5 flex-shrink-0" />
                        </span>
                        {sidebarExpanded && <span className="font-medium ml-2 truncate">{item.label}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
          {/* Footer */}
          <div className={cn("p-2 border-t border-white/20 transition-all duration-300", sidebarExpanded ? "" : "justify-center flex")}>
            <div className={cn("bg-white/20 backdrop-blur-xl rounded-xl p-2 border border-white/30", sidebarExpanded ? "" : "w-8 h-8 flex items-center justify-center p-0")}>
              {sidebarExpanded ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-slate-700">Free Plan</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">5 analyses remaining</p>
                  <Button className="w-full h-8 text-xs bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">
                    Upgrade Pro
                  </Button>
                </>
              ) : (
                <Target className="w-5 h-5 text-orange-600" />
              )}
            </div>
          </div>
        </div>

        {/* Mobile sidebar overlay (dims only the page, not the sidebar) */}
        {sidebarOpenMobile && (
          <div
            className="fixed inset-0 bg-black/70 z-40 lg:hidden"
            aria-label="Sidebar overlay"
            onClick={() => setSidebarOpenMobile(false)}
            style={{ left: "4rem" }}
          />
        )}

        {/* Main content */}
        <div
          className={cn(
            "flex-1 min-h-screen transition-all duration-300",
            "lg:relative",
            sidebarExpanded ? "lg:ml-56" : "lg:ml-16"
          )}
        >
          {/* Header */}
          <header className={cn(
            "sticky top-0 z-30 bg-white/20 backdrop-blur-xl border-b border-white/30 transition-all duration-300",
            sidebarExpanded ? "lg:ml-56" : "lg:ml-16"
          )}>
            <div className="flex items-center justify-between h-16 px-4">
              <div className="flex items-center gap-4">
                {/* Mobile menu button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpenMobile(!sidebarOpenMobile)}
                >
                  {sidebarOpenMobile ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
                {pageTitle && (
                  <h2 className="text-xl font-bold text-slate-800">{pageTitle}</h2>
                )}
              </div>
              <div className="flex items-center gap-4">
                {showAnalyzeButton && (
                  <Button
                    onClick={handleAnalyzeClick}
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Run New Analysis
                  </Button>
                )}
                <Avatar className="w-8 h-8 border border-white/30">
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-medium">
                    JT
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>
          {/* Page content */}
          <main className="p-4">{children}</main>
        </div>
      </div>
    </div>
  );
}