import { QuotaPolicy, QuotaHistoryEntry, QuotaImpactData } from '../types/quota';
import dayjs from 'dayjs';

export const mockQuotaPolicies: QuotaPolicy[] = [
  {
    workspaceId: 'ws-001',
    workspaceName: 'Vision Core R&D',
    freeQuota: 5000,
    rateLimit: 60,
    scope: 'GLOBAL',
    status: 'ACTIVE',
    updatedBy: 'admin-ops-01',
    updatedAt: dayjs().subtract(2, 'day').toISOString(),
    version: 'v1.2.0',
    // Added missing metadata property to satisfy QuotaPolicy interface
    metadata: {
      quotaLabel: 'Monthly Free Images',
      quotaUnit: 'IMG',
      rateLimitLabel: 'Max Inferences per Minute',
      rateLimitUnit: 'RPM',
      supportsEnforcementToggle: true,
      lastUsageUpdate: dayjs().subtract(10, 'minute').toISOString()
    }
  },
  {
    workspaceId: 'ws-002',
    workspaceName: 'Retail-Demo-Lab',
    freeQuota: 1000,
    rateLimit: 20,
    scope: 'REGIONAL',
    status: 'DRAFT',
    updatedBy: 'admin-ops-02',
    updatedAt: dayjs().subtract(1, 'hour').toISOString(),
    version: 'v0.9.5-beta',
    // Added missing metadata property to satisfy QuotaPolicy interface
    metadata: {
      quotaLabel: 'Standard Monthly Quota',
      quotaUnit: 'IMG',
      rateLimitLabel: 'Global Rate Limit',
      rateLimitUnit: 'RPM',
      supportsEnforcementToggle: false,
      lastUsageUpdate: dayjs().subtract(25, 'minute').toISOString()
    }
  }
];

export const mockQuotaHistory: QuotaHistoryEntry[] = [
  {
    version: 'v1.2.0',
    updatedBy: 'admin-ops-01',
    updatedAt: dayjs().subtract(2, 'day').toISOString(),
    reason: 'Upgraded limit for holiday season traffic surge.',
    payload: { rateLimit: 60, freeQuota: 5000 }
  },
  {
    version: 'v1.1.0',
    updatedBy: 'system',
    updatedAt: dayjs().subtract(1, 'month').toISOString(),
    reason: 'Standard baseline initialization.',
    payload: { rateLimit: 30, freeQuota: 1000 }
  }
];

// Fixed mockImpactData to include required triggers property
export const mockImpactData: QuotaImpactData[] = Array.from({ length: 24 }).map((_, i) => {
  const usage = Math.floor(Math.random() * 40) + 10;
  const limit = 60;
  return {
    time: `${i}:00`,
    usage,
    limit,
    triggers: usage > limit ? 1 : 0
  };
});