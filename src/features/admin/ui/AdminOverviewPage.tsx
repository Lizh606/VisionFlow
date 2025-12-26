
import React, { useState, useEffect } from 'react';
import { Row, Col, Badge, Button, App } from 'antd';
import { Radio, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { VFEmptyState } from '../../../shared/ui/VFEmptyState';
import { VFText } from '../../../ui/VFText';

import { AdminDashboardData } from '../types/dashboard';
import { mockAdminDashboard } from '../model/mockDashboard';
import { DashboardFilters } from './components/DashboardFilters';
import { DomainCardStudio } from './components/DomainCardStudio';
import { DomainCardSelfHosted } from './components/DomainCardSelfHosted';
import { DomainCardMarketplace } from './components/DomainCardMarketplace';
import { DashboardSkeleton } from './components/DashboardSkeleton';
import { LiveEventsDrawer } from './components/LiveEventsDrawer';
import { SnapshotFreshnessRow } from './components/SnapshotFreshnessRow';
import { useSSEStream } from '../hooks/useSSEStream';

export const AdminOverviewPage: React.FC<{ onNavigate?: (p: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { events, unreadCount, status: sseStatus, clearEvents, resetUnread } = useSSEStream();

  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchData = async (isSilent = false) => {
    if (!isSilent) setLoading(true); else setRefreshing(true);
    setError(false);
    
    setTimeout(() => {
      setData({ ...mockAdminDashboard, lastAggregatedAt: new Date().toISOString() });
      setLoading(false);
      setRefreshing(false);
      if (isSilent) message.success('Operational snapshot synchronized');
    }, 800);
  };

  useEffect(() => { fetchData(); }, []);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
    resetUnread();
  };

  const handleDrillDown = (domain: string) => {
    if (onNavigate) onNavigate(`admin-alerts?domain=${domain}&status=open`);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 w-full pb-20">
      {/* V1.4 对齐菜单文案 */}
      <VFPageHeader 
        title={t('menu.adminOverview')} 
        description={t('admin.overview.description')}
        actions={
          <Badge count={unreadCount} size="small" offset={[-2, 2]}>
            <Button 
              type="primary"
              icon={<Radio size={16} />} 
              onClick={handleOpenDrawer}
              className="h-10 px-5 font-bold rounded-control bg-brand border-brand shadow-sm"
            >
              {t('admin.overview.liveEvents')}
            </Button>
          </Badge>
        }
      />

      <div className="bg-bg-card p-4 rounded-card border border-border shadow-sm">
        <DashboardFilters />
      </div>

      {loading ? (
        <DashboardSkeleton />
      ) : error ? (
        <div className="bg-bg-card rounded-card border border-border p-20">
          <VFEmptyState 
            title="Snapshot Sync Failed"
            description="Operational data processor unreachable. Please check cluster health."
            actionLabel="Retry Connection"
            onAction={() => fetchData()}
            icon={<AlertCircle size={24} className="text-error" />}
          />
        </div>
      ) : data ? (
        <div className="flex flex-col">
          <SnapshotFreshnessRow 
            lastAggregated={data.lastAggregatedAt} 
            loading={refreshing} 
            onRefresh={() => fetchData(true)} 
          />

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={8}>
              <DomainCardStudio data={data.studio} onDrillDown={() => handleDrillDown('studio')} />
            </Col>
            <Col xs={24} lg={8}>
              <DomainCardSelfHosted data={data.selfHosted} onDrillDown={() => handleDrillDown('selfhosted')} />
            </Col>
            <Col xs={24} lg={8}>
              <DomainCardMarketplace data={data.marketplace} onDrillDown={() => handleDrillDown('marketplace')} />
            </Col>
          </Row>
        </div>
      ) : null}

      <LiveEventsDrawer 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        events={events}
        status={sseStatus}
        onClear={clearEvents}
      />
    </div>
  );
};
