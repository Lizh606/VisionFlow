
import React from 'react';
import { Form, Select, Row, Col } from 'antd';
import { ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Section = ({ title, subtitle, children }: any) => (
  <div className="flex flex-col gap-6 mb-12 animate-in fade-in slide-in-from-bottom-2 duration-300 last:mb-0">
    <div className="flex flex-col gap-1 border-l-[3px] border-brand pl-4">
      <h3 className="text-[20px] font-semibold text-text-primary m-0 tracking-tight leading-tight">{title}</h3>
      {subtitle && <p className="text-[12px] text-text-tertiary font-bold uppercase tracking-widest m-0 mt-1">{subtitle}</p>}
    </div>
    <div className="pt-2">{children}</div>
  </div>
);

export const SourceStep: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="animate-in fade-in">
      <Section title={t('marketplace.seller.wizard.source.title')} subtitle={t('marketplace.seller.wizard.source.subtitle')}>
        <p className="text-[14px] text-text-secondary mb-8 leading-relaxed max-w-[600px] font-normal">
          {t('marketplace.seller.wizard.source.description')}
        </p>
        
        <Row gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <Form.Item label={<span className="text-[14px] font-semibold text-text-secondary uppercase tracking-tight">{t('marketplace.seller.wizard.source.workflowLabel')}</span>} name="workflowId" rules={[{ required: true, message: t('marketplace.seller.wizard.source.workflowRequired') }]}>
              <Select className="h-12" placeholder="Select a workflow" options={[
                { label: 'PPE Compliance Check (ID: wf-09)', value: 'wf-09' },
                { label: 'Traffic Analyzer V2 (ID: wf-22)', value: 'wf-22' }
              ]} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label={<span className="text-[14px] font-semibold text-text-secondary uppercase tracking-tight">{t('marketplace.seller.wizard.source.versionLabel')}</span>} name="workflowVersion" rules={[{ required: true }]}>
              <Select className="h-12" placeholder="Choose a stable version" options={[
                { label: 'v2.4.0 (Stable)', value: 'v2.4.0' },
                { label: 'v2.3.9 (Legacy)', value: 'v2.3.9' }
              ]} />
            </Form.Item>
          </Col>
        </Row>

        <div className="mt-8 p-5 rounded-card border border-brand/20 bg-brand/5 flex gap-4">
          <ShieldCheck size={20} className="text-brand shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="text-[14px] font-bold text-text-primary">{t('marketplace.seller.wizard.source.syncTitle')}</span>
            <p className="text-[12px] text-text-secondary m-0 font-medium opacity-80">{t('marketplace.seller.wizard.source.syncDesc')}</p>
          </div>
        </div>
      </Section>
    </div>
  );
};
