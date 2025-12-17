
import { SelfHostedDashboardData } from './types';

export const mockDashboardData: SelfHostedDashboardData = {
  devices: {
    total: 24,
    online: 18,
    onlinePct: 75,
    pending: 3,
    pendingPct: 13,
    offline: 1,
    offlinePct: 4,
  },
  license: {
    used: 24,
    total: 50,
    expiringCount: 2,
  },
  usageSummary: {
    edge: 49.7,
    cloud: 2.4,
    unit: 'k'
  },
  deviceStatusChart: [
    { status: 'Online', count: 18 },
    { status: 'Pending ...', count: 3 },
    { status: 'Offline', count: 1 },
    { status: 'Draining', count: 1 },
    { status: 'Decommis...', count: 1 },
  ],
  usageTrend: [
    { time: '0:00', edge: 5.8, cloud: 1.2 },
    { time: '2:00', edge: 3.2, cloud: 1.1 },
    { time: '4:00', edge: 7.5, cloud: 0.8 },
    { time: '6:00', edge: 4.8, cloud: 1.6 },
    { time: '8:00', edge: 3.5, cloud: 1.9 },
    { time: '10:00', edge: 7.2, cloud: 2.1 },
    { time: '12:00', edge: 3.1, cloud: 0.8 },
    { time: '14:00', edge: 7.1, cloud: 0.5 },
    { time: '16:00', edge: 4.5, cloud: 1.2 },
    { time: '18:00', edge: 6.8, cloud: 1.5 },
    { time: '20:00', edge: 7.0, cloud: 1.3 },
    { time: '22:00', edge: 4.2, cloud: 2.1 },
  ],
  alerts: [
    {
      id: '1',
      severity: 'critical',
      title: 'Device Edge-Gateway-04 offline > 30m',
      target: 'dev_829305',
      time: '10m ago'
    },
    {
      id: '2',
      severity: 'warning',
      title: 'License Enterprise-Edge-v1 expiring',
      target: 'lic_882',
      time: '2d ago'
    },
    {
      id: '3',
      severity: 'info',
      title: 'Cloud usage spike detected',
      target: 'billing',
      time: '4h ago'
    }
  ]
};
