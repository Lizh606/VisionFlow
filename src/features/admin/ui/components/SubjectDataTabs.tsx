import React, { useState, useMemo } from 'react';
import { Tabs, Button, Alert, App, Collapse, Skeleton } from 'antd';
import { Database, Search, AlertTriangle, ArrowRight, Zap, Terminal, RefreshCw, FileJson } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFText } from '../../../../ui/VFText';
import { VFTable } from '../../../../shared/ui/VFTable';
import { VFEmptyState } from '../../../../shared/ui/VFEmptyState';
import { mockSubjectDetails } from '../../model/mockSubjects';

interface Props {
  snapshot: any;
  subjectId: string;
  subjectType: string;
  onViewHealth: () => void;
}

export const SubjectDataTabs: React.FC<Props> = ({ snapshot, subjectId, subjectType, onViewHealth }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [activeTab, setActiveTab] = useState('snapshot');
  const [sotData, setSotData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // P0: SoT Trigger closed loop
  const handleRunQuery = () => {
    setLoading(true);
    setTimeout(() => {
      const result = mockSubjectDetails[subjectId] || mockSubjectDetails['dev_829305_a'];
      setSotData(result.sot || result.snapshot);
      setLoading(false);
      message.success(t('admin.alerts.detail.sotSuccess'));
    }, 1200);
  };

  // P0: Integrity Check Diff Logic
  const diffItems = useMemo(() => {
    if (!sotData || !snapshot) return [];
    
    const flatten = (obj: any, prefix = '') => {
      let items: any[] = [];
      Object.entries(obj).forEach(([k, v]) => {
        if (['id', 'type', 'domain', 'metadata'].includes(k)) return;
        const key = prefix ? `${prefix}.${k}` : k;
        if (v && typeof v === 'object' && !Array.isArray(v)) {
          items = items.concat(flatten(v, key));
        } else {
          items.push({ key, value: v });
        }
      });
      return items;
    };

    const snapFlat = flatten(snapshot);
    const sotFlat = flatten(sotData);
    const allKeys = Array.from(new Set([...snapFlat.map(i => i.key), ...sotFlat.map(i => i.key)]));

    return allKeys.map(k => {
      const snapVal = snapFlat.find(i => i.key === k)?.value;
      const sotVal = sotFlat.find(i => i.key === k)?.value;
      return {
        field: k,
        snapshot: snapVal ?? 'N/A',
        sot: sotVal ?? 'N/A',
        isConsistent: JSON.stringify(snapVal) === JSON.stringify(sotVal)
      };
    });
  }, [snapshot, sotData]);

  const inconsistentCount = diffItems.filter(d => !d.isConsistent).length;

  const renderFlatTable = (obj: any) => {
    const dataSource: any[] = [];
    Object.entries(obj).forEach(([k, v]) => {
      if (['id', 'type', 'domain', 'metadata'].includes(k)) return;
      if (typeof v === 'object' && !Array.isArray(v)) {
        Object.entries(v as object).forEach(([sk, sv]) => {
          dataSource.push({ key: `${k}.${sk}`, field: `${k}: ${sk}`, value: String(sv) });
        });
      } else {
        dataSource.push({ key: k, field: k, value: String(v) });
      }
    });
    
    return (
      <VFTable 
        size="small" pagination={false} dataSource={dataSource} 
        className="!border-none !shadow-none !rounded-none"
        columns={[
          { title: 'Field', dataIndex: 'field', width: '40%', render: t => <VFText variant="t6" color="secondary" className="font-bold uppercase tracking-tight opacity-60">{t}</VFText> },
          { title: 'Value', dataIndex: 'value', render: v => <VFText variant="t5-strong" color="primary">{v}</VFText> }
        ]}
      />
    );
  };

  return (
    <VFCard noPadding className="shadow-none border-divider min-h-[580px] flex flex-col">
      <Tabs 
        activeKey={activeTab}
        onChange={setActiveTab}
        className="vf-detail-tabs"
        tabBarStyle={{ padding: '0 24px', borderBottom: '1px solid var(--vf-divider)' }}
        items={[
          {
            key: 'snapshot',
            label: <span className="flex items-center gap-2"><Database size={14}/>{t('admin.subjects.tabs.snapshot')}</span>,
            children: (
              <div className="p-4 flex flex-col gap-6 animate-in fade-in">
                {renderFlatTable(snapshot)}
              </div>
            )
          },
          {
            key: 'sot',
            label: <span className="flex items-center gap-2"><Zap size={14}/>{t('admin.subjects.tabs.sot')}</span>,
            children: (
              <div className="p-6 flex flex-col gap-6 min-h-[440px]">
                {loading ? (
                  <div className="flex flex-col gap-4 py-4">
                    <Skeleton active paragraph={{ rows: 8 }} />
                  </div>
                ) : !sotData ? (
                  <div className="py-24 animate-in fade-in flex flex-col items-center">
                    <div className="p-8 border border-dashed border-divider rounded-card flex flex-col items-center max-w-sm">
                      <Search size={32} className="opacity-20 mb-4" />
                      <VFText variant="t5-strong" color="primary" className="mb-1">{t('admin.subjects.detail.sotEmptyTitle')}</VFText>
                      <VFText variant="t6" color="tertiary" className="text-center mb-6 leading-relaxed">
                        {t('admin.subjects.detail.sotEmptyDesc')}
                      </VFText>
                      <Button type="primary" onClick={handleRunQuery} className="h-10 px-8 font-bold shadow-md">
                        {t('admin.subjects.detail.runSotQuery')}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="animate-in fade-in flex flex-col gap-4">
                    <div className="flex items-center justify-between px-2">
                       <VFText variant="t6" color="success" className="font-bold uppercase tracking-widest flex items-center gap-2">
                         <Zap size={12} fill="currentColor" /> Live Source of Truth Synchronized
                       </VFText>
                       <Button type="text" size="small" icon={<RefreshCw size={12} />} onClick={handleRunQuery} className="text-brand font-bold text-xs h-auto p-0">Re-query</Button>
                    </div>
                    {renderFlatTable(sotData)}
                  </div>
                )}
              </div>
            )
          },
          {
            key: 'diff',
            label: <span className="flex items-center gap-2"><Terminal size={14}/>{t('admin.subjects.tabs.diff')}</span>,
            disabled: !sotData,
            children: (
              <div className="p-6 flex flex-col gap-6 animate-in slide-in-from-right-2">
                 {inconsistentCount > 0 ? (
                   <Alert 
                    type="error" showIcon icon={<AlertTriangle size={18} />}
                    message={<span className="font-bold">{t('admin.subjects.detail.stateDrift', { count: inconsistentCount })}</span>}
                    description={
                      <div className="flex flex-col gap-3">
                        <VFText variant="t6" color="secondary">{t('admin.subjects.detail.driftExplanation')}</VFText>
                        <Button 
                          type="link" 
                          size="small" 
                          onClick={onViewHealth} 
                          className="vf-warning-link-btn w-fit font-bold h-8 px-0 flex items-center gap-1.5 underline underline-offset-4"
                        >
                          {t('admin.subjects.detail.openHealth')} <ArrowRight size={14}/>
                        </Button>
                      </div>
                    }
                    className="rounded-card border-error/20 bg-error/[0.02]"
                   />
                 ) : (
                   <Alert 
                    type="success" showIcon icon={<Zap size={18} />}
                    message={<span className="font-bold">Data Integrity Verified</span>}
                    description={<span className="text-xs">No discrepancies found between AdminDB snapshot and live source of truth.</span>}
                    className="rounded-card border-success/20 bg-success/[0.02]"
                   />
                 )}
                 <VFTable 
                   size="small" pagination={false} dataSource={diffItems} rowKey="field"
                   className="!border-none !shadow-none !rounded-none"
                   columns={[
                     { title: 'Field', dataIndex: 'field', width: '30%', render: t => <VFText variant="t6" color="tertiary" className="font-bold uppercase tracking-tighter opacity-60">{t}</VFText> },
                     { title: 'Snapshot (DB)', dataIndex: 'snapshot', width: '35%', render: v => <VFText variant="t7" color="secondary" className="font-mono">{String(v)}</VFText> },
                     { title: 'Live (SoT)', dataIndex: 'sot', width: '35%', render: (v, r) => <VFText variant="t7" color={r.isConsistent ? 'primary' : 'error'} className={`font-mono ${!r.isConsistent ? 'font-bold underline' : ''}`}>{String(v)}</VFText> }
                   ]}
                 />
              </div>
            )
          }
        ]}
      />
      <style>{`
        .vf-warning-link-btn.ant-btn-link { color: rgba(var(--vf-warning), 1) !important; }
        .vf-warning-link-btn.ant-btn-link:hover { color: rgba(var(--vf-warning), 0.8) !important; }
      `}</style>
    </VFCard>
  );
};