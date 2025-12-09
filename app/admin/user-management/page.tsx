"use client";
import React, { useState } from 'react';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components/ui/table';
import { Search, MoreVertical, UserPlus, Ban, Edit, ChevronLeft, ChevronRight } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'superadmin' | 'admin' | 'user';
    subscription: 'Enterprise' | 'Pro' | 'Free';
    tokenUsage: string;
    status: 'active' | 'suspended' | 'inactive';
    joinedDate: string;
}

export default function UserManagementPage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 12;
  const users: User[] = [
  { id: 8, name: 'Tom Harris', email: 'tom.harris@tech.org', role: 'user', subscription: 'Enterprise', tokenUsage: '156.7K', status: 'active', joinedDate: '2023-12-20' },
];

const getRoleBadge = (role: 'superadmin' | 'admin' | 'user') => {
    if (role === 'superadmin') return <Badge variant="error">Super Admin</Badge>;
    if (role === 'admin') return <Badge variant="primary">Admin</Badge>;
    return <Badge variant="default">User</Badge>;
};
const getSubscriptionBadge = (subscription: 'Enterprise' | 'Pro' | 'Free') => {
    if (subscription === 'Enterprise') return <Badge variant="secondary">Enterprise</Badge>;
    if (subscription === 'Pro') return <Badge variant="primary">Pro</Badge>;
    return <Badge variant="default">Free</Badge>;
};
const getStatusBadge = (status: 'active' | 'suspended' | 'inactive') => {
    if (status === 'active') return <Badge variant="success">Active</Badge>;
    if (status === 'suspended') return <Badge variant="error">Suspended</Badge>;
    return <Badge variant="default">Inactive</Badge>;
};
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-surface-900 mb-2">User Management</h1>
          <p className="text-surface-600">Manage user accounts and permissions</p>
          <div className="mt-2">
            <a href="/" className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100 px-3 py-1.5 text-sm transition-all duration-200">
              &larr; Back to Dashboard
            </a>
          </div>
        </div>
        <Button size="lg"><UserPlus size={20} />Add User</Button>
      </div>
      {/* Search & Filters */}
      <Card><CardContent className="flex items-center gap-4"><div className="flex-1"><Input placeholder="Search users by name or email..." icon={<Search size={18} />} /></div><select className="px-4 py-2.5 bg-white border border-surface-300 rounded-[var(--radius-md)]"><option>All Roles</option><option>Super Admin</option><option>Admin</option><option>User</option></select><select className="px-4 py-2.5 bg-white border border-surface-300 rounded-[var(--radius-md)]"><option>All Subscriptions</option><option>Enterprise</option><option>Pro</option><option>Free</option></select><select className="px-4 py-2.5 bg-white border border-surface-300 rounded-[var(--radius-md)]"><option>All Status</option><option>Active</option><option>Suspended</option><option>Inactive</option></select></CardContent></Card>
      {/* Users Table */}
      <Card padding="none"><Table><TableHeader><TableRow><TableHead>User</TableHead><TableHead>Role</TableHead><TableHead>Subscription</TableHead><TableHead>Token Usage</TableHead><TableHead>Status</TableHead><TableHead>Joined Date</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>{users.map((user) => (<TableRow key={user.id}><TableCell><div><div className="text-surface-900">{user.name}</div><div className="text-xs text-surface-500">{user.email}</div></div></TableCell><TableCell>{getRoleBadge(user.role)}</TableCell><TableCell>{getSubscriptionBadge(user.subscription)}</TableCell><TableCell>{user.tokenUsage}</TableCell><TableCell>{getStatusBadge(user.status)}</TableCell><TableCell>{user.joinedDate}</TableCell><TableCell><div className="flex items-center justify-end gap-2"><Button variant="ghost" size="sm"><Edit size={16} /></Button><Button variant="ghost" size="sm"><Ban size={16} /></Button><Button variant="ghost" size="sm"><MoreVertical size={16} /></Button></div></TableCell></TableRow>))}</TableBody></Table><div className="flex items-center justify-between p-6 border-t border-surface-200"><div className="text-sm text-surface-600">Showing 1 to 8 of 96 users</div><div className="flex items-center gap-2"><Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}><ChevronLeft size={16} />Previous</Button><div className="flex items-center gap-1">{[1, 2, 3, '...', totalPages].map((page, index) => (<button key={index} className={`w-8 h-8 rounded-[var(--radius-md)] transition-all ${page === currentPage ? 'bg-primary-600 text-white' : 'text-surface-700 hover:bg-surface-100'}`} onClick={() => typeof page === 'number' && setCurrentPage(page)} disabled={page === '...'}>{page}</button>))}</div><Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next<ChevronRight size={16} /></Button></div></div></Card>
    </div>
  );
}
