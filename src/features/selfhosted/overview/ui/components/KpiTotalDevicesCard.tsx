
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Server } from 'lucide-react';
import { VFCard } from '../../../../../shared/ui/VFCard';
import { DeviceCounts } from '../../model/types';
import { VFText } from '../../../../../ui/VFText';

interface Props {
  data: DeviceCounts;
}

export const KpiTotalDevicesCard: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();

  const LegendItem = ({ color, label, pct }: { color: string, label: string, pct: number }) => (
    <div className="flex items-center justify-between text-sm py-1">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${color}`} />
        {/* V1.4: Cell Meta = T6 */}
        <VFText variant="t6" color="secondary">{label}</VFText>
      </div>
      {/* V1.4: Numbers = T6 (tabular-nums) */}
      <VFText variant="t6" color="primary" tabularNums className="font-semibold">{pct}%</VFText>
    </div>
  );

  return (
    <VFCard className="h-full relative" noPadding>
      <div className="p-6 pb-2">
        {/* V1.4: T6 Caption Strong (12/18, 500) */}
        <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest mb-4 block leading-none">
          {t('selfhosted.overview.kpi.totalDevices')}
        </VFText>
        
        <div className="flex justify-between items-start mb-6">
          {/* V1.4: T1 Display (28/36, 600) */}
          <VFText variant="t1" color="primary" tabularNums className="leading-none">
            {data.total}
          </VFText>
          <div className="w-10 h-10 rounded-lg bg-info/10 text-info flex items-center justify-center border border-info/20 shrink-0">
            <Server size={20} />
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 flex flex-col gap-1 mt-2 border-t border-divider pt-4 bg-bg-page/5">
        <LegendItem 
          color="bg-success" 
          label={t('selfhosted.overview.kpi.online')} 
          pct={data.onlinePct} 
        />
        <LegendItem 
          color="bg-warning" 
          label={t('selfhosted.overview.kpi.pendingLicense')} 
          pct={data.pendingPct} 
        />
        <LegendItem 
          color="bg-error" 
          label={t('selfhosted.overview.kpi.offline')} 
          pct={data.offlinePct} 
        />
      </div>
    </VFCard>
  );
};
