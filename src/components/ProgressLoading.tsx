"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brain, TrendingUp, MapPin, DollarSign, Search as SearchIcon, BarChart3, Users, Calendar
} from "lucide-react";

const loadingSteps = [
  { text: "Initializing AI analysis engine...", icon: Brain, duration: 1000 },
  { text: "Scanning property data and location details...", icon: SearchIcon, duration: 1500 },
  { text: "Analyzing local market trends and demand...", icon: TrendingUp, duration: 1800 },
  { text: "Calculating revenue potential and ROI...", icon: DollarSign, duration: 1200 },
  { text: "Processing occupancy rate projections...", icon: Users, duration: 1000 },
  { text: "Evaluating seasonal demand patterns...", icon: Calendar, duration: 1400 },
  { text: "Compiling competitive analysis...", icon: BarChart3, duration: 1100 },
  { text: "Generating comprehensive insights report...", icon: MapPin, duration: 1000 }
];

export default function ProgressLoading({
  searchQuery,
  isSignedIn,
  onComplete
}: {
  searchQuery?: string;
  isSignedIn?: boolean;
  onComplete?: () => void;
}) {
  const [progress, setProgress] = React.useState(0);
  const [currentStep, setCurrentStep] = React.useState(0);
  const router = useRouter();

  React.useEffect(() => {
    let stepIndex = 0;
    let isMounted = true;
    const runLoadingSequence = async () => {
      if (!isMounted) return;
      if (stepIndex < loadingSteps.length) {
        setCurrentStep(stepIndex);
        const stepDuration = loadingSteps[stepIndex].duration;
        const startProgress = (stepIndex / loadingSteps.length) * 100;
        const endProgress = ((stepIndex + 1) / loadingSteps.length) * 100;
        let stepProgress = 0;
        const progressInterval = setInterval(() => {
          stepProgress += 2;
          const currentProgress = startProgress + (stepProgress / 100) * (endProgress - startProgress);
          setProgress(Math.min(currentProgress, endProgress));
          if (stepProgress >= 100) {
            clearInterval(progressInterval);
            stepIndex++;
            setTimeout(runLoadingSequence, 200);
          }
        }, stepDuration / 50);
      } else {
        setTimeout(() => {
          if (onComplete) onComplete();
          if (isSignedIn) {
            router.push("/dashboard");
          } else {
            router.push("/auth/signin");
          }
        }, 700);
      }
    };
    setTimeout(runLoadingSequence, 500);
    return () => { isMounted = false; };
  }, [onComplete, searchQuery, isSignedIn, router]);

  const CurrentIcon = loadingSteps[currentStep]?.icon || Brain;

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-96 h-96 gradient-primary opacity-10 rounded-full filter blur-3xl float"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 gradient-secondary opacity-8 rounded-full filter blur-3xl float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 gradient-accent opacity-6 rounded-full filter blur-3xl morph-shape"></div>
      {/* Floating AI particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-pulse`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.3}s`
            }}
          />
        ))}
      </div>
      <main className="container mx-auto px-4 py-8 relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-2xl w-full">
          <div className="mt-24">
            <Card className="glass-strong border-white/20 mb-8 rounded-2xl shadow-xl bg-white/10 backdrop-blur-lg">
              <CardContent className="p-12 text-center">
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto gradient-primary rounded-full flex items-center justify-center pulse-glow">
                    <CurrentIcon className="w-12 h-12 text-white animate-pulse" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-2 border-blue-400/30 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 border border-purple-400/20 rounded-full animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}></div>
                  </div>
                </div>
                <h1 className="text-display font-extrabold mb-6 gradient-text-accent">
                  HostLens AI
                </h1>
                <p className="text-headline text-slate-700 mb-8">
                  Analyzing Your Property Investment
                </p>
                <div className="mb-6">
                  <Progress value={progress} className="h-3 mb-4" />
                  <p className="text-lg font-medium text-slate-600">
                    {Math.round(progress)}% Complete
                  </p>
                </div>
                <div className="glass-subtle rounded-xl p-6">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <CurrentIcon className="w-6 h-6 text-blue-600 animate-pulse" />
                    <p className="text-body-large font-medium text-slate-800">
                      {loadingSteps[currentStep]?.text || "Initializing..."}
                    </p>
                  </div>
                  <div className="flex justify-center gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                        style={{
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: '1s'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="glass border-white/10 rounded-2xl bg-white/10 backdrop-blur">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3 animate-pulse" />
                <p className="text-sm font-medium text-slate-700">Market Analysis</p>
                <p className="text-xs text-slate-600">Processing trends</p>
              </CardContent>
            </Card>
            <Card className="glass border-white/10 rounded-2xl bg-white/10 backdrop-blur">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-3 animate-pulse" />
                <p className="text-sm font-medium text-slate-700">Revenue Modeling</p>
                <p className="text-xs text-slate-600">Calculating potential</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}