
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Tag, Space, Dropdown, App } from 'antd';
import { Plus, History, RotateCcw, MoreVertical, Play, Pause, Trash2, Zap } from 'lucide-react';
import { Device } from '../../../common/types';
import { VFTable } from '../../../../../shared/ui/VFTable';
import { VFTag } from '../../../../../shared/ui/VFTag';
import { StreamDrawer } from '../components/StreamDrawer';
import { VersionHistoryDrawer } from '../components/VersionHistoryDrawer';

export const DeviceWorkflowTab: React.FC<{ device: Device, isAdmin: boolean }> = ({ device, isAdmin }) => {
  const { t } = useTranslation();
  const { modal } = App.useApp();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const streams = [
    { id: 's1', name: 'Main Entrance RTSP', type: 'RTSP', workflow: 'Crowd Analysis v2', status: 'RUNNING', telemetry: 'DIAGNOSTIC', updated: '2024-05-20 10:00' },
    { id: 's2', name: 'Loading Dock 04', type: 'HTTP', workflow: 'PPE Check v1.5', status: 'PAUSED', telemetry: 'METRICS', updated: '2024-05-19 14:20' },
    { id: 's3', name: 'Security Corridor', type: 'RTSP', workflow: 'Intrusion Detection v3', status: 'DISABLED', telemetry: 'HEARTBEAT', updated: '2024-05-18 09:15' },
  ];

  const columns = [
    {
      title: t('selfhosted.deviceDetail.workflow.cols.name'),
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span className="font-semibold text-text-primary">{text}</span>
    },
    {
      title: t('selfhosted.deviceDetail.workflow.cols.type'),
      dataIndex: 'type',
      key: 'type',
      render: (t: string) => <Tag className="rounded-tag">{t}</Tag>
    },
    {
      title: t('selfhosted.deviceDetail.workflow.cols.workflow'),
      dataIndex: 'workflow',
      key: 'workflow',
      render: (w: string) => <span className="text-brand font-medium cursor-pointer hover:underline">{w}</span>
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => {
        const variants: any = { RUNNING: 'success', PAUSED: 'warning', DISABLED: 'neutral' };
        return <VFTag variant={variants[s] || 'default'} filled>{s}</VFTag>
      }
    },
    {
      title: t('selfhosted.deviceDetail.workflow.cols.telemetry'),
      dataIndex: 'telemetry',
      key: 'telemetry',
      render: (tl: string) => <span className="text-xs text-text-tertiary font-mono">{tl}</span>
    },
    {
      title: '',
      key: 'actions',
      width: 50,
      render: (_: any, record: any) => {
        const items = [
          { key: 'edit', label: t('common.edit'), onClick: () => setDrawerOpen(true) },
          { key: 'play', label: 'Start', icon: <Play size={14} /> },
          { key: 'pause', label: 'Pause', icon: <Pause size={14} /> },
          { key: 'delete', label: t('common.delete'), icon: <Trash2 size={14} />, danger: true },
        ];
        return isAdmin ? (
          <Dropdown menu={{ items }} trigger={['click']}>
            <Button type="text" size="small" icon={<MoreVertical size={16} />} />
          </Dropdown>
        ) : null;
      }
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Version Banner */}
      <div className="px-6 py-4 border-b border-border-divider bg-bg-page/50 flex items-center justify-between">
        <Space size="middle">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-text-primary">
              {t('selfhosted.deviceDetail.workflow.verBanner', { ver: device.config_version })}
            </span>
            <VFTag variant="success" className="h-5 text-[10px]">LATEST</VFTag>
          </div>
          <span className="text-xs text-warning flex items-center gap-1">
             <Zap size={12} fill="currentColor" /> {t('selfhosted.deviceDetail.workflow.newVerAvailable')}
          </span>
        </Space>
        {isAdmin && (
          <Space>
            <Button 
              size="small" 
              icon={<History size={14} />} 
              onClick={() => setHistoryOpen(true)}
            >
              {t('selfhosted.deviceDetail.workflow.history')}
            </Button>
            <Button 
              size="small" 
              danger 
              icon={<RotateCcw size={14} />}
              onClick={() => {
                modal.confirm({ title: t('selfhosted.deviceDetail.workflow.rollback'), content: 'Are you sure to rollback to previous stable version?' });
              }}
            >
              {t('selfhosted.deviceDetail.workflow.rollback')}
            </Button>
          </Space>
        )}
      </div>

      {/* Streams List Toolbar */}
      <div className="p-6 pb-0 flex items-center justify-between">
        <h3 className="text-base font-bold text-text-primary m-0">Streams Management</h3>
        {isAdmin && (
          <Button 
            type="primary" 
            icon={<Plus size={16} />} 
            onClick={() => setDrawerOpen(true)}
          >
            {t('selfhosted.deviceDetail.workflow.addStream')}
          </Button>
        )}
      </div>

      <div className="p-6">
        <VFTable 
          dataSource={streams} 
          columns={columns} 
          rowKey="id" 
          pagination={false} 
        />
      </div>

      <StreamDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <VersionHistoryDrawer open={historyOpen} onClose={() => setHistoryOpen(false)} />
    </div>
  );
};
