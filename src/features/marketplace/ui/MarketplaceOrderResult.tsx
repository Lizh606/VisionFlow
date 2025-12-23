
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
  
  const pollTimerRef = useRef<number | null>(null);

  const fetchStatus = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    
    try {
      const data = await marketplaceService.getOrderStatus(orderId);
      
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
      
      const isTerminal = (data.status === 'SUCCESS' && data.entitlementStatus === 'READY') || 
                         (data.status === 'FAILED') || 
                         (data.status === 'CANCELLED') ||
                         (data.status === 'PENDING_PAYMENT');

      if (isTerminal && pollTimerRef.current) {
        window.clearInterval(pollTimerRef.current);
        pollTimerRef.current = null;
      } else if (!isTerminal && !pollTimerRef.current) {
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

  const isPaid = order.status === 'SUCCESS';
  const isEntitled = order.entitlementStatus === 'READY';
  const isEntitlementPending = isPaid && order.entitlementStatus === 'PENDING';
  const isPendingPayment = order.status === 'PENDING_PAYMENT';
  const isFailed = order.status === 'FAILED' || order.status === 'TIMEOUT' || order.status === 'CANCELLED';

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 max-w-[680px] mx-auto pt-12 pb-24 px-4">
      <div className="flex flex-col items-center text-center gap-2 mb-2">
         {isPaid && isEntitled && (
           <>
             <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center text-success mb-2 scale-in duration-500">
               <CheckCircle2 size={36} strokeWidth={2.5} />
             </div>
             <h1 className="text-2xl font-bold text-text-primary m-0 tracking-tight">Purchase Successful</h1>
           </>
         )}
         {isEntitlementPending && (
           <>
             <div className="w-16 h-16 rounded-full bg-brand/5 flex items-center justify-center text-brand mb-2 relative">
               <Clock size={36} strokeWidth={2} />
               <div className="absolute inset-0 rounded-full border-2 border-brand/20 border-t-brand animate-spin" />
             </div>
             <h1 className="text-2xl font-bold text-text-primary m-0 tracking-tight">Provisioning Resource</h1>
           </>
         )}
         {isFailed && (
           <>
             <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center text-error mb-2">
               <XCircle size={36} strokeWidth={2.5} />
             </div>
             <h1 className="text-2xl font-bold text-text-primary m-0 tracking-tight">Transaction Failed</h1>
           </>
         )}
      </div>

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
                  {/* FIX: Ensure amount is numeric before toFixed */}
                  <span className="text-base font-bold text-text-primary tabular-nums">${Number(order.amount || 0).toFixed(2)}</span>
                  <span className="text-[10px] font-bold text-text-tertiary uppercase">{order.currency}</span>
               </div>
            </div>
         </div>
      </VFCard>

      <div className="flex flex-col gap-4 mt-2">
         {isPaid && isEntitled && (
           <Button type="primary" block size="large" icon={<PackageCheck size={18} />} className="h-12 font-bold rounded-control shadow-md" onClick={() => onNavigate('marketplace-library')}>
             Go to My Library
           </Button>
         )}
         {isFailed && (
           <Button type="primary" block size="large" icon={<RefreshCw size={18} />} className="h-12 font-bold rounded-control bg-error border-error" onClick={() => onNavigate('marketplace-checkout')}>
             Retry Transaction
           </Button>
         )}
      </div>
    </div>
  );
};
