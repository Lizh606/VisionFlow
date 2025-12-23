
import React from 'react';
import { Button, Avatar, Tooltip } from 'antd';
import { HelpCircle, UserPlus, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import { VFText } from '../../../ui/VFText';

interface Props {
  title: string;
  folderName?: string | null;
  onBack?: () => void;
}

export const WorkflowsPageHeader: React.FC<Props> = ({ title, folderName, onBack }) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {onBack && (
          <Button 
            type="text" 
            icon={<ChevronLeft size={20} />} 
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-control hover:bg-action-hover text-text-secondary -ml-2"
          />
        )}
        
        <div className="flex items-center gap-1.5">
          {/* V1.4: Page Title = T2 (24px Semibold) */}
          <VFText variant="t2" color="primary" className="tracking-tight">
            {title}
          </VFText>
          
          {folderName && (
            <div className="flex items-center gap-1.5 ml-1">
              <VFText variant="t2" color="tertiary" className="font-normal opacity-40">/</VFText>
              {/* V1.4: Secondary level title in path stays significant but color changes */}
              <VFText variant="t2" color="primary" className="opacity-80">
                {folderName}
              </VFText>
            </div>
          )}

          {!folderName && !isMobile && (
            <Tooltip title={t('workflows.helpTooltip')}>
              <HelpCircle size={18} className="text-text-tertiary cursor-help hover:text-brand transition-colors ml-2" />
            </Tooltip>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <Button 
          icon={<UserPlus size={16} />} 
          className="flex items-center gap-2 border-border text-text-secondary hover:!text-brand hover:!border-brand h-9 px-3"
        >
          {/* V1.4: Button text defaults to T5 Strong semantics via antdTheme, but icon spacing is manual */}
          {!isMobile && <VFText variant="t5-strong" color="inherit">{t('workflows.inviteTeam')}</VFText>}
        </Button>
        <Avatar 
          size={isMobile ? 32 : 36} 
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=64&h=64&q=80" 
          className="border border-divider shadow-sm cursor-pointer hover:ring-2 hover:ring-brand/20 transition-all"
        />
      </div>
    </div>
  );
};
