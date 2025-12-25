
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Skeleton, Tooltip } from 'antd';
import { Info, Calendar, Ban } from 'lucide-react';
import { VFCard } from '../../../../../shared/ui/VFCard';
import { VFChart } from '../../../../../shared/charts/VFChart';
import { MediaTypeToggle, MediaType } from '../../../../../shared/ui/MediaTypeToggle';
import { TimeRangeFilter } from '../../../../../shared/ui/TimeRangeFilter';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';
import { mockDevices } from '../../../common/mockData';
import * as echarts from 'echarts';

interface Props {
  deviceId: string;
}

export const UsageSummaryPanel: React.FC<Props> = ({ deviceId }) => {
  const { t } = useTranslation();
  const [mediaType, setMediaType] = useState<MediaType>('img');
  const [loading] = useState(false);
  const { isMobile } = useResponsive();

  const device = mockDevices.find(d => d.id === deviceId);
  const isUnbound = device?.status === 'PENDING_LICENSE';

  const trendData = useMemo(() => {
    if (isUnbound) return [];
    return [
      { time: '08:00', edge: 450, cloud: 120 },
      { time: '10:00', edge: 520, cloud: 150 },
      { time: '12:00', edge: 310, cloud: 280 },
      { time: '14:00', edge: 740, cloud: 110 },
      { time: '16:00', edge: 680, cloud: 90 },
      { time: '18:00', edge: 890, cloud: 140 },
      { time: '20:00', edge: 420, cloud: 200 },
    ];
  }, [isUnbound]);

  const totalUsage = useMemo(() => {
    if (isUnbound) return "---";
    const sum = trendData.reduce((acc, curr) => acc + curr.edge + curr.cloud, 0);
    return sum.toLocaleString();
  }, [trendData, isUnbound]);

  // Resolved colors for Canvas
  const COLORS = {
    edge: '#22C1C3',
    cloud: '#818CF8',
    divider: 'rgba(226, 232, 240, 0.5)'
  };

  const chartOptions = {
    tooltip: { trigger: 'axis' },
    legend: {
      data: [t('selfhosted.overview.charts.edge'), t('selfhosted.overview.charts.cloud')],
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      left: 0,
      top: 0,
      textStyle: { fontWeight: 500 , fontSize: 10 }
    },
    grid: { 
      left: 0, 
      right: isMobile ? 5 : 10, 
      bottom: 0, 
      top: 40, 
      containLabel: true 
    },
    xAxis: {
      type: 'category',
      data: trendData.map(d => d.time || ''),
      boundaryGap: false,
      axisLine: { lineStyle: { color: COLORS.divider } }
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: t('selfhosted.overview.charts.edge'),
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: trendData.map(d => d.edge || 0),
        lineStyle: { color: COLORS.edge, width: 2.5 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(34, 193, 195, 0.15)' },
            { offset: 1, color: 'rgba(34, 193, 195, 0)' }
          ])
        }
      },
      {
        name: t('selfhosted.overview.charts.cloud'),
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: trendData.map(d => d.cloud || 0),
        lineStyle: { color: COLORS.cloud, width: 2.5 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(129, 140, 248, 0.15)' },
            { offset: 1, color: 'rgba(129, 140, 248, 0)' }
          ])
        }
      }
    ]
  };

  return (
    <VFCard
      title={t('selfhosted.deviceDetail.tabs.usage')}
      extra={
        <div className="flex items-center gap-2">
          {!isMobile ? (
            <TimeRangeFilter 
              className="scale-[0.85] origin-right" 
              onChange={() => {}} 
            />
          ) : (
             <div className="w-8 h-8 rounded-control border border-border flex items-center justify-center text-text-tertiary">
               <Calendar size={14} />
             </div>
          )}
          <MediaTypeToggle 
            value={mediaType} 
            onChange={setMediaType} 
            className="h-8 !p-1 bg-bg-page/60"
          />
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-baseline gap-2 mb-2 group">
          <span className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-text-primary tracking-tight`}>
            {totalUsage}
          </span>
          <div className="flex items-center gap-1.5 cursor-help">
            <span className="text-xs sm:text-sm text-text-tertiary font-medium">
              {t('selfhosted.deviceDetail.overview.units')}
            </span>
            <Tooltip title={t('selfhosted.deviceDetail.overview.unitsTooltip')}>
              <Info size={14} className="text-text-tertiary opacity-40 group-hover:opacity-100 transition-opacity" />
            </Tooltip>
          </div>
        </div>

        <div className={`${isMobile ? 'h-[240px]' : 'h-[320px]'} w-full relative`}>
          {loading ? (
            <Skeleton.Button active block className="h-full rounded-card" />
          ) : isUnbound ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-page/10 rounded-lg border border-dashed border-border text-center px-6">
              <Ban size={32} className="text-text-tertiary mb-3 opacity-20" />
              <span className="text-sm font-bold text-text-secondary mb-1">
                {t('selfhosted.deviceDetail.overview.usageDisabledTitle')}
              </span>
              <p className="text-xs text-text-tertiary max-w-[240px]">
                {t('selfhosted.deviceDetail.overview.usageDisabledDesc')}
              </p>
            </div>
          ) : (
            <VFChart 
              options={chartOptions} 
              height="100%" 
              empty={trendData.length === 0} 
            />
          )}
        </div>
      </div>
    </VFCard>
  );
};
