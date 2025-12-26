
import React, { useState, useEffect, useMemo } from 'react';
import { Select, App, Button, Popover, Checkbox, Divider } from 'antd';
import { FilterX, Settings2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { VFTableToolbar } from '../../../ui/VFTableToolbar';
import { VFText } from '../../../ui/VFText';

import { AdminAlert, AdminOpResult } from '../types/alerts';
import { mockAlerts } from '../model/mockAlerts';
import { AlertsTable } from './components/AlertsTable';
import { AlertAckModal } from './components/AlertAckModal';
import { OpResultModal } from './components/OpResultModal';

const INITIAL_FILTERS = {
  severity: 'all',
  domain: 'all',
  status: 'all'
};

const DEFAULT_VISIBLE_COLUMNS = ['severity', 'status', 'type', 'subject', 'lastSeen'];

interface AdminAlertsPageProps {
  onNavigate?: (p: string) => void;
}

export const AdminAlertsPage: React.FC<AdminAlertsPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  
  const [data, setData] = useState<AdminAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  
  const [visibleColumns, setVisibleColumns] = useState<string[]>(DEFAULT_VISIBLE_COLUMNS);

  const fetchAlerts = async () => {
    setLoading(true);
    setTimeout(() => {
      setData(mockAlerts);
      setLoading(false);
    }, 600);
  };

  useEffect(() => { fetchAlerts(); }, []);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchSearch = !search || 
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.subjectId.toLowerCase().includes(search.toLowerCase()) || 
        item.impactScope.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase());
        
      const matchSeverity = filters.severity === 'all' || item.severity === filters.severity;
      const matchDomain = filters.domain === 'all' || item.domain === filters.domain;
      const matchStatus = filters.status === 'all' || item.status === filters.status;
      
      return matchSearch && matchSeverity && matchDomain && matchStatus;
    });
  }, [data, search, filters]);

  const handleReset = () => {
    setFilters(INITIAL_FILTERS);
    setSearch('');
    message.info('Filters cleared');
  };

  const [ackTarget, setAckTarget] = useState<AdminAlert | null>(null);
  const [ackLoading, setAckLoading] = useState(false);
  const [opResult, setOpResult] = useState<AdminOpResult | null>(null);

  const handleAckConfirm = async (comment: string) => {
    if (!ackTarget) return;
    setAckLoading(true);
    setTimeout(() => {
      const opId = `OP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      setOpResult({ adminOpId: opId, operatorId: 'admin-01', timestamp: new Date().toISOString(), status: 'SUCCESS' } as any);
      setData(prev => prev.map(a => a.id === ackTarget.id ? { ...a, status: 'ACKNOWLEDGED' } : a));
      setAckTarget(null);
      setAckLoading(false);
    }, 1200);
  };

  const handleViewDetails = (alert: AdminAlert) => {
    if (onNavigate) {
      onNavigate(`admin-alerts/${alert.id}`);
    }
  };

  /**
   * UC-AC-001 Fix: Correct Subject Navigation
   * 确保从告警列表直接跳转至业务主体详情。
   */
  const handleViewSubject = (alert: AdminAlert) => {
    if (onNavigate) {
      // 归一化映射：RUNTIME_POD -> device
      const mapping: Record<string, string> = {
        'RUNTIME_POD': 'device',
        'DEVICE': 'device',
        'ENTITLEMENT': 'entitlement',
        'ORDER': 'order',
        'RUN': 'run'
      };
      const type = mapping[alert.subjectType.toUpperCase()] || alert.subjectType.toLowerCase();
      onNavigate(`admin-subjects/${type}/${alert.subjectId}`);
    }
  };

  const columnOptions = [
    { label: t('admin.alerts.table.severity'), value: 'severity' },
    { label: t('admin.alerts.table.status'), value: 'status' },
    { label: t('admin.alerts.table.type'), value: 'type' },
    { label: t('admin.alerts.table.subject'), value: 'subject' },
    { label: t('admin.alerts.table.impact'), value: 'impact' },
    { label: t('admin.alerts.table.firstSeen'), value: 'firstSeen' },
    { label: t('admin.alerts.table.lastSeen'), value: 'lastSeen' },
    { label: t('admin.alerts.table.count'), value: 'count' },
    { label: 'Alert ID', value: 'id' },
  ];

  const ColumnSettingsContent = (
    <div className="flex flex-col w-[200px]">
      <div className="px-1 py-2">
        <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest block mb-3">
          Display Columns
        </VFText>
        <Checkbox.Group 
          className="flex flex-col gap-3" 
          options={columnOptions} 
          value={visibleColumns}
          onChange={(vals) => setVisibleColumns(vals as string[])}
        />
      </div>
      <Divider className="my-2 opacity-40" />
      <Button 
        type="text" 
        size="small" 
        block 
        className="text-[11px] font-bold text-brand h-8"
        onClick={() => setVisibleColumns(DEFAULT_VISIBLE_COLUMNS)}
      >
        Reset to Default
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 w-full pb-20">
      {/* V1.4 对齐菜单文案 */}
      <VFPageHeader 
        title={t('menu.adminAlerts')} 
        description={t('admin.alerts.description')} 
      />

      <VFTableToolbar 
        search={{ 
          value: search, 
          onChange: setSearch, 
          placeholder: t('admin.alerts.searchPlaceholder') 
        }}
        filters={
          <div className="flex flex-wrap items-center gap-3">
            <Select 
              value={filters.severity} 
              onChange={v => setFilters(f => ({ ...f, severity: v }))} 
              className="w-40 h-10 font-bold" 
              options={[
                { label: t('admin.alerts.filters.allSeverities'), value: 'all' },
                { label: t('admin.alerts.filters.p0'), value: 'P0' },
                { label: t('admin.alerts.filters.p1'), value: 'P1' },
                { label: t('admin.alerts.filters.p2'), value: 'P2' },
              ]} 
            />
            <Select 
              value={filters.domain} 
              onChange={v => setFilters(f => ({ ...f, domain: v }))} 
              className="w-48 h-10 font-bold" 
              options={[
                { label: t('admin.alerts.filters.allDomains'), value: 'all' },
                { label: t('admin.overview.domains.studio'), value: 'studio' },
                { label: t('admin.overview.domains.selfhosted'), value: 'selfhosted' },
                { label: t('admin.overview.domains.marketplace'), value: 'marketplace' },
                { label: t('admin.overview.domains.billing'), value: 'billing' },
                { label: t('admin.overview.domains.usage'), value: 'usage' },
              ]} 
            />
            <Select 
              value={filters.status} 
              onChange={v => setFilters(f => ({ ...f, status: v }))} 
              className="w-40 h-10 font-bold" 
              options={[
                { label: t('admin.alerts.filters.allStatus'), value: 'all' },
                { label: t('admin.alerts.status.open'), value: 'OPEN' },
                { label: t('admin.alerts.status.acknowledged'), value: 'ACKNOWLEDGED' },
                { label: t('admin.alerts.status.suppressed'), value: 'SUPPRESSED' },
                { label: t('admin.alerts.status.resolved'), value: 'RESOLVED' },
              ]} 
            />
          </div>
        }
        actions={
          <div className="flex items-center gap-2">
              <Popover 
                content={ColumnSettingsContent} 
                trigger="click" 
                placement="bottomRight"
                overlayClassName="vf-popover-card"
              >
                <Button 
                  icon={<Settings2 size={16} />} 
                  className="h-10 w-10 flex items-center justify-center rounded-control text-text-tertiary hover:text-brand"
                />
              </Popover>
              
              <Button 
              icon={<FilterX size={16} />} 
              onClick={handleReset}
              className="h-10 px-4 font-bold text-text-tertiary"
            >
              {t('marketplace.filters.reset')}
            </Button>
          </div>
        }
        onRefresh={fetchAlerts}
        refreshing={loading}
      />

      <AlertsTable 
        data={filteredData} 
        loading={loading} 
        visibleKeys={visibleColumns}
        onAck={setAckTarget}
        onViewDetails={handleViewDetails}
        onViewSubject={handleViewSubject}
      />

      <AlertAckModal 
        open={!!ackTarget} 
        alertId={ackTarget?.id || ''} 
        onCancel={() => setAckTarget(null)} 
        onConfirm={handleAckConfirm} 
        loading={ackLoading} 
      />
      
      <OpResultModal 
        open={!!opResult} 
        opId={opResult?.adminOpId || ''} 
        onClose={() => setOpResult(null)} 
        onNavigateToAudit={() => onNavigate?.('admin-audit')} 
      />
    </div>
  );
};
