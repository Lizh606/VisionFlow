
import React from 'react';
import { Button, List, Tooltip, App } from 'antd';
import { Download, RefreshCw, Loader2, CheckCircle2, XCircle, Info, FileText, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFText } from '../../../../ui/VFText';
import { VFTag } from '../../../../shared/ui/VFTag';
import { AuditExportTask } from '../../types/audit';

interface Props {
  tasks: AuditExportTask[];
  onRefresh: () => void;
}

export const VFExportPanel: React.FC<Props> = ({ tasks, onRefresh }) => {
  const { t } = useTranslation();
  const activeCount = tasks.filter(t => t.status === 'PREPARING').length;

  if (tasks.length === 0) return null;

  return (
    <VFCard 
      title={
        <div className="flex items-center gap-3">
          <FileText size={18} className="text-brand" />
          <span>{t('admin.audit.export.centerTitle')}</span>
          {activeCount > 0 && <VFTag variant="brand" className="h-5 px-1.5 font-bold animate-pulse">{activeCount} {t('admin.audit.status.inProgress')}</VFTag>}
        </div>
      }
      extra={<Button type="text" size="small" icon={<RefreshCw size={14} />} onClick={onRefresh} className="text-text-tertiary" />}
      className="shadow-sm border-divider bg-bg-page/5 mb-2"
      noPadding
    >
      <div className="flex flex-col max-h-[220px] overflow-y-auto custom-scrollbar">
        {tasks.map((task, idx) => {
          const isReady = task.status === 'READY';
          const isFailed = task.status === 'FAILED';
          const isPrep = task.status === 'PREPARING';

          return (
            <div 
              key={task.id} 
              className={`flex items-center justify-between p-4 border-b border-divider/40 last:border-none hover:bg-action-hover transition-all group`}
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className={`w-8 h-8 rounded-control flex items-center justify-center shrink-0 ${isReady ? 'bg-success/10 text-success' : isFailed ? 'bg-error/10 text-error' : 'bg-brand/5 text-brand'}`}>
                   {isPrep ? <Loader2 size={16} className="animate-spin" /> : isReady ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                </div>
                <div className="flex flex-col min-w-0">
                   <div className="flex items-center gap-2 mb-0.5">
                      <VFText variant="t5-strong" color="primary" className="leading-none">
                        {t('admin.audit.export.taskLabel', { format: task.format })}
                      </VFText>
                      <span className="text-[10px] text-text-disabled font-bold tabular-nums">#{task.id}</span>
                   </div>
                   <VFText variant="t6" color="tertiary" truncate className="max-w-[320px] opacity-70">
                     {task.createdAt} by {task.createdBy}
                   </VFText>
                </div>
              </div>

              <div className="flex items-center gap-3">
                 <VFTag variant={isReady ? 'success' : isFailed ? 'error' : 'neutral'} filled={false} className="h-5 text-[9px] font-bold uppercase tracking-tight">{task.status}</VFTag>
                 {isReady && (
                   <Button 
                    type="primary" 
                    size="small" 
                    icon={<Download size={14} />} 
                    className="bg-success border-success h-8 px-3 font-bold text-xs rounded-control"
                    onClick={() => window.open(task.downloadUrl)}
                   >
                     {t('admin.audit.export.download')}
                   </Button>
                 )}
                 {isFailed && (
                   <Tooltip title="Cluster storage node returned 403. Check permissions.">
                     <Button type="text" size="small" icon={<Info size={14} />} className="text-error" />
                   </Tooltip>
                 )}
              </div>
            </div>
          );
        })}
      </div>
    </VFCard>
  );
};
