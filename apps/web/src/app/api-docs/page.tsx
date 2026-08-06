'use client';

import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Code2, Key, Copy, Terminal, ExternalLink } from 'lucide-react';

export default function ApiDocsPage() {
  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white font-mono">REST API & Webhook Developer Portal</h1>
        <p className="text-xs text-zinc-400 mt-1">Integrate DetectHub automated digital forensics into custom tournament portals and anti-cheat webhooks</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-4">
          <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
            <Key className="h-4 w-4 text-emerald-400" /> API Tokens
          </h3>
          <div className="space-y-2 text-xs font-mono">
            <div className="rounded-lg border border-[#27272A] bg-[#09090B] p-3 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase">Production Secret Key</span>
              <div className="text-emerald-400 font-bold">dh_live_99218491028491029841</div>
            </div>
            <button className="w-full rounded-lg bg-zinc-100 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-white">
              Roll New API Key
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-4">
          <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
            <Terminal className="h-4 w-4 text-blue-400" /> cURL Request Example
          </h3>

          <pre className="rounded-lg border border-[#1F1F24] bg-[#09090B] p-4 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
{`curl -X POST https://api.detecthub.io/v1/scan-requests \\
  -H "Authorization: Bearer dh_live_99218491028491029841" \\
  -H "Content-Type: application/json" \\
  -d '{
    "targetUsername": "Vortex_FPS",
    "type": "ONE_TIME",
    "expiresInSeconds": 3600
  }'`}
          </pre>
        </div>
      </div>
    </DashboardShell>
  );
}
