
import React from 'react';
import { Form, Checkbox, Divider } from 'antd';
import { Check } from 'lucide-react';

const Section = ({ title, subtitle, children }: any) => (
  <div className="flex flex-col gap-6 mb-12 animate-in fade-in slide-in-from-bottom-2 duration-300 last:mb-0">
    <div className="flex flex-col gap-1 border-l-[3px] border-brand pl-4">
      <h3 className="text-[18px] font-semibold text-text-primary m-0 tracking-tight leading-tight">{title}</h3>
      {subtitle && <p className="text-[12px] text-text-tertiary font-bold uppercase tracking-widest m-0 mt-1">{subtitle}</p>}
    </div>
    <div className="pt-2">{children}</div>
  </div>
);

export const SubmitStep: React.FC = () => {
  return (
    <div className="animate-in fade-in flex flex-col gap-10">
      <div className="flex flex-col items-center py-10 bg-bg-page/20 rounded-card border border-divider">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center text-success mb-6">
          <Check size={32} strokeWidth={3} />
        </div>
        <h3 className="text-xl font-bold text-text-primary m-0">Ready for Submission</h3>
        <p className="text-sm text-text-secondary mt-2 max-w-[400px] text-center leading-relaxed">
          Your resource listing is complete. Our team will review the technical compatibility and metadata within 48 hours.
        </p>
      </div>

      <Section title="Final Declarations" subtitle="Policy & Compliance">
        <div className="flex flex-col gap-4">
          <Form.Item name="agreeTerms" valuePropName="checked" rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Required')) }]}>
            <Checkbox className="text-sm font-medium text-text-secondary">
              I confirm that I own all intellectual property rights to the uploaded assets.
            </Checkbox>
          </Form.Item>
          <Form.Item name="agreeFee" valuePropName="checked">
            <Checkbox className="text-sm font-medium text-text-secondary">
              I agree to VisionFlow's 15% marketplace transaction fee for all sales.
            </Checkbox>
          </Form.Item>
        </div>
      </Section>
    </div>
  );
};
