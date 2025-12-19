import React, { useEffect, useMemo, useState } from 'react';
import { Drawer, Form, Input, Select, Switch, Button, Radio, Alert, Space, Tooltip } from 'antd';
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

/**
 * 规范适配层：Section
 * 固化区块间距与对齐
 */
interface SectionProps {
  title: string;
  subtitle?: string;
  icon: any;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, subtitle, icon: Icon, children }) => (
  <div className="flex flex-col gap-4 mb-8 sm:mb-10 last:mb-0">
    <div className="flex items-center gap-3 border-b border-divider pb-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-control bg-bg-page border border-border text-text-secondary shrink-0">
        <Icon size={16} strokeWidth={2} />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[14px] font-bold text-text-primary uppercase tracking-wider leading-none mb-1">
          {title}
        </span>
        {subtitle && <span className="text-[11px] text-text-tertiary font-medium truncate">{subtitle}</span>}
      </div>
    </div>
    <div className="px-0 sm:px-1">{children}</div>
  </div>
);

/**
 * 精致化重构组件：TelemetryLevelOption
 */
const TelemetryLevelCard = ({ icon: Icon, title, desc, recommended, active }: any) => (
  <div className={`
    relative flex items-center gap-3.5 p-4 rounded-card border transition-all cursor-pointer select-none h-full w-full
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
        <span className={`text-[14px] font-bold leading-none ${active ? 'text-brand' : 'text-text-primary'}`}>
          {title}
        </span>
        {recommended && (
          <VFTag variant="brand" className="h-4 px-1.5 text-[9px] font-bold opacity-80" filled={false}>
            推荐
          </VFTag>
        )}
      </div>
      <p className="text-[12px] text-text-tertiary leading-snug line-clamp-2 m-0 font-medium opacity-80">
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
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-[17px] text-text-primary leading-tight">
              {isEdit ? t('selfhosted.workflowDeployment.editTitle') : t('selfhosted.workflowDeployment.createTitle')}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-text-tertiary font-bold tracking-wider uppercase opacity-60">Stream ID:</span>
              <span className="text-[11px] font-mono font-bold text-text-secondary">
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
            <div className="px-6 py-2.5 bg-warning/5 border-b border-warning/10 flex items-center gap-3">
              <AlertCircle size={14} className="text-warning shrink-0" />
              <span className="text-[12px] font-medium text-warning-700">
                某些更改可能会在保存后导致流重启
              </span>
            </div>
          )}
          
          <div className="flex items-center justify-between px-6 py-4">
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
        <Section title={t('selfhosted.workflowDeployment.basicInfo')} icon={Info} subtitle="设置设备标识与发现信息">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0 sm:gap-y-2">
            <Form.Item 
              label={<span className="text-[13px] font-bold">{t('selfhosted.workflowDeployment.nameLabel')}</span>} 
              name="name" 
              rules={[{ required: true, message: t('selfhosted.workflowDeployment.nameRequired') }]}
              className="mb-5 sm:mb-4"
            >
              <Input placeholder={t('selfhosted.workflowDeployment.namePlaceholder')} className="h-11" allowClear />
            </Form.Item>
            <Form.Item 
              label={<span className="text-[13px] font-bold">Stream ID</span>} 
              className="mb-5 sm:mb-4 opacity-70"
            >
              <Input value={isEdit ? initialValues?.id : "AUTO"} disabled className="h-11 font-mono" />
            </Form.Item>
          </div>
        </Section>

        <Section title={t('selfhosted.workflowDeployment.inputSource')} icon={Network} subtitle="配置连接协议与源地址详情">
          <div className="bg-bg-page/40 p-4 sm:p-5 rounded-card border border-border flex flex-col gap-6">
            <Form.Item label={<span className="text-[13px] font-bold">{t('selfhosted.workflowDeployment.sourceType')}</span>} name="type" className="mb-0">
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
              label={<span className="text-[13px] font-bold">{t('selfhosted.workflowDeployment.endpoint')}</span>} 
              name="endpoint" 
              rules={[{ required: true, message: t('selfhosted.workflowDeployment.endpointRequired') }]}
              className="mb-0"
            >
              {sourceType === 'RTSP' ? (
                <Input.Password 
                  placeholder="rtsp://admin:****@192.168.1.1:554/ch1" 
                  className="h-11 font-mono text-[13px]" 
                  iconRender={visible => (visible ? <Eye size={18} /> : <EyeOff size={18} />)}
                />
              ) : (
                <Input placeholder={sourceType === 'FILE' ? "/data/recordings/clip_01.mp4" : "https://api.visionflow.io/ingest/..."} className="h-11 font-mono" />
              )}
            </Form.Item>
          </div>
        </Section>

        <Section title={t('selfhosted.workflowDeployment.workflowBinding')} icon={Database} subtitle="为此数据流分配视觉处理逻辑">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0 sm:gap-y-2">
            <Form.Item label={<span className="text-[13px] font-bold">{t('selfhosted.workflowDeployment.selectWorkflow')}</span>} name="workflowId" rules={[{ required: true }]} className="mb-5 sm:mb-6">
              <Select 
                showSearch
                className="h-11 w-full"
                placeholder={t('selfhosted.workflowDeployment.selectWorkflowPlaceholder')} 
                options={[
                  { value: 'wf_crowd_01', label: '人流量分析 (Crowd Analysis)' },
                  { value: 'wf_ppe_05', label: '安防合规 (PPE Compliance)' }
                ]} 
              />
            </Form.Item>
            
            <div className="flex flex-col gap-0 sm:gap-6 mb-5 sm:mb-6">
              <Form.Item label={<span className="text-[13px] font-bold">{t('selfhosted.workflowDeployment.versionStrategy')}</span>} name="strategy" className="mb-2 sm:mb-0">
                <Radio.Group className="vf-radio-group-refined w-full grid grid-cols-2 gap-2">
                  <Radio.Button value="LATEST">最新稳定</Radio.Button>
                  <Radio.Button value="SPECIFIC">指定版本</Radio.Button>
                </Radio.Group>
              </Form.Item>
              
              {strategy === 'SPECIFIC' && (
                <Form.Item name="version" rules={[{ required: true }]} className="animate-in slide-in-from-top-2 duration-200 mb-0">
                  <Select 
                    placeholder="选择版本..."
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

        <Section title={t('selfhosted.workflowDeployment.runPolicy')} icon={Zap} subtitle="运行时性能与遙测指标设置">
          <div className="flex flex-col gap-6">
            <Form.Item label={<span className="text-[13px] font-bold">{t('selfhosted.workflowDeployment.concurrency')}</span>} name="concurrency" className="mb-0 max-w-full sm:max-w-[200px]">
              <Input type="number" min={1} max={10} className="h-11 font-bold text-center" suffix="实例" />
            </Form.Item>

            <div className="flex flex-col gap-3">
              <span className="text-[13px] font-bold text-text-secondary">{t('selfhosted.workflowDeployment.telemetryGranularity')}</span>
              <Form.Item name="telemetry" className="mb-0">
                <Radio.Group className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch">
                  {[
                    { value: 'HEARTBEAT', title: '仅心跳', desc: '仅上报在线/离线状态，资源占用最低', icon: ShieldCheck },
                    { value: 'METRICS', title: '性能指标', desc: '包含吞吐量、延迟、FPS 等关键指标', icon: Activity, recommended: true },
                    { value: 'DIAGNOSTIC', title: '诊断遥测', desc: '包含完整链路追踪，资源消耗较高', icon: Video },
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

            <div className="p-4 rounded-card border border-brand/10 bg-brand/5 flex items-start gap-3 mb-4">
              <div className="pt-0.5 text-brand"><AlertCircle size={16} /></div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[13px] font-bold text-text-primary">{t('selfhosted.workflowDeployment.applyImmediately')}</span>
                  <Form.Item name="applyImmediately" valuePropName="checked" className="mb-0">
                    <Switch size="small" />
                  </Form.Item>
                </div>
                <p className="text-[11px] text-text-tertiary font-medium m-0 leading-normal">
                  {t('selfhosted.workflowDeployment.applyImmediatelyDesc')}
                </p>
                {isEdit && (
                   <p className="text-[10px] text-brand font-bold mt-2 flex items-center gap-1">
                     <ChevronRight size={10} />
                     {!form.getFieldValue('applyImmediately') && "更改将在下次手动发布时生效"}
                   </p>
                )}
              </div>
            </div>
          </div>
        </Section>
      </Form>

      <style>{`
        .vf-form-refined .ant-form-item-label {
          padding-bottom: 6px !important;
        }

        .vf-form-refined .ant-form-item-label label {
          color: rgba(var(--vf-text-secondary), 1) !important;
          height: auto !important;
        }
        
        .vf-card-radio .ant-radio {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }

        .vf-card-radio.ant-radio-wrapper {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100% !important; /* 强制全宽以解决移动端不对齐问题 */
          margin-inline-end: 0 !important;
        }

        .ant-input, .ant-select-selector {
          border-color: rgba(var(--vf-border), 1) !important;
          transition: all 0.2s ease !important;
        }

        /* 修复单选按钮布局混乱 */
        .vf-radio-group-refined.ant-radio-group {
          display: grid !important;
        }

        .vf-radio-group-refined .ant-radio-button-wrapper::before {
          display: none !important; 
        }
        
        .vf-radio-group-refined .ant-radio-button-wrapper {
          height: 44px !important;
          padding: 0 12px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          border-inline-start-width: 1px !important; 
          border-radius: var(--vf-radius-control) !important;
          border: 1px solid rgba(var(--vf-border), 1) !important;
          transition: all 0.2s ease;
          background: var(--vf-bg-card);
        }

        /* 强制内部 span 居中并保持间距 */
        .vf-radio-group-refined .ant-radio-button-wrapper > span:not(.ant-radio-button) {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          font-weight: 700 !important;
          font-size: 13px !important;
          width: 100%;
        }

        .vf-radio-group-refined .ant-radio-button-wrapper-checked {
          border-color: rgba(var(--vf-brand), 1) !important;
          color: rgba(var(--vf-brand), 1) !important;
          background: rgba(var(--vf-brand), 0.04) !important;
          box-shadow: none !important;
          z-index: 1; 
        }
        
        @media (max-width: 768px) {
          /* 修复 Input 垂直错位：移除 flex 改用 padding/line-height 对齐 */
          .ant-input {
            height: 44px !important;
            padding: 4px 12px !important;
            line-height: 1.5 !important;
          }
          
          /* 带有 Icon 的输入框（如密码框） */
          .ant-input-affix-wrapper {
            height: 44px !important;
            padding: 4px 12px !important;
            display: flex !important;
            align-items: center !important;
          }
          
          .ant-input-affix-wrapper .ant-input {
            height: auto !important;
            line-height: inherit !important;
            padding: 0 !important;
          }

          /* 修复 Select 垂直错位 */
          .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
            height: 44px !important;
            padding: 0 11px !important;
            display: flex !important;
            align-items: center !important;
          }
          
          .ant-select-single .ant-select-selector .ant-select-selection-item,
          .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
             line-height: 42px !important; /* height - borders */
          }
          
          .ant-btn {
            min-height: 44px !important;
          }

          .vf-radio-group-refined.ant-radio-group {
             grid-template-columns: 1fr !important;
             gap: 8px !important;
          }
          
          /* 遥测级别在移动端强制垂直排列且等宽 */
          .ant-radio-group.grid-cols-1 {
            grid-template-columns: 1fr !important;
            width: 100% !important;
          }
        }
      `}</style>
    </Drawer>
  );
};