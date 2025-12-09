"use client";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Bot, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log("Forgot password for:", email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[var(--radius-lg)] bg-gradient-to-br from-primary-600 to-secondary-600 mb-4">
            <Bot className="text-white" size={32} />
          </div>
          <h1 className="text-surface-900 mb-2">Forgot Password?</h1>
          <p className="text-surface-600">
            {submitted
              ? "Check your email for reset instructions"
              : "Enter your email to receive a password reset link"
            }
          </p>
        </div>
        <Card>
          <CardContent>
            {submitted ? (
              <div className="space-y-6">
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-success" size={32} />
                  </div>
                  <h3 className="text-surface-900 mb-2">Email Sent!</h3>
                  <p className="text-sm text-surface-600">
                    We&apos;ve sent a password reset link to <strong>{email}</strong>.
                    Please check your inbox and follow the instructions.
                  </p>
                </div>
                <div className="text-center text-sm text-surface-600">
                  Didn&apos;t receive the email?{' '}
                  <button onClick={() => setSubmitted(false)} className="text-primary-600 hover:text-primary-700">Try again</button>
                </div>
                <div className="text-center mt-4">
                  <Link href="/login" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700">
                    <ArrowLeft size={16} /> Back to Login
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Email Address" type="email" placeholder="Enter your email" icon={<Mail size={18} />} value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Button type="submit" className="w-full" size="lg">Send Reset Link</Button>
              </form>
            )}
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
