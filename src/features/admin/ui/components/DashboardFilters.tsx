
import React from 'react';
import { Select, Space, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { TimeRangeFilter } from '../../../../shared/ui/TimeRangeFilter';
import { useResponsive } from '../../../../shared/hooks/useResponsive';

export const DashboardFilters: React.FC = () => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();

  const filterWrapper = (label: string, component: React.ReactNode) => (
    <Tooltip title={t('admin.overview.filters.tooltip', { label })} placement="top" mouseEnterDelay={0.5}>
      <div className="w-full sm:w-auto">{component}</div>
    </Tooltip>
  );

  return (
    <Space direction={isMobile ? 'vertical' : 'horizontal'} size={12} className="w-full sm:w-auto">
      <div className="w-full sm:max-w-[240px]">
        <TimeRangeFilter />
      </div>
      
      {filterWrapper(t('admin.overview.filters.tenant'), (
        <Select 
          placeholder={t('admin.overview.filters.tenant')} 
          className="w-full sm:w-40 h-10 font-vf-medium" 
          options={[{ label: t('admin.overview.filters.allTenants'), value: 'all' }]} 
          defaultValue="all"
        />
      ))}
      
      {filterWrapper(t('admin.overview.filters.workspace'), (
        <Select 
          placeholder={t('admin.overview.filters.workspace')} 
          className="w-full sm:w-40 h-10 font-vf-medium" 
          options={[{ label: t('admin.overview.filters.allWorkspaces'), value: 'all' }]} 
          defaultValue="all"
        />
      ))}
      
      {filterWrapper(t('admin.overview.filters.env'), (
        <Select 
          placeholder={t('admin.overview.filters.env')} 
          className="w-full sm:w-28 h-10 font-vf-medium" 
          options={[{ label: 'Prod', value: 'prod' }, { label: 'Staging', value: 'staging' }]} 
          defaultValue="prod"
        />
      ))}
    </Space>
  );
};
