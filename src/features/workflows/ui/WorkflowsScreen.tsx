
import React from 'react';
import { Button } from 'antd';
import { Plus } from 'lucide-react';
// Relative path from src/features/workflows/ui/WorkflowsScreen.tsx to src/shared/ui
// ui (1) -> workflows (2) -> features (3) -> src
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { VFCard } from '../../../shared/ui/VFCard';
import { WorkflowStats } from '../components/WorkflowStats';

export const WorkflowsScreen: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <VFPageHeader 
        title="Workflows" 
        description="Manage and monitor your automated vision pipelines and real-time inference tasks."
        actions={
          <Button type="primary" icon={<Plus size={16} />} className="shadow-sm">
            New Workflow
          </Button>
        }
      />

      {/* Feature Component: Stats Grid */}
      <WorkflowStats />

      {/* Main Content Area */}
      <VFCard title="Recent Activity" className="min-h-[400px]">
        <div className="h-full flex flex-col items-center justify-center text-text-tertiary border-2 border-dashed border-border-strong rounded-card bg-bg-page/30 p-12 text-center">
          <p className="mb-2">No recent activity found in the selected timeframe.</p>
          <Button type="dashed">Refresh Data</Button>
        </div>
      </VFCard>
    </div>
  );
};
