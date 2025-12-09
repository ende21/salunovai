"use client";
import React, { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Send, Paperclip, Bot, User } from 'lucide-react';
import { Select, SelectItem, SelectContent } from '../../components/ui/select';

type SelectOption = {
  label: string;
  value: string;
};

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function ChatPage() {
  const [messages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      role: 'user',
      content: 'Can you help me analyze the customer feedback data from last month?',
      timestamp: '10:31 AM'
    },
    {
      id: 3,
      role: 'assistant',
      content: "Of course! I'd be happy to help you analyze the customer feedback data. To provide you with the most accurate analysis, could you please share the data file or let me know where I can access it? I can help you identify trends, sentiment analysis, common themes, and actionable insights.",
      timestamp: '10:31 AM'
    },
    {
      id: 4,
      role: 'user',
      content: 'The data is in our analytics dashboard. Can you access it directly?',
      timestamp: '10:32 AM'
    },
    {
      id: 5,
      role: 'assistant',
      content: 'Yes, I have access to your analytics dashboard. Let me retrieve the customer feedback data from last month and perform a comprehensive analysis. This will take just a moment...',
      timestamp: '10:32 AM'
    },
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const modelOptions: SelectOption[] = [
    { label: 'GLM-4.6', value: 'glm-4.6' },
    { label: 'GLM-4.6V', value: 'glm-4.6v' },
    { label: 'GLM-4.5', value: 'glm-4.5' },
  ];
  const [selectedModel, setSelectedModel] = useState(modelOptions[0].value);
  
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-surface-900 mb-2">Chat Interface</h1>
            <p className="text-surface-600">Interact with your AI agents in real-time</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-surface-600 mr-2">Model:</span>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectContent>
                {modelOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Back to Dashboard button */}
        <div className="mt-2">
          <a href="/dashboard">
            <Button variant="outline" size="sm">
              &larr; Back to Dashboard
            </Button>
          </a>
        </div>
      </div>
      {/* Chat Container */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user' 
                  ? 'bg-gradient-to-br from-primary-500 to-primary-600' 
                  : 'bg-gradient-to-br from-secondary-500 to-secondary-600'
              }`}>
                {message.role === 'user' ? (
                  <User size={20} className="text-white" />
                ) : (
                  <Bot size={20} className="text-white" />
                )}
              </div>
              
              {/* Message Content */}
              <div className={`flex-1 max-w-2xl ${message.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`rounded-[var(--radius-lg)] px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-surface-100 text-surface-900'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                <span className="text-xs text-surface-500 mt-1 px-1">{message.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Input Area */}
        <div className="border-t border-surface-200 p-4 bg-white">
          <div className="flex items-end gap-3">
            <button className="p-3 text-surface-600 hover:text-surface-900 hover:bg-surface-100 rounded-[var(--radius-md)] transition-all">
              <Paperclip size={20} />
            </button>
            
            <div className="flex-1">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                rows={1}
                className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    // Handle send message
                  }
                }}
              />
            </div>
            
            <Button size="lg" className="h-12">
              <Send size={20} />
            </Button>
          </div>
          
          <div className="mt-2 text-xs text-surface-500 px-1">
            Press Enter to send, Shift+Enter for new line
          </div>
        </div>
      </Card>
    </div>
  );
}