
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
      description: '更新了“正门入口”工作流版本至 v2.4，调整了遥测级别为诊断级。',
      isCurrent: true,
      streamsSnapshot: [
        { id: 'STR_94201', name: '正门入口摄像头', type: 'RTSP', workflow: '人流量分析', version: 'v2.4', telemetry: 'DIAGNOSTIC' },
        { id: 'STR_88302', name: '装卸平台04', type: 'HTTP', workflow: '安防合规检查', version: 'v1.5', telemetry: 'METRICS' }
      ]
    },
    {
      id: 'ver_11',
      version: 'v2.4.0',
      type: 'ROLLBACK',
      user: 'System',
      timestamp: dayjs().subtract(1, 'day').format('YYYY-MM-DD HH:mm'),
      description: '由于 v2.3.9 在生产环境出现内存溢出告警，系统触发自动回滚。',
      streamsSnapshot: [
        { id: 'STR_94201', name: '正门入口摄像头', type: 'RTSP', workflow: '人流量分析', version: 'v2.3', telemetry: 'METRICS' },
        { id: 'STR_88302', name: '装卸平台04', type: 'HTTP', workflow: '安防合规检查', version: 'v1.5', telemetry: 'METRICS' }
      ]
    },
    {
      id: 'ver_10',
      version: 'v2.3.9',
      type: 'UPDATE',
      user: 'John Doe',
      timestamp: dayjs().subtract(1, 'day').subtract(2, 'hour').format('YYYY-MM-DD HH:mm'),
      description: '尝试部署实验性版本的行人重识别模型。',
      streamsSnapshot: [
        { id: 'STR_94201', name: '正门入口摄像头', type: 'RTSP', workflow: '行人重识别', version: 'v3.0-beta', telemetry: 'DIAGNOSTIC' }
      ]
    },
    {
      id: 'ver_09',
      version: 'v2.3.8',
      type: 'UPDATE',
      user: 'Admin',
      timestamp: dayjs().subtract(3, 'day').format('YYYY-MM-DD HH:mm'),
      description: '例行更新，优化了装卸平台的识别算法响应速度。',
      streamsSnapshot: [
        { id: 'STR_94201', name: '正门入口摄像头', type: 'RTSP', workflow: '人流量分析', version: 'v2.3', telemetry: 'METRICS' },
        { id: 'STR_88302', name: '装卸平台04', type: 'HTTP', workflow: '安防合规检查', version: 'v1.5', telemetry: 'METRICS' }
      ]
    },
    {
      id: 'ver_01',
      version: 'v1.0.0',
      type: 'INITIAL',
      user: 'CI/CD Pipeline',
      timestamp: dayjs().subtract(1, 'month').format('YYYY-MM-DD HH:mm'),
      description: '设备初始化部署，接入初始 Stream 采集节点。',
      streamsSnapshot: [
        { id: 'STR_94201', name: '正门入口摄像头', type: 'RTSP', workflow: '基础监控', version: 'v1.0', telemetry: 'HEARTBEAT' }
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
