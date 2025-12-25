import { AuditLogEntry, AuditExportTask } from '../types/audit';
import dayjs from 'dayjs';

export const mockAuditLogs: AuditLogEntry[] = [
  {
    adminOpId: 'OP-FREEZE-01HFZ1XG2Z5V5V5V5V5V5V5V5V',
    actionType: 'Freeze Entitlement',
    status: 'SUCCESS',
    operatorId: 'admin-ops-01',
    subjectType: 'ENTITLEMENT',
    subjectId: 'ENT-9920-ALPHA-V2-PROD',
    startedAt: dayjs().subtract(10, 'minute').toISOString(),
    timestamp: dayjs().subtract(9, 'minute').subtract(45, 'second').toISOString(), // Finished 1m 15s later
    reason: 'Suspicious high-frequency inference drift detected.',
    ticketId: 'OPS-12345',
    idempotencyKey: 'idemp-freeze-9920',
    requestPayload: { action: 'FREEZE', entitlementId: 'ENT-9920', scope: 'GLOBAL' },
    keyChanges: [{ field: 'status', before: 'ACTIVE', after: 'FROZEN' }],
    before: { status: 'ACTIVE' },
    after: { status: 'FROZEN' }
  },
  {
    adminOpId: 'OP-FAIL-01HGZ1XG88293300112233',
    actionType: 'Update Config',
    status: 'FAILED',
    operatorId: 'admin-02',
    subjectType: 'DEVICE',
    subjectId: 'dev_829305_a_core_worker',
    startedAt: dayjs().subtract(1, 'hour').toISOString(),
    timestamp: dayjs().subtract(1, 'hour').add(8500, 'ms').toISOString(), // Finished 8.5s later
    idempotencyKey: 'idemp-upd-882',
    requestPayload: { version: 'v2.5.0' },
    errorCode: 'ERR_TIMEOUT_01',
    errorSummary: 'Downstream service LeaseSvc (504 Gateway Timeout) during commit phase.',
    retryable: true
  },
  {
    adminOpId: 'OP-PEND-01HHZ9920',
    actionType: 'Suppress Alert',
    status: 'PENDING',
    operatorId: 'admin-01',
    subjectType: 'ALERT',
    subjectId: 'alt-441-node-cluster-b',
    startedAt: dayjs().subtract(2, 'minute').toISOString(),
    timestamp: '', // Empty for Pending
    idempotencyKey: 'idemp-supp-44',
    requestPayload: { alertId: 'alt-441', duration: '24h' }
  }
];

export const mockExportTasks: AuditExportTask[] = [
  { id: 'EXP-99201', status: 'READY', format: 'CSV', createdBy: 'admin-01', createdAt: '2025-12-22 10:15', filters: {}, downloadUrl: '#' },
  { id: 'EXP-99202', status: 'PREPARING', format: 'JSON', createdBy: 'admin-01', createdAt: '2025-12-22 11:30', filters: { status: 'FAILED' } }
];