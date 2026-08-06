'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { QrCode, Copy, Plus, Check, Link as LinkIcon, RefreshCw } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function ScansPage() {
  const [activeScans, setActiveScans] = useState([
    { id: 'SCN-101', code: 'DETECT-8921-X992', target: 'Vortex_FPS', type: 'ONE_TIME', status: 'PENDING', created: '2026-08-06 16:40' },
    { id: 'SCN-102', code: 'DETECT-PERM-FNATIC', target: 'Fnatic Tournament Lobby', type: 'PERMANENT', status: 'COMPLETED', created: '2026-08-06 12:00' },
  ]);

  return (
    <DashboardShell>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono">Scan Requests & Pairing Links</h1>
          <p className="text-xs text-zinc-400 mt-1">Issue invite tokens, permanent scan URLs, and QR code access credentials for Windows Desktop Agent</p>
        </div>

        <button className="flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-2 text-xs font-semibold text-zinc-950 hover:bg-white transition-colors">
          <Plus className="h-4 w-4" />
          <span>New Invite Code</span>
        </button>
      </div>

      <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#1F1F24] bg-[#09090B] font-mono text-[10px] uppercase text-zinc-500">
              <tr>
                <th className="py-3 px-3">Scan ID</th>
                <th className="py-3 px-3">Invite Token Code</th>
                <th className="py-3 px-3">Target / Scope</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Created</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F1F24]">
              {activeScans.map((scan) => (
                <tr key={scan.id} className="hover:bg-[#141418]">
                  <td className="py-3 px-3 font-mono font-bold text-zinc-300">{scan.id}</td>
                  <td className="py-3 px-3 font-mono text-emerald-400 font-semibold">{scan.code}</td>
                  <td className="py-3 px-3 text-zinc-200">{scan.target}</td>
                  <td className="py-3 px-3 font-mono text-[11px] text-zinc-400">{scan.type}</td>
                  <td className="py-3 px-3"><StatusBadge status={scan.status as any} /></td>
                  <td className="py-3 px-3 font-mono text-zinc-400">{scan.created}</td>
                  <td className="py-3 px-3 text-right">
                    <button className="rounded border border-[#27272A] bg-[#18181B] px-2.5 py-1 text-[11px] font-medium text-zinc-300 hover:bg-[#27272A]">
                      Copy Link
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
