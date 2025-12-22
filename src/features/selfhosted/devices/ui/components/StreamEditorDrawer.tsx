
import React, { useEffect, useMemo, useState } from 'react';
import { Drawer, Form, Input, Select, Switch, Button, Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import { 
  Zap, 
  ShieldCheck, 
  Activity, 
  Info, 
  Video, 
  Database, 
  Network, 
  Plus, 
  AlertCircle,
  X,
  Eye,
  EyeOff,
  ChevronRight,
  Settings2,
  CheckCircle2
} from 'lucide-react';
import { Stream } from '../../hooks/useWorkflowDeployment';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';
import { VFTag } from '../../../../../shared/ui/VFTag';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
  initialValues?: Stream | null;
}

interface SectionProps {
  title: string;
  subtitle?: string;
  icon: any;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, subtitle, icon: Icon, children }) => (
  <div className="flex flex-col gap-4 mb-10 last:mb-0">
    <div className="flex items-center gap-3 border-b border-divider pb-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-control bg-bg-page border border-border text-text-secondary shrink-0">
        <Icon size={16} strokeWidth={2} />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-bold text-text-primary uppercase tracking-wider leading-none mb-1">
          {title}
        </span>
        {subtitle && <span className="text-xs text-text-tertiary font-medium truncate">{subtitle}</span>}
      </div>
    </div>
    <div className="px-0 sm:px-1">{children}</div>
  </div>
);

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
        <span className={`text-sm font-bold leading-none ${active ? 'text-brand' : 'text-text-primary'}`}>
          {title}
        </span>
        {recommended && (
          <VFTag variant="brand" className="h-4.5 px-1.5 text-[10px] font-bold opacity-80" filled={false}>
            REC
          </VFTag>
        )}
      </div>
      <p className="text-xs text-text-tertiary leading-snug line-clamp-2 m-0 font-medium opacity-80">
        {desc}
      </p>
    </div>

    {active && (
      <div className="absolute top-2 right-2 text-brand/40">
        <CheckCircle2 size={12} fill="currentColor" className="text-white" />
      </div>
    )}
  </div>
);

export const StreamEditorDrawer: React.FC<Props> = ({ open, onClose, onSave, initialValues }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { isMobile } = useResponsive();
  const isEdit = !!initialValues;

  const [isDirty, setIsDirty] = useState(false);
  const sourceType = Form.useWatch('type', form);
  const strategy = Form.useWatch('strategy', form);
  const telemetry = Form.useWatch('telemetry', form);

  const initialData = useMemo(() => {
    if (!initialValues) {
      return {
        concurrency: "1",
        applyImmediately: true,
        telemetry: 'METRICS',
        type: 'RTSP',
        strategy: 'LATEST'
      };
    }
    return {
      ...initialValues,
      concurrency: String(initialValues.concurrency || "1"),
      strategy: initialValues.version === 'LATEST' ? 'LATEST' : 'SPECIFIC'
    };
  }, [initialValues]);

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialData);
      setIsDirty(false);
    }
  }, [open, initialData, form]);

  const handleFinish = (values: any) => {
    onSave({
      ...values,
      concurrency: parseInt(values.concurrency, 10) || 1,
      version: values.strategy === 'LATEST' ? 'LATEST' : values.version,
      id: initialValues?.id || `STR_${Math.floor(Math.random() * 100000)}`,
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <Drawer
      title={
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-control bg-brand/5 border border-brand/10 text-brand flex items-center justify-center shrink-0 shadow-sm">
            {isEdit ? <Settings2 size={22} /> : <Plus size={22} />}
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold text-base text-text-primary leading-tight">
              {isEdit ? t('selfhosted.workflowDeployment.editTitle') : t('selfhosted.workflowDeployment.createTitle')}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-tertiary font-bold tracking-wider uppercase opacity-60">Stream ID:</span>
              <span className="text-xs font-mono font-bold text-text-secondary">
                {isEdit ? initialValues?.id : 'AUTO_ASSIGNED'}
              </span>
            </div>
          </div>
        </div>
      }
      width={isMobile ? '100%' : 640}
      onClose={onClose}
      open={open}
      destroyOnClose
      closeIcon={<X size={20} className="text-text-tertiary hover:text-text-primary transition-colors" />}
      footer={
        <div className="flex flex-col bg-bg-card">
          {isEdit && isDirty && (
            <div className="px-6 py-3 bg-warning/5 border-b border-warning/10 flex items-center gap-3">
              <AlertCircle size={14} className="text-warning shrink-0" />
              <span className="text-xs font-medium text-warning-700">
                Changes may cause stream restart
              </span>
            </div>
          )}
          
          <div className="flex items-center justify-between px-6 py-5">
            <Button 
              onClick={onClose} 
              className="h-11 px-8 font-semibold border-none text-text-secondary hover:text-text-primary hover:bg-bg-page transition-all"
            >
              {t('common.cancel')}
            </Button>
            <Button 
              type="primary" 
              onClick={() => form.submit()} 
              className="h-11 px-12 font-bold shadow-md rounded-control"
            >
              {isEdit ? t('selfhosted.workflowDeployment.updateBtn') : t('selfhosted.workflowDeployment.createBtn')}
            </Button>
          </div>
        </div>
      }
      styles={{ 
        body: { padding: isMobile ? '24px 20px' : '32px 40px' },
        footer: { padding: 0, borderTop: '1px solid rgba(var(--vf-divider), var(--vf-divider-alpha))' }
      }}
    >
      <Form 
        form={form} 
        layout="vertical" 
        onFinish={handleFinish} 
        onValuesChange={() => isEdit && setIsDirty(true)}
        autoComplete="off"
        requiredMark={false}
        className="vf-form-refined"
      >
        <Section title={t('selfhosted.workflowDeployment.basicInfo')} icon={Info} subtitle="Set identification and discovery info">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <Form.Item 
              label={<span className="text-sm font-bold text-text-secondary">{t('selfhosted.workflowDeployment.nameLabel')}</span>} 
              name="name" 
              rules={[{ required: true, message: t('selfhosted.workflowDeployment.nameRequired') }]}
              className="mb-0"
            >
              <Input placeholder={t('selfhosted.workflowDeployment.namePlaceholder')} className="h-11" allowClear />
            </Form.Item>
            <Form.Item 
              label={<span className="text-sm font-bold text-text-secondary">Stream ID</span>} 
              className="mb-0 opacity-70"
            >
              <Input value={isEdit ? initialValues?.id : "AUTO"} disabled className="h-11 font-mono" />
            </Form.Item>
          </div>
        </Section>

        <Section title={t('selfhosted.workflowDeployment.inputSource')} icon={Network} subtitle="Connection protocol and endpoint">
          <div className="bg-bg-page/40 p-5 rounded-card border border-border flex flex-col gap-6">
            <Form.Item label={<span className="text-sm font-bold text-text-secondary">{t('selfhosted.workflowDeployment.sourceType')}</span>} name="type" className="mb-0">
              <Radio.Group className="vf-radio-group-refined w-full grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Radio.Button value="RTSP">
                  <Video size={16} /><span>RTSP</span>
                </Radio.Button>
                <Radio.Button value="HTTP">
                  <Zap size={16} /><span>HTTP PUSH</span>
                </Radio.Button>
                <Radio.Button value="FILE">
                  <Database size={16} /><span>FILE</span>
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
            
            <Form.Item 
              label={<span className="text-sm font-bold text-text-secondary">{t('selfhosted.workflowDeployment.endpoint')}</span>} 
              name="endpoint" 
              rules={[{ required: true, message: t('selfhosted.workflowDeployment.endpointRequired') }]}
              className="mb-0"
            >
              {sourceType === 'RTSP' ? (
                <Input.Password 
                  placeholder="rtsp://admin:****@192.168.1.1:554/ch1" 
                  className="h-11 font-mono text-sm" 
                  iconRender={visible => (visible ? <Eye size={18} /> : <EyeOff size={18} />)}
                />
              ) : (
                <Input placeholder={sourceType === 'FILE' ? "/data/recordings/clip_01.mp4" : "https://api.visionflow.io/ingest/..."} className="h-11 font-mono text-sm" />
              )}
            </Form.Item>
          </div>
        </Section>

        <Section title={t('selfhosted.workflowDeployment.workflowBinding')} icon={Database} subtitle="Assign vision logic to this stream">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
            <Form.Item label={<span className="text-sm font-bold text-text-secondary">{t('selfhosted.workflowDeployment.selectWorkflow')}</span>} name="workflowId" rules={[{ required: true }]} className="mb-0">
              <Select 
                showSearch
                className="h-11 w-full"
                placeholder={t('selfhosted.workflowDeployment.selectWorkflowPlaceholder')} 
                options={[
                  { value: 'wf_crowd_01', label: 'Crowd Analysis' },
                  { value: 'wf_ppe_05', label: 'PPE Compliance' }
                ]} 
              />
            </Form.Item>
            
            <div className="flex flex-col gap-4">
              <Form.Item label={<span className="text-sm font-bold text-text-secondary">{t('selfhosted.workflowDeployment.versionStrategy')}</span>} name="strategy" className="mb-0">
                <Radio.Group className="vf-radio-group-refined w-full grid grid-cols-2 gap-2">
                  <Radio.Button value="LATEST">LATEST</Radio.Button>
                  <Radio.Button value="SPECIFIC">SPECIFIC</Radio.Button>
                </Radio.Group>
              </Form.Item>
              
              {strategy === 'SPECIFIC' && (
                <Form.Item name="version" rules={[{ required: true }]} className="animate-in slide-in-from-top-2 duration-200 mb-0">
                  <Select 
                    placeholder="Select version..."
                    className="h-11 w-full"
                    options={[
                      { value: 'v2.4', label: 'v2.4.0 (Stable)' },
                      { value: 'v2.3', label: 'v2.3.9 (Legacy)' },
                    ]}
                  />
                </Form.Item>
              )}
            </div>
          </div>
        </Section>

        <Section title={t('selfhosted.workflowDeployment.runPolicy')} icon={Zap} subtitle="Runtime and telemetry settings">
          <div className="flex flex-col gap-8">
            <Form.Item label={<span className="text-sm font-bold text-text-secondary">{t('selfhosted.workflowDeployment.concurrency')}</span>} name="concurrency" className="mb-0 max-w-full sm:max-w-[200px]">
              <Input type="number" min={1} max={10} className="h-11 font-bold text-center" suffix="INST" />
            </Form.Item>

            <div className="flex flex-col gap-4">
              <span className="text-sm font-bold text-text-secondary">{t('selfhosted.workflowDeployment.telemetryGranularity')}</span>
              <Form.Item name="telemetry" className="mb-0">
                <Radio.Group className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
                  {[
                    { value: 'HEARTBEAT', title: 'Heartbeat', desc: 'Online check only', icon: ShieldCheck },
                    { value: 'METRICS', title: 'Metrics', desc: 'Throughput & FPS', icon: Activity, recommended: true },
                    { value: 'DIAGNOSTIC', title: 'Diagnostic', desc: 'Full traces', icon: Video },
                  ].map(opt => (
                    <Radio key={opt.value} value={opt.value} className="vf-card-radio !m-0 !p-0">
                      <TelemetryLevelCard 
                        {...opt} 
                        active={telemetry === opt.value} 
                      />
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            </div>

            <div className="p-4 rounded-card border border-brand/20 bg-brand/5 flex items-start gap-4 mb-4">
              <div className="pt-1 text-brand"><AlertCircle size={18} /></div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold text-text-primary">{t('selfhosted.workflowDeployment.applyImmediately')}</span>
                  <Form.Item name="applyImmediately" valuePropName="checked" className="mb-0">
                    <Switch size="small" />
                  </Form.Item>
                </div>
                <p className="text-xs text-text-tertiary font-medium m-0 leading-relaxed">
                  {t('selfhosted.workflowDeployment.applyImmediatelyDesc')}
                </p>
                {isEdit && (
                   <div className="text-xs text-brand font-bold mt-2.5 flex items-center gap-1.5">
                     <ChevronRight size={12} strokeWidth={3} />
                     {!form.getFieldValue('applyImmediately') && "Changes applied on next release"}
                   </div>
                )}
              </div>
            </div>
          </div>
        </Section>
      </Form>
    </Drawer>
  );
};
