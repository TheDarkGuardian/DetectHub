'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Users } from 'lucide-react';

export default function UsersPage() {
  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white font-mono">User Profiles & Risk History</h1>
        <p className="text-xs text-zinc-400 mt-1">Cross-organization user directory and lifetime risk scores</p>
      </div>

      <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card">
        <div className="text-xs text-zinc-400 font-mono">
          2 Active Competitors Indexed (Vortex_FPS, ScreaM_AIM).
        </div>
      </div>
    </DashboardShell>
  );
}
