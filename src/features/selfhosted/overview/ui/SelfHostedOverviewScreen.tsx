
import React from 'react';
import { useTranslation } from 'react-i18next';

// Shared UI
// Relative path from src/features/selfhosted/overview/ui/SelfHostedOverviewScreen.tsx to src/shared/ui
import { VFPageHeader } from '../../../../shared/ui/VFPageHeader';
import { TimeRangeFilter } from '../../../../shared/ui/TimeRangeFilter';

// Feature Components
import { KpiTotalDevicesCard } from './components/KpiTotalDevicesCard';
import { KpiLicenseUsageCard } from './components/KpiLicenseUsageCard';
import { KpiUsageSummaryCard } from './components/KpiUsageSummaryCard';
import { DeviceStatusChartCard } from './components/DeviceStatusChartCard';
import { UsageTrendChartCard } from './components/UsageTrendChartCard';
import { ActiveAlertsCard } from './components/ActiveAlertsCard';
import { ShortcutsCard } from './components/ShortcutsCard';

import { mockDashboardData } from '../model/mock';

export const SelfHostedOverviewScreen: React.FC<{ onNavigate: (key: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();

  const handleTimeChange = (dates: any) => {
    console.log('Time Range Changed:', dates);
    // In a real app, this would trigger a refetch of dashboard data
  };

  return (
    <div className="flex flex-col gap-6 pb-12 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" 
           style={{ 
             backgroundImage: 'linear-gradient(var(--vf-text-secondary) 1px, transparent 1px), linear-gradient(90deg, var(--vf-text-secondary) 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }} 
      />

      {/* 1. Page Header */}
      <div className="relative z-10">
        <VFPageHeader 
          title={t('selfhosted.overview.title')}
          breadcrumbs={[
            { title: 'Vision Team' },
            { title: t('menu.selfHosted') },
            { title: <span className="text-text-primary font-semibold">{t('menu.overview')}</span> },
          ]}
          actions={
            <TimeRangeFilter onChange={handleTimeChange} />
          }
        />
      </div>

      {/* 2. Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <KpiTotalDevicesCard data={mockDashboardData.devices} />
        <KpiLicenseUsageCard data={mockDashboardData.license} />
        <KpiUsageSummaryCard data={mockDashboardData.usageSummary} />
      </div>

      {/* 
        3. Charts Row (Perfect 1:1 Split)
        VFCard updates ensure headers align perfectly even if right-side actions differ.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        <DeviceStatusChartCard data={mockDashboardData.deviceStatusChart} />
        <UsageTrendChartCard data={mockDashboardData.usageTrend} />
      </div>

      {/* 4. Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        <ActiveAlertsCard alerts={mockDashboardData.alerts} />
        <ShortcutsCard />
      </div>
    </div>
  );
};
