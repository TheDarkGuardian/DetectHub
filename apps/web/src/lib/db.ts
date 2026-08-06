import { ForensicReport } from '@/types/forensics';
import { MOCK_REPORTS, MOCK_ORGANIZATIONS, MOCK_RISK_RULES } from './mockData';

export interface ScanRequestRecord {
  id: string;
  code: string;
  type: string;
  status: string;
  targetUser: string;
  createdAt: string;
}

// In-memory persistent state store for active SaaS instance
class DatabaseStore {
  private reports: ForensicReport[] = [...MOCK_REPORTS];
  private scanRequests: ScanRequestRecord[] = [
    { id: 'SCN-101', code: 'DETECT-8921-X992', type: 'ONE_TIME', status: 'PENDING', targetUser: 'Vortex_FPS', createdAt: '2026-08-06 16:40' },
    { id: 'SCN-102', code: 'DETECT-PERM-FNATIC', type: 'PERMANENT', status: 'COMPLETED', targetUser: 'Fnatic Tournament Lobby', createdAt: '2026-08-06 12:00' }
  ];
  private riskRules = [...MOCK_RISK_RULES];
  private organizations = [...MOCK_ORGANIZATIONS];

  // Reports API
  getReports(): ForensicReport[] {
    return this.reports;
  }

  getReportById(id: string): ForensicReport | undefined {
    return this.reports.find(r => r.id === id);
  }

  addReport(report: ForensicReport): ForensicReport {
    this.reports.unshift(report);
    return report;
  }

  // Scan Requests API
  getScanRequests(): ScanRequestRecord[] {
    return this.scanRequests;
  }

  addScanRequest(req: { code: string; type: string; targetUser: string }): ScanRequestRecord {
    const newRecord: ScanRequestRecord = {
      id: `SCN-${Math.floor(100 + Math.random() * 900)}`,
      code: req.code,
      type: req.type || 'ONE_TIME',
      status: 'PENDING',
      targetUser: req.targetUser || 'Anonymous User',
      createdAt: new Date().toISOString()
    };
    this.scanRequests.unshift(newRecord);
    return newRecord;
  }

  // Risk Rules API
  getRules() {
    return this.riskRules;
  }

  updateRuleWeight(id: string, newWeight: number) {
    this.riskRules = this.riskRules.map(r => r.id === id ? { ...r, scoreWeight: newWeight } : r);
    return this.riskRules;
  }

  // Orgs API
  getOrganizations() {
    return this.organizations;
  }
}

// Global Singleton
const globalStore = (global as any).__detecthub_db || new DatabaseStore();
if (process.env.NODE_ENV !== 'production') (global as any).__detecthub_db = globalStore;

export const db = globalStore as DatabaseStore;
