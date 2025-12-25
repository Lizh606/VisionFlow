import React, { useState, useEffect, useMemo } from 'react';
import { Button, Select, App, Tooltip, Dropdown, Space } from 'antd';
import { Search, FilterX, MoreVertical, Copy, AlertCircle, RotateCcw, UserCheck, ShieldAlert, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { VFTableToolbar } from '../../../ui/VFTableToolbar';
import { VFTable } from '../../../shared/ui/VFTable';
import { VFTag } from '../../../shared/ui/VFTag';
import { VFText } from '../../../ui/VFText';
import { OrderActionModal } from './components/OrderActionModal';
import { VFOperationResultModal } from './components/VFOperationResultModal';
import { useAdminOperationTracker } from '../hooks/useAdminOperationTracker';
import { mockAdminOrders } from '../model/mockMarketplace';
import { AdminOrder } from '../types/marketplace';
import { AdminOpResult } from '../types/alerts';
import dayjs from 'dayjs';

export const AdminMarketplaceOrdersPage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const tracker = useAdminOperationTracker();
  
  const [data, setData] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [actionModal, setActionModal] = useState<{ type: string; order: AdminOrder | null }>({ type: '', order: null });
  const [activeResultOp, setActiveResultOp] = useState<AdminOpResult | null>(null);

  const fetchOrders = async (silent = false) => {
    if (!silent) setLoading(true);
    setTimeout(() => {
      setData(mockAdminOrders);
      setLoading(false);
      if (silent) message.success(t('admin.alerts.detail.sotSuccess'));
    }, 600);
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleActionConfirm = (payload: any) => {
    const { type, order } = actionModal;
    if (!order) return;

    const opId = `OP-ORD-${type.toUpperCase()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
    const actionLabelMap: Record<string, string> = {
      retry: t('admin.marketplace.orders.actions.retry'),
      manual: t('admin.marketplace.orders.actions.manual'),
      chargeback: t('admin.marketplace.orders.actions.chargeback')
    };
    
    const newOp = {
      adminOpId: opId,
      actionType: actionLabelMap[type],
      operatorId: 'admin-01',
      subjectType: 'ORDER',
      subjectId: order.id,
      ...payload
    };
    
    tracker.addOperation(newOp);
    setActionModal({ type: '', order: null });
    setActiveResultOp({ ...newOp, status: 'PENDING' as const, startedAt: new Date().toISOString() } as AdminOpResult);
  };

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchSearch = !search || 
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
        item.workspaceId.toLowerCase().includes(search.toLowerCase()) ||
        item.workspaceName.toLowerCase().includes(search.toLowerCase());
      return matchSearch;
    });
  }, [data, search]);

  const columns = [
    {
      title: t('admin.marketplace.orders.table.orderId'),
      dataIndex: 'id',
      width: 170,
      fixed: 'left' as const,
      render: (id: string) => (
        <div className="flex items-center gap-2 group/id">
          <VFText variant="t7" color="primary" className="font-bold tabular-nums">{id}</VFText>
          <Button 
            type="text" size="small" icon={<Copy size={12}/>} 
            className="opacity-0 group-hover/id:opacity-100 h-6 w-6 p-0 flex items-center justify-center text-text-tertiary hover:text-brand"
            onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(id); message.success(t('common.copy')); }}
          />
        </div>
      )
    },
    {
      title: t('admin.marketplace.orders.table.customer'),
      key: 'customer',
      width: 240,
      render: (_: any, r: AdminOrder) => (
        <div className="flex flex-col min-w-0">
          <VFText variant="t5" color="primary" truncate className="block">{r.customerEmail}</VFText>
          <VFText variant="t6" color="tertiary" truncate className="opacity-60">{r.workspaceName}</VFText>
        </div>
      )
    },
    {
      title: t('admin.marketplace.orders.table.payment'),
      dataIndex: 'paymentStatus',
      width: 120,
      render: (s: string) => (
        <VFTag variant={s === 'PAID' ? 'success' : s === 'FAILED' ? 'error' : 'warning'} filled={s === 'PAID'}>
          {s}
        </VFTag>
      )
    },
    {
      title: t('admin.marketplace.orders.table.refund'),
      dataIndex: 'refundStatus',
      width: 140,
      render: (s: string) => (
        <VFTag variant={s === 'SUCCESS' ? 'success' : s === 'FAILED' ? 'error' : s === 'NONE' ? 'neutral' : 'warning'} filled={s === 'FAILED'}>
          {s}
        </VFTag>
      )
    },
    {
      title: t('admin.marketplace.orders.detail.failureReason'),
      dataIndex: 'refundFailureReason',
      width: 220,
      render: (reason: string) => reason ? (
        <Tooltip title={reason}>
          <div className="flex items-center gap-2 text-error max-w-[200px]">
            <AlertCircle size={14} className="shrink-0" />
            <VFText variant="t6" color="inherit" truncate className="font-medium">{reason}</VFText>
          </div>
        </Tooltip>
      ) : <span className="opacity-20">—</span>
    },
    {
      title: t('admin.marketplace.orders.table.lastSynced'),
      dataIndex: 'lastSyncedAt',
      width: 160,
      render: (v: string) => (
        <Tooltip title={dayjs(v).format('YYYY-MM-DD HH:mm:ss')}>
          <div className="flex items-center gap-2 opacity-60 cursor-help group/sync">
             <Clock size={12} className="text-text-tertiary group-hover/sync:text-brand transition-colors" />
             <VFText variant="t6" color="secondary" tabularNums className="font-medium">{dayjs(v).fromNow()}</VFText>
          </div>
        </Tooltip>
      )
    },
    {
      title: t('admin.marketplace.orders.table.amount'),
      key: 'amount',
      width: 110,
      align: 'right' as const,
      render: (_: any, r: AdminOrder) => <VFText variant="t5-strong" tabularNums className="font-bold">{r.amount} {r.currency}</VFText>
    },
    {
      title: '',
      key: 'actions',
      width: 64,
      fixed: 'right' as const,
      align: 'center' as const,
      render: (_: any, r: AdminOrder) => {
        const items = [
          { 
            key: 'retry', 
            label: t('admin.marketplace.orders.actions.retry'), 
            icon: <RotateCcw size={14}/>, 
            disabled: r.refundStatus !== 'FAILED',
            onClick: () => setActionModal({ type: 'retry', order: r })
          },
          { 
            key: 'manual', 
            label: t('admin.marketplace.orders.actions.manual'), 
            icon: <UserCheck size={14}/>,
            onClick: () => setActionModal({ type: 'manual', order: r })
          },
          { type: 'divider' },
          { 
            key: 'chargeback', 
            label: t('admin.marketplace.orders.actions.chargeback'), 
            icon: <ShieldAlert size={14}/>, 
            danger: true,
            onClick: () => setActionModal({ type: 'chargeback', order: r })
          },
        ];

        return (
          <div className="flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
              <Button type="text" size="small" icon={<MoreVertical size={18} />} className="text-text-tertiary hover:text-brand" />
            </Dropdown>
          </div>
        );
      }
    }
  ];

  const liveResultOp = useMemo(() => {
    if (!activeResultOp) return null;
    return tracker.operations.find(o => o.adminOpId === activeResultOp.adminOpId) || activeResultOp;
  }, [activeResultOp, tracker.operations]);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 w-full pb-20">
      <VFPageHeader 
        title={t('admin.marketplace.orders.title')} 
        description={t('admin.marketplace.orders.description')} 
      />
      
      <VFTableToolbar 
        search={{ value: search, onChange: setSearch, placeholder: t('admin.marketplace.orders.searchPlaceholder') }}
        filters={
          <Select 
            value={statusFilter} 
            onChange={setStatusFilter} 
            className="w-48 h-10 font-bold"
            options={[
              { label: t('admin.alerts.filters.allStatus'), value: 'all' },
              { label: t('admin.health.filters.env'), value: 'FAILED' }, // 演示用途
            ]}
          />
        }
        actions={
          <Button icon={<FilterX size={16} />} onClick={() => setSearch('')} className="h-10 px-4 font-bold text-text-tertiary">{t('marketplace.filters.reset')}</Button>
        }
        onRefresh={() => fetchOrders(true)}
        refreshing={loading}
      />

      <VFTable 
        dataSource={filteredData} 
        columns={columns as any} 
        loading={loading} 
        rowKey="id" 
        scroll={{ x: 1300 }}
        onRow={(r) => ({
          onClick: () => onNavigate(`admin-orders/${r.id}`),
          className: 'cursor-pointer group'
        })}
      />

      <OrderActionModal 
        open={!!actionModal.type}
        type={actionModal.type}
        orderId={actionModal.order?.id || ''}
        onCancel={() => setActionModal({ type: '', order: null })}
        onConfirm={handleActionConfirm}
      />

      <VFOperationResultModal 
        open={!!activeResultOp} 
        result={liveResultOp} 
        onClose={() => setActiveResultOp(null)} 
        onNavigateToAudit={(id) => onNavigate(`admin-audit?adminOpId=${id}`)} 
      />
    </div>
  );
};