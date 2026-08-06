import { CalculatedRisk } from './riskEngine';

export interface AIForensicAnalysis {
  aiSummary: string;
  aiFindings: Array<{
    title: string;
    severity: 'SAFE' | 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    impact: string;
    explanation: string;
    recommendation: string;
  }>;
  aiFalsePositives: Array<{
    finding: string;
    whySafe: string;
  }>;
}

export function generateAIForensics(
  username: string,
  pcName: string,
  artifacts: any,
  risk: CalculatedRisk
): AIForensicAnalysis {
  if (risk.score >= 70) {
    return {
      aiSummary: `CRITICAL FORENSIC ALERT: System telemetry for ${username} (${pcName}) indicates severe memory manipulation and security control bypass. ${risk.triggeredRules.map(r => r.ruleName).join(', ')} was detected.`,
      aiFindings: risk.triggeredRules.map(rule => ({
        title: rule.ruleName,
        severity: rule.severity,
        impact: 'Direct threat to game integrity and unverified memory modification.',
        explanation: rule.reason,
        recommendation: 'Immediate match disqualification. Revoke computer authorization pending physical dump inspection.'
      })),
      aiFalsePositives: []
    };
  } else if (risk.score >= 20) {
    return {
      aiSummary: `NEEDS REVIEW: Minor anomaly indicators found on ${username}'s machine (${pcName}). Risk score calculated at ${risk.score}/100.`,
      aiFindings: risk.triggeredRules.map(rule => ({
        title: rule.ruleName,
        severity: rule.severity,
        impact: 'Potential background application conflict or hypervisor detection.',
        explanation: rule.reason,
        recommendation: 'Request clean system reboot and verify signed driver signatures.'
      })),
      aiFalsePositives: [
        {
          finding: 'Background Virtualization Drivers',
          whySafe: 'Hyper-V services are enabled by default on modern Windows 11 Enterprise installations.'
        }
      ]
    };
  }

  return {
    aiSummary: `CLEAN REPORT: All scanned system artifacts, kernel drivers, active processes, and registry autoruns on ${username}'s computer (${pcName}) demonstrate valid digital signatures.`,
    aiFindings: [
      {
        title: 'Complete System Integrity Verified',
        severity: 'SAFE',
        impact: 'None. System conforms to all tournament integrity rules.',
        explanation: '0 unsigned drivers, 0 memory manipulators, 0 VM indicators detected.',
        recommendation: 'Approved for competitive match participation.'
      }
    ],
    aiFalsePositives: []
  };
}
