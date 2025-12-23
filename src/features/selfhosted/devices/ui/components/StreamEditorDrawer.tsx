
import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Switch, Button, Radio, Alert, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { 
  Zap, ShieldCheck, Activity, Info, Video, 
  Database, Network, Plus, AlertCircle, 
  Settings2, CheckCircle2 
} from 'lucide-react';
import { Stream } from '../../hooks/useWorkflowDeployment';
import { VFDrawer } from '../../../../../ui/VFDrawer';
import { VFSection } from '../../../../../ui/VFSection';
import { VFTag } from '../../../../../shared/ui/VFTag';
import { VFText } from '../../../../../ui/VFText';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
  initialValues?: Stream | null;
}

const TelemetryLevelCard = ({ icon: Icon, title, desc, recommended, active }: any) => (
  <div className={`
    relative flex items-center gap-4 p-4 rounded-card border transition-all cursor-pointer select-none h-full w-full
    ${active 
      ? 'bg-brand/[0.04] border-brand/40 ring-1 ring-brand/10 shadow-sm' 
      : 'bg-bg-card border-border hover:border-brand/20 hover:bg-bg-page/40'}
  `}>
    <div className={`
      w-10 h-10 rounded-control flex items-center justify-center shrink-0 border transition-all duration-300
      ${active ? 'bg-brand text-white border-transparent scale-105' : 'bg-bg-page text-text-tertiary border-border'}
    `}>
      <Icon size={18} strokeWidth={2.5} />
    </div>

    <div className="flex flex-col min-w-0 flex-1">
      <div className="flex items-center justify-between gap-2 mb-1">
        <VFText variant="t5-strong" color={active ? 'brand' : 'primary'}>{title}</VFText>
        {recommended && (
          <VFTag variant="brand" className="h-4.5 px-1.5 text-[10px] font-bold opacity-80" filled={false}>REC</VFTag>
        )}
      </div>
      <VFText variant="t6" color="secondary" className="line-clamp-2 opacity-80">{desc}</VFText>
    </div>
  </div>
);

export const StreamEditorDrawer: React.FC<Props> = ({ open, onClose, onSave, initialValues }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const isEdit = !!initialValues;

  const telemetry = Form.useWatch('telemetry', form);

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues || {
        concurrency: "1",
        applyImmediately: true,
        telemetry: 'METRICS',
        type: 'RTSP',
        strategy: 'LATEST'
      });
    }
  }, [open, initialValues, form]);

  const handleFinish = (values: any) => {
    onSave({
      ...values,
      id: initialValues?.id || `STR_${Math.floor(Math.random() * 100000)}`,
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <VFDrawer
      title={isEdit ? t('selfhosted.workflowDeployment.editTitle') : t('selfhosted.workflowDeployment.createTitle')}
      subtitle={`${t('selfhosted.workflowDeployment.streamName')} ID: ${isEdit ? initialValues?.id : 'NEW'}`}
      open={open}
      onClose={onClose}
      size="M"
      footer={
        <div className="flex items-center justify-between w-full">
          <Button onClick={onClose} className="px-8 h-11 border-none hover:bg-bg-page font-medium">
            {t('common.cancel')}
          </Button>
          <Button type="primary" onClick={() => form.submit()} className="px-12 h-11 font-bold shadow-md">
            {isEdit ? t('selfhosted.workflowDeployment.updateBtn') : t('selfhosted.workflowDeployment.createBtn')}
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical" onFinish={handleFinish} autoComplete="off" requiredMark={false}>
        
        <VFSection title={t('selfhosted.workflowDeployment.basicInfo')} level={4}>
          <Form.Item 
            label={<VFText variant="t5-strong" color="secondary">{t('selfhosted.workflowDeployment.nameLabel')}</VFText>} 
            name="name" 
            rules={[{ required: true, message: t('selfhosted.workflowDeployment.nameRequired') }]} 
            className="mb-0"
          >
            <Input placeholder={t('selfhosted.workflowDeployment.namePlaceholder')} className="h-11" />
          </Form.Item>
        </VFSection>

        <VFSection title={t('selfhosted.workflowDeployment.inputSource')} level={4} description={t('selfhosted.mode.edgeDesc')}>
          <div className="flex flex-col gap-6 bg-bg-card p-5 rounded-card border border-divider">
            <Form.Item name="type" className="mb-0">
              <Radio.Group className="w-full grid grid-cols-3 gap-2">
                <Radio.Button value="RTSP" className="h-12 flex items-center justify-center font-bold">RTSP</Radio.Button>
                <Radio.Button value="HTTP" className="h-12 flex items-center justify-center font-bold">HTTP</Radio.Button>
                <Radio.Button value="FILE" className="h-12 flex items-center justify-center font-bold">FILE</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item 
              label={<VFText variant="t5-strong" color="secondary">{t('selfhosted.workflowDeployment.endpoint')}</VFText>} 
              name="endpoint" 
              rules={[{ required: true, message: t('selfhosted.workflowDeployment.endpointRequired') }]} 
              className="mb-0"
            >
              <Input placeholder="rtsp://admin:****@192.168.1.100" className="h-11 font-mono text-sm" />
            </Form.Item>
          </div>
        </VFSection>

        <VFSection title={t('selfhosted.workflowDeployment.workflowBinding')} level={4}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Form.Item 
              label={<VFText variant="t5-strong" color="secondary">{t('selfhosted.workflowDeployment.selectWorkflow')}</VFText>} 
              name="workflowId" 
              rules={[{ required: true, message: t('selfhosted.workflowDeployment.selectWorkflowPlaceholder') }]}
            >
              <Select className="h-11" placeholder={t('selfhosted.workflowDeployment.selectWorkflowPlaceholder')} options={[{ label: 'Crowd Analysis', value: 'wf_1' }]} />
            </Form.Item>
            <Form.Item 
              label={<VFText variant="t5-strong" color="secondary">{t('selfhosted.workflowDeployment.versionStrategy')}</VFText>} 
              name="strategy"
            >
              <Radio.Group className="w-full h-11 flex">
                <Radio.Button value="LATEST" className="flex-1 flex items-center justify-center font-bold">{t('selfhosted.workflowDeployment.latest')}</Radio.Button>
                <Radio.Button value="SPECIFIC" className="flex-1 flex items-center justify-center font-bold">Fixed</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </div>
        </VFSection>

        <VFSection title={t('selfhosted.workflowDeployment.runPolicy')} level={4}>
          <div className="flex flex-col gap-6">
             <Form.Item 
                label={<VFText variant="t5-strong" color="secondary">{t('selfhosted.workflowDeployment.telemetryGranularity')}</VFText>} 
                name="telemetry" 
                className="mb-0"
              >
                <Radio.Group className="w-full grid grid-cols-1 gap-3">
                  {[
                    { value: 'HEARTBEAT', title: t('selfhosted.workflowDeployment.telemetryLevel.heartbeat'), desc: t('selfhosted.workflowDeployment.telemetryLevel.heartbeatDesc'), icon: ShieldCheck },
                    { value: 'METRICS', title: t('selfhosted.workflowDeployment.telemetryLevel.metrics'), desc: t('selfhosted.workflowDeployment.telemetryLevel.metricsDesc'), icon: Activity, recommended: true },
                    { value: 'DIAGNOSTIC', title: t('selfhosted.workflowDeployment.telemetryLevel.diagnostic'), desc: t('selfhosted.workflowDeployment.telemetryLevel.diagnosticDesc'), icon: Video },
                  ].map(opt => (
                    <Radio key={opt.value} value={opt.value} className="vf-card-radio !m-0 !p-0">
                      <TelemetryLevelCard {...opt} active={telemetry === opt.value} />
                    </Radio>
                  ))}
                </Radio.Group>
             </Form.Item>
             
             <div className="p-4 bg-brand/5 border border-brand/20 rounded-card flex gap-4">
               <AlertCircle size={18} className="text-brand shrink-0 mt-0.5" />
               <div className="flex flex-col gap-1">
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-text-primary">{t('selfhosted.workflowDeployment.applyImmediately')}</span>
                    <Form.Item name="applyImmediately" valuePropName="checked" className="mb-0">
                      <Switch size="small" />
                    </Form.Item>
                 </div>
                 <p className="text-xs text-text-tertiary m-0 leading-relaxed font-medium">{t('selfhosted.workflowDeployment.applyImmediatelyDesc')}</p>
               </div>
             </div>
          </div>
        </VFSection>
      </Form>

      <style>{`
        .vf-card-radio .ant-radio { position: absolute; opacity: 0; width: 0; height: 0; }
        .vf-card-radio > span:last-child { display: block; width: 100%; padding: 0 !important; }
      `}</style>
    </VFDrawer>
  );
};
