import React from 'react';
import { ArrowUpRight, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFText } from '../../../../ui/VFText';
import { VFTag } from '../../../../shared/ui/VFTag';
import { VFTable } from '../../../../shared/ui/VFTable';

export const RelatedAlertsTable: React.FC<{ subjectId: string; onViewAlert: (id: string) => void }> = ({ subjectId, onViewAlert }) => {
  const { t } = useTranslation();

  const mockRelated = [
    { id: 'ALT-8829-CR', severity: 'P0', status: 'OPEN', type: 'HEARTBEAT_LOST', lastSeen: '2m ago' }
  ];

  const columns = [
    { 
      title: 'Sev', 
      dataIndex: 'severity', 
      width: 60, 
      render: (v: string) => <VFTag variant="error" filled className="h-5 px-1.5 font-bold text-[9px]">{v}</VFTag> 
    },
    { 
      title: 'Type', 
      dataIndex: 'type', 
      render: (t_val: string, r: any) => (
        <div className="flex flex-col min-w-0">
          <VFText variant="t6" color="primary" className="font-bold truncate">{t_val.replace(/_/g, ' ')}</VFText>
          <VFText variant="t7" color="brand" className="text-[10px] tabular-nums font-mono hover:underline cursor-pointer" onClick={() => onViewAlert(r.id)}>
            Alert ID: {r.id}
          </VFText>
        </div>
      )
    },
    { 
      title: 'Seen', 
      dataIndex: 'lastSeen', 
      width: 70, 
      render: v => <VFText variant="t7" color="tertiary" tabularNums className="font-medium">{v}</VFText> 
    },
    { 
      title: '', 
      key: 'act', 
      width: 44, 
      align: 'right' as const, 
      render: () => <ArrowUpRight size={14} className="text-text-tertiary opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" /> 
    }
  ];

  return (
    <VFCard 
      title={
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-brand opacity-60" />
          <span>{t('admin.subjects.sections.relatedAlerts')}</span>
        </div>
      } 
      noPadding 
      className="shadow-none border-divider overflow-hidden"
    >
      <VFTable 
        size="small" 
        pagination={false} 
        dataSource={mockRelated} 
        rowKey="id"
        columns={columns as any}
        onRow={(r) => ({ 
          onClick: () => onViewAlert(r.id), 
          className: 'cursor-pointer group' 
        })}
        className="!border-none !shadow-none !rounded-none"
        locale={{ emptyText: <div className="py-12"><VFText variant="t6" color="disabled" className="italic opacity-60 text-center block">No active correlations</VFText></div> }}
      />
    </VFCard>
  );
};