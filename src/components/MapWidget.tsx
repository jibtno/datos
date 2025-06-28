import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';

const MapWidget = () => {
  const topAreas = [
    { name: 'BGC', score: 9.2, rate: '₱4,200', occupancy: '89%' },
    { name: 'Makati CBD', score: 8.8, rate: '₱3,800', occupancy: '82%' },
    { name: 'Ortigas', score: 8.1, rate: '₱2,900', occupancy: '76%' },
    { name: 'Quezon City', score: 7.5, rate: '₱3,200', occupancy: '71%' },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Metro Manila Market Map</h3>
        <Button variant="outline" size="sm">View Full Map</Button>
      </div>
      
      {/* Map Placeholder */}
      <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-dashed border-blue-200 flex items-center justify-center mb-6">
        <div className="text-center">
          <TrendingUp className="h-12 w-12 text-blue-400 mx-auto mb-2" />
          <p className="text-blue-600 font-medium">Interactive Heatmap</p>
          <p className="text-sm text-blue-500">Click zones to explore opportunities</p>
        </div>
      </div>

      {/* Top Performing Areas */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Top Performing Areas</h4>
        <div className="space-y-2">
          {topAreas.map((area, index) => (
            <div key={area.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded flex items-center justify-center">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{area.name}</p>
                  <p className="text-sm text-gray-600">Score: {area.score}/10</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{area.rate}</p>
                <p className="text-sm text-green-600">{area.occupancy} occupied</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MapWidget;