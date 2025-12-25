
import React, { useMemo } from 'react';
import { Timeline, Button, App, Tooltip, Divider } from 'antd';
import { 
  Copy, Info, CheckCircle2, AlertCircle, Clock, 
  ShieldOff, Activity, ShieldCheck
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFText } from '../../../../ui/VFText';
import { VFTag } from '../../../../shared/ui/VFTag';
import { AdminAlert, AlertTimelineEvent } from '../../types/alerts';
import dayjs from 'dayjs';

export const AlertDetailSummary: React.FC<{ alert: AdminAlert }> = ({ alert }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  
  const containmentInfo = useMemo(() => {
    const freezeEvent = alert.timeline?.find(
      ev => ev.status === 'ACTION_RESULT' && 
      (ev.message.includes('Freeze') || ev.message.includes('Containment')) &&
      ev.opStatus === 'SUCCESS'
    );
    
    if (!freezeEvent) return null;
    
    const match = freezeEvent.message.match(/ENT-[A-Z0-9]+/);
    return {
      id: match ? match[0] : 'ACTIVE',
      timestamp: freezeEvent.timestamp
    };
  }, [alert.timeline]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success(t('common.copy') + ' OK');
  };

  const getTimelineConfig = (status: AlertTimelineEvent['status'], opStatus?: string) => {
    const configs: Record<string, { color: string; icon: any; accentClass: string }> = {
      OPEN: { color: 'red', icon: <AlertCircle size={14} className="text-error" />, accentClass: 'bg-error' },
      ACKNOWLEDGED: { color: 'orange', icon: <Clock size={14} className="text-warning" />, accentClass: 'bg-warning' },
      SUPPRESSED: { color: 'gray', icon: <ShieldOff size={14} className="text-text-tertiary" />, accentClass: 'bg-text-tertiary' },
      RESOLVED: { color: 'green', icon: <CheckCircle2 size={14} className="text-success" />, accentClass: 'bg-success' },
      ACTION_START: { color: 'blue', icon: <Activity size={14} className="text-brand" />, accentClass: 'bg-brand' },
      ACTION_RESULT: { 
        color: opStatus === 'SUCCESS' ? 'green' : 'red', 
        icon: opStatus === 'SUCCESS' ? <CheckCircle2 size={14} className="text-success" /> : <AlertCircle size={14} className="text-error" />,
        accentClass: opStatus === 'SUCCESS' ? 'bg-success' : 'bg-error'
      },
      ALERT_STATUS_CHANGED: { color: 'cyan', icon: <Activity size={14} className="text-info" />, accentClass: 'bg-info' }
    };
    return configs[status] || configs.OPEN;
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <VFCard title={t('admin.alerts.detail.summary')} className="h-fit shadow-none">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1.5">
              <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest">{t('admin.alerts.detail.currentStatus')}</VFText>
              <VFTag 
                variant={alert.status === 'OPEN' ? 'error' : alert.status === 'RESOLVED' ? 'success' : 'warning'} 
                filled={alert.status === 'RESOLVED'}
                className="font-bold uppercase min-w-[100px] w-fit"
              >
                {alert.status}
              </VFTag>
            </div>
            
            {containmentInfo && (
              <div className="flex flex-col items-end gap-1 animate-in zoom-in-75 duration-500">
                <VFText variant="t6" color="brand" className="uppercase font-bold tracking-tighter">Containment</VFText>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-brand/5 border border-brand/20 rounded-tag">
                   <ShieldCheck size={14} className="text-brand" />
                   <VFText variant="t7" color="brand" className="font-bold tabular-nums">{containmentInfo.id}</VFText>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest">{t('admin.alerts.detail.impactScope')}</VFText>
            <VFText variant="t5-strong" color="primary" className="leading-relaxed font-semibold">
              {alert.impactScope}
            </VFText>
          </div>
          
          <Divider className="my-1 opacity-40" />

          <div className="flex flex-col gap-1.5">
            <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest">{t('admin.alerts.detail.aggregationKey')}</VFText>
            <Tooltip title={alert.aggregationKey} placement="topLeft" mouseEnterDelay={0.5}>
              <div 
                className="flex flex-col gap-1.5 p-3 bg-bg-page border border-divider rounded-control group cursor-pointer hover:border-border-strong transition-all relative overflow-hidden"
                onClick={() => handleCopy(alert.aggregationKey || '')}
              >
                {alert.aggregationKey ? (
                  alert.aggregationKey.split('|').map((part, idx) => (
                    <VFText 
                      key={idx} 
                      variant="t7" 
                      color="secondary" 
                      className="font-mono text-[11px] opacity-80 block truncate pr-6 leading-tight"
                    >
                      {part}
                    </VFText>
                  ))
                ) : (
                  <VFText variant="t7" color="disabled" className="italic opacity-40">N/A</VFText>
                )}
                
                <Copy 
                  size={12} 
                  className="absolute top-3 right-3 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" 
                />
              </div>
            </Tooltip>
          </div>
        </div>
      </VFCard>

      <VFCard title={t('admin.alerts.detail.timeline')} className="flex-1 shadow-none overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto custom-scrollbar px-1 max-h-[640px]">
          <Timeline
            className="mt-4"
            items={(alert.timeline || []).map((ev, i) => {
              const config = getTimelineConfig(ev.status, ev.opStatus);
              return {
                color: config.color,
                dot: config.icon,
                children: (
                  <div className="flex flex-col gap-1 mb-6 -mt-1.5 pr-2">
                    <div className="flex justify-between items-baseline gap-2">
                      <VFText variant="t5-strong" color="primary" className="uppercase font-bold tracking-tight">
                        {ev.status.replace(/_/g, ' ')}
                      </VFText>
                      <VFText variant="t7" color="disabled" tabularNums>{dayjs(ev.timestamp).format('HH:mm:ss')}</VFText>
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <VFText variant="t6" color="secondary" className="font-bold opacity-80 italic">
                        {t('admin.alerts.detail.timelineBy')} {ev.actorType === 'system' ? 'system' : 'operator'}
                      </VFText>
                      <Tooltip title={`${ev.actorType === 'system' ? 'Service ID' : 'Operator ID'}: ${ev.actorDetail}`}>
                        <span style={{ display: 'inline-flex', cursor: 'help' }}>
                          <Info size={12} className="text-text-tertiary" />
                        </span>
                      </Tooltip>
                    </div>

                    <VFText variant="t6" color="secondary" className="mt-1 leading-relaxed">
                      {ev.message}
                    </VFText>

                    {ev.adminOpId && (
                      <div 
                        className="mt-2 flex items-center gap-2 px-1.5 py-0.5 bg-bg-page border border-divider rounded cursor-pointer group/op w-fit"
                        onClick={() => handleCopy(ev.adminOpId!)}
                      >
                        <VFText variant="t7" color="tertiary" className="font-mono text-[10px] tabular-nums">
                          {ev.adminOpId.slice(0, 8)}...
                        </VFText>
                        <Copy size={10} className="text-text-tertiary opacity-40 group-hover/op:opacity-100" />
                      </div>
                    )}

                    {ev.comment && (
                      <div className="mt-2 p-2.5 bg-bg-page/50 rounded-control border border-divider/40 italic relative overflow-hidden">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 opacity-40 ${config.accentClass}`} />
                        <div className="pl-2">
                          <VFText variant="t6" color="tertiary" className="leading-relaxed block">
                            {ev.comment}
                          </VFText>
                        </div>
                      </div>
                    )}
                  </div>
                )
              };
            })}
          />
        </div>
      </VFCard>
    </div>
  );
};
