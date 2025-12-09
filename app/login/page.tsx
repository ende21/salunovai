"use client";
import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Bot, Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Call backend API for authentication
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (data.success) {
          // Handle successful login (e.g., save token, redirect)
          alert("Login successful!");
        } else {
          alert(data.message || "Login failed");
        }
      })
      .catch(() => {
        alert("Network error. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[var(--radius-lg)] bg-gradient-to-br from-primary-600 to-secondary-600 mb-4">
            <Bot className="text-white" size={32} />
          </div>
          <h1 className="text-surface-900 mb-2">Welcome Back</h1>
          <p className="text-surface-600">Sign in to your AI Agent Platform account</p>
        </div>
        <Card>
          <CardContent>
            {/* Social Login Options */}
            <div className="space-y-3 mb-6">
              <Button variant="outline" className="w-full border-surface-300 hover:bg-surface-50" type="button">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
              <Button variant="outline" className="w-full border-surface-300 hover:bg-surface-50" type="button">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Continue with GitHub
              </Button>
            </div>
            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-surface-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-surface-500">Or continue with email</span>
              </div>
            </div>
            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <Input label="Email Address" type="email" placeholder="Enter your email" icon={<Mail size={18} />} value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input label="Password" type="password" placeholder="Enter your password" icon={<Lock size={18} />} value={password} onChange={(e) => setPassword(e.target.value)} required />
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-surface-700">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-primary-600 hover:text-primary-700">Forgot Password?</Link>
              </div>
              <Button type="submit" className="w-full" size="lg">Sign In</Button>
            </form>
            {/* Register Link */}
            <div className="mt-6 text-center text-sm">
              <span className="text-surface-600">Don&apos;t have an account? </span>
              <Link href="/register" className="text-primary-600 hover:text-primary-700">Sign up</Link>
            </div>
          </CardContent>
        </Card>
        {/* Footer */}
        <div className="mt-8 text-center text-xs text-surface-500">
          <p>© 2024 AI Agent Platform. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
