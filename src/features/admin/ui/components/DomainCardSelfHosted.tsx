
import React from 'react';
import { Cpu, ShieldAlert, ChevronRight, Info } from 'lucide-react';
import { Tooltip, Popover } from 'antd';
import { useTranslation } from 'react-i18next';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFText } from '../../../../ui/VFText';
import { SelfHostedStats } from '../../types/dashboard';

export const DomainCardSelfHosted: React.FC<{ data: SelfHostedStats; onDrillDown: () => void }> = ({ data, onDrillDown }) => {
  const { t } = useTranslation();
  const visibleVersions = (data?.versionDistribution || []).slice(0, 2);
  const overflowCount = (data?.versionDistribution || []).length - visibleVersions.length;

  return (
    <VFCard 
      title={
        <div className="flex items-center gap-2 cursor-pointer group/title" onClick={onDrillDown}>
          <span>{t('admin.overview.domains.selfhosted')}</span>
          <ChevronRight size={16} className="text-text-tertiary opacity-0 group-hover/title:opacity-100 transition-all -translate-x-1 group-hover/title:translate-x-0" />
        </div>
      } 
      className="h-full border-border hover:border-brand/30 transition-all duration-300"
      extra={
        <div onClick={onDrillDown} className="cursor-pointer hover:opacity-70 select-none">
          <VFText variant="t6" color="brand" className="font-bold tracking-tight">{t('admin.overview.viewAlerts')}</VFText>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col p-4 bg-success/5 border border-success/10 rounded-card">
            <VFText variant="t6" color="success" className="uppercase font-bold tracking-tight mb-1">{t('admin.overview.metrics.online')}</VFText>
            <VFText variant="t2" color="primary" tabularNums>{data?.onlineDevices || 0}</VFText>
          </div>
          <div 
            className={`flex flex-col p-4 transition-all duration-200 cursor-pointer ${(data?.offlineDevices || 0) > 0 ? 'bg-error/5 border-error/10 hover:bg-error/10' : 'bg-bg-page border-divider hover:bg-bg-page/80'} rounded-card`} 
            onClick={onDrillDown}
          >
            <VFText variant="t6" color={(data?.offlineDevices || 0) > 0 ? 'error' : 'tertiary'} className="uppercase font-bold tracking-tight mb-1">{t('admin.overview.metrics.offline')}</VFText>
            <VFText variant="t2" color={(data?.offlineDevices || 0) > 0 ? 'error' : 'primary'} tabularNums>{data?.offlineDevices || 0}</VFText>
          </div>
        </div>

        <div className="bg-bg-page/50 p-4 rounded-card border border-divider">
           <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-wider mb-2 block">{t('admin.overview.metrics.coverage')}</VFText>
           <div className="flex items-baseline gap-2">
             <VFText variant="t3" color="primary" tabularNums>{data?.deploymentCoverage || 0}%</VFText>
             <VFText variant="t6" color="secondary">{t('admin.overview.fleetSynced')}</VFText>
           </div>
        </div>

        <div 
          onClick={onDrillDown}
          className={`flex items-center justify-between p-4 rounded-card border cursor-pointer transition-all hover:bg-bg-page/40 ${(data?.leaseAnomalies || 0) > 0 ? 'bg-warning/5 border-warning/30 hover:border-warning' : 'border-divider'}`}
        >
           <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${(data?.leaseAnomalies || 0) > 0 ? 'text-warning bg-warning/10' : 'text-text-disabled bg-bg-page'}`}>
                <ShieldAlert size={18} />
              </div>
              <VFText variant="t5-strong" color={(data?.leaseAnomalies || 0) > 0 ? 'primary' : 'tertiary'}>{t('admin.overview.metrics.leaseAnomalies')}</VFText>
           </div>
           <div className="flex items-center gap-1">
              <VFText variant="t4" color={(data?.leaseAnomalies || 0) > 0 ? 'warning' : 'tertiary'} tabularNums className="font-bold">{data?.leaseAnomalies || 0}</VFText>
              <ChevronRight size={14} className="text-text-tertiary opacity-40" />
           </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-wider block">{t('admin.overview.versionDistribution')}</VFText>
            <Tooltip title="Distribution of device-side / agent versions across the fleet">
              <Info size={14} className="text-text-tertiary opacity-40 cursor-help" />
            </Tooltip>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {visibleVersions.map((v, i) => (
              <div key={i} className="flex items-center gap-2 px-2.5 py-1 bg-bg-page border border-divider rounded-full transition-colors cursor-default">
                <Cpu size={10} className="text-text-tertiary" />
                <VFText variant="t7" color="secondary">{v.version}</VFText>
                <VFText variant="t7" color="primary" className="font-bold">{v.count}</VFText>
              </div>
            ))}
            {overflowCount > 0 && (
              <Popover 
                title={<VFText variant="t6" color="tertiary" className="uppercase font-bold">{t('common.allStatus')}</VFText>}
                content={
                  <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                    {(data?.versionDistribution || []).map((v, i) => (
                      <div key={i} className="flex items-center justify-between gap-4 py-1 border-b border-divider/20 last:border-none">
                         <VFText variant="t7" color="secondary">{v.version}</VFText>
                         <VFText variant="t7" color="primary" className="font-bold tabular-nums">{v.count}</VFText>
                      </div>
                    ))}
                  </div>
                }
              >
                <div className="px-2.5 py-1 bg-brand/5 border border-brand/20 rounded-full cursor-pointer hover:bg-brand/10 transition-colors">
                  <VFText variant="t7" color="brand" className="font-bold">+{overflowCount}</VFText>
                </div>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </VFCard>
  );
};
