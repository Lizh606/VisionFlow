
import React, { useMemo } from 'react';
import { Button, Tooltip, Dropdown, App } from 'antd';
import { MoreVertical, CheckCircle, Eye, ShieldOff, Check, Copy, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFTable } from '../../../../shared/ui/VFTable';
import { VFTag } from '../../../../shared/ui/VFTag';
import { VFText } from '../../../../ui/VFText';
import { AdminAlert, AlertStatus, AlertSeverity } from '../../types/alerts';
import dayjs from 'dayjs';

interface Props {
  data: AdminAlert[];
  loading: boolean;
  visibleKeys: string[];
  onAck: (alert: AdminAlert) => void;
  onViewDetails: (alert: AdminAlert) => void;
  onViewSubject: (alert: AdminAlert) => void;
}

export const AlertsTable: React.FC<Props> = ({ data, loading, visibleKeys, onAck, onViewDetails, onViewSubject }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const handleCopy = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    message.success(t('common.copy') + ' OK');
  };
  
  const columnPool: any = useMemo(() => {
    return {
      severity: {
        title: t('admin.alerts.table.severity'),
        dataIndex: 'severity',
        key: 'severity',
        width: 88,
        fixed: 'left' as const,
        render: (val: AlertSeverity) => (
          <VFTag 
            variant={val === 'P0' ? 'error' : val === 'P1' ? 'warning' : 'info'} 
            filled 
            className="font-bold min-w-[42px]"
          >
            {val}
          </VFTag>
        )
      },
      status: {
        title: t('admin.alerts.table.status'),
        dataIndex: 'status',
        key: 'status',
        width: 120,
        render: (val: AlertStatus) => {
          const config: any = {
            OPEN: { variant: 'error', label: t('admin.alerts.status.open') },
            ACKNOWLEDGED: { variant: 'warning', label: t('admin.alerts.status.acknowledged') },
            SUPPRESSED: { variant: 'neutral', label: t('admin.alerts.status.suppressed') },
            RESOLVED: { variant: 'success', label: t('admin.alerts.status.resolved') }
          };
          const c = config[val] || { variant: 'error', label: val };
          return (
            <VFTag variant={c.variant} filled={val === 'RESOLVED'} className="text-[10px] font-bold uppercase tracking-tight">
              {c.label}
            </VFTag>
          );
        }
      },
      type: {
        title: t('admin.alerts.table.type'),
        dataIndex: 'type',
        key: 'type',
        width: 220,
        render: (val: string) => <VFText variant="t5-strong" color="primary" className="truncate block">{val.replace(/_/g, ' ')}</VFText>
      },
      subject: {
        title: t('admin.alerts.table.subject'),
        key: 'subject',
        width: 260,
        render: (_: any, r: AdminAlert) => (
          <div className="flex flex-col group/id">
            <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-tighter scale-90 origin-left opacity-70 mb-0.5">{r.subjectType}</VFText>
            <div className="flex items-center gap-1.5">
              <Tooltip title={t('admin.alerts.actions.viewContext')}>
                {/* 
                   Fix UC-AC-001: 
                   1. VFText 现在支持 onClick，确保点击能正确捕获。
                   2. 使用 e.stopPropagation() 彻底阻断 Table Row 的全局跳转逻辑。
                */}
                <VFText 
                  variant="t7" 
                  color="brand" 
                  className="max-w-[170px] truncate leading-none pt-[1px] hover:underline font-bold cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewSubject(r);
                  }}
                >
                  {r.subjectId}
                </VFText>
              </Tooltip>
              <ArrowUpRight size={12} className="text-brand opacity-0 group-hover/id:opacity-100 transition-all" />
              <Button 
                type="text" 
                size="small" 
                icon={<Copy size={12} />} 
                onClick={(e) => handleCopy(e, r.subjectId)}
                className="h-5 w-5 p-0 flex items-center justify-center text-text-tertiary opacity-0 group-hover/id:opacity-100 hover:text-brand transition-all"
              />
            </div>
          </div>
        )
      },
      impact: {
        title: t('admin.alerts.table.impact'),
        dataIndex: 'impactScope',
        key: 'impact',
        width: 220,
        render: (val: string) => <VFText variant="t6" color="secondary" truncate className="block">{val}</VFText>
      },
      firstSeen: {
        title: t('admin.alerts.table.firstSeen'),
        dataIndex: 'firstSeenAt',
        key: 'firstSeen',
        width: 140,
        render: (val: string) => (
          <Tooltip title={dayjs(val).format('YYYY-MM-DD HH:mm:ss')}>
            <VFText variant="t6" color="tertiary" tabularNums className="font-medium">{dayjs(val).fromNow()}</VFText>
          </Tooltip>
        )
      },
      lastSeen: {
        title: t('admin.alerts.table.lastSeen'),
        dataIndex: 'lastSeenAt',
        key: 'lastSeen',
        width: 140,
        render: (val: string) => (
          <Tooltip title={dayjs(val).format('YYYY-MM-DD HH:mm:ss')}>
            <VFText variant="t6" color="tertiary" tabularNums className="font-medium">{dayjs(val).fromNow()}</VFText>
          </Tooltip>
        )
      },
      count: {
        title: t('admin.alerts.table.count'),
        dataIndex: 'occurrenceCount',
        key: 'count',
        width: 80,
        align: 'right' as const,
        render: (val: number) => <VFText variant="t5-strong" color="primary" tabularNums>{val}</VFText>
      },
      id: {
        title: 'Alert ID',
        dataIndex: 'id',
        key: 'id',
        width: 130,
        render: (val: string) => <VFText variant="t7" color="tertiary" className="font-mono opacity-60">{val}</VFText>
      }
    };
  }, [t, onViewSubject, handleCopy]);

  const activeColumns = useMemo(() => {
    const cols = visibleKeys
      .map(key => columnPool[key])
      .filter(Boolean);

    cols.push({
      title: '', 
      key: 'actions',
      width: 64, 
      fixed: 'right' as const,
      align: 'center' as const,
      render: (_: any, record: AdminAlert) => {
        const canAck = record.status === 'OPEN';
        const menuItems: any[] = [];

        if (canAck) {
          menuItems.push({ 
            key: 'ack', 
            label: t('admin.alerts.table.ackAction'), 
            icon: <CheckCircle size={14} className="text-brand" />, 
            onClick: () => onAck(record) 
          });
          menuItems.push({ type: 'divider' });
        }

        menuItems.push(
          { key: 'details', label: t('admin.alerts.actions.viewContext'), icon: <Eye size={14} />, onClick: () => onViewDetails(record) },
          { type: 'divider' },
          { key: 'suppress', label: t('admin.alerts.actions.suppress'), icon: <ShieldOff size={14} /> },
          { key: 'resolve', label: t('admin.alerts.actions.resolve'), icon: <Check size={14} />, danger: true }
        );

        return (
          <div className="flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight" arrow>
              <Button 
                type="text" 
                size="small" 
                icon={<MoreVertical size={18} />} 
                className="text-text-tertiary hover:text-brand hover:bg-brand/5 rounded-full w-9 h-9 flex items-center justify-center transition-all" 
              />
            </Dropdown>
          </div>
        );
      }
    });

    return cols;
  }, [visibleKeys, columnPool, t, onAck, onViewDetails]);

  return (
    <VFTable<AdminAlert>
      loading={loading}
      dataSource={data}
      columns={activeColumns as any}
      rowKey="id"
      scroll={{ x: 1400 }}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
      }}
      onRow={(r) => ({
        onClick: () => onViewDetails(r),
        className: 'cursor-pointer group'
      })}
    />
  );
};
