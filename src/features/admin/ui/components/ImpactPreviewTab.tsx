
import React, { useMemo } from 'react';
import { Info, BarChart3, Clock, AlertTriangle } from 'lucide-react';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFText } from '../../../../ui/VFText';
import { QuotaImpactChart } from './QuotaImpactChart';
import { QuotaPolicy, QuotaImpactData } from '../../types/quota';

export const ImpactPreviewTab: React.FC<{ policy: QuotaPolicy, currentDraft: any }> = ({ policy, currentDraft }) => {
  const targetLimit = currentDraft?.rateLimit || policy.rateLimit;
  
  const impactData: QuotaImpactData[] = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      const usage = Math.floor(Math.random() * 80) + 10;
      return {
        time: `${i}:00`,
        usage,
        limit: targetLimit,
        triggers: usage > targetLimit ? 1 : 0
      };
    });
  }, [targetLimit]);

  const totalTriggers = useMemo(() => impactData.reduce((acc, curr) => acc + curr.triggers, 0), [impactData]);

  return (
    <div className="flex flex-col gap-6 py-2 animate-in fade-in duration-300">
      <div className={`p-4 rounded-card border flex gap-4 ${totalTriggers > 0 ? 'bg-error/5 border-error/20' : 'bg-brand/5 border-brand/20'}`}>
        {totalTriggers > 0 ? <AlertTriangle className="text-error mt-0.5" size={18} /> : <Info className="text-brand mt-0.5" size={18} />}
        <div className="flex flex-col gap-1">
          <VFText variant="t6" color="secondary" className="font-bold uppercase tracking-tight">Last 24h Impact Analysis</VFText>
          <VFText variant="t5-strong" color={totalTriggers > 0 ? 'error' : 'brand'}>
            Setting limit to {targetLimit} {policy.metadata.rateLimitUnit} would result in {totalTriggers} rate-limiting triggers.
          </VFText>
        </div>
      </div>

      <VFCard className="border-border shadow-none">
        <div className="h-[320px]">
          <QuotaImpactChart data={impactData} />
        </div>
      </VFCard>

      <div className="flex items-center justify-between px-1 opacity-60">
        <div className="flex items-center gap-2">
          <Clock size={12} className="text-text-tertiary" />
          <VFText variant="t6" color="tertiary">Data Freshness: {policy.metadata.lastUsageUpdate}</VFText>
        </div>
        <VFText variant="t6" color="tertiary" className="italic">Source: Cluster usage-meter-svc</VFText>
      </div>
    </div>
  );
};
