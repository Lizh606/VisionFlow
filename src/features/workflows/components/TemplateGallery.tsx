
import React, { useMemo } from 'react';
import { FilePlus, Zap, Maximize, Box, ArrowDownWideNarrow, Type, Shield, Users, LucideIcon } from 'lucide-react';
import { Template } from './WorkflowTemplateModal';

const iconMap: Record<string, LucideIcon> = {
  FilePlus, Zap, Maximize, Box, ArrowDownWideNarrow, Type, Shield, Users
};

interface Props {
  templates: Template[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const TemplateGallery: React.FC<Props> = ({ templates, selectedId, onSelect }) => {
  const groupedTemplates = useMemo(() => {
    return templates.reduce((acc, tpl) => {
      if (!acc[tpl.category]) {
        acc[tpl.category] = [];
      }
      acc[tpl.category].push(tpl);
      return acc;
    }, {} as Record<string, Template[]>);
  }, [templates]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
        {Object.entries(groupedTemplates).map(([category, items]) => (
          <div key={category} className="flex flex-col mb-8 last:mb-0">
            {/* Category Header */}
            <div className="sticky top-0 z-10 bg-bg-card py-5 border-b border-divider/0">
              <h3 className="m-0 text-[11px] font-bold text-text-tertiary uppercase tracking-[0.12em] opacity-60">
                {category}
              </h3>
            </div>
            
            {/* Template Grid */}
            <div className="grid grid-cols-2 gap-4 mt-1">
              {/* Fix: Explicitly cast items to Template[] as Object.entries value inference can result in 'unknown' type */}
              {(items as Template[]).map(tpl => {
                const Icon = iconMap[tpl.icon] || FilePlus;
                const isSelected = selectedId === tpl.id;
                
                return (
                  <div 
                    key={tpl.id}
                    onClick={() => onSelect(tpl.id)}
                    className={`
                      group flex flex-col rounded-[12px] border transition-all cursor-pointer select-none overflow-hidden
                      ${isSelected 
                        ? 'border-brand bg-brand/[0.04] ring-1 ring-brand/10' 
                        : 'border-border bg-bg-card hover:border-border-strong hover:bg-bg-page/50'}
                    `}
                  >
                    {/* Visual Area (Icon Block) */}
                    <div className={`
                      relative h-24 w-full flex items-center justify-center transition-colors
                      ${isSelected ? 'bg-brand/10 text-brand' : 'bg-bg-page/60 text-text-tertiary/70'}
                    `}>
                      <Icon size={32} strokeWidth={1.5} />
                      
                      {tpl.isNew && (
                        <div className="absolute top-2 left-2">
                           <span className="text-[9px] font-bold text-white bg-brand px-1.5 py-0.5 rounded-[4px] leading-none">
                             NEW
                           </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Name Area (Bottom) */}
                    <div className="px-3.5 py-3.5 bg-bg-card flex-1 flex items-start border-t border-divider/40">
                      <span className={`text-[12px] font-bold leading-[1.4] line-clamp-2 ${isSelected ? 'text-brand' : 'text-text-primary'}`}>
                        {tpl.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
