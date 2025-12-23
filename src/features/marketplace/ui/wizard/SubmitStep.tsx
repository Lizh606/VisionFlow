
import React from 'react';
import { Button } from 'antd';
import { Eye, Info, FileSearch } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  listingId?: string;
  onPreview: () => void;
}

export const SubmitStep: React.FC<Props> = ({ listingId, onPreview }) => {
  const { t } = useTranslation();

  return (
    <div className="animate-in fade-in flex flex-col gap-10">
      {/* 1. 状态引导区 - 使用中性语义图标 */}
      <div className="flex flex-col items-center py-10 bg-bg-page/20 rounded-card border border-border">
        <div className="w-16 h-16 rounded-full bg-brand/5 border border-brand/10 flex items-center justify-center text-brand mb-6">
          <FileSearch size={32} strokeWidth={1.5} />
        </div>
        {/* T2 Page Title (24px) */}
        <h3 className="text-[24px] font-semibold text-text-primary m-0 tracking-tight">
          {t('marketplace.seller.wizard.submitTitle')}
        </h3>
        {/* T5 Body (14px) */}
        <p className="text-[14px] text-text-secondary mt-3 max-w-[480px] text-center leading-relaxed font-normal opacity-80">
          {t('marketplace.seller.wizard.submitDesc')}
        </p>
      </div>

      {/* 2. 预览入口区 - 对齐 UC 要求：Preview (Buyer perspective) */}
      <div className="flex flex-col gap-4 px-1">
        <div className="flex flex-col gap-1 border-l-[3px] border-brand pl-4 mb-2">
          <h4 className="text-[16px] font-bold text-text-primary m-0 uppercase tracking-tight">
            {t('marketplace.seller.wizard.previewSection')}
          </h4>
          <span className="text-[12px] text-text-tertiary font-bold uppercase tracking-wider">
            {t('marketplace.seller.wizard.previewHint')}
          </span>
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
              <span className="text-[15px] font-bold text-text-primary group-hover:text-brand transition-colors">
                {t('marketplace.seller.wizard.openPreview')}
              </span>
              <span className="text-[13px] text-text-secondary font-medium opacity-70">
                {t('marketplace.seller.wizard.viewAsBuyer')}
              </span>
            </div>
          </div>
          <Button 
            className="rounded-control font-bold text-xs h-9 px-4 border-divider text-text-secondary group-hover:border-brand group-hover:text-brand"
          >
            {t('marketplace.seller.wizard.launchPreview')}
          </Button>
        </div>
      </div>

      {/* 3. 审核流程说明 - T5 Body Strong */}
      <div className="mt-2 p-5 rounded-card border border-divider bg-bg-page/40 flex items-start gap-4">
        <Info size={18} className="text-text-tertiary shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1.5">
          <span className="text-[14px] font-bold text-text-primary">
            {t('marketplace.seller.wizard.workflowTitle')}
          </span>
          <p className="text-[13px] text-text-secondary m-0 leading-relaxed font-medium">
            {t('marketplace.seller.wizard.workflowDesc')}
          </p>
        </div>
      </div>
    </div>
  );
};
