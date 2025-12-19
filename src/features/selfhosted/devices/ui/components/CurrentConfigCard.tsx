
import React from 'react';
import { Button, Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import { Settings, History, Clock, User } from 'lucide-react';
import { VFTag } from '../../../../../shared/ui/VFTag';
import { VersionHistory } from '../../hooks/useWorkflowDeployment';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';

interface Props {
  version?: VersionHistory;
  onViewHistory: () => void;
}

/**
 * CurrentConfigCard - Redesigned as a Configuration Summary Header
 * Mobile Responsive adaptation included.
 */
export const CurrentConfigCard: React.FC<Props> = ({ version, onViewHistory }) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  if (!version) return null;

  return (
    <div className={`
      bg-bg-card rounded-card border border-border px-4 sm:px-5 flex items-center shadow-sm transition-all duration-300
      ${isMobile ? 'py-3' : 'h-[84px]'}
    `}>
      <Flex justify="space-between" align="center" className="w-full">
        {/* Left Section: Icon and Information Stack */}
        <Flex align="center" gap={isMobile ? 12 : 16} className="overflow-hidden">
          {/* Visual Anchor: Icon Block - Hidden or smaller on mobile to save space if needed */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-control bg-brand/5 border border-brand/10 flex items-center justify-center text-brand shrink-0">
            <Settings size={isMobile ? 18 : 20} strokeWidth={2} />
          </div>

          {/* Textual Content Stack */}
          <div className="flex flex-col gap-0.5 overflow-hidden">
            {/* Main Title Row: Config Version + Single Latest Tag */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm sm:text-base font-bold text-text-primary leading-tight">
                {isMobile ? version.version : `${t('selfhosted.deviceDetail.summary.configTitle')} ${version.version}`}
              </span>
              <VFTag 
                variant="neutral" 
                filled={false} 
                className="h-4.5 text-[9px] px-1.5 font-bold opacity-60 border-border"
              >
                {t('selfhosted.workflowDeployment.latest')}
              </VFTag>
            </div>

            {/* Metadata Row: Hide on smallest screens, simplified on mobile */}
            {!isMobile && (
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
            )}
            
            {isMobile && (
              <div className="text-[11px] text-text-tertiary font-medium">
                {version.timestamp}
              </div>
            )}
          </div>
        </Flex>

        {/* Right Section: Ghost Button Entry */}
        <div className="shrink-0 ml-2">
          <Button 
            icon={<History size={isMobile ? 14 : 15} />} 
            onClick={onViewHistory}
            className={`
              flex items-center gap-2 transition-all font-semibold
              text-text-secondary border-border bg-transparent
              hover:!text-brand hover:!border-brand hover:!bg-brand/5
              rounded-control
              ${isMobile ? 'h-8 px-2.5 text-[11px]' : 'h-9 px-4 text-[13px]'}
            `}
          >
            {!isMobile && t('selfhosted.workflowDeployment.viewHistory')}
          </Button>
        </div>
      </Flex>
    </div>
  );
};
