export type AlertSeverity = 'P0' | 'P1' | 'P2';
export type AlertStatus = 'OPEN' | 'ACKNOWLEDGED' | 'SUPPRESSED' | 'RESOLVED';
export type AlertDomain = 'studio' | 'selfhosted' | 'marketplace' | 'billing' | 'usage';

/**
 * AlertTimelineEvent - Lifecycle tracking for Admin Alerts
 */
export interface AlertTimelineEvent {
  status: AlertStatus | 'ACTION_START' | 'ACTION_RESULT' | 'ALERT_STATUS_CHANGED';
  actorType: 'system' | 'operator';
  actorDetail: string;
  timestamp: string;
  message: string;
  comment?: string;
  adminOpId?: string;
  opStatus?: 'SUCCESS' | 'FAILED' | 'PENDING' | 'CONFLICT';
}

export interface AdminAlert {
  id: string;
  severity: AlertSeverity;
  status: AlertStatus;
  domain: AlertDomain;
  type: string;
  subjectType: string;
  subjectId: string;
  impactScope: string;
  firstSeenAt: string;
  lastSeenAt: string;
  occurrenceCount: number;
  description?: string;
  aggregationKey?: string;
  timeline?: AlertTimelineEvent[];
  snapshot?: {
    device?: Record<string, any>;
    lease?: Record<string, any>;
    deployment?: Record<string, any>;
    usage?: Record<string, any>;
  };
}

// Add SoTResult and DiffItem to fix missing export errors in Admin components
/**
 * SoTResult - Source of Truth result for live querying
 */
export interface SoTResult {
  data: {
    device?: Record<string, any>;
    lease?: Record<string, any>;
    deployment?: Record<string, any>;
    usage?: Record<string, any>;
  };
  lastAggregatedAt: string;
  lagMs: number;
  dlqCount: number;
  source: string;
}

/**
 * DiffItem - Represents a data discrepancy between snapshot and SoT
 */
export interface DiffItem {
  group: 'device' | 'lease' | 'deployment' | 'usage';
  field: string;
  snapshot: any;
  sot: any;
  isConsistent: boolean;
}

export interface KeyChangeItem {
  field: string;
  before: any;
  after: any;
}

export interface AdminOpResult {
  adminOpId: string;
  operatorId: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING' | 'CONFLICT';
  
  // UC Terminology
  actionType: string; 
  subjectType: string;
  subjectId: string;
  entitlementId?: string; 
  
  // Timing
  // Fix: timestamp is optional as it represents completion time and is absent for PENDING operations.
  timestamp?: string; // Finished at
  startedAt: string;
  
  // Key Changes
  keyChanges?: KeyChangeItem[];
  
  // Raw Data
  before?: Record<string, any>;
  after?: Record<string, any>;
  
  // Error handling
  errorCode?: string;
  errorSummary?: string;
  errorMessage?: string;
  retryable?: boolean;
}