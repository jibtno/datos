"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // <-- fix import for Next.js
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Star,
  TrendingUp,
  DollarSign,
  Calendar,
  Users,
  Home,
  Download,
  BookmarkPlus,
  RotateCcw,
  Wifi,
  Car,
  Coffee,
  Building2,
  Bath,
  Bed,
  ArrowUpRight,
  ArrowDownRight,
  Target
} from "lucide-react";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { PropertyAnalysisResponse } from "@/utils/analyze";
import { analyzeListing } from "@/utils/analyze";



export default function ResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [analysisData, setAnalysisData] = useState<PropertyAnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setIsLoading(false);
      setError("No query provided");
      return;
    }

const fetchData = async () => {
  try {
    const res = await fetch(`/api/analyze?url=${encodeURIComponent(query)}`);
    const json = await res.json();

    if (json.success) {
      setAnalysisData(json.data);
    } else {
      setError(json.error || "Something went wrong");
    }
  } catch (err) {
    console.error("Fetch error:", err);
    setError("Failed to fetch property data");
  } finally {
    setIsLoading(false);
  }
};

    fetchData();
  }, [query]);


 const [isSaving, setIsSaving] = useState(false);
const [isSaved, setIsSaved] = useState(false);

  if (isLoading) {
    return (
      <Layout pageTitle="Property Analysis" showAnalyzeButton={true}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto" />
            <p className="text-lg font-medium text-slate-700">Analyzing property data...</p>
            <p className="text-sm text-slate-500">This may take a few seconds depending on the listing.</p>
          </div>
        </div>
      </Layout>
    );
  }

    if (error || !analysisData) {
    return (
      <Layout pageTitle="Property Analysis" showAnalyzeButton={true}>
        <div className="text-center py-10 text-red-500">{error || "No data found."}</div>
      </Layout>
    );
  }

function handleSaveToPortfolio() {
  if (!analysisData) return;
  setIsSaving(true);
  const savedProperties = JSON.parse(localStorage.getItem("savedProperties") || "[]");
  const propertyData = {
    id: Date.now().toString(),
    ...analysisData,
    savedAt: new Date().toISOString(),
  };
  savedProperties.push(propertyData);
  localStorage.setItem("savedProperties", JSON.stringify(savedProperties));
  setTimeout(() => {
    setIsSaving(false);
    setIsSaved(true);
  }, 1000);
} 

  const investmentScoreColor =
  analysisData.investmentScore >= 8
    ? "text-green-600"
    : analysisData.investmentScore >= 6
    ? "text-yellow-600"
    : "text-red-600";

const investmentScoreBg =
  analysisData.investmentScore >= 8
    ? "bg-green-100"
    : analysisData.investmentScore >= 6
    ? "bg-yellow-100"
    : "bg-red-100";

    function handleDownloadReport() {
  if (!analysisData) return;
  const element = document.createElement("a");
  const file = new Blob(
    ['Property Analysis Report\n\nAddress: ' + (analysisData?.address || '')],
    { type: "text/plain" }
  );
  element.href = URL.createObjectURL(file);
  element.download = "property-analysis-report.txt";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

  return (
    <Layout pageTitle="Property Analysis" showAnalyzeButton={true}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Property Overview Section */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Home className="w-6 h-6 text-purple-600" />
                Property Overview
              </h2>
              <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-start gap-3 mb-4">
                        <div className="bg-blue-100/50 backdrop-blur-xl rounded-xl p-2">
                          <MapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">{analysisData.address}</h3>
                          <p className="text-slate-600">{analysisData.propertyType}</p>
                          {(analysisData.city || analysisData.region) ? (
  <p className="text-xs text-slate-500 mt-1">
    {analysisData.city}
    {analysisData.city && analysisData.region ? ", " : ""}
    {analysisData.region}
  </p>
) : null}
{(analysisData.latitude && analysisData.longitude) && (
  <p className="text-xs text-slate-400 mt-1">
    Lat: {analysisData.latitude}, Lng: {analysisData.longitude}
  </p>
)}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-white/30 backdrop-blur-xl rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Bed className="w-4 h-4 text-slate-600" />
                            <span className="text-sm text-slate-600">Bedrooms</span>
                          </div>
                          <p className="font-bold text-slate-800">{analysisData.beds || 2}</p>
                        </div>
                        <div className="bg-white/30 backdrop-blur-xl rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Bath className="w-4 h-4 text-slate-600" />
                            <span className="text-sm text-slate-600">Bathrooms</span>
                          </div>
                          <p className="font-bold text-slate-800">{analysisData.beds || 2}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-slate-600 mb-2">Amenities</p>
                        <div className="flex flex-wrap gap-2">
                          {analysisData.amenities.map((amenity, index) => (
                            <Badge key={index} className="bg-blue-100 text-blue-800">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/30 backdrop-blur-xl rounded-xl p-4 text-center">
                        <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-slate-800">${analysisData.averageNightlyRate}</p>
                        <p className="text-sm text-slate-600">Avg Nightly Rate</p>
                      </div>
                      <div className="bg-white/30 backdrop-blur-xl rounded-xl p-4 text-center">
                        <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-slate-800">{analysisData.occupancyRate}%</p>
                        <p className="text-sm text-slate-600">Occupancy Rate</p>
                      </div>
                      <div className="bg-white/30 backdrop-blur-xl rounded-xl p-4 text-center">
                        <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-slate-800">${analysisData.estimatedRevenue.monthly.toLocaleString()}</p>
                        <p className="text-sm text-slate-600">Monthly Revenue</p>
                      </div>
                      <div className="bg-white/30 backdrop-blur-xl rounded-xl p-4 text-center">
                        <Target className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-slate-800">{analysisData.roi}%</p>
                        <p className="text-sm text-slate-600">Expected ROI</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Market Trends Section */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                Market Trends
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Market Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Price Growth (YoY)</span>
                        <div className="flex items-center gap-1 text-green-600">
                          <ArrowUpRight className="w-4 h-4" />
                          <span className="font-bold">+{analysisData.marketTrends.priceGrowth}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Demand Growth</span>
                        <div className="flex items-center gap-1 text-green-600">
                          <ArrowUpRight className="w-4 h-4" />
                          <span className="font-bold">+{analysisData.marketTrends.demandGrowth}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Competition Level</span>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          {analysisData.marketTrends.competitionLevel}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Nearby Comparables</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      


{(analysisData.comps || []).slice(0, 3).map((comp, index) => (
  <div key={index} className="flex items-center justify-between p-3 bg-white/30 backdrop-blur-xl rounded-lg">
    <div>
      <p className="font-medium text-slate-800 text-sm">{comp.address}</p>
    </div>
    <div className="text-right">
      <p className="font-bold text-slate-800">${comp.price}</p>
      <div className="flex items-center gap-1">
        <Star className="w-3 h-3 text-yellow-400 fill-current" />
        <span className="text-xs text-slate-600">{comp.rating}</span>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm font-medium text-slate-800">{comp.occupancy}%</p>
      <p className="text-xs text-slate-600">Occupancy</p>
    </div>
  </div>
))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>

          {/* Right Sidebar - Action Center */}
          <div className="lg:w-80">
            <div className="sticky top-24 space-y-6">
              {/* Investment Score */}
              <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-center">Investment Score</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${investmentScoreBg} mb-4`}>
                    <span className={`text-2xl font-bold ${investmentScoreColor}`}>
                      {analysisData.investmentScore}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    {analysisData.investmentScore >= 8 ? 'Excellent Investment' : 
                     analysisData.investmentScore >= 6 ? 'Good Investment' : 'Consider Risks'}
                  </p>
                  <Progress value={analysisData.investmentScore * 10} className="mb-2" />
                  <p className="text-xs text-slate-500">Score out of 10</p>
                </CardContent>
              </Card>

              {/* Quick Snapshot */}
              <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Snapshot</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Annual Revenue</span>
                    <span className="font-bold text-slate-800">
                      ${analysisData.estimatedRevenue.annual.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">ROI</span>
                    <span className="font-bold text-green-600">{analysisData.roi}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Avg Occupancy</span>
                    <span className="font-bold text-slate-800">{analysisData.occupancyRate}%</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between">
                    <span className="text-slate-600">Market Potential</span>
                    <Badge className="bg-green-100 text-green-800">High</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={handleSaveToPortfolio} 
                  disabled={isSaving || isSaved}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium"
                >
                  {isSaving ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Saving...
                    </div>
                  ) : isSaved ? (
                    "✓ Saved to Portfolio"
                  ) : (
                    <>
                      <BookmarkPlus className="w-4 h-4 mr-2" />
                      Save to Portfolio
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={handleDownloadReport}
                  variant="outline" 
                  className="w-full bg-white/20 backdrop-blur-xl border-white/30 hover:bg-white/30 text-slate-700 font-medium"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                
                <Button 
                  onClick={() => window.location.href = '/'}
                  variant="outline" 
                  className="w-full bg-white/20 backdrop-blur-xl border-white/30 hover:bg-white/30 text-slate-700 font-medium"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Analyze Again
                </Button>
              </div>

              {/* Key Insights */}
              <Card className="bg-white/20 backdrop-blur-xl border-white/30 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisData.insights.map((insight, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}