
import { AdminOpResult } from './alerts';

export type AuditStatus = 'SUCCESS' | 'FAILED' | 'PENDING';

export interface DownstreamCall {
  serviceName: string;
  endpoint: string;
  durationMs: number;
  httpCode: number;
  traceId: string;
  timestamp: string;
}

/**
 * AuditLogEntry - Extended information for the immutable audit trail
 */
export interface AuditLogEntry extends AdminOpResult {
  reason?: string;
  // Fix: Add comment property to support operation justifications in audit views (e.g., Acknowledge or Suppress actions)
  comment?: string;
  ticketId?: string;
  idempotencyKey: string;
  requestPayload: Record<string, any>;
  responsePayload?: Record<string, any>;
  responseCode?: string;
  responseMessage?: string;
  downstreamCalls?: DownstreamCall[];
}

export interface AuditExportTask {
  id: string;
  status: 'PREPARING' | 'READY' | 'FAILED';
  format: 'CSV' | 'JSON';
  filters: Record<string, any>;
  createdBy: string;
  createdAt: string;
  downloadUrl?: string;
  errorSummary?: string;
}
