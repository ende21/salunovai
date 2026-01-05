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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const modelOptions: SelectOption[] = [
    { label: 'GLM-4.6', value: 'glm-4.6' },
    { label: 'GLM-4.6V', value: 'glm-4.6v' },
    { label: 'GLM-4.5', value: 'glm-4.5' },
  ];
  const [selectedModel, setSelectedModel] = useState(modelOptions[0].value);
  
  // Kirim pesan ke API agent
  const sendMessage = async () => {
    if (!inputValue.trim()) return;
    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((msgs) => [...msgs, userMsg]);
    setInputValue("");
    setLoading(true);
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMsg.content })
      });
      const data = await res.json();
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.result || data.error || "(No response)",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((msgs) => [...msgs, aiMsg]);
    } catch (err: any) {
      setMessages((msgs) => [...msgs, {
        id: Date.now() + 2,
        role: 'assistant',
        content: "Terjadi error: " + (err?.message || err),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!loading) sendMessage();
    }
  };

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
          <a href="/" className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100 px-3 py-1.5 text-sm transition-all duration-200">
            &larr; Back to Dashboard
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
                onKeyDown={handleInputKeyDown}
                disabled={loading}
              />
            </div>
            
            <Button size="lg" className="h-12" onClick={sendMessage} disabled={loading || !inputValue.trim()}>
              {loading ? "Loading..." : <Send size={20} />}
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