
import React from 'react';
import { useTranslation } from 'react-i18next';
import { VFCard } from '../../../../../shared/ui/VFCard';
import { VFChart } from '../../../../../shared/charts/VFChart';
import { LicenseDistribution } from '../../model/types';

interface Props {
  data: LicenseDistribution[];
}

export const LicenseBreakdownCard: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();

  const options = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      textStyle: { color: 'var(--vf-text-secondary)' }
    },
    series: [
      {
        name: 'License Type',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: 'var(--vf-bg-card)',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
            color: 'var(--vf-text-primary)'
          }
        },
        labelLine: { show: false },
        data: data.map(d => ({ value: d.count, name: d.type }))
      }
    ]
  };

  return (
    <VFCard title={t('selfhosted.overview.charts.breakdown')} className="h-[400px]">
      <VFChart options={options} height="100%" />
    </VFCard>
  );
};
