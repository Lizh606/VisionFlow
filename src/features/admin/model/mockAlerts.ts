
import { AdminAlert } from '../types/alerts';
import dayjs from 'dayjs';

export const mockAlerts: AdminAlert[] = [
  // --- Page 1 Highlights ---
  {
    id: 'alt-001',
    severity: 'P0',
    status: 'OPEN',
    domain: 'studio',
    type: 'INFERENCE_ENGINE_CRASH',
    subjectType: 'RUNTIME_POD',
    subjectId: 'rt-prod-v2-8829',
    impactScope: 'Workspace: Default (WS-01)',
    firstSeenAt: dayjs().subtract(2, 'hour').toISOString(),
    lastSeenAt: dayjs().subtract(5, 'minute').toISOString(),
    occurrenceCount: 142
  },
  {
    id: 'alt-002',
    severity: 'P0',
    status: 'ACKNOWLEDGED',
    domain: 'marketplace',
    type: 'STRIPE_API_UNAVAILABLE',
    subjectType: 'EXTERNAL_SERVICE',
    subjectId: 'stripe-cloud-gateway',
    impactScope: 'Global checkout flows affected',
    firstSeenAt: dayjs().subtract(1, 'hour').toISOString(),
    lastSeenAt: dayjs().subtract(15, 'minute').toISOString(),
    occurrenceCount: 84
  },
  {
    id: 'alt-003',
    severity: 'P0',
    status: 'RESOLVED',
    domain: 'billing',
    type: 'DATABASE_REPLICATION_LAG',
    subjectType: 'POSTGRES_CLUSTER',
    subjectId: 'pg-billing-main',
    impactScope: 'Transaction consistency risk',
    firstSeenAt: dayjs().subtract(12, 'hour').toISOString(),
    lastSeenAt: dayjs().subtract(11, 'hour').toISOString(),
    occurrenceCount: 1
  },
  {
    id: 'alt-004',
    severity: 'P1',
    status: 'SUPPRESSED',
    domain: 'studio',
    type: 'HIGH_LATENCY_DETECTION',
    subjectType: 'K8S_SERVICE',
    subjectId: 'studio-api-internal',
    impactScope: 'Region: US-East',
    firstSeenAt: dayjs().subtract(1, 'day').toISOString(),
    lastSeenAt: dayjs().subtract(2, 'hour').toISOString(),
    occurrenceCount: 1250
  },
  {
    id: 'alt-005',
    severity: 'P2',
    status: 'OPEN',
    domain: 'selfhosted',
    type: 'AGENT_UPGRADE_FAILED',
    subjectType: 'EDGE_NODE',
    subjectId: 'node-sh-992',
    impactScope: 'Factory Floor A',
    firstSeenAt: dayjs().subtract(5, 'hour').toISOString(),
    lastSeenAt: dayjs().subtract(4, 'hour').toISOString(),
    occurrenceCount: 3
  },
  {
    id: 'alt-006',
    severity: 'P1',
    status: 'ACKNOWLEDGED',
    domain: 'usage',
    type: 'STORAGE_QUOTA_90_PCT',
    subjectType: 'S3_BUCKET',
    subjectId: 'vf-artifacts-prod',
    impactScope: 'Asset Storage Service',
    firstSeenAt: dayjs().subtract(2, 'day').toISOString(),
    lastSeenAt: dayjs().subtract(1, 'day').toISOString(),
    occurrenceCount: 1
  },
  {
    id: 'alt-007',
    severity: 'P2',
    status: 'RESOLVED',
    domain: 'marketplace',
    type: 'METADATA_SYNC_DELAY',
    subjectType: 'CATALOG_API',
    subjectId: 'mkt-catalog-svc',
    impactScope: 'Listing Updates',
    firstSeenAt: dayjs().subtract(10, 'minute').toISOString(),
    lastSeenAt: dayjs().subtract(2, 'minute').toISOString(),
    occurrenceCount: 5
  },
  {
    id: 'alt-008',
    severity: 'P0',
    status: 'OPEN',
    domain: 'selfhosted',
    type: 'LICENSE_EXPIRY_CRITICAL',
    subjectType: 'LICENSE_KEY',
    subjectId: 'VF-PRO-B82',
    impactScope: 'Tenant: Alpha Corp',
    firstSeenAt: dayjs().subtract(4, 'day').toISOString(),
    lastSeenAt: dayjs().subtract(1, 'minute').toISOString(),
    occurrenceCount: 1
  },
  {
    id: 'alt-009',
    severity: 'P1',
    status: 'OPEN',
    domain: 'billing',
    type: 'QUOTA_OVERAGE_DETECTED',
    subjectType: 'TENANT',
    subjectId: 'tnt-88293',
    impactScope: 'Enterprise Account A',
    firstSeenAt: dayjs().subtract(5, 'minute').toISOString(),
    lastSeenAt: dayjs().subtract(1, 'minute').toISOString(),
    occurrenceCount: 1
  },
  {
    id: 'alt-010',
    severity: 'P2',
    status: 'SUPPRESSED',
    domain: 'usage',
    type: 'LOG_BUFFER_FULL',
    subjectType: 'FLUENT_BIT',
    subjectId: 'fb-agent-01',
    impactScope: 'Observability Stack',
    firstSeenAt: dayjs().subtract(3, 'day').toISOString(),
    lastSeenAt: dayjs().subtract(2, 'day').toISOString(),
    occurrenceCount: 88
  },

  // --- Page 2 & More ---
  ...Array.from({ length: 25 }).map((_, i) => ({
    id: `alt-gen-${i + 11}`,
    severity: (['P0', 'P1', 'P2'][i % 3] as any),
    status: (['OPEN', 'ACKNOWLEDGED', 'SUPPRESSED', 'RESOLVED'][i % 4] as any),
    domain: (['studio', 'selfhosted', 'marketplace', 'billing', 'usage'][i % 5] as any),
    type: `SYSTEM_EVENT_TYPE_${i + 11}`,
    subjectType: 'VIRTUAL_RESOURCE',
    subjectId: `res-auto-${Math.random().toString(36).substring(7)}`,
    impactScope: `Automated testing coverage group ${i}`,
    firstSeenAt: dayjs().subtract(i + 5, 'day').toISOString(),
    lastSeenAt: dayjs().subtract(i, 'hour').toISOString(),
    occurrenceCount: Math.floor(Math.random() * 100) + 1
  }))
];
