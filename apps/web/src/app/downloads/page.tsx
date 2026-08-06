'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Download, Monitor, ShieldCheck, Cpu, Apple, Check, Copy, ExternalLink } from 'lucide-react';

export default function DownloadsPage() {
  const [detectedOs, setDetectedOs] = useState<'windows' | 'mac' | 'linux'>('windows');
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    // Detect OS automatically from user agent
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('mac')) {
      setDetectedOs('mac');
    } else if (userAgent.includes('linux')) {
      setDetectedOs('linux');
    } else {
      setDetectedOs('windows');
    }

    // Check for deep-link invite code parameter: ?code=DETECT-XXXX
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      setInviteCode(code);
    }
  }, []);

  const handleCopyCode = () => {
    if (inviteCode) {
      navigator.clipboard.writeText(inviteCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono">Download DetectHub Desktop Agent</h1>
          <p className="text-xs text-zinc-400 mt-1">Cross-platform digital forensics desktop scanner binary with automatic OS detection</p>
        </div>

        {/* Invite Code Token Auto-Pairing Banner */}
        {inviteCode && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white font-mono">Scan Invite Token Assigned</div>
                <div className="text-[11px] text-emerald-400 font-mono">Token: <span className="font-bold">{inviteCode}</span></div>
              </div>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30"
            >
              {copiedCode ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copiedCode ? 'Token Copied!' : 'Copy Token to Clipboard'}</span>
            </button>
          </div>
        )}

        {/* Main Auto-Detected OS Download Card */}
        <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-8 shadow-card max-w-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-950 font-bold">
                {detectedOs === 'mac' ? <Apple className="h-6 w-6" /> : <Monitor className="h-6 w-6" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white font-mono">
                    DetectHub Agent v2.4.0 ({detectedOs === 'mac' ? 'macOS Universal' : 'Windows x64'})
                  </h3>
                  <span className="rounded bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-400 font-bold uppercase">
                    Auto-Detected Your Device
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">Tauri v2 + Rust isolated scanner binary • SHA-256 Verified Signature</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs font-mono text-zinc-300">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>100% Consent-Based Forensic Collection (Zero Background Persistence / Hooks)</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <Cpu className="h-4 w-4" />
              <span>
                {detectedOs === 'mac'
                  ? 'Includes macOS Launchd Persistence, System Extensions, Kext, USB & Network Scanners'
                  : 'Includes Windows Registry, Drivers, Processes, Defender, USB & Security Event Log Scanners'}
              </span>
            </div>
          </div>

          {/* Primary Action Download Button */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href={`#download-${detectedOs}`}
              onClick={(e) => {
                e.preventDefault();
                alert(`Starting download for DetectHub Agent v2.4.0 (${detectedOs.toUpperCase()})`);
              }}
              className="flex items-center justify-center gap-2.5 rounded-xl bg-zinc-100 px-6 py-3.5 text-sm font-bold text-zinc-950 hover:bg-white transition-all shadow-glow"
            >
              <Download className="h-4 w-4" />
              <span>Download Agent for {detectedOs === 'mac' ? 'macOS (.dmg)' : 'Windows (.msi)'}</span>
            </a>

            <span className="text-[11px] text-zinc-500 font-mono">Size: ~14.2 MB • Code Signed</span>
          </div>
        </div>

        {/* All Operating System Installer Options */}
        <div className="space-y-3 max-w-3xl">
          <h3 className="text-sm font-semibold text-white font-mono">All Supported Operating Systems & Binaries</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            {/* Windows Option */}
            <div className={`rounded-xl border p-4 space-y-3 transition-all ${detectedOs === 'windows' ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-[#1F1F24] bg-[#0F0F12]'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Monitor className="h-4 w-4 text-blue-400" /> Windows
                </div>
                {detectedOs === 'windows' && <span className="text-[10px] text-emerald-400 font-bold">ACTIVE</span>}
              </div>
              <p className="text-[11px] text-zinc-400">Windows 10 / 11 (64-bit)</p>
              <button className="w-full rounded-lg border border-[#27272A] bg-[#18181B] py-1.5 text-xs text-zinc-200 hover:bg-[#27272A]">
                Download .msi
              </button>
            </div>

            {/* macOS Option */}
            <div className={`rounded-xl border p-4 space-y-3 transition-all ${detectedOs === 'mac' ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-[#1F1F24] bg-[#0F0F12]'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Apple className="h-4 w-4 text-zinc-300" /> macOS
                </div>
                {detectedOs === 'mac' && <span className="text-[10px] text-emerald-400 font-bold">ACTIVE</span>}
              </div>
              <p className="text-[11px] text-zinc-400">macOS 12+ (Apple Silicon & Intel)</p>
              <button className="w-full rounded-lg border border-[#27272A] bg-[#18181B] py-1.5 text-xs text-zinc-200 hover:bg-[#27272A]">
                Download .dmg
              </button>
            </div>

            {/* Linux Option */}
            <div className={`rounded-xl border p-4 space-y-3 transition-all ${detectedOs === 'linux' ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-[#1F1F24] bg-[#0F0F12]'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Cpu className="h-4 w-4 text-amber-400" /> Linux
                </div>
                {detectedOs === 'linux' && <span className="text-[10px] text-emerald-400 font-bold">ACTIVE</span>}
              </div>
              <p className="text-[11px] text-zinc-400">Ubuntu / Debian / Fedora x64</p>
              <button className="w-full rounded-lg border border-[#27272A] bg-[#18181B] py-1.5 text-xs text-zinc-200 hover:bg-[#27272A]">
                Download AppImage
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
