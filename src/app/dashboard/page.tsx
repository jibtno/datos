"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Users,
  MapPin,
  Star,
  Target,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Home,
  Building2,
  Zap,
  Search,
  Plus,
  Download,
  Bell,
  Settings,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from "recharts";
import Layout from "@/components/Layout";

// Mock data for the dashboard
const monthlyRevenueData = [
  { month: "Jan", revenue: 12400 },
  { month: "Feb", revenue: 13200 },
  { month: "Mar", revenue: 11800 },
  { month: "Apr", revenue: 14600 },
  { month: "May", revenue: 13900 },
  { month: "Jun", revenue: 15200 }
];

const miniTrendData = [
  { value: 3200 },
  { value: 3600 },
  { value: 3400 },
  { value: 3800 },
  { value: 3900 },
  { value: 3800 }
];

const occupancyData = [
  { name: 'Ocean View Condo', occupancy: 95, revenue: 5200, score: 9.2 },
  { name: 'Downtown Loft', occupancy: 87, revenue: 3800, score: 8.1 },
  { name: 'Beach House', occupancy: 91, revenue: 4100, score: 8.7 },
  { name: 'City Apartment', occupancy: 78, revenue: 2900, score: 7.4 }
];

const marketSegments = [
  { name: 'Business Travelers', value: 35, color: '#8b5cf6' },
  { name: 'Leisure Tourists', value: 45, color: '#10b981' },
  { name: 'Extended Stays', value: 20, color: '#f59e0b' }
];

const upcomingBookings = [
  { property: 'Ocean View Condo', guest: 'Sarah M.', checkIn: '2024-01-15', nights: 4, revenue: 920 },
  { property: 'Downtown Loft', guest: 'Michael R.', checkIn: '2024-01-16', nights: 2, revenue: 380 },
  { property: 'Beach House', guest: 'Jennifer L.', checkIn: '2024-01-18', nights: 7, revenue: 1540 }
];

export default function Dashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [notifications] = useState(3);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      router.push(`/loading?query=${encodeURIComponent(searchQuery)}`);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Metrics calculations (as in your code)
  const totalRevenue = monthlyRevenueData.reduce((sum, month) => sum + month.revenue, 0);
  const averageOccupancy = occupancyData.reduce((sum, prop) => sum + prop.occupancy, 0) / occupancyData.length;
  const totalProperties = Math.max(...monthlyRevenueData.map(month => month.properties || 0), 0); // fallback for missing .properties
  const averageScore = occupancyData.reduce((sum, prop) => sum + prop.score, 0) / occupancyData.length;

  return (
    <Layout pageTitle="Dashboard" showAnalyzeButton={true}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Welcome back! 👋</h1>
              <p className="text-slate-600">Here's what's happening with your portfolio today.</p>
            </div>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2">
              <Zap className="w-4 h-4 mr-1" />
              All systems optimal
            </Badge>
          </div>
        </section>

        {/* Key Metrics */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-slate-800">${totalRevenue.toLocaleString()}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">+12.5%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Avg Occupancy</p>
                    <p className="text-2xl font-bold text-slate-800">{averageOccupancy.toFixed(1)}%</p>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">+3.2%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Properties</p>
                    <p className="text-2xl font-bold text-slate-800">{totalProperties}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">+1 this month</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Avg Score</p>
                    <p className="text-2xl font-bold text-slate-800">{averageScore.toFixed(1)}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">Excellent</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Charts Section */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Revenue Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
                      <XAxis 
                        dataKey="month" 
                        stroke="#64748b" 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        stroke="#64748b" 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${(value/1000).toFixed(1)}k`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '12px',
                          backdropFilter: 'blur(20px)'
                        }}
                        formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Guest Segments */}
            <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Guest Segments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={marketSegments}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {marketSegments.map((segment, index) => (
                          <Cell key={`cell-${index}`} fill={segment.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '12px',
                          backdropFilter: 'blur(20px)'
                        }}
                        formatter={(value) => [`${value}%`, 'Share']}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                  {marketSegments.map((segment, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: segment.color }}
                      ></div>
                      <span className="text-xs text-slate-600">{segment.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Property Performance & Upcoming Bookings */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Property Performance */}
            <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  Property Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {occupancyData.map((property, index) => {
                    const scoreColor = property.score >= 8.5 ? 'text-green-600' : 
                                      property.score >= 7.5 ? 'text-yellow-600' : 'text-red-600';
                    const scoreBg = property.score >= 8.5 ? 'bg-green-100' : 
                                   property.score >= 7.5 ? 'bg-yellow-100' : 'bg-red-100';
                    
                    return (
                      <div key={index} className="p-4 bg-white/30 backdrop-blur-xl rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-slate-800">{property.name}</h4>
                          <div className={`px-2 py-1 rounded-full ${scoreBg}`}>
                            <span className={`text-sm font-bold ${scoreColor}`}>{property.score}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-slate-600">Occupancy</p>
                            <p className="font-semibold text-slate-800">{property.occupancy}%</p>
                          </div>
                          <div>
                            <p className="text-slate-600">Revenue</p>
                            <p className="font-semibold text-slate-800">${property.revenue.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Bookings */}
            <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  Upcoming Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingBookings.map((booking, index) => (
                    <div key={index} className="p-4 bg-white/30 backdrop-blur-xl rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium text-slate-800">{booking.guest}</p>
                          <p className="text-sm text-slate-600">{booking.property}</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">
                          ${booking.revenue}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span>Check-in: {booking.checkIn}</span>
                        <span>•</span>
                        <span>{booking.nights} nights</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white p-6 h-auto flex-col">
                  <Home className="w-6 h-6 mb-2" />
                  <span>Analyze New Property</span>
                </Button>
                <Button variant="outline" className="bg-white/30 border-white/30 hover:bg-white/40 p-6 h-auto flex-col">
                  <Activity className="w-6 h-6 mb-2" />
                  <span>View Detailed Reports</span>
                </Button>
                <Button variant="outline" className="bg-white/30 border-white/30 hover:bg-white/40 p-6 h-auto flex-col">
                  <Target className="w-6 h-6 mb-2" />
                  <span>Optimize Pricing</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
}