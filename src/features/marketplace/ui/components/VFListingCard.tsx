
import React, { useState, useEffect } from 'react';
import { Button, Tooltip, Skeleton } from 'antd';
import { Image as ImageIcon, RefreshCw, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFTag } from '../../../../shared/ui/VFTag';
import { VFCard } from '../../../../shared/ui/VFCard';
import { StatusConfigDef, ActionDef } from './statusConfig';
import { VFText } from '../../../../ui/VFText';
import dayjs from 'dayjs';

interface Props {
  listing: any;
  config: StatusConfigDef;
  onAction: (id: string, action: string) => void;
  forceCoverFail?: boolean;
}

const ActionBtn: React.FC<{ 
  def: ActionDef; 
  btnType?: 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text';
  block?: boolean;
  onAction: (action: string) => void;
}> = ({ def, btnType = 'default', block = false, onAction }) => {
  const btn = (
    <Button 
      type={btnType}
      block={block}
      disabled={def.disabled}
      icon={def.icon}
      className={`h-9 font-bold text-[12px] uppercase tracking-wider rounded-control transition-all shadow-none ${btnType === 'default' ? 'text-text-secondary border-border hover:text-brand hover:border-brand' : ''}`}
      onClick={(e) => { e.stopPropagation(); onAction(def.action); }}
    >
      {def.label}
    </Button>
  );
  return def.tooltip ? <Tooltip title={def.tooltip}>{btn}</Tooltip> : btn;
};

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
            <VFText variant="t6" color="tertiary" className="font-bold uppercase tracking-tight">{t('marketplace.seller.wizard.loadFailed')}</VFText>
            <Button type="link" size="small" className="p-0 h-auto text-[10px] font-bold" onClick={() => setImgStatus('loading')}>{t('common.retry')}</Button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full bg-bg-page group-hover:bg-brand/[0.02] transition-colors relative">
        <ImageIcon size={40} strokeWidth={1} className="text-text-tertiary opacity-20" />
        <VFText variant="t6" color="tertiary" className="font-bold uppercase tracking-[0.2em] mt-2 opacity-40">{t('common.noPreview')}</VFText>
        <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  };

  const handleBtnAction = (action: string) => {
    onAction(listing.id, action);
  };

  return (
    <VFCard noPadding className="h-full flex flex-col group border-border hover:border-brand/40 transition-all cursor-pointer shadow-none overflow-hidden">
      <div className="relative aspect-video w-full border-b border-divider shrink-0 overflow-hidden">
        {renderCover()}
        <div className="absolute top-3 right-3 z-10">
          <VFTag variant={config.tag.variant} filled>{config.tag.label}</VFTag>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 min-h-0">
        <div className="flex flex-col gap-1 mb-3">
          {/* V1.4: Card Title = T4 */}
          <VFText variant="t4" color="primary" truncate className="leading-tight min-h-[36px]">
            {listing.name}
          </VFText>
          {/* V1.4: Meta = T6 */}
          <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-wider opacity-60">
            {t(`marketplace.type.${listing.type.toLowerCase()}` as any)} <span className="mx-1">{"\u2022"}</span> {dayjs(listing.lastUpdated).fromNow()}
          </VFText>
        </div>

        <div className="min-h-[32px] mb-4">
          {config.info ? (
            <div className={`
              flex items-center gap-2 px-2.5 py-1.5 rounded-control border
              ${config.info.type === 'error' ? 'bg-error/5 border-error/20 text-error' : 
                config.info.type === 'warning' ? 'bg-warning/5 border-warning/20 text-warning-700' : 
                'bg-bg-page border-divider text-text-secondary'}
            `}>
              {config.info.icon}
              {/* V1.4: Info Hint = T6 Body Strong */}
              <VFText variant="t6" color="inherit" className="font-bold truncate leading-none">
                {config.info.text}
              </VFText>
            </div>
          ) : (
            <div className="h-[32px]" />
          )}
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-3 border-t border-divider/40">
          <ActionBtn def={config.primary} btnType="primary" block onAction={handleBtnAction} />
          
          <div className="grid grid-cols-2 gap-2">
            <ActionBtn def={config.secondaryLeft} onAction={handleBtnAction} />
            <ActionBtn def={config.secondaryRight} onAction={handleBtnAction} />
          </div>
        </div>
      </div>
    </VFCard>
  );
};
