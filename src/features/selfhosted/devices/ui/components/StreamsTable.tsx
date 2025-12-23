
import React from 'react';
import { Button, Dropdown, Tooltip, Empty, List } from 'antd';
import { useTranslation } from 'react-i18next';
import { Play, Pause, Edit, Trash2, MoreVertical, Video, Clock, Activity, Zap } from 'lucide-react';
import dayjs from '../../../../../config/dayjsConfig';
import { VFTable } from '../../../../../shared/ui/VFTable';
import { VFTag } from '../../../../../shared/ui/VFTag';
import { Stream } from '../../hooks/useWorkflowDeployment';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';
import { VFText } from '../../../../../ui/VFText';

interface Props {
  data: Stream[];
  isAdmin: boolean;
  onEdit: (stream: Stream) => void;
  onToggleStatus: (stream: Stream) => void;
  onDelete: (stream: Stream) => void;
}

const StreamCard: React.FC<{
  stream: Stream;
  isAdmin: boolean;
  onEdit: (s: Stream) => void;
  onToggleStatus: (s: Stream) => void;
  onDelete: (s: Stream) => void;
}> = ({ stream, isAdmin, onEdit, onToggleStatus, onDelete }) => {
  const { t } = useTranslation();
  const isRunning = stream.status === 'RUNNING';

  const menuItems = [
    { 
      key: 'toggle', 
      label: isRunning ? t('common.pause') : t('common.start'), 
      icon: isRunning ? <Pause size={14} /> : <Play size={14} />,
      onClick: () => onToggleStatus(stream)
    },
    { key: 'edit', label: t('common.edit'), icon: <Edit size={14} />, onClick: () => onEdit(stream) },
    { type: 'divider' as const },
    { key: 'delete', label: t('common.delete'), danger: true, icon: <Trash2 size={14} />, onClick: () => onDelete(stream) },
  ];

  return (
    <div className="flex flex-col p-4 bg-bg-card border-b border-divider last:border-b-0 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-control bg-bg-page border border-border flex items-center justify-center text-text-tertiary shrink-0">
            <Video size={18} strokeWidth={1.5} />
          </div>
          <div className="flex flex-col min-w-0">
            {/* V1.4: Card Title = T5 Strong */}
            <VFText variant="t5-strong" color="primary" truncate className="leading-tight">
              {stream.name}
            </VFText>
            {/* V1.4: ID = T7 Mono */}
            <VFText variant="t7" color="tertiary" className="mt-0.5 opacity-60">
              {stream.id}
            </VFText>
          </div>
        </div>
        
        {isAdmin && (
          <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
            <Button 
              type="text" 
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-action-hover" 
              icon={<MoreVertical size={20} className="text-text-tertiary" />} 
            />
          </Dropdown>
        )}
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <Zap size={14} className="text-brand opacity-70 shrink-0" />
          <VFText variant="t5" color="secondary" truncate className="font-semibold">{stream.workflow}</VFText>
          <VFTag variant="brand" className="h-5 text-[10px] px-1.5 font-bold opacity-70" filled={false}>
            {stream.version}
          </VFTag>
        </div>
        <VFTag 
          variant={isRunning ? 'success' : 'neutral'} 
          filled={true} 
          className="h-6 text-[10px] font-bold uppercase min-w-[72px]"
        >
          {stream.status}
        </VFTag>
      </div>

      <div className="flex items-center justify-between mt-1 pt-3 border-t border-divider/40">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Activity size={12} className="text-text-tertiary opacity-50" />
            <VFText variant="t6" color="tertiary" className="font-bold uppercase tracking-tight opacity-70">{stream.telemetry}</VFText>
          </div>
          <VFTag variant="neutral" className="h-5 text-[10px] px-2 font-mono" filled={false}>
            {stream.type}
          </VFTag>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={12} className="text-text-tertiary opacity-40" />
          {/* V1.4: Meta = T6 */}
          <VFText variant="t6" color="tertiary" className="font-medium opacity-80">{dayjs(stream.updatedAt).fromNow()}</VFText>
        </div>
      </div>
    </div>
  );
};

export const StreamsTable: React.FC<Props> = ({ data, isAdmin, onEdit, onToggleStatus, onDelete }) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();

  if (isMobile) {
    return (
      <div className="vf-mobile-list-container">
        <List
          dataSource={data}
          className="vf-mobile-list"
          locale={{ 
            emptyText: (
              <div className="py-16 flex flex-col items-center justify-center">
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<VFText variant="t5" color="tertiary">{t('selfhosted.workflowDeployment.empty')}</VFText>} />
              </div>
            )
          }}
          pagination={data.length > 0 ? {
            pageSize: 10,
            size: 'small',
            align: 'center',
            className: 'vf-list-pagination'
          } : false}
          renderItem={stream => (
            <StreamCard 
              key={stream.id}
              stream={stream}
              isAdmin={isAdmin}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          )}
        />
        <style>{`
          .vf-list-pagination {
            padding: 20px 24px !important;
            margin: 0 !important;
            border-top: 1px solid rgba(var(--vf-divider), var(--vf-divider-alpha));
            background-color: rgba(var(--vf-bg-card), 1);
          }
        `}</style>
      </div>
    );
  }

  const columns = [
    {
      title: t('selfhosted.workflowDeployment.streamName'),
      dataIndex: 'name',
      key: 'name',
      width: '24%',
      render: (text: string, record: Stream) => (
        <div className="flex items-center gap-3 py-1">
          <div className="w-9 h-9 rounded-control bg-bg-page border border-border flex items-center justify-center text-text-tertiary shrink-0">
            <Video size={16} strokeWidth={1.5} />
          </div>
          <div className="flex flex-col min-w-0">
            <VFText variant="t5-strong" color="primary" truncate className="leading-tight">
              {text}
            </VFText>
            <VFText variant="t7" color="tertiary" className="mt-0.5 opacity-50 tracking-tight">
              {record.id}
            </VFText>
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
        <VFTag variant="neutral" className="font-mono text-[10px] h-5 px-2" filled={false}>
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
        <div className="flex items-center gap-2">
          <VFText variant="t5" color="brand" className="font-bold hover:underline cursor-pointer truncate max-w-[160px]">{text}</VFText>
          <VFTag variant="brand" className="h-4.5 text-[9px] px-1.5 font-bold opacity-60" filled={false}>
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
            className="h-6 min-w-[80px] font-bold text-[10px] uppercase"
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
        <VFTag variant="neutral" className="h-5 text-[10px] px-2 font-bold uppercase tracking-tight" filled={false}>
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
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-text-tertiary opacity-40 shrink-0" />
            <VFText variant="t6" color="tertiary" className="font-medium whitespace-nowrap">{dayjs(date).fromNow()}</VFText>
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
            <Button type="text" size="small" icon={<MoreVertical size={18} />} className="text-text-tertiary" />
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
          size: 'small'
        }}
        className="!border-none !rounded-none"
      />
    </div>
  );
};
