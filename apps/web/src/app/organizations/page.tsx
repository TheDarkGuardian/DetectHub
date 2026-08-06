'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Building2, Users, Key, Webhook, Palette, ShieldCheck, Plus } from 'lucide-react';
import { MOCK_ORGANIZATIONS } from '@/lib/mockData';

export default function OrganizationsPage() {
  const activeOrg = MOCK_ORGANIZATIONS[0];

  return (
    <DashboardShell>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono">Organization Management</h1>
          <p className="text-xs text-zinc-400 mt-1">Multi-tenant RBAC permissions, custom branding, Discord webhooks & API keys</p>
        </div>

        <button className="flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-2 text-xs font-semibold text-zinc-950 hover:bg-white transition-colors">
          <Plus className="h-4 w-4" />
          <span>Create Organization</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Branding & Overview */}
        <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-4">
          <div className="flex items-center gap-3 border-b border-[#1F1F24] pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 font-bold font-mono text-base">
              FN
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white font-mono">{activeOrg.name}</h3>
              <p className="text-[11px] text-zinc-500 font-mono">Slug: {activeOrg.slug}</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="text-zinc-500 font-mono text-[10px] uppercase">Custom Primary Brand Accent</label>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded border border-zinc-700 bg-emerald-500" />
                <span className="font-mono text-zinc-300">#22C55E (Safe Accent)</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-zinc-500 font-mono text-[10px] uppercase">Discord Webhook Integration</label>
              <input
                type="text"
                readOnly
                value="https://discord.com/api/webhooks/12093849102/detecthub-alerts"
                className="w-full rounded border border-[#27272A] bg-[#09090B] px-3 py-1.5 text-xs text-zinc-400 font-mono truncate"
              />
            </div>
          </div>
        </div>

        {/* Right: Members & API Keys */}
        <div className="lg:col-span-2 rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-[#1F1F24] pb-3">
            <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
              <Users className="h-4 w-4 text-zinc-400" />
              Organization Members & Roles
            </h3>
            <button className="text-xs text-zinc-400 hover:text-white font-mono">+ Invite Member</button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg border border-[#1F1F24] bg-[#09090B]">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#18181B] font-mono text-zinc-300 font-bold">
                  VA
                </div>
                <div>
                  <div className="font-semibold text-white">VortexAdmin (Owner)</div>
                  <div className="text-[10px] text-zinc-500">vortex@fnatic.com</div>
                </div>
              </div>
              <span className="rounded bg-emerald-950/60 px-2 py-0.5 text-[10px] font-mono text-emerald-400 border border-emerald-500/20 uppercase font-bold">
                OWNER
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-[#1F1F24] bg-[#09090B]">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#18181B] font-mono text-zinc-300 font-bold">
                  SC
                </div>
                <div>
                  <div className="font-semibold text-white">ScreaM_AIM (Analyst)</div>
                  <div className="text-[10px] text-zinc-500">scream@fnatic.com</div>
                </div>
              </div>
              <span className="rounded bg-blue-950/60 px-2 py-0.5 text-[10px] font-mono text-blue-400 border border-blue-500/20 uppercase font-bold">
                ANALYST
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
