
export type QuotaPolicyStatus = 'ACTIVE' | 'DRAFT' | 'DISABLED';

export interface QuotaSchemaMetadata {
  quotaLabel: string;
  quotaUnit: string;
  rateLimitLabel: string;
  rateLimitUnit: string;
  supportsEnforcementToggle: boolean;
  lastUsageUpdate: string;
}

export interface QuotaPolicy {
  workspaceId: string;
  workspaceName: string;
  freeQuota: number;
  rateLimit: number;
  scope: 'GLOBAL' | 'REGIONAL';
  status: QuotaPolicyStatus;
  updatedBy: string;
  updatedAt: string;
  version: string;
  metadata: QuotaSchemaMetadata;
}

export interface QuotaHistoryEntry {
  version: string;
  updatedBy: string;
  updatedAt: string;
  reason: string;
  payload: Partial<QuotaPolicy>;
}

export interface QuotaImpactData {
  time: string;
  usage: number;
  limit: number;
  triggers: number;
}
