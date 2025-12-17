
import React, { useState, useMemo } from 'react';
import { Button, Input, Select, Tooltip, Dropdown } from 'antd';
import { 
  Search, RefreshCw, Download, Filter, 
  MoreVertical, AlertTriangle, Link, XCircle 
} from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
// Import the configured dayjs instance instead of the raw package
import dayjs from '../../../../config/dayjsConfig';

// Shared
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

export const DevicesPage: React.FC = () => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  
  // State
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [modeFilter, setModeFilter] = useState<string>('ALL');
  const [loading, setLoading] = useState(false);
  
  // Modal State
  const [bindModalOpen, setBindModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  // Computed Data
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

  // Actions
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  const handleBindClick = (device: Device) => {
    setSelectedDevice(device);
    setBindModalOpen(true);
  };

  // Columns definition (Desktop)
  const columns = [
    {
      title: t('selfhosted.devices.cols.name'),
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <span className="font-semibold text-text-primary hover:text-brand cursor-pointer transition-colors">
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
          <span className="font-mono text-xs text-text-secondary bg-bg-page px-1.5 py-0.5 rounded border border-border">
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
          <span className="text-text-secondary">{r.license_name}</span>
        ) : (
          <span className="text-error text-xs font-bold bg-error/5 px-1.5 py-0.5 rounded">
            {t('selfhosted.devices.unbound')}
          </span>
        )
      )
    },
    {
      title: t('selfhosted.devices.cols.lastSeen'),
      dataIndex: 'last_seen_at',
      key: 'last_seen',
      responsive: ['md'] as any,
      render: (date: string) => (
        <Tooltip title={dayjs(date).format('YYYY-MM-DD HH:mm:ss')}>
          <span className="text-text-tertiary">{dayjs(date).fromNow()}</span>
        </Tooltip>
      )
    },
    {
      title: '',
      key: 'actions',
      width: 60,
      render: (_: any, record: Device) => {
        const items = [
          { key: 'view', label: t('common.viewDetails') },
          record.status === 'PENDING_LICENSE' ? { 
            key: 'bind', 
            label: t('selfhosted.devices.actions.bind'), 
            icon: <Link size={14} />, 
            className: 'text-brand',
            onClick: () => handleBindClick(record)
          } : null,
          { key: 'drain', label: t('selfhosted.devices.actions.drain'), icon: <XCircle size={14} />, danger: true },
        ].filter(Boolean);

        return (
          <Dropdown menu={{ items: items as any }} trigger={['click']}>
             <Button type="text" size="small" icon={<MoreVertical size={16} />} />
          </Dropdown>
        );
      }
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title={t('selfhosted.devices.title')}
        breadcrumbs={[{ title: t('selfhosted.devices.title') }]}
        actions={
          <div className="flex gap-3">
             <Button icon={<RefreshCw size={16} />} onClick={handleRefresh}>
               {t('common.refresh')}
             </Button>
             <Button icon={<Download size={16} />}>
               {t('common.export')}
             </Button>
          </div>
        }
      />

      {/* Alert Banner */}
      {pendingCount > 0 && (
        <div className="flex items-center justify-between px-4 py-3 bg-warning/10 border border-warning/20 rounded-lg">
           <div className="flex items-center gap-3">
              <AlertTriangle className="text-warning" size={20} />
              <span className="text-sm text-text-primary">
                <Trans 
                  i18nKey="selfhosted.devices.alert.pendingMessage" 
                  count={pendingCount}
                  components={{ bold: <b /> }}
                />
              </span>
           </div>
           <Button 
             type="link" 
             size="small" 
             className="text-warning font-bold"
             onClick={() => setStatusFilter('PENDING_LICENSE')}
           >
             {t('selfhosted.devices.alert.filterAction')}
           </Button>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between bg-bg-card p-4 rounded-card border border-border shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <Input 
            prefix={<Search size={16} className="text-text-tertiary" />}
            placeholder={t('selfhosted.devices.searchPlaceholder')}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="w-full sm:w-64"
          />
          <Select 
            value={statusFilter} 
            onChange={setStatusFilter}
            options={[
              { value: 'ALL', label: t('common.allStatus') },
              { value: 'ONLINE', label: t('selfhosted.status.online') },
              { value: 'OFFLINE', label: t('selfhosted.status.offline') },
              { value: 'PENDING_LICENSE', label: t('selfhosted.status.pending') },
            ]}
            className="w-full sm:w-40"
          />
          <Select 
            value={modeFilter} 
            onChange={setModeFilter}
            options={[
              { value: 'ALL', label: t('common.allModes') },
              { value: 'EDGE', label: t('selfhosted.mode.edge') },
              { value: 'CLOUD', label: t('selfhosted.mode.cloud') },
            ]}
            className="w-full sm:w-32"
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <VFCard><div className="h-64 flex items-center justify-center">{t('common.loading')}</div></VFCard>
      ) : isMobile ? (
        // Mobile Card List
        <div className="flex flex-col gap-4">
          {filteredData.map(device => (
            <VFCard key={device.id} noPadding className="p-4 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                   <div className="font-bold text-lg text-text-primary mb-1">{device.name}</div>
                   <div className="flex gap-2">
                     <DeviceStatusTag status={device.status} /> 
                     <DeploymentModeTag mode={device.deployment_mode} />
                   </div>
                </div>
                <Button type="text" icon={<MoreVertical size={18} />} />
              </div>
              
              <div className="grid grid-cols-2 gap-y-2 text-sm text-text-secondary mt-2">
                <div>{t('selfhosted.devices.cols.id')}:</div>
                <div className="font-mono text-text-primary text-xs">{device.device_id}</div>
                
                <div>{t('selfhosted.devices.cols.license')}:</div>
                <div className={device.license_name ? 'text-text-primary' : 'text-error'}>
                   {device.license_name || t('selfhosted.devices.unbound')}
                </div>
                
                <div>{t('selfhosted.devices.cols.lastSeen')}:</div>
                <div>{dayjs(device.last_seen_at).fromNow()}</div>
              </div>

              {device.status === 'PENDING_LICENSE' && (
                <Button block type="primary" className="mt-4" onClick={() => handleBindClick(device)}>
                  {t('selfhosted.devices.actions.bind')}
                </Button>
              )}
            </VFCard>
          ))}
          {filteredData.length === 0 && <VFEmptyState description={t('selfhosted.devices.noData')} />}
        </div>
      ) : (
        // Desktop Table
        <VFTable 
          dataSource={filteredData} 
          columns={columns} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: <VFEmptyState description={t('selfhosted.devices.noData')} /> }}
        />
      )}

      {/* Modals */}
      <LicenseSelectModal 
        open={bindModalOpen} 
        onCancel={() => setBindModalOpen(false)}
        onSelect={(lic) => {
          console.log(`Bind ${lic.id} to ${selectedDevice?.id}`);
          setBindModalOpen(false);
          // In real app, trigger mutation and refresh
        }}
      />
    </div>
  );
};
