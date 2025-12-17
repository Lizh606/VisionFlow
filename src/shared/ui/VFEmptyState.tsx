
import React from 'react';
import { Button } from 'antd';
import { Inbox, Plus } from 'lucide-react';

interface VFEmptyStateProps {
  title?: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const VFEmptyState: React.FC<VFEmptyStateProps> = ({
  title = "No data found",
  description,
  actionLabel,
  onAction,
  icon
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-border-strong rounded-card bg-bg-page/20 h-full min-h-[300px]">
      <div className="w-12 h-12 rounded-full bg-bg-page border border-border flex items-center justify-center text-text-tertiary mb-4 shadow-sm">
        {icon || <Inbox size={24} strokeWidth={1.5} />}
      </div>
      
      <h3 className="text-base font-bold text-text-primary mb-2">
        {title}
      </h3>
      
      <p className="text-sm text-text-secondary max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <Button 
          type="primary" 
          onClick={onAction}
          icon={<Plus size={16} />}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
