
export interface DeviceCounts {
  total: number;
  online: number;
  onlinePct: number;
  pending: number;
  pendingPct: number;
  offline: number;
  offlinePct: number;
}

export interface LicenseData {
  used: number;
  total: number;
  expiringCount: number;
}

export interface UsageSummaryData {
  edge: number;
  cloud: number;
  unit: string;
}

export interface DeviceStatusChartData {
  status: string;
  count: number;
}

export interface UsageTrendPoint {
  time: string;
  edge: number;
  cloud: number;
}

export interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  target: string;
  time: string;
}

export interface LicenseKPI {
  usedQuota: number;
  totalQuota: number;
  activeLicenses: number;
  totalLicenses: number;
  expiringSoon: number;
  pendingDevices: number;
}

export interface LicenseTrendPoint {
  date: string;
  used: number;
  quota: number;
}

export interface LicenseDistribution {
  type: string;
  count: number;
}

export interface OverviewAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  timestamp: string;
}

export interface SelfHostedDashboardData {
  devices: DeviceCounts;
  license: LicenseData;
  usageSummary: UsageSummaryData;
  deviceStatusChart: DeviceStatusChartData[];
  usageTrend: UsageTrendPoint[];
  alerts: Alert[];
}
