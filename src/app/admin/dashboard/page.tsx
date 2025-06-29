import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Calculator, Zap, GitCompare } from 'lucide-react';
import DashboardStats from '@/components/DashboardStats';
import FeaturedPropertyCard from '@/components/FeaturedPropertyCard';
import AlertsWidget from '@/components/AlertsWidget';
import MapWidget from '@/components/MapWidget';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Track your property investments and market opportunities</p>
      </div>

      {/* Stats Overview */}
      <DashboardStats />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Widget */}
        <div className="lg:col-span-2">
          <MapWidget />
        </div>
        
        {/* Alerts */}
        <div>
          <AlertsWidget />
        </div>
      </div>

      {/* Featured Properties */}
      <FeaturedPropertyCard />
    </div>
  );
};

export default Dashboard;
