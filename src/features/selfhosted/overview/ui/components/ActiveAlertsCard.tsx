
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { VFCard } from '../../../../../shared/ui/VFCard';
import { Alert } from '../../model/types';

interface Props {
  alerts: Alert[];
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
      <span className="text-[10px] font-bold uppercase tracking-wider leading-none pt-[1px]">
        {t('selfhosted.overview.alerts.' + severity)}
      </span>
    </div>
  );
};

const AlertListItem: React.FC<{ alert: Alert; isLast: boolean }> = ({ alert, isLast }) => {
  const { t } = useTranslation();

  return (
    <div className={`
      group relative flex items-start gap-5 p-5
      hover:bg-action-hover transition-colors cursor-pointer
      ${!isLast ? 'border-b border-divider' : ''}
    `}>
      <div className="pt-0.5">
        <SeverityTag severity={alert.severity} />
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="text-sm font-bold text-text-primary group-hover:text-brand transition-colors truncate leading-tight">
          {alert.title}
        </div>
        
        <div className="flex items-center gap-2">
           <span className="text-xs text-text-tertiary font-medium">{t('selfhosted.overview.alerts.target')}:</span>
           <code className="
             px-2 py-0.5 rounded text-xs font-mono font-bold
             bg-bg-page border border-border text-text-secondary
             group-hover:border-border-strong transition-colors
           ">
             {alert.target}
           </code>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0 pt-0.5">
        <span className="text-xs text-text-tertiary font-semibold tabular-nums group-hover:text-text-secondary transition-colors leading-none">
          {alert.time}
        </span>
        <div className="h-5 flex items-center justify-end">
           <ChevronRight 
             size={18} 
             className="text-text-tertiary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" 
           />
        </div>
      </div>
    </div>
  );
};

export const ActiveAlertsCard: React.FC<Props> = ({ alerts }) => {
  const { t } = useTranslation();

  return (
    <VFCard 
      className="h-full" 
      title={t('selfhosted.overview.alerts.title')} 
      noPadding
    >
      <div className="flex flex-col">
        {alerts.map((alert, idx) => (
          <AlertListItem 
            key={alert.id} 
            alert={alert} 
            isLast={idx === alerts.length - 1} 
          />
        ))}
      </div>
    </VFCard>
  );
};
