
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, AlertCircle } from 'lucide-react';
import { Progress } from 'antd';
import { VFCard } from '../../../../../shared/ui/VFCard';
import { LicenseData } from '../../model/types';

interface Props {
  data: LicenseData;
}

export const KpiLicenseUsageCard: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <VFCard className="h-full" noPadding>
      <div className="p-6">
        <div className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-4">
          {t('selfhosted.overview.kpi.licenseUsage')}
        </div>

        <div className="flex justify-between items-start mb-6">
           <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-text-primary tracking-tight">{data.used}</span>
              <span className="text-xl text-text-tertiary font-medium">/{data.total}</span>
           </div>
           <div className="w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center">
             <FileText size={20} />
           </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress 
            percent={(data.used / data.total) * 100} 
            showInfo={false} 
            strokeColor="var(--vf-brand)" 
            trailColor="var(--vf-bg-page)"
            strokeLinecap="round"
            size={['100%', 8]}
          />
        </div>

        {/* Warning Banner */}
        {data.expiringCount > 0 && (
          <div className="flex items-center justify-center gap-2 bg-warning/10 border border-warning/20 rounded-lg py-2 px-3 text-warning-600">
             <AlertCircle size={14} className="text-warning" />
             <span className="text-sm font-semibold text-warning">
               {t('selfhosted.overview.kpi.expiringSoon', { count: data.expiringCount })}
             </span>
          </div>
        )}
      </div>
    </VFCard>
  );
};
