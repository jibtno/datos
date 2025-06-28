import React from 'react';
import { Card } from '@/components/ui/card';
import { X, Check, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BeforeAfterSection = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stop Guessing. Start Earning.
          </h2>
          <p className="text-lg text-gray-600">
            See what changes when you have the right data
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Before */}
          <Card className="p-8 border-red-200 bg-red-50/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <X className="h-4 w-4 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-red-900">Without This Tool</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-900">Guessing ROI potential</p>
                  <p className="text-sm text-red-700">Hope your broker's estimates are right</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-900">Stuck with broker hype</p>
                  <p className="text-sm text-red-700">No way to verify market claims</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-900">Outdated market data</p>
                  <p className="text-sm text-red-700">Reports from 6+ months ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-900">Weeks of research time</p>
                  <p className="text-sm text-red-700">Endless spreadsheets and calculations</p>
                </div>
              </div>
            </div>
          </Card>

          {/* After */}
          <Card className="p-8 border-green-200 bg-green-50/50 relative">
            <div className="absolute -top-3 -right-3">
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                With Premium
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-900">With Our Platform</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-900">Exact ROI & occupancy rates</p>
                  <p className="text-sm text-green-700">Precise income projections you can bank on</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-900">Transparent market scores</p>
                  <p className="text-sm text-green-700">Independent data, not sales pitches</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-900">Live, verified data</p>
                  <p className="text-sm text-green-700">Updated daily from active listings</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-900">Answers in 1 click</p>
                  <p className="text-sm text-green-700">Instant insights, zero spreadsheets</p>
                </div>
              </div>
            </div>

            <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">
              <TrendingUp className="h-4 w-4 mr-2" />
              Start Free Trial
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSection;
