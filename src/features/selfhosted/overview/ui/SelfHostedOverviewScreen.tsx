
import React from 'react';
import { useTranslation } from 'react-i18next';

import { PageHeader } from '../../components/PageHeader';
import { TimeRangeFilter } from '../../../../shared/ui/TimeRangeFilter';

import { KpiTotalDevicesCard } from './components/KpiTotalDevicesCard';
import { KpiLicenseUsageCard } from './components/KpiLicenseUsageCard';
import { KpiUsageSummaryCard } from './components/KpiUsageSummaryCard';
import { DeviceStatusChartCard } from './components/DeviceStatusChartCard';
import { UsageTrendChartCard } from './components/UsageTrendChartCard';
import { ActiveAlertsCard } from './components/ActiveAlertsCard';
import { ShortcutsCard } from './components/ShortcutsCard';

import { mockDashboardData } from '../model/mock.ts';

interface Props {
  onNavigate: (key: string) => void;
  onOpenMenu?: () => void;
}

export const SelfHostedOverviewScreen: React.FC<Props> = ({ onNavigate, onOpenMenu }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 md:gap-6 pb-12 relative">
      {/* Visual background pattern with absolute positioning to not affect layout flow */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" 
           style={{ backgroundImage: 'linear-gradient(var(--vf-text-secondary) 1px, transparent 1px), linear-gradient(90deg, var(--vf-text-secondary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      {/* V1.4 对齐菜单文案 */}
      <PageHeader 
        onOpenMenu={onOpenMenu}
        title={t('menu.overview')}
        actions={<TimeRangeFilter />}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
        <KpiTotalDevicesCard data={mockDashboardData.devices} />
        <KpiLicenseUsageCard data={mockDashboardData.license} />
        <KpiUsageSummaryCard data={mockDashboardData.usageSummary} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 relative z-10">
        <DeviceStatusChartCard data={mockDashboardData.deviceStatusChart} />
        <UsageTrendChartCard data={mockDashboardData.usageTrend} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 relative z-10">
        <ActiveAlertsCard alerts={mockDashboardData.alerts} />
        <ShortcutsCard />
      </div>
    </div>
  );
};
