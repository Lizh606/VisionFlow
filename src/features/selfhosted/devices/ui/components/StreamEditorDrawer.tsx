
import React, { useMemo } from 'react';
import { Drawer, Form, Input, Select, InputNumber, Switch, Button, Segmented, Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import { Zap, ShieldCheck, Activity, Info, Video, Database, Network, Plus } from 'lucide-react';
import { Stream } from '../../hooks/useWorkflowDeployment';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
  initialValues?: Stream | null;
}

const SectionHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <div className="flex items-center gap-2 mb-4 mt-6 first:mt-2">
    <div className="text-brand shrink-0"><Icon size={14} strokeWidth={2.5} /></div>
    <span className="text-[11px] font-bold uppercase tracking-wider text-text-primary">{title}</span>
    <div className="h-px bg-divider flex-1 ml-2 opacity-50" />
  </div>
);

export const StreamEditorDrawer: React.FC<Props> = ({ open, onClose, onSave, initialValues }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const isEdit = !!initialValues;

  // Use standard useWatch. It works when passed the form instance.
  const telemetryValue = Form.useWatch('telemetry', form);

  // Prepare initial values for the form. 
  // Forcing a key change on the Form component ensures clean initialization.
  const defaultValues = useMemo(() => {
    if (initialValues) {
      return {
        ...initialValues,
        concurrency: Number(initialValues.concurrency) || 1
      };
    }
    return {
      concurrency: 1,
      applyImmediately: true,
      telemetry: 'METRICS',
      type: 'RTSP',
      version: 'LATEST'
    };
  }, [initialValues]);

  const handleSubmit = (values: any) => {
    onSave({
      ...values,
      id: initialValues?.id || `STR_${Math.floor(Math.random() * 100000)}`,
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <Drawer
      title={
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-control bg-brand/10 text-brand flex items-center justify-center">
            {isEdit ? <Activity size={18} /> : <Plus size={18} />}
          </div>
          <span className="font-bold">
            {isEdit ? t('selfhosted.workflowDeployment.editTitle') : t('selfhosted.workflowDeployment.createTitle')}
          </span>
        </div>
      }
      width={560}
      onClose={onClose}
      open={open}
      destroyOnClose
      footer={
        <div className="flex items-center justify-between px-2 py-2">
          <Button onClick={onClose} className="h-10 px-6 font-semibold border-none text-text-tertiary hover:text-text-primary">
            {t('common.cancel')}
          </Button>
          <Button 
            type="primary" 
            onClick={() => form.submit()} 
            className="h-10 px-8 font-bold shadow-sm"
          >
            {isEdit ? t('selfhosted.workflowDeployment.updateBtn') : t('selfhosted.workflowDeployment.createBtn')}
          </Button>
        </div>
      }
    >
      {/* 
        The 'key' prop on Form is crucial: 
        It forces the form to re-mount and reset its internal state when switching between edit/create.
      */}
      <Form 
        key={initialValues?.id || 'new_stream'}
        form={form} 
        layout="vertical" 
        onFinish={handleSubmit} 
        initialValues={defaultValues}
        className="pb-10"
      >
        {/* Section 1: Basic Information */}
        <SectionHeader title={t('selfhosted.workflowDeployment.basicInfo')} icon={Info} />
        <Form.Item 
          label={t('selfhosted.workflowDeployment.nameLabel')} 
          name="name" 
          rules={[{ required: true, message: t('selfhosted.workflowDeployment.nameRequired') }]}
        >
          <Input placeholder={t('selfhosted.workflowDeployment.namePlaceholder')} className="h-10 font-medium" />
        </Form.Item>
        {isEdit && (
          <Form.Item label={t('selfhosted.workflowDeployment.streamId')} name="id">
            <Input disabled className="bg-bg-page/50 border-dashed font-mono" />
          </Form.Item>
        )}

        {/* Section 2: Input Source */}
        <SectionHeader title={t('selfhosted.workflowDeployment.inputSource')} icon={Network} />
        <div className="bg-bg-page/40 p-5 rounded-card border border-border flex flex-col gap-4">
          <Form.Item label={t('selfhosted.workflowDeployment.sourceType')} name="type" rules={[{ required: true }]} className="mb-0">
            <Segmented
              block
              options={[
                { label: 'RTSP', value: 'RTSP' },
                { label: 'HTTP PUSH', value: 'HTTP' },
                { label: 'FILE SOURCE', value: 'FILE' },
              ]}
              className="bg-bg-card p-1 border border-border/40"
            />
          </Form.Item>
          <Form.Item 
            label={t('selfhosted.workflowDeployment.endpoint')} 
            name="endpoint" 
            rules={[{ required: true, message: t('selfhosted.workflowDeployment.endpointRequired') }]}
            className="mb-0"
          >
            <Input.Password placeholder="rtsp://admin:****@192.168.1.1:554/ch1" className="h-10 font-mono" />
          </Form.Item>
        </div>

        {/* Section 3: Workflow Binding */}
        <SectionHeader title={t('selfhosted.workflowDeployment.workflowBinding')} icon={Database} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item label={t('selfhosted.workflowDeployment.selectWorkflow')} name="workflowId" rules={[{ required: true }]}>
            <Select 
              placeholder={t('selfhosted.workflowDeployment.selectWorkflowPlaceholder')} 
              options={[
                { value: 'wf_crowd_01', label: '人流量分析 (Crowd Analysis)' },
                { value: 'wf_ppe_05', label: '安防合规 (PPE Compliance)' }
              ]} 
              className="h-10"
            />
          </Form.Item>
          <Form.Item label={t('selfhosted.workflowDeployment.versionStrategy')} name="version" rules={[{ required: true }]}>
            <Select options={[
              { value: 'LATEST', label: t('selfhosted.workflowDeployment.latest') }, 
              { value: 'v2.4', label: 'v2.4.0 (Stable)' },
              { value: 'v1.5', label: 'v1.5.0 (Legacy)' }
            ]} className="h-10" />
          </Form.Item>
        </div>

        {/* Section 4: Policy & Telemetry */}
        <SectionHeader title={t('selfhosted.workflowDeployment.runPolicy')} icon={Zap} />
        <Form.Item label={t('selfhosted.workflowDeployment.concurrency')} name="concurrency">
          <InputNumber 
            min={1} 
            max={10} 
            className="w-full h-10 font-bold" 
            controls={true}
          />
        </Form.Item>

        <Form.Item label={t('selfhosted.workflowDeployment.telemetryGranularity')} name="telemetry">
          <Radio.Group className="w-full flex flex-col gap-3">
            {[
              { value: 'HEARTBEAT', label: t('selfhosted.workflowDeployment.heartbeatOnly'), desc: t('selfhosted.workflowDeployment.heartbeatDesc'), icon: ShieldCheck },
              { value: 'METRICS', label: t('selfhosted.workflowDeployment.metricsOnly'), desc: t('selfhosted.workflowDeployment.metricsDesc'), icon: Activity },
              { value: 'DIAGNOSTIC', label: t('selfhosted.workflowDeployment.diagnostic'), desc: t('selfhosted.workflowDeployment.diagnosticDesc'), icon: Video },
            ].map(item => {
              const active = telemetryValue === item.value;
              return (
                <Radio.Button 
                  key={item.value} 
                  value={item.value}
                  className={`
                    vf-telemetry-radio !h-auto !p-0 !border-border !rounded-card overflow-hidden transition-all
                    ${active ? '!border-brand !ring-1 !ring-brand/20' : 'hover:!border-brand/40'}
                  `}
                >
                  <div className={`flex items-center gap-4 p-4 transition-colors ${active ? 'bg-brand/5' : 'bg-bg-card'}`}>
                    <div className={`
                      w-10 h-10 rounded-control flex items-center justify-center border transition-colors
                      ${active ? 'bg-brand text-white border-transparent' : 'bg-bg-page text-text-tertiary border-border'}
                    `}>
                      <item.icon size={18} strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className={`font-bold text-sm ${active ? 'text-brand' : 'text-text-primary'}`}>{item.label}</span>
                      <span className="text-[11px] text-text-tertiary font-medium opacity-80">{item.desc}</span>
                    </div>
                  </div>
                </Radio.Button>
              );
            })}
          </Radio.Group>
        </Form.Item>

        {/* Section 5: Apply Policy */}
        <Form.Item name="applyImmediately" valuePropName="checked" className="mt-8">
          <div className="flex items-center justify-between bg-bg-page/40 p-4 rounded-card border border-border/60 hover:border-brand/30 transition-all cursor-pointer">
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-bold text-text-primary leading-tight">{t('selfhosted.workflowDeployment.applyImmediately')}</span>
              <span className="text-[11px] text-text-tertiary font-medium">{t('selfhosted.workflowDeployment.applyImmediatelyDesc')}</span>
            </div>
            <Switch className="bg-text-tertiary" />
          </div>
        </Form.Item>
      </Form>

      <style>{`
        .vf-telemetry-radio::before { display: none !important; }
        .ant-drawer-body { padding: 24px 32px !important; }
        .ant-input-number-input { height: 38px !important; line-height: 38px !important; }
      `}</style>
    </Drawer>
  );
};
