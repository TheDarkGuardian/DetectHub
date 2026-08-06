'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { RiskGauge } from '@/components/ui/RiskGauge';
import { MOCK_REPORTS } from '@/lib/mockData';
import { Search, Filter, ArrowUpRight, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';

export default function ReportsListPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredReports = MOCK_REPORTS.filter((r) => {
    const matchesQuery =
      r.targetUsername.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.pcName.toLowerCase().includes(search.toLowerCase());

    if (statusFilter === 'ALL') return matchesQuery;
    return matchesQuery && r.status === statusFilter;
  });

  return (
    <DashboardShell>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono">Forensic Reports</h1>
          <p className="text-xs text-zinc-400 mt-1">Audit trail of computer integrity scans and user risk reports</p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user, ID, hostname..."
              className="h-9 w-64 rounded-lg border border-[#1F1F24] bg-[#0F0F12] pl-9 pr-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-zinc-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded-lg border border-[#1F1F24] bg-[#0F0F12] px-3 text-xs font-mono text-zinc-300 outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="FLAGGED font-bold">FLAGGED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="PENDING">PENDING</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#1F1F24] bg-[#09090B] font-mono text-[10px] uppercase text-zinc-500">
              <tr>
                <th className="py-3 px-3">Report ID</th>
                <th className="py-3 px-3">Target User</th>
                <th className="py-3 px-3">PC Hostname</th>
                <th className="py-3 px-3">Risk Score</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F1F24]">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-[#141418] transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-zinc-300">{report.id}</td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-white">{report.targetUsername}</div>
                    <div className="text-[10px] text-zinc-500 font-mono">{report.targetDiscord}</div>
                  </td>
                  <td className="py-3 px-3 font-mono text-zinc-400">{report.pcName}</td>
                  <td className="py-3 px-3">
                    <RiskGauge score={report.riskScore} severity={report.severity} size="sm" showLabel={false} />
                  </td>
                  <td className="py-3 px-3">
                    <StatusBadge status={report.status} severity={report.severity} />
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-zinc-400">{new Date(report.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      href={`/reports/${report.id}`}
                      className="inline-flex items-center gap-1 rounded-lg border border-[#27272A] bg-[#18181B] px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:bg-[#27272A] transition-colors"
                    >
                      <span>Inspect Report</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
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
