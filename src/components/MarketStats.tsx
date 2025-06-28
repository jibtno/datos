import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Clock, MapPin, DollarSign } from 'lucide-react';

const MarketStats = () => {
  const stats = [
    {
      icon: TrendingUp,
      label: 'Revenue Growth',
      value: '+12.3%',
      subtitle: 'vs last month',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Clock,
      label: 'Avg Booking Window',
      value: '3.2 days',
      subtitle: 'advance booking',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: MapPin,
      label: 'Top Performing Area',
      value: 'BGC',
      subtitle: '₱2,943/night avg',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: DollarSign,
      label: 'ROI Potential',
      value: '18-24%',
      subtitle: 'annual return',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Market Highlights</h2>
          <p className="text-gray-600">Key metrics that matter to investors and hosts</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketStats;