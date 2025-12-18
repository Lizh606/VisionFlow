
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

  // Updated timestamps to be very recent
  const [streams, setStreams] = useState<Stream[]>([
    {
      id: 'STR_94201',
      name: '正门入口摄像头',
      type: 'RTSP',
      endpoint: 'rtsp://admin:****@192.168.1.100:554/ch1',
      workflow: '人流量分析',
      workflowId: 'wf_crowd_01',
      version: 'v2.4',
      status: 'RUNNING',
      telemetry: 'DIAGNOSTIC',
      updatedAt: dayjs().subtract(2, 'hour').toISOString(),
      concurrency: 2
    },
    {
      id: 'STR_88302',
      name: '装卸平台04',
      type: 'HTTP',
      endpoint: 'http://push.visionflow.io/v1/stream/99',
      workflow: '安防合规检查',
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
      description: '更新了“正门入口”工作流版本至 v2.4，调整了遥测级别。',
      isCurrent: true,
      streamsSnapshot: [
        { name: '正门入口摄像头', type: 'RTSP', workflow: '人流量分析', version: 'v2.4', telemetry: 'DIAGNOSTIC' }
      ]
    },
    {
      id: 'ver_11',
      version: 'v2.4.0',
      type: 'ROLLBACK',
      user: 'System',
      timestamp: dayjs().subtract(1, 'day').format('YYYY-MM-DD HH:mm'),
      description: '由于 v2.3.9 运行异常，系统自动回滚至稳定版本。',
      streamsSnapshot: []
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
