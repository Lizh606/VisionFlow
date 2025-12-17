
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
        <span className="text-text-secondary">{label}</span>
      </div>
      <span className="font-bold text-text-primary">{pct}%</span>
    </div>
  );

  return (
    <VFCard className="h-full relative" noPadding>
      <div className="p-6 pb-2">
        <div className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-4">
          {t('selfhosted.overview.kpi.totalDevices')}
        </div>
        
        <div className="flex justify-between items-start mb-6">
          <div className="text-4xl font-bold text-text-primary tracking-tight">
            {data.total}
          </div>
          <div className="w-10 h-10 rounded-lg bg-info/10 text-info flex items-center justify-center">
            <Server size={20} />
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 flex flex-col gap-1 border-t border-transparent">
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
