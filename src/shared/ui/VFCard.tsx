
import React from 'react';

export interface VFCardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  bordered?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const VFCard: React.FC<VFCardProps> = ({ 
  title, 
  extra, 
  children, 
  className = '',
  noPadding = false,
  bordered = true,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
      bg-bg-card rounded-card 
      flex flex-col overflow-hidden
      transition-all duration-200
      ${bordered ? 'border border-border shadow-card' : ''}
      ${onClick ? 'cursor-pointer hover:shadow-overlay active:scale-[0.99] active:bg-action-hover' : ''}
      ${className}
    `}>
      {(title || extra) && (
        <div className="
          flex items-center justify-between 
          px-4 sm:px-6 
          border-b border-divider 
          h-[52px] sm:h-14 
          bg-bg-card
          gap-4 flex-nowrap
        ">
          {title && (
            <div className="text-[11px] sm:text-sm font-bold text-text-primary uppercase tracking-wider truncate min-w-0 flex items-center h-full">
              {title}
            </div>
          )}
          {extra && (
            <div className="shrink-0 flex items-center h-full whitespace-nowrap">
              {extra}
            </div>
          )}
        </div>
      )}
      <div className={`${noPadding ? '' : 'p-4 sm:p-6'} flex-1 text-text-primary h-full`}>
        {children}
      </div>
    </div>
  );
};
