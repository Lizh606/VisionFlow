
import React from 'react';
import { useTranslation } from 'react-i18next';
import { List as ListIcon, FileCheck, Activity, ArrowUpRight } from 'lucide-react';
import { VFCard } from '../../../../../shared/ui/VFCard';

// Sub-component: Shortcut Action (Spec B.1, B.2, B.3)
// Enforces: Icon Top-Left, Title Bottom-Left, Hover Effects
const ShortcutAction: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  className?: string;
}> = ({ icon, label, className = '' }) => (
  <div className={`
    group relative flex flex-col items-start justify-between 
    p-5 h-full w-full
    rounded-card border border-border bg-bg-card
    hover:border-brand hover:shadow-sm hover:bg-action-hover 
    active:translate-y-[1px] active:shadow-none
    cursor-pointer transition-all duration-200
    focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:outline-none
    ${className}
  `} tabIndex={0} role="button">
    
    {/* Top Row: Icon + Arrow */}
    <div className="flex items-start justify-between w-full mb-4">
      <div className="
        flex items-center justify-center w-9 h-9 
        rounded-control bg-bg-page border border-border
        text-text-secondary 
        group-hover:bg-brand/10 group-hover:text-brand group-hover:border-brand/20
        transition-colors duration-200
      ">
        {icon}
      </div>
      
      <ArrowUpRight 
        size={18} 
        className="
          text-text-tertiary 
          opacity-0 -translate-y-1 translate-x-1 
          group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 
          transition-all duration-200
        " 
      />
    </div>

    {/* Bottom Row: Label */}
    <div className="mt-auto">
      <span className="text-sm font-semibold text-text-primary group-hover:text-brand transition-colors leading-tight block">
        {label}
      </span>
    </div>
  </div>
);

export const ShortcutsCard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <VFCard title={t('selfhosted.overview.shortcuts.title')} className="h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
         <ShortcutAction 
            icon={<ListIcon size={18} strokeWidth={2} />} 
            label={t('selfhosted.overview.shortcuts.viewDeviceList')} 
         />
         <ShortcutAction 
            icon={<FileCheck size={18} strokeWidth={2} />} 
            label={t('selfhosted.overview.shortcuts.manageLicenses')} 
         />
         
         {/* Spanning Item */}
         <div className="sm:col-span-2">
            <ShortcutAction 
                icon={<Activity size={18} strokeWidth={2} />} 
                label={t('selfhosted.overview.shortcuts.recentDeployments')} 
            />
         </div>
      </div>
    </VFCard>
  );
};
