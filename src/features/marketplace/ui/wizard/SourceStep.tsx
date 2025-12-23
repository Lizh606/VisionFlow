
import React from 'react';
import { Form, Select, Row, Col } from 'antd';
import { ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFSection } from '../../../../ui/VFSection';
import { VFText } from '../../../../ui/VFText';

export const SourceStep: React.FC = () => {
  const { t } = useTranslation();
  
  // Fix: Made children optional to resolve TS error "Property 'children' is missing in type '{}' but required in type '{ children: React.ReactNode; }'" at usage sites.
  const FieldLabel = ({ children }: { children?: React.ReactNode }) => (
    <VFText variant="t5-strong" color="secondary" className="uppercase tracking-wider mb-1.5 block">
      {children}
    </VFText>
  );

  return (
    <div className="animate-in fade-in">
      <VFSection 
        title={t('marketplace.seller.wizard.source.title')} 
        description={t('marketplace.seller.wizard.source.subtitle')}
        level={3}
      >
        {/* V1.4: Description Text = T5 Body */}
        <VFText variant="t5" color="secondary" className="mb-8 block leading-relaxed max-w-[600px]">
          {t('marketplace.seller.wizard.source.description')}
        </VFText>
        
        <Row gutter={[32, 24]}>
          <Col xs={24} md={12}>
            <Form.Item label={<FieldLabel>{t('marketplace.seller.wizard.source.workflowLabel')}</FieldLabel>} name="workflowId" rules={[{ required: true, message: t('marketplace.seller.wizard.source.workflowRequired') }]}>
              <Select className="h-12" placeholder="Select a workflow" options={[
                { label: 'PPE Compliance Check (ID: wf-09)', value: 'wf-09' },
                { label: 'Traffic Analyzer V2 (ID: wf-22)', value: 'wf-22' }
              ]} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label={<FieldLabel>{t('marketplace.seller.wizard.source.versionLabel')}</FieldLabel>} name="workflowVersion" rules={[{ required: true }]}>
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
            {/* V1.4: Card Subhead = T5 Strong */}
            <VFText variant="t5-strong" color="primary">{t('marketplace.seller.wizard.source.syncTitle')}</VFText>
            {/* V1.4: Meta Hint = T6 Caption */}
            <VFText variant="t6" color="secondary" className="font-medium opacity-80">{t('marketplace.seller.wizard.source.syncDesc')}</VFText>
          </div>
        </div>
      </VFSection>
    </div>
  );
};
