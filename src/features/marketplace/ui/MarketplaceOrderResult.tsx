
import React, { useEffect, useState, useRef } from 'react';
import { Button, App, Skeleton, Divider, Typography } from 'antd';
import { 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  ArrowRight, 
  ExternalLink, 
  Clock, 
  ShieldCheck, 
  CreditCard,
  HelpCircle,
  PackageCheck,
  LayoutGrid,
  X
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFCard } from '../../../shared/ui/VFCard';
import { marketplaceService } from '../../../services/marketplaceService';
import { Order } from '../types';

const { Text } = Typography;

const DEV_MOCK_KEY = "vf_mkt_order_result_mock_status";

export const MarketplaceOrderResult: React.FC<{ orderId: string; onNavigate: (p: string) => void }> = ({ orderId, onNavigate }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Polling ref to track and clear interval
  const pollTimerRef = useRef<number | null>(null);

  const fetchStatus = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    
    try {
      // 1. 获取真实/Mock基础数据
      const data = await marketplaceService.getOrderStatus(orderId);
      
      // 2. 开发环境覆盖逻辑 (UC-MKT-001 DEV HELPER)
      if (process.env.NODE_ENV === 'development') {
        const overrideStatus = localStorage.getItem(DEV_MOCK_KEY);
        if (overrideStatus) {
          if (overrideStatus === 'PENDING_PAYMENT') {
            data.status = 'PENDING_PAYMENT';
            data.entitlementStatus = 'PENDING';
          } else if (overrideStatus === 'ENTITLEMENT_PENDING') {
            data.status = 'SUCCESS';
            data.entitlementStatus = 'PENDING';
          } else if (overrideStatus === 'SUCCESS') {
            data.status = 'SUCCESS';
            data.entitlementStatus = 'READY';
          } else if (overrideStatus === 'FAILED') {
            data.status = 'FAILED';
            data.errorMessage = 'Developer Mock: Payment was rejected by provider.';
          }
        }
      }

      setOrder(data);
      
      // Stop polling if we reach a terminal state (Success or Error or UI locked)
      const isTerminal = (data.status === 'SUCCESS' && data.entitlementStatus === 'READY') || 
                         (data.status === 'FAILED') || 
                         (data.status === 'CANCELLED') ||
                         (data.status === 'PENDING_PAYMENT');

      if (isTerminal && pollTimerRef.current) {
        window.clearInterval(pollTimerRef.current);
        pollTimerRef.current = null;
      } else if (!isTerminal && !pollTimerRef.current) {
        // Resume polling if status was manually reverted from terminal to pending
        startPolling();
      }
    } catch (e) {
      if (isManual) message.error("Failed to check status. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const startPolling = () => {
    if (pollTimerRef.current) window.clearInterval(pollTimerRef.current);
    pollTimerRef.current = window.setInterval(() => {
      fetchStatus();
    }, 4000);
  };

  useEffect(() => {
    fetchStatus();
    startPolling();

    return () => {
      if (pollTimerRef.current) window.clearInterval(pollTimerRef.current);
    };
  }, [orderId]);

  // Dev Mock Setters
  const setDevMock = (status: string | null) => {
    if (status) {
      localStorage.setItem(DEV_MOCK_KEY, status);
    } else {
      localStorage.removeItem(DEV_MOCK_KEY);
    }
    fetchStatus(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 gap-4 animate-in fade-in">
        <div className="w-16 h-16 rounded-full bg-bg-page flex items-center justify-center animate-pulse">
           <RefreshCw size={24} className="text-text-tertiary animate-spin" />
        </div>
        <Skeleton active title={{ width: '40%' }} paragraph={{ rows: 2 }} />
      </div>
    );
  }

  if (!order) return null;

  // Determine State
  const isPaid = order.status === 'SUCCESS';
  const isEntitled = order.entitlementStatus === 'READY';
  const isEntitlementPending = isPaid && order.entitlementStatus === 'PENDING';
  const isPendingPayment = order.status === 'PENDING_PAYMENT';
  const isFailed = order.status === 'FAILED' || order.status === 'TIMEOUT' || order.status === 'CANCELLED';

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 max-w-[680px] mx-auto pt-12 pb-24 px-4">
      
      {/* 1. Header Area */}
      <div className="flex flex-col items-center text-center gap-2 mb-2">
         {isPaid && isEntitled && (
           <>
             <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center text-success mb-2 scale-in duration-500">
               <CheckCircle2 size={36} strokeWidth={2.5} />
             </div>
             <h1 className="text-2xl font-bold text-text-primary m-0 tracking-tight">Purchase Successful</h1>
             <p className="text-sm text-text-secondary font-medium">The resource has been activated and added to your library.</p>
           </>
         )}

         {isEntitlementPending && (
           <>
             <div className="w-16 h-16 rounded-full bg-brand/5 flex items-center justify-center text-brand mb-2 relative">
               <Clock size={36} strokeWidth={2} />
               <div className="absolute inset-0 rounded-full border-2 border-brand/20 border-t-brand animate-spin" />
             </div>
             <h1 className="text-2xl font-bold text-text-primary m-0 tracking-tight">Provisioning Resource</h1>
             <p className="text-sm text-text-secondary font-medium">We've confirmed your payment. Preparing the digital assets now...</p>
           </>
         )}

         {isPendingPayment && (
           <>
             <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center text-warning mb-2">
               <CreditCard size={36} strokeWidth={2} />
             </div>
             <h1 className="text-2xl font-bold text-text-primary m-0 tracking-tight">Waiting for Payment</h1>
             <p className="text-sm text-text-secondary font-medium">Please complete the transaction in the secure payment window.</p>
           </>
         )}

         {isFailed && (
           <>
             <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center text-error mb-2">
               <XCircle size={36} strokeWidth={2.5} />
             </div>
             <h1 className="text-2xl font-bold text-text-primary m-0 tracking-tight">Transaction Failed</h1>
             <p className="text-sm text-text-secondary font-medium">{order.errorMessage || "We couldn't process your order at this time."}</p>
           </>
         )}
      </div>

      {/* 2. Order Summary Card */}
      <VFCard title="Order Details" className="border-border shadow-none">
         <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-control bg-bg-page border border-divider flex items-center justify-center text-text-tertiary">
                     <ShieldCheck size={20} />
                  </div>
                  <div className="flex flex-col min-w-0">
                     <span className="text-sm font-bold text-text-primary truncate">{order.listingName}</span>
                     <span className="text-xs font-bold text-text-tertiary uppercase tracking-wider">{order.planName || "License Plan"}</span>
                  </div>
               </div>
               <div className="flex flex-col items-end">
                  <span className="text-base font-bold text-text-primary tabular-nums">${order.amount.toFixed(2)}</span>
                  <span className="text-[10px] font-bold text-text-tertiary uppercase">{order.currency}</span>
               </div>
            </div>

            <Divider className="m-0 opacity-40" />

            <div className="grid grid-cols-2 gap-y-4">
               <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">Order ID</span>
                  <span className="text-xs font-mono font-bold text-text-secondary lowercase">{order.id}</span>
               </div>
               <div className="flex flex-col gap-1 items-end">
                  <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">Date</span>
                  <span className="text-xs font-bold text-text-secondary">{new Date(order.createdAt).toLocaleDateString()}</span>
               </div>
               <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">Status</span>
                  <div className="flex items-center gap-1.5">
                     <div className={`w-1.5 h-1.5 rounded-full ${isPaid ? 'bg-success' : isFailed ? 'bg-error' : 'bg-warning'}`} />
                     <span className="text-xs font-bold text-text-primary uppercase tracking-tight">{order.status}</span>
                  </div>
               </div>
               <div className="flex flex-col gap-1 items-end">
                  <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">Entitlement</span>
                  <span className={`text-xs font-bold uppercase tracking-tight ${isEntitled ? 'text-success' : 'text-text-tertiary'}`}>
                    {order.entitlementStatus || 'PENDING'}
                  </span>
               </div>
            </div>
         </div>
      </VFCard>

      {/* 3. Action Area */}
      <div className="flex flex-col gap-4 mt-2">
         
         {/* Success Flow */}
         {isPaid && isEntitled && (
           <div className="flex flex-col gap-3">
             <Button 
               type="primary" 
               block 
               size="large" 
               icon={<PackageCheck size={18} />}
               className="h-12 font-bold rounded-control shadow-md"
               onClick={() => onNavigate('marketplace-library')}
             >
               Go to My Library
             </Button>
             <div className="flex justify-center gap-6">
                <Button type="link" className="text-text-secondary hover:text-brand font-bold flex items-center gap-1.5 text-xs" onClick={() => window.location.hash = '#/workflows'}>
                   <LayoutGrid size={14} /> Open Studio
                </Button>
                <Button type="link" className="text-text-secondary hover:text-brand font-bold flex items-center gap-1.5 text-xs" onClick={() => onNavigate('marketplace')}>
                   <ArrowRight size={14} /> Browse More
                </Button>
             </div>
           </div>
         )}

         {/* Entitlement Pending Flow */}
         {isEntitlementPending && (
           <div className="flex flex-col gap-3">
              <Button 
                block 
                size="large" 
                loading={refreshing}
                icon={!refreshing && <RefreshCw size={18} />}
                className="h-12 font-bold rounded-control border-divider text-text-primary hover:border-brand hover:text-brand"
                onClick={() => fetchStatus(true)}
              >
                Refresh Status
              </Button>
              <p className="text-[11px] text-text-tertiary text-center m-0 leading-relaxed italic">
                Assets are being synced to your secure vault. Usually takes less than a minute.
              </p>
           </div>
         )}

         {/* Pending Payment Flow */}
         {isPendingPayment && (
           <div className="flex flex-col gap-3">
              <Button 
                type="primary" 
                block 
                size="large" 
                icon={<ExternalLink size={18} />}
                className="h-12 font-bold rounded-control"
                onClick={() => order.paymentUrl && window.open(order.paymentUrl, '_blank')}
              >
                Continue Payment
              </Button>
              <Button 
                block 
                className="h-11 font-bold border-none text-text-tertiary hover:text-text-primary"
                onClick={() => onNavigate(`marketplace-listing-${order.listingId}`)}
              >
                Cancel and Return
              </Button>
           </div>
         )}

         {/* Failed Flow */}
         {isFailed && (
           <div className="flex flex-col gap-3">
              <Button 
                type="primary" 
                block 
                size="large" 
                icon={<RefreshCw size={18} />}
                className="h-12 font-bold rounded-control bg-error border-error hover:bg-error/90"
                onClick={() => onNavigate(`marketplace-checkout?listing_id=${order.listingId}&plan_code=${order.planCode}`)}
              >
                Retry Transaction
              </Button>
              <Button 
                block 
                className="h-11 font-bold border-none text-text-tertiary hover:text-text-primary"
                onClick={() => onNavigate(`marketplace-listing-${order.listingId}`)}
              >
                Back to Details
              </Button>
           </div>
         )}

         {/* Global Help Link */}
         <div className="mt-4 flex items-center justify-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
            <HelpCircle size={14} className="text-text-tertiary" />
            <span className="text-xs font-bold text-text-tertiary cursor-pointer hover:underline">
               Contact Support for assistance
            </span>
         </div>
      </div>

      {/* Dev Mock Helper - (import.meta.env.DEV behavior via process.env.NODE_ENV check) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 flex flex-col gap-2 p-3 bg-bg-card border border-border rounded-card shadow-overlay z-[1000] min-w-[200px]">
           <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-text-tertiary uppercase">Dev: Mock Status</span>
              <Button 
                type="text" 
                size="small" 
                className="h-5 px-1.5 text-[9px] font-bold text-brand hover:bg-brand/5"
                onClick={() => setDevMock(null)}
              >
                Reset
              </Button>
           </div>
           <div className="grid grid-cols-2 gap-2">
             <Button size="small" className="text-[10px] font-medium" onClick={() => setDevMock('PENDING_PAYMENT')}>Pay Pending</Button>
             <Button size="small" className="text-[10px] font-medium" onClick={() => setDevMock('ENTITLEMENT_PENDING')}>Ent. Pending</Button>
             <Button size="small" className="text-[10px] font-medium" onClick={() => setDevMock('SUCCESS')}>Success</Button>
             <Button size="small" className="text-[10px] font-medium" onClick={() => setDevMock('FAILED')}>Fail UI</Button>
           </div>
           <div className="mt-2 pt-2 border-t border-divider flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-[9px] text-text-tertiary font-bold italic">Polling Active</span>
           </div>
        </div>
      )}
    </div>
  );
};
