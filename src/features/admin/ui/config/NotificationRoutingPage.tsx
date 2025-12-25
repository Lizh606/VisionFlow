
import React, { useState, useMemo } from 'react';
import { Button, Tooltip, App, Divider } from 'antd';
import { RefreshCw, FilterX, Plus, Mail, Hash, Globe, Lock, ShieldCheck, Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../../shared/ui/VFPageHeader';
import { VFTableToolbar } from '../../../../ui/VFTableToolbar';
import { VFTable } from '../../../../shared/ui/VFTable';
import { VFTag } from '../../../../shared/ui/VFTag';
import { VFText } from '../../../../ui/VFText';
import { VFDrawer } from '../../../../ui/VFDrawer';
import { mockNotificationRoutes } from '../../model/mockConfig';
import { NotificationRoute } from '../../types/config';
import dayjs from 'dayjs';

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center justify-between py-3 border-b border-divider/40 last:border-none min-h-[44px]">
    <VFText variant="t6" color="tertiary" className="font-bold uppercase tracking-widest text-[10px]">{label}</VFText>
    <div className="text-right truncate ml-4 min-w-0">{value}</div>
  </div>
);

export const NotificationRoutingPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<NotificationRoute | null>(null);

  const maskTarget = (target: string) => {
    if (!target) return '***';
    if (target.includes('@')) {
      const [u, d] = target.split('@');
      return `${u.slice(0, 2)}***@${d}`;
    }
    if (target.startsWith('#')) return `${target.slice(0, 2)}***`;
    return `${target.slice(0, 5)}...`;
  };

  const getChannelIcon = (type: string) => {
    switch(type) {
      case 'EMAIL': return <Mail size={14} />;
      case 'SLACK': return <Hash size={14} />;
      default: return <Globe size={14} />;
    }
  };

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    message.success(t('common.copy') + ' OK');
  };

  const columns = [
    {
      title: t('admin.config.notificationRouting.table.routeName'),
      dataIndex: 'name',
      render: (t: string) => <VFText variant="t5-strong" color="primary">{t}</VFText>
    },
    {
      title: t('admin.config.notificationRouting.table.channel'),
      dataIndex: 'channelType',
      width: 140,
      render: (type: string) => (
        <div className="flex items-center gap-2">
          <div className="text-text-tertiary opacity-60">{getChannelIcon(type)}</div>
          <VFText variant="t6" color="secondary" className="font-bold tracking-tight">{type}</VFText>
        </div>
      )
    },
    {
      title: t('admin.config.notificationRouting.table.target'),
      dataIndex: 'target',
      width: 240,
      render: (v: string) => <VFText variant="t7" color="tertiary" className="font-mono opacity-80">{maskTarget(v)}</VFText>
    },
    {
      title: t('admin.config.notificationRouting.table.status'),
      dataIndex: 'status',
      width: 120,
      render: (s: string) => <VFTag variant={s === 'ENABLED' ? 'success' : 'neutral'} filled={s === 'ENABLED'}>{s}</VFTag>
    }
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 w-full pb-24">
      <VFPageHeader title={t('admin.config.notificationRouting.title')} onBack={onBack} />

      <VFTableToolbar 
        search={{ value: search, onChange: setSearch, placeholder: t('admin.config.notificationRouting.searchPlaceholder') }}
        actions={
          <div className="flex items-center gap-2">
            <Button icon={<FilterX size={16} />} onClick={() => setSearch('')} className="h-10 px-4 font-bold text-text-tertiary">Reset</Button>
            <Tooltip title={t('common.comingSoon')}>
              <Button disabled icon={<Plus size={16} />} className="h-10 px-6 font-bold rounded-control">Create Route</Button>
            </Tooltip>
          </div>
        }
        onRefresh={() => { setLoading(true); setTimeout(() => setLoading(false), 600); }}
        refreshing={loading}
      />

      <VFTable 
        dataSource={mockNotificationRoutes.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))} 
        columns={columns as any} 
        loading={loading} 
        rowKey="id" 
        pagination={{ pageSize: 15 }} 
        onRow={r => ({ onClick: () => setSelectedRoute(r), className: 'cursor-pointer group' })} 
      />

      <VFDrawer title={t('admin.config.notificationRouting.drawer.title')} subtitle={selectedRoute?.id} open={!!selectedRoute} onClose={() => setSelectedRoute(null)} size="S">
        {selectedRoute && (
          <div className="flex flex-col gap-8 py-2">
            <div>
              <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest mb-4 block opacity-60">
                {t('admin.config.notificationRouting.drawer.conditions')}
              </VFText>
              <div className="bg-bg-card border border-divider rounded-card p-5 flex flex-col shadow-sm">
                 <InfoRow label="Match Domain" value={<VFText variant="t5-strong" color="primary">ALL (*)</VFText>} />
                 <InfoRow label="Min Severity" value={<VFTag variant="warning" filled>P1</VFTag>} />
                 <InfoRow label="Status Filter" value={<VFText variant="t5-strong">OPEN / ACK</VFText>} />
                 <div className="mt-4 pt-4 border-t border-divider/40">
                    <VFText variant="t6" color="tertiary" className="uppercase font-bold text-[9px] mb-2 block">{t('admin.config.common.expression')}</VFText>
                    <code className="block p-3 bg-bg-page rounded font-mono text-[11px] text-text-secondary">
                      domain in ["studio", "sh-edge"] && severity &lt;= P1
                    </code>
                 </div>
              </div>
            </div>
            
            <div>
              <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest mb-4 block opacity-60">
                {t('admin.config.notificationRouting.drawer.target')}
              </VFText>
              <div className="bg-bg-card border border-divider rounded-card p-5 flex items-center gap-4 shadow-sm relative group">
                  <div className="w-10 h-10 rounded-full bg-bg-page border border-divider flex items-center justify-center shrink-0">
                    {getChannelIcon(selectedRoute.channelType)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest text-[9px] mb-0.5">{selectedRoute.channelType} Endpoint</VFText>
                    <div className="flex items-center gap-2">
                       <VFText variant="t5-strong" color="primary" truncate>{maskTarget(selectedRoute.target)}</VFText>
                       <Tooltip title={t('admin.config.notificationRouting.drawer.maskHint')}>
                         <Lock size={12} className="text-text-tertiary opacity-40" />
                       </Tooltip>
                    </div>
                  </div>
                  <Button 
                    type="text" size="small" icon={<Copy size={14}/>} 
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 hover:text-brand" 
                    onClick={(e) => handleCopy(e, selectedRoute.target)}
                  />
              </div>
            </div>

            <div className="mt-auto p-4 bg-bg-page/40 rounded-card border border-divider border-dashed flex gap-3">
              <ShieldCheck size={16} className="text-success opacity-60 shrink-0 mt-0.5" />
              <VFText variant="t6" color="tertiary" className="italic leading-relaxed">
                Routing logic is defined via Infrastructure as Code (IaC). Snapshot refreshed 12m ago.
              </VFText>
            </div>
          </div>
        )}
      </VFDrawer>
    </div>
  );
};
