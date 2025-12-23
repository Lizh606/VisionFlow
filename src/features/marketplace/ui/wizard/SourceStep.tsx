
import React from 'react';
import { Form, Select, Row, Col } from 'antd';
import { ShieldCheck } from 'lucide-react';

const Section = ({ title, subtitle, children }: any) => (
  <div className="flex flex-col gap-6 mb-12 animate-in fade-in slide-in-from-bottom-2 duration-300 last:mb-0">
    <div className="flex flex-col gap-1 border-l-[3px] border-brand pl-4">
      <h3 className="text-[18px] font-semibold text-text-primary m-0 tracking-tight leading-tight">{title}</h3>
      {subtitle && <p className="text-[12px] text-text-tertiary font-bold uppercase tracking-widest m-0 mt-1">{subtitle}</p>}
    </div>
    <div className="pt-2">{children}</div>
  </div>
);

export const SourceStep: React.FC = () => {
  return (
    <div className="animate-in fade-in">
      <Section title="Linked Vision Logic" subtitle="Studio Asset Binding">
        <p className="text-sm text-text-secondary mb-8 leading-relaxed max-w-[600px]">
          Select the workspace workflow and specific version that provides the logic for this marketplace resource. 
          Consumers will receive a read-only copy of this asset.
        </p>
        
        <Row gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <Form.Item label={<span className="vf-label">Source Workflow</span>} name="workflowId" rules={[{ required: true, message: 'Please select a workflow' }]}>
              <Select className="h-12" placeholder="Select a workflow" options={[
                { label: 'PPE Compliance Check (ID: wf-09)', value: 'wf-09' },
                { label: 'Traffic Analyzer V2 (ID: wf-22)', value: 'wf-22' }
              ]} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label={<span className="vf-label">Asset Version</span>} name="workflowVersion" rules={[{ required: true }]}>
              <Select className="h-12" placeholder="Choose a stable version" options={[
                { label: 'v2.4.0 (Stable)', value: 'v2.4.0' },
                { label: 'v2.3.9 (Legacy)', value: 'v2.3.9' }
              ]} />
            </Form.Item>
          </Col>
        </Row>

        <div className="mt-8 p-4 rounded-card border border-brand/20 bg-brand/5 flex gap-4">
          <ShieldCheck size={20} className="text-brand shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-text-primary">Logic Synchronization</span>
            <p className="text-xs text-text-secondary m-0">The marketplace binary will be updated automatically when a release is pushed to this version.</p>
          </div>
        </div>
      </Section>
    </div>
  );
};
