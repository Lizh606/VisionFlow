
import React, { useMemo } from 'react';
import { Button, Tooltip } from 'antd';
import { Zap, ArrowUpRight, Clock, Info, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Purchase } from '../../types';
import { VFTag } from '../../../../shared/ui/VFTag';
import { VFListingCardBase } from './VFListingCardBase';
import { ArtifactImage } from './ArtifactImage';
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
  const isPending = status === 'PENDING';
  const isExpired = status === 'EXPIRED';

  const expiryDateLabel = purchase.expiryAt 
    ? t('marketplace.purchase.label.expires', { date: dayjs(purchase.expiryAt).format('YYYY-MM-DD') })
    : t('marketplace.purchase.label.lifetime');

  return (
    <VFListingCardBase
      cover={<ArtifactImage alt={purchase.type} />}
      statusTag={
        isReady ? <VFTag variant="success" icon={<CheckCircle2 />} filled>{t('marketplace.purchase.status.active')}</VFTag> :
        isExpired ? <VFTag variant="error" icon={<AlertCircle />} filled>{t('marketplace.purchase.status.expired')}</VFTag> :
        <VFTag variant="info" icon={<Loader2 className="animate-spin" />} filled>{t('marketplace.purchase.status.syncing')}</VFTag>
      }
      title={purchase.listingName}
      disabled={isExpired}
      meta={
        <div className="flex items-center gap-2">
          <span className="font-bold text-text-tertiary">{t(`marketplace.type.${purchase.type.toLowerCase()}` as any)}</span>
          <span className="opacity-30">•</span>
          <span className="uppercase font-bold tracking-wider">{purchase.planName || 'Standard'}</span>
        </div>
      }
      keyInfo={
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[11px] font-bold text-text-secondary">
            <Clock size={12} className="opacity-60" />
            <span>{expiryDateLabel}</span>
          </div>
          {/* V1.4 Fix: Removed isPending pulse text as it duplicates top-right StatusTag */}
        </div>
      }
      actions={
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2" key="main-actions">
            <Button 
              type="primary" 
              disabled={!isReady || !purchase.entitlements.can_use}
              icon={<Zap size={14} />}
              className="h-9 font-bold text-[12px] rounded-control uppercase tracking-wider"
              onClick={(e) => { e.stopPropagation(); onOpen(purchase); }}
            >
              {t('marketplace.purchase.label.open')}
            </Button>
            
            <Tooltip title={isReady && !purchase.entitlements.can_self_host ? "Cloud Only Plan" : ""}>
              <Button 
                disabled={!isReady || !purchase.entitlements.can_self_host}
                icon={<ArrowUpRight size={14} />}
                className="h-9 font-bold text-[12px] rounded-control border-divider text-text-secondary hover:text-brand transition-all uppercase tracking-wider"
                onClick={(e) => { e.stopPropagation(); onDeploy(purchase); }}
              >
                {t('marketplace.purchase.label.deploy')}
              </Button>
            </Tooltip>
          </div>
          <Button 
            key="view-details"
            type="link" 
            size="small" 
            className="text-[12px] font-bold text-text-tertiary hover:text-brand h-auto p-0 flex items-center justify-center gap-1"
            onClick={(e) => { e.stopPropagation(); onViewEntitlement(purchase); }}
          >
            {t('marketplace.purchase.label.viewDetails')}
          </Button>
        </div>
      }
    />
  );
};
