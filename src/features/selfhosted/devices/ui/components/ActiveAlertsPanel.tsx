
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, AlertTriangle, Info, ChevronRight, Ban } from 'lucide-react';
import { VFCard } from '../../../../../shared/ui/VFCard';
import { mockDevices } from '../../../common/mockData';

interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  time: string;
}

interface Props {
  deviceId: string;
  loading?: boolean;
}

const SeverityTag: React.FC<{ severity: string }> = ({ severity }) => {
  const { t } = useTranslation();
  
  const config = {
    critical: { icon: AlertCircle, color: 'text-error', bg: 'bg-error/10', border: 'border-error/20' },
    warning:  { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20' },
    info:     { icon: Info, color: 'text-info', bg: 'bg-info/10', border: 'border-info/20' },
  };

  const style = config[severity as keyof typeof config] || config.info;
  const Icon = style.icon;

  return (
    <div className={`
      shrink-0 flex items-center justify-center gap-1.5 px-2 py-1 
      rounded-tag border ${style.bg} ${style.border} ${style.color}
      h-6 w-24 select-none
    `}>
      <Icon size={12} strokeWidth={2.5} />
      <span className="text-[11px] font-bold uppercase tracking-wide leading-none pt-[1px]">
        {t(`selfhosted.overview.alerts.${severity}`)}
      </span>
    </div>
  );
};

const AlertListItem: React.FC<{ alert: Alert; isLast: boolean }> = ({ alert, isLast }) => {
  return (
    <div className={`
      group relative flex items-center gap-4 p-4
      hover:bg-action-hover transition-colors cursor-pointer
      ${!isLast ? 'border-b border-border' : ''}
    `}>
      <div className="shrink-0">
        <SeverityTag severity={alert.severity} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-text-primary group-hover:text-brand transition-colors truncate">
          {alert.title}
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs text-text-tertiary tabular-nums group-hover:text-text-secondary transition-colors">
          {alert.time}
        </span>
        <div className="w-5 flex justify-end">
          <ChevronRight 
            size={16} 
            className="text-text-tertiary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" 
          />
        </div>
      </div>
    </div>
  );
};

export const ActiveAlertsPanel: React.FC<Props> = ({ deviceId, loading = false }) => {
  const { t } = useTranslation();

  const device = mockDevices.find(d => d.id === deviceId);
  const isUnbound = device?.status === 'PENDING_LICENSE';

  const alerts: Alert[] = isUnbound ? [] : [
    { id: 'a1', severity: 'critical', title: 'CPU Usage High (>85%)', time: '10m ago' },
    { id: 'a2', severity: 'warning', title: 'Network Latency spikes detected', time: '2h ago' },
    { id: 'a3', severity: 'info', title: 'Configuration updated via CLI', time: '1d ago' },
  ];

  return (
    <VFCard 
      title={t('selfhosted.deviceDetail.overview.recentAlerts')}
      noPadding
      className="h-full"
    >
      <div className="flex flex-col h-full">
        {isUnbound ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-10 h-10 rounded-full bg-bg-page flex items-center justify-center text-text-tertiary mb-3 opacity-40">
              <Ban size={20} />
            </div>
            <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">遥测已禁用</span>
            <p className="text-[11px] text-text-tertiary/60 mt-2 max-w-[180px]">
              设备未授权前，不进行遥测采集与告警分析。
            </p>
          </div>
        ) : (
          alerts.map((alert, idx) => (
            <AlertListItem 
              key={alert.id} 
              alert={alert} 
              isLast={idx === alerts.length - 1} 
            />
          ))
        )}
      </div>
    </VFCard>
  );
};
