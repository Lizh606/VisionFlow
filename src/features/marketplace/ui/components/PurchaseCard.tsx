
import React from 'react';
import { Button, Tooltip } from 'antd';
import { 
  ImageIcon, Zap, ArrowUpRight, 
  Clock, AlertCircle, CheckCircle2, 
  Loader2, Info, RefreshCw
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Purchase } from '../../types';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFTag } from '../../../../shared/ui/VFTag';
import dayjs from 'dayjs';

interface Props {
  purchase: Purchase;
  onOpen: (p: Purchase) => void;
  onDeploy: (p: Purchase) => void;
  onViewEntitlement: (p: Purchase) => void;
}

export const PurchaseCard: React.FC<Props> = ({ purchase, onOpen, onDeploy, onViewEntitlement }) => {
  const { t } = useTranslation();
  const isReady = purchase.status === 'READY';
  const isPending = purchase.status === 'PENDING';
  const isExpired = purchase.status === 'EXPIRED';

  const expiryText = purchase.expiryAt 
    ? t('marketplace.purchase.label.expires', { date: dayjs(purchase.expiryAt).format('YYYY-MM-DD') })
    : t('marketplace.purchase.label.lifetime');

  const quotaValue = purchase.entitlements.seats 
    ? t('marketplace.purchase.label.quota', { count: purchase.entitlements.seats }) 
    : null;

  return (
    <VFCard 
      noPadding 
      className="h-full flex flex-col group border-border transition-all duration-300 shadow-none bg-bg-card overflow-hidden"
    >
      {/* 1. Media Area */}
      <div className="aspect-video bg-bg-page relative flex flex-col items-center justify-center text-text-tertiary/10 border-b border-divider/60 overflow-hidden shrink-0">
        <ImageIcon size={40} strokeWidth={1} />
        
        <div className="absolute top-3 right-3 flex items-center pointer-events-none z-10">
           {isReady && <VFTag variant="success" icon={<CheckCircle2 />} className="font-bold shadow-sm">{t('marketplace.purchase.status.active')}</VFTag>}
           {isExpired && <VFTag variant="error" icon={<AlertCircle />} className="font-bold shadow-sm">{t('marketplace.purchase.status.expired')}</VFTag>}
           {isPending && <VFTag variant="info" icon={<Loader2 className="animate-spin" />} className="font-bold shadow-sm">{t('marketplace.purchase.status.syncing')}</VFTag>}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1">
        
        {/* 2. Header Area */}
        <div className="h-[48px] flex flex-col justify-start mb-3 overflow-hidden">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <h3 className="text-[14px] font-bold text-text-primary m-0 truncate flex-1 leading-tight tracking-tight">
              {purchase.listingName}
            </h3>
            <VFTag variant="neutral" className="scale-90 origin-right shrink-0 font-bold opacity-40 border-divider/40" filled={false}>
              {purchase.type}
            </VFTag>
          </div>
          <span className="text-[11px] text-text-tertiary font-bold uppercase tracking-tight truncate block opacity-70">
            {purchase.planName || 'Standard Edition'}
          </span>
        </div>

        {/* 3. Meta Area */}
        <div className="h-[44px] flex flex-col justify-center gap-1.5 mb-4 bg-bg-page/40 px-2.5 rounded-control border border-divider/30 overflow-hidden">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-text-secondary min-w-0">
             <Clock size={12} className="opacity-40 shrink-0" />
             <span className="truncate whitespace-nowrap overflow-hidden text-ellipsis">{expiryText}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-medium min-w-0">
             {isPending ? (
               <div className="flex items-center gap-1.5 text-info overflow-hidden">
                  <RefreshCw size={10} className="animate-spin shrink-0" />
                  <span className="font-bold truncate">{t('marketplace.purchase.status.syncing')}...</span>
               </div>
             ) : quotaValue ? (
               <div className="flex items-center gap-1.5 text-text-secondary overflow-hidden">
                  <Info size={12} className="opacity-40 shrink-0" />
                  <div className="flex items-center gap-1 truncate">
                    <span className="font-bold text-text-primary">{quotaValue}</span>
                  </div>
               </div>
             ) : (
               <div className="invisible h-[16px]" />
             )}
          </div>
        </div>

        {/* 4. Actions Area */}
        <div className="h-[76px] mt-auto flex flex-col justify-end gap-2.5">
          <div className="grid grid-cols-2 gap-2">
            <Tooltip title={!isReady ? t('marketplace.purchase.status.syncing') : (!purchase.entitlements.can_open_studio ? "No Studio Access" : "")}>
              <Button 
                type="primary" 
                size="middle"
                disabled={!isReady || !purchase.entitlements.can_open_studio}
                icon={<Zap size={14} />}
                className="h-9 font-bold text-[11px] rounded-control shadow-sm uppercase tracking-wider overflow-hidden vf-btn-contrast-disabled"
                onClick={() => onOpen(purchase)}
              >
                {t('marketplace.purchase.label.open')}
              </Button>
            </Tooltip>
            
            <Tooltip title={!isReady ? t('marketplace.purchase.status.syncing') : (!purchase.entitlements.can_self_host ? "Cloud Only" : "")}>
              <Button 
                disabled={!isReady || !purchase.entitlements.can_self_host}
                icon={<ArrowUpRight size={14} />}
                className="h-9 font-bold text-[11px] rounded-control border-border text-text-secondary hover:text-brand uppercase tracking-wider overflow-hidden vf-btn-contrast-disabled"
                onClick={() => onDeploy(purchase)}
              >
                {t('marketplace.purchase.label.deploy')}
              </Button>
            </Tooltip>
          </div>

          <div className="flex justify-center">
            <button 
              className="text-[11px] font-bold text-text-tertiary hover:text-brand transition-colors tracking-tight bg-transparent border-none p-0 cursor-pointer"
              onClick={() => onViewEntitlement(purchase)}
            >
              {t('marketplace.purchase.label.viewDetails')}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .vf-btn-contrast-disabled.ant-btn:disabled {
          background-color: rgba(var(--vf-bg-page), 0.8) !important;
          border-color: rgba(var(--vf-divider), 0.5) !important;
          color: rgba(var(--vf-text-secondary), 1) !important;
          opacity: 0.55 !important;
          cursor: not-allowed;
        }
        .ant-btn-primary.vf-btn-contrast-disabled:disabled {
          background-color: rgba(var(--vf-brand), 0.15) !important;
          color: rgba(var(--vf-brand), 0.6) !important;
          border-color: transparent !important;
        }
      `}</style>
    </VFCard>
  );
};
