
import React from 'react';
import { FilePlus, Car, Shield, Users, Cpu, UserCheck, LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  FilePlus, Car, Shield, Users, Cpu, UserCheck
};

export interface Template {
  id: string;
  name: string;
  icon: string;
  description: string;
  isNew?: boolean;
  requiresModel?: boolean;
}

interface Props {
  templates: Template[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const TemplateListPane: React.FC<Props> = ({ templates, selectedId, onSelect }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5">
        <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-[0.12em] opacity-60">
          Gallery
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
        <div className="grid grid-cols-2 gap-3">
          {templates.map(tpl => {
            const Icon = iconMap[tpl.icon] || FilePlus;
            const isSelected = selectedId === tpl.id;
            
            return (
              <div 
                key={tpl.id}
                onClick={() => onSelect(tpl.id)}
                className={`
                  group flex flex-col rounded-card border transition-all cursor-pointer select-none overflow-hidden
                  ${isSelected 
                    ? 'border-brand bg-brand/[0.03] ring-1 ring-brand/10' 
                    : 'border-border bg-bg-card hover:border-border-strong hover:bg-action-hover'}
                `}
              >
                {/* Roboflow Style: Light grey top icon panel */}
                <div className={`
                  h-20 w-full flex items-center justify-center transition-colors
                  ${isSelected ? 'bg-brand/5 text-brand' : 'bg-bg-page/80 text-text-tertiary opacity-80'}
                `}>
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                
                {/* Title area: Single line, no extra subtext */}
                <div className="p-2.5 flex items-center justify-between gap-1.5 bg-bg-card min-w-0">
                  <span className={`text-[12px] font-bold truncate leading-none ${isSelected ? 'text-brand' : 'text-text-primary'}`}>
                    {tpl.name}
                  </span>
                  {tpl.isNew && (
                    <span className="shrink-0 text-[8px] font-bold text-brand bg-brand/5 border border-brand/10 px-1 rounded-sm">
                      NEW
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
