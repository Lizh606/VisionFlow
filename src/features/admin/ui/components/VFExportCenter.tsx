
import React from 'react';
import { Button, List, Tooltip, App, Empty } from 'antd';
import { Download, RefreshCw, Loader2, CheckCircle2, XCircle, FileText, Info, X, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFDrawer } from '../../../../ui/VFDrawer';
import { VFText } from '../../../../ui/VFText';
import { VFTag } from '../../../../shared/ui/VFTag';
import { AuditExportTask } from '../../types/audit';

interface Props {
  open: boolean;
  tasks: AuditExportTask[];
  onClose: () => void;
  onRefresh: () => void;
}

export const VFExportCenter: React.FC<Props> = ({ open, tasks, onClose, onRefresh }) => {
  const { t } = useTranslation();

  return (
    <VFDrawer
      title={t('admin.audit.export.centerTitle')}
      subtitle={t('admin.audit.export.subtitle')}
      open={open}
      onClose={onClose}
      size="S"
      footer={
        <Button 
          type="text" 
          block 
          icon={<RefreshCw size={14} />} 
          onClick={onRefresh}
          className="text-text-tertiary font-bold text-xs h-10 hover:text-brand"
        >
          {t('admin.audit.export.checkUpdates')}
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        {tasks.length === 0 ? (
          <Empty 
            image={Empty.PRESENTED_IMAGE_SIMPLE} 
            description={t('admin.audit.export.empty')} 
            className="py-12" 
          />
        ) : (
          <List
            dataSource={tasks}
            split={false}
            renderItem={(task) => {
              const isReady = task.status === 'READY';
              const isFailed = task.status === 'FAILED';
              const isPrep = task.status === 'PREPARING';

              return (
                <div className="mb-4 p-4 bg-bg-card border border-divider rounded-card hover:border-brand/40 transition-all group shadow-sm">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                       <div className={`w-8 h-8 rounded-control flex items-center justify-center shrink-0 ${isReady ? 'bg-success/10 text-success' : isFailed ? 'bg-error/10 text-error' : 'bg-brand/5 text-brand'}`}>
                          {isPrep ? <Loader2 size={16} className="animate-spin" /> : isReady ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                       </div>
                       <div className="flex flex-col min-w-0">
                          <VFText variant="t5-strong" color="primary" className="leading-tight">
                            {t('admin.audit.export.taskLabel', { format: task.format })}
                          </VFText>
                          <VFText variant="t7" color="disabled" tabularNums className="text-[10px] font-bold opacity-60">#{task.id}</VFText>
                       </div>
                    </div>
                    <VFTag variant={isReady ? 'success' : isFailed ? 'error' : 'neutral'} filled={false} className="h-5 text-[9px] font-bold">
                      {task.status}
                    </VFTag>
                  </div>

                  {isFailed && (
                    <div className="mb-3 px-3 py-2 bg-error/[0.04] border border-error/10 rounded-control flex items-center gap-2">
                       <AlertCircle size={12} className="text-error" />
                       <VFText variant="t6" color="error" className="truncate text-[11px] font-medium">{task.errorSummary}</VFText>
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-divider/40 pt-3">
                     <VFText variant="t6" color="tertiary" className="font-medium tabular-nums opacity-60">{task.createdAt}</VFText>
                     <div className="flex gap-2">
                        {isReady && (
                          <Button 
                            type="primary" size="small" icon={<Download size={14} />} 
                            className="bg-success border-success h-8 px-4 font-bold text-xs rounded-control shadow-none hover:opacity-90"
                            onClick={() => window.open(task.downloadUrl, '_blank')}
                          >
                            {t('admin.audit.export.download')}
                          </Button>
                        )}
                        {isFailed && (
                          <Button 
                            size="small" 
                            className="text-xs h-8 px-3 font-bold border-divider text-text-secondary hover:text-brand hover:border-brand"
                            onClick={onRefresh}
                          >
                            {t('admin.audit.export.retry')}
                          </Button>
                        )}
                     </div>
                  </div>
                </div>
              );
            }}
          />
        )}
      </div>
    </VFDrawer>
  );
};
