
import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';
import { Monitor, Cloud, Cpu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFTag } from '../../../../shared/ui/VFTag';
import { VFSection } from '../../../../ui/VFSection';
import { VFText } from '../../../../ui/VFText';

const { TextArea } = Input;

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

  // Fix: Made children optional to resolve TS error "Property 'children' is missing in type '{}' but required in type '{ children: React.ReactNode; }'" at usage sites.
  const FieldLabel = ({ children }: { children?: React.ReactNode }) => (
    /* V1.4: Label = T5 Body Strong */
    <VFText variant="t5-strong" color="secondary" className="uppercase tracking-wider mb-1.5 block">
      {children}
    </VFText>
  );

  return (
    <div className="animate-in fade-in">
      <VFSection 
        title={t('marketplace.seller.wizard.general.basicTitle')} 
        description={t('marketplace.seller.wizard.general.basicSubtitle')}
        level={3}
      >
        <Form.Item 
          label={<FieldLabel>{t('marketplace.seller.wizard.general.nameLabel')}</FieldLabel>} 
          name="name" 
          rules={[{ required: true, message: t('marketplace.seller.wizard.general.nameRequired') }]}
        >
          <Input className="h-11 font-medium" placeholder={t('marketplace.seller.wizard.general.namePlaceholder')} />
        </Form.Item>
        <Form.Item 
          label={<FieldLabel>{t('marketplace.seller.wizard.general.descLabel')}</FieldLabel>} 
          name="shortDescription" 
          rules={[{ required: true, message: t('marketplace.seller.wizard.general.descRequired') }]}
        >
          <TextArea rows={3} className="leading-relaxed font-normal p-3" placeholder={t('marketplace.seller.wizard.general.descPlaceholder')} showCount maxLength={120} />
        </Form.Item>
      </VFSection>

      <VFSection 
        title={t('marketplace.seller.wizard.general.classTitle')} 
        description={t('marketplace.seller.wizard.general.classSubtitle')}
        level={3}
      >
        <Row gutter={[24, 20]}>
          <Col xs={24} md={12}>
            <Form.Item label={<FieldLabel>{t('marketplace.seller.wizard.general.tagsLabel')}</FieldLabel>} name="tags" rules={[{ required: true }]}>
              <Select mode="tags" className="w-full min-h-[44px]" placeholder="e.g. Traffic, Safety" options={[{ value: 'Traffic' }, { value: 'Safety' }, { value: 'Industrial' }]} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label={<FieldLabel>{t('marketplace.seller.wizard.general.taskLabel')}</FieldLabel>} name="taskType" rules={[{ required: true }]}>
              <Select className="h-11" placeholder="Select task type" options={[{ label: 'Object Detection', value: 'det' }, { label: 'OCR', value: 'ocr' }]} />
            </Form.Item>
          </Col>
          <Col xs={24} md={24}>
            <Form.Item label={<FieldLabel>{t('marketplace.seller.wizard.general.devicesLabel')}</FieldLabel>} name="supportedDevices" rules={[{ required: true }]}>
              <Select mode="tags" className="w-full min-h-[44px]" tagRender={deviceTagRender} placeholder={t('marketplace.seller.wizard.general.devicesPlaceholder')} options={[{ value: 'VisionFlow Cloud' }, { value: 'NVIDIA Jetson Nano' }, { value: 'Standard x86 PC' }]} />
            </Form.Item>
          </Col>
        </Row>
      </VFSection>
    </div>
  );
};
