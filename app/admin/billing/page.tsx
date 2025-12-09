"use client";
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components/ui/table';
import { CreditCard, Download, DollarSign, TrendingUp, Calendar } from 'lucide-react';

export default function BillingPage() {
  const invoices = [
    { id: 'INV-2024-001', date: '2024-12-01', amount: '$2,450.00', status: 'paid', plan: 'Enterprise' },
    { id: 'INV-2024-002', date: '2024-11-01', amount: '$2,450.00', status: 'paid', plan: 'Enterprise' },
    { id: 'INV-2024-003', date: '2024-10-01', amount: '$2,450.00', status: 'paid', plan: 'Enterprise' },
    { id: 'INV-2024-004', date: '2024-09-01', amount: '$2,450.00', status: 'paid', plan: 'Enterprise' },
    { id: 'INV-2024-005', date: '2024-08-01', amount: '$2,450.00', status: 'paid', plan: 'Enterprise' },
  ];
  const transactions = [
    { id: 1, date: '2024-12-08 14:32:45', type: 'API Usage', description: 'GPT-4 API calls - 12,450 tokens', amount: '-$24.90', user: 'sarah.johnson@company.com' },
    { id: 2, date: '2024-12-08 12:15:20', type: 'Credit Top-up', description: 'Account credit added', amount: '+$500.00', user: 'admin@platform.ai' },
    { id: 3, date: '2024-12-07 18:45:12', type: 'API Usage', description: 'Claude 3 API calls - 8,320 tokens', amount: '-$16.64', user: 'mike.smith@startup.io' },
    { id: 4, date: '2024-12-07 15:22:30', type: 'API Usage', description: 'Embeddings - 45,600 tokens', amount: '-$4.56', user: 'emma.wilson@tech.com' },
    { id: 5, date: '2024-12-06 10:18:45', type: 'Subscription', description: 'Pro plan monthly fee', amount: '-$99.00', user: 'james.brown@dev.io' },
    { id: 6, date: '2024-12-05 14:30:15', type: 'API Usage', description: 'GPT-3.5 Turbo - 23,890 tokens', amount: '-$11.95', user: 'lisa.anderson@email.com' },
  ];
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-surface-900 mb-2">Billing</h1>
        <p className="text-surface-600">Manage subscriptions, credits, and billing information</p>
        <div className="mt-2">
          <a href="/dashboard">
            <Button variant="outline" size="sm">&larr; Kembali ke Dashboard</Button>
          </a>
        </div>
      </div>
      {/* Current Plan & Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary-500 to-primary-600 text-white border-0"><CardContent><div className="flex items-start justify-between mb-4"><div><p className="text-primary-100 mb-1">Current Plan</p><h2 className="text-white">Enterprise</h2></div><div className="w-12 h-12 bg-white/20 rounded-[var(--radius-md)] flex items-center justify-center"><CreditCard className="text-white" size={24} /></div></div><p className="text-sm text-primary-100">Unlimited agents & features</p><Button variant="outline" size="sm" className="mt-4 border-white text-white hover:bg-white/10">Manage Plan</Button></CardContent></Card>
        <Card className="bg-gradient-to-br from-secondary-500 to-secondary-600 text-white border-0"><CardContent><div className="flex items-start justify-between mb-4"><div><p className="text-secondary-100 mb-1">Credit Balance</p><h2 className="text-white">$1,247.50</h2></div><div className="w-12 h-12 bg-white/20 rounded-[var(--radius-md)] flex items-center justify-center"><DollarSign className="text-white" size={24} /></div></div><p className="text-sm text-secondary-100">Available credits</p><Button variant="outline" size="sm" className="mt-4 border-white text-white hover:bg-white/10">Top Up</Button></CardContent></Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0"><CardContent><div className="flex items-start justify-between mb-4"><div><p className="text-green-100 mb-1">This Month</p><h2 className="text-white">$892.34</h2></div><div className="w-12 h-12 bg-white/20 rounded-[var(--radius-md)] flex items-center justify-center"><TrendingUp className="text-white" size={24} /></div></div><p className="text-sm text-green-100">Total usage</p><div className="mt-4 text-sm text-green-100">↑ 12% from last month</div></CardContent></Card>
      </div>
      {/* Invoices */}
      <Card><CardHeader><div className="flex items-center justify-between"><CardTitle>Invoices</CardTitle><Button variant="outline" size="sm"><Download size={16} />Download All</Button></div></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Invoice ID</TableHead><TableHead>Date</TableHead><TableHead>Plan</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>{invoices.map((invoice) => (<TableRow key={invoice.id}><TableCell className="font-mono text-sm">{invoice.id}</TableCell><TableCell><div className="flex items-center gap-2"><Calendar size={14} className="text-surface-400" />{invoice.date}</div></TableCell><TableCell><Badge variant="secondary">{invoice.plan}</Badge></TableCell><TableCell>{invoice.amount}</TableCell><TableCell><Badge variant="success">Paid</Badge></TableCell><TableCell className="text-right"><Button variant="ghost" size="sm"><Download size={16} />Download</Button></TableCell></TableRow>))}</TableBody></Table></CardContent></Card>
      {/* Transaction History */}
      <Card><CardHeader><CardTitle>Transaction History</CardTitle></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Date & Time</TableHead><TableHead>Type</TableHead><TableHead>Description</TableHead><TableHead>User</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader><TableBody>{transactions.map((transaction) => (<TableRow key={transaction.id}><TableCell className="font-mono text-xs">{transaction.date}</TableCell><TableCell><Badge variant={transaction.type === 'Credit Top-up' ? 'success' : transaction.type === 'Subscription' ? 'secondary' : 'default'}>{transaction.type}</Badge></TableCell><TableCell className="text-sm">{transaction.description}</TableCell><TableCell className="text-sm text-surface-600">{transaction.user}</TableCell><TableCell className={`text-right ${transaction.amount.startsWith('+') ? 'text-success' : 'text-surface-900'}`}>{transaction.amount}</TableCell></TableRow>))}</TableBody></Table></CardContent></Card>
      {/* Payment Methods */}
      <Card><CardHeader><div className="flex items-center justify-between"><CardTitle>Payment Methods</CardTitle><Button size="sm">Add Payment Method</Button></div></CardHeader><CardContent><div className="space-y-3"><div className="flex items-center justify-between p-4 bg-surface-50 rounded-[var(--radius-md)] border border-surface-200"><div className="flex items-center gap-4"><div className="w-12 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-md flex items-center justify-center"><CreditCard className="text-white" size={20} /></div><div><div className="text-sm text-surface-900">Visa ending in 4242</div><div className="text-xs text-surface-500">Expires 12/2025</div></div><Badge variant="primary">Primary</Badge></div><div className="flex items-center gap-2"><Button variant="ghost" size="sm">Edit</Button><Button variant="ghost" size="sm">Remove</Button></div></div><div className="flex items-center justify-between p-4 bg-surface-50 rounded-[var(--radius-md)] border border-surface-200"><div className="flex items-center gap-4"><div className="w-12 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-md flex items-center justify-center"><CreditCard className="text-white" size={20} /></div><div><div className="text-sm text-surface-900">Mastercard ending in 8888</div><div className="text-xs text-surface-500">Expires 09/2026</div></div></div><div className="flex items-center gap-2"><Button variant="ghost" size="sm">Edit</Button><Button variant="ghost" size="sm">Remove</Button></div></div></div></CardContent></Card>
    </div>
  );
}
