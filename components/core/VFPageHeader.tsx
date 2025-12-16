
import React from 'react';

interface VFPageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export const VFPageHeader: React.FC<VFPageHeaderProps> = ({ title, description, actions }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary m-0 tracking-tight leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-text-secondary m-0 text-sm md:text-base max-w-3xl leading-relaxed">
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
  );
};
