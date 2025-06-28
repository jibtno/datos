import React from 'react';
import { Card } from '@/components/ui/card';
import { X, Check } from 'lucide-react';

const ComparisonGrid = () => {
  const comparisons = [
    {
      feature: "ROI Calculation",
      manual: "Guessing based on broker estimates",
      tool: "Exact ROI with real market data"
    },
    {
      feature: "Market Research",
      manual: "Hours of browsing listings",
      tool: "Instant area analysis & trends"
    },
    {
      feature: "Occupancy Rates",
      manual: "Vague broker promises",
      tool: "Historical occupancy data"
    },
    {
      feature: "Price Comparison",
      manual: "Manual spreadsheet tracking",
      tool: "Side-by-side property comparison"
    },
    {
      feature: "Market Updates",
      manual: "Outdated quarterly reports",
      tool: "Real-time data updates"
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stop Guessing. Start Knowing.
          </h2>
          <p className="text-lg text-gray-600">
            See how our platform compares to traditional research methods
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <X className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Manual Research</h3>
              <p className="text-gray-600">The old way</p>
            </div>
            <div className="space-y-4">
              {comparisons.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">{item.feature}</p>
                    <p className="text-sm text-gray-600">{item.manual}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-2 border-green-200">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Our Platform</h3>
              <p className="text-gray-600">The smart way</p>
            </div>
            <div className="space-y-4">
              {comparisons.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">{item.feature}</p>
                    <p className="text-sm text-gray-600">{item.tool}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComparisonGrid;