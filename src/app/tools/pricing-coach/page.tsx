"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  MapPin, Star, TrendingUp, DollarSign, Calendar, Search, Filter, Trash2, Download, Eye, BarChart3,
  PlusCircle, Target, ArrowUpRight, Building2, Sparkles, Brain, Clock, AlertTriangle, CheckCircle2, Info
} from 'lucide-react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

// ... all your mock data as before ...

export default function PricingCoach() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [propertyAddress, setPropertyAddress] = useState('');
  const [hasAnalysis, setHasAnalysis] = useState(false);
  const [currentPrice, setCurrentPrice] = useState('185');
  const router = useRouter();

  const handleAnalyzePricing = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalysis(true);
    }, 3000);
  };

  const suggestedPrice = 205;
  const priceChange = suggestedPrice - parseInt(currentPrice);
  const priceChangePercent = ((priceChange / parseInt(currentPrice)) * 100).toFixed(1);
  const projectedRevenue = suggestedPrice * 25;
  const currentRevenue = parseInt(currentPrice) * 22;
  const revenueIncrease = projectedRevenue - currentRevenue;

  if (isAnalyzing) {
    return (
      <Layout pageTitle="Pricing Coach" showAnalyzeButton={true}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                <Brain className="w-10 h-10 text-white animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">AI Pricing Analysis in Progress</h2>
              <div className="space-y-3 max-w-md mx-auto">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-4 h-4 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                  <span>Analyzing local market trends...</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-4 h-4 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                  <span>Comparing competitor pricing...</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-4 h-4 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                  <span>Calculating optimal pricing strategy...</span>
                </div>
              </div>
              <Progress value={75} className="w-64 mx-auto mt-6" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!hasAnalysis) {
    return (
      <Layout pageTitle="Pricing Coach" showAnalyzeButton={true}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">AI-Powered Pricing Coach</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Get intelligent pricing recommendations powered by real-time market data, 
              competitor analysis, and demand forecasting to maximize your revenue.
            </p>
            
            <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg max-w-lg mx-auto">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Property Address
                    </label>
                    <Input
                      placeholder="Enter your property address..."
                      value={propertyAddress}
                      onChange={(e) => setPropertyAddress(e.target.value)}
                      className="bg-white/50 border-white/30"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Current Nightly Rate
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder="185"
                        value={currentPrice}
                        onChange={(e) => setCurrentPrice(e.target.value)}
                        className="pl-10 bg-white/50 border-white/30"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleAnalyzePricing}
                    disabled={!propertyAddress || !currentPrice}
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium py-3"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Get AI Pricing Recommendations
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Brain className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-800 mb-2">Smart Analysis</h3>
                  <p className="text-sm text-slate-600">AI analyzes 100+ factors including location, amenities, and market trends</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-800 mb-2">Revenue Optimization</h3>
                  <p className="text-sm text-slate-600">Maximize earnings with dynamic pricing strategies</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-800 mb-2">Real-time Updates</h3>
                  <p className="text-sm text-slate-600">Stay competitive with live market data and insights</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ...rest of your analysis UI (no navigation changes needed here)...
  // If you need to route on any button click, use: router.push("/some-path")
}