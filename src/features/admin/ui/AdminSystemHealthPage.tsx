
import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Select, App, Skeleton, Space, Tooltip } from 'antd';
import { RefreshCw, FilterX, Activity, FileText, ArrowRight, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { VFTableToolbar } from '../../../ui/VFTableToolbar';
import { VFText } from '../../../ui/VFText';
import { TimeRangeFilter } from '../../../shared/ui/TimeRangeFilter';
import { useResponsive } from '../../../shared/hooks/useResponsive';

import { HealthKPIs } from './components/HealthKPIs';
import { DLQTable } from './components/DLQTable';
import { DependencyStatusList } from './components/DependencyStatusList';
import { DLQDetailDrawer } from './components/DLQDetailDrawer';
import { mockHealthKPI, mockDLQSamples, mockExternalDeps } from '../model/mockHealth';
import { DLQSample } from '../types/health';

export const AdminSystemHealthPage: React.FC = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { isMobile } = useResponsive();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  
  const [filters, setFilters] = useState({
    tenantId: 'all',
    workspaceId: 'all',
    env: 'prod'
  });
  
  const [selectedSample, setSelectedSample] = useState<DLQSample | null>(null);

  const fetchData = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    setTimeout(() => {
      setData({
        kpi: mockHealthKPI,
        dlq: mockDLQSamples,
        deps: mockExternalDeps
      });
      setLoading(false);
      if (isSilent) message.success(t('admin.alerts.detail.sotSuccess'));
    }, 600);
  };

  useEffect(() => { fetchData(); }, []);

  const handleReset = () => {
    setFilters({ tenantId: 'all', workspaceId: 'all', env: 'prod' });
    message.info('Filters cleared');
  };

  const sseStatus = data?.kpi?.sseStatus || 'DISCONNECTED';

  if (loading) {
    return (
      <div className="flex flex-col gap-8 animate-in fade-in bg-bg-page min-h-screen">
        <Skeleton active paragraph={{ rows: 2 }} />
        <div className="grid grid-cols-3 gap-6">
          <Skeleton.Button active block className="!h-32 rounded-card" />
          <Skeleton.Button active block className="!h-32 rounded-card" />
          <Skeleton.Button active block className="!h-32 rounded-card" />
        </div>
        <Row gutter={[24, 24]}>
          <Col lg={16} xs={24}><Skeleton active paragraph={{ rows: 10 }} /></Col>
          <Col lg={8} xs={24}><Skeleton active paragraph={{ rows: 10 }} /></Col>
        </Row>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 w-full pb-24">
      <VFPageHeader 
        title={t('admin.health.title')} 
        description={t('admin.health.subtitle')}
        actions={
          <Space size={12}>
            <div className="flex items-center gap-2 px-3 h-9 bg-bg-card border border-divider rounded-full shadow-sm">
              <span className="relative flex h-2 w-2">
                {sseStatus === 'CONNECTED' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${sseStatus === 'CONNECTED' ? 'bg-success' : 'bg-error'}`}></span>
              </span>
              <VFText variant="t6" color="tertiary" className="font-bold uppercase tracking-tighter">SSE: {sseStatus}</VFText>
            </div>
            
            <Button 
              icon={<FileText size={16} />}
              className="h-10 px-5 font-bold rounded-control text-text-secondary border-border hover:!text-brand transition-all shadow-sm bg-bg-card"
              onClick={() => window.location.hash = `/admin-audit?env=${filters.env}`}
            >
              {t('admin.health.actions.audit')}
            </Button>
          </Space>
        }
      />

      <div className="bg-bg-card p-4 rounded-card border border-border shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <TimeRangeFilter />
          <Select 
            value={filters.tenantId} 
            onChange={v => setFilters(f => ({ ...f, tenantId: v }))}
            className="w-40 h-10 font-bold"
            options={[{ label: t('admin.health.filters.allTenants'), value: 'all' }]} 
          />
          <Select 
            value={filters.workspaceId} 
            onChange={v => setFilters(f => ({ ...f, workspaceId: v }))}
            className="w-44 h-10 font-bold"
            options={[{ label: t('admin.health.filters.allWorkspaces'), value: 'all' }]}
          />
          <Select 
            value={filters.env} 
            onChange={v => setFilters(f => ({ ...f, env: v }))}
            className="w-36 h-10 font-bold"
            options={[{ label: 'Production', value: 'prod' }, { label: 'Staging', value: 'staging' }]} 
          />
        </div>
        <div className="flex items-center gap-2">
          <Button icon={<FilterX size={16} />} onClick={handleReset} className="h-10 px-4 font-bold text-text-tertiary">Reset</Button>
          <Button icon={<RefreshCw size={16} />} onClick={() => fetchData(true)} className="h-10 w-10 rounded-control flex items-center justify-center text-text-tertiary" />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2 px-1">
            <Activity size={16} className="text-brand opacity-60" />
            <VFText variant="t3" color="primary">{t('admin.health.sections.pipelineHealth')}</VFText>
          </div>
          
          {data.kpi && data.kpi.runbusLagMs > 60000 && (
            <div className="flex items-center gap-4 bg-bg-card border border-border border-l-[4px] border-l-warning rounded-card p-4 shadow-sm animate-in slide-in-from-top-2 duration-300">
              <div className="w-10 h-10 rounded-full bg-warning/5 flex items-center justify-center shrink-0">
                <AlertCircle size={20} className="text-warning" />
              </div>
              
              <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <VFText variant="t5-strong" color="primary" className="leading-tight">
                    {t('admin.health.banners.staleTitle')}
                  </VFText>
                  <div className="flex items-center gap-2 flex-wrap">
                    <VFText variant="t6" color="secondary" className="font-medium">
                      {t('admin.health.banners.staleDesc')}
                    </VFText>
                    <span className="opacity-20 text-text-tertiary">|</span>
                    <VFText variant="t6" color="tertiary" className="font-bold tabular-nums">
                      {t('admin.health.banners.currentLag', { val: '3m 5s' })}
                    </VFText>
                  </div>
                </div>

                <Button 
                  type="link" 
                  size="small" 
                  className="vf-warning-link-btn flex items-center gap-1.5 font-bold hover:opacity-80 transition-all p-0 h-auto self-start md:self-center underline underline-offset-4"
                  onClick={() => window.location.hash = `/admin-alerts?domain=selfhosted&status=OPEN`}
                >
                  {t('admin.health.actions.viewAlerts')}
                  <ArrowRight size={14} className="mt-[1px]" />
                </Button>
              </div>
            </div>
          )}

          <HealthKPIs data={data.kpi} />
        </section>

        <Row gutter={[24, 24]}>
          <Col xs={24} xl={16}>
            <div className="flex flex-col gap-4 h-full">
              <VFText variant="t3" color="primary" className="px-1">{t('admin.health.sections.dlqSamples')}</VFText>
              <DLQTable data={data.dlq} onView={setSelectedSample} />
            </div>
          </Col>

          <Col xs={24} xl={8}>
            <div className="flex flex-col gap-4 h-full">
              <VFText variant="t3" color="primary" className="px-1">{t('admin.health.sections.dependencies')}</VFText>
              <DependencyStatusList items={data.deps} />
            </div>
          </Col>
        </Row>
      </div>

      <DLQDetailDrawer 
        open={!!selectedSample} 
        sample={selectedSample} 
        onClose={() => setSelectedSample(null)} 
      />

      <style>{`
        .vf-warning-link-btn.ant-btn-link {
          color: rgba(var(--vf-warning), 1) !important;
        }
        .vf-warning-link-btn.ant-btn-link:hover {
          color: rgba(var(--vf-warning), 0.8) !important;
        }
      `}</style>
    </div>
  );
};
