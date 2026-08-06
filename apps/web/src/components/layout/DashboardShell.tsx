'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { CommandPalette } from './CommandPalette';
import { QrCode, X, Copy, Check, Download, ExternalLink } from 'lucide-react';

export const DashboardShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNewScanModalOpen, setIsNewScanModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const sampleInviteCode = "DETECT-8921-X992";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleInviteCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 pl-60 flex flex-col min-w-0">
        <Header
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenNewScanModal={() => setIsNewScanModalOpen(true)}
        />

        <main className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* New Scan Request Modal */}
      {isNewScanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-[#27272A] bg-[#0F0F12] p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1F1F24] pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-emerald-400" />
                <h3 className="text-base font-semibold text-white">Generate Scan Request</h3>
              </div>
              <button onClick={() => setIsNewScanModalOpen(false)} className="text-zinc-500 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-zinc-400 font-mono text-[10px] uppercase">One-Time Invite Code</label>
                <div className="flex items-center justify-between rounded-lg border border-[#27272A] bg-[#09090B] px-3 py-2 font-mono text-sm text-emerald-400">
                  <span>{sampleInviteCode}</span>
                  <button onClick={handleCopyCode} className="text-zinc-400 hover:text-white">
                    {copiedCode ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-center p-4 rounded-lg border border-[#1F1F24] bg-white">
                {/* SVG QR Code Mock */}
                <div className="text-center font-mono text-[10px] text-zinc-950 font-bold">
                  [ QR Code Preview - Scan via DetectHub Agent ]
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 font-mono text-[10px] uppercase">Permanent Link</label>
                <div className="flex items-center justify-between rounded-lg border border-[#27272A] bg-[#09090B] px-3 py-2 text-zinc-400 font-mono text-xs truncate">
                  <span>https://detecthub.io/scan/fnatic-esports/{sampleInviteCode}</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
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
