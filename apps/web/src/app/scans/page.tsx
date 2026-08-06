'use client';

import React, { useEffect, useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { QrCode, Copy, Plus, Check, ExternalLink, RefreshCw } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function ScansPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [scans, setScans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchScans = async () => {
    try {
      const res = await fetch('/api/v1/scans');
      const data = await res.json();
      if (data.success && Array.isArray(data.scanRequests)) {
        setScans(data.scanRequests);
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScans();
  }, []);

  const handleCopyLink = (code: string, id: string) => {
    const inviteLink = `${window.location.origin}/scan/${code}`;
    navigator.clipboard.writeText(inviteLink);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateNewScan = async () => {
    try {
      const res = await fetch('/api/v1/scan/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUser: `Fnatic Player #${Math.floor(10 + Math.random() * 90)}` })
      });
      const data = await res.json();
      if (data.success) {
        fetchScans();
      }
    } catch {
      // ignore
    }
  };

  return (
    <DashboardShell>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono">Scan Requests & Target Invite Links</h1>
          <p className="text-xs text-zinc-400 mt-1">Issue unique scan links. When opened by the player, their OS is automatically detected and pairing code pre-filled.</p>
        </div>

        <button
          onClick={handleCreateNewScan}
          className="flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3.5 py-2 text-xs font-semibold text-zinc-950 hover:bg-white transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Target Invite Link</span>
        </button>
      </div>

      <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#1F1F24] bg-[#09090B] font-mono text-[10px] uppercase text-zinc-500">
              <tr>
                <th className="py-3 px-3">Scan ID</th>
                <th className="py-3 px-3">Invite Token Code</th>
                <th className="py-3 px-3">Target Player / Scope</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Created</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F1F24]">
              {scans.map((scan) => (
                <tr key={scan.id} className="hover:bg-[#141418] transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-zinc-300">{scan.id}</td>
                  <td className="py-3 px-3 font-mono text-emerald-400 font-bold">{scan.code}</td>
                  <td className="py-3 px-3 text-zinc-200">{scan.targetUser || scan.target}</td>
                  <td className="py-3 px-3 font-mono text-[11px] text-zinc-400">{scan.type}</td>
                  <td className="py-3 px-3"><StatusBadge status={scan.status as any} /></td>
                  <td className="py-3 px-3 font-mono text-zinc-400">{scan.createdAt}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleCopyLink(scan.code, scan.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#27272A] bg-[#18181B] px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:bg-[#27272A] transition-colors"
                    >
                      {copiedId === scan.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedId === scan.id ? 'Link Copied!' : 'Copy Target Link'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
