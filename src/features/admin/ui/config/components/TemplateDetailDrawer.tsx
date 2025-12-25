
import React, { useState, useEffect } from 'react';
import { Button, App, Divider, Tooltip } from 'antd';
import { 
  FileCode, History, Copy, Clock, 
  User, CheckCircle2, RotateCcw,
  Terminal, ShieldCheck, ChevronRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFDrawer } from '../../../../../ui/VFDrawer';
import { VFText } from '../../../../../ui/VFText';
import { VFTag } from '../../../../../shared/ui/VFTag';
import { ConfigTemplate } from '../../../types/config';
import dayjs from 'dayjs';

interface Props {
  open: boolean;
  template: ConfigTemplate | null;
  onClose: () => void;
  onClone: (tpl: ConfigTemplate, reason: string) => void;
}

export const TemplateDetailDrawer: React.FC<Props> = ({ open, template, onClose, onClone }) => {
  const { t } = useTranslation();
  const { message, modal } = App.useApp();
  
  const [selectedVersion, setSelectedVersion] = useState<string>('');
  
  useEffect(() => {
    if (template) {
      setSelectedVersion(template.currentVersion);
    }
  }, [template]);

  if (!template) return null;

  const currentVersionData = template.history.find(h => h.version === selectedVersion) || template.history[0];

  const handleCopyJson = () => {
    navigator.clipboard.writeText(template.content);
    message.success(t('common.copy') + ' OK');
  };

  const handleCloneClick = () => {
    onClone(template, 'Cloned from catalog detail view');
  };

  return (
    <VFDrawer
      title={t('admin.config.templates.drawer.title')}
      subtitle={template.name}
      open={open}
      onClose={onClose}
      size="M"
      footer={
        <div className="flex items-center justify-between w-full">
           <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-brand opacity-60" />
              <VFText variant="t6" color="tertiary" className="font-bold tabular-nums">SOURCE: SYSTEM_CATALOG</VFText>
           </div>
           <Button 
            type="primary" 
            icon={<RotateCcw size={16} />} 
            onClick={handleCloneClick}
            className="h-10 px-8 font-bold shadow-md bg-brand border-brand"
           >
             {t('admin.config.templates.drawer.cloneBtn')}
           </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-10 py-2">
        {/* Versions Trace List */}
        <div>
          <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest mb-4 block opacity-60">
            {t('admin.config.templates.drawer.versions')}
          </VFText>
          <div className="flex flex-col gap-2">
            {template.history.map((h, i) => (
              <div 
                key={h.version} 
                onClick={() => setSelectedVersion(h.version)}
                className={`
                  flex items-center justify-between p-4 rounded-card border transition-all cursor-pointer group
                  ${selectedVersion === h.version ? 'border-brand bg-brand/[0.02] shadow-sm' : 'border-divider bg-bg-card hover:bg-bg-page/60'}
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${selectedVersion === h.version ? 'bg-brand text-white' : 'bg-bg-page text-text-tertiary'}`}>
                    <History size={14} />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                       <VFText variant="t5-strong" color={selectedVersion === h.version ? 'brand' : 'primary'}>{h.version}</VFText>
                       {h.version === template.currentVersion && <VFTag variant="success" filled className="h-4 px-1.5 text-[8px] font-bold">LATEST</VFTag>}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 opacity-60">
                       <User size={10} className="text-text-tertiary" />
                       <VFText variant="t7" color="secondary">{h.operator}</VFText>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <VFText variant="t7" color="disabled" tabularNums className="font-medium">{dayjs(h.updatedAt).format('MMM D')}</VFText>
                   <ChevronRight size={14} className={`text-text-tertiary transition-transform ${selectedVersion === h.version ? 'translate-x-0.5 opacity-100' : 'opacity-0'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source Preview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest opacity-60">
              {t('admin.config.templates.drawer.content')} ({selectedVersion})
            </VFText>
            <Button type="link" size="small" icon={<Copy size={12}/>} className="font-bold text-[11px]" onClick={handleCopyJson}>{t('admin.config.common.copy')}</Button>
          </div>
          <div className="relative group">
            <pre className="p-6 bg-bg-page border border-divider rounded-card text-[12px] font-mono leading-relaxed overflow-auto max-h-[400px] custom-scrollbar text-text-secondary shadow-inner">
              {template.content}
            </pre>
          </div>
        </div>
      </div>
    </VFDrawer>
  );
};
