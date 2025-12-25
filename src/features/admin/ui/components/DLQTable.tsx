
import React, { useState } from 'react';
import { Button, Tooltip, App, Dropdown, Input } from 'antd';
import { Eye, MoreVertical, Copy, Search, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFTable } from '../../../../shared/ui/VFTable';
import { VFTag } from '../../../../shared/ui/VFTag';
import { VFText } from '../../../../ui/VFText';
import { VFEmptyState } from '../../../../shared/ui/VFEmptyState';
import { DLQSample } from '../../types/health';
import dayjs from 'dayjs';

interface Props {
  data: DLQSample[];
  onView: (sample: DLQSample) => void;
}

export const DLQTable: React.FC<Props> = ({ data, onView }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [search, setSearch] = useState('');

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    message.success(t('common.copy'));
  };

  const filtered = data.filter(d => 
    d.subjectId.toLowerCase().includes(search.toLowerCase()) || 
    d.eventType.toLowerCase().includes(search.toLowerCase()) ||
    d.id.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: t('admin.health.table.firstSeen'),
      dataIndex: 'firstSeenAt',
      width: 100,
      render: (v: string) => <VFText variant="t6" color="tertiary" tabularNums className="font-medium">{dayjs(v).format('HH:mm:ss')}</VFText>
    },
    {
      title: t('admin.health.table.eventSchema'),
      dataIndex: 'eventType',
      width: 220,
      ellipsis: true,
      render: (v: string) => (
        <Tooltip title={v} placement="topLeft">
          <VFText variant="t7" color="primary" className="font-mono font-bold truncate block">{v}</VFText>
        </Tooltip>
      )
    },
    {
      title: t('admin.health.table.domain'),
      dataIndex: 'domain',
      width: 100,
      render: (v: string) => <VFTag variant="neutral" className="font-bold text-[9px] uppercase scale-90">{v}</VFTag>
    },
    {
      title: t('admin.health.table.targetSubject'),
      key: 'subject',
      width: 240,
      render: (_: any, r: DLQSample) => (
        <div className="flex flex-col group/id min-w-0">
          <VFText variant="t6" color="tertiary" className="uppercase font-bold text-[9px] opacity-60 mb-0.5 tracking-tighter">{r.subjectType}</VFText>
          <div className="flex items-center gap-2 min-w-0">
            <Tooltip title={r.subjectId} placement="topLeft">
              <VFText variant="t7" color="secondary" className="font-mono truncate flex-1">{r.subjectId}</VFText>
            </Tooltip>
            <Button 
              type="text" size="small" icon={<Copy size={12}/>} 
              className="opacity-0 group-hover/id:opacity-100 h-6 w-6 p-0 flex items-center justify-center text-text-tertiary hover:text-brand transition-all shrink-0" 
              onClick={(e) => handleCopy(e, r.subjectId)} 
            />
          </div>
        </div>
      )
    },
    {
      title: t('admin.health.table.retryCount'),
      dataIndex: 'retryCount',
      width: 90,
      align: 'center' as const,
      render: (v: number) => <VFText variant="t5-strong" color={v >= 5 ? 'error' : 'secondary'} tabularNums>{v}</VFText>
    },
    {
      title: t('admin.health.table.status'),
      dataIndex: 'status',
      width: 110,
      render: (s: string) => (
        <VFTag variant={s === 'POISONED' ? 'error' : s === 'RETRIABLE' ? 'warning' : 'info'} filled={false} className="font-bold text-[10px] uppercase">
          {s}
        </VFTag>
      )
    },
    {
      title: '',
      key: 'actions',
      width: 56,
      fixed: 'right' as const,
      align: 'center' as const,
      render: (_: any, r: DLQSample) => (
        <Dropdown 
          menu={{ items: [
            { key: 'view', label: t('admin.health.table.actions.view'), icon: <Eye size={14}/>, onClick: () => onView(r) }
          ] }} 
          trigger={['click']} 
          placement="bottomRight"
        >
          <Button type="text" icon={<MoreVertical size={18} />} className="text-text-tertiary hover:text-brand h-9 w-9 flex items-center justify-center rounded-full" />
        </Dropdown>
      )
    }
  ];

  return (
    <div className="bg-bg-card rounded-card border border-border overflow-hidden h-full flex flex-col shadow-sm">
      <div className="p-4 border-b border-divider flex items-center bg-bg-page/10 shrink-0 justify-between">
        <Input 
          prefix={<Search size={14} className="text-text-tertiary" />}
          placeholder={t('admin.health.filters.searchDlq')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="h-9 w-72 rounded-control border-divider"
          allowClear
        />
        <VFText variant="t6" color="tertiary" className="font-bold uppercase tracking-widest opacity-60">
          {t('admin.health.table.foundCount', { count: filtered.length })}
        </VFText>
      </div>
      <div className="flex-1 overflow-hidden">
        <VFTable 
          dataSource={filtered} 
          columns={columns as any} 
          rowKey="id" 
          pagination={{ 
            pageSize: 10, 
            size: 'small',
            showTotal: (total: number) => t('common.total', { total })
          }} 
          scroll={{ x: 1000, y: 520 }}
          onRow={(r) => ({ onClick: () => onView(r), className: 'cursor-pointer group' })}
          className="!border-none !rounded-none !shadow-none"
          locale={{ 
            emptyText: (
              <div className="py-20">
                {search ? (
                  <VFEmptyState description={t('admin.health.table.emptySearch')} actionLabel={t('admin.health.actions.clearSearch')} onAction={() => setSearch('')} />
                ) : (
                  <VFEmptyState icon={<Activity size={24} />} title={t('admin.health.table.healthyTitle')} description={t('admin.health.table.empty')} />
                )}
              </div>
            ) 
          }}
        />
      </div>
    </div>
  );
};
