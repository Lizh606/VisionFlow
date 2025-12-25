
import React from 'react';
import { Button, Tooltip, App } from 'antd';
import { 
  Copy, ArrowRight, AlertCircle, Clock, 
  Search, History, ShieldCheck, Activity 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFTable } from '../../../../shared/ui/VFTable';
import { VFTag } from '../../../../shared/ui/VFTag';
import { VFText } from '../../../../ui/VFText';
import { AuditLogEntry } from '../../types/audit';
import dayjs from 'dayjs';

interface Props {
  data: AuditLogEntry[];
  loading: boolean;
  onRowClick: (entry: AuditLogEntry) => void;
  onFilterSubject?: (id: string) => void;
}

export const VFAuditTable: React.FC<Props> = ({ data, loading, onRowClick, onFilterSubject }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    message.success(t('common.copy') + ' OK');
  };

  const columns = [
    {
      title: t('admin.audit.table.time'),
      dataIndex: 'startedAt',
      width: 120,
      render: (started: string) => (
        <VFText variant="t6" color="tertiary" tabularNums className="font-medium">
          {dayjs(started).format('HH:mm:ss')}
        </VFText>
      )
    },
    {
      title: 'adminOpId',
      dataIndex: 'adminOpId',
      width: 180,
      render: (id: string) => (
        <div className="flex items-center gap-2 group/id">
          <VFText variant="t7" color="primary" className="font-bold tabular-nums truncate max-w-[120px]">{id}</VFText>
          <Button 
            type="text" 
            size="small" 
            icon={<Copy size={12} />} 
            onClick={(e) => handleCopy(e, id)}
            className="opacity-0 group-hover/id:opacity-100 hover:text-brand transition-all flex items-center justify-center p-0 w-6 h-6 rounded-full"
          />
        </div>
      )
    },
    {
      title: t('admin.audit.table.action'),
      dataIndex: 'actionType',
      width: 180,
      render: (t_val: string) => <VFText variant="t5-strong" color="primary">{t_val}</VFText>
    },
    {
      title: t('admin.audit.table.subject'),
      key: 'subject',
      width: 220,
      render: (_: any, r: AuditLogEntry) => (
        <div className="flex flex-col overflow-hidden">
          <VFText variant="t6" color="tertiary" className="uppercase font-bold text-[9px] opacity-60 mb-0.5 tracking-tighter">
            {r.subjectType}
          </VFText>
          <div className="flex items-center gap-2">
             <VFText 
              variant="t7" color="secondary" truncate 
              className="max-w-[150px] font-mono hover:text-brand hover:underline cursor-pointer"
              onClick={(e) => { e.stopPropagation(); onFilterSubject?.(r.subjectId); }}
             >
               {r.subjectId}
             </VFText>
          </div>
        </div>
      )
    },
    {
      title: t('admin.audit.table.operator'),
      dataIndex: 'operatorId',
      width: 140,
      render: (id: string) => (
        <div className="flex items-center gap-1.5">
          <VFText variant="t6" color="secondary" className="font-bold">{id}</VFText>
        </div>
      )
    },
    {
      title: t('admin.audit.table.status'),
      dataIndex: 'status',
      width: 120,
      render: (s: string) => {
        const isSuccess = s === 'SUCCESS' || s === 'Succeeded';
        const isFailed = s === 'FAILED' || s === 'Failed';
        return (
          <VFTag 
            variant={isSuccess ? 'success' : isFailed ? 'error' : 'info'} 
            filled={isSuccess} 
            className="font-bold text-[10px] min-w-[80px]"
          >
            {isSuccess ? t('admin.audit.status.succeeded') : isFailed ? t('admin.audit.status.failed') : t('admin.audit.status.inProgress')}
          </VFTag>
        );
      }
    },
    {
      title: '',
      key: 'actions',
      width: 56,
      fixed: 'right' as const,
      align: 'center' as const,
      render: () => <ArrowRight size={18} className="text-text-tertiary opacity-0 group-hover:opacity-100 transition-all -translate-x-1" />
    }
  ];

  return (
    <VFTable<AuditLogEntry>
      dataSource={data}
      columns={columns as any}
      loading={loading}
      rowKey="adminOpId"
      scroll={{ x: 1200 }}
      onRow={(r) => ({
        onClick: () => onRowClick(r),
        className: 'cursor-pointer group'
      })}
    />
  );
};
