
import React from 'react';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { Check, CheckCircle2, Circle } from 'lucide-react';
import { Listing, Plan } from '../../types';
import { VFText } from '../../../../ui/VFText';

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
        <VFText variant="t4" color="primary" className="mb-1 block">License Already Active</VFText>
        <VFText variant="t5" color="secondary" className="max-w-[320px] block">
           Manage this resource via the Studio or check detailed deployment quota in your library.
        </VFText>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 flex flex-col gap-8">
      <div className="flex flex-col gap-1">
         {/* V1.4: Section Title = T3 */}
         <VFText variant="t3" color="primary">Available Plans</VFText>
         <VFText variant="t5" color="secondary" className="font-medium">Select a licensing plan to synchronize with the purchase action.</VFText>
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
                     {/* V1.4: Plan Name = T4 */}
                     <VFText variant="t4" color={isSelected ? 'brand' : 'primary'}>{plan.name}</VFText>
                     {/* V1.4: Interval = T6 Strong */}
                     <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-tight">{plan.interval}</VFText>
                   </div>
                   <div className="flex items-center gap-2">
                     {/* V1.4: Price = T3 Section Title Size */}
                     <VFText variant="t3" color="primary" tabularNums>
                       {plan.price === 0 ? t('common.free') : `$${plan.price}`}
                     </VFText>
                     {isSelected ? (
                       <CheckCircle2 size={18} className="text-brand" fill="currentColor" fillOpacity={0.1} />
                     ) : (
                       <Circle size={18} className="text-divider group-hover:text-text-tertiary" />
                     )}
                   </div>
                 </div>

                 <div className="flex-1 flex flex-col gap-3 mb-2">
                   {plan.features.map((f, i) => (
                     <div key={i} className="flex items-start gap-2.5">
                        <Check size={14} className="text-success shrink-0 mt-0.5" strokeWidth={3} />
                        <VFText variant="t5" color="secondary" className="font-medium leading-tight">{f}</VFText>
                     </div>
                   ))}
                 </div>
              </div>
            </Col>
          );
        })}
      </Row>

      <div className="flex justify-center p-2">
        {/* V1.4: Note = T6 Caption */}
        <VFText variant="t6" color="tertiary" className="italic font-medium">
          Note: Enterprise terms and bulk licenses require direct sales contact.
        </VFText>
      </div>
    </div>
  );
};
