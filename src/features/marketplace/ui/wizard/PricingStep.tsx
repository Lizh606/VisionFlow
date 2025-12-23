
import React, { useMemo } from 'react';
import { Form } from 'antd';
import { Shield, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFTag } from '../../../../shared/ui/VFTag';
import { VFText } from '../../../../ui/VFText';

interface PlanOption {
  code: string;
  name: string;
  description: string;
  price: string;
  interval?: string;
}

// 自定义计划选择器组件，严格映射 Typography T4-T6
interface PlanSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
  plans: PlanOption[];
}

const PlanSelector: React.FC<PlanSelectorProps> = ({ value, onChange, plans }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {plans.map((plan) => {
        const isSelected = value === plan.code;
        return (
          <div
            key={plan.code}
            onClick={() => onChange?.(plan.code)}
            className={`
              group relative flex items-center justify-between p-5 md:p-6 rounded-card border transition-all duration-300 cursor-pointer
              ${isSelected 
                ? 'border-brand bg-brand/[0.02] ring-1 ring-brand/10 shadow-sm' 
                : 'border-divider bg-bg-card hover:border-brand/40 hover:bg-bg-page/40'}
            `}
          >
            <div className="flex items-center gap-5 flex-1 min-w-0">
              {/* 左侧图标容器 - 统一尺寸 */}
              <div className={`
                w-11 h-11 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300
                ${isSelected 
                  ? 'bg-brand text-white border-transparent shadow-sm' 
                  : 'bg-bg-page text-text-tertiary border-divider'}
              `}>
                {isSelected ? (
                  <ShieldCheck size={22} strokeWidth={2.5} className="animate-in zoom-in-75 duration-300" />
                ) : (
                  <Shield size={22} strokeWidth={1.5} />
                )}
              </div>

              {/* 中间计划详情 - T4 Title + T5 Body */}
              <div className="flex flex-col gap-0.5 min-w-0 pr-4">
                <VFText variant="t4" color={isSelected ? 'brand' : 'primary'} className="m-0 transition-colors leading-tight">
                  {plan.name}
                </VFText>
                <VFText variant="t5" color="secondary" className="m-0 opacity-70 truncate leading-relaxed">
                  {plan.description}
                </VFText>
              </div>
            </div>

            {/* 右侧价格 - T3 Section Title 级别对齐 */}
            <div className="flex flex-col items-end gap-1.5 shrink-0 ml-4">
              <div className="flex items-baseline gap-1">
                <VFText variant="t3" color={isSelected ? 'brand' : 'primary'} tabularNums className="tracking-tight transition-colors">
                  {plan.price}
                </VFText>
                {plan.interval && (
                  <VFText variant="t5" color="tertiary" className="font-medium opacity-60">{plan.interval}</VFText>
                )}
              </div>
              
              {/* 选中态胶囊 - T6 Caption 级别对齐 */}
              <div className="h-5 flex items-center justify-end">
                {isSelected ? (
                  <VFTag 
                    variant="brand" 
                    filled 
                    className="h-5 px-2 text-[10px] font-bold tracking-tight animate-in zoom-in-95 duration-200"
                  >
                    SELECTED
                  </VFTag>
                ) : (
                  <CheckCircle2 size={16} className="text-divider transition-colors group-hover:text-text-tertiary opacity-30" />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const PricingStep: React.FC = () => {
  const { t } = useTranslation();

  const plans: PlanOption[] = useMemo(() => [
    {
      code: 'community_free',
      name: t('marketplace.seller.wizard.pricing.plans.free.name'),
      description: t('marketplace.seller.wizard.pricing.plans.free.desc'),
      price: '$0.00'
    },
    {
      code: 'professional_license',
      name: t('marketplace.seller.wizard.pricing.plans.pro.name'),
      description: t('marketplace.seller.wizard.pricing.plans.pro.desc'),
      price: '$49.00'
    },
    {
      code: 'enterprise_monthly',
      name: t('marketplace.seller.wizard.pricing.plans.ent.name'),
      description: t('marketplace.seller.wizard.pricing.plans.ent.desc'),
      price: '$199.00',
      interval: '/mo'
    }
  ], [t]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* 1. 页面标题区 - V1.4 T3 Section Title (20px) + 装饰条 */}
      <div className="flex flex-col gap-1 border-l-[3px] border-brand pl-5 mb-10">
        <VFText variant="t3" as="h3" color="primary" className="m-0 tracking-tight leading-tight">
          {t('marketplace.seller.wizard.pricing.title')}
        </VFText>
        <VFText variant="t5" color="secondary" className="m-0 mt-1 font-normal opacity-80 max-w-[600px] leading-relaxed">
          {t('marketplace.seller.wizard.pricing.subtitle')}
        </VFText>
      </div>

      {/* 2. Plan 选择列表 */}
      <Form.Item 
        name="planCode" 
        initialValue="community_free" 
        className="mb-0"
        rules={[{ required: true, message: 'Please select a plan' }]}
      >
        <PlanSelector plans={plans} />
      </Form.Item>
    </div>
  );
};
