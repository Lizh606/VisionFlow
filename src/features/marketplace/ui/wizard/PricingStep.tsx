
import React from 'react';
import { Form } from 'antd';
import { Shield, ShieldCheck, Info, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFTag } from '../../../../shared/ui/VFTag';

interface PlanOption {
  code: string;
  name: string;
  description: string;
  price: string;
  interval?: string;
}

const MOCK_PLANS: PlanOption[] = [
  {
    code: 'community_free',
    name: 'Community Free',
    description: 'Standard open-source usage for non-commercial projects and personal learning.',
    price: '$0.00'
  },
  {
    code: 'professional_license',
    name: 'Professional License',
    description: 'Up to 3 concurrent streams, commercial usage authorized for small teams.',
    price: '$49.00'
  },
  {
    code: 'enterprise_monthly',
    name: 'Enterprise Monthly',
    description: 'Unlimited scalability, dedicated support, and custom edge deployment options.',
    price: '$199.00',
    interval: '/mo'
  }
];

export const PricingStep: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* 1. 页面标题区 - V1.4 Section Title + 装饰条 */}
      <div className="flex flex-col gap-1 border-l-[3px] border-brand pl-5 mb-10">
        <h3 className="text-[20px] font-bold text-text-primary m-0 tracking-tight leading-tight">
          Licensing & Revenue
        </h3>
        <p className="text-[14px] text-text-secondary m-0 mt-1 font-medium opacity-80 max-w-[600px]">
          Select the pricing model that best fits your resource capabilities. Consumers will be billed automatically by VisionFlow.
        </p>
      </div>

      {/* 2. Plan 选择列表 (核心交互) */}
      <Form.Item 
        name="planCode" 
        initialValue="community_free" 
        className="mb-0"
        rules={[{ required: true, message: 'Please select a plan' }]}
      >
        {({ value, onChange }) => (
          <div className="flex flex-col gap-4 w-full">
            {MOCK_PLANS.map((plan) => {
              const isSelected = value === plan.code;
              return (
                <div
                  key={plan.code}
                  onClick={() => onChange(plan.code)}
                  role="radio"
                  aria-checked={isSelected}
                  className={`
                    group relative flex items-center justify-between p-5 md:p-6 rounded-card border transition-all duration-300 cursor-pointer
                    ${isSelected 
                      ? 'border-brand bg-brand/[0.02] ring-1 ring-brand/10 shadow-sm' 
                      : 'border-divider bg-bg-card hover:border-brand/40 hover:bg-bg-page/40'}
                  `}
                >
                  <div className="flex items-center gap-5 flex-1 min-w-0">
                    {/* 左侧图标容器 */}
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300
                      ${isSelected 
                        ? 'bg-brand text-white border-transparent' 
                        : 'bg-bg-page text-text-tertiary border-divider'}
                    `}>
                      {isSelected ? (
                        <ShieldCheck size={24} strokeWidth={2.5} className="animate-in zoom-in-75 duration-300" />
                      ) : (
                        <Shield size={24} strokeWidth={1.5} />
                      )}
                    </div>

                    {/* 中间计划详情 (含 Ellipsis 保护) */}
                    <div className="flex flex-col gap-0.5 min-w-0 pr-4">
                      <h4 className={`text-[16px] font-bold m-0 transition-colors ${isSelected ? 'text-brand' : 'text-text-primary'}`}>
                        {plan.name}
                      </h4>
                      <p className="text-[13px] text-text-secondary font-medium m-0 opacity-70 truncate">
                        {plan.description}
                      </p>
                    </div>
                  </div>

                  {/* 右侧价格与选中标记 */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0 ml-4">
                    <div className="flex items-baseline gap-0.5">
                      <span className={`text-[20px] font-bold tabular-nums tracking-tight transition-colors ${isSelected ? 'text-brand' : 'text-text-primary'}`}>
                        {plan.price}
                      </span>
                      {plan.interval && (
                        <span className="text-[14px] font-bold text-text-tertiary opacity-60">{plan.interval}</span>
                      )}
                    </div>
                    
                    {/* 选中态胶囊 (还原图1 SELECTED 样式) */}
                    <div className="h-5 flex items-center justify-end">
                      {isSelected ? (
                        <VFTag 
                          variant="brand" 
                          filled 
                          className="h-5 px-2 text-[9px] font-black tracking-[0.1em] animate-in zoom-in-95 duration-200"
                        >
                          SELECTED
                        </VFTag>
                      ) : (
                        <CheckCircle2 size={16} className="text-divider transition-colors group-hover:text-text-tertiary opacity-20" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Form.Item>

      {/* 3. 底部 Callout (还原图1的次要提示区) */}
      <div className="mt-12 p-6 rounded-card bg-bg-page/10 border border-divider border-dashed flex items-start gap-5 transition-all hover:bg-bg-page/30">
         <div className="w-10 h-10 rounded-full bg-bg-card border border-divider flex items-center justify-center text-text-tertiary shrink-0 shadow-sm">
            <Info size={20} strokeWidth={1.5} />
         </div>
         <div className="flex flex-col gap-2 min-w-0">
           <p className="text-[13px] text-text-primary m-0 font-bold leading-relaxed">
             Need a custom license model or bespoke pricing for enterprise clients? 
             <a href="#" className="text-brand hover:underline font-bold ml-2 inline-flex items-center gap-0.5 group/link">
               Open a Support Ticket
               <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
             </a>
           </p>
           <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
             <span className="text-[11px] text-text-tertiary italic font-medium opacity-70">
               Marketplace fees (15%) are deducted automatically from all paid transactions.
             </span>
             <span className="text-[9px] text-brand/50 font-black uppercase tracking-[0.2em] ml-auto">• Seller Terms Apply</span>
           </div>
         </div>
      </div>
    </div>
  );
};
