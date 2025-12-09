"use client";
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Users, Bot, Zap, TrendingUp, AlertCircle, CheckCircle, Activity } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';

export default function AdminDashboardPage() {
  const metrics = [
    { label: 'Total Users', value: '2,547', change: '+12%', icon: <Users size={24} />, color: 'from-blue-500 to-blue-600' },
    { label: 'Active Users', value: '1,834', change: '+8%', icon: <Users size={24} />, color: 'from-green-500 to-green-600' },
    { label: 'Total AI Agents', value: '3,291', change: '+24%', icon: <Bot size={24} />, color: 'from-purple-500 to-purple-600' },
    { label: 'API Requests Today', value: '47,829', change: '+15%', icon: <Zap size={24} />, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Token Usage (M)', value: '12.4', change: '+18%', icon: <TrendingUp size={24} />, color: 'from-pink-500 to-pink-600' },
    { label: 'Active Sessions', value: '892', change: '+5%', icon: <Activity size={24} />, color: 'from-indigo-500 to-indigo-600' },
  ];
  const recentActivities = [
    { user: 'sarah.johnson@company.com', action: 'Created new AI agent', time: '2 minutes ago', type: 'create' },
    { user: 'mike.smith@startup.io', action: 'Generated API key', time: '5 minutes ago', type: 'api' },
    { user: 'admin@platform.ai', action: 'Updated system settings', time: '12 minutes ago', type: 'system' },
    { user: 'emma.wilson@tech.com', action: 'Exceeded token limit', time: '18 minutes ago', type: 'warning' },
    { user: 'john.doe@example.com', action: 'Upgraded to Pro plan', time: '25 minutes ago', type: 'billing' },
    { user: 'lisa.brown@dev.io', action: 'Deployed 3 new agents', time: '32 minutes ago', type: 'create' },
  ];
  const systemStatus = [
    { service: 'API Gateway', status: 'operational', uptime: '99.98%' },
    { service: 'Database', status: 'operational', uptime: '99.99%' },
    { service: 'AI Models', status: 'operational', uptime: '99.95%' },
    { service: 'Message Queue', status: 'degraded', uptime: '98.12%' },
  ];
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-surface-900 mb-2">Admin Dashboard</h1>
        <p className="text-surface-600">Monitor system performance and user activity</p>
        <div className="mt-2">
          <a href="/dashboard">
            <Button variant="outline" size="sm">&larr; Kembali ke Dashboard</Button>
          </a>
        </div>
      </div>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} hover className="relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${metric.color} opacity-10 rounded-full -mr-16 -mt-16`}></div>
            <CardContent className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-[var(--radius-md)] bg-gradient-to-br ${metric.color} flex items-center justify-center text-white`}>
                  {metric.icon}
                </div>
              </div>
              <div className="text-3xl mb-1">{metric.value}</div>
              <div className="text-sm text-surface-600 mb-2">{metric.label}</div>
              <div className="text-xs text-success">{metric.change} from last month</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-3 rounded-[var(--radius-md)] hover:bg-surface-50 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'warning' ? 'bg-warning' : 'bg-primary-500'}`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-surface-900 mb-1 truncate">{activity.user}</div>
                    <div className="text-sm text-surface-600">{activity.action}</div>
                  </div>
                  <div className="text-xs text-surface-500 whitespace-nowrap">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* System Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>System Status</CardTitle>
              <Badge variant="success">All Systems Operational</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemStatus.map((system, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-surface-50 rounded-[var(--radius-md)]">
                  <div className="flex items-center gap-3">
                    {system.status === 'operational' ? (
                      <CheckCircle size={20} className="text-success" />
                    ) : (
                      <AlertCircle size={20} className="text-warning" />
                    )}
                    <div>
                      <div className="text-sm text-surface-900">{system.service}</div>
                      <div className="text-xs text-surface-500">Uptime: {system.uptime}</div>
                    </div>
                  </div>
                  <Badge variant={system.status === 'operational' ? 'success' : 'warning'}>{system.status}</Badge>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-[var(--radius-md)]">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-error mt-0.5" />
                <div>
                  <div className="text-sm text-red-900 mb-1">Error Alert</div>
                  <div className="text-xs text-red-700">Message Queue experiencing higher than normal latency. Engineering team notified.</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
