
import React from 'react';
import { PlayCircle, Settings2, Info, Share2, ChevronRight } from 'lucide-react';
import { Template } from './TemplateListPane';
import { VFTag } from '../../../shared/ui/VFTag';

interface Props {
  template: Template;
}

export const TemplatePreviewPane: React.FC<Props> = ({ template }) => {
  return (
    <div className="flex h-full animate-in fade-in duration-300">
      {/* architecture Column (Middle) */}
      <div className="flex-[1.4] border-r border-divider bg-bg-page/5 p-8 flex flex-col">
        <div className="mb-10">
          <h3 className="text-[14px] font-bold text-text-primary m-0 mb-2">Architecture</h3>
          <p className="text-[12px] text-text-secondary m-0 leading-relaxed max-w-[280px]">
            {template.description}
          </p>
        </div>

        {/* Roboflow Node Diagram Style */}
        <div className="flex-1 flex flex-col items-center justify-center py-4">
          <div className="w-full max-w-[260px] flex flex-col items-center">
            
            {/* Input Node */}
            <div className="w-full p-3 bg-bg-card rounded-card border border-border flex items-center gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-control bg-success/10 text-success flex items-center justify-center shrink-0">
                <PlayCircle size={16} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold text-text-primary truncate">Input Source</span>
                <span className="text-[10px] text-text-tertiary">Real-time Stream</span>
              </div>
            </div>

            {/* Dashed Connector */}
            <div className="h-8 w-px border-l border-dashed border-divider" />

            {/* Active Logic Node */}
            <div className="w-full p-3 bg-bg-card rounded-card border border-brand/30 flex flex-col shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-brand" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-control bg-brand text-white flex items-center justify-center shrink-0">
                  <Settings2 size={16} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[12px] font-bold text-text-primary truncate">{template.name}</span>
                  <span className="text-[9px] text-brand font-bold uppercase tracking-wider">Active Node</span>
                </div>
              </div>
            </div>

            {/* Dashed Connector */}
            <div className="h-8 w-px border-l border-dashed border-divider" />

            {/* Output Node */}
            <div className="w-full p-3 bg-bg-card rounded-card border border-border flex items-center gap-3 shadow-sm opacity-80">
              <div className="w-8 h-8 rounded-full bg-info/10 text-info flex items-center justify-center shrink-0">
                <Share2 size={16} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold text-text-primary truncate">Data Sink</span>
                <span className="text-[10px] text-text-tertiary">API / Webhook</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CUSTOMIZE Column (Right) */}
      <div className="flex-1 p-8 flex flex-col bg-bg-card">
        <div className="mb-10">
          <h3 className="text-[11px] font-bold text-text-tertiary m-0 mb-1 uppercase tracking-[0.15em] opacity-60">
            Customize
          </h3>
          <p className="text-[12px] text-text-secondary m-0">
            {template.requiresModel ? 'Select a model to deploy.' : 'Configuration parameters.'}
          </p>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          {template.requiresModel ? (
            /* Model Selection Row (Only field allowed) */
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider ml-0.5">
                Model
              </label>
              <div className="flex items-center justify-between h-11 px-4 rounded-control border border-border bg-bg-card hover:border-brand/40 transition-all cursor-pointer group">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[13px] font-bold text-text-primary truncate">
                    YOLOv8-Small
                  </span>
                  <VFTag variant="neutral" className="h-4 px-1 text-[8px] opacity-50" filled={false}>DEFAULT</VFTag>
                </div>
                <span className="text-[11px] font-bold text-brand uppercase tracking-tight group-hover:underline">
                  Choose
                </span>
              </div>
            </div>
          ) : (
            /* No config state message */
            <div className="py-2">
              <p className="text-[12px] text-text-secondary italic m-0 opacity-70">
                This template can be created with recommended defaults.
              </p>
            </div>
          )}

          {/* Minimalist Info Callout */}
          <div className="mt-auto p-3.5 rounded-card bg-bg-page/40 border border-divider flex gap-3">
             <Info size={14} className="text-text-tertiary shrink-0 mt-0.5" />
             <p className="text-[10px] text-text-secondary m-0 leading-relaxed font-medium">
               Advanced logic and inference nodes can be further customized in the workflow editor after creation.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
