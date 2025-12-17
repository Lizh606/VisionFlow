
import React from 'react';
import { useTranslation } from 'react-i18next';
import { VFCard } from '../../../../../shared/ui/VFCard';
import { VFChart } from '../../../../../shared/charts/VFChart';
import { DeviceStatusChartData } from '../../model/types';

interface Props {
  data: DeviceStatusChartData[];
}

export const DeviceStatusChartCard: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();

  // Status Colors (Hex codes to ensure stable Canvas rendering in ECharts)
  // Matching tokens.css / tokens.ts values:
  // Success: #0F9D58 (Online)
  // Warning: #FBBC04 (Pending License)
  // Error:   #EA4335 (Offline)
  // Info:    #4285F4 (Draining)
  // Neutral: #9AA0A6 (Decommissioned - Grey500)
  const STATUS_COLORS = {
    success: '#0F9D58',
    warning: '#FBBC04',
    error: '#EA4335',
    info: '#4285F4',
    neutral: '#9AA0A6', 
  };

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    
    // Semantic Mapping (Strict per spec)
    if (s.includes('online')) return STATUS_COLORS.success;
    if (s.includes('pending')) return STATUS_COLORS.warning;
    if (s.includes('draining')) return STATUS_COLORS.info;     // Info Blue
    if (s.includes('offline')) return STATUS_COLORS.error;     // Error Red
    if (s.includes('error')) return STATUS_COLORS.error;
    if (s.includes('decommis')) return STATUS_COLORS.neutral;  // Neutral Grey
    
    // Fallback for any other state
    return STATUS_COLORS.neutral; 
  };

  const options = {
    tooltip: { trigger: 'item' },
    grid: { left: 0, right: 0, bottom: 20, top: 30, containLabel: true },
    xAxis: {
      type: 'category',
      data: data.map(d => d.status),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { 
        interval: 0, 
        fontSize: 11,
        // Use var for text as DOM-based text rendering handles CSS vars well
        color: 'var(--vf-text-secondary)' 
      }
    },
    yAxis: {
      type: 'value',
      show: true,
      splitLine: { 
        show: true, 
        lineStyle: { type: 'dashed', color: 'rgba(var(--vf-border), 0.5)' } 
      }
    },
    series: [
      {
        data: data.map(d => ({
          value: d.count,
          itemStyle: { color: getStatusColor(d.status) }
        })),
        type: 'bar',
        barWidth: 24,
        itemStyle: { borderRadius: [4, 4, 0, 0] },
        label: { 
          show: true, 
          position: 'top', 
          fontSize: 12, 
          fontWeight: 'bold', 
          color: 'var(--vf-text-primary)' 
        }
      }
    ]
  };

  return (
    <VFCard 
      className="h-full" 
      title={t('selfhosted.overview.charts.deviceStatus')}
    >
      <VFChart options={options} height={250} />
    </VFCard>
  );
};
