import React from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Bot, 
  MessageSquare, 
  Settings,
  Shield,
  Users,
  Activity,
  CreditCard,
  Key,
  Cog
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

function NavItem({ icon, label, to, active }: NavItemProps) {
  return (
    <Link
      href={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] transition-all duration-200 ${
        active
          ? 'bg-primary-600 text-white shadow-md'
          : 'text-surface-700 hover:bg-surface-100'
      }`}
    >
      <span className="w-5 h-5">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

interface SidebarProps {
  isAdmin?: boolean;
}

export function Sidebar({ isAdmin = false }: SidebarProps) {
  const pathname = usePathname();
  
  const userNavItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', to: '/' },
    { icon: <FolderKanban size={20} />, label: 'Projects', to: '/projects' },
    // { icon: <Bot size={20} />, label: 'Agent Management', to: '/agents' }, // disembunyikan
    { icon: <MessageSquare size={20} />, label: 'Chat', to: '/chat' },
    { icon: <Settings size={20} />, label: 'Settings', to: '/settings' },
  ];
  
  const adminNavItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', to: '/admin' },
    { icon: <Users size={20} />, label: 'User Management', to: '/admin/users' },
    { icon: <Bot size={20} />, label: 'AI Agents', to: '/admin/agents' },
    { icon: <Activity size={20} />, label: 'Logs & Monitoring', to: '/admin/logs' },
    { icon: <CreditCard size={20} />, label: 'Billing', to: '/admin/billing' },
    { icon: <Key size={20} />, label: 'API & Keys', to: '/admin/api-keys' },
    { icon: <Cog size={20} />, label: 'System Settings', to: '/admin/settings' },
  ];
  
  const navItems = isAdmin ? adminNavItems : userNavItems;
  
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-surface-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-surface-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[var(--radius-md)] bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
            <Bot className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-surface-900">AI Agent</h2>
            <p className="text-xs text-surface-500">{isAdmin ? 'Admin Panel' : 'Platform'}</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            icon={item.icon}
            label={item.label}
            to={item.to}
            active={pathname === item.to}
          />
        ))}
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-surface-200">
        <div className="text-xs text-surface-500 text-center">
          v1.0.0 {isAdmin ? '• Admin' : ''}
        </div>
      </div>
    </aside>
  );
}
