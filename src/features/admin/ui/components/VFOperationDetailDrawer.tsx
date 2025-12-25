
import React from 'react';
import { Button, Table, Collapse, App, Divider, Tooltip } from 'antd';
import { 
  CheckCircle2, Copy, ExternalLink, FileJson, 
  User, Target, Activity, AlertCircle, 
  Clock, ShieldCheck, Server, History, 
  Terminal, Layout, ArrowUpRight, Zap
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFDrawer } from '../../../../ui/VFDrawer';
import { VFText } from '../../../../ui/VFText';
import { VFTag } from '../../../../shared/ui/VFTag';
import { AuditLogEntry } from '../../types/audit';
import dayjs from 'dayjs';

interface Props {
  open: boolean;
  result: AuditLogEntry | null;
  onClose: () => void;
  onNavigateToAudit?: (opId: string) => void;
}

export const VFOperationDetailDrawer: React.FC<Props> = ({ 
  open, result, onClose 
}) => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  if (!result) return null;

  const isSuccess = result.status === 'SUCCESS' || result.status === 'Succeeded';
  const isFailed = result.status === 'FAILED' || result.status === 'Failed';
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success(t('common.copy') + ' OK');
  };

  const SectionTitle = ({ children, icon: Icon }: any) => (
    <div className="flex items-center gap-2 mb-4 border-l-[3px] border-brand pl-3">
      <Icon size={16} className="text-brand opacity-60" />
      <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest">{children}</VFText>
    </div>
  );

  const InfoItem = ({ label, value, copyable, isId }: { label: string; value: React.ReactNode; copyable?: string; isId?: boolean }) => (
    <div className="flex flex-col gap-1 min-w-0">
      <VFText variant="t6" color="tertiary" className="font-bold opacity-60 uppercase text-[10px] tracking-wider">{label}</VFText>
      <div className="flex items-center gap-2 min-w-0">
        <VFText 
          variant={isId ? "t7" : "t5-strong"} 
          color={value ? "primary" : "disabled"} 
          truncate 
          className={isId ? "font-mono tabular-nums opacity-90" : ""}
        >
          {value || <span className="opacity-30 italic">N/A</span>}
        </VFText>
        {copyable && value && (
          <Button 
            type="text" size="small" icon={<Copy size={12} />} 
            onClick={() => handleCopy(copyable)}
            className="w-6 h-6 flex items-center justify-center text-text-tertiary hover:text-brand transition-all p-0 rounded-full"
          />
        )}
      </div>
    </div>
  );

  return (
    <VFDrawer
      title={t('admin.audit.tooltips.linkTrace')}
      subtitle={`adminOpId: ${result.adminOpId}`}
      open={open}
      onClose={onClose}
      size="L"
      footer={
        <div className="flex items-center justify-between w-full px-2">
          <div className="flex items-center gap-2">
             <ShieldCheck size={14} className="text-success opacity-60" />
             <VFText variant="t7" color="tertiary" className="font-bold uppercase tabular-nums">Trace Finalized</VFText>
          </div>
          <div className="flex items-center gap-3">
             <Button 
                type="text"
                icon={<FileJson size={16} />}
                className="font-bold text-xs h-10 px-4"
                onClick={() => handleCopy(JSON.stringify(result, null, 2))}
              >
                Copy Raw Trace
              </Button>
             <Button 
              type="primary" 
              className="h-10 px-10 font-bold shadow-md bg-text-primary border-text-primary text-white"
              onClick={onClose}
            >
              {t('admin.alerts.modals.result.doneBtn')}
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-10">
        
        {/* Step 1: Request Context */}
        <section>
          <SectionTitle icon={User}>{t('admin.alerts.modals.result.sections.request')}</SectionTitle>
          <div className="bg-bg-page/40 rounded-card border border-divider p-6 flex flex-col gap-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <InfoItem label={t('admin.audit.table.operator')} value={result.operatorId} />
              <InfoItem label={t('admin.audit.table.time')} value={dayjs(result.startedAt).format('YYYY-MM-DD HH:mm:ss')} isId />
              <InfoItem label={t('admin.audit.table.subject')} value={result.subjectId} copyable={result.subjectId} isId />
            </div>

            {result.reason && (
              <div className="flex flex-col gap-1.5 pt-4 border-t border-divider/40">
                <VFText variant="t6" color="tertiary" className="font-bold opacity-60 uppercase text-[10px] tracking-wider">
                  Reason / Comment
                </VFText>
                <VFText variant="t5" color="secondary" className="italic leading-relaxed">"{result.reason}"</VFText>
              </div>
            )}
          </div>
        </section>

        {/* Step 2: Downstream Chain */}
        <section>
          <SectionTitle icon={Server}>{t('admin.alerts.modals.result.sections.downstream')}</SectionTitle>
          <div className="flex flex-col gap-4">
             {result.downstreamCalls && result.downstreamCalls.length > 0 ? (
               <div className="border border-divider rounded-card overflow-hidden">
                 <Table 
                   size="small" pagination={false} dataSource={result.downstreamCalls} rowKey="traceId"
                   className="vf-standard-table"
                   columns={[
                     { title: 'Service (via Admin Gateway)', dataIndex: 'serviceName', render: t => <VFText variant="t6" color="primary" className="font-bold">{t}</VFText> },
                     { title: 'Endpoint', dataIndex: 'endpoint', render: t => <VFText variant="t7" color="secondary">{t}</VFText> },
                     { title: 'HTTP', dataIndex: 'httpCode', width: 80, align: 'center', render: c => <VFTag variant={c < 300 ? 'success' : 'error'} filled className="text-[10px]">{c}</VFTag> },
                     { title: 'Latency', dataIndex: 'durationMs', width: 90, align: 'right', render: d => <VFText variant="t6" color="tertiary" tabularNums>{d}ms</VFText> },
                   ]}
                 />
               </div>
             ) : (
                <div className="p-8 bg-bg-page/20 rounded-card border border-divider border-dashed text-center flex flex-col items-center gap-2">
                   <Terminal size={24} className="text-text-tertiary opacity-20" />
                   <VFText variant="t6" color="tertiary" className="italic">No downstream service orchestration recorded for this action type.</VFText>
                </div>
             )}
          </div>
        </section>

        {/* Step 3: Shared Core / State Result */}
        <section>
          <SectionTitle icon={ShieldCheck}>{t('admin.alerts.modals.result.sections.response')}</SectionTitle>
          <div className="flex flex-col gap-6">
             <div className="bg-bg-page/40 rounded-card border border-divider p-5 grid grid-cols-2 gap-6">
                <InfoItem label="Response Code" value={result.responseCode || (isSuccess ? '200 OK' : '500 ERROR')} isId />
                <InfoItem label="Status回填 (Feedback)" value={isSuccess ? 'Ledger Synced' : result.errorSummary} />
             </div>

             {result.keyChanges && result.keyChanges.length > 0 && (
               <div className="flex flex-col gap-3">
                 <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest px-1">
                   State Before / After
                 </VFText>
                 <div className="border border-divider rounded-card overflow-hidden bg-bg-card">
                    <Table 
                      size="small" pagination={false} dataSource={result.keyChanges} rowKey="field"
                      className="vf-standard-table"
                      columns={[
                        { title: 'Field', dataIndex: 'field', width: '30%', render: t => <VFText variant="t6" color="secondary" className="font-bold">{t}</VFText> },
                        { title: 'Before', dataIndex: 'before', width: '35%', render: v => <VFText variant="t7" color="tertiary">{String(v)}</VFText> },
                        { title: 'After', dataIndex: 'after', width: '35%', render: v => <VFText variant="t5-strong" color="brand">{String(v)}</VFText> },
                      ]}
                    />
                 </div>
               </div>
             )}
          </div>
        </section>

        {/* Step 4: Final Closure */}
        <section>
          <SectionTitle icon={Activity}>{t('admin.alerts.modals.result.sections.feedback')}</SectionTitle>
          <div className={`p-6 rounded-card border flex items-center justify-between ${isSuccess ? 'bg-success/[0.02] border-success/20' : 'bg-error/[0.02] border-error/20'}`}>
             <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isSuccess ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                   {isSuccess ? <CheckCircle2 size={28} /> : <AlertCircle size={28} />}
                </div>
                <div className="flex flex-col">
                   <VFText variant="t4" color={isSuccess ? 'success' : 'error'} className="font-bold uppercase tracking-tight">
                     {result.status}
                   </VFText>
                   <VFText variant="t6" color="secondary" className="font-medium">
                     Trace ID: <span className="font-mono">{result.adminOpId.slice(-8)}</span>
                   </VFText>
                </div>
             </div>
             
             <div className="text-right">
                <VFText variant="t6" color="tertiary" className="uppercase font-bold text-[9px] block mb-1">Final Sync At</VFText>
                <VFText variant="t5" color="primary" tabularNums className="font-bold">
                  {result.timestamp ? dayjs(result.timestamp).format('HH:mm:ss') : '---'}
                </VFText>
             </div>
          </div>
        </section>
      </div>

      <style>{`
        .vf-standard-table .ant-table-thead > tr > th {
          background-color: var(--vf-bg-page) !important;
          font-size: 10px !important;
          text-transform: uppercase;
          font-weight: 700 !important;
          padding: 10px 16px !important;
        }
      `}</style>
    </VFDrawer>
  );
};
