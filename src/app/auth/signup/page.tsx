"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Eye, EyeOff, Mail, Lock, User, UserPlus, Chrome, Github, CheckCircle
} from "lucide-react";

export default function SignUp() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    if (!acceptTerms) newErrors.terms = "You must accept the terms";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
        },
      });
      if (error) throw error;
      router.push("/");
    } catch (error) {
      setErrors({ general: (error as Error).message || "Sign up failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      setErrors({ general: (error as Error).message || "Google sign up failed." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubSignUp = async () => {
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
      setErrors({ general: (error as Error).message || "GitHub sign up failed." });
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen overflow-hidden relative flex items-center justify-center p-4">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-96 h-96 gradient-primary opacity-15 rounded-full filter blur-3xl float"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 gradient-secondary opacity-10 rounded-full filter blur-3xl float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 gradient-accent opacity-8 rounded-full filter blur-3xl morph-shape"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-purple-400 rounded-full opacity-20 animate-pulse`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${2.5 + i * 0.4}s`
            }}
          />
        ))}
      </div>
      <div className="w-full max-w-lg relative z-10">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-display font-extrabold mb-4 gradient-text-accent">HostLens</h1>
          <p className="text-body text-slate-600">Start your property investment journey</p>
        </div>
        {/* Sign Up Card */}
        <Card className="glass-strong border-white/30 backdrop-blur-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-slate-800 mb-2">Create Account</CardTitle>
            <p className="text-body text-slate-600">Join thousands of successful hosts</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* OAuth Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignUp}
                disabled={isLoading}
                className="w-full h-12 glass border-white/40 hover:glass-strong transition-all duration-300 group"
              >
                <Chrome className="w-5 h-5 mr-3 text-slate-600 group-hover:text-slate-800 transition-colors" />
                <span className="font-medium text-slate-700">Sign up with Google</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleGithubSignUp}
                disabled={isLoading}
                className="w-full h-12 glass border-white/40 hover:glass-strong transition-all duration-300 group"
              >
                <Github className="w-5 h-5 mr-3 text-slate-600 group-hover:text-slate-800 transition-colors" />
                <span className="font-medium text-slate-700">Sign up with GitHub</span>
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-slate-300/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/80 px-3 py-1 rounded-full text-slate-500 font-medium">Or create with email</span>
              </div>
            </div>
            {/* Error Message */}
            {errors.general && (
              <div className="glass bg-red-50/50 border-red-200/50 text-red-700 px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}
            {/* Email Sign Up Form */}
            <form onSubmit={handleEmailSignUp} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-slate-700">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      className={`pl-10 h-12 bg-white/60 border-white/40 text-slate-800 placeholder:text-slate-500 focus:border-blue-400 focus:ring-blue-400/20 font-medium ${
                        errors.firstName ? 'border-red-400 focus:border-red-400' : ''
                      }`}
                    />
                  </div>
                  {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-slate-700">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    className={`h-12 bg-white/60 border-white/40 text-slate-800 placeholder:text-slate-500 focus:border-blue-400 focus:ring-blue-400/20 font-medium ${
                      errors.lastName ? 'border-red-400 focus:border-red-400' : ''
                    }`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className={`pl-10 h-12 bg-white/60 border-white/40 text-slate-800 placeholder:text-slate-500 focus:border-blue-400 focus:ring-blue-400/20 font-medium ${
                      errors.email ? 'border-red-400 focus:border-red-400' : ''
                    }`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    className={`pl-10 pr-10 h-12 bg-white/60 border-white/40 text-slate-800 placeholder:text-slate-500 focus:border-blue-400 focus:ring-blue-400/20 font-medium ${
                      errors.password ? 'border-red-400 focus:border-red-400' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    className={`pl-10 pr-10 h-12 bg-white/60 border-white/40 text-slate-800 placeholder:text-slate-500 focus:border-blue-400 focus:ring-blue-400/20 font-medium ${
                      errors.confirmPassword ? 'border-red-400 focus:border-red-400' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
              </div>
              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => {
                    setAcceptTerms(!!checked);
                    if (errors.terms) setErrors(prev => ({ ...prev, terms: "" }));
                  }}
                  className={`mt-1 ${errors.terms ? 'border-red-400' : ''}`}
                />
                <div className="text-sm leading-5">
                  <label htmlFor="terms" className="text-slate-700 cursor-pointer">
                    I agree to the{' '}
                    <button type="button" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                      Terms of Service
                    </button>
                    {' '}and{' '}
                    <button type="button" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                      Privacy Policy
                    </button>
                  </label>
                  {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
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
                    Creating Account...
                  </div>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 mr-2" />
                    Create Account
                  </>
                )}
              </Button>
            </form>
            {/* Features Preview */}
            <div className="glass-subtle rounded-xl p-4 mt-6">
              <h4 className="font-semibold text-slate-800 mb-3 text-center">What you'll get:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Unlimited property analysis</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Market trend insights</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Revenue optimization tips</span>
                </div>
              </div>
            </div>
            {/* Footer Links */}
            <div className="text-center pt-4">
              <div className="text-sm text-slate-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => router.push("/auth/signin")}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Sign in here
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