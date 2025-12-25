import React from 'react';
import { Activity, Database, Clock, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFText } from '../../../../ui/VFText';
import { VFTag } from '../../../../shared/ui/VFTag';
import { HealthKPI } from '../../types/health';
import dayjs from 'dayjs';

/**
 * MetaRow - V1.4: Unified Absolute Timestamp Format (P1 Fix)
 * Defined outside the main component to resolve potential parsing issues 
 * and avoid "Cannot find name 'div'" errors in sensitive compiler environments.
 */
const MetaRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-divider/60">
    <Info size={11} className="text-text-tertiary opacity-40" />
    <VFText variant="t6" color="tertiary" className="font-bold uppercase tracking-tight">
      {label}: <span className="text-text-secondary tabular-nums font-bold ml-1">{value}</span>
    </VFText>
  </div>
);

export const HealthKPIs: React.FC<{ data: HealthKPI }> = ({ data }) => {
  const { t } = useTranslation();

  const formatLag = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    const sec = Math.floor(ms / 1000);
    if (sec < 60) return `${sec}s`;
    return `${Math.floor(sec / 60)}m ${sec % 60}s`;
  };

  const getStatus = (val: number, type: 'lag' | 'dlq') => {
    if (type === 'lag') {
      if (val > 300000) return { variant: 'error' as const, label: 'Critical' };
      if (val > 60000) return { variant: 'warning' as const, label: 'Warning' };
      return { variant: 'success' as const, label: 'Healthy' };
    }
    if (val > 50) return { variant: 'error' as const, label: 'Critical' };
    if (val > 0) return { variant: 'warning' as const, label: 'Warning' };
    return { variant: 'success' as const, label: 'Healthy' };
  };

  const lagStatus = getStatus(data.runbusLagMs, 'lag');
  const dlqStatus = getStatus(data.dlqDepth, 'dlq');

  const formattedAggTime = dayjs(data.lastAggregatedAt).format('YYYY-MM-DD HH:mm:ss');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 1. RunBus Lag (T1 Display - CORE STATUS EMPHASIS) */}
      <VFCard className="h-full shadow-none border-border">
        <div className="flex flex-col h-full justify-between gap-4">
          <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest flex items-center gap-1.5 opacity-60">
            <Activity size={14} /> {t('admin.health.cards.runbusLag')}
          </VFText>
          <div className="flex flex-col">
            <div className="flex items-baseline justify-between mb-1">
              <VFText variant="t1" color={lagStatus.variant === 'success' ? 'primary' : lagStatus.variant} tabularNums className="leading-none">
                {formatLag(data.runbusLagMs)}
              </VFText>
              <VFTag variant={lagStatus.variant} filled className="h-5 px-2 font-bold uppercase text-[9px]">{lagStatus.label}</VFTag>
            </div>
            <MetaRow 
              label={t('admin.health.cards.meta.lastAggregatedAt')} 
              value={formattedAggTime} 
            />
          </div>
        </div>
      </VFCard>

      {/* 2. Snapshot Freshness (T1 Display - CORE KPI NEUTRAL) */}
      <VFCard className="h-full shadow-none border-border">
        <div className="flex flex-col h-full justify-between gap-4">
          <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest flex items-center gap-1.5 opacity-60">
            <Clock size={14} /> {t('admin.health.cards.snapshotFreshness')}
          </VFText>
          <div className="flex flex-col">
            <div className="flex flex-col mb-1 min-h-[36px] justify-center">
              <VFText variant="t1" color="primary" className="leading-none whitespace-nowrap">
                {dayjs(data.lastAggregatedAt).fromNow()}
              </VFText>
            </div>
            <MetaRow 
              label={t('admin.health.cards.meta.lastAggregatedAt')} 
              value={formattedAggTime} 
            />
          </div>
        </div>
      </VFCard>

      {/* 3. DLQ Depth (T3 Typography - RESTRAINED HIERARCHY) */}
      <VFCard className="h-full shadow-none border-border">
        <div className="flex flex-col h-full justify-between gap-4">
          <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest flex items-center gap-1.5 opacity-60">
            <Database size={14} /> {t('admin.health.cards.dlqDepth')}
          </VFText>
          <div className="flex flex-col">
            <div className="flex items-baseline justify-between mb-1 min-h-[36px]">
              {/* Neutral color used here to satisfy hierarchy requirements */}
              <VFText variant="t3" color="primary" tabularNums className="font-vf-semibold">
                {data.dlqDepth} {t('admin.health.cards.meta.messages')}
              </VFText>
              <VFTag variant={dlqStatus.variant} filled className="h-5 px-2 font-bold uppercase text-[9px]">{dlqStatus.label}</VFTag>
            </div>
            <MetaRow 
              label={t('admin.health.cards.meta.lastAggregatedAt')} 
              value={formattedAggTime} 
            />
          </div>
        </div>
      </VFCard>
    </div>
  );
};