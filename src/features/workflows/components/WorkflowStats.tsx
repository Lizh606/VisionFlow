
import React from 'react';
import { useTranslation } from 'react-i18next';
import { VFStatCard } from '../../../shared/ui/VFStatCard';

export const WorkflowStats: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <VFStatCard 
        title={t('workflows.stats.totalRuns')} 
        value="1,234" 
        trend="+12%" 
        trendStatus="success" 
        footer={t('workflows.stats.compareLastWeek')}
      />
      <VFStatCard 
        title={t('workflows.stats.systemStatus')} 
        value={t('workflows.stats.operational')} 
        trendStatus="success"
        footer={t('workflows.stats.systemNormal')}
      />
      <VFStatCard 
        title={t('workflows.stats.pendingTasks')} 
        value="5" 
        trend={t('workflows.stats.highLoad')} 
        trendStatus="warning"
        footer={t('workflows.stats.estWait', { min: 2 })}
      />
    </div>
  );
};
