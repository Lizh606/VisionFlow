
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Space, List, Tag, Button } from 'antd';
import { Activity, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { Device } from '../../../common/types';
import { VFCard } from '../../../../../shared/ui/VFCard';
import { VFChart } from '../../../../../shared/charts/VFChart';
import dayjs from '../../../../../config/dayjsConfig';

export const DeviceOverviewTab: React.FC<{ device: Device }> = ({ device }) => {
  const { t } = useTranslation();

  const miniChartOptions = {
    grid: { left: 0, right: 0, top: 10, bottom: 0 },
    xAxis: { type: 'category', show: false, data: ['1', '2', '3', '4', '5', '6'] },
    yAxis: { type: 'value', show: false },
    series: [{
      data: [120, 200, 150, 80, 70, 110],
      type: 'line',
      smooth: true,
      areaStyle: { color: 'rgba(109, 41, 217, 0.1)' },
      lineStyle: { width: 2, color: 'var(--vf-brand)' },
      showSymbol: false
    }]
  };

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Health & Diagnostics */}
      <div className="flex flex-col gap-6">
        <VFCard title={t('selfhosted.deviceDetail.overview.diagnostics')}>
          <div className="flex flex-col gap-4">
            <Alert 
              message={t('selfhosted.deviceDetail.overview.reason')}
              description="Device is online and processing heartbeats normally. No high-severity errors detected in last 24h."
              type="success"
              showIcon
              icon={<ShieldCheck size={18} />}
              className="rounded-control"
            />
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="bg-bg-page p-4 rounded-control border border-border">
                <div className="text-xs text-text-tertiary uppercase font-bold mb-1 flex items-center gap-1">
                  <Clock size={12} /> {t('selfhosted.deviceDetail.overview.kpiHeartbeat')}
                </div>
                <div className="text-lg font-bold text-text-primary">
                  {dayjs(device.last_seen_at).fromNow()}
                </div>
              </div>
              <div className="bg-bg-page p-4 rounded-control border border-border">
                <div className="text-xs text-text-tertiary uppercase font-bold mb-1 flex items-center gap-1">
                  <Activity size={12} /> {t('selfhosted.deviceDetail.overview.kpiStreams')}
                </div>
                <div className="text-lg font-bold text-text-primary">3 Active</div>
              </div>
            </div>
          </div>
        </VFCard>

        <VFCard title={t('selfhosted.deviceDetail.overview.usagePreview')}>
           <div className="h-40">
             <VFChart options={miniChartOptions} height="100%" />
           </div>
           <div className="flex justify-between mt-4 text-xs text-text-tertiary">
              <span>24h ago</span>
              <span>Now</span>
           </div>
        </VFCard>
      </div>

      {/* Recent Alerts */}
      <VFCard 
        title={t('selfhosted.deviceDetail.overview.recentAlerts')} 
        extra={<Button type="link" size="small">{t('selfhosted.deviceDetail.overview.viewAll')}</Button>}
        noPadding
      >
        <List
          dataSource={[
            { id: 1, title: 'CPU Usage High (>85%)', time: '10m ago', level: 'warning' },
            { id: 2, title: 'Network Latency detected', time: '2h ago', level: 'info' },
            { id: 3, title: 'License expiring in 7 days', time: '1d ago', level: 'warning' },
          ]}
          renderItem={(item) => (
            <div className="px-6 py-4 border-b border-border last:border-b-0 flex items-center justify-between hover:bg-action-hover transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <AlertCircle size={16} className={item.level === 'warning' ? 'text-warning' : 'text-info'} />
                <span className="text-sm font-medium text-text-primary">{item.title}</span>
              </div>
              <span className="text-xs text-text-tertiary">{item.time}</span>
            </div>
          )}
        />
      </VFCard>
    </div>
  );
};
