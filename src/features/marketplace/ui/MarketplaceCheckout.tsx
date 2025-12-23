
import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Button, Skeleton, App, Divider } from 'antd';
import { ShieldCheck, Lock, Check, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { VFCard } from '../../../shared/ui/VFCard';
import { marketplaceService } from '../../../services/marketplaceService';
import { Listing, Plan, Order } from '../types';
import { VFText } from '../../../ui/VFText';

export const MarketplaceCheckout: React.FC<{ listingId: string; initialPlanCode?: string; onNavigate: (p: string) => void }> = ({ listingId, initialPlanCode, onNavigate }) => {
  const { t } = useTranslation();
  const [listing, setListing] = useState<Listing | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlanCode, setSelectedPlanCode] = useState<string | null>(initialPlanCode || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    marketplaceService.getListingDetail(listingId).then(l => l && setListing(l));
    marketplaceService.getPlans(listingId).then(p => {
      setPlans(p);
      if (!selectedPlanCode && p.length > 0) setSelectedPlanCode(p[0].planCode);
      setLoading(false);
    });
  }, [listingId]);

  const selectedPlan = useMemo(() => plans.find(p => p.planCode === selectedPlanCode) || null, [plans, selectedPlanCode]);

  if (loading || !listing) return <div className="p-10"><Skeleton active /></div>;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 max-w-[1200px] mx-auto pb-20">
      <VFPageHeader title="Checkout" onBack={() => onNavigate(`marketplace-listing-${listingId}`)} />

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4 bg-bg-card p-5 rounded-card border border-border">
              <div className="w-12 h-12 rounded-lg bg-bg-page flex items-center justify-center text-brand border border-divider">
                <ShieldCheck size={24} />
              </div>
              <div className="flex flex-col min-w-0">
                {/* V1.4: Title = T4 */}
                <VFText variant="t4" color="primary" truncate className="leading-tight">{listing.name}</VFText>
                <VFText variant="t6" color="tertiary" className="font-bold uppercase tracking-wider opacity-60">Developer: {listing.author.name}</VFText>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest px-1">Select Plan</VFText>
              <div className="flex flex-col gap-3">
                {plans.map((plan) => {
                  const isSelected = selectedPlanCode === plan.planCode;
                  return (
                    <div 
                      key={plan.planCode} 
                      onClick={() => setSelectedPlanCode(plan.planCode)}
                      className={`p-5 rounded-card border transition-all flex items-center justify-between cursor-pointer ${isSelected ? 'border-brand bg-brand/[0.02] ring-1 ring-brand/10' : 'border-border bg-bg-card hover:border-border-strong'}`}
                    >
                      <div className="flex flex-col gap-1">
                        {/* V1.4: Item Title = T5 Strong */}
                        <VFText variant="t5-strong" color={isSelected ? 'brand' : 'primary'}>{plan.name}</VFText>
                        <div className="flex gap-4 mt-1">
                          {plan.features.slice(0, 2).map((f, i) => (
                            <span key={i} className="text-[11px] text-text-tertiary font-medium flex items-center gap-1"><Check size={10} className="text-success" /> {f}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <VFText variant="t4" color="primary" tabularNums className="font-bold">${plan.price.toFixed(2)}</VFText>
                        <VFText variant="t6" color="tertiary" className="uppercase font-bold">{plan.interval}</VFText>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Col>

        <Col xs={24} lg={8}>
          <VFCard title="Order Summary" className="border-border sticky top-6 shadow-none">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-baseline">
                   <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-wider">Plan</VFText>
                   <VFText variant="t5-strong" color="primary">{selectedPlan?.name || '---'}</VFText>
                </div>
                <Divider className="m-0 opacity-40" />
                <div className="flex justify-between items-center">
                   <VFText variant="t5-strong" color="primary" className="font-bold">Total Amount</VFText>
                   {/* V1.4: Highlight Value = T3 (20px) */}
                   <VFText variant="t3" color="brand" tabularNums className="font-bold">
                     ${selectedPlan ? selectedPlan.price.toFixed(2) : '0.00'}
                   </VFText>
                </div>
              </div>
              <Button type="primary" block size="large" className="h-12 font-bold rounded-control shadow-md">Confirm & Pay</Button>
              <div className="flex items-start gap-3 opacity-60 px-1">
                <Lock size={14} className="text-text-tertiary shrink-0 mt-0.5" />
                <VFText variant="t6" color="tertiary" className="leading-relaxed">Encrypted transaction. VisionFlow processes payments through certified providers.</VFText>
              </div>
            </div>
          </VFCard>
        </Col>
      </Row>
    </div>
  );
};
