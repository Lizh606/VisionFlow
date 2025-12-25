
import React from 'react';
import { VFChart } from '../../../../shared/charts/VFChart';
import { TrendPoint } from '../../types/dashboard';

interface Props {
  data: TrendPoint[];
  color: string;
  type?: 'line' | 'bar';
}

export const StudioTrendChart: React.FC<Props> = ({ data, color, type = 'line' }) => {
  const options = {
    grid: { top: 2, bottom: 2, left: 0, right: 0 },
    xAxis: { 
      show: false, 
      type: 'category', 
      data: data.map(d => d.time) 
    },
    yAxis: { show: false, min: (v: any) => v.min - 0.5 },
    series: [{
      type,
      smooth: true,
      showSymbol: false,
      data: data.map(d => d.value),
      itemStyle: { color },
      lineStyle: { width: 1.5, color },
      areaStyle: type === 'line' ? { 
        opacity: 0.1, 
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{ offset: 0, color }, { offset: 1, color: 'transparent' }]
        }
      } : undefined,
    }]
  };

  // V1.4: Sparkline 容器标准化 72x24
  return <div className="w-[72px] h-6"><VFChart options={options} height="100%" /></div>;
};
