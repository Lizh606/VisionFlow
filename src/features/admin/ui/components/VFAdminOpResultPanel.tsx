
import React, { useState, useEffect } from 'react';
import { Button, App, Space } from 'antd';
import { 
  CheckCircle2, XCircle, Clock, Copy, 
  ExternalLink, RotateCcw, X, FileText
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFTag } from '../../../../shared/ui/VFTag';
import { VFText } from '../../../../ui/VFText';
import { AdminOpResult } from '../../types/alerts';

interface Props {
  result: AdminOpResult;
  onClose: () => void;
  onRetry?: () => void;
}

export const VFAdminOpResultPanel: React.FC<Props> = ({ result, onClose, onRetry }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [polling, setPolling] = useState(result.status === 'PENDING');

  useEffect(() => {
    if (result.status === 'PENDING') {
      const timer = setTimeout(() => setPolling(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [result.status]);

  const copyId = () => {
    navigator.clipboard.writeText(result.adminOpId);
    message.success(t('common.copy') + ' OK');
  };

  const handleOpenAudit = () => {
    window.location.hash = `/admin-audit?adminOpId=${result.adminOpId}`;
  };

  const isSuccess = result.status === 'SUCCESS';
  const isFailed = result.status === 'FAILED' || result.status === 'CONFLICT';

  return (
    <div className="fixed bottom-8 right-8 z-[1100] w-[440px] animate-in slide-in-from-bottom-5 duration-300">
      <VFCard 
        className="shadow-overlay border-divider"
        noPadding
      >
        <div className="flex flex-col">
          <div className={`p-4 flex items-center justify-between border-b border-divider ${isSuccess ? 'bg-success/[0.02]' : isFailed ? 'bg-error/[0.02]' : 'bg-brand/[0.02]'}`}>
            <div className="flex items-center gap-2.5">
               {isSuccess && <CheckCircle2 size={18} className="text-success" />}
               {isFailed && <XCircle size={18} className="text-error" />}
               {(polling || result.status === 'PENDING') && <Clock size={18} className="text-brand animate-pulse" />}
               <VFText variant="t5-strong" color="primary">
                 {(polling || result.status === 'PENDING') ? 'In Progress' : isSuccess ? 'Operation Succeeded' : 'Operation Failed'}
               </VFText>
            </div>
            <Button type="text" size="small" icon={<X size={16} />} onClick={onClose} className="text-text-tertiary" />
          </div>

          <div className="p-5 flex flex-col gap-4">
             <div className="flex flex-col gap-1.5">
                <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest text-[10px]">Operation ID</VFText>
                <div className="flex items-center justify-between bg-bg-page px-3 py-2 rounded border border-divider group cursor-pointer" onClick={copyId}>
                   <VFText variant="t7" color="primary" className="font-bold select-all truncate max-w-[320px] tabular-nums">{result.adminOpId}</VFText>
                   <Copy size={14} className="text-text-tertiary opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
             </div>

             {result.errorSummary && isFailed && (
               <div className="p-3 rounded bg-error/5 border border-error/20">
                  <VFText variant="t6" color="error" className="font-medium leading-relaxed">{result.errorSummary}</VFText>
               </div>
             )}

             <div className="flex items-center justify-between border-t border-divider/40 pt-3 mt-1">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <VFText variant="t6" color="tertiary" className="uppercase font-bold text-[9px]">Finished</VFText>
                    <VFText variant="t6" color="primary" className="font-bold tabular-nums">{result.timestamp || '---'}</VFText>
                  </div>
                  <div className="flex flex-col">
                    <VFText variant="t6" color="tertiary" className="uppercase font-bold text-[9px]">Status</VFText>
                    <VFTag variant={isSuccess ? 'success' : isFailed ? 'error' : 'info'} filled className="h-4.5 px-1.5 text-[9px] font-bold">
                      {result.status}
                    </VFTag>
                  </div>
                </div>
                
                <Space size={8}>
                  {isFailed && onRetry && (
                    <Button 
                      type="primary"
                      size="small"
                      icon={<RotateCcw size={14} />} 
                      className="font-bold text-xs h-8 px-3 rounded-control bg-brand border-brand"
                      onClick={onRetry}
                    >
                      Retry
                    </Button>
                  )}
                  {isSuccess && (
                    <Button 
                      size="small"
                      icon={<FileText size={14} />} 
                      className="font-bold text-xs h-8 px-3 rounded-control border-brand text-brand hover:bg-brand/5"
                      onClick={handleOpenAudit}
                    >
                      Open Audit
                    </Button>
                  )}
                </Space>
             </div>
          </div>
        </div>
      </VFCard>
    </div>
  );
};
