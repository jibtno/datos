import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, TrendingUp, Users, Zap } from 'lucide-react';

const HostInsights = () => {
  const insights = [
    {
      icon: Lightbulb,
      title: 'Properties with pools outperform by 14%',
      description: 'Pool amenities consistently drive higher bookings and premium pricing in Metro Manila.',
      impact: 'High Impact',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      badgeColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      icon: TrendingUp,
      title: 'Business travelers prefer BGC locations',
      description: 'Corporate bookings make up 65% of weekday reservations in Bonifacio Global City.',
      impact: 'High Impact',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      icon: Users,
      title: 'Family-sized units (3+ bedrooms) have 23% higher occupancy',
      description: 'Larger properties are in high demand, especially during holidays and long weekends.',
      impact: 'Medium Impact',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      badgeColor: 'bg-green-100 text-green-800'
    },
    {
      icon: Zap,
      title: 'Fast WiFi (100+ Mbps) increases bookings by 31%',
      description: 'Remote workers and digital nomads prioritize high-speed internet connectivity.',
      impact: 'High Impact',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      badgeColor: 'bg-purple-100 text-purple-800'
    }
  ];

  const quickTips = [
    'Price 15-20% higher during major holidays and events',
    'Update your listing photos every 6 months for better visibility',
    'Respond to inquiries within 1 hour to improve booking rates',
    'Offer flexible check-in times for business travelers'
  ];

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Host Success Insights</h2>
        <p className="text-gray-600">Data-driven tips to maximize your property's performance</p>
      </div>

      {/* Main Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insights.map((insight, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${insight.bgColor} flex-shrink-0`}>
                <insight.icon className={`h-6 w-6 ${insight.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 leading-snug">{insight.title}</h3>
                  <Badge className={`${insight.badgeColor} ml-2 flex-shrink-0`}>
                    {insight.impact}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{insight.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Tips Section */}
      <Card className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-indigo-100">
            <Zap className="h-5 w-5 text-indigo-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Quick Optimization Tips</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickTips.map((tip, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Call to Action */}
      <Card className="p-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <h3 className="text-xl font-bold mb-2">Ready to Start Your Airbnb Journey?</h3>
        <p className="text-blue-100 mb-4">
          Connect with local property experts to find the perfect investment opportunity in Metro Manila.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Find Properties
          </button>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-400 transition-colors">
            Get Market Report
          </button>
        </div>
      </Card>
    </section>
  );
};

export default HostInsights;