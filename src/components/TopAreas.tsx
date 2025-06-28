import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, TrendingUp, Crown } from 'lucide-react';

const TopAreas = () => {
  const areas = [
    {
      rank: 1,
      name: 'BGC',
      fullName: 'Bonifacio Global City',
      avgPrice: 4100,
      occupancy: 87,
      trend: '+8.2%',
      icon: Crown,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      rank: 2,
      name: 'Makati CBD',
      fullName: 'Makati Central Business District',
      avgPrice: 3700,
      occupancy: 81,
      trend: '+5.7%',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      rank: 3,
      name: 'Ortigas',
      fullName: 'Ortigas Center',
      avgPrice: 3200,
      occupancy: 76,
      trend: '+3.4%',
      icon: MapPin,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      rank: 4,
      name: 'Eastwood',
      fullName: 'Eastwood City, QC',
      avgPrice: 2800,
      occupancy: 73,
      trend: '+2.1%',
      icon: MapPin,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      rank: 5,
      name: 'Alabang',
      fullName: 'Alabang, Muntinlupa',
      avgPrice: 2900,
      occupancy: 69,
      trend: '+1.8%',
      icon: MapPin,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Top Performing Areas</h3>
        <p className="text-sm text-gray-600">Ranked by revenue potential and occupancy rates</p>
      </div>

      <div className="space-y-4">
        {areas.map((area) => (
          <Card key={area.rank} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              {/* Rank Badge */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                {area.rank}
              </div>

              {/* Area Icon */}
              <div className={`p-2 rounded-lg ${area.bgColor}`}>
                <area.icon className={`h-4 w-4 ${area.color}`} />
              </div>

              {/* Area Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900 truncate">{area.name}</h4>
                  {area.rank === 1 && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                      Top Pick
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-600 truncate">{area.fullName}</p>
              </div>

              {/* Metrics */}
              <div className="text-right">
                <p className="font-semibold text-gray-900">₱{area.avgPrice.toLocaleString()}</p>
                <p className="text-xs text-gray-600">per night</p>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">
                    Occupancy: <span className="font-medium text-gray-900">{area.occupancy}%</span>
                  </span>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    {area.trend}
                  </Badge>
                </div>
              </div>

              {/* Occupancy Progress Bar */}
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-blue-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${area.occupancy}%` }}
                ></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopAreas;