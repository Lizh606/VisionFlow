
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VFCard } from '../../../../../shared/ui/VFCard';
import { VFChart } from '../../../../../shared/charts/VFChart';
import { MediaTypeToggle, MediaType } from '../../../../../shared/ui/MediaTypeToggle';
import { UsageTrendPoint } from '../../model/types';
import * as echarts from 'echarts';

interface Props {
  data: UsageTrendPoint[];
}

export const UsageTrendChartCard: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const [mediaType, setMediaType] = useState<MediaType>('img');

  const COLORS = {
    edge: '#22C1C3',
    cloud: '#818CF8'
  };

  const options = {
    tooltip: { trigger: 'axis' },
    legend: { 
      data: [t('selfhosted.overview.charts.edge'), t('selfhosted.overview.charts.cloud')],
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      left: 0,
      top: 0
    },
    grid: { left: 0, right: 10, bottom: 0, top: 40, containLabel: true },
    xAxis: {
      type: 'category',
      data: data.map(d => d.time),
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: t('selfhosted.overview.charts.edge'),
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: data.map(d => d.edge),
        lineStyle: { color: COLORS.edge, width: 2.5 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(34, 193, 195, 0.2)' },
            { offset: 1, color: 'rgba(34, 193, 195, 0)' }
          ])
        }
      },
      {
        name: t('selfhosted.overview.charts.cloud'),
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: data.map(d => d.cloud),
        lineStyle: { color: COLORS.cloud, width: 2.5 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(129, 140, 248, 0.2)' },
            { offset: 1, color: 'rgba(129, 140, 248, 0)' }
          ])
        }
      }
    ]
  };

  return (
    <VFCard 
      className="h-full" 
      title={t('selfhosted.overview.charts.usageTrend')}
      extra={<MediaTypeToggle value={mediaType} onChange={setMediaType} />}
    >
      <VFChart options={options} height={250} />
    </VFCard>
  );
};
