
import React from 'react';
import { Button, Dropdown, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { Play, Pause, Edit, Trash2, MoreVertical, Video, Clock } from 'lucide-react';
import dayjs from '../../../../../config/dayjsConfig';
import { VFTable } from '../../../../../shared/ui/VFTable';
import { VFTag } from '../../../../../shared/ui/VFTag';
import { Stream } from '../../hooks/useWorkflowDeployment';

interface Props {
  data: Stream[];
  isAdmin: boolean;
  onEdit: (stream: Stream) => void;
  onToggleStatus: (stream: Stream) => void;
  onDelete: (stream: Stream) => void;
}

export const StreamsTable: React.FC<Props> = ({ data, isAdmin, onEdit, onToggleStatus, onDelete }) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t('selfhosted.workflowDeployment.streamName'),
      dataIndex: 'name',
      key: 'name',
      width: '24%',
      render: (text: string, record: Stream) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-control bg-bg-page border border-border/40 flex items-center justify-center text-text-tertiary shrink-0">
            <Video size={14} strokeWidth={1.5} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-text-primary text-[14px] leading-tight truncate">
              {text}
            </span>
            <span className="text-[11px] font-mono text-text-tertiary mt-0.5 tracking-tight">
              {record.id}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: t('selfhosted.workflowDeployment.input'),
      dataIndex: 'type',
      key: 'type',
      width: '10%',
      render: (type: string) => (
        <VFTag variant="neutral" className="font-mono text-[10px] h-5 px-1.5" filled={false}>
          {type}
        </VFTag>
      ),
    },
    {
      title: t('selfhosted.workflowDeployment.workflow'),
      dataIndex: 'workflow',
      key: 'workflow',
      width: '24%',
      render: (text: string, record: Stream) => (
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] font-bold text-brand hover:underline cursor-pointer truncate max-w-[140px]">{text}</span>
          <VFTag variant="brand" className="h-4 text-[9px] px-1 opacity-70" filled={false}>
            {record.version}
          </VFTag>
        </div>
      ),
    },
    {
      title: t('selfhosted.workflowDeployment.status'),
      dataIndex: 'status',
      key: 'status',
      width: '12%',
      render: (s: string) => {
        const isRunning = s === 'RUNNING';
        return (
          <VFTag 
            variant={isRunning ? 'success' : 'neutral'} 
            filled={true} 
            className="h-5.5 min-w-[72px] font-bold text-[10px] uppercase"
          >
            {s}
          </VFTag>
        );
      },
    },
    {
      title: t('selfhosted.workflowDeployment.telemetry'),
      dataIndex: 'telemetry',
      key: 'telemetry',
      width: '12%',
      render: (t_val: string) => (
        <VFTag variant="neutral" className="h-5 text-[10px] px-1.5" filled={false}>
          {t_val}
        </VFTag>
      ),
    },
    {
      title: t('selfhosted.workflowDeployment.updated'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '14%',
      render: (date: string) => (
        <Tooltip title={dayjs(date).format('YYYY-MM-DD HH:mm:ss')}>
          <div className="flex items-center gap-1.5 text-[12px] text-text-tertiary">
            <Clock size={12} className="opacity-40" />
            <span>{dayjs(date).fromNow()}</span>
          </div>
        </Tooltip>
      )
    },
    {
      title: '',
      key: 'actions',
      width: 50,
      align: 'right' as const,
      render: (_: any, record: Stream) => {
        if (!isAdmin) return null;
        const items = [
          { 
            key: 'toggle', 
            label: record.status === 'RUNNING' ? t('common.pause') : t('common.start'), 
            icon: record.status === 'RUNNING' ? <Pause size={14} /> : <Play size={14} />,
            onClick: () => onToggleStatus(record)
          },
          { key: 'edit', label: t('common.edit'), icon: <Edit size={14} />, onClick: () => onEdit(record) },
          { type: 'divider' as const },
          { key: 'delete', label: t('common.delete'), danger: true, icon: <Trash2 size={14} />, onClick: () => onDelete(record) },
        ];
        return (
          <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
            <Button type="text" size="small" icon={<MoreVertical size={16} />} className="text-text-tertiary" />
          </Dropdown>
        );
      }
    }
  ];

  return (
    <div className="vf-table-container">
      <VFTable<Stream>
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={{ 
          pageSize: 10, 
          showSizeChanger: true, 
          size: 'small',
          hideOnSinglePage: false
        }}
        className="!border-none !rounded-none"
      />
    </div>
  );
};
