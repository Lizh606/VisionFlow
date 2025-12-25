import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Button, App, Skeleton, Divider, Tooltip } from 'antd';
import { RefreshCw, Copy, RotateCcw, UserCheck, ShieldAlert, History, Activity, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { VFCard } from '../../../shared/ui/VFCard';
import { VFText } from '../../../ui/VFText';
import { VFTag } from '../../../shared/ui/VFTag';
import { OrderActionModal } from './components/OrderActionModal';
import { VFOperationStatusCard } from './components/VFOperationStatusCard';
import { VFOperationDetailDrawer } from './components/VFOperationDetailDrawer';
import { useAdminOperationTracker } from '../hooks/useAdminOperationTracker';
import { AdminOrder } from '../types/marketplace';
import { AdminOpResult } from '../types/alerts';
import { mockAdminOrders } from '../model/mockMarketplace';
import dayjs from 'dayjs';

interface Props {
  orderId: string;
  onBack: () => void;
}

export const AdminOrderDetailPage: React.FC<Props> = ({ orderId, onBack }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const tracker = useAdminOperationTracker(orderId);
  
  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionModal, setActionModal] = useState<string | null>(null);
  const [selectedOp, setSelectedOp] = useState<AdminOpResult | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = mockAdminOrders.find(o => o.id === orderId) || mockAdminOrders[0];
      setOrder(found);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [orderId]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success(t('common.copy') + ' OK');
  };

  const handleActionConfirm = (type: string, payload: any) => {
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
      subjectId: orderId,
      ...payload
    };
    
    tracker.addOperation(newOp);
    setActionModal(null);
  };

  if (loading) return <div className="p-8"><Skeleton active paragraph={{ rows: 12 }} /></div>;
  if (!order) return null;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 w-full pb-20">
      <VFPageHeader 
        title={`Order #${order.id}`}
        description={
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-1.5 group cursor-pointer" onClick={() => handleCopy(order.id)}>
                <VFText variant="t5" color="secondary">{t('admin.marketplace.orders.table.orderId')}:</VFText>
                <VFText variant="t7" color="primary" className="font-bold tabular-nums">{order.id}</VFText>
                <Copy size={12} className="text-text-tertiary opacity-40 group-hover:opacity-100 transition-opacity" />
             </div>
             <span className="opacity-20">|</span>
             <VFText variant="t6" color="tertiary" className="font-bold uppercase tracking-tight">{order.listingName}</VFText>
          </div>
        }
        onBack={onBack}
        actions={
          <Button icon={<RefreshCw size={16} />} onClick={() => setLoading(true)} className="h-10 font-bold text-text-secondary">{t('admin.alerts.detail.runSotQuery')}</Button>
        }
      />

      <Row gutter={[24, 24]}>
        <Col xs={24} xl={16}>
          <div className="flex flex-col gap-6">
            <VFCard title={t('admin.marketplace.orders.detail.summary')}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  <div className="flex flex-col gap-1.5">
                    <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest">{t('admin.marketplace.orders.detail.paymentInfo')}</VFText>
                    <VFTag variant={order.paymentStatus === 'PAID' ? 'success' : 'warning'} filled={order.paymentStatus === 'PAID'} className="h-7 px-3 font-bold uppercase w-fit">{order.paymentStatus}</VFTag>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest">{t('admin.marketplace.orders.detail.refundInfo')}</VFText>
                    <div className="flex items-center gap-3">
                      <VFTag variant={order.refundStatus === 'SUCCESS' ? 'success' : order.refundStatus === 'FAILED' ? 'error' : 'neutral'} filled={order.refundStatus === 'FAILED'} className="h-7 px-3 font-bold uppercase w-fit">{order.refundStatus}</VFTag>
                      {order.refundStatus === 'FAILED' && (
                        <div className="flex items-center gap-1.5 text-error px-2 py-1 bg-error/5 border border-error/10 rounded-tag">
                           <ShieldAlert size={14} />
                           <VFText variant="t6" color="inherit" className="font-bold">Sync Failure</VFText>
                        </div>
                      )}
                    </div>
                  </div>

                  {order.refundFailureReason && (
                    <Col span={24}>
                      <div className="flex flex-col gap-1.5 p-4 bg-error/[0.02] border border-error/10 rounded-card mt-2">
                        <VFText variant="t6" color="error" className="uppercase font-bold tracking-widest">{t('admin.marketplace.orders.detail.failureReason')}</VFText>
                        <VFText variant="t5" color="secondary" className="font-medium leading-relaxed">{order.refundFailureReason}</VFText>
                      </div>
                    </Col>
                  )}

                  <div className="flex flex-col gap-1.5">
                    <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest">{t('admin.marketplace.orders.table.amount')}</VFText>
                    <VFText variant="t2" color="primary" tabularNums>{order.amount} {order.currency}</VFText>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest">{t('admin.marketplace.orders.detail.syncTime')}</VFText>
                    <VFText variant="t5" color="secondary" tabularNums>{dayjs(order.lastSyncedAt).format('YYYY-MM-DD HH:mm:ss')}</VFText>
                  </div>
               </div>
               
               <Divider className="my-8 opacity-40" />
               
               <div className="bg-bg-page/50 p-4 rounded-card border border-divider/40 flex items-start gap-4">
                  <Activity size={18} className="text-brand mt-0.5" />
                  <VFText variant="t6" color="tertiary" className="leading-relaxed font-medium">
                    {t('admin.marketplace.orders.detail.sotNote')}
                  </VFText>
               </div>
            </VFCard>

            <VFCard title={t('admin.marketplace.orders.detail.timeline')} className="flex-1">
               <div className="max-h-[500px] overflow-y-auto custom-scrollbar px-1">
                  <div className="flex flex-col gap-4">
                    {order.timeline.map((ev, i) => (
                      <div key={ev.id} className="relative flex items-start gap-5 group/ev pb-6">
                        <div className="shrink-0 w-8 h-8 rounded-full bg-bg-page border border-divider flex items-center justify-center text-text-tertiary group-hover/ev:bg-brand group-hover/ev:text-white group-hover/ev:border-transparent transition-all">
                          <History size={14} />
                        </div>
                        {i !== order.timeline.length - 1 && <div className="absolute left-4 top-8 bottom-0 w-px bg-divider opacity-60" />}
                        <div className="flex-1 flex flex-col gap-1">
                           <div className="flex justify-between items-baseline">
                              <VFText variant="t5-strong" color="primary" className="uppercase font-bold tracking-tight">{ev.type}</VFText>
                              <VFText variant="t7" color="disabled" tabularNums>{dayjs(ev.timestamp).format('HH:mm')}</VFText>
                           </div>
                           <VFText variant="t6" color="secondary" className="leading-relaxed">{ev.message}</VFText>
                           {ev.operatorId && (
                             <div className="flex items-center gap-2 mt-1">
                               <div className="h-4 px-1.5 rounded-sm bg-bg-page border border-divider text-[9px] font-bold text-text-tertiary">OPERATOR: {ev.operatorId}</div>
                             </div>
                           )}
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </VFCard>
          </div>
        </Col>

        <Col xs={24} xl={8}>
          <div className="flex flex-col gap-6 sticky top-6">
            <VFCard title={t('admin.marketplace.orders.detail.actions')} className="shadow-none border-border">
               <div className="flex flex-col gap-4">
                  <Button block type="primary" icon={<RotateCcw size={16} />} className="h-11 font-bold bg-brand border-brand" onClick={() => setActionModal('retry')}>{t('admin.marketplace.orders.actions.retry')}</Button>
                  <Button block icon={<UserCheck size={16} />} className="h-11 font-bold" onClick={() => setActionModal('manual')}>{t('admin.marketplace.orders.actions.manual')}</Button>
                  <Divider className="my-2 opacity-40" />
                  <Button block danger icon={<ShieldAlert size={16} />} className="h-11 font-bold" onClick={() => setActionModal('chargeback')}>{t('admin.marketplace.orders.actions.chargeback')}</Button>
               </div>
            </VFCard>

            <VFOperationStatusCard 
              inProgress={tracker.inProgressOps} 
              recent={tracker.recentOps} 
              onViewDetails={setSelectedOp} 
              onViewAudit={(id) => window.location.hash = `/admin-audit?adminOpId=${id}`} 
              onRetry={tracker.retryOperation} 
            />
            
            <Button 
              block 
              icon={<ExternalLink size={16} />}
              className="h-11 border-border text-text-secondary font-bold hover:!text-brand"
              onClick={() => window.location.hash = `/admin-audit?subjectId=${order.id}`}
            >
              {t('admin.alerts.modals.result.viewAudit')}
            </Button>
          </div>
        </Col>
      </Row>

      <OrderActionModal 
        type={actionModal || ''} 
        open={!!actionModal} 
        onCancel={() => setActionModal(null)} 
        onConfirm={(vals) => handleActionConfirm(actionModal!, vals)} 
      />

      <VFOperationDetailDrawer 
        open={!!selectedOp} result={selectedOp} onClose={() => setSelectedOp(null)} 
        onNavigateToAudit={(id) => window.location.hash = `/admin-audit?adminOpId=${id}`}
      />
    </div>
  );
};