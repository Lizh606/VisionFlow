
import React, { useState, useMemo } from 'react';
import { Tabs, Space, Button, App, Segmented } from 'antd';
import { useTranslation } from 'react-i18next';
import { RefreshCw, LayoutDashboard, Zap, BarChart3, Terminal } from 'lucide-react';
import { VFPageHeader } from '../../../../shared/ui/VFPageHeader';
import { DeviceSummaryCards } from './components/DeviceSummaryCards';
import { DeviceOverviewTab } from './tabs/DeviceOverviewTab';
import { DeviceWorkflowTab } from './tabs/DeviceWorkflowTab';
import { DeviceUsageTab } from './tabs/DeviceUsageTab';
import { DeviceLogsTab } from './tabs/DeviceLogsTab';
import { mockDevices } from '../../common/mockData';
import { useResponsive } from '../../../../shared/hooks/useResponsive';

interface Props {
  deviceId: string;
  onBack?: () => void;
}

export const DeviceDetailPage: React.FC<Props> = ({ deviceId, onBack }) => {
  const { t } = useTranslation();
  const { modal } = App.useApp();
  const { isMobile } = useResponsive();
  const [loading, setLoading] = useState(false);
  const [isAdmin] = useState(true); // Mock permission
  const [activeTab, setActiveTab] = useState('overview');

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
      icon: <LayoutDashboard size={14} />,
      children: <DeviceOverviewTab device={device} />
    },
    {
      key: 'workflow',
      label: t('selfhosted.deviceDetail.tabs.workflow'),
      icon: <Zap size={14} />,
      children: <DeviceWorkflowTab device={device} isAdmin={isAdmin} />
    },
    {
      key: 'usage',
      label: t('selfhosted.deviceDetail.tabs.usage'),
      icon: <BarChart3 size={14} />,
      children: <DeviceUsageTab device={device} />
    },
    {
      key: 'logs',
      label: t('selfhosted.deviceDetail.tabs.logs'),
      icon: <Terminal size={14} />,
      children: <DeviceLogsTab device={device} />
    }
  ];

  const activeContent = useMemo(() => {
    return tabItems.find(item => item.key === activeTab)?.children;
  }, [activeTab, device, isAdmin]);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-12">
      <VFPageHeader 
        title={device.name}
        onBack={onBack}
        // 修正：PageHeader 已经包含了前缀，这里只需要定义相对路径
        breadcrumbs={[
          { title: t('menu.devices') },
          { title: device.name }
        ]}
        actions={
          <Space>
            <Button 
              icon={<RefreshCw size={16} className={loading ? 'animate-spin' : ''} />} 
              onClick={handleRefresh}
            >
              {!isMobile && t('common.refresh')}
            </Button>
          </Space>
        }
      />

      <DeviceSummaryCards 
        device={device} 
        isAdmin={isAdmin} 
        onModeChange={handleModeChange} 
      />

      <div className="bg-bg-card rounded-card border border-border overflow-hidden shadow-card min-h-[400px]">
        {isMobile ? (
          <div className="flex flex-col">
            <div className="p-3 border-b border-divider bg-bg-page/30">
              <Segmented
                block
                value={activeTab}
                onChange={(val) => setActiveTab(val as string)}
                options={tabItems.map(item => ({
                  label: (
                    <div className="flex flex-col items-center justify-center py-1.5 gap-1 min-h-[44px]">
                      <div className={`transition-colors ${activeTab === item.key ? 'text-white' : 'text-text-tertiary'}`}>
                        {item.icon}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-tight transition-colors ${activeTab === item.key ? 'text-white' : 'text-text-secondary'}`}>
                        {item.label}
                      </span>
                    </div>
                  ),
                  value: item.key
                }))}
                className="vf-mobile-tabs-segmented bg-bg-card p-1 border border-divider/50 shadow-sm rounded-control"
              />
            </div>
            
            <div className="animate-in slide-in-from-right-2 duration-300">
              {activeContent}
            </div>
          </div>
        ) : (
          <Tabs 
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems.map(({ key, label, children }) => ({ key, label, children }))}
            className="vf-tabs-custom"
            tabBarStyle={{ 
              padding: '0 24px', 
              margin: 0, 
              borderBottom: '1px solid rgba(var(--vf-divider), var(--vf-divider-alpha))' 
            }}
          />
        )}
      </div>
      
      <style>{`
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

        .vf-tabs-custom .ant-tabs-tab:hover .ant-tabs-tab-btn {
          color: rgba(var(--vf-brand), 1) !important;
        }

        .vf-tabs-custom .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: rgba(var(--vf-brand), 1) !important;
        }

        .vf-tabs-custom .ant-tabs-ink-bar {
          background: rgba(var(--vf-brand), 1) !important;
          height: 3px !important;
          border-radius: 3px 3px 0 0;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .vf-mobile-tabs-segmented .ant-segmented-item-selected {
          background-color: rgba(var(--vf-brand), 1) !important;
          box-shadow: 0 2px 4px rgba(var(--vf-brand), 0.2) !important;
        }
        
        .vf-mobile-tabs-segmented .ant-segmented-item:active {
          background-color: rgba(var(--vf-brand), 0.1) !important;
        }
      `}</style>
    </div>
  );
};
