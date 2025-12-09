"use client";
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Bell, Key, Palette, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-surface-900 mb-2">Settings</h1>
        <p className="text-surface-600">Manage your account and application preferences</p>
        <div className="mt-2">
          <a href="/" className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100 px-3 py-1.5 text-sm transition-all duration-200">
            &larr; Back to Dashboard
          </a>
        </div>
      </div>
      {/* User Profile */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User size={20} className="text-primary-600" />
            <CardTitle>User Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-2xl">JD</div>
            <div>
              <Button variant="outline" size="sm">Change Avatar</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" defaultValue="John" />
            <Input label="Last Name" defaultValue="Doe" />
          </div>
          <Input label="Email Address" type="email" defaultValue="john.doe@example.com" />
          <Input label="Company" defaultValue="Acme Inc." />
          <div className="pt-4 border-t border-surface-200">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
      {/* API Key Setup */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key size={20} className="text-secondary-600" />
            <CardTitle>API Key Setup</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-secondary-50 border border-secondary-200 rounded-[var(--radius-md)] p-4">
            <p className="text-sm text-secondary-900 mb-2">Your API keys allow you to integrate AI agents into your applications.</p>
            <p className="text-xs text-secondary-700">Keep your keys secure and never share them publicly.</p>
          </div>
          <div>
            <label className="block mb-2 text-surface-700">Active API Keys</label>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-surface-50 rounded-[var(--radius-md)]">
                <div className="flex items-center gap-4">
                  <div className="font-mono text-sm text-surface-700">sk-proj-•••••••••••••xxxx1234</div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">Copy</Button>
                  <Button variant="ghost" size="sm">Revoke</Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-50 rounded-[var(--radius-md)]">
                <div className="flex items-center gap-4">
                  <div className="font-mono text-sm text-surface-700">sk-proj-•••••••••••••yyyy5678</div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">Copy</Button>
                  <Button variant="ghost" size="sm">Revoke</Button>
                </div>
              </div>
            </div>
          </div>
          <Button variant="outline">Generate New API Key</Button>
        </CardContent>
      </Card>
      {/* General Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette size={20} className="text-primary-600" />
            <CardTitle>General Configuration</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <div className="text-surface-900 mb-1">Language</div>
              <div className="text-sm text-surface-600">Select your preferred language</div>
            </div>
            <select className="px-4 py-2 bg-white border border-surface-300 rounded-[var(--radius-md)]">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          <div className="flex items-center justify-between py-3 border-t border-surface-200">
            <div>
              <div className="text-surface-900 mb-1">Timezone</div>
              <div className="text-sm text-surface-600">Set your local timezone</div>
            </div>
            <select className="px-4 py-2 bg-white border border-surface-300 rounded-[var(--radius-md)]">
              <option>UTC-8 (Pacific Time)</option>
              <option>UTC-5 (Eastern Time)</option>
              <option>UTC+0 (GMT)</option>
              <option>UTC+1 (Central European Time)</option>
            </select>
          </div>
        </CardContent>
      </Card>
      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell size={20} className="text-primary-600" />
            <CardTitle>Notifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <div className="text-surface-900 mb-1">Email Notifications</div>
              <div className="text-sm text-surface-600">Receive email updates about your agents</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-surface-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-3 border-t border-surface-200">
            <div>
              <div className="text-surface-900 mb-1">Agent Status Alerts</div>
              <div className="text-sm text-surface-600">Get notified when agents start or stop</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-surface-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-3 border-t border-surface-200">
            <div>
              <div className="text-surface-900 mb-1">Error Notifications</div>
              <div className="text-sm text-surface-600">Alerts for errors and issues</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-surface-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </CardContent>
      </Card>
      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-error" />
            <CardTitle>Security</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline">Change Password</Button>
          <Button variant="outline">Enable Two-Factor Authentication</Button>
          <div className="pt-4 border-t border-surface-200">
            <Button variant="danger">Delete Account</Button>
            <p className="text-xs text-surface-500 mt-2">This action is permanent and cannot be undone.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
