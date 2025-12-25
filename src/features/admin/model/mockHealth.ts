import { HealthKPI, DLQSample, ExternalDependency } from '../types/health';
import dayjs from 'dayjs';

export const mockHealthKPI: HealthKPI = {
  runbusLagMs: 185000, // 3m 5s
  dlqDepth: 12,
  lastAggregatedAt: dayjs().subtract(2, 'minute').toISOString(),
  sseStatus: 'CONNECTED',
  lastSseEventAt: dayjs().subtract(10, 'second').toISOString(),
};

export const mockDLQSamples: DLQSample[] = [
  {
    id: 'msg-8829-xa',
    firstSeenAt: dayjs().subtract(4, 'hour').toISOString(),
    eventType: 'entitlement.lease.drift',
    domain: 'SELF_HOSTED',
    subjectType: 'DEVICE',
    subjectId: 'dev_829305_a',
    retryCount: 5,
    errorSummary: 'BillingAdapter: Network timeout (504) during lease verification.',
    status: 'POISONED',
    rawPayload: {
      action: 'SYNC_LEASE',
      deviceId: 'dev_829305_a',
      tenantId: 'tnt-01',
      version: 'v2.4.1'
    },
    errorStack: 'Error: Connection Timeout\n  at BillingAdapter.request (node:internal/ billing_adapter.js:42)\n  at LeaseSvc.handleEvent (lease_svc.ts:110)',
    headers: { 'x-trace-id': 'tr-99201', 'x-retry-limit': '5' }
  },
  {
    id: 'msg-7710-zb',
    firstSeenAt: dayjs().subtract(10, 'minute').toISOString(),
    eventType: 'order.payment.success',
    domain: 'MARKETPLACE',
    subjectType: 'ORDER',
    subjectId: 'ORD-99201-XAF',
    retryCount: 1,
    errorSummary: 'EntitlementSvc: Concurrent transaction conflict (409).',
    status: 'RETRIABLE',
    rawPayload: { orderId: 'ORD-99201-XAF', amount: 49.99, currency: 'USD' }
  }
];

export const mockExternalDeps: ExternalDependency[] = [
  {
    id: 'dep-1',
    name: 'BillingAdapter (Stripe)',
    status: 'DEGRADED',
    lastCheckedAt: dayjs().subtract(1, 'minute').toISOString(),
    latencyMs: 1420,
    errorNote: 'Upstream rate limiting detected on production endpoints.',
    suggestedAction: 'RETRY'
  },
  {
    id: 'dep-2',
    name: 'EntitlementSvc',
    status: 'HEALTHY',
    lastCheckedAt: dayjs().subtract(30, 'second').toISOString(),
    latencyMs: 42,
    suggestedAction: 'NONE'
  },
  {
    id: 'dep-3',
    name: 'Notifications (SendGrid)',
    status: 'DOWN',
    lastCheckedAt: dayjs().subtract(5, 'minute').toISOString(),
    errorNote: 'DNS Resolution Failure: mail.visionflow.io',
    suggestedAction: 'INCIDENT'
  }
];
