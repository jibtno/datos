"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  MapPin,
  Star,
  TrendingUp,
  DollarSign,
  Calendar,
  Search,
  Filter,
  Trash2,
  Download,
  Eye,
  BarChart3,
  PlusCircle,
  Target,
  ArrowUpRight,
  Building2
} from 'lucide-react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/navigation';

interface SavedProperty {
  id: string;
  address: string;
  propertyType: string;
  estimatedRevenue: {
    monthly: number;
    annual: number;
  };
  occupancyRate: number;
  averageNightlyRate: number;
  investmentScore: number;
  roi: number;
  savedAt: string;
  insights: string[];
  amenities: string[];
  marketTrends: {
    priceGrowth: number;
    demandGrowth: number;
    competitionLevel: string;
  };
}

export default function Portfolio() {
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('savedAt');
  const [filterBy, setFilterBy] = useState('all');
  const router = useRouter();

  useEffect(() => {
    // Load saved properties from localStorage
    const saved = localStorage.getItem('savedProperties');
    if (saved) {
      setSavedProperties(JSON.parse(saved));
    }
  }, []);

  const handleDeleteProperty = (id: string) => {
    const updated = savedProperties.filter(prop => prop.id !== id);
    setSavedProperties(updated);
    localStorage.setItem('savedProperties', JSON.stringify(updated));
  };

  const handleViewDetails = (property: SavedProperty) => {
    router.push(`/results?query=${encodeURIComponent(property.address)}`);
  };

  const filteredAndSortedProperties = savedProperties
    .filter(property => {
      const matchesSearch = property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.propertyType.toLowerCase().includes(searchTerm.toLowerCase());
      if (filterBy === 'all') return matchesSearch;
      if (filterBy === 'excellent' && property.investmentScore >= 8) return matchesSearch;
      if (filterBy === 'good' && property.investmentScore >= 6 && property.investmentScore < 8) return matchesSearch;
      if (filterBy === 'risky' && property.investmentScore < 6) return matchesSearch;
      return false;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'investmentScore':
          return b.investmentScore - a.investmentScore;
        case 'roi':
          return b.roi - a.roi;
        case 'revenue':
          return b.estimatedRevenue.monthly - a.estimatedRevenue.monthly;
        case 'savedAt':
        default:
          return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
      }
    });

  const totalPortfolioValue = savedProperties.reduce((sum, prop) => sum + prop.estimatedRevenue.annual, 0);
  const averageROI = savedProperties.length > 0 
    ? savedProperties.reduce((sum, prop) => sum + prop.roi, 0) / savedProperties.length 
    : 0;
  const topPerformer = savedProperties.reduce((best, current) => 
    current.investmentScore > (best?.investmentScore || 0) ? current : best, savedProperties[0]);

  if (savedProperties.length === 0) {
    return (
      <Layout pageTitle="Saved Portfolio" showAnalyzeButton={true}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
              <Building2 className="w-10 h-10 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Your Portfolio is Empty</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Start analyzing properties and save the best opportunities to build your investment portfolio.
            </p>
            <Button 
              onClick={() => router.push('/tools/analyze')}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium px-8 py-3"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Analyze Your First Property
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Saved Portfolio" showAnalyzeButton={true}>
      <div className="max-w-7xl mx-auto">
        {/* Portfolio Overview */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-slate-800 mb-1">{savedProperties.length}</p>
                <p className="text-sm text-slate-600">Properties Saved</p>
              </CardContent>
            </Card>
            <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-slate-800 mb-1">${totalPortfolioValue.toLocaleString()}</p>
                <p className="text-sm text-slate-600">Total Annual Revenue</p>
              </CardContent>
            </Card>
            <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-slate-800 mb-1">{averageROI.toFixed(1)}%</p>
                <p className="text-sm text-slate-600">Average ROI</p>
              </CardContent>
            </Card>
            <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-slate-800 mb-1">
                  {topPerformer ? topPerformer.investmentScore.toFixed(1) : 'N/A'}
                </p>
                <p className="text-sm text-slate-600">Top Score</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="mb-6">
          <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search properties by address or type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/50 border-white/30"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48 bg-white/50 border-white/30">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="savedAt">Recently Saved</SelectItem>
                      <SelectItem value="investmentScore">Investment Score</SelectItem>
                      <SelectItem value="roi">ROI</SelectItem>
                      <SelectItem value="revenue">Revenue</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="w-48 bg-white/50 border-white/30">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Properties</SelectItem>
                      <SelectItem value="excellent">Excellent (8.0+)</SelectItem>
                      <SelectItem value="good">Good (6.0-7.9)</SelectItem>
                      <SelectItem value="risky">Risky (&lt;6.0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Properties Grid */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAndSortedProperties.map((property) => {
              const investmentScoreColor = property.investmentScore >= 8 ? "text-green-600" : 
                                         property.investmentScore >= 6 ? "text-yellow-600" : "text-red-600";
              const investmentScoreBg = property.investmentScore >= 8 ? "bg-green-100" : 
                                      property.investmentScore >= 6 ? "bg-yellow-100" : "bg-red-100";
              return (
                <Card key={property.id} className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-slate-500" />
                          <h3 className="font-bold text-slate-800 text-sm line-clamp-1">{property.address}</h3>
                        </div>
                        <p className="text-slate-600 text-sm">{property.propertyType}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-full ${investmentScoreBg} flex items-center justify-center`}>
                        <span className={`text-sm font-bold ${investmentScoreColor}`}>
                          {property.investmentScore.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white/30 backdrop-blur-xl rounded-lg p-3 text-center">
                        <DollarSign className="w-4 h-4 text-green-600 mx-auto mb-1" />
                        <p className="text-sm font-bold text-slate-800">${property.estimatedRevenue.monthly.toLocaleString()}</p>
                        <p className="text-xs text-slate-600">Monthly</p>
                      </div>
                      <div className="bg-white/30 backdrop-blur-xl rounded-lg p-3 text-center">
                        <TrendingUp className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                        <p className="text-sm font-bold text-slate-800">{property.roi}%</p>
                        <p className="text-xs text-slate-600">ROI</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-600">{property.occupancyRate}% occupancy</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 text-xs">
                        ${property.averageNightlyRate}/night
                      </Badge>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-slate-600 mb-2">Top Amenities</p>
                      <div className="flex flex-wrap gap-1">
                        {property.amenities.slice(0, 3).map((amenity, index) => (
                          <Badge key={index} className="bg-slate-100 text-slate-700 text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {property.amenities.length > 3 && (
                          <Badge className="bg-slate-100 text-slate-700 text-xs">
                            +{property.amenities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleViewDetails(property)}
                        size="sm" 
                        className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button 
                        onClick={() => handleDeleteProperty(property.id)}
                        size="sm" 
                        variant="outline" 
                        className="bg-white/30 border-white/30 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/20">
                      <p className="text-xs text-slate-500">
                        Saved {new Date(property.savedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Portfolio Actions */}
        <section className="mt-8">
          <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">Portfolio Management</h3>
                  <p className="text-slate-600 text-sm">
                    Export your portfolio data or compare properties side by side.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="bg-white/30 border-white/30 hover:bg-white/40"
                    onClick={() => {
                      // Mock export functionality
                      const dataStr = JSON.stringify(savedProperties, null, 2);
                      const dataBlob = new Blob([dataStr], { type: 'application/json' });
                      const url = URL.createObjectURL(dataBlob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = 'portfolio-export.json';
                      link.click();
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Portfolio
                  </Button>
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Compare Properties
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
}