import React from 'react';
import StickyHeader from '../components/StickyHeader';
import HeroValueProp from '../components/HeroValueProp';
import HowItWorks from '../components/HowItWorks';
import ComparisonGrid from '../components/ComparisonGrid';
import TestimonialsSection from '../components/TestimonialsSection';
import PricingTeaser from '../components/PricingTeaser';
import ProvinceHero from '../components/ProvinceHero';
import MarketStats from '../components/MarketStats';
import FeaturedListings from '../components/FeaturedListings';
import BeforeAfterSection from '../components/BeforeAfterSection';
import TopAreas from '../components/TopAreas';
import MarketTrends from '../components/MarketTrends';
import FreemiumUpgrade from '../components/FreemiumUpgrade';
import HostInsights from '../components/HostInsights';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Sticky Navigation */}
      <StickyHeader />
      
      {/* Hero with Value Proposition - Above the fold */}
      <HeroValueProp />
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Comparison Grid */}
      <ComparisonGrid />
      
      {/* Testimonials / Trust */}
      <TestimonialsSection />
      
      {/* Pricing Teaser / CTA */}
      <PricingTeaser />
      
      {/* Province Details */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50">
        <ProvinceHero />
        
        {/* Market Statistics */}
        <MarketStats />
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-16">
          {/* Featured Listings */}
          <FeaturedListings />
          
          {/* Before/After Section */}
          <BeforeAfterSection />
          
          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <MarketTrends />
            </div>
            <div>
              <TopAreas />
            </div>
          </div>
          
          {/* Freemium Upgrade CTA */}
          <FreemiumUpgrade />
          
          {/* Host Insights */}
          <HostInsights />
        </div>
      </div>
    </div>
  );
};

export default Index;