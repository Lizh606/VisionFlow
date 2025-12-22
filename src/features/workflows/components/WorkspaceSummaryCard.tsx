
import React from 'react';
import { Button, Dropdown } from 'antd';
import { Folder, MoreVertical } from 'lucide-react';
import { WorkspaceSummary } from '../model/types';

interface Props {
  data: WorkspaceSummary;
}

export const WorkspaceSummaryCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="inline-flex items-center gap-4 bg-bg-page/50 border border-border rounded-card px-3 py-2 group hover:border-brand/40 hover:bg-bg-card transition-all cursor-pointer">
      {/* Icon in small gray box */}
      <div className="w-9 h-9 bg-bg-card border border-border rounded-control flex items-center justify-center text-text-tertiary group-hover:text-brand transition-colors">
        <Folder size={16} strokeWidth={2.5} />
      </div>
      
      {/* Two-line Text */}
      <div className="flex flex-col min-w-[120px]">
        {/* T5 Body Strong */}
        <span className="text-[14px] font-medium text-text-primary leading-tight">
          {data.name}
        </span>
        {/* T6 Caption */}
        <span className="text-[12px] text-text-tertiary font-normal">
          {data.workflowCount} {data.workflowCount === 1 ? 'Workflow' : 'Workflows'}
        </span>
      </div>

      {/* Menu: Hidden by default, shown on hover */}
      <Dropdown 
        menu={{ items: [{ key: 'rename', label: 'Rename' }, { key: 'delete', label: 'Delete', danger: true }] }}
        trigger={['click']}
      >
        <Button 
          type="text" 
          size="small" 
          icon={<MoreVertical size={16} />} 
          className="text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" 
          onClick={e => e.stopPropagation()}
        />
      </Dropdown>
    </div>
  );
};
