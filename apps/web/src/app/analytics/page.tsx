'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { BarChart3, TrendingUp, Cpu, ShieldAlert, Activity } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const TOP_DRIVERS_DATA = [
  { name: 'nvlddmkm.sys', count: 98, status: 'Clean' },
  { name: 'e2fexpress.sys', count: 84, status: 'Clean' },
  { name: 'memrw64.sys', count: 4, status: 'Flagged' },
  { name: 'vboxdrv.sys', count: 12, status: 'Review' },
];

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white font-mono">Platform Analytics & Intelligence</h1>
        <p className="text-xs text-zinc-400 mt-1">Aggregated telemetry trends, most common drivers, application distributions and risk metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-4">
          <h3 className="text-sm font-semibold text-white font-mono">Most Frequently Loaded Drivers</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TOP_DRIVERS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#52525B" fontSize={11} />
                <YAxis stroke="#52525B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#09090B', borderColor: '#27272A', fontSize: '12px' }} />
                <Bar dataKey="count" fill="#FAFAFA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-4">
          <h3 className="text-sm font-semibold text-white font-mono">Top Suspicious Anomaly Types</h3>
          <div className="space-y-3 text-xs font-mono">
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#09090B] border border-[#1F1F24]">
              <span className="text-zinc-200">Unsigned Kernel Drivers</span>
              <span className="text-rose-400 font-bold">42.8%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#09090B] border border-[#1F1F24]">
              <span className="text-zinc-200">Cheat Engine Executables</span>
              <span className="text-rose-400 font-bold">31.2%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#09090B] border border-[#1F1F24]">
              <span className="text-zinc-200">Windows Defender Disabled</span>
              <span className="text-amber-400 font-bold">18.0%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#09090B] border border-[#1F1F24]">
              <span className="text-zinc-200">VM Hypervisor Indicators</span>
              <span className="text-blue-400 font-bold">8.0%</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
