export type HealthStatus = 'HEALTHY' | 'DEGRADED' | 'DOWN' | 'UNKNOWN';

export interface HealthKPI {
  runbusLagMs: number;
  dlqDepth: number;
  lastAggregatedAt: string;
  sseStatus: 'CONNECTED' | 'DISCONNECTED' | 'RECONNECTING';
  lastSseEventAt: string;
}

export interface DLQSample {
  id: string;
  firstSeenAt: string;
  eventType: string;
  domain: 'STUDIO' | 'SELF_HOSTED' | 'MARKETPLACE' | 'BILLING';
  subjectType: string;
  subjectId: string;
  retryCount: number;
  errorSummary: string;
  status: 'POISONED' | 'RETRIABLE' | 'RESOLVED' | 'PENDING';
  rawPayload: Record<string, any>;
  errorStack?: string;
  headers?: Record<string, string>;
}

export interface ExternalDependency {
  id: string;
  name: string;
  status: HealthStatus;
  lastCheckedAt: string;
  latencyMs?: number;
  errorNote?: string;
  suggestedAction: 'RETRY' | 'MANUAL' | 'INCIDENT' | 'NONE';
}
