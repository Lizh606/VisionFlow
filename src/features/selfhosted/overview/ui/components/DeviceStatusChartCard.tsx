
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

  const STATUS_COLORS = {
    success: '#0F9D58',
    warning: '#FBBC04',
    error: '#EA4335',
    info: '#528BFF',
    neutral: '#9AA0A6', 
  };

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('online')) return STATUS_COLORS.success;
    if (s.includes('pending')) return STATUS_COLORS.warning;
    if (s.includes('draining')) return STATUS_COLORS.info;
    if (s.includes('offline')) return STATUS_COLORS.error;
    if (s.includes('error')) return STATUS_COLORS.error;
    if (s.includes('decommis')) return STATUS_COLORS.neutral;
    return STATUS_COLORS.neutral; 
  };

  const options = {
    tooltip: { trigger: 'item' },
    xAxis: {
      type: 'category',
      data: data.map(d => d.status),
      axisLabel: { interval: 0 }
    },
    yAxis: {
      type: 'value',
      name: t('selfhosted.overview.charts.count'),
      nameTextStyle: {
        align: 'left',
        padding: [0, 0, 8, 0]
      }
    },
    grid: { left: 0, right: 0, bottom: 0, top: 45, containLabel: true },
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
