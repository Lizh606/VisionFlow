
import React from 'react';
import { Button, Dropdown } from 'antd';
import { MoreVertical, Star, CheckSquare, Square, Image as ImageIcon } from 'lucide-react';
import { Workflow } from '../model/types';

interface Props {
  workflow: Workflow;
  onToggleFavorite: (id: string) => void;
  onToggleSelect: (id: string) => void;
}

export const WorkflowCard: React.FC<Props> = ({ workflow, onToggleFavorite, onToggleSelect }) => {
  const isSelected = workflow.isSelected;
  const isFavorite = workflow.isFavorite;

  return (
    <div 
      onClick={() => window.location.hash = `/workflows/${workflow.id}`}
      className={`
        group flex flex-col bg-bg-card rounded-card border transition-all duration-200 cursor-pointer overflow-hidden
        ${isSelected 
          ? 'border-brand shadow-[0_0_0_1px_rgba(var(--vf-brand),1)]' 
          : 'border-border hover:border-border-strong hover:shadow-card'}
      `}
    >
      {/* 1. Media Section - 16:9 Aspect Ratio */}
      <div className="relative aspect-video w-full bg-bg-page border-b border-divider/50 overflow-hidden flex items-center justify-center">
        {/* Placeholder Gray Content */}
        <div className="flex items-center justify-center text-text-tertiary/20">
          <ImageIcon size={48} strokeWidth={1} />
        </div>

        {/* Hover Overlay Actions */}
        <div className="absolute inset-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="flex justify-between items-start w-full">
            {/* Selection Checkbox (Top Left) - Simplified container */}
            <div 
              className="pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation();
                onToggleSelect(workflow.id);
              }}
            >
              <div className={`
                w-7 h-7 rounded-[6px] flex items-center justify-center transition-all
                ${isSelected 
                  ? 'bg-brand text-white' 
                  : 'bg-white/80 text-black/40 hover:bg-white hover:text-black/60'}
              `}>
                {isSelected ? <CheckSquare size={16} strokeWidth={3} /> : <Square size={16} />}
              </div>
            </div>

            {/* Favorite Star (Top Right) */}
            <div 
              className="pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(workflow.id);
              }}
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center transition-all
                ${isFavorite 
                  ? 'text-warning bg-white shadow-sm' 
                  : 'text-black/40 hover:text-warning hover:bg-white'}
              `}>
                <Star size={20} fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Footer Section - Left/Right Simplified Layout */}
      <div className="px-4 py-4 flex items-center justify-between gap-3 min-h-[60px] bg-bg-card">
        <h3 className="flex-1 m-0 text-[14px] font-semibold text-text-primary leading-tight truncate">
          {workflow.name}
        </h3>
        
        <Dropdown
          trigger={['click']}
          placement="bottomRight"
          menu={{
            items: [
              { key: 'edit', label: 'Edit' },
              { key: 'duplicate', label: 'Duplicate' },
              { type: 'divider' },
              { key: 'delete', label: 'Delete', danger: true },
            ],
            onClick: (e) => e.domEvent.stopPropagation()
          }}
        >
          <Button 
            type="text" 
            size="small" 
            icon={<MoreVertical size={18} />} 
            className="text-text-tertiary flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity" 
            onClick={(e) => e.stopPropagation()} 
          />
        </Dropdown>
      </div>
    </div>
  );
};
