
import React from 'react';
import { Button, Avatar, Tooltip } from 'antd';
import { HelpCircle, UserPlus, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useResponsive } from '../../../shared/hooks/useResponsive';

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
        
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-semibold text-text-primary m-0 tracking-tight">
            {title}
          </h1>
          
          {folderName && (
            <div className="flex items-center gap-2">
              <span className="text-xl text-text-tertiary font-normal px-1">/</span>
              <span className="text-lg font-semibold text-text-primary mt-0.5">
                {folderName}
              </span>
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
          className="flex items-center gap-2 font-medium border-border text-text-secondary hover:!text-brand hover:!border-brand h-9 px-3"
        >
          {!isMobile && t('workflows.inviteTeam')}
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
