
import React, { useState, useMemo } from 'react';
import { Button, Input, Select, Tooltip, Dropdown } from 'antd';
import { 
  Search, RefreshCw, Download, 
  MoreVertical, AlertTriangle, Link, XCircle 
} from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import dayjs from '../../../../config/dayjsConfig';

import { PageHeader } from '../../components/PageHeader';
import { DeviceStatusTag } from '../../components/DeviceStatusTag';
import { DeploymentModeTag } from '../../components/DeploymentModeTag';
import { VFTable } from '../../../../shared/ui/VFTable';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFEmptyState } from '../../../../shared/ui/VFEmptyState';
import { useResponsive } from '../../../../shared/hooks/useResponsive';
import { mockDevices } from '../../common/mockData';
import { Device, DeviceStatus } from '../../common/types';
import { LicenseSelectModal } from '../../components/LicenseSelectModal';

interface DevicesPageProps {
  onDeviceClick?: (id: string) => void;
}

export const DevicesPage: React.FC<DevicesPageProps> = ({ onDeviceClick }) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [modeFilter, setModeFilter] = useState<string>('ALL');
  const [loading, setLoading] = useState(false);
  const [bindModalOpen, setBindModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const pendingCount = mockDevices.filter(d => d.status === 'PENDING_LICENSE').length;
  
  const filteredData = useMemo(() => {
    return mockDevices.filter(d => {
      const matchSearch = 
        d.name.toLowerCase().includes(searchText.toLowerCase()) || 
        d.device_id.toLowerCase().includes(searchText.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || d.status === statusFilter;
      const matchMode = modeFilter === 'ALL' || d.deployment_mode === modeFilter;
      return matchSearch && matchStatus && matchMode;
    });
  }, [searchText, statusFilter, modeFilter]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  const handleBindClick = (device: Device) => {
    setSelectedDevice(device);
    setBindModalOpen(true);
  };

  const columns = [
    {
      title: t('selfhosted.devices.cols.name'),
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Device) => (
        <span 
          className="text-text-primary font-normal hover:text-brand cursor-pointer transition-colors"
          onClick={() => onDeviceClick?.(record.id)}
        >
          {text}
        </span>
      ),
    },
    {
      title: t('selfhosted.devices.cols.id'),
      dataIndex: 'device_id',
      key: 'device_id',
      responsive: ['lg'] as any,
      render: (text: string) => (
        <Tooltip title={text}>
          <span className="font-mono text-xs text-text-tertiary bg-bg-page px-1.5 py-0.5 rounded border border-border">
            {text.length > 12 ? text.substring(0, 12) + '...' : text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: t('selfhosted.devices.cols.status'),
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status: DeviceStatus) => <DeviceStatusTag status={status} />,
    },
    {
      title: t('selfhosted.devices.cols.mode'),
      dataIndex: 'deployment_mode',
      key: 'mode',
      render: (mode: any) => <DeploymentModeTag mode={mode} />,
    },
    {
      title: t('selfhosted.devices.cols.license'),
      key: 'license',
      render: (_: any, r: Device) => (
        r.license_name ? (
          <span className="text-text-secondary text-sm">{r.license_name}</span>
        ) : (
          <span className="text-error text-xs font-bold bg-error/5 px-1.5 py-0.5 rounded border border-error/10">
            {t('selfhosted.devices.unbound')}
          </span>
        )
      )
    },
    {
      title: t('selfhosted.devices.cols.lastSeen'),
      dataIndex: 'last_seen_at',
      key: 'last_seen',
      align: 'left' as const,
      responsive: ['md'] as any,
      render: (date: string) => (
        <Tooltip title={dayjs(date).format('YYYY-MM-DD HH:mm:ss')}>
          <span className="text-xs text-text-tertiary">{dayjs(date).fromNow()}</span>
        </Tooltip>
      )
    },
    {
      title: '',
      key: 'actions',
      width: 60,
      render: (_: any, record: Device) => {
        const items = [
          { key: 'view', label: t('selfhosted.actions.view'), onClick: () => onDeviceClick?.(record.id) },
          record.status === 'PENDING_LICENSE' ? { 
            key: 'bind', 
            label: t('selfhosted.actions.bind'), 
            icon: <Link size={14} />, 
            className: 'text-brand',
            onClick: () => handleBindClick(record)
          } : null,
          { key: 'drain', label: t('selfhosted.actions.drain'), icon: <XCircle size={14} />, danger: true },
        ].filter(Boolean);

        return (
          <Dropdown menu={{ items: items as any }} trigger={['click']}>
             <Button type="text" size="small" icon={<MoreVertical size={16} />} className="text-text-tertiary" />
          </Dropdown>
        );
      }
    }
  ];

  return (
    <div className="flex flex-col gap-4 md:gap-6 pb-20 w-full animate-in fade-in duration-500">
      <PageHeader 
        title={t('selfhosted.devices.title')}
        actions={
          <div className="flex gap-3">
             <Button icon={<RefreshCw size={16} />} onClick={handleRefresh} className="h-10 rounded-control">
               {t('common.refresh')}
             </Button>
             <Button icon={<Download size={16} />} className="h-10 rounded-control">
               {t('common.export')}
             </Button>
          </div>
        }
      />

      {pendingCount > 0 && (
        <div className="flex items-center justify-between px-4 py-3 bg-warning/5 border border-warning/20 rounded-card shadow-sm">
           <div className="flex items-center gap-3">
              <AlertTriangle className="text-warning" size={20} />
              <span className="text-sm text-text-primary font-medium">
                <Trans 
                  i18nKey="selfhosted.devices.alert.pendingMessage" 
                  count={pendingCount}
                  components={{ bold: <b className="text-text-primary font-bold" /> }}
                />
              </span>
           </div>
           <Button 
             type="link" 
             size="small" 
             className="!text-warning hover:opacity-75 font-bold p-0 transition-all underline underline-offset-4 text-xs"
             onClick={() => {
                setStatusFilter('PENDING_LICENSE');
                setModeFilter('ALL');
             }}
           >
             {t('selfhosted.devices.alert.filterAction')}
           </Button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 justify-between bg-bg-card p-4 rounded-card border border-border shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <Input 
            prefix={<Search size={16} className="text-text-tertiary" />}
            placeholder={t('selfhosted.devices.searchPlaceholder')}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="w-full sm:w-64 h-10 rounded-control border-border"
            allowClear
          />
          <Select 
            placeholder={t('common.status')}
            value={statusFilter} 
            onChange={setStatusFilter}
            options={[
              { value: 'ALL', label: t('common.allStatus') },
              { value: 'ONLINE', label: t('selfhosted.status.online') },
              { value: 'OFFLINE', label: t('selfhosted.status.offline') },
              { value: 'PENDING_LICENSE', label: t('selfhosted.status.pending') },
              { value: 'DRAINING', label: t('selfhosted.status.maintenance') },
            ]}
            className="w-full sm:w-40 h-10"
          />
          <Select 
            placeholder={t('selfhosted.deviceDetail.summary.mode')}
            value={modeFilter} 
            onChange={setModeFilter}
            options={[
              { value: 'ALL', label: t('common.allModes') },
              { value: 'EDGE', label: 'EDGE' },
              { value: 'CLOUD', label: 'CLOUD' },
            ]}
            className="w-full sm:w-40 h-10"
          />
        </div>
      </div>

      <div className="min-h-[400px]">
        {loading ? (
          <div className="bg-bg-card rounded-card border border-border h-64 flex items-center justify-center font-bold text-text-tertiary tracking-widest shadow-sm">
            {t('common.loading')}
          </div>
        ) : isMobile ? (
          <div className="flex flex-col gap-4">
            {filteredData.map(device => (
              <VFCard key={device.id} noPadding className="p-4 flex flex-col gap-3" onClick={() => onDeviceClick?.(device.id)}>
                <div className="flex justify-between items-start">
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-base text-text-primary mb-1.5 truncate">{device.name}</div>
                    <div className="flex flex-wrap gap-2">
                      <DeviceStatusTag status={device.status} /> 
                      <DeploymentModeTag mode={device.deployment_mode} />
                    </div>
                  </div>
                  <Button type="text" icon={<MoreVertical size={18} className="text-text-tertiary" />} />
                </div>
              </VFCard>
            ))}
            {filteredData.length === 0 && (
              <div className="bg-bg-card rounded-card border border-border p-12 shadow-sm">
                <VFEmptyState description={t('selfhosted.devices.noData')} />
              </div>
            )}
          </div>
        ) : (
          <VFTable 
            dataSource={filteredData} 
            columns={columns} 
            rowKey="id"
            pagination={{ pageSize: 10 }}
            locale={{ emptyText: (
              <div className="py-12"><VFEmptyState description={t('selfhosted.devices.noData')} /></div>
            )}}
            onRow={(record) => ({
              className: 'cursor-pointer group',
              onClick: () => onDeviceClick?.(record.id)
            })}
          />
        )}
      </div>

      <LicenseSelectModal 
        open={bindModalOpen} 
        onCancel={() => setBindModalOpen(false)}
        onSelect={(lic) => {
          setBindModalOpen(false);
        }}
      />
      
      <style>{`
        .ant-table-thead > tr > th {
          color: rgba(var(--vf-text-secondary), 1) !important;
          font-weight: 500 !important;
        }
        .ant-table-tbody > tr > td {
          font-weight: 400 !important;
          color: rgba(var(--vf-text-primary), 1) !important;
        }
        .ant-table-tbody > tr > td:first-child {
          font-weight: 500 !important;
        }
      `}</style>
    </div>
  );
};
