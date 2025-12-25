import React from 'react';
import { Button, App, Tooltip } from 'antd';
import { Copy, MapPin, Database, ShieldCheck, Box, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFText } from '../../../../ui/VFText';
import { VFTag } from '../../../../shared/ui/VFTag';

interface Props {
  subject: any;
}

export const SubjectOverviewCard: React.FC<Props> = ({ subject }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success(t('common.copy') + ' OK');
  };

  const domainConfig: any = {
    selfhosted: { label: 'Self-hosted', variant: 'teal' },
    studio: { label: 'Studio', variant: 'brand' },
    marketplace: { label: 'Marketplace', variant: 'info' },
    billing: { label: 'Billing', variant: 'warning' }
  };
  const d = domainConfig[subject.domain] || { label: subject.domain, variant: 'neutral' };

  return (
    <VFCard noPadding className="shadow-none border-divider overflow-hidden min-h-[160px]">
      <div className="flex flex-col md:flex-row h-full">
        <div className="flex-1 p-6 flex flex-col justify-between gap-4">
           <div className="flex items-center gap-3">
              <VFTag variant={d.variant} filled className="font-bold text-[10px] uppercase tracking-wider">{d.label}</VFTag>
              <div className="h-4 w-px bg-divider" />
              <VFTag variant={subject.status === 'PAID' || subject.status === 'ONLINE' || subject.status === 'ACTIVE' || subject.status === 'RUNNING' ? 'success' : 'error'} filled={false} className="font-bold">
                {subject.status}
              </VFTag>
           </div>
           
           <div className="flex flex-col gap-1.5">
              <VFText variant="t6" color="tertiary" className="font-bold uppercase tracking-widest opacity-60">
                {t('admin.subjects.fields.identity')}
              </VFText>
              <div className="flex items-center gap-2 group/id cursor-pointer" onClick={() => handleCopy(subject.id)}>
                 {subject.type === 'device' ? <ShieldCheck size={16} className="text-brand opacity-60" /> : <Box size={16} className="text-brand opacity-60" />}
                 <VFText variant="t4" color="primary" className="font-bold tabular-nums tracking-tight">{subject.id}</VFText>
                 <Button type="text" size="small" icon={<Copy size={14} />} className="text-text-tertiary opacity-0 group-hover/id:opacity-100 hover:text-brand p-0" />
              </div>
              
              {subject.id === 'dev_829305_a' && (
                <div className="flex items-center gap-1.5 mt-1 opacity-60 group/map cursor-help">
                   <Info size={12} className="text-text-tertiary" />
                   <VFText variant="t6" color="tertiary" className="font-medium">
                     {t('admin.subjects.fields.mappedPod')}: <span className="font-mono text-text-secondary">rt-prod-v2-8829</span>
                   </VFText>
                </div>
              )}
           </div>
        </div>

        <div className="w-full md:w-[320px] bg-bg-page/40 border-l border-divider p-6 grid grid-cols-1 gap-5">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-control bg-bg-card border border-divider flex items-center justify-center text-text-tertiary shadow-sm">
                <MapPin size={14} />
              </div>
              <div className="flex flex-col">
                <VFText variant="t6" color="tertiary" className="font-bold text-[9px] uppercase tracking-tighter">
                  {t('admin.subjects.fields.region')}
                </VFText>
                <VFText variant="t5-strong" color="primary">{subject.region || 'Global'}</VFText>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-control bg-bg-card border border-divider flex items-center justify-center text-text-tertiary shadow-sm">
                <Database size={14} />
              </div>
              <div className="flex flex-col">
                <VFText variant="t6" color="tertiary" className="font-bold text-[9px] uppercase tracking-tighter">
                  {t('admin.subjects.fields.snapshotSource')}
                </VFText>
                <VFText variant="t5-strong" color="primary">管理库 (AdminDB)</VFText>
              </div>
           </div>
        </div>
      </div>
    </VFCard>
  );
};