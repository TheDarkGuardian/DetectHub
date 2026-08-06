'use client';

import React, { useState } from 'react';
import { Bot, Sparkles, Send, ShieldAlert, CheckCircle2, HelpCircle, ChevronRight } from 'lucide-react';
import { ForensicReport } from '@/types/forensics';

interface AIAssistantCardProps {
  report: ForensicReport;
  onFilterHighRiskOnly?: () => void;
}

export const AIAssistantCard: React.FC<AIAssistantCardProps> = ({ report, onFilterHighRiskOnly }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: `AI Agent analysis complete for ${report.targetUsername}'s computer (${report.pcName}). I have evaluated ${report.totalArtifactsCollected} artifacts against active detection rules.`
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');

  const PRESET_QUESTIONS = [
    "What is suspicious?",
    "Show only high-risk events",
    "Explain this registry key",
    "Why was Defender disabled?"
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = { sender: 'user' as const, text: query };
    let replyText = "Inspecting raw telemetry metadata...";

    const lower = query.toLowerCase();
    if (lower.includes('suspicious') || lower.includes('high-risk')) {
      replyText = `Found 2 high-risk artifacts: 1) Unsigned driver 'memrw64.sys' (PID 0) in System32. 2) Active process 'cheatengine-x86_64.exe' (PID 8412) launched from AppData Temp. Both indicate potential memory manipulation.`;
      if (onFilterHighRiskOnly) onFilterHighRiskOnly();
    } else if (lower.includes('registry')) {
      replyText = `Registry key HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\WinServiceUpdate is configured to autostart update_helper.exe from AppData\\Local\\Temp. Persistence in Temp directories is a common evasion technique.`;
    } else if (lower.includes('defender')) {
      replyText = `Windows Defender Security log (EventID 5001) shows Real-Time Protection was suspended at 16:24:10 via Group Policy override key DisableAntiSpyware.`;
    } else {
      replyText = `Based on forensic telemetry, ${report.targetUsername}'s machine has a Risk Score of ${report.riskScore}/100. Recommended action: quarantine machine token and request clean reboot.`;
    }

    setMessages((prev) => [...prev, userMsg, { sender: 'ai', text: replyText }]);
    setInputQuery('');
  };

  return (
    <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 shadow-card space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1F1F24] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-950/60 border border-blue-500/20 text-blue-400">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              DetectAI Forensic Analyst
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            </h3>
            <p className="text-[11px] text-zinc-400">Natural Language Interpretation & Pattern Synthesis</p>
          </div>
        </div>

        <span className="text-[10px] font-mono uppercase bg-blue-950/40 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">
          GPT-4o Forensics Engine
        </span>
      </div>

      {/* Structured AI Findings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-lg border border-[#1F1F24] bg-[#09090B] p-3 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-semibold flex items-center gap-1">
            <ShieldAlert className="h-3 w-3" /> Suspicious Key Findings ({report.aiFindings.length})
          </span>
          <div className="space-y-2">
            {report.aiFindings.map((finding, i) => (
              <div key={i} className="text-xs space-y-1 border-b border-[#1F1F24] pb-2 last:border-0 last:pb-0">
                <div className="font-medium text-zinc-200">{finding.title}</div>
                <div className="text-[11px] text-zinc-400">{finding.explanation}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-[#1F1F24] bg-[#09090B] p-3 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Recommendations & Context
          </span>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {report.aiSummary}
          </p>
        </div>
      </div>

      {/* Interactive Chat Stream */}
      <div className="rounded-lg border border-[#1F1F24] bg-[#09090B] p-3 space-y-3">
        <div className="max-h-48 overflow-y-auto space-y-2 text-xs pr-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2 ${
                  m.sender === 'user'
                    ? 'bg-zinc-100 text-zinc-950 font-medium'
                    : 'bg-[#18181B] text-zinc-200 border border-[#27272A]'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {PRESET_QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="flex items-center gap-1 rounded-md border border-[#27272A] bg-[#141418] px-2.5 py-1 text-[11px] text-zinc-300 hover:bg-[#18181B] hover:text-white transition-colors"
            >
              <span>{q}</span>
              <ChevronRight className="h-3 w-3 text-zinc-500" />
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI: 'What is suspicious?', 'Explain drivers'..."
            className="flex-1 rounded-lg border border-[#27272A] bg-[#141418] px-3 py-1.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-zinc-500 transition-colors"
          />
          <button
            onClick={() => handleSend()}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-950 hover:bg-white transition-colors"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
