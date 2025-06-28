import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Calculator, GitCompare, Zap } from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Avg Occupancy',
      value: '78%',
      change: '+5.2%',
      trend: 'up',
      icon: TrendingUp
    },
    {
      title: 'Avg Nightly Rate',
      value: '₱3,400',
      change: '+8.1%',
      trend: 'up',
      icon: Calculator
    },
    {
      title: 'Active Listings',
      value: '2,847',
      change: '+12',
      trend: 'up',
      icon: GitCompare
    },
    {
      title: 'Market Score',
      value: '8.7/10',
      change: 'Excellent',
      trend: 'stable',
      icon: Zap
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 
                  'text-gray-600'
                }`}>
                  {stat.change}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;