"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, GitCompare } from "lucide-react";

const StickyHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  // Scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auth state
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    return () => { listener?.subscription.unsubscribe(); };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  // Colors
  const blueText = "text-blue-900";
  const blueHover = "hover:text-blue-900";

  // Nav/link styling
  const linkClass = scrolled
    ? "text-gray-600 hover:text-gray-900"
    : `${blueText} ${blueHover}`;

  // Brand styling
  const brandText = blueText;

  // Button font should match hero: font-sans (Inter) and bold
  const buttonFont = "font-sans font-bold";

  // Button styling
  const buttonClass = scrolled
    ? `border-blue-600 text-gray-600 hover:bg-blue-50 bg-white ${buttonFont}`
    : `border-transparent bg-transparent ${blueText} hover:bg-transparent hover:${blueText} ${buttonFont}`;

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
              className={`h-6 w-6 ${blueText}`}
            />
            <span className={`text-lg font-bold ${brandText}`}>PropROI</span>
          </div>

          {/* desktop nav - only show when scrolled */}
          {scrolled && (
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
          )}

          {/* actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <Button
                variant="outline"
                size="sm"
                className={buttonClass}
                onClick={handleLogout}
              >
                Log out
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className={buttonClass}
                  onClick={() => router.push("/auth/signin")}
                >
                  Sign&nbsp;In
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={buttonClass}
                  onClick={() => router.push("/auth/signup")}
                >
                  Start&nbsp;Free
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;