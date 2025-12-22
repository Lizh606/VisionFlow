
import React from 'react';
import { LayoutList, LayoutGrid } from 'lucide-react';

interface VFViewToggleProps {
  value: 'list' | 'grid';
  onChange: (val: 'list' | 'grid') => void;
  className?: string;
}

export const VFViewToggle: React.FC<VFViewToggleProps> = ({ value, onChange, className = '' }) => {
  const options = [
    { value: 'list', icon: LayoutList, label: 'List' },
    { value: 'grid', icon: LayoutGrid, label: 'Grid' },
  ] as const;

  return (
    <div className={`
      inline-flex items-center p-1 rounded-control bg-bg-page border border-border
      ${className}
    `}>
      {options.map((option) => {
        const isActive = value === option.value;
        const Icon = option.icon;
        
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            type="button"
            aria-label={`Switch to ${option.label} view`}
            className={`
              flex items-center justify-center h-8 w-10 sm:w-12 rounded-control transition-all duration-200 select-none cursor-pointer
              ${isActive 
                ? 'bg-bg-card text-brand border border-divider shadow-sm' 
                : 'text-text-tertiary hover:text-text-secondary hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
              }
            `}
          >
            <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
          </button>
        );
      })}
    </div>
  );
};
