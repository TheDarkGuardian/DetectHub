'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Shield, Download, Monitor, Apple, Check, Cpu, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PublicScanPage() {
  const params = useParams();
  const codeParam = (params.code as string) || 'DETECT-8921-X992';

  const [detectedOs, setDetectedOs] = useState<'windows' | 'mac' | 'linux'>('windows');
  const [copied, setCopied] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);

  useEffect(() => {
    // Detect OS of the TARGET USER visiting this link
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('mac')) {
      setDetectedOs('mac');
    } else if (userAgent.includes('linux')) {
      setDetectedOs('linux');
    } else {
      setDetectedOs('windows');
    }
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeParam);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setDownloadStarted(true);
    // Trigger real native desktop app installer download from backend API endpoint
    const downloadUrl = `/api/v1/download/agent?os=${detectedOs}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = detectedOs === 'mac' ? 'DetectHub-Agent-v2.4.0.dmg' : 'DetectHub-Agent-v2.4.0-Setup.exe';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col items-center justify-center p-4 selection:bg-zinc-800 selection:text-white">
      {/* Background Subtle Ambient Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative w-full max-w-xl rounded-2xl border border-[#1F1F24] bg-[#0F0F12] p-8 shadow-2xl space-y-8 backdrop-blur-xl">
        {/* Header Branding */}
        <div className="flex items-center justify-between border-b border-[#1F1F24] pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-950 font-extrabold">
              <Shield className="h-5 w-5 fill-zinc-950" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white font-mono">DetectHub Integrity Portal</h1>
              <p className="text-xs text-zinc-400">Transparent Endpoint Telemetry & PC Verification</p>
            </div>
          </div>

          <span className="rounded-full bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 text-[11px] font-mono text-emerald-400 font-bold uppercase">
            Official Invite
          </span>
        </div>

        {/* Invite Context Banner */}
        <div className="rounded-xl border border-[#27272A] bg-[#09090B] p-5 space-y-3">
          <div className="text-xs text-zinc-400 font-mono">
            You have been requested to perform a computer integrity scan by <span className="text-white font-semibold">Fnatic Esports Operations</span>.
          </div>

          <div className="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-3 font-mono">
            <div>
              <span className="text-[10px] uppercase text-zinc-500 block">Your Assigned Pairing Token</span>
              <span className="text-base font-bold text-emerald-400">{codeParam}</span>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30 transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : null}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
        </div>

        {/* Auto OS Detection & Download Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400 flex items-center gap-2">
              Auto-Detected Operating System:
            </span>
            <span className="text-white font-bold uppercase flex items-center gap-1.5">
              {detectedOs === 'mac' ? <Apple className="h-4 w-4 text-zinc-200" /> : <Monitor className="h-4 w-4 text-blue-400" />}
              {detectedOs === 'mac' ? 'macOS (Apple Silicon / Intel)' : 'Windows 10/11 x64'}
            </span>
          </div>

          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-3 rounded-xl bg-zinc-100 py-4 text-sm font-bold text-zinc-950 hover:bg-white transition-all shadow-glow hover:scale-[1.01] active:scale-[0.99]"
          >
            <Download className="h-5 w-5" />
            <span>
              Download DetectHub Desktop Agent for {detectedOs === 'mac' ? 'macOS (.dmg App Bundle)' : 'Windows (.exe Setup Installer)'}
            </span>
          </button>

          {detectedOs === 'mac' && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 text-xs text-amber-200 font-mono space-y-2 text-left">
              <div className="font-bold flex items-center gap-1.5 text-amber-400">
                <span>💡 Mac Kullanıcıları İçin Güvenlik İzni (1 Kezlik Adım):</span>
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                Mac bilgisayarınızda uyarı alırsanız <strong>Sistem Ayarları &gt; Gizlilik ve Güvenlik (System Settings &gt; Privacy &amp; Security)</strong> menüsüne gidin ve en alttaki <u className="text-white font-bold font-mono">"Yine de Aç" (Open Anyway)</u> butonuna tıklayın.
              </p>
            </div>
          )}

          <div className="text-center text-[11px] text-zinc-500 font-mono">
            Version 2.4.0 • Desktop Application Package • Code Signed SHA-256
          </div>
        </div>

        {/* How it works steps for target player */}
        <div className="border-t border-[#1F1F24] pt-6 space-y-3">
          <h3 className="text-xs font-semibold text-white font-mono uppercase tracking-wider">3-Step Verification Guide</h3>
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono">
            <div className="rounded-lg border border-[#1F1F24] bg-[#09090B] p-2.5 space-y-1">
              <span className="text-emerald-400 font-bold">1. Download</span>
              <p className="text-zinc-400 text-[10px]">Install agent for your OS</p>
            </div>
            <div className="rounded-lg border border-[#1F1F24] bg-[#09090B] p-2.5 space-y-1">
              <span className="text-emerald-400 font-bold">2. Paste Code</span>
              <p className="text-zinc-400 text-[10px]">Enter token ({codeParam})</p>
            </div>
            <div className="rounded-lg border border-[#1F1F24] bg-[#09090B] p-2.5 space-y-1">
              <span className="text-emerald-400 font-bold">3. Start Scan</span>
              <p className="text-zinc-400 text-[10px]">Consented scan & upload</p>
            </div>
          </div>
        </div>

        {/* Zero-Malware Commitment Disclaimer */}
        <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 font-mono text-center">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
          <span>100% Transparent Telemetry. No Malware, Spyware, or Persistence Drivers.</span>
        </div>
      </div>
    </div>
  );
}
