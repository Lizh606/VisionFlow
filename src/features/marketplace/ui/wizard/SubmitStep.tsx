
import React from 'react';
import { Button } from 'antd';
import { Eye, Info, FileSearch } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFText } from '../../../../ui/VFText';

interface Props {
  listingId?: string;
  onPreview: () => void;
}

export const SubmitStep: React.FC<Props> = ({ listingId, onPreview }) => {
  const { t } = useTranslation();

  return (
    <div className="animate-in fade-in flex flex-col gap-10">
      {/* 1. 状态引导区 */}
      <div className="flex flex-col items-center py-12 bg-bg-page/20 rounded-card border border-border">
        <div className="w-16 h-16 rounded-full bg-brand/5 border border-brand/10 flex items-center justify-center text-brand mb-6">
          <FileSearch size={32} strokeWidth={1.5} />
        </div>
        {/* V1.4: T2 Page Title (24px) */}
        <VFText variant="t2" color="primary" className="m-0 tracking-tight">
          {t('marketplace.seller.wizard.submitTitle')}
        </VFText>
        {/* V1.4: T5 Body (14px) */}
        <VFText variant="t5" color="secondary" className="mt-3 max-w-[480px] text-center leading-relaxed font-normal opacity-80 block">
          {t('marketplace.seller.wizard.submitDesc')}
        </VFText>
      </div>

      {/* 2. 预览入口区 */}
      <div className="flex flex-col gap-4 px-1">
        <div className="flex flex-col gap-1 border-l-[3px] border-brand pl-4 mb-2">
          {/* V1.4: Section Subhead = T4 (16px) */}
          <VFText variant="t4" color="primary" className="m-0 uppercase tracking-tight block">
            {t('marketplace.seller.wizard.previewSection')}
          </VFText>
          <VFText variant="t6" color="tertiary" className="font-bold uppercase tracking-wider block">
            {t('marketplace.seller.wizard.previewHint')}
          </VFText>
        </div>

        <div 
          onClick={onPreview}
          className="
            group flex items-center justify-between p-6 rounded-card border border-border bg-bg-card
            hover:border-brand/40 hover:bg-brand/[0.01] transition-all cursor-pointer shadow-sm
          "
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-control bg-bg-page border border-border flex items-center justify-center text-text-tertiary group-hover:bg-brand/10 group-hover:text-brand transition-colors">
              <Eye size={24} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-0.5">
              {/* V1.4: Card Item Title = T5 Strong */}
              <VFText variant="t5-strong" color="primary" className="group-hover:text-brand transition-colors text-[15px]">
                {t('marketplace.seller.wizard.openPreview')}
              </VFText>
              <VFText variant="t6" color="secondary" className="font-medium opacity-70">
                {t('marketplace.seller.wizard.viewAsBuyer')}
              </VFText>
            </div>
          </div>
          <Button 
            className="rounded-control font-bold text-[11px] h-9 px-4 border-divider text-text-secondary group-hover:border-brand group-hover:text-brand uppercase"
          >
            {t('marketplace.seller.wizard.launchPreview')}
          </Button>
        </div>
      </div>

      {/* 3. 审核流程说明 */}
      <div className="mt-2 p-5 rounded-card border border-divider bg-bg-page/40 flex items-start gap-4">
        <Info size={18} className="text-text-tertiary shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1.5">
          <VFText variant="t5-strong" color="primary">
            {t('marketplace.seller.wizard.workflowTitle')}
          </VFText>
          <VFText variant="t6" color="secondary" className="m-0 leading-relaxed font-medium">
            {t('marketplace.seller.wizard.workflowDesc')}
          </VFText>
        </div>
      </div>
    </div>
  );
};
