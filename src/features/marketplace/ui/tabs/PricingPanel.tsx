
import React from 'react';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { Check, CheckCircle2, Circle } from 'lucide-react';
import { Listing, Plan } from '../../types';

interface Props {
  listing: Listing;
  selectedPlanId: string | null;
  onSelectPlan: (planId: string) => void;
}

export const PricingPanel: React.FC<Props> = ({ listing, selectedPlanId, onSelectPlan }) => {
  const { t } = useTranslation();
  const plans = listing.plans || [];

  if (listing.purchased) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
        <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center text-success mb-4">
          <CheckCircle2 size={24} />
        </div>
        <h3 className="text-base font-bold text-text-primary mb-1">License Already Active</h3>
        <p className="text-sm text-text-secondary max-w-[320px]">
           Manage this resource via the Studio or check detailed deployment quota in your library.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 flex flex-col gap-8">
      <div className="flex flex-col gap-1">
         <h3 className="text-[16px] font-semibold text-text-primary m-0 tracking-tight">Available Plans</h3>
         <p className="text-[13px] text-text-secondary font-medium">Select a licensing plan to synchronize with the purchase action.</p>
      </div>

      <Row gutter={[16, 16]}>
        {plans.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          return (
            <Col xs={24} md={12} key={plan.id}>
              <div 
                onClick={() => onSelectPlan(plan.id)}
                className={`
                  h-full flex flex-col p-6 rounded-card border transition-all cursor-pointer relative group
                  ${isSelected 
                    ? 'border-brand bg-brand/[0.02] ring-1 ring-brand/10' 
                    : 'border-divider bg-bg-card hover:border-border-strong'}
                `}
              >
                 <div className="flex justify-between items-start mb-6">
                   <div className="flex flex-col gap-0.5">
                     <span className={`text-[14px] font-bold ${isSelected ? 'text-brand' : 'text-text-primary'}`}>{plan.name}</span>
                     <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-tight">{plan.interval}</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="text-xl font-bold text-text-primary tabular-nums">
                       {plan.price === 0 ? t('common.free') : `$${plan.price}`}
                     </span>
                     {isSelected ? (
                       <CheckCircle2 size={18} className="text-brand" fill="currentColor" fillOpacity={0.1} />
                     ) : (
                       <Circle size={18} className="text-divider group-hover:text-text-tertiary" />
                     )}
                   </div>
                 </div>

                 <div className="flex-1 flex flex-col gap-3 mb-2">
                   {plan.features.map((f, i) => (
                     <div key={i} className="flex items-start gap-2.5 text-[12px] text-text-secondary font-medium">
                        <Check size={14} className="text-success shrink-0 mt-0.5" strokeWidth={3} />
                        <span className="leading-tight">{f}</span>
                     </div>
                   ))}
                 </div>
              </div>
            </Col>
          );
        })}
      </Row>

      <div className="flex justify-center p-2">
        <p className="text-[11px] text-text-tertiary italic font-medium">
          Note: Enterprise terms and bulk licenses require direct sales contact.
        </p>
      </div>
    </div>
  );
};
