
import React from 'react';
import { Breadcrumb } from 'antd';
import { ChevronRight } from 'lucide-react';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';

interface VFPageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: ItemType[];
  actions?: React.ReactNode;
  className?: string;
}

export const VFPageHeader: React.FC<VFPageHeaderProps> = ({ 
  title, 
  description, 
  breadcrumbs, 
  actions,
  className = ''
}) => {
  return (
    <div className={`flex flex-col gap-6 mb-4 ${className}`}>
      {/* Row 1: Breadcrumbs (Separate line, subtle) */}
      {breadcrumbs && (
        <Breadcrumb 
          separator={<ChevronRight size={12} className="text-text-tertiary" />}
          items={breadcrumbs}
          className="text-xs text-text-secondary"
        />
      )}

      {/* Row 2: Title & Actions */}
      <div className="flex flex-col  md:flex-row md:items-center md:justify-between  gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-text-primary m-0 tracking-tight leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-text-secondary m-0 text-sm max-w-3xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
        
        {actions && (
          <div className="flex items-center gap-3 shrink-0 mt-1">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
