'use client';

import React, { useState } from 'react';
import {
  Usb,
  Cpu,
  Shield,
  FileCode,
  Folder,
  Key,
  RotateCcw,
  ShieldAlert,
  Search,
  Filter,
  ChevronDown,
  Info
} from 'lucide-react';
import { ForensicTimelineItem, SeverityLevel } from '@/types/forensics';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface ForensicTimelineProps {
  timeline: ForensicTimelineItem[];
}

export const ForensicTimeline: React.FC<ForensicTimelineProps> = ({ timeline }) => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const filteredTimeline = timeline.filter((item) => {
    if (selectedSeverity === 'ALL') return true;
    return item.severity === selectedSeverity;
  });

  const getIcon = (type: ForensicTimelineItem['iconType']) => {
    switch (type) {
      case 'usb': return Usb;
      case 'driver': return Cpu;
      case 'process': return FileCode;
      case 'defender': return ShieldAlert;
      case 'system': return RotateCcw;
      case 'file': return Folder;
      case 'registry': return Key;
      default: return Info;
    }
  };

  return (
    <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-5">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F1F24] pb-4">
        <div>
          <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
            Forensic Event Chronology
            <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[11px] font-mono text-zinc-400">
              {filteredTimeline.length} Events
            </span>
          </h3>
          <p className="text-xs text-zinc-400">Reconstructed system activity sequence prior to scan capture</p>
        </div>

        {/* Severity Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'INFO'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSelectedSeverity(sev)}
              className={`rounded-lg px-3 py-1 text-xs font-mono transition-all ${
                selectedSeverity === sev
                  ? 'bg-zinc-100 text-zinc-950 font-bold'
                  : 'border border-[#1F1F24] bg-[#09090B] text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Vertical Timeline */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#1F1F24]">
        {filteredTimeline.map((item) => {
          const IconComponent = getIcon(item.iconType);
          const isExpanded = expandedEventId === item.id;

          let nodeColor = "bg-zinc-800 text-zinc-300 border-zinc-700";
          if (item.severity === 'CRITICAL' || item.severity === 'HIGH') {
            nodeColor = "bg-rose-950 text-rose-400 border-rose-500/40 ring-4 ring-rose-950/40";
          } else if (item.severity === 'MEDIUM') {
            nodeColor = "bg-amber-950 text-amber-400 border-amber-500/40";
          } else if (item.severity === 'SAFE') {
            nodeColor = "bg-emerald-950 text-emerald-400 border-emerald-500/40";
          }

          return (
            <div key={item.id} className="relative group">
              {/* Timeline Node Icon */}
              <div
                className={`absolute -left-[31px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full border text-xs transition-transform group-hover:scale-110 ${nodeColor}`}
              >
                <IconComponent className="h-3 w-3" />
              </div>

              {/* Event Card */}
              <div
                onClick={() => setExpandedEventId(isExpanded ? null : item.id)}
                className={`cursor-pointer rounded-lg border border-[#1F1F24] bg-[#09090B] p-4 transition-all hover:border-zinc-700 ${
                  isExpanded ? 'border-zinc-600 bg-[#141418]' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-zinc-300 bg-[#18181B] px-2 py-0.5 rounded border border-[#27272A]">
                        {item.timeFormatted}
                      </span>
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                      <StatusBadge severity={item.severity} />
                    </div>
                    <p className="text-xs text-zinc-400">{item.description}</p>
                  </div>

                  <span className="text-xs text-zinc-500 font-mono flex items-center gap-1 shrink-0">
                    {item.category}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </span>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-[#1F1F24] space-y-2 text-xs font-mono text-zinc-300 animate-fadeIn">
                    <div className="text-[10px] text-zinc-500 uppercase">Event Metadata & Telemetry Vector</div>
                    <div className="rounded bg-[#09090B] p-3 border border-[#1F1F24] space-y-1">
                      <div><span className="text-zinc-500">Timestamp UTC:</span> {item.timestamp}</div>
                      <div><span className="text-zinc-500">Category Tag:</span> {item.category}</div>
                      <div><span className="text-zinc-500">Severity Weight:</span> {item.severity}</div>
                      <div><span className="text-zinc-500">Forensic Rule Match:</span> SYS_INTEGRITY_CHRONOLOGY_NODE</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
