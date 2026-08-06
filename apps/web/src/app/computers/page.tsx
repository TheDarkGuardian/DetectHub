'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Monitor, Cpu, HardDrive, Shield, CheckCircle } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function ComputersPage() {
  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white font-mono">Monitored Computers & Endpoints</h1>
        <p className="text-xs text-zinc-400 mt-1">Authorized hardware inventory registered across client organizations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-[#1F1F24] pb-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-white font-mono">
                <Monitor className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white font-mono">DESKTOP-VORTEX99</h3>
                <p className="text-[11px] text-zinc-400">User: VortexAdmin • IP: 192.168.1.142</p>
              </div>
            </div>
            <StatusBadge status="Flagged" severity="CRITICAL" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono text-zinc-300">
            <div><span className="text-zinc-500">OS:</span> Windows 11 Pro 23H2</div>
            <div><span className="text-zinc-500">CPU:</span> Ryzen 7 7800X3D</div>
            <div><span className="text-zinc-500">RAM:</span> 32GB DDR5</div>
            <div><span className="text-zinc-500">GPU:</span> RTX 4080 SUPER</div>
          </div>
        </div>

        <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-[#1F1F24] pb-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-white font-mono">
                <Monitor className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white font-mono">COMPETITOR-PC-01</h3>
                <p className="text-[11px] text-zinc-400">User: Player1 • IP: 192.168.1.189</p>
              </div>
            </div>
            <StatusBadge status="Clean" severity="SAFE" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono text-zinc-300">
            <div><span className="text-zinc-500">OS:</span> Windows 11 Enterprise</div>
            <div><span className="text-zinc-500">CPU:</span> i9-14900KS</div>
            <div><span className="text-zinc-500">RAM:</span> 64GB DDR5</div>
            <div><span className="text-zinc-500">GPU:</span> RTX 4090</div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
