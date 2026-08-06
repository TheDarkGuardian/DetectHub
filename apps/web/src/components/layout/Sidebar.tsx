'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Monitor,
  QrCode,
  Users,
  Building2,
  Clock,
  Bell,
  BarChart3,
  Sliders,
  Download,
  Code2,
  Settings,
  Shield,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Reports', href: '/reports', icon: FileText, badge: '2 Flagged' },
  { label: 'Computers', href: '/computers', icon: Monitor },
  { label: 'Scans', href: '/scans', icon: QrCode },
  { label: 'Users', href: '/users', icon: Users },
  { label: 'Organizations', href: '/organizations', icon: Building2 },
  { label: 'Timeline', href: '/timeline', icon: Clock },
  { label: 'Alerts', href: '/alerts', icon: Bell, badge: 'Live' },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Rules', href: '/rules', icon: Sliders },
  { label: 'Downloads', href: '/downloads', icon: Download },
  { label: 'API', href: '/api-docs', icon: Code2 },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-[#1F1F24] bg-[#09090B] px-3 py-4 text-zinc-300">
      {/* Brand Header */}
      <div className="mb-6 flex items-center gap-3 px-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-950 font-extrabold tracking-tighter">
          <Shield className="h-4 w-4 fill-zinc-950" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight text-white font-mono">DetectHub</span>
          <span className="text-[10px] tracking-wider uppercase text-zinc-500 font-medium">Digital Forensics</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (pathname === '/' && item.href === '/dashboard') || (pathname.startsWith(item.href) && item.href !== '/dashboard');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all",
                isActive
                  ? "bg-[#18181B] text-white border border-[#27272A]"
                  : "text-zinc-400 hover:bg-[#0F0F12] hover:text-zinc-200"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn("h-4 w-4 transition-colors", isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300")} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5 text-[10px] font-semibold font-mono",
                    item.badge === 'Live' ? "bg-rose-950/60 text-rose-400 border border-rose-500/20" : "bg-zinc-800 text-zinc-300"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer System Status */}
      <div className="mt-auto border-t border-[#1F1F24] pt-3 px-3">
        <div className="flex items-center justify-between text-[11px] text-zinc-500">
          <div className="flex items-center gap-1.5">
            <Activity className="h-3 w-3 text-emerald-400 animate-pulse" />
            <span>Engine Active</span>
          </div>
          <span className="font-mono text-[10px] text-zinc-600">v2.4.0</span>
        </div>
      </div>
    </aside>
  );
};
