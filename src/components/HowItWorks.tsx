import React from 'react';
import { Card } from '@/components/ui/card';
import { Search, Calculator, TrendingUp } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      step: "1",
      title: "Paste Property Link",
      description: "Drop any Lamudi, OLX, or property listing URL"
    },
    {
      icon: Calculator,
      step: "2", 
      title: "Instant Analysis",
      description: "Get ROI, occupancy rates, and market scores in seconds"
    },
    {
      icon: TrendingUp,
      step: "3",
      title: "Make Smart Decisions",
      description: "Compare properties and invest with confidence"
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From property link to investment decision in under 30 seconds
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="p-6 text-center relative">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;