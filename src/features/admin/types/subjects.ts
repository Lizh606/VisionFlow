export type SubjectType = 'device' | 'entitlement' | 'order' | 'run';

export interface SubjectBase {
  id: string;
  type: SubjectType;
  domain: 'studio' | 'selfhosted' | 'marketplace' | 'billing';
  status: string;
  lastUpdated?: string;
  metadata?: Record<string, any>;
}

export interface DeviceSubject extends SubjectBase {
  model: string;
  firmware: string;
  lastSeen: string;
  region: string;
  leaseInfo?: {
    entitlementId: string;
    status: string;
    driftDetected: boolean;
  };
}

export interface EntitlementSubject extends SubjectBase {
  owner: string;
  expiryAt: string;
  seats: number;
  used: number;
  isFrozen: boolean;
}

export interface OrderSubject extends SubjectBase {
  amount: number;
  currency: string;
  customerEmail: string;
  paymentStatus: string;
  refundStatus: string;
  failureReason?: string;
  billingSyncTime: string;
}

export interface RunSubject extends SubjectBase {
  workflowName: string;
  version: string;
  durationMs: number;
  failureReason?: string;
  workspaceId: string;
}

export interface SubjectDetailData {
  snapshot: any;
  sot?: any;
  lastAggregatedAt: string;
  lagMs: number;
  dlqCount: number;
}
