
export interface TrendPoint {
  time: string;
  value: number;
}

export interface StudioStats {
  successRate: number;
  backlog: number;
  topFailureReasons: { reason: string; count: number }[];
  trend1h: number; 
  trend24h: number;
  history1h: TrendPoint[];
  history24h: TrendPoint[];
}

export interface SelfHostedStats {
  onlineDevices: number;
  offlineDevices: number;
  versionDistribution: { version: string; count: number }[];
  deploymentCoverage: number;
  leaseAnomalies: number;
}

export interface MarketplaceStats {
  pendingListings: number;
  refundFailures: number;
  orderAnomalies: number;
  settlementAnomalies: number;
}

export interface AdminDashboardData {
  studio: StudioStats;
  selfHosted: SelfHostedStats;
  marketplace: MarketplaceStats;
  lastAggregatedAt: string;
}
