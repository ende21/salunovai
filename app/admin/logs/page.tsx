"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components/ui/table';
import { Search, Download, Filter } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function LogsPage() {
  const [selectedTab, setSelectedTab] = useState<'logs' | 'performance'>('logs');
  const logs = [
    {
      id: 1,
      timestamp: '2024-12-08 14:32:45',
      endpoint: '/api/v1/chat/completions',
      method: 'POST',
      status: 200,
      responseTime: '234ms',
      tokenUsage: 145,
      cost: '$0.0023',
      user: 'sarah.johnson@company.com',
      severity: 'info'
    },
    {
      id: 2,
      timestamp: '2024-12-08 14:32:42',
      endpoint: '/api/v1/agents/create',
      method: 'POST',
      status: 201,
      responseTime: '456ms',
      tokenUsage: 0,
      cost: '$0.0000',
      user: 'mike.smith@startup.io',
      severity: 'info'
    },
    {
      id: 3,
      timestamp: '2024-12-08 14:32:38',
      endpoint: '/api/v1/chat/completions',
      method: 'POST',
      status: 500,
      responseTime: '1234ms',
      tokenUsage: 0,
      cost: '$0.0000',
      user: 'emma.wilson@tech.com',
      severity: 'error'
    },
    {
      id: 4,
      timestamp: '2024-12-08 14:32:35',
      endpoint: '/api/v1/models/list',
      method: 'GET',
      status: 200,
      responseTime: '89ms',
      tokenUsage: 0,
      cost: '$0.0000',
      user: 'james.brown@dev.io',
      severity: 'info'
    },
    {
      id: 5,
      timestamp: '2024-12-08 14:32:30',
      endpoint: '/api/v1/chat/completions',
      method: 'POST',
      status: 429,
      responseTime: '12ms',
      tokenUsage: 0,
      cost: '$0.0000',
      user: 'lisa.anderson@email.com',
      severity: 'warning'
    },
    {
      id: 6,
      timestamp: '2024-12-08 14:32:28',
      endpoint: '/api/v1/embeddings',
      method: 'POST',
      status: 200,
      responseTime: '567ms',
      tokenUsage: 892,
      cost: '$0.0089',
      user: 'david.lee@business.com',
      severity: 'info'
    },
    {
      id: 7,
      timestamp: '2024-12-08 14:32:25',
      endpoint: '/api/v1/chat/completions',
      method: 'POST',
      status: 200,
      responseTime: '345ms',
      tokenUsage: 234,
      cost: '$0.0035',
      user: 'rachel.green@company.io',
      severity: 'info'
    },
  ];
  const performanceData = [
    { time: '00:00', latency: 120, requests: 450, tokens: 12000 },
    { time: '04:00', latency: 95, requests: 320, tokens: 8500 },
    { time: '08:00', latency: 180, requests: 890, tokens: 25000 },
    { time: '12:00', latency: 210, requests: 1200, tokens: 34000 },
    { time: '16:00', latency: 165, requests: 980, tokens: 28000 },
    { time: '20:00', latency: 145, requests: 670, tokens: 18000 },
    { time: '24:00', latency: 110, requests: 420, tokens: 11000 },
  ];
  const getSeverityBadge = (severity: string) => {
    if (severity === 'error') return <Badge variant="error">Error</Badge>;
    if (severity === 'warning') return <Badge variant="warning">Warning</Badge>;
    return <Badge variant="default">Info</Badge>;
  };
  const getStatusBadge = (status: number) => {
    if (status >= 200 && status < 300) return <Badge variant="success">{status}</Badge>;
    if (status >= 400 && status < 500) return <Badge variant="warning">{status}</Badge>;
    if (status >= 500) return <Badge variant="error">{status}</Badge>;
    return <Badge variant="default">{status}</Badge>;
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-surface-900 mb-2">Logs & Monitoring</h1>
          <p className="text-surface-600">Monitor API requests, performance metrics, and system logs</p>
        </div>
        <Button variant="outline"><Download size={20} />Export Logs</Button>
      </div>
      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-surface-200">
        <button onClick={() => setSelectedTab('logs')} className={`px-4 py-2 transition-all ${selectedTab === 'logs' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-surface-600 hover:text-surface-900'}`}>API Logs</button>
        <button onClick={() => setSelectedTab('performance')} className={`px-4 py-2 transition-all ${selectedTab === 'performance' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-surface-600 hover:text-surface-900'}`}>Performance Metrics</button>
      </div>
      {selectedTab === 'logs' ? (<><Card><CardContent className="flex items-center gap-4"><div className="flex-1"><Input placeholder="Search logs..." icon={<Search size={18} />} /></div><select className="px-4 py-2.5 bg-white border border-surface-300 rounded-[var(--radius-md)]"><option>All Methods</option><option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option></select><select className="px-4 py-2.5 bg-white border border-surface-300 rounded-[var(--radius-md)]"><option>All Status</option><option>2xx Success</option><option>4xx Client Error</option><option>5xx Server Error</option></select><select className="px-4 py-2.5 bg-white border border-surface-300 rounded-[var(--radius-md)]"><option>All Severity</option><option>Info</option><option>Warning</option><option>Error</option></select><Button variant="outline"><Filter size={18} />More Filters</Button></CardContent></Card><Card padding="none"><Table><TableHeader><TableRow><TableHead>Timestamp</TableHead><TableHead>Endpoint</TableHead><TableHead>Method</TableHead><TableHead>Status</TableHead><TableHead>Response Time</TableHead><TableHead>Token Usage</TableHead><TableHead>Cost</TableHead><TableHead>User</TableHead><TableHead>Severity</TableHead></TableRow></TableHeader><TableBody>{logs.map((log) => (<TableRow key={log.id}><TableCell className="font-mono text-xs">{log.timestamp}</TableCell><TableCell className="font-mono text-xs">{log.endpoint}</TableCell><TableCell><Badge variant="default">{log.method}</Badge></TableCell><TableCell>{getStatusBadge(log.status)}</TableCell><TableCell>{log.responseTime}</TableCell><TableCell>{log.tokenUsage.toLocaleString()}</TableCell><TableCell>{log.cost}</TableCell><TableCell className="text-xs">{log.user}</TableCell><TableCell>{getSeverityBadge(log.severity)}</TableCell></TableRow>))}</TableBody></Table></Card></> ) : (<><div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><Card><CardHeader><CardTitle>Response Time (Latency)</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={300}><LineChart data={performanceData}><CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" /><XAxis dataKey="time" stroke="#737373" /><YAxis stroke="#737373" /><Tooltip contentStyle={{backgroundColor: 'white',border: '1px solid #e5e5e5',borderRadius: '0.75rem'}} /><Line type="monotone" dataKey="latency" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} /></LineChart></ResponsiveContainer></CardContent></Card><Card><CardHeader><CardTitle>API Requests</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={300}><AreaChart data={performanceData}><CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" /><XAxis dataKey="time" stroke="#737373" /><YAxis stroke="#737373" /><Tooltip contentStyle={{backgroundColor: 'white',border: '1px solid #e5e5e5',borderRadius: '0.75rem'}} /><Area type="monotone" dataKey="requests" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} /></AreaChart></ResponsiveContainer></CardContent></Card></div><Card><CardHeader><CardTitle>Token Usage</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={300}><AreaChart data={performanceData}><CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" /><XAxis dataKey="time" stroke="#737373" /><YAxis stroke="#737373" /><Tooltip contentStyle={{backgroundColor: 'white',border: '1px solid #e5e5e5',borderRadius: '0.75rem'}} /><Area type="monotone" dataKey="tokens" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} /></AreaChart></ResponsiveContainer></CardContent></Card></> )}
    </div>
  );
}
