'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Settings, Shield, Lock, Bell, UserCheck } from 'lucide-react';

export default function SettingsPage() {
  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white font-mono">Platform Security & Audit Settings</h1>
        <p className="text-xs text-zinc-400 mt-1">Configure multi-factor authentication, audit logging retention, and notification routing</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-4">
          <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
            <Lock className="h-4 w-4 text-emerald-400" /> Two-Factor Authentication (2FA)
          </h3>
          <p className="text-xs text-zinc-400">Enforce TOTP / WebAuthn security keys for administrative access.</p>
          <button className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-white">
            Configure 2FA
          </button>
        </div>

        <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-4">
          <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-400" /> Audit Log Stream
          </h3>
          <div className="space-y-2 font-mono text-xs text-zinc-400">
            <div className="flex items-center justify-between p-2.5 rounded bg-[#09090B] border border-[#1F1F24]">
              <span>[2026-08-06 16:45] VortexAdmin exported PDF report payload RPT-2026-8891</span>
              <span className="text-zinc-500 font-bold">192.168.1.142</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded bg-[#09090B] border border-[#1F1F24]">
              <span>[2026-08-06 16:30] Updated Risk Engine score weight rule-1 (Unsigned Driver +40)</span>
              <span className="text-zinc-500 font-bold">192.168.1.142</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
