
import React, { useState } from 'react';
import { Progress, Segmented } from 'antd';
import { AlertCircle, ChevronRight, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFText } from '../../../../ui/VFText';
import { StudioStats } from '../../types/dashboard';
import { StudioTrendChart } from './StudioTrendChart';

export const DomainCardStudio: React.FC<{ data: StudioStats; onDrillDown: () => void }> = ({ data, onDrillDown }) => {
  const { t } = useTranslation();
  const [range, setRange] = useState<'1h' | '24h'>('24h');
  
  const history = range === '1h' ? data.history1h : data.history24h;

  return (
    <VFCard 
      title={
        <div className="flex items-center gap-2 cursor-pointer group/title" onClick={onDrillDown}>
          <span>{t('admin.overview.domains.studio')}</span>
          <ChevronRight size={14} className="text-text-tertiary opacity-0 group-hover/title:opacity-100 transition-all -translate-x-1 group-hover/title:translate-x-0" />
        </div>
      } 
      className="h-full border-border hover:border-brand/30 transition-all duration-300"
      extra={
        <div onClick={onDrillDown} className="cursor-pointer hover:opacity-70 select-none">
          <VFText variant="t6" color="brand" className="font-bold tracking-tight">{t('admin.overview.viewAlerts')}</VFText>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest mb-1">{t('admin.overview.metrics.successRate')}</VFText>
            <VFText variant="t1" color="primary" tabularNums>{data.successRate}%</VFText>
          </div>
          <div className="flex flex-col items-end gap-3">
             <Segmented 
               size="small" 
               options={[
                 { label: t('admin.overview.ranges.1h'), value: '1h' }, 
                 { label: t('admin.overview.ranges.24h'), value: '24h' }
               ]} 
               value={range} 
               onChange={(v) => setRange(v as any)} 
               className="bg-bg-page p-0.5 rounded-control text-[10px] font-bold"
             />
             <div className="bg-bg-page/30 rounded px-1.5 py-1 border border-divider/20">
               <StudioTrendChart data={history} color="#6D29D9" />
             </div>
          </div>
        </div>

        <div className="bg-bg-page/50 p-4 rounded-card border border-divider">
          <div className="flex items-center justify-between mb-3">
             <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-wider">{t('admin.overview.metrics.backlog')}</VFText>
             <div className="flex items-center gap-2">
                <VFText variant="t3" color="primary" tabularNums>{data.backlog}</VFText>
                <Activity size={14} className="text-brand opacity-40" />
             </div>
          </div>
          <Progress percent={Math.min(100, (data.backlog / 200) * 100)} showInfo={false} strokeColor="#6D29D9" size="small" />
        </div>

        <div>
          <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-wider mb-3 block">{t('admin.overview.metrics.topFailures')}</VFText>
          <div className="flex flex-col gap-2">
            {data.topFailureReasons.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-1.5 border-b border-divider/30 last:border-none group/item">
                <div className="flex items-center gap-2">
                  <AlertCircle size={14} className="text-error opacity-40" />
                  <VFText variant="t5" color="secondary" truncate className="max-w-[160px] group-hover/item:text-text-primary transition-colors">{item.reason}</VFText>
                </div>
                <VFText variant="t6" color="primary" tabularNums className="font-bold">{item.count}</VFText>
              </div>
            ))}
          </div>
        </div>
      </div>
    </VFCard>
  );
};
