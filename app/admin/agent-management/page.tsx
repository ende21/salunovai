"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input, Textarea } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Bot, Plus, Edit, Trash2, Power, PowerOff, Calendar } from 'lucide-react';

export default function AgentManagementAdminPage() {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [showModal, setShowModal] = useState(false);
  const agents = [
    {
      id: 1,
      name: 'Customer Support Bot',
      model: 'GPT-4',
      capabilities: ['NLP', 'Sentiment Analysis', 'Multi-language'],
      owner: 'sarah.johnson@company.com',
      status: 'enabled',
      lastActivity: '5 minutes ago',
      totalInteractions: '12.4K'
    },
    {
      id: 2,
      name: 'Data Analysis Agent',
      model: 'Claude 3',
      capabilities: ['Data Processing', 'Visualization', 'Insights'],
      owner: 'mike.smith@startup.io',
      status: 'enabled',
      lastActivity: '1 hour ago',
      totalInteractions: '8.2K'
    },
    {
      id: 3,
      name: 'Content Writer',
      model: 'GPT-3.5 Turbo',
      capabilities: ['Writing', 'SEO', 'Translation'],
      owner: 'emma.wilson@tech.com',
      status: 'disabled',
      lastActivity: '2 days ago',
      totalInteractions: '3.1K'
    },
    {
      id: 4,
      name: 'Code Review Assistant',
      model: 'GPT-4',
      capabilities: ['Code Analysis', 'Bug Detection', 'Best Practices'],
      owner: 'james.brown@dev.io',
      status: 'enabled',
      lastActivity: '15 minutes ago',
      totalInteractions: '6.7K'
    },
    {
      id: 5,
      name: 'Email Automation',
      model: 'Gemini Pro',
      capabilities: ['Email Processing', 'Auto-reply', 'Categorization'],
      owner: 'lisa.anderson@email.com',
      status: 'enabled',
      lastActivity: '30 minutes ago',
      totalInteractions: '15.8K'
    },
    {
      id: 6,
      name: 'Meeting Scheduler',
      model: 'GPT-3.5 Turbo',
      capabilities: ['Calendar Management', 'Scheduling', 'Reminders'],
      owner: 'david.lee@business.com',
      status: 'enabled',
      lastActivity: '2 hours ago',
      totalInteractions: '4.3K'
    },
  ];
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-surface-900 mb-2">AI Agent Management</h1>
          <p className="text-surface-600">Monitor and control all AI agents across the platform</p>
              <div className="mt-2">
                <a href="/dashboard">
                  <Button variant="outline" size="sm">&larr; Kembali ke Dashboard</Button>
                </a>
              </div>
        </div>
        <Button size="lg" onClick={() => setShowModal(true)}>
          <Plus size={20} />
          Create New Agent
        </Button>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardContent><div className="text-2xl mb-1">3,291</div><div className="text-sm text-surface-600">Total Agents</div></CardContent></Card>
        <Card><CardContent><div className="text-2xl mb-1">2,847</div><div className="text-sm text-surface-600">Active Agents</div></CardContent></Card>
        <Card><CardContent><div className="text-2xl mb-1">444</div><div className="text-sm text-surface-600">Inactive Agents</div></CardContent></Card>
        <Card><CardContent><div className="text-2xl mb-1">1.2M</div><div className="text-sm text-surface-600">Total Interactions</div></CardContent></Card>
      </div>
      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} hover>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[var(--radius-md)] bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                    <Bot className="text-white" size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-base">{agent.name}</CardTitle>
                    <p className="text-xs text-surface-500">{agent.model}</p>
                  </div>
                </div>
                <Badge variant={agent.status === 'enabled' ? 'success' : 'default'}>{agent.status === 'enabled' ? 'Enabled' : 'Disabled'}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-xs text-surface-600 mb-2">Capabilities</div>
                <div className="flex flex-wrap gap-1">
                  {agent.capabilities.map((capability, index) => (
                    <Badge key={index} variant="primary" className="text-xs">{capability}</Badge>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-surface-200 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-surface-600">Owner</span>
                  <span className="text-surface-900 text-xs truncate ml-2">{agent.owner}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-surface-600">Interactions</span>
                  <span className="text-surface-900">{agent.totalInteractions}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-surface-500">
                  <Calendar size={12} />
                  <span>Last active {agent.lastActivity}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-surface-200">
                <Button variant="outline" size="sm" className="flex-1"><Edit size={14} />Edit</Button>
                <Button variant={agent.status === 'enabled' ? 'ghost' : 'outline'} size="sm" className="flex-1">{agent.status === 'enabled' ? <PowerOff size={14} /> : <Power size={14} />}{agent.status === 'enabled' ? 'Disable' : 'Enable'}</Button>
                <Button variant="ghost" size="sm"><Trash2 size={14} className="text-error" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Create Agent Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader><CardTitle>Create New Agent</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Input label="Agent Name" placeholder="Enter agent name" />
              <Textarea label="Description" placeholder="Describe the agent's purpose..." rows={3} />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-surface-700">Model</label>
                  <select className="w-full px-4 py-2.5 bg-white border border-surface-300 rounded-[var(--radius-md)]">
                    <option>GPT-4</option>
                    <option>GPT-3.5 Turbo</option>
                    <option>Claude 3</option>
                    <option>Gemini Pro</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-surface-700">Owner</label>
                  <select className="w-full px-4 py-2.5 bg-white border border-surface-300 rounded-[var(--radius-md)]">
                    <option>Select user...</option>
                    <option>sarah.johnson@company.com</option>
                    <option>mike.smith@startup.io</option>
                    <option>emma.wilson@tech.com</option>
                  </select>
                </div>
              </div>
              <Textarea label="System Prompt" placeholder="Enter the system prompt for this agent..." rows={4} />
              <div>
                <label className="block mb-2 text-surface-700">Enable Tools</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2"><input type="checkbox" className="rounded" defaultChecked /><span className="text-sm">Web Search</span></label>
                  <label className="flex items-center gap-2"><input type="checkbox" className="rounded" defaultChecked /><span className="text-sm">Code Interpreter</span></label>
                  <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /><span className="text-sm">Image Generation</span></label>
                  <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /><span className="text-sm">File Analysis</span></label>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-200">
                <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button onClick={() => setShowModal(false)}>Create Agent</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
