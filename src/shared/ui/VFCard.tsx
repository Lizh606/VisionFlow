
import React from 'react';
import { VFText } from '../../ui/VFText';

export interface VFCardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  bordered?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const VFCard = React.forwardRef<HTMLDivElement, VFCardProps>((props, ref) => {
  const { 
    title, 
    extra, 
    children, 
    className = '',
    noPadding = false,
    bordered = true,
    onClick
  } = props;

  return (
    <div 
      ref={ref}
      onClick={onClick}
      className={`
      bg-bg-card rounded-card 
      flex flex-col overflow-hidden
      transition-all duration-200
      ${bordered ? 'border border-border shadow-card hover:shadow-sm' : ''}
      ${onClick ? 'cursor-pointer hover:border-brand/30 active:scale-[0.99] active:bg-action-hover' : ''}
      ${className}
    `}>
      {(title || extra) ? (
        <div key="card-header" className="
          flex items-center justify-between 
          px-4 sm:px-6 
          border-b border-divider 
          h-[52px] sm:h-14 
          bg-bg-card
          gap-4 flex-nowrap
        ">
          {title && (
            <div key="header-title" className="truncate min-w-0 flex items-center h-full">
              {/* T4 Subhead (16px/24px, 600 weight) */}
              <VFText variant="t4" as="span" truncate>
                {title}
              </VFText>
            </div>
          )}
          {extra && (
            <div key="header-extra" className="shrink-0 flex items-center h-full whitespace-nowrap">
              {extra}
            </div>
          )}
        </div>
      ) : null}
      <div key="card-body" className={`${noPadding ? '' : 'p-4 sm:p-6'} flex-1 text-text-primary h-full`}>
        {children}
      </div>
    </div>
  );
});
