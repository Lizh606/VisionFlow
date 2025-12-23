
import React from 'react';
import { Download, Upload, Zap, LucideIcon, ImageIcon, Type } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Template } from './WorkflowTemplateModal';
import { VFText } from '../../../ui/VFText';

interface Props {
  template: Template;
}

const NodeItem = ({ 
  icon: Icon, 
  title, 
  badges,
  active = false 
}: { 
  icon: LucideIcon, 
  title: string, 
  badges?: { icon: LucideIcon, value: number }[],
  active?: boolean
}) => {
  return (
    <div className={`
      w-full p-4 rounded-[10px] border flex items-center justify-between transition-all relative
      ${active ? 'border-brand bg-bg-card ring-1 ring-brand/5 shadow-sm' : 'border-border bg-bg-card'}
    `}>
      {active && <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-brand" />}
      
      <div className="flex items-center gap-3.5 min-w-0">
        <div className={`
          w-9 h-9 rounded-control flex items-center justify-center shrink-0 border
          ${active ? 'bg-brand/10 text-brand border-brand/20' : 'bg-bg-page text-text-tertiary border-border'}
        `}>
          <Icon size={18} strokeWidth={2} />
        </div>
        <div className="flex flex-col min-w-0">
          {/* V1.4: Node Label = T5 Strong */}
          <VFText variant="t5-strong" color="primary" truncate>
            {title}
          </VFText>
          {active && (
            /* V1.4: Technical Meta = T7 Mono */
            <VFText variant="t7" color="tertiary" className="opacity-70 tracking-tighter lowercase">
              {title.toLowerCase().replace(/ /g, '-')}
            </VFText>
          )}
        </div>
      </div>

      {badges && (
        <div className="flex items-center gap-1.5">
          {badges.map((b, i) => (
            <div key={i} className="flex items-center gap-1 px-1.5 py-0.5 rounded-tag bg-bg-page border border-border">
              <b.icon size={10} className="text-text-tertiary opacity-60" />
              <VFText variant="t6" color="secondary" className="font-bold tabular-nums">
                {b.value}
              </VFText>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const ArchitecturePreview: React.FC<Props> = ({ template }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="mb-4">
        {/* V1.4: Section Header = T6 Caption Strong */}
        <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-[0.12em] opacity-60">
          {t('workflows.templates.architecture')}
        </VFText>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative py-6">
        <div className="w-full max-w-[320px] flex flex-col items-center relative z-10">
          <NodeItem 
            icon={Download} 
            title="Inputs" 
            badges={[
              { icon: ImageIcon, value: 1 },
              { icon: Type, value: 0 }
            ]}
          />
          <div className="h-8 md:h-10 w-px border-l border-dashed border-divider opacity-60" />
          <NodeItem 
            icon={Zap} 
            title={template.id === 'build-my-own' ? 'Custom Inference' : 'Model Processor'} 
            active={true}
          />
          <div className="h-8 md:h-10 w-px border-l border-dashed border-divider opacity-60" />
          <NodeItem 
            icon={Upload} 
            title="Outputs" 
            badges={[{ icon: ImageIcon, value: 1 }]}
          />
        </div>
      </div>
    </div>
  );
};
