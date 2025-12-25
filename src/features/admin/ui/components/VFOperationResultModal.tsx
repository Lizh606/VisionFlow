
import React, { useMemo } from 'react';
import { Modal, Button, Table, App, Space, Tooltip } from 'antd';
import { 
  CheckCircle2, XCircle, Copy, 
  ExternalLink, User, Activity, Target, X,
  Loader2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AdminOpResult } from '../../types/alerts';
import { VFText } from '../../../../ui/VFText';
import { VFTag } from '../../../../shared/ui/VFTag';

interface Props {
  open: boolean;
  result: AdminOpResult | null;
  onClose: () => void;
  onNavigateToAudit?: (opId: string) => void;
}

export const VFOperationResultModal: React.FC<Props> = ({ open, result, onClose, onNavigateToAudit }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  // Safe time formatting logic moved before conditional return to satisfy Rules of Hooks
  const formattedTime = useMemo(() => {
    if (!result?.timestamp) return '---';
    if (result.timestamp.includes('T')) {
      const parts = result.timestamp.split('T');
      return parts.length > 1 ? parts[1].slice(0, 8) : result.timestamp;
    }
    return result.timestamp;
  }, [result?.timestamp]);

  if (!result) return null;

  const isSuccess = result.status === 'SUCCESS';
  const isFailed = result.status === 'FAILED' || result.status === 'CONFLICT';
  const isPending = result.status === 'PENDING';

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    message.success(t('common.copy') + ' OK');
  };

  const renderValue = (val: any) => {
    if (val === undefined || val === null || val === '') return <span className="opacity-40 italic">N/A</span>;
    if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
    return String(val);
  };

  // V1.4 Status-driven Header UI
  const headerStyles = isSuccess 
    ? { bg: 'bg-success/[0.02]', iconBg: 'bg-success/10 text-success', icon: <CheckCircle2 size={32} strokeWidth={2.5} /> }
    : isFailed 
    ? { bg: 'bg-error/[0.02]', iconBg: 'bg-error/10 text-error', icon: <XCircle size={32} strokeWidth={2.5} /> }
    : { bg: 'bg-brand/[0.02]', iconBg: 'bg-brand/10 text-brand', icon: <Loader2 size={32} strokeWidth={2.5} className="animate-spin" /> };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={640}
      closable={false}
      className="vf-modal-receipt"
      styles={{ 
        body: { padding: 0 },
        content: { borderRadius: 'var(--vf-radius-card)', overflow: 'hidden' }
      }}
    >
      {/* Header: Fixed logic to handle PENDING correctly */}
      <div className={`p-8 flex flex-col items-center text-center gap-3 ${headerStyles.bg}`}>
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-1 ${headerStyles.iconBg}`}>
          {headerStyles.icon}
        </div>
        
        <VFText variant="t2" color="primary">
          {isSuccess && t('admin.common.operations.result.title')}
          {isFailed && t('admin.common.operations.result.failed')}
          {isPending && t('admin.common.operations.result.processing')}
        </VFText>
        
        <VFText variant="t5" color="secondary" className="max-w-[400px]">
          {isSuccess && t('admin.common.operations.result.syncHint')}
          {isFailed && (result.errorSummary || result.errorMessage)}
          {isPending && t('admin.common.operations.result.syncingHint')}
        </VFText>
        
        <Button 
          type="text" 
          icon={<X size={20} />} 
          onClick={onClose}
          className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full hover:bg-black/5"
        />
      </div>

      <div className="p-8 pt-2 flex flex-col gap-8">
        {/* Meta Grid: 2x2 Architecture */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          <div className="flex flex-col gap-1.5">
            <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest">{t('admin.common.operations.result.actionLabel')}</VFText>
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-brand opacity-60" />
              <VFText variant="t5-strong" color="primary">{result.actionType}</VFText>
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest">{t('admin.common.operations.result.timeLabel')}</VFText>
            <Tooltip title={result.timestamp || 'Operation started at ' + result.startedAt}>
              <VFText variant="t5" color="secondary" tabularNums>
                {isPending ? t('admin.common.operations.result.inProgress').toUpperCase() : formattedTime}
              </VFText>
            </Tooltip>
          </div>

          <div className="flex flex-col gap-1.5">
            <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest">{t('admin.common.operations.result.targetLabel')}</VFText>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 group/target relative">
                <Target size={14} className="text-text-tertiary shrink-0" />
                <VFText variant="t5-strong" color="primary" truncate className="max-w-[140px]">{result.subjectId}</VFText>
                <VFTag variant="neutral" className="scale-90 opacity-60 shrink-0" filled={false}>{result.subjectType}</VFTag>
                <Button 
                  type="text" size="small" icon={<Copy size={12} />} 
                  className="w-11 h-11 flex items-center justify-center p-0 text-text-tertiary opacity-0 group-hover/target:opacity-100 hover:text-brand transition-all -ml-2"
                  onClick={(e) => handleCopy(e, result.subjectId)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest">{t('admin.common.operations.result.opIdLabel')}</VFText>
            <div className="flex items-center justify-between h-9 px-3 bg-bg-page border border-divider rounded-control group transition-all hover:border-border-strong relative overflow-hidden">
              <VFText variant="t7" color="primary" className="font-bold select-all truncate pr-8">{result.adminOpId}</VFText>
              <Button 
                type="text" 
                size="small" 
                icon={<Copy size={14} />} 
                onClick={(e) => handleCopy(e, result.adminOpId)}
                className="absolute right-0 w-11 h-11 flex items-center justify-center p-0 text-text-tertiary opacity-40 group-hover:opacity-100 hover:text-brand"
              />
            </div>
          </div>
        </div>

        {/* Key Changes Table */}
        {result.keyChanges && result.keyChanges.length > 0 && (
          <div className="flex flex-col gap-3">
            <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest">{t('admin.common.operations.result.keyChanges')}</VFText>
            <div className="border border-divider rounded-card overflow-hidden bg-bg-card shadow-sm">
              <Table 
                size="small"
                pagination={false}
                dataSource={result.keyChanges}
                rowKey="field"
                columns={[
                  { title: 'Field', dataIndex: 'field', width: '30%', render: (t) => <VFText variant="t6" color="secondary" className="font-bold">{t}</VFText> },
                  { title: 'Before', dataIndex: 'before', width: '35%', render: renderValue },
                  { title: 'After', dataIndex: 'after', width: '35%', render: (v) => <VFText variant="t5-strong" color="brand">{renderValue(v)}</VFText> },
                ]}
                className="vf-receipt-mini-table"
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="px-8 py-5 bg-bg-page/50 border-t border-divider flex items-center justify-between">
        <Space size={16}>
          <div className="flex flex-col">
            <VFText variant="t6" color="tertiary" className="uppercase font-bold text-[9px] tracking-tighter">{t('admin.common.operations.result.operatorLabel')}</VFText>
            <div className="flex items-center gap-1.5">
              <User size={12} className="text-text-tertiary" />
              <VFText variant="t6" color="primary" className="font-bold">{result.operatorId}</VFText>
            </div>
          </div>
          <div className="w-px h-6 bg-divider mx-1" />
          <div className="flex flex-col">
            <VFText variant="t6" color="tertiary" className="uppercase font-bold text-[9px] tracking-tighter">Final Status</VFText>
            <VFTag variant={isSuccess ? 'success' : isFailed ? 'error' : 'info'} filled className="h-4.5 px-2 text-[9px] font-bold">
              {result.status}
            </VFTag>
          </div>
        </Space>

        <Space size={12}>
          {!isPending && (
            <Tooltip title="View full transactional trace in Audit Logs">
              <Button 
                icon={<ExternalLink size={16} />}
                className="h-10 px-5 rounded-control font-bold text-text-secondary border-border hover:!text-brand hover:!border-brand"
                onClick={() => onNavigateToAudit?.(result.adminOpId)}
              >
                {t('admin.common.operations.result.viewAudit')}
              </Button>
            </Tooltip>
          )}
          <Button 
            type="primary" 
            className="h-10 px-8 rounded-control font-bold shadow-md bg-text-primary border-text-primary text-white"
            onClick={onClose}
          >
            {isPending ? t('common.cancel') : t('admin.common.operations.result.doneBtn')}
          </Button>
        </Space>
      </div>

      <style>{`
        .vf-modal-receipt .ant-modal-content { padding: 0 !important; }
        .vf-receipt-mini-table .ant-table-thead > tr > th { 
          background-color: var(--vf-bg-page) !important; 
          font-size: 10px !important; 
          text-transform: uppercase;
          font-weight: 700 !important;
          padding: 8px 12px !important;
        }
      `}</style>
    </Modal>
  );
};
