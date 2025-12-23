
import React from 'react';
import { Button } from 'antd';
import { ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useResponsive } from '../../shared/hooks/useResponsive';
import { VFText } from '../../ui/VFText';

interface VFPageHeaderProps {
  title: React.ReactNode;
  description?: string;
  actions?: React.ReactNode;
  onBack?: () => void;
  showDivider?: boolean;
  className?: string;
}

export const VFPageHeader: React.FC<VFPageHeaderProps> = ({ 
  title, 
  description, 
  actions,
  onBack,
  showDivider = false,
  className = ''
}) => {
  const { isMobile } = useResponsive();

  return (
    <div className={`flex flex-col gap-4 ${showDivider ? 'pb-4 border-b border-divider' : ''} ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {onBack && !isMobile && (
            <Button 
              type="text" 
              icon={<ChevronLeft size={20} />} 
              onClick={onBack}
              className="flex items-center justify-center w-9 h-9 rounded-control hover:bg-action-hover text-text-secondary shrink-0"
            />
          )}

          <div className="flex flex-col gap-1 min-w-0 overflow-hidden">
            {/* T2 Page Title (24px/32px, 600 weight) */}
            <VFText variant="t2" as="h1" className="m-0 flex items-center gap-3">
              {onBack && isMobile && (
                 <ChevronLeft 
                   size={20} 
                   className="text-text-secondary cursor-pointer shrink-0" 
                   onClick={onBack} 
                 />
              )}
              <span className="truncate">{title}</span>
            </VFText>
            
            {/* T5 Body Secondary (14px/22px, 400 weight) */}
            {description && (
              <VFText variant="t5" color="secondary" className="max-w-2xl">
                {description}
              </VFText>
            )}
          </div>
        </div>
        
        {actions && (
          <div className="flex items-center gap-3 shrink-0 flex-wrap md:flex-nowrap">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
