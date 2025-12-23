
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, AlertCircle } from 'lucide-react';
import { Progress } from 'antd';
import { VFCard } from '../../../../../shared/ui/VFCard';
import { LicenseData } from '../../model/types';
import { VFText } from '../../../../../ui/VFText';

interface Props {
  data: LicenseData;
}

export const KpiLicenseUsageCard: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <VFCard className="h-full" noPadding>
      <div className="p-6">
        {/* V1.4: T6 Caption Strong */}
        <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest mb-4 block leading-none">
          {t('selfhosted.overview.kpi.licenseUsage')}
        </VFText>

        <div className="flex justify-between items-start mb-6">
           <div className="flex items-baseline gap-1">
              {/* V1.4: T1 Display */}
              <VFText variant="t1" color="primary" tabularNums className="leading-none">
                {data.used}
              </VFText>
              <VFText variant="t4" color="tertiary" className="font-medium opacity-60">/{data.total}</VFText>
           </div>
           <div className="w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center border border-brand/20 shrink-0">
             <FileText size={20} />
           </div>
        </div>

        <div className="mb-6">
          <Progress 
            percent={(data.used / data.total) * 100} 
            showInfo={false} 
            strokeColor="rgba(var(--vf-brand), 1)" 
            trailColor="rgba(var(--vf-divider), 0.3)"
            strokeLinecap="round"
            size={['100%', 8]}
          />
        </div>

        {data.expiringCount > 0 && (
          <div className="flex items-center justify-center gap-2 bg-warning/10 border border-warning/20 rounded-lg py-2 px-3">
             <AlertCircle size={14} className="text-warning" />
             {/* V1.4: Meta Hint = T6 Strong */}
             <VFText variant="t6" color="warning" className="font-bold">
               {t('selfhosted.overview.kpi.expiringSoon', { count: data.expiringCount })}
             </VFText>
          </div>
        )}
      </div>
    </VFCard>
  );
};
