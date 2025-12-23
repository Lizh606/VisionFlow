
import React, { useState, useEffect } from 'react';
import { Steps, Button, Form, App, Divider } from 'antd';
import { ChevronRight, Save, Send, Layout, Database, Image as ImageIcon, Package, Check, LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { sellerService } from '../services/sellerService';

// 子步骤组件导入
import { GeneralStep } from './wizard/GeneralStep';
import { SourceStep } from './wizard/SourceStep';
import { ArtifactsStep } from './wizard/ArtifactsStep';
import { PricingStep } from './wizard/PricingStep';
import { SubmitStep } from './wizard/SubmitStep';

const STEP_CONFIG = [
  { title: 'General', icon: Layout },
  { title: 'Source', icon: Database },
  { title: 'Artifacts', icon: ImageIcon },
  { title: 'Pricing', icon: Package },
  { title: 'Submit', icon: Send },
];

const StepIcon: React.FC<{ index: number; current: number; icon: LucideIcon }> = ({ index, current, icon: IconComponent }) => {
  const isCompleted = index < current;
  const isActive = index === current;
  return (
    <div className="flex items-center justify-center w-full h-full">
      {isCompleted ? (
        <Check size={18} strokeWidth={2.5} className="text-brand animate-in zoom-in-50 duration-300" />
      ) : (
        <IconComponent size={18} strokeWidth={2} className={`transition-colors duration-300 ${isActive ? 'text-brand' : 'text-text-tertiary'}`} />
      )}
    </div>
  );
};

export const MarketplaceSellerWizard: React.FC<{ listingId?: string; onNavigate: (p: string) => void }> = ({ listingId, onNavigate }) => {
  const { t } = useTranslation();
  const { message, modal } = App.useApp();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    if (listingId) {
      sellerService.getListing(listingId).then(data => {
        if (data) {
          form.setFieldsValue(data);
        }
      });
    }
  }, [listingId, form]);

  const handleBackToMyListings = () => {
    if (isDirty) {
      modal.confirm({
        title: t('common.unsavedTitle'),
        content: t('common.unsavedDesc'),
        okText: t('common.discard'),
        cancelText: t('common.keepEditing'),
        okType: 'danger',
        onOk: () => onNavigate('marketplace-seller'),
      });
    } else {
      onNavigate('marketplace-seller');
    }
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setLastSaved(new Date().toLocaleTimeString());
    setIsDirty(false);
    setLoading(false);
    message.success("Draft saved successfully");
  };

  const handleNext = async () => {
    try {
      await form.validateFields();
      setCurrent(current + 1);
    } catch (e) {}
  };

  const renderStepContent = () => {
    switch (current) {
      case 0: return <GeneralStep />;
      case 1: return <SourceStep />;
      case 2: return <ArtifactsStep />;
      case 3: return <PricingStep />;
      case 4: return <SubmitStep />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1000px] mx-auto pb-32 animate-in fade-in">
      <VFPageHeader 
        title={listingId ? "Resource Editor" : "New Listing"}
        onBack={handleBackToMyListings}
        actions={
          <div className="flex items-center gap-4">
            {lastSaved && <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">{t('common.lastSaved', { time: lastSaved })}</span>}
            <Button 
              loading={loading}
              icon={<Save size={16} />} 
              className="font-bold rounded-control border-brand text-brand hover:bg-brand/5 h-10 px-5 shadow-sm" 
              onClick={handleSaveDraft}
            >
              Save Draft
            </Button>
          </div>
        }
      />

      <div className="bg-bg-card border border-border rounded-card p-8 md:p-12 shadow-card">
        <Steps 
          current={current} 
          className="mb-16 vf-wizard-steps"
          items={STEP_CONFIG.map((s, idx) => ({
            title: <span className="step-label">{s.title}</span>,
            icon: <StepIcon index={idx} current={current} icon={s.icon} />
          }))}
        />

        <Form 
          form={form} 
          layout="vertical" 
          className="min-h-[460px] vf-form-wizard"
          onValuesChange={() => setIsDirty(true)}
          requiredMark={false}
          scrollToFirstError
        >
          {renderStepContent()}
        </Form>

        <Divider className="my-12 opacity-30" />

        <div className="flex items-center justify-between">
          <Button 
            className="h-12 px-8 font-bold border-none text-text-tertiary hover:text-text-primary hover:bg-bg-page transition-all rounded-control"
            disabled={current === 0}
            onClick={() => setCurrent(current - 1)}
          >
            Back
          </Button>
          
          <div className="flex items-center gap-4">
             {current < STEP_CONFIG.length - 1 ? (
               <Button 
                 type="primary" 
                 className="h-12 px-12 font-bold shadow-md rounded-control flex items-center gap-2 group transition-all" 
                 onClick={handleNext}
               >
                 Next Step <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
               </Button>
             ) : (
               <Button 
                type="primary" 
                className="h-12 px-16 font-bold shadow-lg rounded-control bg-success border-success hover:!bg-success/90 flex items-center gap-2" 
                loading={loading} 
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    message.success("Submission successful! Redirecting...");
                    onNavigate('marketplace-seller');
                  }, 1500);
                }}
               >
                 <Send size={18} /> Submit for Review
               </Button>
             )}
          </div>
        </div>
      </div>

      <style>{`
        .vf-wizard-steps .ant-steps-item-title { font-weight: 500 !important; font-size: 14px !important; color: rgba(var(--vf-text-secondary), 1) !important; }
        .vf-wizard-steps .ant-steps-item-active .ant-steps-item-title { color: rgba(var(--vf-brand), 1) !important; font-weight: 600 !important; }
        .vf-wizard-steps .ant-steps-item-icon { background: transparent !important; border: none !important; width: 32px !important; height: 32px !important; }
        .vf-wizard-steps .ant-steps-item-tail::after { background-color: rgba(var(--vf-divider), 1) !important; height: 2px !important; }
        .vf-wizard-steps .ant-steps-item-finish .ant-steps-item-tail::after { background-color: rgba(var(--vf-brand), 1) !important; }
        .vf-label { font-size: 13px; font-weight: 700; color: rgba(var(--vf-text-secondary), 1); text-transform: uppercase; tracking: -0.01em; }
        .vf-form-wizard .ant-form-item-label { padding-bottom: 8px !important; }
      `}</style>
    </div>
  );
};
