"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components/ui/table';
import { Key, Copy, Trash2, Plus, BookOpen, RefreshCw, AlertCircle } from 'lucide-react';

export default function APIKeysPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const apiKeys = [
    {
      id: 1,
      name: 'Production API Key',
      key: 'sk-proj-xxxxxxxxxxxxxxxxxxxx1234',
      created: '2024-01-15',
      lastUsed: '2 minutes ago',
      requests: '2.4M',
      rateLimit: '10,000/min',
      status: 'active'
    },
    {
      id: 2,
      name: 'Development API Key',
      key: 'sk-proj-yyyyyyyyyyyyyyyyyyyy5678',
      created: '2024-02-20',
      lastUsed: '1 hour ago',
      requests: '456K',
      rateLimit: '5,000/min',
      status: 'active'
    },
    {
      id: 3,
      name: 'Testing API Key',
      key: 'sk-proj-zzzzzzzzzzzzzzzzzzzz9012',
      created: '2024-03-10',
      lastUsed: '3 days ago',
      requests: '12K',
      rateLimit: '1,000/min',
      status: 'active'
    },
    {
      id: 4,
      name: 'Legacy API Key',
      key: 'sk-proj-aaaaaaaaaaaaaaaaaaaa3456',
      created: '2023-11-05',
      lastUsed: 'Never',
      requests: '0',
      rateLimit: '10,000/min',
      status: 'inactive'
    },
  ];
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-surface-900 mb-2">API & Keys</h1>
          <p className="text-surface-600">Manage API keys and access controls</p>
          <div className="mt-2">
            <a href="/dashboard">
              <Button variant="outline" size="sm">&larr; Kembali ke Dashboard</Button>
            </a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline"><BookOpen size={20} />Documentation</Button>
          <Button size="lg" onClick={() => setShowCreateModal(true)}><Plus size={20} />Create New Key</Button>
        </div>
      </div>
      {/* Info Banner */}
      <Card className="bg-primary-50 border-primary-200"><CardContent className="flex items-start gap-3"><AlertCircle className="text-primary-600 mt-0.5 flex-shrink-0" size={20} /><div><div className="text-sm text-primary-900 mb-1">API Key Security</div><div className="text-sm text-primary-700">Keep your API keys secure and never share them publicly. Each key provides full access to your account. You can set rate limits and revoke access at any time.</div></div></CardContent></Card>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardContent><div className="text-2xl mb-1">4</div><div className="text-sm text-surface-600">Total Keys</div></CardContent></Card>
        <Card><CardContent><div className="text-2xl mb-1">3</div><div className="text-sm text-surface-600">Active Keys</div></CardContent></Card>
        <Card><CardContent><div className="text-2xl mb-1">2.87M</div><div className="text-sm text-surface-600">Total Requests</div></CardContent></Card>
        <Card><CardContent><div className="text-2xl mb-1">47.8K</div><div className="text-sm text-surface-600">Requests Today</div></CardContent></Card>
      </div>
      {/* API Keys Table */}
      <Card><CardHeader><CardTitle>API Keys</CardTitle></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>API Key</TableHead><TableHead>Created</TableHead><TableHead>Last Used</TableHead><TableHead>Total Requests</TableHead><TableHead>Rate Limit</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>{apiKeys.map((apiKey) => (<TableRow key={apiKey.id}><TableCell><div className="flex items-center gap-2"><Key size={16} className="text-surface-400" />{apiKey.name}</div></TableCell><TableCell><div className="flex items-center gap-2"><code className="text-xs bg-surface-100 px-2 py-1 rounded">{apiKey.key}</code><button className="p-1 hover:bg-surface-100 rounded transition-all"><Copy size={14} className="text-surface-500" /></button></div></TableCell><TableCell>{apiKey.created}</TableCell><TableCell>{apiKey.lastUsed}</TableCell><TableCell>{apiKey.requests}</TableCell><TableCell><Badge variant="default">{apiKey.rateLimit}</Badge></TableCell><TableCell><Badge variant={apiKey.status === 'active' ? 'success' : 'default'}>{apiKey.status}</Badge></TableCell><TableCell><div className="flex items-center justify-end gap-2"><Button variant="ghost" size="sm" title="Regenerate"><RefreshCw size={16} /></Button><Button variant="ghost" size="sm" title="Revoke"><Trash2 size={16} className="text-error" /></Button></div></TableCell></TableRow>))}</TableBody></Table></CardContent></Card>
      {/* Rate Limit Control */}
      <Card><CardHeader><CardTitle>Rate Limit Configuration</CardTitle></CardHeader><CardContent className="space-y-4"><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div><label className="block mb-2 text-surface-700">Default Rate Limit</label><select className="w-full px-4 py-2.5 bg-white border border-surface-300 rounded-[var(--radius-md)]"><option>1,000 requests/min</option><option>5,000 requests/min</option><option>10,000 requests/min</option><option>50,000 requests/min</option><option>Unlimited</option></select></div><div><label className="block mb-2 text-surface-700">Burst Limit</label><select className="w-full px-4 py-2.5 bg-white border border-surface-300 rounded-[var(--radius-md)]"><option>2x rate limit</option><option>3x rate limit</option><option>5x rate limit</option><option>10x rate limit</option></select></div><div><label className="block mb-2 text-surface-700">Timeout Period</label><select className="w-full px-4 py-2.5 bg-white border border-surface-300 rounded-[var(--radius-md)]"><option>30 seconds</option><option>1 minute</option><option>5 minutes</option><option>15 minutes</option></select></div></div><div className="flex items-center justify-end pt-4 border-t border-surface-200"><Button>Save Configuration</Button></div></CardContent></Card>
      {/* Documentation Link */}
      <Card className="bg-gradient-to-br from-secondary-50 to-secondary-100 border-secondary-200"><CardContent className="flex items-center justify-between"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-[var(--radius-md)] flex items-center justify-center"><BookOpen className="text-white" size={24} /></div><div><h4 className="text-secondary-900 mb-1">API Documentation</h4><p className="text-sm text-secondary-700">Learn how to integrate our AI agents into your applications</p></div></div><Button variant="outline" className="border-secondary-600 text-secondary-600 hover:bg-secondary-200">View Docs</Button></CardContent></Card>
      {/* Create Key Modal */}
      {showCreateModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><Card className="max-w-lg w-full"><CardHeader><CardTitle>Create New API Key</CardTitle></CardHeader><CardContent className="space-y-4"><Input label="Key Name" placeholder="e.g., Production API Key" /><div><label className="block mb-2 text-surface-700">Rate Limit</label><select className="w-full px-4 py-2.5 bg-white border border-surface-300 rounded-[var(--radius-md)]"><option>1,000 requests/min</option><option>5,000 requests/min</option><option>10,000 requests/min</option><option>50,000 requests/min</option><option>Unlimited</option></select></div><div><label className="block mb-2 text-surface-700">Permissions</label><div className="space-y-2"><label className="flex items-center gap-2"><input type="checkbox" className="rounded" defaultChecked /><span className="text-sm">Read access</span></label><label className="flex items-center gap-2"><input type="checkbox" className="rounded" defaultChecked /><span className="text-sm">Write access</span></label><label className="flex items-center gap-2"><input type="checkbox" className="rounded" /><span className="text-sm">Admin access</span></label></div></div><div className="bg-yellow-50 border border-yellow-200 rounded-[var(--radius-md)] p-4"><div className="flex items-start gap-2"><AlertCircle size={16} className="text-warning mt-0.5" /><p className="text-sm text-yellow-800">Make sure to copy your API key now. You won&apos;t be able to see it again!</p></div></div><div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-200"><Button variant="ghost" onClick={() => setShowCreateModal(false)}>Cancel</Button><Button onClick={() => setShowCreateModal(false)}>Create API Key</Button></div></CardContent></Card></div>)}
    </div>
  );
}
