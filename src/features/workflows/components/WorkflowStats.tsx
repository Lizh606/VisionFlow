import React from 'react';
import { VFStatCard } from '../../../shared/ui/VFStatCard';

export const WorkflowStats: React.FC = () => {
  return (
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
  );
};