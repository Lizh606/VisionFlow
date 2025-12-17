
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Progress } from 'antd';
import { VFCard } from '../../../../../shared/ui/VFCard';
import { MediaTypeToggle, MediaType } from '../../../../../shared/ui/MediaTypeToggle';
import { UsageSummaryData } from '../../model/types';

interface Props {
  data: UsageSummaryData;
}

export const KpiUsageSummaryCard: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const [mediaType, setMediaType] = useState<MediaType>('img');

  const UsageRow = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div className="mb-5 last:mb-0">
      <div className="flex justify-between items-end mb-2">
         <span className="text-xs font-bold text-text-tertiary uppercase tracking-wide">{label}</span>
         <span className="text-sm font-bold text-text-primary tabular-nums">{value}{data.unit}</span>
      </div>
      <Progress 
        percent={70} // Mock percentage
        showInfo={false} 
        strokeColor={color} 
        trailColor="rgb(var(--vf-bg-page))"
        strokeWidth={8} // Use strokeWidth for bar thickness instead of size array with strings
      />
    </div>
  );

  return (
    <VFCard className="h-full" noPadding>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs font-bold text-text-tertiary uppercase tracking-wider">
            {t('selfhosted.overview.kpi.usageSummary')}
          </div>
          <MediaTypeToggle value={mediaType} onChange={setMediaType} />
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <UsageRow 
            label={t('selfhosted.overview.charts.edge')} 
            value={data.edge} 
            color="rgb(var(--vf-dataviz-3))" // Teal
          />
          <UsageRow 
            label={t('selfhosted.overview.charts.cloud')} 
            value={data.cloud} 
            color="rgb(var(--vf-dataviz-1))" // Brand/Purple
          />
        </div>
      </div>
    </VFCard>
  );
};
