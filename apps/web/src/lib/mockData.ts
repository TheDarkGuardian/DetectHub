import { SeverityLevel } from '@/types/forensics';

export interface MockOrganization {
  id: string;
  name: string;
  slug: string;
  memberCount: number;
  activeScansToday: number;
  brandingColor: string;
}

export const MOCK_ORGANIZATIONS: MockOrganization[] = [
  { id: 'org-1', name: 'Fnatic Competitive Esports', slug: 'fnatic-esports', memberCount: 42, activeScansToday: 18, brandingColor: '#22C55E' },
  { id: 'org-2', name: 'Apex Premier League', slug: 'apex-league', memberCount: 128, activeScansToday: 34, brandingColor: '#3B82F6' },
  { id: 'org-3', name: 'Vanguard Security Operations', slug: 'vanguard-sec', memberCount: 19, activeScansToday: 8, brandingColor: '#EAB308' },
];

export const MOCK_RISK_RULES = [
  { id: 'rule-1', name: 'Unsigned Kernel Driver Loaded', category: 'Drivers', condition: 'driver.isSigned == false', scoreWeight: 40, severity: 'HIGH' as SeverityLevel, description: 'Detects kernel or user mode drivers lacking valid WHQL digital signatures.' },
  { id: 'rule-2', name: 'Cheat Engine / Memory Modifier Detected', category: 'Processes', condition: 'process.name MATCHES /cheatengine|x64dbg|processhacker/i', scoreWeight: 80, severity: 'CRITICAL' as SeverityLevel, description: 'Detects active process execution of memory manipulation software.' },
  { id: 'rule-3', name: 'Unverified Startup Registry Entry', category: 'Autoruns', condition: 'registry.keyPath MATCHES /Run|RunOnce/ AND path IN /Temp|AppData/', scoreWeight: 20, severity: 'MEDIUM' as SeverityLevel, description: 'Startup entries executing binaries located inside volatile user directories.' },
  { id: 'rule-4', name: 'Windows Defender Real-Time Protection Disabled', category: 'Security', condition: 'defender.realtimeProtectionEnabled == false', scoreWeight: 50, severity: 'HIGH' as SeverityLevel, description: 'Alerts when core OS antivirus protection has been manually or maliciously suspended.' },
  { id: 'rule-5', name: 'Virtual Machine / Hypervisor Environment', category: 'VM/Sandbox', condition: 'vmIndicators.isVmDetected == true', scoreWeight: 35, severity: 'MEDIUM' as SeverityLevel, description: 'Flags system execution inside VMware, VirtualBox, or custom Hyper-V sandboxes.' },
  { id: 'rule-6', name: 'Recent USB Flash Drive Activity', category: 'Hardware', condition: 'usb.lastConnected WITHIN 1h OF match_start', scoreWeight: 15, severity: 'LOW' as SeverityLevel, description: 'Tracks USB drive insertion within 60 minutes of match initialization.' }
];

export const MOCK_REPORTS: any[] = [];
