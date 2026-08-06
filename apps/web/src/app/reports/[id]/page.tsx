'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { RiskGauge } from '@/components/ui/RiskGauge';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AIAssistantCard } from '@/components/reports/AIAssistantCard';
import { ArtifactTable } from '@/components/reports/ArtifactTable';
import { ForensicTimeline } from '@/components/timeline/ForensicTimeline';
import { ForensicReport } from '@/types/forensics';
import {
  ArrowLeft,
  Download,
  Share2,
  Monitor
} from 'lucide-react';

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const reportId = params.id as string;
  const [report, setReport] = useState<ForensicReport | null>(null);

  useEffect(() => {
    fetch(`/api/v1/reports/${reportId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.report) {
          setReport(data.report);
        }
      })
      .catch(() => null);
  }, [reportId]);

  if (!report) {
    return (
      <DashboardShell>
        <div className="p-8 text-center text-xs font-mono text-zinc-400">Loading Forensic Telemetry...</div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {/* Top Action & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/reports')}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1F1F24] bg-[#0F0F12] text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white font-mono">{report.id}</h1>
              <StatusBadge status={report.status} severity={report.severity} />
            </div>
            <p className="text-xs text-zinc-400 mt-0.5 font-mono">
              Target User: <span className="text-zinc-200 font-semibold">{report.targetUsername}</span> ({report.targetDiscord}) • Host: {report.pcName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-[#1F1F24] bg-[#0F0F12] px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-[#141418]">
            <Share2 className="h-3.5 w-3.5" />
            <span>Share Report Token</span>
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-white transition-colors">
            <Download className="h-3.5 w-3.5" />
            <span>Export PDF Payload</span>
          </button>
        </div>
      </div>

      {/* Top Banner: Risk Gauge & System Hardware Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-4">
          <RiskGauge score={report.riskScore} severity={report.severity} size="lg" showLabel={true} />

          <div className="pt-2 border-t border-[#1F1F24] space-y-2 text-xs font-mono">
            <div className="text-[10px] text-zinc-500 uppercase font-semibold">Configured Risk Score Deductions</div>
            {report.triggeredRules && report.triggeredRules.length > 0 ? (
              report.triggeredRules.map((rule, idx) => (
                <div key={idx} className="flex items-center justify-between text-zinc-300 border-b border-[#1F1F24] pb-1.5 last:border-0 last:pb-0">
                  <span className="truncate max-w-[200px]">{rule.ruleName}</span>
                  <span className="text-rose-400 font-bold">+{rule.scoreDelta} PTS</span>
                </div>
              ))
            ) : (
              <div className="text-emerald-400 text-xs font-sans">0 elevated risk rule triggers detected.</div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-[#1F1F24] pb-3">
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4 text-zinc-400" />
              <h3 className="text-sm font-semibold text-white font-mono">Target System Specifications</h3>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">Uptime: {report.systemUptime}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase">OS Build</span>
              <div className="font-semibold text-zinc-200 truncate">{report.osVersion}</div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase">CPU Model</span>
              <div className="font-semibold text-zinc-200 truncate">{report.cpuSpecs}</div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase">Memory</span>
              <div className="font-semibold text-zinc-200 truncate">{report.ramSpecs}</div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase">Graphics GPU</span>
              <div className="font-semibold text-zinc-200 truncate">{report.gpuSpecs}</div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[#1F1F24] text-center font-mono">
            <div className="rounded bg-[#09090B] p-2 border border-[#1F1F24]">
              <span className="text-[10px] text-zinc-500 uppercase">Total Artifacts</span>
              <div className="text-sm font-bold text-white mt-0.5">{report.totalArtifactsCollected}</div>
            </div>
            <div className="rounded bg-[#09090B] p-2 border border-[#1F1F24]">
              <span className="text-[10px] text-zinc-500 uppercase">Flagged</span>
              <div className="text-sm font-bold text-rose-400 mt-0.5">{report.flaggedArtifactsCount}</div>
            </div>
            <div className="rounded bg-[#09090B] p-2 border border-[#1F1F24]">
              <span className="text-[10px] text-zinc-500 uppercase">Unsigned Drivers</span>
              <div className="text-sm font-bold text-rose-400 mt-0.5">{report.unsignedDriversCount}</div>
            </div>
            <div className="rounded bg-[#09090B] p-2 border border-[#1F1F24]">
              <span className="text-[10px] text-zinc-500 uppercase">Process Anomaly</span>
              <div className="text-sm font-bold text-amber-400 mt-0.5">{report.suspiciousProcessesCount}</div>
            </div>
          </div>
        </div>
      </div>

      <AIAssistantCard report={report} />
      <ForensicTimeline timeline={report.timeline || []} />
      <ArtifactTable report={report} />
    </DashboardShell>
  );
}
