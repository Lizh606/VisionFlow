
import React, { useState, useMemo } from 'react';
import { Tabs, Space, Button, App } from 'antd';
import { useTranslation } from 'react-i18next';
import { RefreshCw } from 'lucide-react';
import { VFPageHeader } from '../../../../shared/ui/VFPageHeader';
import { DeviceSummaryCards } from './components/DeviceSummaryCards';
import { DeviceOverviewTab } from './tabs/DeviceOverviewTab';
import { DeviceWorkflowTab } from './tabs/DeviceWorkflowTab';
import { DeviceUsageTab } from './tabs/DeviceUsageTab';
import { DeviceLogsTab } from './tabs/DeviceLogsTab';
import { mockDevices } from '../../common/mockData';

interface Props {
  deviceId: string;
  onBack?: () => void;
}

export const DeviceDetailPage: React.FC<Props> = ({ deviceId, onBack }) => {
  const { t } = useTranslation();
  const { modal } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [isAdmin] = useState(true); // Mock permission

  const device = useMemo(() => 
    mockDevices.find(d => d.id === deviceId) || mockDevices[0]
  , [deviceId]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  };

  const handleModeChange = (newMode: string) => {
    modal.confirm({
      title: t('selfhosted.deviceDetail.summary.changeMode'),
      content: t('selfhosted.mode.cloudDesc'), 
      okText: t('common.confirm'),
      cancelText: t('common.cancel'),
      onOk: () => {
        console.log('Mode changed to', newMode);
      }
    });
  };

  const tabItems = [
    {
      key: 'overview',
      label: t('selfhosted.deviceDetail.tabs.overview'),
      children: <DeviceOverviewTab device={device} />
    },
    {
      key: 'workflow',
      label: t('selfhosted.deviceDetail.tabs.workflow'),
      children: <DeviceWorkflowTab device={device} isAdmin={isAdmin} />
    },
    {
      key: 'usage',
      label: t('selfhosted.deviceDetail.tabs.usage'),
      children: <DeviceUsageTab device={device} />
    },
    {
      key: 'logs',
      label: t('selfhosted.deviceDetail.tabs.logs'),
      children: <DeviceLogsTab device={device} />
    }
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-12">
      <VFPageHeader 
        title={device.name}
        onBack={onBack}
        breadcrumbs={[
          { title: 'Vision Team' },
          { title: t('menu.selfHosted') },
          { title: t('menu.devices') },
          { title: device.name }
        ]}
        actions={
          <Space>
            <Button 
              icon={<RefreshCw size={16} className={loading ? 'animate-spin' : ''} />} 
              onClick={handleRefresh}
            >
              {t('common.refresh')}
            </Button>
          </Space>
        }
      />

      <DeviceSummaryCards 
        device={device} 
        isAdmin={isAdmin} 
        onModeChange={handleModeChange} 
      />

      <div className="bg-bg-card rounded-card border border-border overflow-hidden shadow-card">
        <Tabs 
          defaultActiveKey="overview" 
          items={tabItems}
          className="vf-tabs-custom"
          tabBarStyle={{ 
            padding: '0 24px', 
            margin: 0, 
            borderBottom: '1px solid rgba(var(--vf-divider), var(--vf-divider-alpha))' 
          }}
        />
      </div>
      
      <style>{`
        /* Remove default Ant Tabs bottom border so we can use our custom styled one */
        .vf-tabs-custom .ant-tabs-nav::before {
          display: none !important;
        }
        
        .vf-tabs-custom .ant-tabs-tab {
          padding: 16px 0 !important;
          margin: 0 32px 0 0 !important;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .vf-tabs-custom .ant-tabs-tab-btn {
          font-weight: 600 !important;
          font-size: 14px !important;
          color: rgba(var(--vf-text-secondary), 1) !important;
          transition: color 0.2s ease;
        }

        /* Hover Highlight */
        .vf-tabs-custom .ant-tabs-tab:hover .ant-tabs-tab-btn {
          color: rgba(var(--vf-brand), 1) !important;
        }

        /* Active Highlight */
        .vf-tabs-custom .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: rgba(var(--vf-brand), 1) !important;
        }

        /* Active Indicator (Ink Bar) */
        .vf-tabs-custom .ant-tabs-ink-bar {
          background: rgba(var(--vf-brand), 1) !important;
          height: 3px !important;
          border-radius: 3px 3px 0 0;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        @media (max-width: 768px) {
          .vf-tabs-custom .ant-tabs-tab {
            margin: 0 20px 0 0 !important;
          }
        }
      `}</style>
    </div>
  );
};
