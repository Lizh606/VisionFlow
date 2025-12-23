
import React, { useMemo } from 'react';
import { FilePlus, Zap, Maximize, Box, ArrowDownWideNarrow, Type, Shield, Users, LucideIcon } from 'lucide-react';
import { Template } from './WorkflowTemplateModal';
import { VFText } from '../../../ui/VFText';

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
            <div className="sticky top-0 z-10 bg-bg-card py-5">
              {/* V1.4: Section Meta = T6 Caption Strong */}
              <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-[0.12em] opacity-60">
                {category}
              </VFText>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-1">
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
                    
                    <div className="px-3.5 py-3.5 bg-bg-card flex-1 flex items-start border-t border-divider/40">
                      {/* V1.4: Compact Item Title = T6 Body Strong */}
                      <VFText 
                        variant="t6" 
                        color={isSelected ? 'brand' : 'primary'} 
                        className="font-bold leading-[1.4] line-clamp-2"
                      >
                        {tpl.name}
                      </VFText>
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
