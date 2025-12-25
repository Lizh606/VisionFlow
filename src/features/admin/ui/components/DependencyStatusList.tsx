
import React, { useState } from 'react';
import { Tooltip, Button, App } from 'antd';
import { Activity, Clock, AlertTriangle, CheckCircle2, XCircle, ChevronRight, Info, Copy, X, Terminal, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFText } from '../../../../ui/VFText';
import { VFTag } from '../../../../shared/ui/VFTag';
import { VFDrawer } from '../../../../ui/VFDrawer';
import { ExternalDependency } from '../../types/health';
import dayjs from 'dayjs';

export const DependencyStatusList: React.FC<{ items: ExternalDependency[] }> = ({ items }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [selectedDep, setSelectedDep] = useState<ExternalDependency | null>(null);

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'HEALTHY': return <CheckCircle2 size={16} className="text-success" />;
      case 'DEGRADED': return <AlertTriangle size={16} className="text-warning" />;
      case 'DOWN': return <XCircle size={16} className="text-error" />;
      default: return <Activity size={16} className="text-text-tertiary" />;
    }
  };

  const getSuggestedText = (action: string) => {
    switch(action) {
      case 'RETRY': return t('admin.health.drawer.suggested.retry');
      case 'MANUAL': return t('admin.health.drawer.suggested.manual');
      case 'INCIDENT': return t('admin.health.drawer.suggested.incident');
      default: return t('admin.health.drawer.suggested.none');
    }
  };

  const handleCopyError = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success(t('common.copy') + ' OK');
  };

  return (
    <>
      <VFCard className="shadow-none border-border h-full" noPadding>
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
          {items.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedDep(item)}
              className="px-5 py-4 flex flex-col gap-2.5 border-b border-divider last:border-none hover:bg-bg-page/40 transition-colors group cursor-pointer"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                   <div className="shrink-0">{getStatusIcon(item.status)}</div>
                   <VFText variant="t5-strong" color="primary" truncate className="font-bold">{item.name}</VFText>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                   {item.latencyMs !== undefined && (
                     <VFText variant="t7" color="tertiary" tabularNums className="opacity-60 font-bold">
                       {item.latencyMs}ms
                     </VFText>
                   )}
                   <VFTag 
                    variant={item.status === 'HEALTHY' ? 'success' : item.status === 'DOWN' ? 'error' : 'warning'} 
                    filled={item.status !== 'HEALTHY'} 
                    className="scale-90 font-bold uppercase text-[9px] min-w-[70px]"
                   >
                     {item.status}
                   </VFTag>
                </div>
              </div>

              {item.errorNote && (
                <div className="pl-7 flex items-start gap-2 text-error animate-in fade-in">
                  <Info size={12} className="shrink-0 mt-0.5 opacity-70" />
                  <Tooltip title={item.errorNote}>
                    <VFText variant="t6" color="inherit" className="font-medium truncate opacity-90 max-w-[280px]">
                      {item.errorNote}
                    </VFText>
                  </Tooltip>
                </div>
              )}

              <div className="pl-7 flex items-center justify-between mt-0.5">
                 <div className="flex items-center gap-2 opacity-40">
                    <Clock size={12} />
                    <VFText variant="t6" color="tertiary" tabularNums className="font-medium">
                      {dayjs(item.lastCheckedAt).format('HH:mm:ss')}
                    </VFText>
                 </div>
                 <ChevronRight size={14} className="text-text-tertiary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </div>
            </div>
          ))}
        </div>
      </VFCard>

      <VFDrawer
        title={t('admin.health.drawer.depTitle')}
        subtitle={selectedDep?.name}
        open={!!selectedDep}
        onClose={() => setSelectedDep(null)}
        size="S"
        footer={
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
               <ShieldCheck size={14} className="text-success opacity-60" />
               <VFText variant="t7" color="tertiary" className="font-bold uppercase tabular-nums">HEALTH_TRACE_READY</VFText>
            </div>
            <Button onClick={() => setSelectedDep(null)} className="h-10 px-8 font-bold">{t('common.close')}</Button>
          </div>
        }
      >
        {selectedDep && (
          <div className="flex flex-col gap-8 py-2">
            <div className="grid grid-cols-2 gap-6 bg-bg-card border border-divider rounded-card p-5 shadow-sm">
               <div className="flex flex-col gap-1.5">
                  <VFText variant="t6" color="tertiary" className="uppercase font-bold text-[10px] tracking-widest opacity-60">
                    {t('admin.health.drawer.latencyLabel')}
                  </VFText>
                  <VFText variant="t3" color="primary" tabularNums className="font-vf-semibold">
                    {selectedDep.latencyMs ? `${selectedDep.latencyMs}ms` : '---'}
                  </VFText>
               </div>
               <div className="flex flex-col gap-1.5">
                  <VFText variant="t6" color="tertiary" className="uppercase font-bold text-[10px] tracking-widest opacity-60">
                    {t('admin.health.drawer.lastCheckedLabel')}
                  </VFText>
                  <Tooltip title={selectedDep.lastCheckedAt}>
                    <VFText variant="t3" color="primary" tabularNums className="font-vf-semibold">
                      {dayjs(selectedDep.lastCheckedAt).format('HH:mm:ss')}
                    </VFText>
                  </Tooltip>
               </div>
            </div>

            <div className="flex flex-col gap-4">
               <div className="flex flex-col gap-1.5 mb-2">
                  <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest opacity-60 px-1">
                    {t('admin.health.drawer.errorLabel')}
                  </VFText>
                  <div className="relative group">
                    <div className="p-4 bg-bg-page/40 border border-divider rounded-card min-h-[80px]">
                      <VFText variant="t5" color={selectedDep.errorNote ? 'primary' : 'disabled'} className={`leading-relaxed ${!selectedDep.errorNote ? 'italic' : ''}`}>
                        {selectedDep.errorNote || t('common.noData')}
                      </VFText>
                    </div>
                    {selectedDep.errorNote && (
                      <Button 
                        type="text" size="small" 
                        icon={<Copy size={14} />} 
                        onClick={() => handleCopyError(selectedDep.errorNote!)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 flex items-center justify-center rounded-full hover:bg-black/5"
                      />
                    )}
                  </div>
               </div>

               <div className="flex flex-col gap-1.5 pt-4 border-t border-divider/40">
                  <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest opacity-60 px-1">
                    {t('admin.health.drawer.suggestedOpLabel')}
                  </VFText>
                  <div className="p-4 bg-bg-page/20 border border-divider border-dashed rounded-card flex gap-3 items-start">
                    <Terminal size={16} className="text-text-tertiary mt-0.5 shrink-0" />
                    <VFText variant="t5-strong" color="secondary" className="leading-relaxed">
                      {getSuggestedText(selectedDep.suggestedAction)}
                    </VFText>
                  </div>
               </div>
            </div>

            <div className="mt-4 px-1 opacity-40">
              <VFText variant="t6" color="tertiary" className="italic leading-relaxed">
                {t('admin.health.table.actions.v01ReadOnly')}
              </VFText>
            </div>
          </div>
        )}
      </VFDrawer>
    </>
  );
};
