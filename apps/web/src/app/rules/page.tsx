'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { MOCK_RISK_RULES } from '@/lib/mockData';
import { Sliders, Plus, Edit2, Trash2, Check, ShieldAlert, Zap } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function RiskRulesPage() {
  const [rules, setRules] = useState(MOCK_RISK_RULES);
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);

  const handleWeightChange = (id: string, newWeight: number) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, scoreWeight: newWeight } : r))
    );
  };

  return (
    <DashboardShell>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono">Configurable Risk Engine</h1>
          <p className="text-xs text-zinc-400 mt-1">Define custom risk scoring weights, heuristic conditions, and anomaly severity</p>
        </div>

        <button className="flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-2 text-xs font-semibold text-zinc-950 hover:bg-white transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Detection Rule</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {rules.map((rule) => (
          <div key={rule.id} className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-4 hover:border-zinc-700 transition-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F1F24] pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-950/40 border border-amber-500/20 text-amber-400">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white font-mono">{rule.name}</h3>
                  <span className="text-[11px] text-zinc-500 font-mono">Category: {rule.category}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge severity={rule.severity} />
                <div className="flex items-center gap-2 rounded-lg border border-[#27272A] bg-[#09090B] px-3 py-1.5 font-mono text-xs">
                  <span className="text-zinc-400">Score Weight:</span>
                  <input
                    type="number"
                    value={rule.scoreWeight}
                    onChange={(e) => handleWeightChange(rule.id, parseInt(e.target.value) || 0)}
                    className="w-12 bg-transparent text-rose-400 font-bold outline-none text-right"
                  />
                  <span className="text-zinc-500">PTS</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase">Detection Logic Condition</span>
                <div className="rounded bg-[#09090B] p-2.5 border border-[#1F1F24] text-emerald-400 truncate">
                  {rule.condition}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase">Description & Intent</span>
                <p className="text-zinc-400 text-xs font-sans mt-1">{rule.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
