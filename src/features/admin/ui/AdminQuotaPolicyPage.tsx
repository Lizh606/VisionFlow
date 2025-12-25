
import React, { useState, useMemo, useEffect } from 'react';
import { Button, Select, App, Space, Tooltip } from 'antd';
import { 
  RefreshCw, FilterX, Edit2, 
  Eye, ShieldCheck
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { VFTableToolbar } from '../../../ui/VFTableToolbar';
import { VFTable } from '../../../shared/ui/VFTable';
import { VFTag } from '../../../shared/ui/VFTag';
import { VFText } from '../../../ui/VFText';
import { QuotaPolicyDrawer } from './components/QuotaPolicyDrawer';
import { PublishConfirmModal } from './components/PublishConfirmModal';
import { VFOperationResultModal } from './components/VFOperationResultModal';
import { useAdminOperationTracker } from '../hooks/useAdminOperationTracker';
import { mockQuotaPolicies, mockQuotaHistory } from '../model/mockQuota';
import { QuotaPolicy } from '../types/quota';
import { AdminOpResult } from '../types/alerts';
import dayjs from 'dayjs';

const MOCK_ROLE: string = 'ops_admin';

export const AdminQuotaPolicyPage: React.FC<{ onNavigate?: (p: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const tracker = useAdminOperationTracker();
  
  const [data, setData] = useState<QuotaPolicy[]>(mockQuotaPolicies);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'view' | 'edit'>('view');
  const [selectedPolicy, setSelectedPolicy] = useState<QuotaPolicy | null>(null);
  
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<any>(null);
  const [activeResultOp, setActiveResultOp] = useState<AdminOpResult | null>(null);

  const fetchPolicies = async () => {
    setLoading(true);
    setTimeout(() => {
      setData(mockQuotaPolicies);
      setLoading(false);
      message.success(t('admin.quota.syncSuccess'));
    }, 800);
  };

  useEffect(() => {
    tracker.recentOps.forEach(op => {
      if (op.status === 'SUCCESS' && op.actionType === 'Update Quota Policy') {
        const workspaceId = op.subjectId;
        setData(prev => prev.map(p => {
          if (p.workspaceId === workspaceId && p.status !== 'ACTIVE') {
            const updated = {
              ...p,
              ...op.after,
              status: 'ACTIVE' as const,
              updatedAt: op.timestamp || new Date().toISOString(),
              updatedBy: op.operatorId,
              version: `v${(parseFloat(p.version.slice(1)) + 0.1).toFixed(1)}.0`
            };
            if (selectedPolicy?.workspaceId === workspaceId) setSelectedPolicy(updated);
            return updated;
          }
          return p;
        }));
      }
    });
  }, [tracker.recentOps]);

  const handleOpenDrawer = (p: QuotaPolicy, mode: 'view' | 'edit' = 'view') => {
    setSelectedPolicy(p);
    setDrawerMode(mode);
    setDrawerOpen(true);
  };

  const handlePublishTrigger = (values: any) => {
    setPendingChanges(values);
    setPublishModalOpen(true);
  };

  const handlePublishConfirm = (opPayload: any) => {
    const opId = `01HFZ${Math.random().toString(36).substring(7).toUpperCase()}`;
    const newOp = {
      adminOpId: opId,
      actionType: 'Update Quota Policy',
      subjectType: 'WORKSPACE_QUOTA',
      subjectId: selectedPolicy?.workspaceId || 'N/A',
      before: selectedPolicy ? { freeQuota: selectedPolicy.freeQuota, rateLimit: selectedPolicy.rateLimit, status: selectedPolicy.status } : {},
      after: { ...pendingChanges, ...opPayload },
      keyChanges: [
        { field: 'freeQuota', before: selectedPolicy?.freeQuota, after: pendingChanges.freeQuota },
        { field: 'rateLimit', before: selectedPolicy?.rateLimit, after: pendingChanges.rateLimit },
        { field: 'status', before: selectedPolicy?.status, after: 'ACTIVE' }
      ]
    };
    tracker.addOperation(newOp);
    setPublishModalOpen(false);
    setActiveResultOp({ ...newOp, status: 'PENDING' as const, operatorId: 'admin-01', startedAt: new Date().toISOString() } as AdminOpResult);
  };

  const filteredData = useMemo(() => {
    return data.filter(p => {
      const matchSearch = !search || 
        p.workspaceId.toLowerCase().includes(search.toLowerCase()) || 
        p.workspaceName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [data, search, statusFilter]);

  const columns = [
    {
      title: t('admin.quota.table.workspaceId'),
      key: 'workspaceId',
      width: 220,
      render: (_: any, r: QuotaPolicy) => <VFText variant="t7" color="tertiary" className="font-mono font-bold uppercase tracking-tight">{r.workspaceId}</VFText>
    },
    {
      title: t('admin.quota.table.workspaceName'),
      dataIndex: 'workspaceName',
      width: 220,
      render: (txt: string) => <VFText variant="t5-strong" color="primary">{txt}</VFText>
    },
    {
      title: t('admin.quota.table.freeQuota'),
      dataIndex: 'freeQuota',
      width: 160,
      render: (v: number) => (
        <div className="flex items-baseline gap-1.5">
          <VFText variant="t5" color="primary" tabularNums className="font-bold">{v.toLocaleString()}</VFText>
          <VFText variant="t6" color="tertiary" className="uppercase font-bold text-[9px] opacity-60">Images/Mo</VFText>
        </div>
      )
    },
    {
      title: t('admin.quota.table.rateLimit'),
      dataIndex: 'rateLimit',
      width: 160,
      render: (v: number) => (
        <div className="flex items-baseline gap-1.5">
          <VFText variant="t5" color="brand" tabularNums className="font-bold">{v}</VFText>
          <VFText variant="t6" color="tertiary" className="uppercase font-bold text-[9px] opacity-60">Inf/Min</VFText>
        </div>
      )
    },
    {
      title: t('admin.quota.table.status'),
      dataIndex: 'status',
      width: 120,
      render: (s: string) => (
        <VFTag variant={s === 'ACTIVE' ? 'success' : s === 'DRAFT' ? 'warning' : 'neutral'} filled={s === 'ACTIVE'} className="font-bold text-[10px] uppercase">
          {s}
        </VFTag>
      )
    },
    {
      title: t('admin.quota.table.lastUpdated'),
      key: 'updated',
      width: 200,
      render: (_: any, r: QuotaPolicy) => (
        <div className="flex flex-col gap-0.5">
           <div className="flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-text-tertiary opacity-40" />
              <VFText variant="t6" color="secondary" className="font-medium">{r.updatedBy}</VFText>
           </div>
           <VFText variant="t7" color="disabled" tabularNums>{dayjs(r.updatedAt).fromNow()}</VFText>
        </div>
      )
    },
    {
      title: '',
      key: 'actions',
      width: 80,
      align: 'right' as const,
      render: (_: any, r: QuotaPolicy) => (
        <Space onClick={e => e.stopPropagation()}>
           <Button type="text" icon={<Eye size={16} />} onClick={() => handleOpenDrawer(r, 'view')} className="text-text-tertiary" />
           <Button disabled={MOCK_ROLE === 'support_readonly'} type="text" icon={<Edit2 size={16} />} onClick={() => handleOpenDrawer(r, 'edit')} className="text-text-tertiary" />
        </Space>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 w-full pb-20">
      <VFPageHeader title={t('admin.quota.title')} description={t('admin.quota.description')} />

      <VFTableToolbar 
        search={{ value: search, onChange: setSearch, placeholder: t('admin.quota.searchPlaceholder') }}
        filters={
          <Select 
            value={statusFilter} 
            onChange={setStatusFilter} 
            className="w-48 h-10 font-bold"
            options={[
              { label: t('admin.quota.statusFilter.all'), value: "all" },
              { label: t('admin.quota.statusFilter.active'), value: "ACTIVE" },
              { label: t('admin.quota.statusFilter.draft'), value: "DRAFT" },
              { label: t('admin.quota.statusFilter.disabled'), value: "DISABLED" },
            ]}
          />
        }
        actions={<Button icon={<FilterX size={16} />} onClick={() => { setSearch(''); setStatusFilter('all'); }} className="h-10 px-4 font-bold text-text-tertiary">Reset</Button>}
        onRefresh={fetchPolicies}
        refreshing={loading}
      />

      <VFTable dataSource={filteredData} columns={columns as any} loading={loading} rowKey="workspaceId" pagination={{ pageSize: 10 }} />

      <QuotaPolicyDrawer open={drawerOpen} mode={drawerMode} policy={selectedPolicy} onClose={() => setDrawerOpen(false)} onModeChange={setDrawerMode} isAdmin={MOCK_ROLE === 'ops_admin'} onPublish={handlePublishTrigger} />
      <PublishConfirmModal open={publishModalOpen} workspaceInfo={selectedPolicy ? { id: selectedPolicy.workspaceId, name: selectedPolicy.workspaceName, workflowsCount: 5, usage24h: '1.2M inf' } : undefined} onCancel={() => setPublishModalOpen(false)} onConfirm={handlePublishConfirm} />
      <VFOperationResultModal open={!!activeResultOp} result={tracker.operations.find(o => o.adminOpId === activeResultOp?.adminOpId) || activeResultOp} onClose={() => setActiveResultOp(null)} onNavigateToAudit={(id) => onNavigate?.(`admin-audit?adminOpId=${id}`)} />
    </div>
  );
};
