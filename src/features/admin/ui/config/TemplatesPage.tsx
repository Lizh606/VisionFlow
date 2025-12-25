
import React, { useState, useMemo } from 'react';
import { Button, Tooltip, App, Select, Form, Input } from 'antd';
import { RefreshCw, FilterX, History, FileCode, Search, Plus, ExternalLink, Send, ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../../shared/ui/VFPageHeader';
import { VFTableToolbar } from '../../../../ui/VFTableToolbar';
import { VFTable } from '../../../../shared/ui/VFTable';
import { VFTag } from '../../../../shared/ui/VFTag';
import { VFText } from '../../../../ui/VFText';
import { VFModal } from '../../../../ui/VFModal';
import { mockTemplates } from '../../model/mockConfig';
import { ConfigTemplate } from '../../types/config';
import { TemplateDetailDrawer } from './components/TemplateDetailDrawer';
import { useAdminOperationTracker } from '../../hooks/useAdminOperationTracker';
import { AdminOpResult } from '../../types/alerts';
import { VFOperationResultModal } from '../components/VFOperationResultModal';
import dayjs from 'dayjs';

export const TemplatesPage: React.FC<{ onBack: () => void; onNavigate: (p: string) => void }> = ({ onBack, onNavigate }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const tracker = useAdminOperationTracker();
  const [form] = Form.useForm();
  
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  
  const [selectedTemplate, setSelectedTemplate] = useState<ConfigTemplate | null>(null);
  const [cloneModalTarget, setCloneModalTarget] = useState<ConfigTemplate | null>(null);
  const [activeResultOp, setActiveResultOp] = useState<AdminOpResult | null>(null);

  const filteredData = useMemo(() => 
    mockTemplates.filter(t => 
      (t.name.toLowerCase().includes(search.toLowerCase())) &&
      (typeFilter === 'all' || t.type === typeFilter)
    )
  , [search, typeFilter]);

  const handleCloneTrigger = (tpl: ConfigTemplate) => {
    setCloneModalTarget(tpl);
  };

  const handleCloneConfirm = async () => {
    try {
      const vals = await form.validateFields();
      const opId = `OP-TPL-CLONE-${Math.random().toString(36).substring(7).toUpperCase()}`;
      
      const newOp = {
        adminOpId: opId,
        actionType: 'Clone Template Draft',
        subjectType: 'SCHEMA_TEMPLATE',
        subjectId: cloneModalTarget?.id || 'N/A',
        before: { version: cloneModalTarget?.currentVersion, state: cloneModalTarget?.status },
        after: { 
          version: `v${(parseFloat(cloneModalTarget?.currentVersion.slice(1) || '1') + 0.1).toFixed(1)}.0-draft`, 
          status: 'DRAFT',
          reason: vals.reason,
          ticketId: vals.ticketId
        },
        keyChanges: [
          { field: 'currentVersion', before: cloneModalTarget?.currentVersion, after: `${cloneModalTarget?.currentVersion}-clone` },
          { field: 'status', before: cloneModalTarget?.status, after: 'DRAFT' }
        ]
      };
      
      tracker.addOperation(newOp);
      setCloneModalTarget(null);
      setSelectedTemplate(null);
      form.resetFields();
      setActiveResultOp({ ...newOp, status: 'PENDING' as const, operatorId: 'admin-01', startedAt: new Date().toISOString() } as AdminOpResult);
    } catch (e) {}
  };

  const columns = [
    {
      title: t('admin.config.templates.table.name'),
      dataIndex: 'name',
      render: (t: string) => <VFText variant="t5-strong" color="primary" className="font-bold">{t}</VFText>
    },
    {
      title: t('admin.config.templates.table.type'),
      dataIndex: 'type',
      width: 160,
      render: (v: string) => <VFTag variant="neutral" filled={false} className="font-bold text-[9px] uppercase tracking-tighter opacity-80">{v}</VFTag>
    },
    {
      title: t('admin.config.templates.table.version'),
      dataIndex: 'currentVersion',
      width: 120,
      render: (v: string) => <VFText variant="t7" color="secondary" className="font-bold tabular-nums px-1.5 py-0.5 bg-bg-page border border-divider rounded">{v}</VFText>
    },
    {
      title: t('admin.config.templates.table.status'),
      dataIndex: 'status',
      width: 120,
      render: (s: string) => <VFTag variant={s === 'ACTIVE' ? 'success' : 'warning'} filled={s === 'ACTIVE'} className="text-[10px] font-bold uppercase">{s}</VFTag>
    },
    {
      title: t('admin.config.templates.table.updated'),
      key: 'updated',
      width: 180,
      render: (_: any, r: ConfigTemplate) => <VFText variant="t7" color="disabled" tabularNums>{dayjs(r.updatedAt).format('YYYY-MM-DD')}</VFText>
    }
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 w-full pb-24">
      <VFPageHeader title={t('admin.config.templates.title')} onBack={onBack} />

      <VFTableToolbar 
        search={{ value: search, onChange: setSearch, placeholder: t('admin.config.templates.searchPlaceholder') }}
        filters={
          <Select 
            value={typeFilter} 
            onChange={setTypeFilter} 
            className="w-48 h-10 font-bold"
            options={[
              { label: 'All Types', value: 'all' },
              { label: 'Pricing', value: 'PRICING' },
              { label: 'Revenue Share', value: 'REVENUE_SHARE' },
            ]}
          />
        }
        actions={
          <div className="flex items-center gap-2">
             <Button icon={<FilterX size={16} />} onClick={() => { setSearch(''); setTypeFilter('all'); }} className="h-10 px-4 font-bold text-text-tertiary">Reset</Button>
             <Tooltip title={t('common.comingSoon')}>
               <Button disabled icon={<Plus size={16} />} className="h-10 px-6 font-bold rounded-control">New Template</Button>
             </Tooltip>
          </div>
        }
        onRefresh={() => { setLoading(true); setTimeout(() => setLoading(false), 600); }}
        refreshing={loading}
      />

      <VFTable 
        dataSource={filteredData} 
        columns={columns as any} 
        loading={loading} 
        rowKey="id" 
        pagination={{ pageSize: 15 }} 
        onRow={r => ({ onClick: () => setSelectedTemplate(r), className: 'cursor-pointer group' })} 
      />

      <TemplateDetailDrawer 
        open={!!selectedTemplate} 
        template={selectedTemplate} 
        onClose={() => setSelectedTemplate(null)} 
        onClone={handleCloneTrigger} 
      />

      <VFModal
        title={t('admin.config.templates.drawer.cloneModalTitle')}
        open={!!cloneModalTarget}
        onCancel={() => setCloneModalTarget(null)}
        onConfirm={handleCloneConfirm}
        confirmText={t('admin.config.templates.drawer.cloneBtn')}
        width={480}
      >
        <div className="flex flex-col text-left gap-6 pt-2">
          <div className="p-4 bg-brand/5 border border-brand/10 rounded-card flex gap-4">
             <ShieldAlert size={20} className="text-brand shrink-0 mt-0.5" />
             <VFText variant="t6" color="secondary" className="leading-relaxed font-medium">
               {t('admin.config.templates.drawer.cloneModalHint')}
             </VFText>
          </div>
          <Form form={form} layout="vertical" requiredMark={true}>
            <Form.Item 
              label={<VFText variant="t5-strong" color="secondary">{t('marketplace.seller.wizard.pricing.sellerTerms')}</VFText>} 
              name="reason" 
              rules={[{ required: true, message: 'Justification is mandatory' }]}
            >
              <Input.TextArea rows={3} placeholder="Explain why this clone is required..." className="rounded-control p-3" />
            </Form.Item>
            <Form.Item label={<VFText variant="t5-strong" color="secondary">Ticket ID (Optional)</VFText>} name="ticketId">
              <Input placeholder="e.g. OPS-12345" className="h-10 font-mono" />
            </Form.Item>
          </Form>
        </div>
      </VFModal>

      <VFOperationResultModal 
        open={!!activeResultOp} 
        result={tracker.operations.find(o => o.adminOpId === activeResultOp?.adminOpId) || activeResultOp} 
        onClose={() => setActiveResultOp(null)} 
        onNavigateToAudit={(id) => onNavigate(`admin-audit?adminOpId=${id}`)} 
      />
    </div>
  );
};
