'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { CommandPalette } from './CommandPalette';
import { QrCode, X, Copy, Check, ExternalLink, RefreshCw } from 'lucide-react';

export const DashboardShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNewScanModalOpen, setIsNewScanModalOpen] = useState(false);
  const [currentInviteCode, setCurrentInviteCode] = useState<string>('');
  const [targetUsernameInput, setTargetUsernameInput] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNewScanRequest = async (target?: string) => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/v1/scan/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUser: target || targetUsernameInput || 'Fnatic Tournament Player' })
      });
      const data = await res.json();
      if (data.success && data.scanRequest) {
        setCurrentInviteCode(data.scanRequest.code);
      } else {
        // Fallback unique generator
        const randomCode = `DETECT-${Math.floor(1000 + Math.random() * 9000)}-X${Math.floor(100 + Math.random() * 900)}`;
        setCurrentInviteCode(randomCode);
      }
    } catch {
      const randomCode = `DETECT-${Math.floor(1000 + Math.random() * 9000)}-X${Math.floor(100 + Math.random() * 900)}`;
      setCurrentInviteCode(randomCode);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOpenScanModal = () => {
    setIsNewScanModalOpen(true);
    generateNewScanRequest();
  };

  const handleCopyCode = () => {
    if (currentInviteCode) {
      navigator.clipboard.writeText(currentInviteCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const currentDeepLink = typeof window !== 'undefined' ? `${window.location.origin}/downloads?code=${currentInviteCode}` : `https://detecthub.io/downloads?code=${currentInviteCode}`;

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex">
      <Sidebar />

      <div className="flex-1 pl-60 flex flex-col min-w-0">
        <Header
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenNewScanModal={handleOpenScanModal}
        />

        <main className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* Dynamic New Scan Request Modal */}
      {isNewScanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-[#27272A] bg-[#0F0F12] p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1F1F24] pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-emerald-400" />
                <h3 className="text-base font-semibold text-white">Generate Unique Scan Request</h3>
              </div>
              <button onClick={() => setIsNewScanModalOpen(false)} className="text-zinc-500 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-zinc-400 font-mono text-[10px] uppercase">Target Player / Host (Optional)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={targetUsernameInput}
                    onChange={(e) => setTargetUsernameInput(e.target.value)}
                    placeholder="e.g. Vortex_FPS"
                    className="flex-1 rounded-lg border border-[#27272A] bg-[#09090B] px-3 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-zinc-500"
                  />
                  <button
                    onClick={() => generateNewScanRequest(targetUsernameInput)}
                    disabled={isGenerating}
                    className="flex items-center gap-1 rounded-lg border border-[#27272A] bg-[#18181B] px-3 py-2 text-xs text-zinc-200 hover:bg-[#27272A]"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                    <span>Regenerate</span>
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 font-mono text-[10px] uppercase">Generated Invite Code Token</label>
                <div className="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-[#09090B] px-3 py-2.5 font-mono text-sm text-emerald-400 font-bold">
                  <span>{currentInviteCode || 'Generating...'}</span>
                  <button onClick={handleCopyCode} className="text-zinc-400 hover:text-white">
                    {copiedCode ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 font-mono text-[10px] uppercase">Auto OS-Detect Download Link</label>
                <div className="flex items-center justify-between rounded-lg border border-[#27272A] bg-[#09090B] px-3 py-2 text-zinc-300 font-mono text-[11px] truncate">
                  <span className="truncate">{currentDeepLink}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(currentDeepLink);
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 2000);
                    }}
                    className="ml-2 text-zinc-400 hover:text-white shrink-0"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsNewScanModalOpen(false)}
                className="rounded-lg bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-white transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
