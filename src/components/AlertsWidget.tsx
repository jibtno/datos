import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Lock, Check } from 'lucide-react';

const AlertsWidget = () => {
  const alerts = [
    {
      type: 'opportunity',
      message: 'New high-ROI property in BGC',
      time: '2 hours ago',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      type: 'warning',
      message: 'Competitor pricing drop in Makati',
      time: '5 hours ago',
      icon: Lock,
      color: 'text-orange-600'
    },
    {
      type: 'info',
      message: 'Market report available',
      time: '1 day ago',
      icon: Check,
      color: 'text-blue-600'
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Alerts Center</h3>
        <Button variant="outline" size="sm">View All</Button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => {
          const Icon = alert.icon;
          return (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center ${alert.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                <p className="text-xs text-gray-500">{alert.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      <Button variant="outline" className="w-full mt-4">
        Configure Alerts
      </Button>
    </Card>
  );
};

export default AlertsWidget;