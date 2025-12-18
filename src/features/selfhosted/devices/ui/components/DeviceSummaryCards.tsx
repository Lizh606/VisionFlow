
import React, { useState } from 'react';
import { Space, Button, Tooltip, Dropdown, App } from 'antd';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { Copy, ExternalLink, History, ChevronDown, Server, Cloud } from 'lucide-react';
import dayjs from '../../../../../config/dayjsConfig';
import { Device } from '../../../common/types';
import { VFCard } from '../../../../../shared/ui/VFCard';
import { DeviceStatusTag } from '../../../components/DeviceStatusTag';
import { DeploymentModeTag } from '../../../components/DeploymentModeTag';
import { LicenseSelectModal } from '../../../components/LicenseSelectModal';
import { VFTag } from '../../../../../shared/ui/VFTag';

interface Props {
  device: Device;
  isAdmin: boolean;
  onModeChange: (mode: string) => void;
}

export const DeviceSummaryCards: React.FC<Props> = ({ device, isAdmin, onModeChange }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [licModalOpen, setLicModalOpen] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success(t('common.copy'));
  };

  const InfoRow = ({ label, value, copyable }: { label: string, value: string | React.ReactNode, copyable?: string }) => (
    <div className="flex items-center justify-between py-1.5 border-b border-divider last:border-b-0 min-h-[40px]">
      <span className="text-text-tertiary text-sm font-medium">{label}</span>
      <div className="flex items-center gap-1 overflow-hidden">
        <div className="font-semibold text-text-primary truncate max-w-[160px]">{value}</div>
        {copyable && (
          <Button 
            type="text" 
            size="small" 
            className="flex items-center justify-center p-0 h-7 w-7 text-text-tertiary hover:text-brand transition-colors rounded-control"
            icon={<Copy size={13} />}
            onClick={() => copyToClipboard(copyable)}
          />
        )}
      </div>
    </div>
  );

  const modeMenuItems: MenuProps['items'] = [
    { 
      key: 'EDGE', 
      label: 'EDGE (Local)', 
      icon: <Server size={14} />,
      onClick: () => onModeChange('EDGE')
    },
    { 
      key: 'CLOUD', 
      label: 'CLOUD (Runner)', 
      icon: <Cloud size={14} />,
      onClick: () => onModeChange('CLOUD')
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Card A: Device Overview - Lighter Neutral Selector */}
      <VFCard 
        title={t('selfhosted.deviceDetail.summary.overviewTitle')} 
        className="h-full"
        extra={
          isAdmin ? (
            <Dropdown menu={{ items: modeMenuItems }} trigger={['click']} placement="bottomRight">
              <Button 
                size="small" 
                className="h-8 flex items-center gap-1.5 px-3 text-[13px] font-medium border-border text-text-secondary hover:text-text-primary hover:border-border-strong rounded-control transition-all bg-bg-page/40"
              >
                {device.deployment_mode === 'EDGE' ? <Server size={14} className="opacity-60" /> : <Cloud size={14} className="opacity-60" />}
                {device.deployment_mode}
                <ChevronDown size={14} className="opacity-40" />
              </Button>
            </Dropdown>
          ) : (
            <DeploymentModeTag mode={device.deployment_mode} />
          )
        }
      >
        <div className="flex flex-col">
          <div className="mb-2 min-h-[44px] flex items-center">
            <DeviceStatusTag status={device.status} />
          </div>
          <div className="flex flex-col gap-0.5">
            <InfoRow label={t('selfhosted.deviceDetail.summary.deviceId')} value={device.device_id} copyable={device.device_id} />
            <InfoRow label={t('selfhosted.deviceDetail.summary.runtimeId')} value={device.runtime_id} copyable={device.runtime_id} />
            <InfoRow 
              label={t('selfhosted.deviceDetail.summary.lastSeen')} 
              value={
                <Tooltip title={dayjs(device.last_seen_at).format('YYYY-MM-DD HH:mm:ss')}>
                  <span className="cursor-help text-text-secondary">
                    {dayjs(device.last_seen_at).fromNow()}
                  </span>
                </Tooltip>
              } 
            />
          </div>
        </div>
      </VFCard>

      {/* Card B: License Information - Primary Action (Brand Outline) */}
      <VFCard 
        title={t('selfhosted.deviceDetail.summary.licenseTitle')} 
        className="h-full"
        extra={
          isAdmin && (
            <Button 
              size="small" 
              className="h-8 flex items-center gap-1.5 px-3 text-[13px] font-bold text-brand border-brand hover:text-brand-hover hover:border-brand-hover hover:bg-brand/5 transition-all rounded-control bg-transparent"
              onClick={() => setLicModalOpen(true)}
            >
              <ExternalLink size={16} />
              {t('selfhosted.deviceDetail.summary.changeLicense')}
            </Button>
          )
        }
      >
        <div className="flex flex-col">
          <div className="mb-2 min-h-[44px] flex items-center">
             <div className="text-lg font-bold text-text-primary flex items-center gap-1.5 cursor-pointer hover:text-brand transition-colors group">
                {device.license_name || 'N/A'} 
                <ExternalLink size={16} className="text-text-tertiary group-hover:text-brand transition-colors" />
             </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <InfoRow label={t('selfhosted.deviceDetail.summary.expiry')} value={dayjs().add(120, 'day').format('YYYY-MM-DD')} />
            <InfoRow label={t('selfhosted.deviceDetail.summary.quota')} value="8 / 20 Slots" />
            <InfoRow label={t('selfhosted.deviceDetail.summary.offlineLease')} value={
              <span className="text-success font-bold">{t('common.status.enabled', { defaultValue: '已启用' })}</span>
            } />
          </div>
        </div>
      </VFCard>

      {/* Card C: Current Configuration - Secondary Action (Link style) */}
      <VFCard 
        title={t('selfhosted.deviceDetail.summary.configTitle')} 
        className="h-full"
        extra={
          <Button 
            type="text" 
            size="small" 
            className="h-8 flex items-center gap-1.5 px-2.5 text-[13px] font-semibold text-text-secondary hover:text-brand hover:bg-action-hover transition-all rounded-control"
            icon={<History size={16} />}
          >
            {t('selfhosted.deviceDetail.summary.viewHistory')}
          </Button>
        }
      >
        <div className="flex flex-col">
          <div className="mb-2 min-h-[44px] flex items-center">
             <div className="text-lg font-bold text-text-primary flex items-center gap-2">
                {device.config_version}
                <VFTag variant="neutral" className="h-5 text-[10px] px-1.5 opacity-60 font-bold" filled={false}>
                  {t('selfhosted.workflowDeployment.latest')}
                </VFTag>
             </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <InfoRow 
              label={t('selfhosted.deviceDetail.summary.streamsCount')} 
              value={t('selfhosted.deviceDetail.summary.streamsRunning', { count: 3 })} 
            />
            <InfoRow 
              label={t('selfhosted.deviceDetail.summary.configuredBy')} 
              value={<span className="text-text-secondary">Admin</span>} 
            />
            <InfoRow 
              label={t('selfhosted.deviceDetail.summary.lastModifiedTime')} 
              value={<span className="text-text-secondary">2h ago</span>} 
            />
          </div>
        </div>
      </VFCard>

      <LicenseSelectModal 
        open={licModalOpen} 
        onCancel={() => setLicModalOpen(false)}
        onSelect={(lic) => {
          setLicModalOpen(false);
          message.success(t('selfhosted.deviceDetail.summary.licenseUpdated', { defaultValue: '授权信息已更新' }));
        }}
      />
    </div>
  );
};
