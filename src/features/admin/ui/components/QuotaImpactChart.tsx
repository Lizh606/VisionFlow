
import React from 'react';
import { VFChart } from '../../../../shared/charts/VFChart';
import { QuotaImpactData } from '../../types/quota';

interface Props {
  data: QuotaImpactData[];
}

export const QuotaImpactChart: React.FC<Props> = ({ data }) => {
  const options = {
    tooltip: { trigger: 'axis' },
    legend: { bottom: 0, icon: 'circle' },
    grid: { left: 0, right: 0, bottom: 40, top: 20, containLabel: true },
    xAxis: {
      type: 'category',
      data: data.map(d => d.time),
      axisLabel: { interval: 3 }
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'Actual Usage',
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: data.map(d => d.usage),
        lineStyle: { width: 2.5, color: '#6D29D9' },
        areaStyle: { opacity: 0.1, color: '#6D29D9' }
      },
      {
        name: 'New Limit',
        type: 'line',
        step: 'start',
        data: data.map(d => d.limit),
        lineStyle: { type: 'dashed', width: 1.5, color: 'rgba(234, 67, 53, 0.6)' },
        symbol: 'none'
      }
    ]
  };

  return <VFChart options={options} height="100%" />;
};
