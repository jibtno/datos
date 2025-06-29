import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { MapPin, TrendingUp, Calculator, Star, Zap, Target, Clock, Banknote } from 'lucide-react';

const MiniROISimulator = () => {
  const [listingUrl, setListingUrl] = useState('');
  const [location, setLocation] = useState('');
  const [hasResults, setHasResults] = useState(false);
  const [nightlyRate, setNightlyRate] = useState([3500]);
  const [occupancyRate, setOccupancyRate] = useState([78]);
  const [propertyPrice, setPropertyPrice] = useState([5500000]);

  const calculateMonthlyRevenue = () => {
    return (nightlyRate[0] * (occupancyRate[0] / 100) * 30).toFixed(0);
  };

  const calculateAnnualRevenue = () => {
    return nightlyRate[0] * (occupancyRate[0] / 100) * 365;
  };

  const calculateROIPercent = () => {
    const annualRevenue = calculateAnnualRevenue();
    return ((annualRevenue / propertyPrice[0]) * 100).toFixed(1);
  };

  const calculateFirstYearReturn = () => {
    const annualRevenue = calculateAnnualRevenue();
    return ((annualRevenue / propertyPrice[0]) * 100).toFixed(0);
  };

  const calculatePaybackMonths = () => {
    const monthlyRevenue = parseFloat(calculateMonthlyRevenue());
    return Math.round(propertyPrice[0] / (monthlyRevenue * 12));
  };

  const calculateBankComparison = () => {
    const annualRevenue = calculateAnnualRevenue();
    const bankInterest = propertyPrice[0] * 0.025; // 2.5% bank rate
    return Math.round(annualRevenue / bankInterest);
  };

  const calculateMilestones = () => {
    const monthlyRevenue = parseFloat(calculateMonthlyRevenue());
    return {
      month100k: Math.ceil(100000 / monthlyRevenue),
      month50percent: Math.ceil((propertyPrice[0] * 0.5) / (monthlyRevenue * 12)),
      month100percent: Math.ceil(propertyPrice[0] / (monthlyRevenue * 12))
    };
  };

  const handleAnalyze = () => {
    if (listingUrl || location) {
      setHasResults(true);
    }
  };

  const milestones = calculateMilestones();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🔍 See Your Rental's Income in 10 Seconds — Free
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stop guessing. Know exactly how much your property can earn right now.
          </p>
        </div>

        {/* Input Section */}
        <Card className="backdrop-blur-lg bg-white/70 border-white/20 shadow-xl p-8">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  🏠 Paste your Airbnb listing URL
                </label>
                <Input
                  value={listingUrl}
                  onChange={(e) => setListingUrl(e.target.value)}
                  placeholder="https://airbnb.com/rooms/..."
                  className="bg-white/50 border-white/30 backdrop-blur-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  📍 Or search by location
                </label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="BGC, Makati, Ortigas..."
                  className="bg-white/50 border-white/30 backdrop-blur-sm"
                />
              </div>
            </div>
            <Button 
              onClick={handleAnalyze}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 text-lg"
              disabled={!listingUrl && !location}
            >
              <Zap className="h-5 w-5 mr-2" />
              Analyze My Property's Earning Power
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {hasResults && (
          <>
            {/* Property Overview */}
            <Card className="backdrop-blur-lg bg-white/70 border-white/20 shadow-xl p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Modern BGC High-Rise Condo
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    Bonifacio Global City, Taguig
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>1 Bedroom • 45 sqm • WiFi • Pool</span>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-lg px-4 py-2">
                  Market Strength: 8.7/10
                </Badge>
              </div>

              {/* Money Velocity Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                  <Banknote className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-green-600">₱{calculateMonthlyRevenue().toLocaleString()}</div>
                  <div className="text-sm text-gray-600 font-medium">Monthly Income</div>
                  <div className="text-xs text-green-700 mt-1">Net after fees</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-blue-600">{calculateFirstYearReturn()}%</div>
                  <div className="text-sm text-gray-600 font-medium">12-Month ROI</div>
                  <div className="text-xs text-blue-700 mt-1">Of your capital back</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-purple-600">{calculatePaybackMonths()}</div>
                  <div className="text-sm text-gray-600 font-medium">Payback Timeline</div>
                  <div className="text-xs text-purple-700 mt-1">Years to 100% return</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                  <Zap className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-orange-600">{calculateBankComparison()}x</div>
                  <div className="text-sm text-gray-600 font-medium">vs Bank Savings</div>
                  <div className="text-xs text-orange-700 mt-1">More than 2.5% interest</div>
                </div>
              </div>
            </Card>

            {/* Earning Milestones */}
            <Card className="backdrop-blur-lg bg-white/70 border-white/20 shadow-xl p-6">
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <Target className="h-5 w-5 mr-2 text-green-600" />
                Your Earning Milestones
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="font-medium">First ₱100K earned</span>
                  </div>
                  <Badge className="bg-green-500 text-white">Month {milestones.month100k}</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span className="font-medium">50% of investment back</span>
                  </div>
                  <Badge className="bg-blue-500 text-white">Year {milestones.month50percent}</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <span className="font-medium">Full payback achieved</span>
                  </div>
                  <Badge className="bg-purple-500 text-white">Year {milestones.month100percent}</Badge>
                </div>
              </div>
            </Card>

            {/* Interactive Sliders */}
            <Card className="backdrop-blur-lg bg-white/70 border-white/20 shadow-xl p-6">
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-blue-600" />
                Adjust Your Strategy
              </h3>
              
              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">Nightly Rate</label>
                    <span className="text-lg font-semibold text-blue-600">₱{nightlyRate[0].toLocaleString()}</span>
                  </div>
                  <Slider
                    value={nightlyRate}
                    onValueChange={setNightlyRate}
                    max={8000}
                    min={1500}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₱1,500</span>
                    <span>Market avg: ₱3,200</span>
                    <span>₱8,000</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">Expected Occupancy</label>
                    <span className="text-lg font-semibold text-green-600">{occupancyRate[0]}%</span>
                  </div>
                  <Slider
                    value={occupancyRate}
                    onValueChange={setOccupancyRate}
                    max={95}
                    min={30}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>30%</span>
                    <span>BGC avg: 82%</span>
                    <span>95%</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">Property Price</label>
                    <span className="text-lg font-semibold text-purple-600">₱{(propertyPrice[0] / 1000000).toFixed(1)}M</span>
                  </div>
                  <Slider
                    value={propertyPrice}
                    onValueChange={setPropertyPrice}
                    max={15000000}
                    min={2000000}
                    step={100000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₱2M</span>
                    <span>BGC avg: ₱5.5M</span>
                    <span>₱15M</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Market Performance & Opportunities */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="backdrop-blur-lg bg-white/70 border-white/20 shadow-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  Market Performance
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <span className="text-sm font-medium">Your Rate vs Market</span>
                    <span className="font-bold text-green-600">+12% above avg</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <span className="text-sm font-medium">Demand Score</span>
                    <span className="font-bold text-blue-600">High (8.5/10)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                    <span className="text-sm font-medium">vs Top 10% Earners</span>
                    <span className="font-bold text-orange-600">You're ahead of 84%</span>
                  </div>
                </div>
              </Card>

              <Card className="backdrop-blur-lg bg-white/70 border-white/20 shadow-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-600" />
                  Revenue Boosters
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
                    <div className="text-sm font-medium text-yellow-800">Peak Season Strategy</div>
                    <div className="text-xs text-yellow-700">+₱4,200/month during holidays</div>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                    <div className="text-sm font-medium text-purple-800">Amenity Upgrade</div>
                    <div className="text-xs text-purple-700">Gym access = +₱200/night</div>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <div className="text-sm font-medium text-blue-800">Listing Optimization</div>
                    <div className="text-xs text-blue-700">Better photos = +15% bookings</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Premium Unlock Section */}
            <Card className="backdrop-blur-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-200/50 shadow-xl p-8">
              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    🚀 Want 5-year forecast, peak pricing tips & pro insights?
                  </h3>
                  <p className="text-gray-700 text-lg">
                    See exactly when to raise prices, seasonal trends, and competitor analysis
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                    <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="font-medium">Historical Trends</div>
                    <div className="text-gray-600">12 months of pricing data</div>
                  </div>
                  <div className="p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                    <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="font-medium">Price Optimization</div>
                    <div className="text-gray-600">Day-by-day pricing model</div>
                  </div>
                  <div className="p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                    <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <div className="font-medium">Competitor Intel</div>
                    <div className="text-gray-600">Top 10 similar listings</div>
                  </div>
                </div>
                
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold">
                  Unlock Full Report — ₱299/month (3 days free)
                </Button>
                
                <p className="text-sm text-gray-600">
                  Pro tools = smarter buys. Join 2,847+ investors already using advanced insights.
                </p>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default MiniROISimulator;