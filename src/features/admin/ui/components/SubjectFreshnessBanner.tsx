import React from 'react';
import { Button } from 'antd';
import { Clock, Activity, ArrowRight, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFText } from '../../../../ui/VFText';
import dayjs from 'dayjs';

interface Props {
  lastAggregated: string;
  lagMs: number;
  dlqCount: number;
  onViewHealth: () => void;
}

export const SubjectFreshnessBanner: React.FC<Props> = ({ lastAggregated, lagMs, dlqCount, onViewHealth }) => {
  const { t } = useTranslation();
  const isHighLag = lagMs > 60000;

  return (
    <div className={`
      flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-card border transition-all
      ${isHighLag ? 'bg-warning/5 border-warning/30 shadow-sm' : 'bg-bg-page/40 border-divider'}
    `}>
      <div className="flex items-center gap-4 flex-1">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isHighLag ? 'bg-warning/10 text-warning' : 'bg-bg-page text-text-tertiary shadow-sm'}`}>
           {isHighLag ? <AlertCircle size={20} /> : <Clock size={20} />}
        </div>
        
        <div className="flex flex-col gap-0.5">
           <div className="flex items-center gap-2">
             <VFText variant="t5-strong" color={isHighLag ? 'primary' : 'secondary'}>
               {isHighLag ? t('admin.health.banners.staleTitle') : t('admin.overview.snapshotFreshness')}
             </VFText>
             <span className="opacity-20 text-divider">|</span>
             <VFText variant="t6" color="tertiary" tabularNums className="font-bold">
               Refreshed {dayjs(lastAggregated).fromNow()}
             </VFText>
           </div>
           
           <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Activity size={12} className="text-text-tertiary opacity-40" />
                <VFText variant="t6" color="tertiary" className="font-medium uppercase tracking-tighter">Persistence Lag:</VFText>
                <VFText variant="t6" color={isHighLag ? 'error' : 'secondary'} tabularNums className="font-bold">
                  {Math.floor(lagMs/1000)}s
                </VFText>
              </div>
              <span className="w-1 h-1 rounded-full bg-divider opacity-60" />
              <div className="flex items-center gap-1.5">
                <VFText variant="t6" color="tertiary" className="font-medium uppercase tracking-tighter">Cluster DLQ:</VFText>
                <VFText variant="t6" color={dlqCount > 0 ? 'error' : 'secondary'} tabularNums className="font-bold">{dlqCount}</VFText>
              </div>
           </div>
        </div>
      </div>

      <Button 
        type="link" 
        size="small" 
        className="vf-warning-link-btn flex items-center gap-1.5 font-bold hover:opacity-70 p-0 h-auto self-start md:self-center underline underline-offset-4"
        onClick={onViewHealth}
      >
        {t('admin.alerts.detail.openHealth')}
        <ArrowRight size={14} className="mt-[1px]" />
      </Button>

      <style>{`
        .vf-warning-link-btn.ant-btn-link {
          color: rgba(var(--vf-warning), 1) !important;
        }
        .vf-warning-link-btn.ant-btn-link:hover {
          color: rgba(var(--vf-warning), 0.8) !important;
        }
      `}</style>
    </div>
  );
};