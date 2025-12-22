
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

export const CurrentConfigCard: React.FC<Props> = ({ version, onViewHistory }) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  if (!version) return null;

  return (
    <div className={`
      bg-bg-card rounded-card border border-border px-5 flex items-center shadow-sm transition-all duration-300
      ${isMobile ? 'py-4' : 'h-[92px]'}
    `}>
      <Flex justify="space-between" align="center" className="w-full">
        <Flex align="center" gap={16} className="overflow-hidden">
          <div className="w-11 h-11 rounded-control bg-brand/5 border border-brand/10 flex items-center justify-center text-brand shrink-0">
            <Settings size={22} strokeWidth={2} />
          </div>

          <div className="flex flex-col gap-1 overflow-hidden">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-base font-bold text-text-primary leading-tight">
                {isMobile ? version.version : `${t('selfhosted.deviceDetail.summary.configTitle')} ${version.version}`}
              </span>
              <VFTag 
                variant="neutral" 
                filled={false} 
                className="h-5 text-[10px] px-2 font-bold opacity-60 border-border"
              >
                {t('selfhosted.workflowDeployment.latest')}
              </VFTag>
            </div>

            {!isMobile && (
              <div className="flex items-center gap-4 text-xs text-text-secondary font-medium">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-text-tertiary opacity-60" />
                  <span>
                    {t('selfhosted.workflowDeployment.lastUpdated')}: 
                    <span className="ml-1 text-text-tertiary font-normal">{version.timestamp}</span>
                  </span>
                </div>
                
                <span className="text-text-tertiary opacity-30 select-none">{"\u00b7"}</span>
                
                <div className="flex items-center gap-1.5">
                  <User size={14} className="text-text-tertiary opacity-60" />
                  <span>
                    {t('selfhosted.workflowDeployment.operator')}: 
                    <span className="ml-1 text-text-tertiary font-normal">{version.user}</span>
                  </span>
                </div>
              </div>
            )}
            
            {isMobile && (
              <div className="text-xs text-text-tertiary font-medium">
                {version.timestamp}
              </div>
            )}
          </div>
        </Flex>

        <div className="shrink-0 ml-4">
          <Button 
            icon={<History size={16} />} 
            onClick={onViewHistory}
            className={`
              flex items-center gap-2 transition-all font-bold
              text-text-secondary border-border bg-transparent
              hover:!text-brand hover:!border-brand hover:!bg-brand/5
              rounded-control
              ${isMobile ? 'h-9 px-3 text-xs' : 'h-10 px-5 text-sm'}
            `}
          >
            {!isMobile && t('selfhosted.workflowDeployment.viewHistory')}
          </Button>
        </div>
      </Flex>
    </div>
  );
};
