
import React, { useState, useMemo } from 'react';
import { Button, Tooltip, App, Divider } from 'antd';
import { RefreshCw, FilterX, Plus, Copy, Terminal, Info, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../../shared/ui/VFPageHeader';
import { VFTableToolbar } from '../../../../ui/VFTableToolbar';
import { VFTable } from '../../../../shared/ui/VFTable';
import { VFTag } from '../../../../shared/ui/VFTag';
import { VFText } from '../../../../ui/VFText';
import { VFDrawer } from '../../../../ui/VFDrawer';
import { mockAlertRules } from '../../model/mockConfig';
import { AlertRule } from '../../types/config';
import dayjs from 'dayjs';

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center justify-between py-3 border-b border-divider/40 last:border-none">
    <VFText variant="t6" color="tertiary" className="font-bold uppercase tracking-widest text-[10px]">{label}</VFText>
    <div className="text-right">{value}</div>
  </div>
);

export const AlertRulesPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedRule, setSelectedRule] = useState<AlertRule | null>(null);

  const filteredData = useMemo(() => 
    mockAlertRules.filter(r => r.name.toLowerCase().includes(search.toLowerCase()))
  , [search]);

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    message.success(t('common.copy') + ' OK');
  };

  const columns = [
    {
      title: t('admin.config.alertRules.table.ruleName'),
      dataIndex: 'name',
      render: (txt: string) => <VFText variant="t5-strong" color="primary">{txt}</VFText>
    },
    {
      title: t('admin.config.alertRules.table.domain'),
      dataIndex: 'domain',
      width: 120,
      render: (d: string) => <VFTag variant="neutral" filled={false} className="uppercase font-bold text-[9px]">{d}</VFTag>
    },
    {
      title: t('admin.config.alertRules.table.severity'),
      dataIndex: 'severity',
      width: 100,
      render: (v: string) => <VFTag variant={v === 'P0' ? 'error' : 'warning'} filled>{v}</VFTag>
    },
    {
      title: t('admin.config.alertRules.table.status'),
      dataIndex: 'status',
      width: 120,
      render: (s: string) => <VFTag variant={s === 'ENABLED' ? 'success' : 'neutral'} filled={s === 'ENABLED'}>{s}</VFTag>
    },
    {
      title: t('admin.config.alertRules.table.updated'),
      key: 'updated',
      width: 180,
      render: (_: any, r: AlertRule) => <VFText variant="t7" color="disabled" tabularNums>{dayjs(r.updatedAt).format('YYYY-MM-DD')}</VFText>
    }
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 w-full pb-24">
      <VFPageHeader title={t('admin.config.alertRules.title')} onBack={onBack} />

      <VFTableToolbar 
        search={{ value: search, onChange: setSearch, placeholder: t('admin.config.alertRules.searchPlaceholder') }}
        actions={
          <div className="flex items-center gap-2">
            <Button icon={<FilterX size={16} />} onClick={() => setSearch('')} className="h-10 px-4 font-bold text-text-tertiary">Reset</Button>
            <Tooltip title={t('common.comingSoon')}>
              <Button disabled icon={<Plus size={16} />} className="h-10 px-6 font-bold rounded-control">Create Rule</Button>
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
        onRow={r => ({ onClick: () => setSelectedRule(r), className: 'cursor-pointer group' })} 
      />

      <VFDrawer
        title={t('admin.config.alertRules.drawer.title')}
        subtitle={selectedRule?.id}
        open={!!selectedRule}
        onClose={() => setSelectedRule(null)}
        size="S"
      >
        {selectedRule && (
          <div className="flex flex-col gap-8 py-2">
            <div>
              <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest mb-4 block opacity-60">
                {t('admin.config.common.overview')}
              </VFText>
              <div className="bg-bg-card border border-divider rounded-card p-5 flex flex-col shadow-sm">
                 <InfoRow label="Rule Name" value={<VFText variant="t5-strong" color="primary">{selectedRule.name}</VFText>} />
                 <InfoRow label="Status" value={<VFTag variant="success" filled>{selectedRule.status}</VFTag>} />
                 <InfoRow label="Severity" value={<VFTag variant="error" filled>{selectedRule.severity}</VFTag>} />
                 <InfoRow label="Domain" value={<VFText variant="t5-strong" className="uppercase">{selectedRule.domain}</VFText>} />
              </div>
            </div>

            <div>
              <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest mb-4 block opacity-60">
                {t('admin.config.alertRules.drawer.definition')}
              </VFText>
              <div className="relative group">
                 <pre className="p-5 bg-bg-page border border-divider rounded-card text-[12px] font-mono leading-relaxed text-text-secondary overflow-x-auto shadow-inner">
                   {selectedRule.definition}
                 </pre>
                 <Button 
                   type="text" size="small" icon={<Copy size={14} />} 
                   className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 hover:text-brand bg-bg-card border border-divider shadow-sm rounded transition-all"
                   onClick={(e) => handleCopy(e, selectedRule.definition)}
                 />
              </div>
            </div>
            
            <div className="mt-auto p-4 bg-bg-page/40 rounded-card border border-divider border-dashed flex gap-3">
              <Shield size={16} className="text-text-tertiary shrink-0 mt-0.5" />
              <VFText variant="t6" color="tertiary" className="italic leading-relaxed">
                {t('admin.config.alertRules.drawer.copyHint')}
              </VFText>
            </div>
          </div>
        )}
      </VFDrawer>
    </div>
  );
};
