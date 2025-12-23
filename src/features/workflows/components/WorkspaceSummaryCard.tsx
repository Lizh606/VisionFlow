
import React from 'react';
import { Button, Dropdown } from 'antd';
import { Folder, MoreVertical } from 'lucide-react';
import { WorkspaceSummary } from '../model/types';
import { VFText } from '../../../ui/VFText';

interface Props {
  data: WorkspaceSummary;
}

export const WorkspaceSummaryCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="inline-flex items-center gap-4 bg-bg-page/50 border border-border rounded-card px-3 py-2 group hover:border-brand/40 hover:bg-bg-card transition-all cursor-pointer">
      <div className="w-9 h-9 bg-bg-card border border-border rounded-control flex items-center justify-center text-text-tertiary group-hover:text-brand transition-colors">
        <Folder size={16} strokeWidth={2.5} />
      </div>
      
      <div className="flex flex-col min-w-[120px]">
        {/* V1.4: T5 Body Strong */}
        <VFText variant="t5-strong" color="primary" className="leading-tight">
          {data.name}
        </VFText>
        {/* V1.4: T6 Caption */}
        <VFText variant="t6" color="tertiary">
          {data.workflowCount} {data.workflowCount === 1 ? 'Workflow' : 'Workflows'}
        </VFText>
      </div>

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
