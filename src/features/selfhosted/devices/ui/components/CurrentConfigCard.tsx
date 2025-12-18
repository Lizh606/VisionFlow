
import React from 'react';
import { Button, Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import { Settings, History, Clock, User } from 'lucide-react';
import { VFTag } from '../../../../../shared/ui/VFTag';
import { VersionHistory } from '../../hooks/useWorkflowDeployment';

interface Props {
  version?: VersionHistory;
  onViewHistory: () => void;
}

/**
 * CurrentConfigCard - Redesigned as a Configuration Summary Header
 * Adheres to VisionFlow UI v1.0: Compact height (72-88px), padding (16-20px).
 * Simplified to only show the "Latest" tag in a neutral style.
 */
export const CurrentConfigCard: React.FC<Props> = ({ version, onViewHistory }) => {
  const { t } = useTranslation();
  if (!version) return null;

  return (
    <div className="bg-bg-card rounded-card border border-border px-5 h-[84px] flex items-center shadow-sm transition-all duration-300">
      <Flex justify="space-between" align="center" className="w-full">
        {/* Left Section: Icon and Information Stack */}
        <Flex align="center" gap={16} className="overflow-hidden">
          {/* Visual Anchor: Icon Block */}
          <div className="w-10 h-10 rounded-control bg-brand/5 border border-brand/10 flex items-center justify-center text-brand shrink-0">
            <Settings size={20} strokeWidth={2} />
          </div>

          {/* Textual Content Stack */}
          <div className="flex flex-col gap-0.5 overflow-hidden">
            {/* Main Title Row: Config Version + Single Latest Tag */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-base font-bold text-text-primary leading-tight">
                {t('selfhosted.deviceDetail.summary.configTitle')} {version.version}
              </span>
              <VFTag 
                variant="neutral" 
                filled={false} 
                className="h-5 text-[10px] px-2 font-bold opacity-60 border-border"
              >
                {t('selfhosted.workflowDeployment.latest')}
              </VFTag>
            </div>

            {/* Metadata Row: Time and Operator */}
            <div className="flex items-center gap-3 text-[12px] text-text-secondary font-medium mt-1">
              <div className="flex items-center gap-1.5">
                <Clock size={13} className="text-text-tertiary opacity-60" />
                <span>
                  {t('selfhosted.workflowDeployment.lastUpdated')}: 
                  <span className="ml-1 text-text-tertiary font-normal">{version.timestamp}</span>
                </span>
              </div>
              
              <span className="text-text-tertiary opacity-30 select-none">{"\u00b7"}</span>
              
              <div className="flex items-center gap-1.5">
                <User size={13} className="text-text-tertiary opacity-60" />
                <span>
                  {t('selfhosted.workflowDeployment.operator')}: 
                  <span className="ml-1 text-text-tertiary font-normal">{version.user}</span>
                </span>
              </div>
            </div>
          </div>
        </Flex>

        {/* Right Section: Ghost Button Entry */}
        <div className="shrink-0">
          <Button 
            icon={<History size={15} />} 
            onClick={onViewHistory}
            className="
              h-9 flex items-center gap-2 px-4
              text-text-secondary border-border bg-transparent
              hover:!text-brand hover:!border-brand hover:!bg-brand/5
              rounded-control transition-all font-semibold text-[13px]
            "
          >
            {t('selfhosted.workflowDeployment.viewHistory')}
          </Button>
        </div>
      </Flex>
    </div>
  );
};
