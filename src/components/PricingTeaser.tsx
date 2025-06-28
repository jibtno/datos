import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, Calculator } from 'lucide-react';

const PricingTeaser = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Make Smarter Property Investments?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join the property professionals who are already ahead of the market
        </p>
        
        <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 text-white max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">Try It Free</div>
              <p className="text-blue-100">Get started with 3 property analyses</p>
            </div>
            
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <ArrowUp className="h-4 w-4 text-green-300" />
                <span>Instant ROI calculations</span>
              </div>
              <div className="flex items-center gap-1">
                <ArrowUp className="h-4 w-4 text-green-300" />
                <span>Real market data</span>
              </div>
            </div>
            
            <Button size="lg" className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold">
              <Calculator className="h-5 w-5 mr-2" />
              Start Analyzing Properties Now
            </Button>
            
            <p className="text-xs text-blue-200">
              No credit card required • Upgrade anytime
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PricingTeaser;
