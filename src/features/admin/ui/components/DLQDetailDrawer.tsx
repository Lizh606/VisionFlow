
import React from 'react';
import { Button, Collapse, App, Space } from 'antd';
import { 
  FileJson, Copy, Terminal, History, 
  Activity, ShieldAlert, X, Zap, 
  Target, Info, AlertCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFDrawer } from '../../../../ui/VFDrawer';
import { VFText } from '../../../../ui/VFText';
import { VFTag } from '../../../../shared/ui/VFTag';
import { DLQSample } from '../../types/health';

interface Props {
  open: boolean;
  sample: DLQSample | null;
  onClose: () => void;
}

export const DLQDetailDrawer: React.FC<Props> = ({ open, sample, onClose }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  if (!sample) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success(t('common.copy') + ' OK');
  };

  const SectionHeader = ({ icon: Icon, title }: any) => (
    <div className="flex items-center gap-2 mb-4 border-l-[3px] border-brand pl-3">
       <Icon size={16} className="text-brand opacity-60" />
       <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest">{title}</VFText>
    </div>
  );

  return (
    <VFDrawer
      title={t('admin.health.drawer.dlqTitle')}
      subtitle={`${t('admin.health.drawer.idLabel')}: ${sample.id}`}
      open={open}
      onClose={onClose}
      size="M"
      footer={
        <div className="flex items-center justify-between w-full px-2">
           <Button type="text" icon={<Terminal size={16}/>} className="text-[12px] font-bold text-text-tertiary">
             {t('admin.health.drawer.searchLogs')}
           </Button>
           <Space size={12}>
              <Button onClick={onClose} className="h-10 px-6 font-bold">{t('common.close')}</Button>
              <Button type="primary" className="h-10 px-8 font-bold shadow-md bg-brand border-brand">
                {t('admin.health.drawer.retryAction')}
              </Button>
           </Space>
        </div>
      }
    >
      <div className="flex flex-col gap-10">
        {/* 1. Summary Header */}
        <div className="bg-bg-card border border-divider rounded-card p-6 grid grid-cols-2 gap-y-6 gap-x-8 shadow-sm">
           <div className="flex flex-col gap-1">
              <VFText variant="t6" color="tertiary" className="uppercase font-bold opacity-60 text-[9px]">{t('admin.health.drawer.eventType')}</VFText>
              <VFText variant="t5-strong" color="primary">{sample.eventType}</VFText>
           </div>
           <div className="flex flex-col gap-1">
              <VFText variant="t6" color="tertiary" className="uppercase font-bold opacity-60 text-[9px]">{t('common.status')}</VFText>
              <VFTag variant={sample.status === 'POISONED' ? 'error' : 'warning'} filled className="h-5 px-1.5 font-bold text-[9px] w-fit uppercase">{sample.status}</VFTag>
           </div>
           <div className="flex flex-col gap-1">
              <VFText variant="t6" color="tertiary" className="uppercase font-bold opacity-60 text-[9px]">{t('admin.health.drawer.target')}</VFText>
              <div className="flex items-center gap-1.5 min-w-0">
                 <VFText variant="t7" color="primary" className="font-mono tabular-nums truncate max-w-[120px]">{sample.subjectId}</VFText>
                 <VFTag variant="neutral" filled={false} className="scale-75 origin-left font-bold text-[9px]">{sample.subjectType}</VFTag>
              </div>
           </div>
           <div className="flex flex-col gap-1">
              <VFText variant="t6" color="tertiary" className="uppercase font-bold opacity-60 text-[9px]">{t('admin.health.drawer.retryCount')}</VFText>
              <VFText variant="t5" color="error" className="font-bold tabular-nums">{sample.retryCount} / 5</VFText>
           </div>
        </div>

        {/* 2. Payload View */}
        <section>
          <SectionHeader icon={FileJson} title={t('admin.health.drawer.rawPayload')} />
          <div className="relative group">
            <pre className="p-5 bg-bg-card border border-divider rounded-card text-[12px] font-mono leading-relaxed overflow-auto max-h-60 custom-scrollbar text-text-secondary">
              {JSON.stringify(sample.rawPayload, null, 2)}
            </pre>
            <Button 
              type="text" size="small" icon={<Copy size={14} />} 
              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 hover:text-brand bg-bg-card/80 rounded shadow-sm"
              onClick={() => handleCopy(JSON.stringify(sample.rawPayload, null, 2))}
            />
          </div>
        </section>

        {/* 3. Error Analysis */}
        <section>
          <SectionHeader icon={ShieldAlert} title={t('admin.health.drawer.exception')} />
          <div className="flex flex-col gap-4">
             <div className="p-4 bg-error/[0.03] border border-error/10 rounded-card flex gap-4">
                <AlertCircle size={20} className="text-error mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                   <VFText variant="t5-strong" color="error">{t('admin.health.drawer.errorSummary')}</VFText>
                   <VFText variant="t6" color="secondary" className="leading-relaxed font-medium">{sample.errorSummary}</VFText>
                </div>
             </div>

             {sample.errorStack && (
               <Collapse ghost className="bg-bg-page/40 rounded-card border border-divider" items={[{
                 key: 'stack',
                 label: <div className="flex items-center gap-2"><Terminal size={14} className="text-text-tertiary"/><VFText variant="t6" color="tertiary" className="font-bold uppercase tracking-wider">{t('admin.health.drawer.stackTrace')}</VFText></div>,
                 children: <pre className="text-[10px] font-mono text-text-tertiary leading-normal overflow-x-auto whitespace-pre">{sample.errorStack}</pre>
               }]} />
             )}
          </div>
        </section>

        {/* 4. Context Metadata */}
        {sample.headers && (
          <section>
            <SectionHeader icon={History} title={t('admin.health.drawer.headers')} />
            <div className="bg-bg-page/40 rounded-card border border-divider p-4 flex flex-col gap-2">
               {Object.entries(sample.headers).map(([k, v]) => (
                 <div key={k} className="flex items-center justify-between text-[11px] py-1 border-b border-divider/40 last:border-none">
                    <span className="font-bold text-text-tertiary uppercase tracking-tighter">{k}</span>
                    <span className="font-mono text-text-secondary">{v}</span>
                 </div>
               ))}
            </div>
          </section>
        )}
      </div>
    </VFDrawer>
  );
};
