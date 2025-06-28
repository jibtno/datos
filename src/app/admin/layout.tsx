"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  Map,
  BarChart2,
  TrendingUp,
  List,
  Calendar,
  Inbox,
  Wrench,
  Settings,
  Plus,
  ChevronDown,
} from "lucide-react";

/* ---------- Helper for chevron rotation ---------- */
const DownChevron = ({ open }: { open: boolean }) => (
  <ChevronDown
    size={18}
    className={`ml-auto transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    strokeWidth={2}
  />
);

/* ---------- Updated navigation structure ---------- */
const NAV = [
  {
    type: "group",
    name: "Dashboard",
    icon: <Home size={22} />,
    subpages: [
      { name: "Overview", href: "/admin/dashboard" },
      { name: "Quick Stats", href: "/admin/dashboard/quick-stats" },
    ],
  },
  {
    type: "group",
    name: "Explore Markets",
    icon: <Map size={22} />,
    subpages: [
      { name: "Interactive Map", href: "/admin/explore" },
      { name: "Top Locations", href: "/admin/explore/top-locations" }, // renamed
      { name: "Compare Areas", href: "/admin/explore/compare" },       // renamed
    ],
  },
  {
    type: "group",
    name: "Performance",
    icon: <TrendingUp size={22} />, // using TrendingUp for variety
    subpages: [
      { name: "Analytics", href: "/admin/performance/analytics" }, // merged income + occupancy
      { name: "ROI Calculator", href: "/admin/performance/roi" },
    ],
  },
  {
    type: "group",
    name: "Manage Properties",
    icon: <Wrench size={22} />,
    subpages: [
      { name: "My Listings", href: "/admin/manage/listings" },     // moved under manage
      { name: "Booking Calendar", href: "/admin/manage/calendar" },
      { name: "Smart Tools", href: "/admin/manage/smart-tools" },  // renamed Automation → Smart Tools
      { name: "Inbox", href: "/admin/manage/inbox" },
    ],
  },
];

/* ---------- Account / settings group ---------- */
const NAV_SETTINGS = {
  type: "group",
  name: "Account",
  icon: <Settings size={22} />,
  subpages: [
    { name: "My Profile", href: "/admin/settings/profile" },
    { name: "Settings", href: "/admin/settings" },
    { name: "Billing", href: "/admin/settings/billing" }, // simplified label
  ],
};

/* ---------- Layout component ---------- */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [openGroups, setOpenGroups] = useState<{ [name: string]: boolean }>({});

  const isSidebarExpanded = sidebarOpen || sidebarHovered;

  /* Toggle accordion groups */
  function handleGroupToggle(name: string) {
    setOpenGroups((prev) => ({ ...prev, [name]: !prev[name] }));
  }

  /* ---------- Individual group component ---------- */
  function NavGroup({ group }: { group: typeof NAV[0] | typeof NAV_SETTINGS }) {
    const open = openGroups[group.name] ?? false;
    return (
      <div className="mb-2">
        <div
          role="button"
          tabIndex={0}
          className={`
            flex items-center gap-3 rounded-lg font-semibold cursor-pointer transition
            ${isSidebarExpanded ? "px-4 py-2" : "px-1 py-2 justify-center"}
            ${open ? "bg-blue-50 text-blue-800" : "text-gray-900 hover:bg-blue-50"}
          `}
          onClick={() => isSidebarExpanded && handleGroupToggle(group.name)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && isSidebarExpanded) handleGroupToggle(group.name);
          }}
        >
          {group.icon}
          {isSidebarExpanded && <span>{group.name}</span>}
          {isSidebarExpanded && <DownChevron open={open} />}
        </div>

        {/* Sub-links */}
        {isSidebarExpanded && (
          <div
            className={`transition-all duration-200 overflow-hidden ${
              open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {group.subpages?.map((sub) => (
              <a
                key={sub.name}
                href={sub.href}
                className={`flex items-center text-sm text-gray-500 font-normal pl-12 py-2 hover:text-blue-700 ${
                  pathname === sub.href ? "font-semibold text-blue-600" : ""
                }`}
              >
                <span className="mr-2 text-lg -ml-2">–</span>
                {sub.name}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ---------- Render ---------- */
  return (
    <div className="bg-white min-h-screen text-gray-900 flex">
      {/* Sidebar */}
      <aside
        className={`
          ${isSidebarExpanded ? "w-64" : "w-14"}
          min-h-screen bg-white shadow-lg border-r border-gray-100 flex flex-col fixed left-0 top-0 bottom-0 z-30
          transition-all duration-200 overflow-x-hidden
        `}
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        {/* Logo / toggle section */}
        <div className="h-16 flex items-center border-b border-gray-100 relative pl-5 pr-1">
          {isSidebarExpanded && (
            <span className="text-xl font-extrabold tracking-tight text-blue-600 ml-1 whitespace-nowrap">
              PropertyIQ
            </span>
          )}
          <button
            className={`absolute top-1/2 -translate-y-1/2 bg-gray-100 text-gray-500 rounded-full p-2 shadow-md left-1 ${
              isSidebarExpanded ? "right-2 left-auto" : ""
            }`}
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label="Toggle sidebar"
          >
            {isSidebarExpanded ? (
              /* collapse icon */
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M19 12H5" strokeLinecap="round" />
              </svg>
            ) : (
              /* hamburger icon */
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation groups */}
        <nav className="flex-1 flex flex-col py-6">
          <div className="flex flex-col gap-3 px-1">
            {NAV.map((item) => (
              <NavGroup key={item.name} group={item} />
            ))}
            <NavGroup group={NAV_SETTINGS} />
          </div>
        </nav>

        {/* Quick-Add button */}
        <div className="px-4 pb-6">
          <button
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-base font-semibold text-gray-800 bg-white hover:bg-blue-50 transition"
            aria-label="Quick add"
          >
            <Plus size={22} />
            {isSidebarExpanded && "Quick Add"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`flex-1 ${isSidebarExpanded ? "ml-64" : "ml-14"} w-[calc(100vw-16rem)] min-h-screen bg-white px-4 py-6 transition-all duration-200`}
      >
        {children}
      </main>
    </div>
  );
}