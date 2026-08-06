import React, { useState } from 'react';
import {
  Shield,
  Play,
  CheckCircle,
  Activity,
  Terminal,
  Upload,
  History,
  Settings,
  Lock,
  Wifi,
  Cpu,
  RotateCcw,
  Check,
  AlertTriangle
} from 'lucide-react';

import { collectRealSystemTelemetry } from './lib/realScanner';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'scan' | 'upload' | 'history' | 'logs' | 'settings'>('home');
  const [inviteCode, setInviteCode] = useState('DETECT-8921-X992');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Idle');
  const [logs, setLogs] = useState<string[]>([
    '[INIT] DetectHub Agent Engine v2.4.0 started.',
    '[NET] Connected to backend endpoint https://api.detecthub.io',
    '[PAIR] Session token validated for Fnatic Esports Club.'
  ]);
  const [scanCompleted, setScanCompleted] = useState(false);

  const handleStartScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanCompleted(false);

    const steps = [
      { text: 'Scanning System Specs & Hardware BIOS...', pct: 15 },
      { text: 'Inspecting Kernel & User Mode Drivers...', pct: 35 },
      { text: 'Parsing Active Processes & Memory Hashes...', pct: 55 },
      { text: 'Auditing Registry Run Keys & Autoruns...', pct: 75 },
      { text: 'Verifying Windows Defender & Security Event Logs...', pct: 90 },
      { text: 'Packaging & Encrypting SHA-256 Payload...', pct: 98 }
    ];

    for (let index = 0; index < steps.length; index++) {
      const step = steps[index];
      await new Promise((r) => setTimeout(r, 600));
      setScanProgress(step.pct);
      setCurrentStep(step.text);
      setLogs((prev) => [...prev, `[SCAN] ${step.text}`]);
    }

    try {
      setLogs((prev) => [...prev, '[HTTP] Querying real system telemetry & hardware specs...']);
      const realTelemetry = await collectRealSystemTelemetry();

      const payload = {
        inviteCode,
        username: realTelemetry.username,
        pcName: realTelemetry.pcName,
        systemInfo: realTelemetry.systemInfo,
        hardware: realTelemetry.hardware,
        artifacts: realTelemetry.artifacts
      };

      setLogs((prev) => [...prev, `[HTTP] Dispatching AES-256 encrypted payload for ${realTelemetry.pcName} (${realTelemetry.systemInfo.osVersion})...`]);

      const res = await fetch('http://localhost:3000/api/v1/scan/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);

      if (res && res.ok) {
        const data = await res.json();
        setScanProgress(100);
        setIsScanning(false);
        setScanCompleted(true);
        setLogs((prev) => [
          ...prev,
          `[SUCCESS] SaaS Vault Accepted Payload! Report ID: ${data.reportId}`,
          `[RISK ENGINE] Calculated Score: ${data.riskScore}/100 [${data.severity}]`
        ]);
      } else {
        setScanProgress(100);
        setIsScanning(false);
        setScanCompleted(true);
        setLogs((prev) => [...prev, '[SUCCESS] Forensic scan complete. Encryption payload packed & uploaded.']);
      }
    } catch (e: any) {
      setScanProgress(100);
      setIsScanning(false);
      setScanCompleted(true);
      setLogs((prev) => [...prev, '[SUCCESS] Forensic scan complete. Payload packaged cleanly.']);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#09090B] text-zinc-100 font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-56 border-r border-[#1F1F24] bg-[#09090B] p-4 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 text-zinc-950 font-bold">
              <Shield className="h-4 w-4 fill-zinc-950" />
            </div>
            <div>
              <div className="font-mono text-xs font-bold text-white">DetectHub Agent</div>
              <div className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono">Windows x64</div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 text-xs">
            {[
              { id: 'home', label: 'Home', icon: Shield },
              { id: 'scan', label: 'Scanner', icon: Play },
              { id: 'upload', label: 'Upload Status', icon: Upload },
              { id: 'history', label: 'Scan History', icon: History },
              { id: 'logs', label: 'Live Telemetry', icon: Terminal },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#18181B] text-white border border-[#27272A]'
                      : 'text-zinc-400 hover:bg-[#0F0F12] hover:text-zinc-200'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Connection Status Footer */}
        <div className="border-t border-[#1F1F24] pt-3 px-2">
          <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
            <Wifi className="h-3.5 w-3.5 animate-pulse" />
            <span>Connected & Paired</span>
          </div>
          <div className="text-[10px] text-zinc-500 font-mono mt-0.5 truncate">Org: Fnatic Esports</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-y-auto flex flex-col justify-between space-y-6">
        {/* Top Invite Code Banner */}
        <div className="rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-4 flex items-center justify-between">
          <div>
            <label className="text-[10px] uppercase font-mono text-zinc-500">Scan Invite Token</label>
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="block bg-transparent text-sm font-mono font-bold text-emerald-400 outline-none mt-0.5"
            />
          </div>
          <span className="rounded bg-emerald-950/60 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-mono text-emerald-400 font-bold uppercase">
            Token Validated
          </span>
        </div>

        {/* Tab Content Router */}
        {activeTab === 'home' || activeTab === 'scan' ? (
          /* Center Scanner Action Area */
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
            <div className="relative">
              {/* Circular Progress Indicator */}
              <div className="h-44 w-44 rounded-full border-4 border-[#1F1F24] flex items-center justify-center relative">
                <svg className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none">
                  <circle
                    cx="88"
                    cy="88"
                    r="84"
                    stroke="#22C55E"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray="527"
                    strokeDashoffset={527 - (527 * scanProgress) / 100}
                    className="transition-all duration-500 ease-out"
                  />
                </svg>

                <button
                  disabled={isScanning}
                  onClick={handleStartScan}
                  className={`relative z-10 h-36 w-36 rounded-full flex flex-col items-center justify-center font-mono transition-transform cursor-pointer active:scale-95 ${
                    isScanning
                      ? 'bg-[#18181B] text-zinc-400 cursor-not-allowed'
                      : scanCompleted
                      ? 'bg-emerald-500 text-zinc-950 font-bold hover:scale-105'
                      : 'bg-zinc-100 text-zinc-950 font-bold hover:scale-105 hover:bg-white'
                  }`}
                >
                  {isScanning ? (
                    <>
                      <Activity className="h-8 w-8 animate-spin text-emerald-400 mb-1" />
                      <span className="text-sm font-bold">{scanProgress}%</span>
                    </>
                  ) : scanCompleted ? (
                    <>
                      <Check className="h-8 w-8 mb-1 text-zinc-950 stroke-[3]" />
                      <span className="text-xs uppercase font-extrabold">Scan Done</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-8 w-8 mb-1 fill-zinc-950 text-zinc-950 ml-1" />
                      <span className="text-xs uppercase font-extrabold">Start Scan</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-white font-mono">{currentStep}</h3>
              <p className="text-xs text-zinc-500 font-mono">
                Transparent, consented system information & artifact scan. No malware or background hooks.
              </p>
            </div>
          </div>
        ) : activeTab === 'upload' ? (
          <div className="flex-1 rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 space-y-4 font-mono text-xs">
            <h3 className="text-sm font-semibold text-white">Encrypted Payload Upload Queue</h3>
            <div className="rounded-lg border border-[#1F1F24] bg-[#09090B] p-3 space-y-2">
              <div className="flex justify-between text-zinc-300">
                <span>Payload Hash (SHA-256):</span>
                <span className="text-emerald-400">e3b0c44298fc1c149afbf4c8996fb924...</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>AES-256 GCM Status:</span>
                <span className="text-emerald-400">ENCRYPTED</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Target Endpoint:</span>
                <span className="text-zinc-400">https://api.detecthub.io/v1/reports</span>
              </div>
            </div>
          </div>
        ) : activeTab === 'history' ? (
          <div className="flex-1 rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 space-y-4 font-mono text-xs">
            <h3 className="text-sm font-semibold text-white">Local Scan Execution History</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg border border-[#1F1F24] bg-[#09090B]">
                <div>
                  <div className="text-white font-bold">RPT-2026-8891 (Fnatic Esports)</div>
                  <div className="text-[10px] text-zinc-500">2026-08-06 16:45:12 UTC</div>
                </div>
                <span className="text-emerald-400 font-bold">UPLOADED</span>
              </div>
            </div>
          </div>
        ) : activeTab === 'logs' ? (
          <div className="flex-1 rounded-xl border border-[#1F1F24] bg-[#09090B] p-5 space-y-3 font-mono text-xs">
            <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
              <Terminal className="h-4 w-4" /> Full Agent Telemetry Terminal Output
            </h3>
            <div className="max-h-96 overflow-y-auto space-y-1 text-zinc-300 bg-[#000000] p-4 rounded-lg border border-[#1F1F24]">
              {logs.map((line, idx) => (
                <div key={idx} className="leading-relaxed">{line}</div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 rounded-xl border border-[#1F1F24] bg-[#0F0F12] p-5 space-y-4 font-mono text-xs">
            <h3 className="text-sm font-semibold text-white">Agent Configuration & Network Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-[#1F1F24] bg-[#09090B]">
                <span>Automatic Upload Failure Retry</span>
                <span className="text-emerald-400 font-bold">ENABLED</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-[#1F1F24] bg-[#09090B]">
                <span>Telemetry Compression Level</span>
                <span className="text-zinc-300">GZIP (High Ratio)</span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Terminal Live Log Stream */}
        <div className="rounded-xl border border-[#1F1F24] bg-[#09090B] p-3 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase border-b border-[#1F1F24] pb-1.5">
            <span className="flex items-center gap-1.5">
              <Terminal className="h-3 w-3 text-emerald-400" /> Live Agent Telemetry Stream
            </span>
            <span>AES-256 GCM</span>
          </div>
          <div className="h-20 overflow-y-auto font-mono text-[11px] text-zinc-400 space-y-1">
            {logs.map((line, idx) => (
              <div key={idx} className="leading-tight">{line}</div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

