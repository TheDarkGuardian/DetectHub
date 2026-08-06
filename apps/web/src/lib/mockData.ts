import { ForensicReport, SeverityLevel } from '@/types/forensics';

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

export const MOCK_REPORTS: ForensicReport[] = [
  {
    id: 'RPT-2026-8891',
    organizationId: 'org-1',
    organizationName: 'Fnatic Competitive Esports',
    targetUsername: 'Vortex_FPS',
    targetDiscord: 'Vortex#4092',
    pcName: 'DESKTOP-VORTEX99',
    ipAddress: '192.168.1.142',
    osVersion: 'Windows 11 Pro 23H2 (Build 22631.3880)',
    cpuSpecs: 'AMD Ryzen 7 7800X3D 8-Core Processor',
    ramSpecs: '32.0 GB DDR5 @ 6000 MHz',
    gpuSpecs: 'NVIDIA GeForce RTX 4080 SUPER (16 GB)',
    riskScore: 85,
    severity: 'CRITICAL',
    createdAt: '2026-08-06T16:45:12Z',
    systemUptime: '4 hours 12 minutes',
    status: 'FLAGGED',
    
    totalArtifactsCollected: 1482,
    flaggedArtifactsCount: 4,
    unsignedDriversCount: 1,
    suspiciousProcessesCount: 2,

    aiSummary: "CRITICAL ALERT: System exhibits high-risk memory manipulation indicators. An unsigned kernel driver 'memrw64.sys' was loaded into kernel space following a USB flash drive connection. Cheat Engine 7.5 process was launched at 16:25:01, and Windows Defender Real-time Protection was subsequently disabled.",
    
    aiFindings: [
      {
        title: 'Unsigned Kernel Driver Injected',
        severity: 'CRITICAL',
        impact: 'Provides arbitrary ring-0 kernel read/write memory access bypassing Windows Kernel DMA Protection.',
        explanation: 'Driver file memrw64.sys at C:\\Windows\\System32\\drivers\\memrw64.sys is missing a valid Microsoft WHQL certificate.',
        recommendation: 'Immediate match disqualification. Revoke computer authorization pending physical dump inspection.'
      },
      {
        title: 'Cheat Engine Executable Activity',
        severity: 'HIGH',
        impact: 'Direct process memory scanning and variable modification.',
        explanation: 'Executable cheatengine-x86_64.exe was spawned with elevated PID 8412.',
        recommendation: 'Cross-reference memory offset timestamps against game client memory regions.'
      },
      {
        title: 'Windows Defender Real-Time Protection Suspended',
        severity: 'HIGH',
        impact: 'Exposes system to undetected malicious payloads and unverified DLL injectors.',
        explanation: 'Antivirus status query reported realtimeProtectionEnabled = false.',
        recommendation: 'Require system reboot with Defender Tamper Protection enforced.'
      }
    ],

    aiFalsePositives: [
      {
        finding: 'ProcessHacker2.exe in AppData',
        whySafe: 'User states it was installed for Discord RPC overlay debugging; however elevated handle requests match known memory probes.'
      }
    ],

    triggeredRules: [
      { ruleId: 'rule-2', ruleName: 'Cheat Engine / Memory Modifier Detected', scoreDelta: 80, reason: 'Active process cheatengine-x86_64.exe (PID 8412) detected.', severity: 'CRITICAL' },
      { ruleId: 'rule-1', ruleName: 'Unsigned Kernel Driver Loaded', scoreDelta: 40, reason: 'Kernel driver memrw64.sys lacks WHQL digital signature.', severity: 'HIGH' },
      { ruleId: 'rule-4', ruleName: 'Windows Defender Disabled', scoreDelta: 50, reason: 'Real-time protection turned off via Group Policy registry key.', severity: 'HIGH' }
    ],

    systemInfo: {
      computerName: 'DESKTOP-VORTEX99',
      domain: 'WORKGROUP',
      username: 'VortexAdmin',
      osVersion: 'Windows 11 Pro 23H2',
      osBuild: '22631.3880',
      architecture: 'x64-based PC',
      bootTime: '2026-08-06 12:33:10',
      uptime: '4h 12m',
      biosVendor: 'ASUSTeK COMPUTER INC.',
      motherboardSerial: '240192849102834',
      tpmEnabled: true,
      secureBootEnabled: true,
      virtualizationEnabled: true
    },

    hardware: {
      cpuName: 'AMD Ryzen 7 7800X3D 8-Core Processor',
      cpuCores: 8,
      cpuThreads: 16,
      totalRamGb: 32,
      ramSpeedMhz: 6000,
      gpuName: 'NVIDIA GeForce RTX 4080 SUPER',
      gpuVramGb: 16,
      disks: [
        { device: 'Disk 0 (C:)', model: 'Samsung SSD 990 PRO 2TB', serial: 'S71VNJ0W819230', sizeGb: 2000, type: 'NVMe SSD' },
        { device: 'Disk 1 (E:)', model: 'SanDisk Ultra USB 3.0', serial: 'USB-49102-SD', sizeGb: 64, type: 'Removable USB' }
      ]
    },

    processes: [
      {
        id: 'proc-1',
        category: 'Processes',
        status: 'Flagged',
        severity: 'CRITICAL',
        timestamp: '16:25:01',
        description: 'Memory alteration executable executing under user administrator context.',
        pid: 8412,
        ppid: 1204,
        name: 'cheatengine-x86_64.exe',
        path: 'C:\\Users\\VortexAdmin\\AppData\\Local\\Temp\\ce_v75\\cheatengine-x86_64.exe',
        commandLine: '"C:\\Users\\VortexAdmin\\AppData\\Local\\Temp\\ce_v75\\cheatengine-x86_64.exe" -attach 4912',
        publisher: 'Unknown / Unsigned',
        isSigned: false,
        sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
        cpuPercent: 4.2,
        memoryMb: 184,
        parentProcess: 'explorer.exe'
      },
      {
        id: 'proc-2',
        category: 'Processes',
        status: 'Clean',
        severity: 'SAFE',
        timestamp: '12:33:15',
        description: 'Standard System Explorer process.',
        pid: 1204,
        ppid: 988,
        name: 'explorer.exe',
        path: 'C:\\Windows\\explorer.exe',
        commandLine: 'C:\\Windows\\explorer.exe',
        publisher: 'Microsoft Windows',
        isSigned: true,
        sha256: 'a3b5c7d9e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8',
        cpuPercent: 0.8,
        memoryMb: 92,
        parentProcess: 'userinit.exe'
      }
    ],

    drivers: [
      {
        id: 'drv-1',
        category: 'Drivers',
        status: 'Flagged',
        severity: 'HIGH',
        timestamp: '16:22:30',
        description: 'Kernel driver without valid digital signature.',
        name: 'memrw64.sys',
        displayName: 'Direct Memory RW Access Driver',
        path: 'C:\\Windows\\System32\\drivers\\memrw64.sys',
        publisher: 'Unverified Third-Party',
        isSigned: false,
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        state: 'Running',
        startMode: 'Manual'
      },
      {
        id: 'drv-2',
        category: 'Drivers',
        status: 'Clean',
        severity: 'SAFE',
        timestamp: '12:33:12',
        description: 'NVIDIA Graphics Display Kernel Driver.',
        name: 'nvlddmkm.sys',
        displayName: 'NVIDIA Windows Kernel Mode Driver',
        path: 'C:\\Windows\\System32\\drivers\\nvlddmkm.sys',
        publisher: 'NVIDIA Corporation',
        isSigned: true,
        sha256: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
        state: 'Running',
        startMode: 'System'
      }
    ],

    registryArtifacts: [
      {
        id: 'reg-1',
        category: 'Registry',
        status: 'Suspicious',
        severity: 'MEDIUM',
        timestamp: '16:36:12',
        description: 'Auto-start registry key pointing to temporary executable.',
        hive: 'HKEY_CURRENT_USER',
        keyPath: 'Software\\Microsoft\\Windows\\CurrentVersion\\Run',
        valueName: 'WinServiceUpdate',
        valueType: 'REG_SZ',
        valueData: 'C:\\Users\\VortexAdmin\\AppData\\Local\\Temp\\update_helper.exe',
        modifiedTime: '2026-08-06 16:36:12'
      }
    ],

    usbHistory: [
      {
        id: 'usb-1',
        category: 'USB History',
        status: 'Review',
        severity: 'MEDIUM',
        timestamp: '16:20:05',
        description: 'Removable USB mass storage device attached.',
        deviceInstanceId: 'USB\\VID_0781&PID_5581\\SanDisk_Ultra_49102',
        friendlyName: 'SanDisk Ultra USB 3.0 Flash Drive',
        vendorId: '0781',
        productId: '5581',
        serialNumber: 'USB-49102-SD',
        firstConnected: '2026-08-06 16:20:05',
        lastConnected: '2026-08-06 16:20:05',
        driveLetter: 'E:',
        volumeName: 'SETTINGS_BOOT'
      }
    ],

    networkConnections: [
      {
        id: 'net-1',
        category: 'Network',
        status: 'Clean',
        severity: 'INFO',
        timestamp: '16:40:10',
        description: 'Active HTTPS telemetry connection to DetectHub backend.',
        protocol: 'TCP',
        localAddress: '192.168.1.142',
        localPort: 54102,
        remoteAddress: '104.21.48.91',
        remotePort: 443,
        processName: 'DetectHubAgent.exe',
        pid: 3108,
        state: 'ESTABLISHED'
      }
    ],

    dnsCache: [
      {
        id: 'dns-1',
        category: 'DNS Cache',
        status: 'Clean',
        severity: 'INFO',
        timestamp: '16:42:00',
        description: 'DNS lookup for official anti-cheat server.',
        entryName: 'api.detecthub.io',
        recordType: 'A',
        ipAddresses: ['104.21.48.91', '172.67.190.12'],
        ttl: 300
      }
    ],

    eventLogs: [
      {
        id: 'evt-1',
        category: 'Event Log',
        status: 'Review',
        severity: 'MEDIUM',
        timestamp: '16:31:00',
        description: 'System restart initiated by user request.',
        logChannel: 'System',
        eventId: 1074,
        providerName: 'User32',
        timeCreated: '2026-08-06 16:31:00',
        message: 'The process C:\\Windows\\System32\\shutdown.exe initiated restart of computer DESKTOP-VORTEX99 on behalf of user VortexAdmin.'
      },
      {
        id: 'evt-2',
        category: 'Event Log',
        status: 'Flagged',
        severity: 'HIGH',
        timestamp: '16:24:10',
        description: 'Windows Defender Real-time Protection state changed to Disabled.',
        logChannel: 'Security',
        eventId: 5001,
        providerName: 'Microsoft-Windows-Windows Defender',
        timeCreated: '2026-08-06 16:24:10',
        message: 'Antivirus real-time protection feature was disabled.'
      }
    ],

    vmIndicators: [
      {
        id: 'vm-1',
        category: 'VM Check',
        status: 'Clean',
        severity: 'SAFE',
        timestamp: '16:45:00',
        description: 'Physical bare-metal hardware confirmed. No VM hypervisors detected.',
        indicatorType: 'BIOS',
        artifactFound: 'ASUSTeK Genuine BIOS',
        isVmDetected: false
      }
    ],

    defenderStatus: {
      antivirusEnabled: true,
      realtimeProtectionEnabled: false,
      tamperProtectionEnabled: true,
      behaviorMonitoringEnabled: false,
      cloudProtectionEnabled: true,
      definitionsVersion: '1.415.289.0',
      lastScanTime: '2026-08-06 10:15:00',
      activeThreatsCount: 0
    },

    timeline: [
      {
        id: 'tl-1',
        timestamp: '16:20:05',
        timeFormatted: '16:20:05',
        category: 'Hardware',
        title: 'USB Device Connected',
        description: 'SanDisk Ultra USB 3.0 (E:) mounted to system.',
        severity: 'MEDIUM',
        iconType: 'usb'
      },
      {
        id: 'tl-2',
        timestamp: '16:22:30',
        timeFormatted: '16:22:30',
        category: 'Drivers',
        title: 'Unsigned Kernel Driver Loaded',
        description: 'memrw64.sys executed with ring-0 privileges.',
        severity: 'CRITICAL',
        iconType: 'driver'
      },
      {
        id: 'tl-3',
        timestamp: '16:24:10',
        timeFormatted: '16:24:10',
        category: 'Security',
        title: 'Windows Defender Disabled',
        description: 'Real-time protection features suspended.',
        severity: 'HIGH',
        iconType: 'defender'
      },
      {
        id: 'tl-4',
        timestamp: '16:25:01',
        timeFormatted: '16:25:01',
        category: 'Processes',
        title: 'Cheat Engine Executable Launched',
        description: 'cheatengine-x86_64.exe (PID 8412) spawned.',
        severity: 'CRITICAL',
        iconType: 'process'
      },
      {
        id: 'tl-5',
        timestamp: '16:31:00',
        timeFormatted: '16:31:00',
        category: 'System',
        title: 'System Restart Executed',
        description: 'Warm reboot triggered via shutdown command.',
        severity: 'INFO',
        iconType: 'system'
      },
      {
        id: 'tl-6',
        timestamp: '16:34:20',
        timeFormatted: '16:34:20',
        category: 'Filesystem',
        title: 'Downloads Folder Modified',
        description: 'Executable payload extracted to user Temp directory.',
        severity: 'LOW',
        iconType: 'file'
      },
      {
        id: 'tl-7',
        timestamp: '16:36:12',
        timeFormatted: '16:36:12',
        category: 'Registry',
        title: 'Registry Startup Key Created',
        description: 'HKCU\\...\\Run key set to update_helper.exe',
        severity: 'MEDIUM',
        iconType: 'registry'
      }
    ]
  },
  {
    id: 'RPT-2026-8892',
    organizationId: 'org-1',
    organizationName: 'Fnatic Competitive Esports',
    targetUsername: 'ScreaM_AIM',
    targetDiscord: 'ScreaM#1337',
    pcName: 'COMPETITOR-PC-01',
    ipAddress: '192.168.1.189',
    osVersion: 'Windows 11 Enterprise 23H2 (Build 22631.3900)',
    cpuSpecs: 'Intel Core i9-14900KS 24-Core Processor',
    ramSpecs: '64.0 GB DDR5 @ 7200 MHz',
    gpuSpecs: 'NVIDIA GeForce RTX 4090 (24 GB)',
    riskScore: 8,
    severity: 'SAFE',
    createdAt: '2026-08-06T15:10:00Z',
    systemUptime: '2 hours 45 minutes',
    status: 'COMPLETED',
    
    totalArtifactsCollected: 1620,
    flaggedArtifactsCount: 0,
    unsignedDriversCount: 0,
    suspiciousProcessesCount: 0,

    aiSummary: "CLEAN REPORT: All scanned system artifacts, kernel drivers, active processes, and registry autoruns demonstrate valid digital signatures from verified vendors. Windows Defender Real-Time Protection and Secure Boot are fully operational.",
    
    aiFindings: [
      {
        title: 'Complete System Integrity Verified',
        severity: 'SAFE',
        impact: 'None. System conforms to all tournament integrity rules.',
        explanation: '0 unsigned drivers, 0 memory manipulators, 0 VM indicators detected.',
        recommendation: 'Approved for competitive match participation.'
      }
    ],

    aiFalsePositives: [],
    triggeredRules: [],

    systemInfo: {
      computerName: 'COMPETITOR-PC-01',
      domain: 'WORKGROUP',
      username: 'Player1',
      osVersion: 'Windows 11 Enterprise 23H2',
      osBuild: '22631.3900',
      architecture: 'x64-based PC',
      bootTime: '2026-08-06 12:25:00',
      uptime: '2h 45m',
      biosVendor: 'MSI',
      motherboardSerial: 'MSI-7D91-0021',
      tpmEnabled: true,
      secureBootEnabled: true,
      virtualizationEnabled: false
    },

    hardware: {
      cpuName: 'Intel Core i9-14900KS 24-Core',
      cpuCores: 24,
      cpuThreads: 32,
      totalRamGb: 64,
      ramSpeedMhz: 7200,
      gpuName: 'NVIDIA GeForce RTX 4090',
      gpuVramGb: 24,
      disks: [
        { device: 'Disk 0 (C:)', model: 'WD_BLACK SN850X 2TB', serial: 'WDS200T2X0E', sizeGb: 2000, type: 'NVMe SSD' }
      ]
    },

    processes: [
      {
        id: 'proc-101',
        category: 'Processes',
        status: 'Clean',
        severity: 'SAFE',
        timestamp: '12:25:10',
        description: 'Discord Desktop Application.',
        pid: 4902,
        ppid: 1204,
        name: 'Discord.exe',
        path: 'C:\\Users\\Player1\\AppData\\Local\\Discord\\app-1.0.9028\\Discord.exe',
        commandLine: '"C:\\Users\\Player1\\AppData\\Local\\Discord\\app-1.0.9028\\Discord.exe"',
        publisher: 'Discord Inc.',
        isSigned: true,
        sha256: '6c5890833a6b8e3a268393d258b3f12443a532f831b29a8a6142e3914a24f0c4',
        cpuPercent: 1.1,
        memoryMb: 310,
        parentProcess: 'explorer.exe'
      }
    ],

    drivers: [
      {
        id: 'drv-101',
        category: 'Drivers',
        status: 'Clean',
        severity: 'SAFE',
        timestamp: '12:25:05',
        description: 'Intel Ethernet Controller Driver.',
        name: 'e2fexpress.sys',
        displayName: 'Intel Network Kernel Driver',
        path: 'C:\\Windows\\System32\\drivers\\e2fexpress.sys',
        publisher: 'Intel Corporation',
        isSigned: true,
        sha256: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
        state: 'Running',
        startMode: 'System'
      }
    ],

    registryArtifacts: [],
    usbHistory: [],
    networkConnections: [],
    dnsCache: [],
    eventLogs: [],
    vmIndicators: [
      {
        id: 'vm-101',
        category: 'VM Check',
        status: 'Clean',
        severity: 'SAFE',
        timestamp: '15:10:00',
        description: 'Physical hardware detected.',
        indicatorType: 'BIOS',
        artifactFound: 'MSI Genuine BIOS',
        isVmDetected: false
      }
    ],

    defenderStatus: {
      antivirusEnabled: true,
      realtimeProtectionEnabled: true,
      tamperProtectionEnabled: true,
      behaviorMonitoringEnabled: true,
      cloudProtectionEnabled: true,
      definitionsVersion: '1.415.290.0',
      lastScanTime: '2026-08-06 14:00:00',
      activeThreatsCount: 0
    },

    timeline: [
      {
        id: 'tl-101',
        timestamp: '12:25:00',
        timeFormatted: '12:25:00',
        category: 'System',
        title: 'System Boot Initialized',
        description: 'Secure Boot & TPM 2.0 validated successfully.',
        severity: 'SAFE',
        iconType: 'system'
      },
      {
        id: 'tl-102',
        timestamp: '15:10:00',
        timeFormatted: '15:10:00',
        category: 'System',
        title: 'DetectHub Scan Executed',
        description: 'Automated 1,620 artifact collection completed cleanly.',
        severity: 'SAFE',
        iconType: 'defender'
      }
    ]
  }
];
