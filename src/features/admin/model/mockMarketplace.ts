
import { AdminOrder } from '../types/marketplace';
import dayjs from 'dayjs';

export const mockAdminOrders: AdminOrder[] = [
  {
    id: 'ORD-99201-XAF',
    workspaceId: 'ws-001',
    // Added workspaceName to satisfy AdminOrder interface requirement
    workspaceName: 'Vision Core R&D',
    tenantId: 'tnt-alpha',
    amount: 49.99,
    currency: 'USD',
    paymentStatus: 'PAID',
    refundStatus: 'FAILED',
    refundFailureReason: 'Stripe API: original_transaction_too_old (Code: 400)',
    lastSyncedAt: dayjs().subtract(15, 'minute').toISOString(),
    updatedAt: dayjs().subtract(15, 'minute').toISOString(),
    createdAt: dayjs().subtract(45, 'day').toISOString(),
    customerEmail: 'ops@alpha-corp.com',
    listingName: 'Advanced Traffic Counter',
    timeline: [
      { id: 'ev-3', type: 'REFUND_ATTEMPT', status: 'FAILED', message: 'Refund request rejected by upstream processor.', timestamp: dayjs().subtract(15, 'minute').toISOString() },
      { id: 'ev-2', type: 'SYNC', status: 'SUCCESS', message: 'BillingAdapter synchronized ledger state.', timestamp: dayjs().subtract(1, 'hour').toISOString() },
      { id: 'ev-1', type: 'PAYMENT', status: 'SUCCESS', message: 'Initial payment captured successfully.', timestamp: dayjs().subtract(45, 'day').toISOString() }
    ]
  },
  {
    id: 'ORD-88123-ZZQ',
    workspaceId: 'ws-002',
    // Added workspaceName to satisfy AdminOrder interface requirement
    workspaceName: 'Retail-Demo-Lab',
    tenantId: 'tnt-beta',
    amount: 129.00,
    currency: 'USD',
    paymentStatus: 'PAID',
    refundStatus: 'NONE',
    lastSyncedAt: dayjs().subtract(2, 'hour').toISOString(),
    updatedAt: dayjs().subtract(2, 'hour').toISOString(),
    createdAt: dayjs().subtract(10, 'day').toISOString(),
    customerEmail: 'dev-lead@beta-vision.io',
    listingName: 'PPE Safety Sentinel',
    timeline: [
      { id: 'ev-10', type: 'PAYMENT', status: 'SUCCESS', message: 'Payment confirmed via Stripe Hook.', timestamp: dayjs().subtract(10, 'day').toISOString() }
    ]
  }
];
