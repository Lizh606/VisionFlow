import { SubjectDetailData } from '../types/subjects';
import dayjs from 'dayjs';

export const mockSubjectDetails: Record<string, SubjectDetailData> = {
  'dev_829305_a': {
    lastAggregatedAt: dayjs().subtract(2, 'minute').toISOString(),
    lagMs: 185000,
    dlqCount: 3,
    snapshot: {
      id: 'dev_829305_a',
      type: 'device',
      domain: 'selfhosted',
      status: 'OFFLINE',
      model: 'Jetson-Orin-Nano',
      firmware: 'v2.4.1',
      lastSeen: '5m ago',
      region: 'us-east-1',
      leaseInfo: { entitlementId: 'ENT-9920', status: 'ACTIVE', driftDetected: false }
    },
    sot: {
      id: 'dev_829305_a',
      type: 'device',
      domain: 'selfhosted',
      status: 'OFFLINE',
      model: 'Jetson-Orin-Nano',
      firmware: 'v2.4.1',
      lastSeen: '7m ago',
      region: 'us-east-1',
      leaseInfo: { entitlementId: 'ENT-9920', status: 'DRIFT_DETECTED', driftDetected: true }
    }
  },
  'ENT-9920': {
    lastAggregatedAt: dayjs().subtract(1, 'minute').toISOString(),
    lagMs: 45000,
    dlqCount: 0,
    snapshot: {
      id: 'ENT-9920',
      type: 'entitlement',
      domain: 'selfhosted',
      status: 'ACTIVE',
      owner: 'Alpha Corp',
      expiryAt: '2025-12-31',
      seats: 10,
      used: 2,
      isFrozen: false
    }
  },
  'ORD-99201-XAF': {
    lastAggregatedAt: dayjs().subtract(5, 'minute').toISOString(),
    lagMs: 0,
    dlqCount: 1,
    snapshot: {
      id: 'ORD-99201-XAF',
      type: 'order',
      domain: 'marketplace',
      status: 'PAID',
      amount: 49.99,
      currency: 'USD',
      customerEmail: 'ops@alpha-corp.com',
      paymentStatus: 'PAID',
      refundStatus: 'FAILED',
      failureReason: 'Stripe: original_transaction_too_old',
      billingSyncTime: dayjs().subtract(15, 'minute').toISOString()
    }
  }
};
