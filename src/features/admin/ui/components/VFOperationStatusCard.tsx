
import React from 'react';
import { Button, Tooltip, App } from 'antd';
import { 
  CheckCircle2, XCircle, Loader2, 
  Eye, ExternalLink, RotateCcw, Copy,
  Info, AlertCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFText } from '../../../../ui/VFText';
import { AdminOpResult } from '../../types/alerts';

interface Props {
  inProgress: AdminOpResult[];
  recent: AdminOpResult[];
  onViewDetails: (op: AdminOpResult) => void;
  onViewAudit: (opId: string) => void;
  onRetry?: (op: AdminOpResult) => void;
}

export const VFOperationStatusCard: React.FC<Props> = ({ 
  inProgress, recent, onViewDetails, onViewAudit, onRetry 
}) => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const handleCopy = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    message.success(t('common.copy') + ' OK');
  };

  const renderOpItem = (op: AdminOpResult, isLast: boolean) => {
    const isPending = op.status === 'PENDING';
    const isFailed = op.status === 'FAILED';
    const isSuccess = op.status === 'SUCCESS';

    return (
      <div 
        key={op.adminOpId}
        className={`
          flex flex-col gap-3 p-4 transition-all duration-300 relative overflow-hidden
          ${isPending ? 'bg-brand/[0.04]' : 'bg-bg-card hover:bg-bg-page/40'}
          ${!isLast ? 'border-b border-divider/60' : ''}
        `}
      >
        {/* Top Marquee Line for Pending Ops */}
        {isPending && (
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand/10 overflow-hidden">
             <div className="h-full w-[30%] bg-brand animate-marquee" />
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
             <div className="shrink-0 flex items-center justify-center w-5">
                {isSuccess && <CheckCircle2 size={16} className="text-success" />}
                {isFailed && <XCircle size={16} className="text-error" />}
                {isPending && <Loader2 size={16} className="text-brand animate-spin" />}
             </div>
             <VFText variant="t5-strong" color={isPending ? 'brand' : 'primary'} truncate className="tracking-tight">
               {op.actionType}
             </VFText>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <Tooltip title={t('admin.alerts.modals.result.viewAudit')}>
              <Button 
                type="text" 
                size="small" 
                icon={<ExternalLink size={14} />} 
                className="w-8 h-8 rounded-full text-text-tertiary hover:text-brand hover:bg-brand/5"
                onClick={() => onViewAudit(op.adminOpId)}
              />
            </Tooltip>
            <Tooltip title={t('common.viewDetails')}>
              <Button 
                type="text" 
                size="small" 
                icon={<Eye size={14} />} 
                className={`w-8 h-8 rounded-full ${isPending ? 'text-brand bg-brand/10 hover:bg-brand/20' : 'text-text-tertiary hover:text-brand hover:bg-brand/5'}`}
                onClick={() => onViewDetails(op)}
              />
            </Tooltip>
          </div>
        </div>

        <div className="flex items-center justify-between pl-7">
           <div className="flex items-center gap-2 overflow-hidden">
             <div 
               className="flex items-center gap-1.5 px-1.5 py-0.5 bg-bg-page border border-divider/40 rounded cursor-pointer group/copy active:scale-95 transition-all"
               onClick={(e) => handleCopy(e, op.adminOpId)}
             >
                <VFText variant="t7" color="tertiary" className="font-mono text-[10px] leading-none pt-[1px]">
                  {op.adminOpId.slice(0, 8)}...
                </VFText>
                <Copy size={10} className="text-text-tertiary opacity-40 group-hover/copy:opacity-100 transition-opacity" />
             </div>
             <span className="w-1 h-1 rounded-full bg-divider opacity-40" />
             <VFText variant="t6" color="tertiary" className="font-medium opacity-60 tabular-nums lowercase">
               {op.operatorId}
             </VFText>
           </div>
           
           <div className="flex items-center gap-1.5 shrink-0">
              <VFText variant="t6" color="disabled" tabularNums className="text-[10px] font-bold">
                {isPending ? t('admin.alerts.modals.result.processing').toUpperCase() : (op.timestamp || op.startedAt)}
              </VFText>
           </div>
        </div>

        {isFailed && (
          <div className="ml-7 mt-1 flex flex-col gap-2 p-3 bg-error/[0.04] border border-error/20 rounded-control">
             <div className="flex items-start gap-2">
                <AlertCircle size={14} className="text-error shrink-0 mt-0.5" />
                <VFText variant="t6" color="error" className="font-medium leading-relaxed">
                   {op.errorSummary || 'Cluster sync failed.'}
                </VFText>
             </div>
             {op.retryable && onRetry && (
               <Button 
                size="small" 
                icon={<RotateCcw size={12} />} 
                className="w-fit h-7 font-bold text-[10px] px-3 rounded-control border-error text-error hover:bg-error/5"
                onClick={() => onRetry(op)}
               >
                 {t('admin.alerts.modals.result.retry')}
               </Button>
             )}
          </div>
        )}
      </div>
    );
  };

  const allOps = [...inProgress, ...recent];

  return (
    <VFCard 
      title={t('admin.alerts.modals.result.statusTitle')} 
      className="shadow-none border-border mt-2"
      noPadding
    >
      <div className="flex flex-col max-h-[500px] overflow-y-auto custom-scrollbar">
        {allOps.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 opacity-30">
            <Info size={24} strokeWidth={1.5} className="mb-2" />
            <VFText variant="t6" color="tertiary" className="font-bold text-center">No operations recorded</VFText>
          </div>
        ) : (
          <div className="flex flex-col">
            {allOps.map((op, idx) => renderOpItem(op, idx === allOps.length - 1))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .animate-marquee {
          animation: marquee 3s linear infinite;
        }
      `}</style>
    </VFCard>
  );
};
