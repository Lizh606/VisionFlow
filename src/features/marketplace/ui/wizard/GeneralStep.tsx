
import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';
import { Monitor, Cloud, Cpu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFTag } from '../../../../shared/ui/VFTag';

const { TextArea } = Input;

const Section = ({ title, subtitle, children }: any) => (
  <div className="flex flex-col gap-6 mb-10 animate-in fade-in slide-in-from-bottom-2 duration-300 last:mb-0">
    <div className="flex flex-col gap-1 border-l-[3px] border-brand pl-4">
      <h3 className="text-[18px] font-bold text-text-primary m-0 tracking-tight leading-tight">{title}</h3>
      {subtitle && <p className="text-[11px] text-text-tertiary font-bold uppercase tracking-widest m-0 mt-1">{subtitle}</p>}
    </div>
    <div className="pt-1">{children}</div>
  </div>
);

export const GeneralStep: React.FC = () => {
  const { t } = useTranslation();

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
      <Section title={t('marketplace.seller.wizard.general.basicTitle')} subtitle={t('marketplace.seller.wizard.general.basicSubtitle')}>
        <Form.Item 
          label={<span className="text-[13px] font-bold text-text-secondary uppercase tracking-tight">{t('marketplace.seller.wizard.general.nameLabel')}</span>} 
          name="name" 
          rules={[{ required: true, message: t('marketplace.seller.wizard.general.nameRequired') }]}
        >
          <Input className="h-10 text-[14px] font-medium" placeholder={t('marketplace.seller.wizard.general.namePlaceholder')} />
        </Form.Item>
        <Form.Item 
          label={<span className="text-[13px] font-bold text-text-secondary uppercase tracking-tight">{t('marketplace.seller.wizard.general.descLabel')}</span>} 
          name="shortDescription" 
          rules={[{ required: true, message: t('marketplace.seller.wizard.general.descRequired') }]}
        >
          <TextArea rows={3} className="text-[14px] leading-relaxed font-normal" placeholder={t('marketplace.seller.wizard.general.descPlaceholder')} showCount maxLength={120} />
        </Form.Item>
      </Section>

      <Section title={t('marketplace.seller.wizard.general.classTitle')} subtitle={t('marketplace.seller.wizard.general.classSubtitle')}>
        <Row gutter={[24, 20]}>
          <Col xs={24} md={12}>
            <Form.Item label={<span className="text-[13px] font-bold text-text-secondary uppercase tracking-tight">{t('marketplace.seller.wizard.general.tagsLabel')}</span>} name="tags" rules={[{ required: true }]}>
              <Select mode="tags" className="w-full min-h-[40px]" placeholder="e.g. Traffic, Safety" options={[{ value: 'Traffic' }, { value: 'Safety' }, { value: 'Industrial' }]} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label={<span className="text-[13px] font-bold text-text-secondary uppercase tracking-tight">{t('marketplace.seller.wizard.general.taskLabel')}</span>} name="taskType" rules={[{ required: true }]}>
              <Select className="h-10 text-[14px]" placeholder="Select task type" options={[{ label: 'Object Detection', value: 'det' }, { label: 'OCR', value: 'ocr' }]} />
            </Form.Item>
          </Col>
          <Col xs={24} md={24}>
            <Form.Item label={<span className="text-[13px] font-bold text-text-secondary uppercase tracking-tight">{t('marketplace.seller.wizard.general.devicesLabel')}</span>} name="supportedDevices" rules={[{ required: true }]}>
              <Select mode="tags" className="w-full min-h-[40px]" tagRender={deviceTagRender} placeholder={t('marketplace.seller.wizard.general.devicesPlaceholder')} options={[{ value: 'VisionFlow Cloud' }, { value: 'NVIDIA Jetson Nano' }, { value: 'Standard x86 PC' }]} />
            </Form.Item>
          </Col>
        </Row>
      </Section>
    </div>
  );
};
