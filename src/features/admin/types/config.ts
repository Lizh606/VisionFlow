
export type AlertSeverity = 'P0' | 'P1' | 'P2';
export type ConfigStatus = 'ENABLED' | 'DISABLED' | 'ACTIVE' | 'DRAFT';

export interface AlertRule {
  id: string;
  name: string;
  domain: string;
  severity: AlertSeverity;
  status: ConfigStatus;
  definition: string;
  updatedAt: string;
  updatedBy: string;
}

export interface NotificationRoute {
  id: string;
  name: string;
  channelType: 'EMAIL' | 'SLACK' | 'WEBHOOK' | 'PAGERDUTY';
  target: string;
  status: ConfigStatus;
  updatedAt: string;
  updatedBy: string;
}

export interface TemplateHistory {
  version: string;
  updatedAt: string;
  operator: string;
}

export interface ConfigTemplate {
  id: string;
  name: string;
  type: 'PRICING' | 'REVENUE_SHARE';
  currentVersion: string;
  status: 'ACTIVE' | 'DRAFT';
  updatedAt: string;
  updatedBy: string;
  content: string; // JSON string
  history: TemplateHistory[];
}
