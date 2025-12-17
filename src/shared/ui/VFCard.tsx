
import React from 'react';

export interface VFCardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  bordered?: boolean; // Default true per spec
}

export const VFCard: React.FC<VFCardProps> = ({ 
  title, 
  extra, 
  children, 
  className = '',
  noPadding = false,
  bordered = true
}) => {
  return (
    <div className={`
      bg-bg-card rounded-card 
      flex flex-col overflow-hidden
      transition-shadow duration-300
      ${bordered ? 'border border-border shadow-card hover:shadow-overlay' : ''}
      ${className}
    `}>
      {(title || extra) && (
        <div className="
          flex items-center justify-between 
          px-6 
          border-b border-border-divider 
          h-16 min-h-[64px]
          bg-bg-card
          gap-4 flex-nowrap
        ">
          {/* Title Area: Allow truncation if space is tight */}
          {title && (
            <div className="text-lg font-semibold text-text-primary tracking-tight truncate min-w-0 flex items-center h-full">
              {title}
            </div>
          )}
          
          {/* Actions Area: Never wrap, never shrink */}
          {extra && (
            <div className="shrink-0 flex items-center h-full whitespace-nowrap">
              {extra}
            </div>
          )}
        </div>
      )}
      <div className={`${noPadding ? '' : 'p-6'} flex-1 text-text-primary h-full`}>
        {children}
      </div>
    </div>
  );
};
