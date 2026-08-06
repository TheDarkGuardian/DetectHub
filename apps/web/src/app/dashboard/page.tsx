'use client';

import React, { useEffect, useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { RiskGauge } from '@/components/ui/RiskGauge';
import { ForensicReport } from '@/types/forensics';
import Link from 'next/link';
import {
  Activity,
  ShieldAlert,
  Clock,
  CheckCircle,
  TrendingUp,
  Building2,
  FileText,
  ArrowUpRight,
  Monitor,
  Search,
  Filter
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function DashboardPage() {
  const [reports, setReports] = useState<ForensicReport[]>([]);

  const fetchReports = async () => {
    try {
      const res = await fetch('/api/v1/reports');
      const data = await res.json();
      if (data.success && Array.isArray(data.reports)) {
        setReports(data.reports);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchReports();
    const interval = setInterval(fetchReports, 3000); // Live poll for desktop agent uploads
    return () => clearInterval(interval);
  }, []);

  const flaggedCount = reports.filter((r) => r.riskScore >= 40 || r.status === 'FLAGGED').length;
  const avgRisk = reports.length > 0
    ? Math.round((reports.reduce((acc, curr) => acc + curr.riskScore, 0) / reports.length) * 10) / 10
    : 0;

  // Dynamically compute trend data based on live reports timestamps
  const hours = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
  const trendChartData = hours.map((h) => {
    const hourNum = parseInt(h.split(':')[0], 10);
    const matchingReports = reports.filter((r) => {
      const d = new Date(r.createdAt);
      return d.getHours() >= hourNum - 1 && d.getHours() <= hourNum + 1;
    });
    return {
      time: h,
      totalScans: matchingReports.length > 0 ? matchingReports.length : (reports.length > 0 ? 1 : 0),
      flagged: matchingReports.filter((r) => r.riskScore >= 40).length
    };
  });

  return (
    <DashboardShell>
      {/* Header Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono">Forensic Dashboard</h1>
          <p className="text-xs text-zinc-400 mt-1">Real-time endpoint integrity metrics & automated telemetry synthesis</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/40 px-3 py-1 text-xs font-mono text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Engine Active ({reports.length} Reports)
          </span>
        </div>
      </div>

      {/* Overview Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-4 space-y-2 hover:border-zinc-700 transition-card">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
            <span>Total Scans</span>
            <Activity className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{reports.length}</div>
          <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> Live Indexed
          </div>
        </div>

        <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-4 space-y-2 hover:border-zinc-700 transition-card">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
            <span>Pending Reviews</span>
            <Clock className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400">
            {reports.filter(r => r.riskScore >= 20 && r.riskScore < 40).length}
          </div>
          <div className="text-[11px] text-zinc-500 font-mono">Requires analyst sign-off</div>
        </div>

        <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-4 space-y-2 hover:border-zinc-700 transition-card">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
            <span>Flagged Reports</span>
            <ShieldAlert className="h-4 w-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-400">{flaggedCount}</div>
          <div className="text-[11px] text-rose-400 font-mono">Unsigned drivers / memory injection</div>
        </div>

        <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-4 space-y-2 hover:border-zinc-700 transition-card">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
            <span>Average Risk Score</span>
            <CheckCircle className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{avgRisk}</div>
          <div className="text-[11px] text-emerald-400 font-mono">Calculated Mean</div>
        </div>

        <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-4 space-y-2 hover:border-zinc-700 transition-card">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
            <span>Active Orgs</span>
            <Building2 className="h-4 w-4 text-zinc-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">3</div>
          <div className="text-[11px] text-zinc-500 font-mono">Fnatic Esports Club</div>
        </div>

        <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-4 space-y-2 hover:border-zinc-700 transition-card">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
            <span>Recent Uploads</span>
            <FileText className="h-4 w-4 text-zinc-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{reports.length}</div>
          <div className="text-[11px] text-zinc-500 font-mono">Encrypted payloads</div>
        </div>
      </div>

      {/* Main Charts & Live Feed Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white font-mono">Scan Volume & Flagged Anomalies</h3>
              <p className="text-xs text-zinc-400">Intraday 24-hour forensic telemetry frequency</p>
            </div>
            <span className="text-[11px] font-mono text-zinc-500">Live API Data Sync</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scansGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FAFAFA" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#FAFAFA" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="flaggedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#52525B" fontSize={11} tickLine={false} />
                <YAxis stroke="#52525B" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#09090B', borderColor: '#27272A', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="totalScans" stroke="#FAFAFA" strokeWidth={2} fillOpacity={1} fill="url(#scansGrad)" />
                <Area type="monotone" dataKey="flagged" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#flaggedGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-[#1F1F24] pb-3">
            <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
              Live Security Telemetry Stream
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Realtime</span>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {reports.slice(0, 5).map((r) => (
              <div key={r.id} className="rounded-lg border border-[#1F1F24] bg-[#09090B] p-3 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-zinc-400 font-bold">{r.id}</span>
                  <StatusBadge severity={r.severity} />
                </div>
                <div className="font-semibold text-zinc-200">{r.targetUsername} ({r.pcName})</div>
                <div className="text-[11px] text-zinc-400 truncate">{r.aiSummary}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Uploaded Reports Table */}
      <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-[#1F1F24] pb-3">
          <div>
            <h3 className="text-sm font-semibold text-white font-mono">Live Indexed Forensic Reports</h3>
            <p className="text-xs text-zinc-400">Cryptographically signed user computer integrity inspects</p>
          </div>
          <Link
            href="/reports"
            className="flex items-center gap-1 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
          >
            <span>View All Reports</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#1F1F24] bg-[#09090B] font-mono text-[10px] uppercase text-zinc-500">
              <tr>
                <th className="py-2.5 px-3">Report ID</th>
                <th className="py-2.5 px-3">Target User</th>
                <th className="py-2.5 px-3">PC Hostname</th>
                <th className="py-2.5 px-3">Risk Score</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">OS Build</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F1F24]">
              {reports.length > 0 ? (
                reports.map((report) => (
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
                    <td className="py-3 px-3 font-mono text-[11px] text-zinc-400">{report.osVersion}</td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        href={`/reports/${report.id}`}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#27272A] bg-[#18181B] px-2.5 py-1 text-[11px] font-medium text-zinc-200 hover:bg-[#27272A]"
                      >
                        <span>Inspect</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs font-mono text-zinc-500 space-y-2">
                    <p className="text-zinc-300 font-bold">No Forensic Telemetry Reports Uploaded Yet</p>
                    <p>Click "New Scan Request" at the top right to issue an invite link and begin a live PC check.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
