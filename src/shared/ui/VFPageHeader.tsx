
import React from 'react';
import { Button } from 'antd';
import { ChevronLeft } from 'lucide-react';
import { useResponsive } from '../../shared/hooks/useResponsive';

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
    <div className={`
      flex flex-col gap-4 
      ${showDivider ? 'pb-4 border-b border-divider' : ''} 
      ${className}
    `}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Back Button (Desktop style) */}
          {onBack && !isMobile && (
            <Button 
              type="text" 
              icon={<ChevronLeft size={20} />} 
              onClick={onBack}
              className="flex items-center justify-center w-9 h-9 rounded-control hover:bg-action-hover text-text-secondary"
            />
          )}

          <div className="flex flex-col gap-1">
            {/* T2 Page Title (24px, 600 weight) */}
            <h1 className="text-2xl font-semibold text-text-primary m-0 tracking-tight leading-tight flex items-center gap-3">
              {onBack && isMobile && (
                 <ChevronLeft 
                   size={20} 
                   className="text-text-secondary cursor-pointer" 
                   onClick={onBack} 
                 />
              )}
              {title}
            </h1>
            {/* T5 Body Secondary (14px, 400 weight) */}
            {description && (
              <p className="text-text-secondary m-0 text-sm max-w-2xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
        
        {actions && (
          <div className="flex items-center gap-3 shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
