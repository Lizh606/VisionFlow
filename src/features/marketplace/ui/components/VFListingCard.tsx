
import React, { useState, useEffect } from 'react';
import { Button, Tooltip, Skeleton } from 'antd';
import { Image as ImageIcon, RefreshCw, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFTag } from '../../../../shared/ui/VFTag';
import { VFCard } from '../../../../shared/ui/VFCard';
import { StatusConfigDef } from './statusConfig';
import dayjs from 'dayjs';

interface Props {
  listing: any;
  config: StatusConfigDef;
  onAction: (id: string, action: string) => void;
  forceCoverFail?: boolean;
}

export const VFListingCard: React.FC<Props> = ({ listing, config, onAction, forceCoverFail = false }) => {
  const { t } = useTranslation();
  const [imgStatus, setImgStatus] = useState<'loading' | 'error' | 'success'>('loading');

  useEffect(() => {
    setImgStatus('loading');
    const timer = setTimeout(() => setImgStatus(forceCoverFail ? 'error' : 'success'), 800);
    return () => clearTimeout(timer);
  }, [forceCoverFail]);

  const renderCover = () => {
    if (imgStatus === 'loading') return <Skeleton.Button active block className="!h-full !w-full rounded-none" />;
    
    if (imgStatus === 'error') {
      return (
        <div className="flex flex-col items-center justify-center gap-1.5 h-full bg-bg-page animate-in fade-in">
          <AlertCircle size={20} className="text-error opacity-40" />
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-tight">{t('marketplace.seller.wizard.loadFailed')}</span>
            <Button type="link" size="small" className="p-0 h-auto text-[10px] font-bold" onClick={() => setImgStatus('loading')}>{t('common.retry')}</Button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full bg-bg-page group-hover:bg-brand/[0.02] transition-colors relative">
        <ImageIcon size={40} strokeWidth={1} className="text-text-tertiary opacity-20" />
        <span className="text-[9px] font-bold text-text-tertiary uppercase tracking-[0.2em] mt-2 opacity-40">{t('common.noPreview')}</span>
        <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  };

  const ActionBtn = ({ def, type = 'default', block = false }: { def: any, type?: any, block?: boolean }) => {
    const btn = (
      <Button 
        type={type}
        block={block}
        disabled={def.disabled}
        icon={def.icon}
        className={`h-9 font-bold text-[12px] uppercase tracking-wider rounded-control transition-all shadow-none ${type === 'default' ? 'text-text-secondary border-border hover:text-brand hover:border-brand' : ''}`}
        onClick={(e) => { e.stopPropagation(); onAction(listing.id, def.action); }}
      >
        {def.label}
      </Button>
    );
    return def.tooltip ? <Tooltip title={def.tooltip}>{btn}</Tooltip> : btn;
  };

  return (
    <VFCard noPadding className="h-full flex flex-col group border-border hover:border-brand/40 transition-all cursor-pointer shadow-none overflow-hidden">
      {/* 1. Cover Area (16:9) */}
      <div key="cover-area" className="relative aspect-video w-full border-b border-divider shrink-0 overflow-hidden">
        {renderCover()}
        <div className="absolute top-3 right-3 z-10">
          <VFTag variant={config.tag.variant} filled>{config.tag.label}</VFTag>
        </div>
      </div>

      {/* 2. Body Area */}
      <div key="card-body" className="p-4 flex flex-col flex-1 min-h-0">
        <div key="title-meta" className="flex flex-col gap-1 mb-3">
          <h3 className="text-[15px] font-bold text-text-primary m-0 line-clamp-2 leading-tight tracking-tight min-h-[36px]">
            {listing.name}
          </h3>
          <div className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider opacity-60">
            {t(`marketplace.type.${listing.type.toLowerCase()}` as any)} <span className="mx-1">•</span> {dayjs(listing.lastUpdated).fromNow()}
          </div>
        </div>

        {/* 3. Info Row (Strict Height Alignment) */}
        <div key="info-row" className="min-h-[32px] mb-4">
          {config.info ? (
            <div className={`
              flex items-center gap-2 px-2.5 py-1.5 rounded-control border text-[11px] font-bold leading-none
              ${config.info.type === 'error' ? 'bg-error/5 border-error/20 text-error' : 
                config.info.type === 'warning' ? 'bg-warning/5 border-warning/20 text-warning-700' : 
                'bg-bg-page border-divider text-text-secondary'}
            `}>
              {config.info.icon}
              <span className="truncate">{config.info.text}</span>
            </div>
          ) : (
            <div className="h-[32px]" /> /* Empty Placeholder to align buttons */
          )}
        </div>

        {/* 4. Actions Area (Two Rows) */}
        <div key="actions-area" className="mt-auto flex flex-col gap-2 pt-3 border-t border-divider/40">
          {/* Row 1: Primary */}
          <ActionBtn key="primary-btn" def={config.primary} type="primary" block />
          
          {/* Row 2: Secondary Duo */}
          <div key="secondary-btns" className="grid grid-cols-2 gap-2">
            <ActionBtn key="left-btn" def={config.secondaryLeft} />
            <ActionBtn key="right-btn" def={config.secondaryRight} />
          </div>
        </div>
      </div>
    </VFCard>
  );
};
