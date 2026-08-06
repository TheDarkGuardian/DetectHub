'use client';

import React, { useEffect, useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Download, Monitor, ShieldCheck, Cpu, Apple, Check, Copy, ExternalLink } from 'lucide-react';

export default function DownloadsPage() {
  const [downloadLink, setDownloadLink] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const origin = window.location.origin;
    setDownloadLink(`${origin}/scan/DETECT-8921-X992`);
  }, []);

  const handleCopyLink = () => {
    if (downloadLink) {
      navigator.clipboard.writeText(downloadLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono">Agent Release Binaries & Download Links</h1>
          <p className="text-xs text-zinc-400 mt-1">Generate dynamic invitation links for tournament participants and manage release packages</p>
        </div>

        {/* Generate Link Banner for Admin */}
        <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-6 shadow-card max-w-3xl space-y-4">
          <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
            <ExternalLink className="h-4 w-4 text-emerald-400" /> Shareable Target Invite & Download Link
          </h3>
          <p className="text-xs text-zinc-400">
            Send this public link to the user needing verification. When opened, it automatically detects their operating system (macOS or Windows), presents the exact binary, and pre-fills their scan token.
          </p>

          <div className="flex items-center gap-3">
            <input
              type="text"
              readOnly
              value={downloadLink}
              className="flex-1 rounded-lg border border-[#27272A] bg-[#09090B] px-3 py-2 text-xs text-emerald-400 font-mono"
            />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 rounded-lg bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-white transition-colors"
            >
              {copiedLink ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* Binary Repository Section for Admin */}
        <div className="space-y-3 max-w-3xl">
          <h3 className="text-sm font-semibold text-white font-mono">Official Agent Installer Binaries (v2.4.0)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            {/* Windows Package */}
            <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Monitor className="h-5 w-5 text-blue-400" /> Windows Desktop Agent
                </div>
                <span className="text-[10px] text-zinc-500 font-bold">v2.4.0</span>
              </div>
              <p className="text-[11px] text-zinc-400">Windows 10 / 11 (64-bit installer)</p>
              <button className="w-full rounded-lg border border-[#27272A] bg-[#18181B] py-2 text-xs text-zinc-200 hover:bg-[#27272A] flex items-center justify-center gap-2">
                <Download className="h-4 w-4" /> Download .msi Installer
              </button>
            </div>

            {/* macOS Package */}
            <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Apple className="h-5 w-5 text-zinc-200" /> macOS Desktop Agent
                </div>
                <span className="text-[10px] text-zinc-500 font-bold">v2.4.0</span>
              </div>
              <p className="text-[11px] text-zinc-400">macOS 12+ (Universal Apple Silicon & Intel)</p>
              <button className="w-full rounded-lg border border-[#27272A] bg-[#18181B] py-2 text-xs text-zinc-200 hover:bg-[#27272A] flex items-center justify-center gap-2">
                <Download className="h-4 w-4" /> Download .dmg Package
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
