'use client';

import React, { useEffect, useState } from 'react';
import { Search, FileText, ShieldAlert, Cpu, Hash, Terminal, X, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MOCK_REPORTS } from '@/lib/mockData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredReports = MOCK_REPORTS.filter(
    (r) =>
      r.targetUsername.toLowerCase().includes(query.toLowerCase()) ||
      r.id.toLowerCase().includes(query.toLowerCase()) ||
      r.pcName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-xl overflow-hidden rounded-xl border border-[#27272A] bg-[#0F0F12] shadow-2xl transition-all">
        {/* Input Bar */}
        <div className="flex items-center border-b border-[#1F1F24] px-4 py-3">
          <Search className="mr-3 h-4 w-4 text-zinc-500 shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reports, users, file hashes, driver sys files..."
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
          />
          <button onClick={onClose} className="rounded p-1 text-zinc-500 hover:bg-[#18181B] hover:text-zinc-300">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-80 overflow-y-auto p-2 text-xs">
          <div className="px-3 py-1.5 font-mono text-[10px] uppercase text-zinc-500">Forensic Reports</div>
          {filteredReports.map((report) => (
            <button
              key={report.id}
              onClick={() => {
                router.push(`/reports/${report.id}`);
                onClose();
              }}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-[#18181B] transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-zinc-400" />
                <div>
                  <div className="font-semibold text-zinc-200">{report.targetUsername} ({report.id})</div>
                  <div className="text-[11px] text-zinc-500">{report.pcName} • {report.osVersion}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={report.riskScore >= 70 ? "text-rose-400 font-mono font-bold" : "text-emerald-400 font-mono font-bold"}>
                  Score: {report.riskScore}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-600" />
              </div>
            </button>
          ))}

          <div className="mt-3 px-3 py-1.5 font-mono text-[10px] uppercase text-zinc-500">Quick Navigation</div>
          <button
            onClick={() => {
              router.push('/timeline');
              onClose();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-zinc-300 hover:bg-[#18181B]"
          >
            <Terminal className="h-4 w-4 text-blue-400" />
            <span>Interactive Forensic Event Timeline</span>
          </button>
          <button
            onClick={() => {
              router.push('/rules');
              onClose();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-zinc-300 hover:bg-[#18181B]"
          >
            <ShieldAlert className="h-4 w-4 text-amber-400" />
            <span>Configure Risk Score Weights</span>
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#1F1F24] bg-[#09090B] px-4 py-2 text-[10px] text-zinc-500">
          <span>Use arrow keys to navigate</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
