import React, { useMemo } from 'react';
import { Button, Table, Alert, Tabs, Tooltip, Collapse, Space, Skeleton } from 'antd';
import { 
  AlertTriangle, RefreshCw, Activity, Info, Search, 
  ArrowRight, Database, ExternalLink, Zap, Package, 
  ChevronRight, FileJson
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFText } from '../../../../ui/VFText';
import { VFTag } from '../../../../shared/ui/VFTag';
import { AdminAlert, SoTResult } from '../../types/alerts';
import dayjs from 'dayjs';

interface Props {
  alert: AdminAlert;
  sot: SoTResult | null;
  loading: boolean;
  onQuery: () => void;
  onViewHealth: () => void;
  onOpenSubjectDetail: () => void;
}

export const AlertDetailSnapshot: React.FC<Props> = ({ 
  alert, sot, loading, onQuery, onViewHealth, onOpenSubjectDetail 
}) => {
  const { t } = useTranslation();

  // P0: Subject Type Convergence (严格限制为 UC 合规类型)
  const normalizedType = useMemo(() => {
    const type = alert.subjectType.toUpperCase();
    const valid = ['DEVICE', 'ENTITLEMENT', 'ORDER', 'RUN'];
    return valid.includes(type) ? type : 'DEVICE';
  }, [alert.subjectType]);

  // P0: Diff Logic - 基于当前主体类型进行比对
  const diffItems = useMemo(() => {
    if (!sot || !sot.data || !alert.snapshot) return [];
    const subjectKey = alert.subjectType.toLowerCase() as any;
    const snapObj = (alert.snapshot as any)?.[subjectKey] || {};
    const sotObj = (sot.data as any)?.[subjectKey] || {};
    
    const allKeys = Array.from(new Set([...Object.keys(snapObj), ...Object.keys(sotObj)]));
    return allKeys.map(k => ({
      field: k,
      snapshot: snapObj[k] !== undefined ? snapObj[k] : 'N/A',
      sot: sotObj[k] !== undefined ? sotObj[k] : 'N/A',
      isConsistent: JSON.stringify(snapObj[k]) === JSON.stringify(sotObj[k])
    }));
  }, [alert.snapshot, sot, alert.subjectType]);

  const inconsistentCount = diffItems.filter(d => !d.isConsistent).length;

  const renderKVTable = (data: any) => {
    const dataSource = Object.entries(data).map(([k, v]) => ({ key: k, field: k, value: String(v) }));
    return (
      <Table 
        size="small" pagination={false} dataSource={dataSource}
        className="vf-compact-kv-table"
        columns={[
          { title: 'Field', dataIndex: 'field', width: '40%', render: (t_key) => <VFText variant="t6" color="tertiary" className="font-bold uppercase tracking-widest text-[10px]">{t_key}</VFText> },
          { title: 'Value', dataIndex: 'value', render: (v) => <VFText variant="t5-strong" color="primary">{v}</VFText> }
        ]}
      />
    );
  };

  const renderStructuredSummary = (key: string, data: any) => {
    if (!data) return null;
    const entries = Object.entries(data).slice(0, 4); // 限制摘要行数提升可读性
    return (
      <div className="p-4 bg-bg-page border border-divider rounded-control hover:border-brand/20 transition-colors">
         <VFText variant="t6" color="tertiary" className="uppercase font-bold text-[9px] mb-3 block opacity-60 tracking-wider">{key}</VFText>
         <div className="flex flex-col gap-2">
            {entries.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between text-[11px]">
                 <span className="text-text-tertiary font-medium">{k}:</span>
                 <span className="text-text-secondary font-bold tabular-nums truncate max-w-[140px]">{String(v)}</span>
              </div>
            ))}
         </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <VFCard 
        title={
          <div className="flex items-center gap-2">
            <span>{t('admin.alerts.detail.subjectState')}</span>
            <VFTag variant="neutral" filled={false} className="font-bold scale-90">{normalizedType}</VFTag>
          </div>
        }
        className="shadow-none border-border"
        extra={
          <Button 
            type="primary" size="small" loading={loading}
            icon={<RefreshCw size={14} className={loading ? 'animate-spin' : ''} />}
            onClick={onQuery}
            className="font-bold h-8 px-3 rounded-control shadow-sm"
          >
            {t('admin.alerts.detail.runSotQuery')}
          </Button>
        }
      >
        <div className="flex flex-col gap-6">
          {/* Freshness Row */}
          <div className="grid grid-cols-3 gap-4">
             {[
               { icon: Info, label: t('admin.alerts.detail.lastAggregated'), val: sot ? dayjs(sot.lastAggregatedAt).format('HH:mm:ss') : 'N/A' },
               { icon: Activity, label: t('admin.alerts.detail.aggregateLag'), val: sot ? `${Math.floor(sot.lagMs/1000)}s` : '---', color: sot && sot.lagMs > 60000 ? 'warning' : 'primary' },
               { icon: Database, label: t('admin.alerts.detail.dlqDepth'), val: sot ? String(sot.dlqCount) : '0', color: sot && sot.dlqCount > 0 ? 'error' : 'primary' }
             ].map((m, i) => (
               <div key={i} className="bg-bg-page/50 p-3.5 rounded-card border border-divider">
                  <div className="flex items-center gap-2 mb-1 opacity-60">
                     <m.icon size={12} />
                     <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest text-[9px]">{m.label}</VFText>
                  </div>
                  <VFText variant="t5" color={m.color as any || 'primary'} tabularNums className="font-bold">{m.val}</VFText>
               </div>
             ))}
          </div>

          {/* Main Content Area */}
          <div className="border border-divider rounded-card overflow-hidden min-h-[320px] bg-bg-card flex flex-col">
             <Tabs 
               className="vf-detail-tabs"
               tabBarStyle={{ padding: '0 24px', margin: 0, borderBottom: '1px solid var(--vf-divider)' }}
               items={[
                 {
                   key: 'snapshot',
                   label: <span className="flex items-center gap-2"><Database size={14}/>{t('admin.alerts.detail.snapshotTab')}</span>,
                   children: <div className="p-6">{renderKVTable(alert.snapshot?.[alert.subjectType.toLowerCase()] || {})}</div>
                 },
                 {
                   key: 'sot',
                   label: <span className="flex items-center gap-2"><Zap size={14}/>{t('admin.alerts.detail.sotTab')}</span>,
                   children: (
                     <div className="p-6 flex flex-col h-full min-h-[240px]">
                       {loading ? <Skeleton active paragraph={{ rows: 6 }} /> : !sot ? (
                         <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                            <div className="w-12 h-12 rounded-full bg-bg-page flex items-center justify-center text-text-tertiary mb-4">
                               <Search size={24} strokeWidth={1.5} />
                            </div>
                            <VFText variant="t5-strong" color="primary" className="mb-1">{t('admin.alerts.detail.sotEmptyTitle')}</VFText>
                            <VFText variant="t6" color="tertiary" className="max-w-xs mb-6 opacity-80 leading-relaxed">
                              {t('admin.alerts.detail.sotEmptyDesc')}
                            </VFText>
                            <Button type="primary" onClick={onQuery} icon={<RefreshCw size={14} />} className="font-bold h-9 px-6 rounded-control">
                              {t('admin.alerts.detail.runSotQuery')}
                            </Button>
                         </div>
                       ) : renderKVTable(sot.data[alert.subjectType.toLowerCase()] || {})}
                     </div>
                   )
                 },
                 {
                   key: 'diff',
                   label: <span className="flex items-center gap-2"><ChevronRight size={14}/>{t('admin.alerts.detail.diffTab')}</span>,
                   disabled: !sot,
                   children: !sot ? (
                     <div className="p-12 flex flex-col items-center justify-center opacity-40">
                        <AlertTriangle size={24} className="mb-2" />
                        <VFText variant="t6" color="tertiary" className="font-medium text-center">{t('admin.alerts.detail.diffDisabledDesc')}</VFText>
                     </div>
                   ) : (
                     <div className="p-6">
                       <Table 
                        size="small" pagination={false} dataSource={diffItems} rowKey="field"
                        className="vf-standard-table"
                        columns={[
                          { title: 'Field', dataIndex: 'field', width: '30%', render: (txt, r) => (
                            <div className="flex items-center gap-2">
                              {!r.isConsistent && <div className="w-1 h-3.5 bg-error rounded-full shrink-0" />}
                              <VFText variant="t6" color="secondary" className="font-bold">{txt}</VFText>
                            </div>
                          )},
                          { title: 'Snapshot', dataIndex: 'snapshot', width: '35%', render: (v) => <VFText variant="t7" color="tertiary" className="font-mono">{String(v)}</VFText> },
                          { title: 'Live (SoT)', dataIndex: 'sot', width: '35%', render: (v, r) => (
                            <VFText variant="t7" color={r.isConsistent ? 'primary' : 'error'} className={`font-mono ${!r.isConsistent ? 'font-bold underline decoration-error/30 underline-offset-2' : ''}`}>
                              {String(v)}
                            </VFText>
                          )}
                        ]}
                       />
                     </div>
                   )
                 }
               ]}
             />
          </div>

          {/* Alert Banner for DRIFT */}
          {sot && inconsistentCount > 0 && (
            <Alert
              type="error" showIcon icon={<AlertTriangle />}
              message={<span className="font-bold text-sm">{t('admin.alerts.detail.stateDrift', { count: inconsistentCount })}</span>}
              description={
                <div className="flex flex-col gap-3">
                  <VFText variant="t6" color="secondary" className="leading-relaxed">{t('admin.alerts.detail.driftDesc')}</VFText>
                  <Button type="link" size="small" icon={<ArrowRight size={14} />} onClick={onViewHealth} className="vf-warning-link-btn w-fit font-bold h-8 px-0 flex items-center gap-1.5 underline underline-offset-4">
                    {t('admin.alerts.detail.openHealth')}
                  </Button>
                </div>
              }
              className="rounded-card border-error/20 bg-error/[0.02]"
            />
          )}

          {/* Secondary Domain Context - Collapsible */}
          <Collapse 
            ghost className="vf-secondary-context"
            items={[{
              key: 'related',
              label: (
                <div className="flex items-center gap-2">
                  <Package size={14} className="text-text-tertiary" />
                  <VFText variant="t6" color="tertiary" className="font-bold uppercase tracking-widest">{t('admin.alerts.detail.relatedContext')}</VFText>
                </div>
              ),
              children: (
                <div className="flex flex-col gap-5 pl-1">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(alert.snapshot || {}).map(([key, data]) => {
                        if (key === alert.subjectType.toLowerCase()) return null;
                        return <React.Fragment key={key}>{renderStructuredSummary(key, data)}</React.Fragment>;
                      })}
                   </div>
                   <Collapse ghost size="small" items={[{
                      key: 'raw',
                      label: <div className="flex items-center gap-2 opacity-60"><FileJson size={12}/> <span className="text-[10px] font-bold uppercase">{t('admin.alerts.detail.rawView')}</span></div>,
                      children: <pre className="text-[10px] font-mono p-4 bg-bg-page rounded-control overflow-auto max-h-40 custom-scrollbar">{JSON.stringify(alert.snapshot, null, 2)}</pre>
                   }]} />
                </div>
              )
            }]}
          />
        </div>
      </VFCard>

      <style>{`
        .vf-compact-kv-table .ant-table-thead { display: none; }
        .vf-compact-kv-table .ant-table-cell { padding: 10px 12px !important; border-bottom: 1px solid rgba(var(--vf-divider), 0.5) !important; }
        .vf-compact-kv-table .ant-table-row:last-child .ant-table-cell { border-bottom: none !important; }
        .vf-detail-tabs .ant-tabs-nav::before { border: none !important; }
        .vf-secondary-context .ant-collapse-header { padding: 0 !important; }
        .vf-warning-link-btn.ant-btn-link { color: rgba(var(--vf-warning), 1) !important; }
        .vf-warning-link-btn.ant-btn-link:hover { color: rgba(var(--vf-warning), 0.8) !important; }
      `}</style>
    </div>
  );
};