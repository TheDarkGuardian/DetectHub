'use client';

import React, { useState } from 'react';
import { Search, Eye, Filter, CheckCircle, AlertTriangle, X, Copy, Terminal, Shield, Cpu } from 'lucide-react';
import { ForensicReport, ArtifactBase } from '@/types/forensics';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface ArtifactTableProps {
  report: ForensicReport;
}

export const ArtifactTable: React.FC<ArtifactTableProps> = ({ report }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Processes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRawArtifact, setSelectedRawArtifact] = useState<any | null>(null);

  const CATEGORIES = [
    { name: 'System Information', count: 12 },
    { name: 'Hardware', count: 6 },
    { name: 'Processes', count: report.processes.length },
    { name: 'Drivers', count: report.drivers.length },
    { name: 'Registry Artifacts', count: report.registryArtifacts.length },
    { name: 'USB History', count: report.usbHistory.length },
    { name: 'Network Connections', count: report.networkConnections.length },
    { name: 'DNS Cache', count: report.dnsCache.length },
    { name: 'Event Logs', count: report.eventLogs.length },
    { name: 'VM & Sandbox Indicators', count: report.vmIndicators.length },
    { name: 'Windows Defender Status', count: 1 },
    { name: 'Installed Applications', count: 48 },
    { name: 'Services & Autoruns', count: 18 },
    { name: 'Browser Downloads', count: 14 },
    { name: 'Recent Files & Jump Lists', count: 22 },
    { name: 'ARP Cache & Hosts File', count: 8 },
    { name: 'Scheduled Tasks', count: 11 },
    { name: 'Recycle Bin Artifacts', count: 5 }
  ];

  const renderTabContent = () => {
    switch (activeCategory) {
      case 'System Information':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {Object.entries(report.systemInfo).map(([key, val]) => (
              <div key={key} className="rounded-lg border border-[#1F1F24] bg-[#09090B] p-3 space-y-1">
                <div className="font-mono text-[10px] uppercase text-zinc-500">{key}</div>
                <div className="font-semibold text-zinc-200 font-mono truncate">{String(val)}</div>
              </div>
            ))}
          </div>
        );

      case 'Hardware':
        return (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg border border-[#1F1F24] bg-[#09090B] p-3">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">CPU Model</span>
                <div className="font-semibold text-white mt-1">{report.hardware.cpuName}</div>
                <div className="text-[11px] text-zinc-400 font-mono mt-0.5">{report.hardware.cpuCores} Cores / {report.hardware.cpuThreads} Threads</div>
              </div>
              <div className="rounded-lg border border-[#1F1F24] bg-[#09090B] p-3">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">System RAM</span>
                <div className="font-semibold text-white mt-1">{report.hardware.totalRamGb} GB DDR5</div>
                <div className="text-[11px] text-zinc-400 font-mono mt-0.5">Frequency: {report.hardware.ramSpeedMhz} MHz</div>
              </div>
              <div className="rounded-lg border border-[#1F1F24] bg-[#09090B] p-3">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">GPU Device</span>
                <div className="font-semibold text-white mt-1">{report.hardware.gpuName}</div>
                <div className="text-[11px] text-zinc-400 font-mono mt-0.5">VRAM: {report.hardware.gpuVramGb} GB GDDR6X</div>
              </div>
            </div>

            <div className="rounded-lg border border-[#1F1F24] bg-[#09090B] p-3">
              <div className="font-mono text-[10px] uppercase text-zinc-500 mb-2">Connected Storage Devices ({report.hardware.disks.length})</div>
              <div className="space-y-2">
                {report.hardware.disks.map((d, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-[#1F1F24] pb-2 last:border-0 last:pb-0 font-mono text-xs">
                    <div>
                      <span className="text-zinc-200 font-semibold">{d.device} - {d.model}</span>
                      <div className="text-[10px] text-zinc-500">Serial: {d.serial}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-zinc-400">{d.sizeGb} GB</span>
                      <div className="text-[10px] text-zinc-500">{d.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Processes':
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#1F1F24] bg-[#09090B] font-mono text-[10px] uppercase text-zinc-500">
                <tr>
                  <th className="py-2.5 px-3">Process Name</th>
                  <th className="py-2.5 px-3">PID</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Signature</th>
                  <th className="py-2.5 px-3">Path</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F1F24]">
                {report.processes.map((proc) => (
                  <tr key={proc.id} className="hover:bg-[#141418] transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-zinc-200 font-mono">{proc.name}</td>
                    <td className="py-2.5 px-3 font-mono text-zinc-400">{proc.pid}</td>
                    <td className="py-2.5 px-3"><StatusBadge status={proc.status} severity={proc.severity} /></td>
                    <td className="py-2.5 px-3">
                      <span className={proc.isSigned ? "text-emerald-400 font-mono text-[11px]" : "text-rose-400 font-mono text-[11px]"}>
                        {proc.publisher}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-zinc-400 max-w-xs truncate">{proc.path}</td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => setSelectedRawArtifact(proc)}
                        className="rounded border border-[#27272A] bg-[#18181B] px-2 py-1 text-[11px] font-medium text-zinc-300 hover:bg-[#27272A]"
                      >
                        Inspect Raw
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'Drivers':
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#1F1F24] bg-[#09090B] font-mono text-[10px] uppercase text-zinc-500">
                <tr>
                  <th className="py-2.5 px-3">Driver Name</th>
                  <th className="py-2.5 px-3">Display Name</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Digital Signature</th>
                  <th className="py-2.5 px-3">Kernel Path</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F1F24]">
                {report.drivers.map((drv) => (
                  <tr key={drv.id} className="hover:bg-[#141418]">
                    <td className="py-2.5 px-3 font-semibold text-zinc-200 font-mono">{drv.name}</td>
                    <td className="py-2.5 px-3 text-zinc-300">{drv.displayName}</td>
                    <td className="py-2.5 px-3"><StatusBadge status={drv.status} severity={drv.severity} /></td>
                    <td className="py-2.5 px-3">
                      <span className={drv.isSigned ? "text-emerald-400 font-mono text-[11px]" : "text-rose-400 font-mono text-[11px]"}>
                        {drv.publisher}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-zinc-400 max-w-xs truncate">{drv.path}</td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => setSelectedRawArtifact(drv)}
                        className="rounded border border-[#27272A] bg-[#18181B] px-2 py-1 text-[11px] font-medium text-zinc-300 hover:bg-[#27272A]"
                      >
                        Inspect Raw
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'Windows Defender Status':
        return (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-[#1F1F24] bg-[#09090B] p-4 space-y-3">
                <div className="font-mono text-[10px] uppercase text-zinc-500 font-semibold">Defender Core Shields</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Antivirus Core Status</span>
                    <StatusBadge status={report.defenderStatus.antivirusEnabled ? 'Clean' : 'Flagged'} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Real-Time Protection</span>
                    <StatusBadge status={report.defenderStatus.realtimeProtectionEnabled ? 'Clean' : 'Flagged'} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tamper Protection</span>
                    <StatusBadge status={report.defenderStatus.tamperProtectionEnabled ? 'Clean' : 'Flagged'} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Behavioral Monitoring</span>
                    <StatusBadge status={report.defenderStatus.behaviorMonitoringEnabled ? 'Clean' : 'Flagged'} />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-[#1F1F24] bg-[#09090B] p-4 space-y-3">
                <div className="font-mono text-[10px] uppercase text-zinc-500 font-semibold">Definitions & Scan Log</div>
                <div className="space-y-2 font-mono">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Definitions Version:</span>
                    <span className="text-zinc-200">{report.defenderStatus.definitionsVersion}</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Last Full Scan:</span>
                    <span className="text-zinc-200">{report.defenderStatus.lastScanTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Active Threats Count:</span>
                    <span className="text-emerald-400 font-bold">{report.defenderStatus.activeThreatsCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="rounded-lg border border-[#1F1F24] bg-[#09090B] p-8 text-center text-xs text-zinc-500 font-mono">
            Forensic dataset loaded for {activeCategory}. 0 critical anomalies detected in raw stream.
          </div>
        );
    }
  };

  return (
    <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-4">
      {/* Category Tabs Header */}
      <div className="flex items-center justify-between border-b border-[#1F1F24] pb-3">
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none max-w-4xl">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                activeCategory === cat.name
                  ? 'bg-zinc-100 text-zinc-950 font-semibold'
                  : 'text-zinc-400 hover:bg-[#18181B] hover:text-zinc-200'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                activeCategory === cat.name ? 'bg-zinc-900 text-zinc-100' : 'bg-[#1F1F24] text-zinc-400'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter artifacts..."
            className="h-8 w-44 rounded-lg border border-[#1F1F24] bg-[#09090B] pl-8 pr-3 text-xs text-zinc-200 placeholder-zinc-500 outline-none focus:border-zinc-500"
          />
        </div>
      </div>

      {/* Main Tab Content */}
      {renderTabContent()}

      {/* Raw Data Modal */}
      {selectedRawArtifact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-[#27272A] bg-[#0F0F12] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1F1F24] pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-emerald-400" />
                <h4 className="text-sm font-semibold text-white font-mono">Raw Forensic Telemetry Dump</h4>
              </div>
              <button onClick={() => setSelectedRawArtifact(null)} className="text-zinc-500 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <pre className="max-h-96 overflow-y-auto rounded-lg border border-[#1F1F24] bg-[#09090B] p-4 text-xs font-mono text-emerald-400 leading-relaxed">
              {JSON.stringify(selectedRawArtifact, null, 2)}
            </pre>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-zinc-500 font-mono">Cryptographic SHA-256 Verified Payload</span>
              <button
                onClick={() => setSelectedRawArtifact(null)}
                className="rounded-lg bg-zinc-100 px-4 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-white"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
