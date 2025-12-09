"use client";
import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Grid, List, Search, Plus, MoreVertical, Calendar } from 'lucide-react';

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const projects = [
    { id: 1, name: 'Customer Support Automation', description: 'AI-powered customer service agents handling tier-1 support', status: 'running', agents: 5, lastUpdate: '2 hours ago', interactions: '1,234' },
    { id: 2, name: 'Content Generation Pipeline', description: 'Automated content creation and optimization workflow', status: 'running', agents: 3, lastUpdate: '5 hours ago', interactions: '892' },
    { id: 3, name: 'Data Analysis Suite', description: 'Real-time data processing and insights generation', status: 'idle', agents: 4, lastUpdate: '1 day ago', interactions: '456' },
    { id: 4, name: 'Code Review Assistant', description: 'Automated code review and quality assurance', status: 'running', agents: 2, lastUpdate: '30 minutes ago', interactions: '678' },
    { id: 5, name: 'Email Management System', description: 'Smart email categorization and response automation', status: 'idle', agents: 2, lastUpdate: '3 days ago', interactions: '234' },
    { id: 6, name: 'Meeting Scheduler', description: 'AI-powered meeting coordination and calendar management', status: 'running', agents: 1, lastUpdate: '1 hour ago', interactions: '567' },
  ];
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-surface-900 mb-2">Projects</h1>
          <p className="text-surface-600">Manage and monitor all your AI agent projects</p>
          <div className="mt-2">
            <a href="/dashboard">
              <Button variant="outline" size="sm">&larr; Kembali ke Dashboard</Button>
            </a>
          </div>
        </div>
        <Button size="lg">
          <Plus size={20} />
          New Project
        </Button>
      </div>
      {/* Filters & Controls */}
      <Card>
        <CardContent className="flex items-center gap-4">
          <div className="flex-1">
            <Input 
              placeholder="Search projects..." 
              icon={<Search size={18} />}
            />
          </div>
          <div className="flex items-center gap-2 border-l border-surface-200 pl-4">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-[var(--radius-md)] transition-all ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-surface-600 hover:bg-surface-100'}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-[var(--radius-md)] transition-all ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-surface-600 hover:bg-surface-100'}`}
            >
              <List size={20} />
            </button>
          </div>
        </CardContent>
      </Card>
      {/* Projects Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} hover>
              <CardContent>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-surface-900 mb-1">{project.name}</h4>
                    <p className="text-sm text-surface-600">{project.description}</p>
                  </div>
                  <button className="p-1 hover:bg-surface-100 rounded-[var(--radius-md)] transition-all">
                    <MoreVertical size={18} className="text-surface-500" />
                  </button>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-surface-600">Status</span>
                    <Badge variant={project.status === 'running' ? 'success' : 'default'}>
                      {project.status === 'running' ? 'Running' : 'Idle'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-surface-600">Agents</span>
                    <span className="text-surface-900">{project.agents}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-surface-600">Interactions</span>
                    <span className="text-surface-900">{project.interactions}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-surface-200">
                  <Calendar size={14} className="text-surface-400" />
                  <span className="text-xs text-surface-500">Updated {project.lastUpdate}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent>
            <div className="divide-y divide-surface-200">
              {projects.map((project) => (
                <div key={project.id} className="p-6 hover:bg-surface-50 transition-colors">
                  <div className="flex items-center gap-6">
                    <div className="flex-1">
                      <h4 className="text-surface-900 mb-1">{project.name}</h4>
                      <p className="text-sm text-surface-600">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-sm text-surface-900">{project.agents}</div>
                        <div className="text-xs text-surface-500">Agents</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-surface-900">{project.interactions}</div>
                        <div className="text-xs text-surface-500">Interactions</div>
                      </div>
                      <Badge variant={project.status === 'running' ? 'success' : 'default'}>
                        {project.status === 'running' ? 'Running' : 'Idle'}
                      </Badge>
                      <div className="text-sm text-surface-500 w-32">{project.lastUpdate}</div>
                      <button className="p-2 hover:bg-surface-100 rounded-[var(--radius-md)] transition-all">
                        <MoreVertical size={18} className="text-surface-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
