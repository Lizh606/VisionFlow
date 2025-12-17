
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

  // Defined explicit HEX colors to ensure stability in ECharts Canvas rendering
  // These match the VisionFlow DataViz tokens:
  // DataViz 3 (Teal): #22C1C3 (Edge)
  // DataViz 1 (Purple): #6D29D9 (Cloud)
  const COLORS = {
    edge: '#22C1C3', 
    cloud: '#6D29D9' 
  };

  const options = {
    tooltip: { trigger: 'axis' },
    legend: { 
      data: [t('selfhosted.overview.charts.edge'), t('selfhosted.overview.charts.cloud')],
      icon: 'circle',
      left: 0,
      top: 0,
      textStyle: { color: '#6B778C' } // text-tertiary hex for safety
    },
    grid: { left: 0, right: 10, bottom: 0, top: 40, containLabel: true },
    xAxis: {
      type: 'category',
      data: data.map(d => d.time),
      boundaryGap: false,
      axisLabel: { color: '#6B778C' } // text-tertiary hex
    },
    yAxis: {
      type: 'value',
      splitLine: { show: true, lineStyle: { type: 'dashed', color: 'rgba(229, 234, 242, 0.5)' } } // border hex + alpha
    },
    series: [
      {
        name: t('selfhosted.overview.charts.edge'),
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: data.map(d => d.edge),
        lineStyle: { color: COLORS.edge, width: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(34, 193, 195, 0.2)' }, // Match DataViz 3 RGB
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
        lineStyle: { color: COLORS.cloud, width: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(109, 41, 217, 0.2)' }, // Match Brand RGB
            { offset: 1, color: 'rgba(109, 41, 217, 0)' }
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
