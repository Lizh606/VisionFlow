
import React from 'react';
import { Progress, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { Info, Ticket, AlertCircle, Layers } from 'lucide-react';
import { VFCard } from '../../../../../shared/ui/VFCard';
import { LicenseKPI } from '../../model/types';

interface KpiRowProps {
  data: LicenseKPI;
}

export const KpiRow: React.FC<KpiRowProps> = ({ data }) => {
  const { t } = useTranslation();

  const utilization = Math.round((data.usedQuota / data.totalQuota) * 100);
  const statusColor = utilization > 90 ? 'var(--vf-error)' : utilization > 75 ? 'var(--vf-warning)' : 'var(--vf-brand)';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* 1. Utilization (Most Important) */}
      <VFCard className="h-full">
        <div className="flex flex-col h-full justify-between gap-4">
          <div className="flex items-center justify-between text-text-tertiary">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Layers size={14} />
              {t('selfhosted.overview.kpi.utilization')}
            </span>
            <Tooltip title="Total stream quota used across all license keys">
              <Info size={14} className="cursor-help opacity-70 hover:opacity-100" />
            </Tooltip>
          </div>
          
          <div>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-3xl font-bold text-text-primary leading-none">
                {utilization}%
              </span>
              <span className="text-sm text-text-secondary mb-1">
                ({data.usedQuota} / {data.totalQuota})
              </span>
            </div>
            <Progress 
              percent={utilization} 
              showInfo={false} 
              strokeColor={statusColor} 
              trailColor="rgba(var(--vf-brand) / 0.1)"
              size="small"
            />
          </div>
        </div>
      </VFCard>

      {/* 2. Active Licenses */}
      <VFCard className="h-full">
        <div className="flex flex-col h-full justify-between gap-2">
          <div className="text-xs font-bold text-text-tertiary uppercase tracking-wider flex items-center gap-1.5">
            <Ticket size={14} />
            {t('selfhosted.overview.kpi.activeLicenses')}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-text-primary">{data.activeLicenses}</span>
            <span className="text-sm text-text-tertiary">/ {data.totalLicenses} Total</span>
          </div>
          <div className="text-xs text-success bg-success/10 px-2 py-0.5 rounded-tag w-fit">
            Healthy Status
          </div>
        </div>
      </VFCard>

      {/* 3. Expiring Soon */}
      <VFCard className="h-full relative overflow-hidden">
        {data.expiringSoon > 0 && (
          <div className="absolute top-0 right-0 w-1.5 h-full bg-warning" />
        )}
        <div className="flex flex-col h-full justify-between gap-2">
          <div className="text-xs font-bold text-text-tertiary uppercase tracking-wider flex items-center gap-1.5">
            <AlertCircle size={14} />
            {t('selfhosted.overview.kpi.expiring')}
          </div>
          <div className="text-3xl font-bold text-text-primary">{data.expiringSoon}</div>
          <div className="text-xs text-text-secondary">
            Licenses expiring in next 30 days
          </div>
        </div>
      </VFCard>

      {/* 4. Pending Devices (Actionable) */}
      <VFCard className="h-full border-dashed border-border-strong hover:border-brand cursor-pointer group transition-colors">
         <div className="flex flex-col h-full justify-between gap-2">
           <div className="text-xs font-bold text-text-tertiary uppercase tracking-wider">
             {t('selfhosted.overview.kpi.pending')}
           </div>
           <div className="text-3xl font-bold text-brand group-hover:scale-105 transition-transform origin-left">
             {data.pendingDevices}
           </div>
           <div className="text-xs text-brand font-medium">
             Click to assign licenses &rarr;
           </div>
         </div>
      </VFCard>
    </div>
  );
};
