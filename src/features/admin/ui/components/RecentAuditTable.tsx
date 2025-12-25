import React from 'react';
import { Button, Tooltip, App } from 'antd';
import { FileSearch, Copy, Activity, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFText } from '../../../../ui/VFText';
import { VFTag } from '../../../../shared/ui/VFTag';
import { VFTable } from '../../../../shared/ui/VFTable';

interface Props {
  subjectId: string;
  onViewAudit: (id: string) => void;
  onViewFullLog: () => void;
}

export const RecentAuditTable: React.FC<Props> = ({ subjectId, onViewAudit, onViewFullLog }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const mockAudits = [
    { id: '01HFZ1XG2Z5V5V5V5V5V5V5V5V', action: 'Freeze', status: 'SUCCESS', time: '10:05' }
  ];

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    message.success(t('common.copy') + ' OK');
  };

  const columns = [
    { 
      title: 'Action', 
      dataIndex: 'action', 
      render: (t_val: string, r: any) => (
        <div className="flex flex-col min-w-0">
          <VFText variant="t6" color="primary" className="font-bold">{t_val}</VFText>
          <div className="flex items-center gap-1 group/id cursor-pointer" onClick={(e) => handleCopy(e, r.id)}>
            <VFText variant="t7" color="disabled" className="text-[10px] tabular-nums font-mono">adminOpId: {r.id.slice(0, 8)}...</VFText>
            <Copy size={8} className="text-text-tertiary opacity-0 group-hover/id:opacity-100 transition-all" />
          </div>
        </div>
      )
    },
    { 
      title: 'Result', 
      dataIndex: 'status', 
      width: 80, 
      render: s => <VFTag variant="success" className="h-4.5 px-1 font-bold text-[8px] scale-90 origin-left uppercase">{s}</VFTag> 
    },
    { 
      title: 'Time', 
      dataIndex: 'time', 
      width: 60, 
      render: t_val => <VFText variant="t7" color="tertiary" tabularNums className="text-[11px] font-medium">{t_val}</VFText> 
    },
    { 
      title: '', 
      key: 'act', 
      width: 44, 
      align: 'right' as const, 
      render: (_: any, r: any) => (
        <Tooltip title="View Transaction Trace">
          <Button 
            type="text" 
            size="small" 
            icon={<FileSearch size={14}/>} 
            className="text-text-tertiary opacity-0 group-hover:opacity-100 transition-all hover:text-brand" 
            onClick={(e) => { e.stopPropagation(); onViewAudit(r.id); }}
          />
        </Tooltip>
      )
    }
  ];

  return (
    <VFCard 
      title={
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-brand opacity-60" />
          <span>{t('admin.subjects.sections.recentAudit')}</span>
        </div>
      } 
      noPadding 
      className="shadow-none border-divider overflow-hidden"
      extra={
        <Button 
          type="link" 
          size="small" 
          className="text-[11px] font-bold p-0 flex items-center gap-1" 
          onClick={onViewFullLog}
        >
          View Full Log <ExternalLink size={12} />
        </Button>
      }
    >
      <VFTable 
        size="small" 
        pagination={false} 
        dataSource={mockAudits} 
        rowKey="id"
        columns={columns as any}
        onRow={(r) => ({ 
          onClick: () => onViewAudit(r.id), 
          className: 'cursor-pointer group' 
        })}
        className="!border-none !shadow-none !rounded-none"
      />
    </VFCard>
  );
};