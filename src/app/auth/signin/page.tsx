"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, LogIn, Chrome, Github } from "lucide-react";

export default function SignIn() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      router.push('/');
    } catch (error) {
      alert("Sign in failed: " + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      // The user will be redirected; no need for further action here.
    } catch (error) {
      alert("Google sign in failed: " + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      alert("GitHub sign in failed: " + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden relative flex items-center justify-center p-4">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-96 h-96 gradient-primary opacity-15 rounded-full filter blur-3xl float"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 gradient-secondary opacity-10 rounded-full filter blur-3xl float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 gradient-accent opacity-8 rounded-full filter blur-3xl morph-shape"></div>
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-blue-400 rounded-full opacity-20 animate-pulse`}
            style={{
              left: `${15 + i * 15}%`,
              top: `${25 + (i % 2) * 30}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-display font-extrabold mb-4 gradient-text-accent">HostLens</h1>
          <p className="text-body text-slate-600">Welcome back to your investment dashboard</p>
        </div>

        {/* Sign In Card */}
        <Card className="glass-strong border-white/30 backdrop-blur-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-slate-800 mb-2">Sign In</CardTitle>
            <p className="text-body text-slate-600">Access your property analytics</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* OAuth Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full h-12 glass border-white/40 hover:glass-strong transition-all duration-300 group"
              >
                <Chrome className="w-5 h-5 mr-3 text-slate-600 group-hover:text-slate-800 transition-colors" />
                <span className="font-medium text-slate-700">Continue with Google</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleGithubSignIn}
                disabled={isLoading}
                className="w-full h-12 glass border-white/40 hover:glass-strong transition-all duration-300 group"
              >
                <Github className="w-5 h-5 mr-3 text-slate-600 group-hover:text-slate-800 transition-colors" />
                <span className="font-medium text-slate-700">Continue with GitHub</span>
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-slate-300/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/80 px-3 py-1 rounded-full text-slate-500 font-medium">Or continue with email</span>
              </div>
            </div>
            {/* Email Sign In Form */}
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-12 bg-white/60 border-white/40 text-slate-800 placeholder:text-slate-500 focus:border-blue-400 focus:ring-blue-400/20 font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10 h-12 bg-white/60 border-white/40 text-slate-800 placeholder:text-slate-500 focus:border-blue-400 focus:ring-blue-400/20 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 gradient-primary hover:opacity-90 transition-all duration-300 pulse-glow font-bold text-white text-lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
            {/* Footer Links */}
            <div className="text-center space-y-3 pt-4">
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                onClick={() => router.push("/auth/forgot-password")}
              >
                Forgot your password?
              </button>
              <div className="text-sm text-slate-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/auth/signup")}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Sign up here
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Back to Home */}
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="text-slate-600 hover:text-slate-800 hover:bg-white/20 transition-all duration-300"
          >
            ← Back to HostLens Pro
          </Button>
        </div>
      </div>
    </div>
  );
}