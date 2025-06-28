'use client'
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TrendingUp, BarChart, Activity, Download, Filter } from 'lucide-react';

const MarketTrends = () => {
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('all');
  const [zoneFilter, setZoneFilter] = useState('all');

  const handleDownloadReport = () => {
    console.log('Downloading report...');
    // Implement PDF/CSV download functionality
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Market Trends</h3>
          <p className="text-sm text-gray-600">Performance insights and market analysis</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleDownloadReport}>
          <Download className="h-4 w-4 mr-1" />
          Export Report
        </Button>
      </div>

      {/* Filter Controls */}
      <div className="flex gap-4 p-4 bg-white rounded-lg">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>
        
        <select 
          value={propertyTypeFilter}
          onChange={(e) => setPropertyTypeFilter(e.target.value)}
          className="px-3 py-1 text-sm border-white rounded-md"
        >
          <option value="all">All Property Types</option>
          <option value="studio">Studio</option>
          <option value="1br">1 Bedroom</option>
          <option value="2br">2 Bedroom</option>
        </select>
        
        <select 
          value={zoneFilter}
          onChange={(e) => setZoneFilter(e.target.value)}
          className="px-3 py-1 text-sm border-white rounded-md"
        >
          <option value="all">All Zones</option>
          <option value="bgc">BGC</option>
          <option value="makati">Makati</option>
          <option value="ortigas">Ortigas</option>
        </select>
      </div>

      <Tabs defaultValue="pricing" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pricing" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Pricing
          </TabsTrigger>
          <TabsTrigger value="occupancy" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Occupancy
          </TabsTrigger>
          <TabsTrigger value="demand" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Demand
          </TabsTrigger>
          <TabsTrigger value="seasonality" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Seasonality
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pricing" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Average Nightly Rates (Last 30 Days)</h4>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12.3%
              </div>
            </div>
            
            {/* Simplified Chart Representation */}
            <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 flex items-end justify-between">
              {[65, 72, 68, 75, 82, 78, 85, 88, 92, 87, 95, 91].map((height, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-6 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-1">
                    {index % 3 === 0 ? `Week ${Math.floor(index / 3) + 1}` : ''}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">Current Avg</p>
                <p className="text-lg font-semibold text-gray-900">₱3,400</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Peak Rate</p>
                <p className="text-lg font-semibold text-gray-900">₱4,200</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Low Season</p>
                <p className="text-lg font-semibold text-gray-900">₱2,800</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="occupancy" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Occupancy Rates by Area</h4>
              <div className="flex items-center text-sm text-blue-600">
                <BarChart className="h-4 w-4 mr-1" />
                Metro Manila vs Philippines
              </div>
            </div>
            
            {/* Horizontal Bar Chart */}
            <div className="space-y-4">
              {[
                { area: 'BGC', rate: 87, color: 'from-green-400 to-green-500' },
                { area: 'Makati CBD', rate: 81, color: 'from-blue-400 to-blue-500' },
                { area: 'Ortigas', rate: 76, color: 'from-purple-400 to-purple-500' },
                { area: 'Eastwood', rate: 73, color: 'from-orange-400 to-orange-500' },
                { area: 'Philippines Avg', rate: 65, color: 'from-gray-400 to-gray-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-700">{item.area}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className={`bg-gradient-to-r ${item.color} h-3 rounded-full transition-all duration-700`}
                      style={{ width: `${item.rate}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-sm font-semibold text-gray-900">{item.rate}%</div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="demand" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Booking Demand Patterns</h4>
              <div className="flex items-center text-sm text-purple-600">
                <Activity className="h-4 w-4 mr-1" />
                Seasonal Trends
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h5 className="font-medium text-gray-900">Peak Seasons</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Dec - Jan</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-400 h-2 rounded-full w-full"></div>
                      </div>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Mar - May</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-400 h-2 rounded-full w-4/5"></div>
                      </div>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Jun - Aug</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full w-3/5"></div>
                      </div>
                      <span className="text-sm font-medium">62%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h5 className="font-medium text-gray-900">Booking Lead Time</h5>
                <div className="space-y-3">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">3.2</p>
                    <p className="text-sm text-blue-700">days average</p>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• 45% book same day</p>
                    <p>• 30% book 1-3 days ahead</p>
                    <p>• 25% book 4+ days ahead</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="seasonality" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">12-Month Seasonality Trends</h4>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                Annual Overview
              </div>
            </div>
            
            {/* Monthly Chart */}
            <div className="h-48 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 flex items-end justify-between">
              {[
                { month: 'Jan', rate: 95, occupancy: 85 },
                { month: 'Feb', rate: 88, occupancy: 82 },
                { month: 'Mar', rate: 75, occupancy: 78 },
                { month: 'Apr', rate: 78, occupancy: 80 },
                { month: 'May', rate: 82, occupancy: 75 },
                { month: 'Jun', rate: 65, occupancy: 62 },
                { month: 'Jul', rate: 68, occupancy: 65 },
                { month: 'Aug', rate: 70, occupancy: 68 },
                { month: 'Sep', rate: 85, occupancy: 75 },
                { month: 'Oct', rate: 88, occupancy: 78 },
                { month: 'Nov', rate: 92, occupancy: 82 },
                { month: 'Dec', rate: 98, occupancy: 95 }
              ].map((data, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex gap-1">
                    <div 
                      className="w-3 bg-gradient-to-t from-green-500 to-green-400 rounded-t"
                      style={{ height: `${data.rate}%` }}
                    ></div>
                    <div 
                      className="w-3 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                      style={{ height: `${data.occupancy}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{data.month}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 bg-gradient-to-r from-green-500 to-green-400 rounded"></div>
                <span className="text-sm text-gray-600">Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded"></div>
                <span className="text-sm text-gray-600">Occupancy</span>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketTrends;