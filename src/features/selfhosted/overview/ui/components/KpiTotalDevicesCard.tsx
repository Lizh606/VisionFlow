
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Server } from 'lucide-react';
import { VFCard } from '../../../../../shared/ui/VFCard';
import { DeviceCounts } from '../../model/types';

interface Props {
  data: DeviceCounts;
}

export const KpiTotalDevicesCard: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();

  const LegendItem = ({ color, label, pct }: { color: string, label: string, pct: number }) => (
    <div className="flex items-center justify-between text-sm py-1">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-[12px] font-normal text-text-secondary leading-[18px]">{label}</span>
      </div>
      <span className="text-[12px] font-semibold text-text-primary tabular-nums">{pct}%</span>
    </div>
  );

  return (
    <VFCard className="h-full relative" noPadding>
      <div className="p-6 pb-2">
        {/* T6 Caption Strong (12/18, 500) */}
        <div className="text-[12px] font-semibold text-text-tertiary uppercase tracking-wider mb-4 leading-[18px]">
          {t('selfhosted.overview.kpi.totalDevices')}
        </div>
        
        <div className="flex justify-between items-start mb-6">
          {/* T1 Display (32/40, 600) */}
          <div className="text-[32px] font-semibold text-text-primary tracking-tight leading-[40px] tabular-nums">
            {data.total}
          </div>
          <div className="w-10 h-10 rounded-lg bg-info/10 text-info flex items-center justify-center border border-info/20">
            <Server size={20} />
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 flex flex-col gap-1 mt-2 border-t border-divider pt-4">
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
