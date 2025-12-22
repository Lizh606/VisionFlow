
import React from 'react';
import { Button, Avatar, Space, Tooltip } from 'antd';
import { HelpCircle, UserPlus } from 'lucide-react';

interface Props {
  title: string;
}

export const PageHeader: React.FC<Props> = ({ title }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-text-primary m-0">{title}</h1>
        <Tooltip title="Manage your workflows and processing logic.">
          <HelpCircle size={18} className="text-text-tertiary cursor-help hover:text-brand" />
        </Tooltip>
      </div>
      
      <div className="flex items-center gap-4">
        <Button 
          icon={<UserPlus size={16} />} 
          className="flex items-center gap-2 font-semibold border-border text-text-secondary hover:!text-brand hover:!border-brand"
        >
          Invite Team
        </Button>
        <Avatar 
          size={36} 
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=64&h=64&q=80" 
          className="border border-divider shadow-sm"
        />
      </div>
    </div>
  );
};
