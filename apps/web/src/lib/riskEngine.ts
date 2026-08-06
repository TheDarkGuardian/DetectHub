import { SeverityLevel } from '@/types/forensics';

export interface TriggeredRule {
  ruleId: string;
  ruleName: string;
  scoreDelta: number;
  reason: string;
  severity: SeverityLevel;
}

export interface CalculatedRisk {
  score: number;
  severity: SeverityLevel;
  triggeredRules: TriggeredRule[];
}

export function calculateReportRisk(artifacts: any, activeRules: any[]): CalculatedRisk {
  let totalScore = 0;
  const triggeredRules: TriggeredRule[] = [];

  const processes = artifacts.processes || [];
  const drivers = artifacts.drivers || [];
  const defender = artifacts.defenderStatus || {};
  const vmIndicators = artifacts.vmIndicators || [];
  const registry = artifacts.registryArtifacts || [];

  // 1. Process Check (e.g. Cheat Engine, Memory Modifiers)
  const cheatProc = processes.find((p: any) =>
    /cheatengine|x64dbg|processhacker|cheat/i.test(p.name || '')
  );
  if (cheatProc) {
    const ruleWeight = 80;
    totalScore += ruleWeight;
    triggeredRules.push({
      ruleId: 'rule-cheat-engine',
      ruleName: 'Cheat Engine / Memory Modifier Detected',
      scoreDelta: ruleWeight,
      reason: `Active process '${cheatProc.name}' (PID ${cheatProc.pid}) detected.`,
      severity: 'CRITICAL'
    });
  }

  // 2. Driver Check (Unsigned drivers)
  const unsignedDrv = drivers.find((d: any) => d.isSigned === false);
  if (unsignedDrv) {
    const ruleWeight = 40;
    totalScore += ruleWeight;
    triggeredRules.push({
      ruleId: 'rule-unsigned-driver',
      ruleName: 'Unsigned Kernel Driver Loaded',
      scoreDelta: ruleWeight,
      reason: `Kernel driver '${unsignedDrv.name}' lacks valid WHQL digital signature.`,
      severity: 'HIGH'
    });
  }

  // 3. Defender Check
  if (defender.realtimeProtectionEnabled === false) {
    const ruleWeight = 50;
    totalScore += ruleWeight;
    triggeredRules.push({
      ruleId: 'rule-defender-disabled',
      ruleName: 'Windows Defender Real-Time Protection Disabled',
      scoreDelta: ruleWeight,
      reason: 'Antivirus real-time protection feature was manually or maliciously suspended.',
      severity: 'HIGH'
    });
  }

  // 4. VM / Hypervisor Check
  const vm = vmIndicators.find((v: any) => v.isVmDetected === true);
  if (vm) {
    const ruleWeight = 35;
    totalScore += ruleWeight;
    triggeredRules.push({
      ruleId: 'rule-vm-detected',
      ruleName: 'Virtual Machine / Hypervisor Environment',
      scoreDelta: ruleWeight,
      reason: `System running inside hypervisor environment (${vm.artifactFound}).`,
      severity: 'MEDIUM'
    });
  }

  const finalScore = Math.min(100, totalScore);

  let severity: SeverityLevel = 'SAFE';
  if (finalScore >= 70) severity = 'CRITICAL';
  else if (finalScore >= 40) severity = 'HIGH';
  else if (finalScore >= 20) severity = 'MEDIUM';
  else if (finalScore > 0) severity = 'LOW';

  return {
    score: finalScore,
    severity,
    triggeredRules
  };
}
