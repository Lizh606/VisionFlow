
import React, { useState } from 'react';
import { Space, Button, Tooltip, Dropdown, App } from 'antd';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { Copy, ExternalLink, History, ChevronDown, Server, Cloud, ShieldAlert, FileX } from 'lucide-react';
import dayjs from '../../../../../config/dayjsConfig';
import { Device } from '../../../common/types';
import { VFCard } from '../../../../../shared/ui/VFCard';
import { DeviceStatusTag } from '../../../components/DeviceStatusTag';
import { DeploymentModeTag } from '../../../components/DeploymentModeTag';
import { LicenseSelectModal } from '../../../components/LicenseSelectModal';
import { VFTag } from '../../../../../shared/ui/VFTag';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';

interface Props {
  device: Device;
  isAdmin: boolean;
  onModeChange: (mode: string) => void;
}

export const DeviceSummaryCards: React.FC<Props> = ({ device, isAdmin, onModeChange }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [licModalOpen, setLicModalOpen] = useState(false);
  const { isMobile } = useResponsive();

  const isUnbound = device.status === 'PENDING_LICENSE';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success(t('common.copy'));
  };

  const InfoRow = ({ label, value, copyable, empty }: { label: string, value: string | React.ReactNode, copyable?: string, empty?: boolean }) => (
    <div className={`flex items-center justify-between py-2 border-b border-divider last:border-b-0 min-h-[44px] ${empty ? 'opacity-40' : ''}`}>
      <span className="text-text-tertiary text-[13px] font-medium">{label}</span>
      <div className="flex items-center gap-2 overflow-hidden">
        <div className={`font-semibold text-text-primary text-sm truncate max-w-[140px] sm:max-w-[160px] ${empty ? 'font-normal italic' : ''}`}>
          {empty ? '---' : value}
        </div>
        {copyable && !empty && (
          <Button 
            type="text" 
            size="small" 
            className="flex items-center justify-center p-0 h-8 w-8 text-text-tertiary hover:text-brand transition-colors rounded-control"
            icon={<Copy size={14} />}
            onClick={() => copyToClipboard(copyable)}
          />
        )}
      </div>
    </div>
  );

  const modeMenuItems: MenuProps['items'] = [
    { key: 'EDGE', label: 'EDGE (Local)', icon: <Server size={14} />, onClick: () => onModeChange('EDGE') },
    { key: 'CLOUD', label: 'CLOUD (Runner)', icon: <Cloud size={14} />, onClick: () => onModeChange('CLOUD') },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Card A: Device Overview */}
      <VFCard 
        title={t('selfhosted.deviceDetail.summary.overviewTitle')} 
        extra={
          isAdmin ? (
            <Dropdown menu={{ items: modeMenuItems }} trigger={['click']} placement="bottomRight">
              <Button 
                className="h-9 sm:h-8 flex items-center gap-1.5 px-3 text-[13px] font-medium border-border text-text-secondary rounded-control bg-bg-page/40"
              >
                {device.deployment_mode === 'EDGE' ? <Server size={14} /> : <Cloud size={14} />}
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
          <div className="flex flex-col">
            <InfoRow label={t('selfhosted.deviceDetail.summary.deviceId')} value={device.device_id} copyable={device.device_id} />
            <InfoRow label={t('selfhosted.deviceDetail.summary.runtimeId')} value={device.runtime_id} copyable={device.runtime_id} />
            <InfoRow 
              label={t('selfhosted.deviceDetail.summary.lastSeen')} 
              value={
                <Tooltip title={dayjs(device.last_seen_at).format('YYYY-MM-DD HH:mm:ss')}>
                  <span className="text-text-secondary">{dayjs(device.last_seen_at).fromNow()}</span>
                </Tooltip>
              } 
            />
          </div>
        </div>
      </VFCard>

      {/* Card B: License Information */}
      <VFCard 
        title={t('selfhosted.deviceDetail.summary.licenseTitle')} 
        extra={
          isAdmin && (
            <Button 
              type={isUnbound ? 'primary' : 'default'}
              className={`h-9 sm:h-8 flex items-center gap-1.5 px-3 text-[13px] font-bold rounded-control ${!isUnbound ? 'text-brand border-brand hover:bg-brand/5' : 'bg-brand'}`}
              onClick={() => setLicModalOpen(true)}
            >
              <ExternalLink size={14} />
              {isUnbound ? 'Bind License' : (isMobile ? t('common.edit') : t('selfhosted.deviceDetail.summary.changeLicense'))}
            </Button>
          )
        }
      >
        <div className="flex flex-col">
          <div className="mb-2 min-h-[44px] flex items-center">
             {isUnbound ? (
               <div className="flex items-center gap-2 text-warning animate-pulse">
                 <ShieldAlert size={18} />
                 <span className="text-sm font-bold tracking-tight">Awaiting License</span>
               </div>
             ) : (
               <div className="text-base sm:text-lg font-bold text-text-primary flex items-center gap-1.5 cursor-pointer hover:text-brand transition-colors">
                  {device.license_name || 'N/A'} 
                  <ExternalLink size={16} className="text-text-tertiary" />
               </div>
             )}
          </div>
          <div className="flex flex-col">
            <InfoRow label={t('selfhosted.deviceDetail.summary.expiry')} value="---" empty={isUnbound} />
            <InfoRow label={t('selfhosted.deviceDetail.summary.quota')} value="---" empty={isUnbound} />
            <InfoRow label={t('selfhosted.deviceDetail.summary.offlineLease')} value="---" empty={isUnbound} />
          </div>
        </div>
      </VFCard>

      {/* Card C: Current Configuration */}
      <VFCard 
        title={t('selfhosted.deviceDetail.summary.configTitle')} 
        extra={
          !isUnbound && (
            <Button 
              type="text" 
              className="h-9 sm:h-8 flex items-center gap-1.5 px-2.5 text-[13px] font-semibold text-text-secondary hover:text-brand hover:bg-action-hover rounded-control"
              icon={<History size={16} />}
            >
              {isMobile ? '' : t('selfhosted.deviceDetail.summary.viewHistory')}
            </Button>
          )
        }
      >
        <div className="flex flex-col">
          <div className="mb-2 min-h-[44px] flex items-center">
             {isUnbound ? (
               <div className="flex items-center gap-2 text-text-tertiary opacity-60">
                 <FileX size={18} />
                 <span className="text-sm font-medium italic">No configuration found</span>
               </div>
             ) : (
               <div className="text-base sm:text-lg font-bold text-text-primary flex items-center gap-2">
                  {device.config_version}
                  <VFTag variant="neutral" className="h-5 text-[10px] px-1.5 font-bold" filled={false}>
                    {t('selfhosted.workflowDeployment.latest')}
                  </VFTag>
               </div>
             )}
          </div>
          <div className="flex flex-col">
            <InfoRow 
              label={t('selfhosted.deviceDetail.summary.streamsCount')} 
              value="---" 
              empty={isUnbound}
            />
            <InfoRow label={t('selfhosted.deviceDetail.summary.configuredBy')} value="---" empty={isUnbound} />
            <InfoRow label={t('selfhosted.deviceDetail.summary.lastModifiedTime')} value="---" empty={isUnbound} />
          </div>
        </div>
      </VFCard>

      <LicenseSelectModal open={licModalOpen} onCancel={() => setLicModalOpen(false)} onSelect={() => setLicModalOpen(false)} />
    </div>
  );
};
