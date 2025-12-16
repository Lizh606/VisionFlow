
import React from 'react';
import { Button } from 'antd';
import { Plus } from 'lucide-react';
import { VFPageHeader } from '../components/core/VFPageHeader';
import { VFStatCard } from '../components/business/VFStatCard';
import { VFCard } from '../components/core/VFCard';

export const WorkflowsPage: React.FC = () => {
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

      {/* KPI Cards Grid - Responsive Grid per Spec */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <VFStatCard 
          title="Total Runs" 
          value="1,234" 
          trend="+12%" 
          trendStatus="success" 
          footer="Compared to last week"
        />
        <VFStatCard 
          title="System Status" 
          value="Operational" 
          trendStatus="success"
          footer="All systems normal"
        />
        <VFStatCard 
          title="Pending Tasks" 
          value="5" 
          trend="High Load" 
          trendStatus="warning"
          footer="Estimated wait: 2m"
        />
      </div>

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
