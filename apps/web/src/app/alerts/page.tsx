'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Bell, ShieldAlert } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function AlertsPage() {
  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white font-mono">Real-Time Anomaly Alerts</h1>
        <p className="text-xs text-zinc-400 mt-1">High-severity notifications dispatched via Discord Webhooks and Slack</p>
      </div>

      <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-3">
        <div className="flex items-center justify-between p-3 rounded-lg border border-[#1F1F24] bg-[#09090B] text-xs">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-4 w-4 text-rose-400" />
            <div>
              <div className="font-semibold text-white">Unsigned Driver 'memrw64.sys' Detected</div>
              <div className="text-[10px] text-zinc-500 font-mono">Target: Vortex_FPS (RPT-2026-8891)</div>
            </div>
          </div>
          <StatusBadge status="Flagged" severity="CRITICAL" />
        </div>
      </div>
    </DashboardShell>
  );
}
