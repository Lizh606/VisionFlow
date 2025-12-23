
import React, { useState, useEffect, useMemo } from 'react';
import { Steps, Button, Form, App, Divider } from 'antd';
import { ChevronRight, Save, Send, Layout, Database, Image as ImageIcon, Package, Check, LucideIcon, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { sellerService } from '../services/sellerService';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import { VFText } from '../../../ui/VFText';

// Steps
import { GeneralStep } from './wizard/GeneralStep';
import { SourceStep } from './wizard/SourceStep';
import { ArtifactsStep } from './wizard/ArtifactsStep';
import { PricingStep } from './wizard/PricingStep';
import { SubmitStep } from './wizard/SubmitStep';

const StepIcon: React.FC<{ index: number; current: number; icon: LucideIcon }> = ({ index, current, icon: IconComponent }) => {
  const isCompleted = index < current;
  const isActive = index === current;
  return (
    <div className="flex items-center justify-center w-full h-full">
      {isCompleted ? (
        <Check size={18} strokeWidth={3} className="text-brand" />
      ) : (
        <IconComponent size={18} strokeWidth={2} className={isActive ? 'text-brand' : 'text-text-tertiary'} />
      )}
    </div>
  );
};

export const MarketplaceSellerWizard: React.FC<{ listingId?: string; onNavigate: (p: string) => void }> = ({ listingId, onNavigate }) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  const { message, modal, notification } = App.useApp();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const STEP_CONFIG = useMemo(() => [
    { title: t('marketplace.seller.wizard.steps.general'), icon: Layout },
    { title: t('marketplace.seller.wizard.steps.source'), icon: Database },
    { title: t('marketplace.seller.wizard.steps.artifacts'), icon: ImageIcon },
    { title: t('marketplace.seller.wizard.steps.pricing'), icon: Package },
    { title: t('marketplace.seller.wizard.steps.submit'), icon: Send },
  ], [t]);

  useEffect(() => {
    if (listingId) {
      sellerService.getListing(listingId).then(data => data && form.setFieldsValue(data));
    }
  }, [listingId, form]);

  const handleBack = () => {
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
    message.success(t('marketplace.seller.wizard.draftSaved'));
  };

  const handleNext = async () => {
    try {
      await form.validateFields();
      setCurrent(current + 1);
      window.scrollTo(0, 0);
    } catch (e) {}
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await sellerService.submitForReview(listingId || 'draft');
      notification.success({ 
        message: t('marketplace.seller.wizard.submitted'), 
        description: t('marketplace.seller.notices.reviewing') 
      });
      onNavigate('marketplace-seller');
    } catch (e) {
      modal.error({ title: t('common.retry') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1200px] mx-auto pb-32 animate-in fade-in">
      <VFPageHeader 
        title={listingId ? t('marketplace.seller.wizard.editTitle') : t('marketplace.seller.wizard.newTitle')}
        onBack={handleBack}
        actions={
          <div className="flex items-center gap-4">
            {lastSaved && !isMobile && (
              /* V1.4: Meta Hint = T6 Caption */
              <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-wider">
                {t('common.lastSaved', { time: lastSaved })}
              </VFText>
            )}
            <Button 
              loading={loading}
              icon={<Save size={16} />} 
              className="font-bold rounded-control border-brand text-brand hover:bg-brand/5 h-10 px-5" 
              onClick={handleSaveDraft}
            >
              {isMobile ? '' : t('common.save')}
            </Button>
          </div>
        }
      />

      <div className={`bg-bg-card border border-border rounded-card shadow-sm ${isMobile ? 'p-4' : 'p-8'}`}>
        <div className="mb-10 pt-4 overflow-x-auto custom-scrollbar no-scrollbar">
          <Steps 
            current={current} 
            responsive={false}
            size={isMobile ? 'small' : 'default'}
            labelPlacement={isMobile ? 'vertical' : 'horizontal'}
            items={STEP_CONFIG.map((s, idx) => ({
              /* V1.4: Step Label = T6 Body Strong */
              title: isMobile && current !== idx ? '' : <VFText variant="t5-strong" color={current >= idx ? 'primary' : 'disabled'} className="text-[13px]">{s.title}</VFText>,
              icon: <StepIcon index={idx} current={current} icon={s.icon} />
            }))}
          />
        </div>

        <Form 
          form={form} 
          layout="vertical" 
          onValuesChange={() => setIsDirty(true)}
          requiredMark={false}
          className="min-h-[400px]"
        >
          {current === 0 && <GeneralStep />}
          {current === 1 && <SourceStep />}
          {current === 2 && <ArtifactsStep />}
          {current === 3 && <PricingStep />}
          {current === 4 && <SubmitStep listingId={listingId} onPreview={() => listingId && onNavigate(`marketplace-listing-preview-${listingId}`)} />}
        </Form>

        <Divider className="my-8 opacity-40" />

        <div className="flex items-center justify-between">
          <Button 
            className="h-11 px-6 font-bold border-none text-text-tertiary hover:text-text-primary hover:bg-bg-page transition-all flex items-center gap-2"
            disabled={current === 0}
            onClick={() => setCurrent(current - 1)}
          >
            <ArrowLeft size={16} /> {t('marketplace.seller.wizard.backBtn')}
          </Button>
          
          {current < STEP_CONFIG.length - 1 ? (
             <Button 
               type="primary" 
               className="h-11 px-10 font-bold shadow-sm rounded-control flex items-center gap-2" 
               onClick={handleNext}
             >
               {t('marketplace.seller.wizard.nextBtn')} <ChevronRight size={18} />
             </Button>
           ) : (
             <Button 
               type="primary" 
               className="h-11 px-12 font-bold shadow-md rounded-control bg-brand border-brand" 
               loading={loading} 
               onClick={handleSubmit}
             >
               <Send size={18} className="mr-2" /> {t('marketplace.seller.wizard.submitBtn')}
             </Button>
           )}
        </div>
      </div>
    </div>
  );
};
