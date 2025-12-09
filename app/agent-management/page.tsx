"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input, Select, Textarea } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Play, Pause, Settings as SettingsIcon, Terminal } from 'lucide-react';

export default function AgentManagementPage() {
  const [isRunning, setIsRunning] = useState(false);
  
  const capabilities = ['Natural Language Processing', 'Data Analysis', 'Code Generation', 'Image Recognition', 'Sentiment Analysis'];
  
  const logs = [
    { time: '14:32:15', level: 'info', message: 'Agent initialized successfully' },
    { time: '14:32:18', level: 'info', message: 'Connected to API endpoint' },
    { time: '14:32:20', level: 'success', message: 'Model loaded: GPT-4' },
    { time: '14:32:25', level: 'info', message: 'Waiting for user input...' },
    { time: '14:35:42', level: 'info', message: 'Processing request...' },
    { time: '14:35:45', level: 'success', message: 'Response generated successfully' },
    { time: '14:35:46', level: 'info', message: 'Tokens used: 245' },
  ];
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-surface-900 mb-2">Agent Management</h1>
          <p className="text-surface-600">Configure and control your AI agents</p>
        <div className="flex items-center gap-3">
          <Button 
            variant={isRunning ? 'danger' : 'primary'}
            size="lg"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? (
              <>
                <Pause size={20} />
                Stop Agent
              </>
                  ) : (
                    <>
                      <Play size={20} />
                      Start Agent
                    </>
                  )}
                </Button>
              </div>
            </div>
      
            {/* Configuration Cards */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Model Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select 
                    label="Model Selection"
                    options={[
                      { value: 'gpt-4', label: 'GPT-4 (Most Capable)' },
                      { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo (Fast & Efficient)' },
                      { value: 'claude-3', label: 'Claude 3 (Advanced Reasoning)' },
                      { value: 'gemini-pro', label: 'Gemini Pro (Multimodal)' },
                    ]}
                    defaultValue="gpt-4"
                  />
              
              <div>
                <label className="block mb-2 text-surface-700">Capabilities</label>
                <div className="flex flex-wrap gap-2">
                  {capabilities.map((capability, index) => (
                    <Badge key={index} variant="primary" className="cursor-pointer hover:bg-primary-200">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                label="API Endpoint" 
                placeholder="https://api.example.com"
                defaultValue="https://api.openai.com/v1"
              />
              
              <Input 
                label="API Key" 
                type="password"
                placeholder="sk-..."
                defaultValue="sk-proj-xxxxxxxxxxxxxxxxxxxx"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Temperature" 
                  type="number"
                  placeholder="0.7"
                  defaultValue="0.7"
                  step="0.1"
                  min="0"
                  max="1"
                />
                
                <Input 
                  label="Max Tokens" 
                  type="number"
                  placeholder="2048"
                  defaultValue="2048"
                />
              </div>
              
              <Button variant="outline" className="w-full">Test Connection</Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Live Logs */}
        <Card className="lg:sticky lg:top-24">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal size={20} className="text-secondary-600" />
                <CardTitle>Live Logs</CardTitle>
              </div>
              {isRunning && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                  <span className="text-xs text-success">Running</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-surface-900 rounded-[var(--radius-md)] p-4 h-96 overflow-y-auto font-mono text-xs">
              {logs.map((log, index) => (
                <div key={index} className="mb-2">
                  <span className="text-surface-400">[{log.time}]</span>
                  {' '}
                  <span className={
                    log.level === 'success' ? 'text-green-400' :
                    log.level === 'error' ? 'text-red-400' :
                    'text-blue-400'
                  }>
                    {log.level.toUpperCase()}
                  </span>
                  {' '}
                  <span className="text-surface-200">{log.message}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
