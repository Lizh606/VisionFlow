
import React from 'react';
import { Button } from 'antd';
import { Zap, ArrowUpRight, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Purchase } from '../../types';
import { VFTag } from '../../../../shared/ui/VFTag';
import { VFListingCardBase } from './VFListingCardBase';
import { ArtifactImage } from './ArtifactImage';
import { VFText } from '../../../../ui/VFText';
import dayjs from 'dayjs';

interface Props {
  purchase: Purchase;
  onOpen: (p: Purchase) => void;
  onDeploy: (p: Purchase) => void;
  onViewEntitlement: (p: Purchase) => void;
}

export const PurchaseCard: React.FC<Props> = ({ purchase, onOpen, onDeploy, onViewEntitlement }) => {
  const { t } = useTranslation();
  
  const status = purchase.status;
  const isReady = status === 'READY';
  const isExpired = status === 'EXPIRED';
  const isSyncing = status === 'PENDING';

  // 动态计算按钮样式 - V1.4 状态引擎
  const getOpenBtnStyles = () => {
    if (isReady) return 'bg-brand border-brand !text-white hover:opacity-90';
    if (isSyncing) return 'bg-brand/5 border-brand/20 !text-brand/40 cursor-wait';
    if (isExpired) return 'bg-bg-page border-border !text-text-disabled grayscale';
    return '';
  };

  const getDeployBtnStyles = () => {
    if (isReady && purchase.entitlements.can_self_host) return 'border-border text-text-secondary hover:!text-brand hover:!border-brand';
    return 'bg-bg-page border-border/40 !text-text-disabled';
  };

  return (
    <VFListingCardBase
      cover={<ArtifactImage alt={purchase.type} />}
      statusTag={
        isReady ? <VFTag variant="success" icon={<CheckCircle2 />} filled>{t('marketplace.purchase.status.active')}</VFTag> :
        isExpired ? <VFTag variant="error" icon={<AlertCircle />} filled>{t('marketplace.purchase.status.expired')}</VFTag> :
        <VFTag variant="info" icon={<Loader2 size={12} className="animate-spin" />} filled>{t('marketplace.purchase.status.syncing')}</VFTag>
      }
      title={<VFText variant="t4" color="primary" truncate>{purchase.listingName}</VFText>}
      disabled={isExpired}
      meta={
        <div className="flex items-center gap-2">
          <VFText variant="t6" color="tertiary" className="font-bold">
            {t(`marketplace.type.${purchase.type.toLowerCase()}` as any)}
          </VFText>
          <span className="opacity-30">/</span>
          <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-wider">
            {purchase.planName || 'Standard'}
          </VFText>
        </div>
      }
      keyInfo={
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Clock size={12} className={`shrink-0 ${isExpired ? 'text-error/60' : 'text-text-tertiary opacity-60'}`} />
            <VFText variant="t6" color={isExpired ? 'error' : 'secondary'} className="font-medium">
              {purchase.expiryAt 
                ? t('marketplace.purchase.label.expires', { date: dayjs(purchase.expiryAt).format(t('common.dateFormat')) })
                : t('marketplace.purchase.label.lifetime')}
            </VFText>
          </div>
        </div>
      }
      actions={
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Button 
              type={isReady ? "primary" : "default"}
              disabled={!isReady || !purchase.entitlements.can_use}
              icon={<Zap size={14} className={isReady ? 'text-white' : 'opacity-40'} />}
              className={`h-9 font-bold text-[12px] uppercase tracking-wider rounded-control transition-all shadow-none ${getOpenBtnStyles()}`}
              onClick={(e) => { e.stopPropagation(); onOpen(purchase); }}
            >
              {t('marketplace.purchase.label.open')}
            </Button>
            <Button 
              disabled={!isReady || !purchase.entitlements.can_self_host}
              icon={<ArrowUpRight size={14} className={isReady ? 'text-brand' : 'opacity-40'} />}
              className={`h-9 font-bold text-[12px] uppercase tracking-wider rounded-control transition-all shadow-none ${getDeployBtnStyles()}`}
              onClick={(e) => { e.stopPropagation(); onDeploy(purchase); }}
            >
              {t('marketplace.purchase.label.deploy')}
            </Button>
          </div>
          
          <Button 
            type="link" 
            size="small" 
            className="text-[12px] font-bold !text-text-tertiary hover:!text-brand h-auto p-0 flex items-center justify-center transition-colors mt-0.5"
            onClick={(e) => { e.stopPropagation(); onViewEntitlement(purchase); }}
          >
            {t('marketplace.purchase.label.viewDetails')}
          </Button>
        </div>
      }
    />
  );
};
