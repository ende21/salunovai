"use client";
import React from 'react';
import { useSession } from 'next-auth/react';
import { Search, Bell, Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

interface TopBarProps {
  isAdmin?: boolean;
}

export function TopBar({ isAdmin = false }: TopBarProps) {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Guest";
  const initials = userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0,2);
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-surface-200 flex items-center justify-between px-8 z-10">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-surface-50 border border-surface-200 rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>
      </div>
      
      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Admin Panel Link - Only show in user app */}
        {!isAdmin && (
          <Link href="/admin">
            <Button variant="outline" size="sm">
              <Shield size={18} />
              Admin Panel
            </Button>
          </Link>
        )}
        
        {/* Back to App Link - Only show in admin panel */}
        {isAdmin && (
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← Back to App
            </Button>
          </Link>
        )}
        
        {/* Notifications */}
        <button className="relative p-2 text-surface-600 hover:text-surface-900 hover:bg-surface-100 rounded-[var(--radius-md)] transition-all">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
        </button>
        
        {/* User Avatar or Sign In */}
        {session ? (
          <button className="flex items-center gap-3 p-1.5 pr-4 hover:bg-surface-100 rounded-[var(--radius-md)] transition-all">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-sm">
              {initials}
            </div>
            <div className="text-left">
              <div className="text-sm text-surface-900">{userName}</div>
              <div className="text-xs text-surface-500">{isAdmin ? 'Admin' : 'User'}</div>
            </div>
          </button>
        ) : (
          <Link href="/login">
            <Button variant="primary" size="sm">Sign In</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
