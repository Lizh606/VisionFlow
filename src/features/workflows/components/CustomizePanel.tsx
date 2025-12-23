
import React from 'react';
import { Tooltip, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Template } from './WorkflowTemplateModal';
import { VFTag } from '../../../shared/ui/VFTag';
import { VFText } from '../../../ui/VFText';

interface Props {
  template: Template;
}

const VFModelRow: React.FC<{ modelName: string; isDefault?: boolean }> = ({ modelName, isDefault = true }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        {/* V1.4: Field Label = T5 Body Strong */}
        <VFText variant="t5-strong" color="primary">Model</VFText>
        {/* V1.4: Meta Hint = T6 Caption */}
        <VFText variant="t6" color="tertiary" className="opacity-70">
          {t('workflows.templates.pickModel')}
        </VFText>
      </div>

      <div className="
        flex items-center justify-between gap-4 py-3 px-1 
        border-b border-divider/40 hover:bg-brand/[0.02] 
        transition-all duration-200 group rounded-control
      ">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Tooltip title={modelName}>
            <VFText variant="t5-strong" color="primary" truncate>
              {modelName}
            </VFText>
          </Tooltip>
          {isDefault && (
            <VFTag 
              variant="neutral" 
              className="h-4.5 px-1.5 text-[8px] font-bold opacity-50 bg-bg-page border-divider" 
              filled={false}
            >
              DEFAULT
            </VFTag>
          )}
        </div>
        
        <Button 
          size="small"
          className="
            shrink-0 flex items-center justify-center 
            w-[88px] h-8 rounded-[10px] border border-border 
            text-[12px] font-bold text-text-secondary bg-transparent
            hover:!border-brand hover:!text-brand transition-all
          "
        >
          {t('common.choose')}
        </Button>
      </div>
    </div>
  );
};

export const CustomizePanel: React.FC<Props> = ({ template }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="mb-2">
        <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-[0.15em] opacity-60">
          {t('workflows.templates.customize')}
        </VFText>
      </div>

      <div className="mb-8">
        {/* V1.4: Main Description = T5 Body */}
        <VFText variant="t5" color="secondary" className="leading-[1.6]">
          {t('workflows.templates.customizeDesc')}
        </VFText>
      </div>

      <div className="flex flex-col gap-10">
        {template.requiresModel ? (
          <VFModelRow modelName="rf-detr-nano-v2.1" isDefault={true} />
        ) : (
          <div className="flex flex-col gap-3">
             <div className="flex flex-col gap-1">
              <VFText variant="t5-strong" color="primary">Model</VFText>
              <VFText variant="t6" color="tertiary" className="opacity-70">
                {t('workflows.templates.noConfig')}
              </VFText>
            </div>
            <VFText variant="t6" color="tertiary" className="italic italic leading-relaxed px-1">
              {t('workflows.templates.noConfigDesc')}
            </VFText>
          </div>
        )}
      </div>
    </div>
  );
};
