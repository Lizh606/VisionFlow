
import { AdminDashboardData } from '../types/dashboard';

export const mockAdminDashboard: AdminDashboardData = {
  studio: {
    successRate: 98.4,
    backlog: 124,
    topFailureReasons: [
      { reason: 'OOM Error', count: 42 },
      { reason: 'Timeout', count: 28 },
      { reason: 'Invalid Input', count: 12 }
    ],
    trend1h: 0.5,
    trend24h: -1.2,
    history1h: [
      { time: '10:00', value: 98.1 }, { time: '10:10', value: 98.5 }, { time: '10:20', value: 97.9 },
      { time: '10:30', value: 98.2 }, { time: '10:40', value: 98.4 }, { time: '10:50', value: 98.4 }
    ],
    history24h: [
      { time: '00:00', value: 99.0 }, { time: '04:00', value: 98.5 }, { time: '08:00', value: 97.0 },
      { time: '12:00', value: 98.8 }, { time: '16:00', value: 98.2 }, { time: '20:00', value: 98.4 }
    ]
  },
  selfHosted: {
    onlineDevices: 842,
    offlineDevices: 12,
    versionDistribution: [
      { version: 'v2.5.x', count: 720 },
      { version: 'v2.4.x', count: 110 },
      { version: 'Legacy', count: 24 }
    ],
    deploymentCoverage: 94.2,
    leaseAnomalies: 3
  },
  marketplace: {
    pendingListings: 8,
    refundFailures: 2,
    orderAnomalies: 5,
    settlementAnomalies: 1
  },
  lastAggregatedAt: new Date().toISOString()
};
