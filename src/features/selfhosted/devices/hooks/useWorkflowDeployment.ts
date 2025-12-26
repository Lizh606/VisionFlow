
import { useState } from 'react';
import dayjs from '../../../../config/dayjsConfig';

export interface Stream {
  id: string;
  name: string;
  type: 'RTSP' | 'HTTP' | 'FILE';
  endpoint: string;
  workflow: string;
  workflowId: string;
  version: string;
  status: 'RUNNING' | 'PAUSED' | 'DISABLED';
  telemetry: 'HEARTBEAT' | 'METRICS' | 'DIAGNOSTIC';
  updatedAt: string;
  concurrency: number;
}

export interface VersionHistory {
  id: string;
  version: string;
  type: 'UPDATE' | 'ROLLBACK' | 'INITIAL';
  user: string;
  timestamp: string;
  description: string;
  isCurrent?: boolean;
  streamsSnapshot: Partial<Stream>[];
}

export const useWorkflowDeployment = () => {
  const [isAdmin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [streams, setStreams] = useState<Stream[]>([
    {
      id: 'STR_94201',
      name: 'Main Entrance Camera',
      type: 'RTSP',
      endpoint: 'rtsp://admin:****@192.168.1.100:554/ch1',
      workflow: 'Crowd Analysis',
      workflowId: 'wf_crowd_01',
      version: 'v2.4',
      status: 'RUNNING',
      telemetry: 'DIAGNOSTIC',
      updatedAt: dayjs().subtract(2, 'hour').toISOString(),
      concurrency: 2
    },
    {
      id: 'STR_88302',
      name: 'Loading Dock 04',
      type: 'HTTP',
      endpoint: 'http://push.visionflow.io/v1/stream/99',
      workflow: 'Safety Compliance',
      workflowId: 'wf_ppe_05',
      version: 'v1.5',
      status: 'PAUSED',
      telemetry: 'METRICS',
      updatedAt: dayjs().subtract(1, 'day').toISOString(),
      concurrency: 1
    }
  ]);

  const history: VersionHistory[] = [
    {
      id: 'ver_12',
      version: 'v2.4.1',
      type: 'UPDATE',
      user: 'Admin',
      timestamp: dayjs().subtract(2, 'hour').format('YYYY-MM-DD HH:mm'),
      description: 'Updated Main Entrance workflow to v2.4, adjusted telemetry to diagnostic level.',
      isCurrent: true,
      streamsSnapshot: [
        { id: 'STR_94201', name: 'Main Entrance Camera', type: 'RTSP', workflow: 'Crowd Analysis', version: 'v2.4', telemetry: 'DIAGNOSTIC' },
        { id: 'STR_88302', name: 'Loading Dock 04', type: 'HTTP', workflow: 'Safety Compliance', version: 'v1.5', telemetry: 'METRICS' }
      ]
    },
    {
      id: 'ver_11',
      version: 'v2.4.0',
      type: 'ROLLBACK',
      user: 'System',
      timestamp: dayjs().subtract(1, 'day').format('YYYY-MM-DD HH:mm'),
      description: 'Triggered automatic rollback due to memory overflow alerts in v2.3.9.',
      streamsSnapshot: [
        { id: 'STR_94201', name: 'Main Entrance Camera', type: 'RTSP', workflow: 'Crowd Analysis', version: 'v2.3', telemetry: 'METRICS' },
        { id: 'STR_88302', name: 'Loading Dock 04', type: 'HTTP', workflow: 'Safety Compliance', version: 'v1.5', telemetry: 'METRICS' }
      ]
    },
    {
      id: 'ver_10',
      version: 'v2.3.9',
      type: 'UPDATE',
      user: 'John Doe',
      timestamp: dayjs().subtract(1, 'day').subtract(2, 'hour').format('YYYY-MM-DD HH:mm'),
      description: 'Deploying experimental person re-identification model.',
      streamsSnapshot: [
        { id: 'STR_94201', name: 'Main Entrance Camera', type: 'RTSP', workflow: 'Person Re-ID', version: 'v3.0-beta', telemetry: 'DIAGNOSTIC' }
      ]
    },
    {
      id: 'ver_09',
      version: 'v2.3.8',
      type: 'UPDATE',
      user: 'Admin',
      timestamp: dayjs().subtract(3, 'day').format('YYYY-MM-DD HH:mm'),
      description: 'Routine update: optimized detection speed for loading docks.',
      streamsSnapshot: [
        { id: 'STR_94201', name: 'Main Entrance Camera', type: 'RTSP', workflow: 'Crowd Analysis', version: 'v2.3', telemetry: 'METRICS' },
        { id: 'STR_88302', name: 'Loading Dock 04', type: 'HTTP', workflow: 'Safety Compliance', version: 'v1.5', telemetry: 'METRICS' }
      ]
    },
    {
      id: 'ver_01',
      version: 'v1.0.0',
      type: 'INITIAL',
      user: 'CI/CD Pipeline',
      timestamp: dayjs().subtract(1, 'month').format('YYYY-MM-DD HH:mm'),
      description: 'Initial deployment, connected base stream acquisition nodes.',
      streamsSnapshot: [
        { id: 'STR_94201', name: 'Main Entrance Camera', type: 'RTSP', workflow: 'Basic Monitoring', version: 'v1.0', telemetry: 'HEARTBEAT' }
      ]
    }
  ];

  return {
    isAdmin,
    loading,
    setLoading,
    streams,
    setStreams,
    history,
    currentVersion: history.find(h => h.isCurrent)
  };
};
