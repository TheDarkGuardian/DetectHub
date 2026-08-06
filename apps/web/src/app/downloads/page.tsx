'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Download, Monitor, ShieldCheck, Cpu } from 'lucide-react';

export default function DownloadsPage() {
  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white font-mono">DetectHub Windows Desktop Agent</h1>
        <p className="text-xs text-zinc-400 mt-1">Download official desktop forensic scanner binaries for Windows 10/11 x64</p>
      </div>

      <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-8 shadow-card max-w-2xl space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-950 font-bold">
            <Monitor className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-mono">DetectHub Agent v2.4.0 (Windows x64)</h3>
            <p className="text-xs text-zinc-400">Tauri v2 + Rust isolated scanner binary • Code Signed SHA-256</p>
          </div>
        </div>

        <div className="space-y-2 text-xs font-mono text-zinc-300">
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span>100% Consent-Based Forensic Collection (No Malware/Hooks/Anti-Cheat Persistence)</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <Cpu className="h-4 w-4" />
            <span>Includes USB, Driver, Process, Registry, Event Log, Network & VM Scanners</span>
          </div>
        </div>

        <div className="pt-2">
          <button className="flex items-center gap-2 rounded-xl bg-zinc-100 px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-white transition-colors">
            <Download className="h-4 w-4" />
            <span>Download DetectHub Setup (.msi)</span>
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}
