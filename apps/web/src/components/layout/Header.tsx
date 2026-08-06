'use client';

import React from 'react';
import { Search, ShieldAlert, Plus, Bell, Command, ChevronDown } from 'lucide-react';
import { MOCK_ORGANIZATIONS } from '@/lib/mockData';

interface HeaderProps {
  onOpenCommandPalette: () => void;
  onOpenNewScanModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCommandPalette,
  onOpenNewScanModal
}) => {
  const activeOrg = MOCK_ORGANIZATIONS[0];

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-[#1F1F24] bg-[#09090B]/90 px-6 backdrop-blur-md">
      {/* Left: Organization Switcher & Context */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2.5 rounded-lg border border-[#1F1F24] bg-[#0F0F12] px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-[#141418] transition-colors">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>{activeOrg.name}</span>
          <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
        </button>

        <div className="hidden md:flex items-center gap-2 text-xs text-zinc-500">
          <span>/</span>
          <span className="text-zinc-400 font-mono">Digital Forensics Engine v2.4</span>
        </div>
      </div>

      {/* Center/Right Actions */}
      <div className="flex items-center gap-3">
        {/* Global Search Bar Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="flex h-9 w-64 items-center justify-between rounded-lg border border-[#1F1F24] bg-[#0F0F12] px-3 text-xs text-zinc-400 hover:border-zinc-700 transition-all"
        >
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-zinc-500" />
            <span>Search artifacts, hashes, users...</span>
          </div>
          <kbd className="flex items-center gap-0.5 rounded border border-[#27272A] bg-[#18181B] px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
            <Command className="h-2.5 w-2.5" /> K
          </kbd>
        </button>

        {/* Generate Scan CTA */}
        <button
          onClick={onOpenNewScanModal}
          className="flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-white transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Scan Request</span>
        </button>

        {/* Notifications & User */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-[#1F1F24] bg-[#0F0F12] text-zinc-400 hover:text-zinc-200">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
        </button>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1F1F24] bg-[#18181B] text-xs font-semibold text-zinc-200 font-mono">
          VA
        </div>
      </div>
    </header>
  );
};
