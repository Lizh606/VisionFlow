
import { AlertRule, NotificationRoute, ConfigTemplate } from '../types/config';
import dayjs from 'dayjs';

export const mockAlertRules: AlertRule[] = [
  {
    id: 'R-001',
    name: 'Device Offline Critical',
    domain: 'selfhosted',
    severity: 'P0',
    status: 'ENABLED',
    definition: 'count(heartbeat_lost) > 1 within 5m',
    updatedAt: dayjs().subtract(2, 'day').toISOString(),
    updatedBy: 'admin-01'
  },
  {
    id: 'R-002',
    name: 'Inference OOM Watchdog',
    domain: 'studio',
    severity: 'P1',
    status: 'ENABLED',
    definition: 'memory_usage_pct > 95%',
    updatedAt: dayjs().subtract(1, 'week').toISOString(),
    updatedBy: 'system'
  }
];

export const mockNotificationRoutes: NotificationRoute[] = [
  {
    id: 'NR-001',
    name: 'SRE Critical Alerts',
    channelType: 'SLACK',
    target: '#ops-alerts-critical',
    status: 'ENABLED',
    updatedAt: dayjs().subtract(3, 'day').toISOString(),
    updatedBy: 'admin-02'
  },
  {
    id: 'NR-002',
    name: 'Billing Weekly Summary',
    channelType: 'EMAIL',
    target: 'finance-team@visionflow.io',
    status: 'ENABLED',
    updatedAt: dayjs().subtract(1, 'month').toISOString(),
    updatedBy: 'admin-01'
  }
];

export const mockTemplates: ConfigTemplate[] = [
  {
    id: 'TPL-001',
    name: 'Standard Tier Pricing',
    type: 'PRICING',
    currentVersion: 'v2.1.0',
    status: 'ACTIVE',
    updatedAt: dayjs().subtract(5, 'day').toISOString(),
    updatedBy: 'ops-admin',
    content: JSON.stringify({
      basePrice: 49.99,
      currency: 'USD',
      limits: { streams: 5, storage: '10GB' }
    }, null, 2),
    history: [
      { version: 'v2.1.0', updatedAt: dayjs().subtract(5, 'day').toISOString(), operator: 'ops-admin' },
      { version: 'v2.0.4', updatedAt: dayjs().subtract(1, 'month').toISOString(), operator: 'admin-01' }
    ]
  },
  {
    id: 'TPL-002',
    name: 'Marketplace Partner RevShare',
    type: 'REVENUE_SHARE',
    currentVersion: 'v1.0.2',
    status: 'DRAFT',
    updatedAt: dayjs().subtract(2, 'hour').toISOString(),
    updatedBy: 'bizops-admin',
    content: JSON.stringify({
      platformFee: 0.15,
      developerShare: 0.85,
      payoutFrequency: 'MONTHLY'
    }, null, 2),
    history: [
      { version: 'v1.0.2', updatedAt: dayjs().subtract(2, 'hour').toISOString(), operator: 'bizops-admin' }
    ]
  }
];
