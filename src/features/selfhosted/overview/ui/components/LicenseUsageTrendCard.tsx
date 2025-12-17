
import React from 'react';
import { useTranslation } from 'react-i18next';
import { VFCard } from '../../../../../shared/ui/VFCard';
import { VFChart } from '../../../../../shared/charts/VFChart';
import { LicenseTrendPoint } from '../../model/types';
import * as echarts from 'echarts';

interface Props {
  data: LicenseTrendPoint[];
}

export const LicenseUsageTrendCard: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();

  const options = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      bottom: 0,
      icon: 'circle',
      textStyle: { color: 'var(--vf-text-secondary)' }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map(d => d.date),
    },
    yAxis: {
      type: 'value',
      min: (value: { min: number }) => Math.max(0, value.min - 100),
    },
    series: [
      {
        name: t('selfhosted.overview.charts.usageSeries'),
        type: 'line',
        data: data.map(d => d.used),
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 3 },
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(109, 41, 217, 0.8)' }, // vf-brand
            { offset: 1, color: 'rgba(109, 41, 217, 0.0)' }
          ])
        },
      },
      {
        name: t('selfhosted.overview.charts.quotaSeries'),
        type: 'line',
        data: data.map(d => d.quota),
        showSymbol: false,
        lineStyle: { type: 'dashed', width: 2, color: 'var(--vf-text-disabled)' },
      }
    ]
  };

  return (
    <VFCard title={t('selfhosted.overview.charts.usageTrend')} className="h-[400px]">
      <VFChart options={options} height="100%" />
    </VFCard>
  );
};
