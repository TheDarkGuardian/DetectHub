'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { ForensicTimeline } from '@/components/timeline/ForensicTimeline';
import { MOCK_REPORTS } from '@/lib/mockData';

export default function TimelinePage() {
  const activeReport = MOCK_REPORTS[0] || null;

  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white font-mono">Interactive Forensic Timeline</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Chronological cross-artifact correlation for <span className="text-zinc-200 font-semibold">{activeReport?.targetUsername || 'Live Reports'}</span> ({activeReport?.id || 'RPT-2026'})
        </p>
      </div>

      <ForensicTimeline timeline={activeReport?.timeline || []} />
    </DashboardShell>
  );
}
