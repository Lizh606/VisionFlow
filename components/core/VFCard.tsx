
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
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-divider min-h-[56px] bg-bg-card">
          {title && <div className="text-lg font-semibold text-text-primary tracking-tight">{title}</div>}
          {extra && <div className="text-sm text-text-secondary">{extra}</div>}
        </div>
      )}
      <div className={`${noPadding ? '' : 'p-6'} flex-1 text-text-primary`}>
        {children}
      </div>
    </div>
  );
};
