export type SeverityLevel = 'SAFE' | 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ArtifactBase {
  id: string;
  category: string;
  status: 'Clean' | 'Review' | 'Flagged' | 'Suspicious';
  severity: SeverityLevel;
  timestamp: string;
  description: string;
  rawJson?: Record<string, any>;
  aiExplanation?: string;
}

export interface SystemInformationArtifact {
  computerName: string;
  domain: string;
  username: string;
  osVersion: string;
  osBuild: string;
  architecture: string;
  bootTime: string;
  uptime: string;
  biosVendor: string;
  motherboardSerial: string;
  tpmEnabled: boolean;
  secureBootEnabled: boolean;
  virtualizationEnabled: boolean;
}

export interface HardwareArtifact {
  cpuName: string;
  cpuCores: number;
  cpuThreads: number;
  totalRamGb: number;
  ramSpeedMhz: number;
  gpuName: string;
  gpuVramGb: number;
  disks: Array<{
    device: string;
    model: string;
    serial: string;
    sizeGb: number;
    type: string;
  }>;
}

export interface ProcessArtifact extends ArtifactBase {
  pid: number;
  ppid: number;
  name: string;
  path: string;
  commandLine: string;
  publisher: string;
  isSigned: boolean;
  sha256: string;
  cpuPercent: number;
  memoryMb: number;
  parentProcess: string;
}

export interface DriverArtifact extends ArtifactBase {
  name: string;
  displayName: string;
  path: string;
  publisher: string;
  isSigned: boolean;
  sha256: string;
  state: 'Running' | 'Stopped';
  startMode: string;
}

export interface RegistryArtifact extends ArtifactBase {
  hive: string;
  keyPath: string;
  valueName: string;
  valueType: string;
  valueData: string;
  modifiedTime: string;
}

export interface UsbDeviceArtifact extends ArtifactBase {
  deviceInstanceId: string;
  friendlyName: string;
  vendorId: string;
  productId: string;
  serialNumber: string;
  firstConnected: string;
  lastConnected: string;
  driveLetter?: string;
  volumeName?: string;
}

export interface NetworkConnectionArtifact extends ArtifactBase {
  protocol: 'TCP' | 'UDP';
  localAddress: string;
  localPort: number;
  remoteAddress: string;
  remotePort: number;
  processName: string;
  pid: number;
  state: string;
}

export interface DnsCacheArtifact extends ArtifactBase {
  entryName: string;
  recordType: string;
  ipAddresses: string[];
  ttl: number;
}

export interface EventLogArtifact extends ArtifactBase {
  logChannel: 'Security' | 'System' | 'Application' | 'PowerShell';
  eventId: number;
  providerName: string;
  userSid?: string;
  timeCreated: string;
  message: string;
}

export interface VmIndicatorArtifact extends ArtifactBase {
  indicatorType: 'Registry' | 'Driver' | 'MAC Address' | 'BIOS' | 'Process';
  artifactFound: string;
  hypervisorName?: string;
  isVmDetected: boolean;
}

export interface DefenderStatusArtifact {
  antivirusEnabled: boolean;
  realtimeProtectionEnabled: boolean;
  tamperProtectionEnabled: boolean;
  behaviorMonitoringEnabled: boolean;
  cloudProtectionEnabled: boolean;
  definitionsVersion: string;
  lastScanTime: string;
  activeThreatsCount: number;
}

export interface ForensicTimelineItem {
  id: string;
  timestamp: string;
  timeFormatted: string;
  category: string;
  title: string;
  description: string;
  severity: SeverityLevel;
  iconType: 'usb' | 'process' | 'driver' | 'registry' | 'system' | 'file' | 'network' | 'defender';
  details?: Record<string, any>;
}

export interface ForensicReport {
  id: string;
  scanRequestId?: string;
  organizationId: string;
  organizationName: string;
  targetUsername: string;
  targetDiscord?: string;
  pcName: string;
  ipAddress: string;
  osVersion: string;
  cpuSpecs: string;
  ramSpecs: string;
  gpuSpecs: string;
  riskScore: number;
  severity: SeverityLevel;
  createdAt: string;
  systemUptime: string;
  status: 'COMPLETED' | 'RUNNING' | 'PENDING' | 'FLAGGED';
  
  // AI Summary & Analysis
  aiSummary: string;
  aiFindings: Array<{
    title: string;
    severity: SeverityLevel;
    impact: string;
    explanation: string;
    recommendation: string;
  }>;
  aiFalsePositives: Array<{
    finding: string;
    whySafe: string;
  }>;
  
  // Dynamic Configured Risk Rule Hits
  triggeredRules: Array<{
    ruleId: string;
    ruleName: string;
    scoreDelta: number;
    reason: string;
    severity: SeverityLevel;
  }>;

  // Forensic Artifact Collections
  systemInfo: SystemInformationArtifact;
  hardware: HardwareArtifact;
  processes: ProcessArtifact[];
  drivers: DriverArtifact[];
  registryArtifacts: RegistryArtifact[];
  usbHistory: UsbDeviceArtifact[];
  networkConnections: NetworkConnectionArtifact[];
  dnsCache: DnsCacheArtifact[];
  eventLogs: EventLogArtifact[];
  vmIndicators: VmIndicatorArtifact[];
  defenderStatus: DefenderStatusArtifact;
  timeline: ForensicTimelineItem[];
  
  // Simple summary counts
  totalArtifactsCollected: number;
  flaggedArtifactsCount: number;
  unsignedDriversCount: number;
  suspiciousProcessesCount: number;
}
