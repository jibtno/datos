import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Zap, Check } from 'lucide-react';

const FreemiumUpgrade = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 px-4 py-2 rounded-full mb-4">
              <Lock className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium">Upgrade to Compare</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">
              Want to compare Ortigas vs BGC vs Makati?
            </h3>
            <p className="text-blue-100">
              Unlock side-by-side city comparisons and advanced ROI tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4 text-blue-100">Free Plan</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-sm">Explore top 3 zones</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-sm">Basic price ranges</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-sm">1 calculation per day</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-yellow-300">Premium Plan</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm">Full interactive map (all zones)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm">Compare 2-3 cities side-by-side</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm">Custom ROI projections</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm">Save & track your portfolio</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm">Export to PDF</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold">
              <Zap className="h-5 w-5 mr-2" />
              Upgrade to Premium - ₱999/month
            </Button>
            <p className="text-xs text-blue-200 mt-2">
              7-day free trial • Cancel anytime
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FreemiumUpgrade;
