"use client";
import { Layout } from "../components/layout/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Activity, Bot, Clock, TrendingUp, Plus } from "lucide-react";
import { Badge } from "../components/ui/badge";
import Link from "next/link";

export default function Home() {
  const metrics = [
    { label: "Active Agents", value: "12", icon: <Bot size={24} />, trend: "+3 this week", color: "from-primary-500 to-primary-600" },
    { label: "Total Interactions", value: "2,847", icon: <Activity size={24} />, trend: "+12% from last month", color: "from-secondary-500 to-secondary-600" },
    { label: "Avg Response Time", value: "1.2s", icon: <Clock size={24} />, trend: "0.3s faster", color: "from-green-500 to-green-600" },
    { label: "Success Rate", value: "98.5%", icon: <TrendingUp size={24} />, trend: "+2.1% improvement", color: "from-purple-500 to-purple-600" },
  ];
  const recentActivities = [
    { id: 1, agent: "Customer Support Bot", action: "Completed 45 conversations", time: "2 minutes ago", status: "success" },
    { id: 2, agent: "Data Analysis Agent", action: "Generated monthly report", time: "15 minutes ago", status: "success" },
    { id: 3, agent: "Email Assistant", action: "Processed 128 emails", time: "1 hour ago", status: "success" },
    { id: 4, agent: "Code Review Bot", action: "Reviewed 8 pull requests", time: "2 hours ago", status: "warning" },
    { id: 5, agent: "Content Writer", action: "Created 3 blog drafts", time: "3 hours ago", status: "success" },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-surface-900 mb-2">Dashboard</h1>
            <p className="text-surface-600">Welcome back! Here&apos;s what&apos;s happening with your AI agents.</p>
          </div>
          <Link href="/agent-management">
            <Button size="lg">
              <Plus size={20} />
              Create Agent
            </Button>
          </Link>
        </div>
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => (
            <Card key={idx} className={`bg-gradient-to-br ${metric.color}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {metric.icon}
                  {metric.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <Badge>{metric.trend}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Recent Activities */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <ul className="space-y-2">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="flex items-center justify-between p-4 bg-white rounded shadow">
                <span>{activity.agent}</span>
                <span>{activity.action}</span>
                <span className="text-xs text-gray-500">{activity.time}</span>
                <Badge variant={activity.status === "success" ? "success" : "warning"}>{activity.status}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}