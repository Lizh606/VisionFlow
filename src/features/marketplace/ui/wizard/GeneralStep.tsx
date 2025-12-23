
import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';
import { Monitor, Cloud, Cpu, X, Package } from 'lucide-react';
import { VFTag } from '../../../../shared/ui/VFTag';

const { TextArea } = Input;

const Section = ({ title, subtitle, children }: any) => (
  <div className="flex flex-col gap-6 mb-12 animate-in fade-in slide-in-from-bottom-2 duration-300 last:mb-0">
    <div className="flex flex-col gap-1 border-l-[3px] border-brand pl-4">
      <h3 className="text-[18px] font-semibold text-text-primary m-0 tracking-tight leading-tight">{title}</h3>
      {subtitle && <p className="text-[12px] text-text-tertiary font-bold uppercase tracking-widest m-0 mt-1">{subtitle}</p>}
    </div>
    <div className="pt-2">{children}</div>
  </div>
);

export const GeneralStep: React.FC = () => {
  const deviceTagRender = (props: any) => {
    const { label, closable, onClose } = props;
    let icon = <Monitor size={12} />;
    let variant: any = 'neutral';
    if (label.includes('Cloud')) { icon = <Cloud size={12} />; variant = 'info'; }
    if (label.includes('Jetson')) { icon = <Cpu size={12} />; variant = 'teal'; }

    return (
      <VFTag variant={variant} icon={icon} filled={false} className="mr-2 mb-1" onMouseDown={e => e.preventDefault()}>
        <span className="flex items-center gap-1.5">
          {label}
          {closable && <X size={12} className="cursor-pointer opacity-40 hover:opacity-100" onClick={onClose} />}
        </span>
      </VFTag>
    );
  };

  return (
    <div className="animate-in fade-in">
      <Section title="Basic Information" subtitle="Storefront Identity">
        <Form.Item label={<span className="vf-label">Title</span>} name="name" rules={[{ required: true, message: 'Title is required' }]}>
          <Input className="h-11 text-base font-medium" placeholder="e.g. Advanced PPE Detection" />
        </Form.Item>
        <Form.Item label={<span className="vf-label">Short Description</span>} name="shortDescription" rules={[{ required: true, message: 'Description is required' }]}>
          <TextArea rows={3} className="text-base leading-relaxed font-medium" placeholder="Briefly explain what this resource does..." showCount maxLength={120} />
        </Form.Item>
      </Section>

      <Section title="Classification & Capabilities" subtitle="Matching and Discovery">
        <Row gutter={[32, 24]}>
          <Col xs={24} md={12}>
            <Form.Item label={<span className="vf-label">Category / Tags</span>} name="tags" rules={[{ required: true }]}>
              <Select mode="tags" className="w-full min-h-[44px]" placeholder="e.g. Traffic, Safety" options={[{ value: 'Traffic' }, { value: 'Safety' }, { value: 'Industrial' }]} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label={<span className="vf-label">Primary Task Type</span>} name="taskType" rules={[{ required: true }]}>
              <Select className="h-11 font-medium" placeholder="Select task type" options={[{ label: 'Object Detection', value: 'det' }, { label: 'OCR', value: 'ocr' }]} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label={<span className="vf-label">Supported Devices</span>} name="supportedDevices" rules={[{ required: true }]}>
              <Select mode="tags" className="w-full min-h-[44px]" tagRender={deviceTagRender} placeholder="Type hardware (e.g. Jetson Orin)" options={[{ value: 'VisionFlow Cloud' }, { value: 'NVIDIA Jetson Nano' }, { value: 'Standard x86 PC' }]} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <div className="flex flex-col gap-3">
              <label className="vf-label">Pricing Summary</label>
              <div className="relative h-[44px] flex items-center justify-between px-4 rounded-control border border-divider bg-bg-page/40">
                <div className="text-xs font-bold text-text-tertiary uppercase">Set in Step 4</div>
                <Package size={14} className="text-brand opacity-60" />
              </div>
            </div>
          </Col>
        </Row>
      </Section>
    </div>
  );
};
