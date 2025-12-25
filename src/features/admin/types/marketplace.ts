
export type OrderPaymentStatus = 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED' | 'PARTIALLY_REFUNDED' | 'CHARGEBACK';
export type OrderRefundStatus = 'NONE' | 'PENDING' | 'SUCCESS' | 'FAILED' | 'MANUAL_REQUIRED';

export interface OrderTimelineEvent {
  id: string;
  type: 'PAYMENT' | 'REFUND_ATTEMPT' | 'SYNC' | 'OPERATOR_ACTION' | 'STATUS_CHANGE';
  status: string;
  message: string;
  timestamp: string;
  operatorId?: string;
  adminOpId?: string;
}

export interface AdminOrder {
  id: string;
  workspaceId: string;
  // V1.4: Display name for workspace to improve operational visibility
  workspaceName: string;
  tenantId: string;
  amount: number;
  currency: string;
  paymentStatus: OrderPaymentStatus;
  refundStatus: OrderRefundStatus;
  refundFailureReason?: string;
  lastSyncedAt: string;
  updatedAt: string;
  createdAt: string;
  customerEmail: string;
  listingName: string;
  timeline: OrderTimelineEvent[];
}
