
import React from 'react';
import { Tooltip, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Template } from './WorkflowTemplateModal';
import { VFTag } from '../../../shared/ui/VFTag';

interface Props {
  template: Template;
}

const VFModelRow: React.FC<{ modelName: string; isDefault?: boolean }> = ({ modelName, isDefault = true }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h4 className="m-0 text-[13px] font-bold text-text-primary leading-tight">
          Model
        </h4>
        <span className="text-[12px] text-text-tertiary font-medium opacity-70">
          {t('workflows.templates.pickModel')}
        </span>
      </div>

      <div className="
        flex items-center justify-between gap-4 py-3 px-1 
        border-b border-divider/40 hover:bg-brand/[0.02] 
        transition-all duration-200 group rounded-control
      ">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Tooltip title={modelName}>
            <span className="text-[13px] font-semibold text-text-primary truncate">
              {modelName}
            </span>
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
        <h3 className="m-0 text-[11px] font-bold text-text-tertiary uppercase tracking-[0.15em] opacity-60">
          {t('workflows.templates.customize')}
        </h3>
      </div>

      <div className="mb-8">
        <p className="m-0 text-[12px] text-text-secondary leading-[1.6] font-medium">
          {t('workflows.templates.customizeDesc')}
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {template.requiresModel ? (
          <VFModelRow modelName="rf-detr-nano-v2.1" isDefault={true} />
        ) : (
          <div className="flex flex-col gap-3">
             <div className="flex flex-col gap-1">
              <h4 className="m-0 text-[13px] font-bold text-text-primary leading-tight">
                Model
              </h4>
              <span className="text-[12px] text-text-tertiary font-medium opacity-70">
                {t('workflows.templates.noConfig')}
              </span>
            </div>
            <p className="m-0 text-[11px] text-text-tertiary italic leading-relaxed px-1">
              {t('workflows.templates.noConfigDesc')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
