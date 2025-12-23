
import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Button, Skeleton, App, Typography, Divider, Alert } from 'antd';
import { ShieldCheck, Lock, ExternalLink, RefreshCw, ChevronRight, AlertCircle, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { VFCard } from '../../../shared/ui/VFCard';
import { marketplaceService } from '../../../services/marketplaceService';
import { Listing, Plan, Order } from '../types';

const { Text } = Typography;

export const MarketplaceCheckout: React.FC<{ listingId: string; initialPlanCode?: string; onNavigate: (p: string) => void }> = ({ listingId, initialPlanCode, onNavigate }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const [listing, setListing] = useState<Listing | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlanCode, setSelectedPlanCode] = useState<string | null>(initialPlanCode || null);
  
  // 状态机变量
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lDetail, lPlans] = await Promise.all([
          marketplaceService.getListingDetail(listingId),
          marketplaceService.getPlans(listingId)
        ]);
        if (lDetail) setListing(lDetail);
        setPlans(lPlans);
        // 如果未指定 initialPlanCode，默认选第一个
        if (!selectedPlanCode && lPlans.length > 0) {
          setSelectedPlanCode(lPlans[0].planCode);
        }
      } catch (e) {
        setErrorMsg("Failed to load resource information");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [listingId]);

  const selectedPlan = useMemo(() => 
    plans.find(p => p.planCode === selectedPlanCode) || null
  , [plans, selectedPlanCode]);

  // 处理主动作
  const handlePrimaryAction = async () => {
    // 1. PENDING_PAYMENT 状态下，跳转支付
    if (order?.status === 'PENDING_PAYMENT' && order.paymentUrl) {
      window.open(order.paymentUrl, '_blank');
      return;
    }

    // 2. 初始态或错误重试态，创建订单
    if (!selectedPlanCode) return;
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const newOrder = await marketplaceService.createOrder({
        listingId,
        planCode: selectedPlanCode,
        idempotencyKey: `idemp-${Date.now()}`
      });
      setOrder(newOrder);
      if (newOrder.status === 'SUCCESS') {
        onNavigate(`marketplace-order-result-${newOrder.id}`);
      }
    } catch (e) {
      setErrorMsg("Unable to process order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // 状态检查动作
  const handleCheckStatus = async () => {
    if (!order) return;
    setCheckingStatus(true);
    try {
      const updatedOrder = await marketplaceService.getOrderStatus(order.id);
      setOrder(updatedOrder);
      if (updatedOrder.status === 'SUCCESS') {
        onNavigate(`marketplace-order-result-${updatedOrder.id}`);
      } else {
        message.info("Payment still pending verification.");
      }
    } catch (e) {
      message.error("Could not verify status");
    } finally {
      setCheckingStatus(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6 p-4 max-w-[1200px] mx-auto">
        <Skeleton active title={{ width: '20%' }} />
        <Row gutter={24}>
          <Col lg={16} xs={24}><Skeleton active paragraph={{ rows: 10 }} /></Col>
          <Col lg={8} xs={24}><Skeleton.Button active block className="!h-64" /></Col>
        </Row>
      </div>
    );
  }

  if (!listing) return null;

  const isLocked = submitting || order?.status === 'PENDING_PAYMENT';

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-20 max-w-[1200px] mx-auto">
      <VFPageHeader 
        title="Checkout"
        onBack={() => onNavigate(`marketplace-listing-${listingId}`)}
      />

      <Row gutter={[24, 24]}>
        {/* Left Column: Resource & Plans */}
        <Col xs={24} lg={16}>
          <div className="flex flex-col gap-8">
            {/* 1. Resource Identity */}
            <div className="flex items-center gap-4 bg-bg-card p-5 rounded-card border border-border">
              <div className="w-14 h-14 rounded-lg bg-bg-page flex items-center justify-center text-text-tertiary border border-divider">
                <ShieldCheck size={28} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col min-w-0">
                <h3 className="m-0 text-base font-bold text-text-primary truncate leading-tight">{listing.name}</h3>
                <span className="text-xs font-bold text-text-tertiary uppercase tracking-tight opacity-60">Developer: {listing.author.name}</span>
              </div>
            </div>

            {/* 2. Plan Selector */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-[0.15em]">
                  Select Plan
                </span>
                {isLocked && <span className="text-[10px] font-bold text-text-tertiary italic opacity-60">Selection locked</span>}
              </div>

              <div className="flex flex-col gap-3">
                {plans.map((plan) => {
                  const isSelected = selectedPlanCode === plan.planCode;
                  return (
                    <div 
                      key={plan.planCode}
                      onClick={() => !isLocked && setSelectedPlanCode(plan.planCode)}
                      className={`
                        p-5 rounded-card border transition-all flex items-center justify-between gap-4
                        ${isLocked ? 'cursor-not-allowed grayscale-[0.5] opacity-80' : 'cursor-pointer'}
                        ${isSelected 
                          ? 'border-brand bg-brand/[0.02] ring-1 ring-brand/10' 
                          : 'border-border bg-bg-card hover:border-border-strong'}
                      `}
                    >
                      <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <span className={`text-[14px] font-bold ${isSelected ? 'text-brand' : 'text-text-primary'}`}>
                          {plan.name}
                        </span>
                        {plan.features && plan.features.length > 0 && (
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                            {plan.features.slice(0, 3).map((f, i) => (
                              <span key={i} className="text-[11px] text-text-secondary font-medium flex items-center gap-1.5 whitespace-nowrap">
                                <Check size={10} className="text-success" strokeWidth={3} /> {f}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-6 shrink-0">
                        <div className="flex flex-col items-end">
                          <span className="text-base font-bold text-text-primary tabular-nums">
                            {plan.price === 0 ? 'Free' : `$${plan.price.toFixed(2)}`}
                          </span>
                          <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-tight">{plan.interval}</span>
                        </div>
                        <div className={`
                          w-5 h-5 rounded-full border flex items-center justify-center transition-all
                          ${isSelected ? 'bg-brand border-brand' : 'border-divider'}
                        `}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white shadow-sm" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Error Feedback */}
            {errorMsg && (
              <div className="bg-error/5 border border-error/20 rounded-card p-4 flex gap-3 animate-in slide-in-from-top-2">
                 <AlertCircle size={18} className="text-error shrink-0 mt-0.5" />
                 <div className="flex flex-col">
                    <span className="text-sm font-bold text-error">Transaction Error</span>
                    <span className="text-xs text-text-secondary font-medium">{errorMsg}</span>
                 </div>
              </div>
            )}
          </div>
        </Col>

        {/* Right Column: Order Summary */}
        <Col xs={24} lg={8}>
          <div className="sticky top-6 flex flex-col gap-4">
            <VFCard title="Order Summary" className="border-border shadow-none">
              <div className="flex flex-col gap-5">
                {/* 1. Details Breakdown */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">Plan</span>
                    <span className="text-sm font-bold text-text-primary">{selectedPlan?.name || '---'}</span>
                  </div>
                  
                  {order?.summaryLines ? (
                    <div className="flex flex-col gap-3">
                      {order.summaryLines.map((line, idx) => (
                        <div key={idx} className={`flex items-center justify-between ${line.isTotal ? 'pt-4 border-t border-divider mt-2' : ''}`}>
                          <span className={`text-xs ${line.isTotal ? 'font-bold text-text-primary' : 'text-text-secondary font-medium'}`}>
                            {line.label}
                          </span>
                          <span className={`text-sm tabular-nums ${line.isTotal ? 'text-lg font-bold text-brand' : 'text-text-primary font-bold'}`}>
                            {line.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between pt-4 border-t border-divider mt-2">
                      <span className="text-xs font-bold text-text-primary">Total</span>
                      <span className="text-lg font-bold text-brand tabular-nums">
                        {selectedPlan ? `$${selectedPlan.price.toFixed(2)}` : '---'}
                      </span>
                    </div>
                  )}
                </div>

                {/* 2. Context Info for Pending State */}
                {order?.status === 'PENDING_PAYMENT' && (
                  <div className="p-3 bg-bg-page/80 rounded-control border border-divider">
                     <div className="flex justify-between text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-1">
                        <span>Order ID</span>
                        <span className="text-text-secondary font-mono lowercase">{order.id}</span>
                     </div>
                     <p className="m-0 text-[11px] text-text-secondary font-medium leading-relaxed italic">
                        Please finish payment in the external window to activate resource.
                     </p>
                  </div>
                )}

                {/* 3. Primary Actions */}
                <div className="flex flex-col gap-2.5 mt-2">
                  <Button 
                    type="primary" 
                    block 
                    size="large" 
                    loading={submitting}
                    disabled={checkingStatus}
                    className="h-12 font-bold rounded-control shadow-md"
                    onClick={handlePrimaryAction}
                  >
                    {order?.status === 'PENDING_PAYMENT' ? 'Pay with Provider' : (errorMsg ? 'Retry Payment' : 'Confirm & Pay')}
                  </Button>

                  {order?.status === 'PENDING_PAYMENT' ? (
                    <Button 
                      block 
                      type="text"
                      loading={checkingStatus}
                      icon={!checkingStatus && <RefreshCw size={14} />}
                      className="h-10 font-bold text-text-secondary hover:text-brand"
                      onClick={handleCheckStatus}
                    >
                      Check payment status
                    </Button>
                  ) : (
                    <Button 
                      block 
                      disabled={submitting}
                      className="h-10 font-bold border-none text-text-tertiary hover:text-text-primary"
                      onClick={() => onNavigate(`marketplace-listing-${listingId}`)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </VFCard>

            {/* Security Footer */}
            <div className="flex items-start gap-3 px-2 opacity-60">
              <Lock size={14} className="text-text-tertiary shrink-0 mt-0.5" />
              <p className="text-[10px] text-text-tertiary leading-relaxed m-0 font-medium">
                Encrypted transaction. VisionFlow processes payments through certified providers.
              </p>
            </div>
          </div>
        </Col>
      </Row>
      
      {/* Dev Mock Helper - Visible only for testing */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 flex gap-2">
           <Button size="small" onClick={() => setErrorMsg("Bank rejected the transaction")}>Mock Fail</Button>
           <Button size="small" onClick={() => setOrder(prev => prev ? {...prev, status: 'PENDING_PAYMENT', paymentUrl: '#'} : null)}>Mock Pending</Button>
        </div>
      )}
    </div>
  );
};
