
import React from 'react';
import { Edit2, Eye, Send, AlertCircle, Clock, Archive } from 'lucide-react';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { Listing } from '../../types';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFTag } from '../../../../shared/ui/VFTag';
import dayjs from 'dayjs';

interface Props {
  listing: Listing;
  onAction: (id: string, action: 'edit' | 'preview' | 'submit') => void;
}

export const SellerListingCard: React.FC<Props> = ({ listing, onAction }) => {
  const { t } = useTranslation();
  
  const isDraft = listing.status === 'DRAFT';
  const isPending = listing.status === 'PENDING_REVIEW';
  const isSuspended = listing.status === 'SUSPENDED';
  const isArchived = listing.status === 'ARCHIVED';

  const statusConfig = {
    DRAFT: { variant: 'neutral' as const, label: t('marketplace.seller.status.draft') },
    PENDING_REVIEW: { variant: 'warning' as const, label: t('marketplace.seller.status.pending_review') },
    PUBLISHED: { variant: 'success' as const, label: t('marketplace.seller.status.published') },
    SUSPENDED: { variant: 'error' as const, label: t('marketplace.seller.status.suspended') },
    ARCHIVED: { variant: 'default' as const, label: t('marketplace.seller.status.archived') },
  };

  const config = statusConfig[listing.status] || statusConfig.DRAFT;

  return (
    <VFCard noPadding className="h-[440px] group hover:border-brand/30 transition-all border-border shadow-none bg-bg-card flex flex-col overflow-hidden">
      {/* 1. Media Area (Fixed Height) */}
      <div className="h-40 bg-bg-page relative flex flex-col items-center justify-center border-b border-divider shrink-0">
        <div className="text-text-tertiary opacity-10 group-hover:scale-105 transition-transform duration-700">
           <Eye size={44} strokeWidth={1.5} />
        </div>
        <div className="absolute top-3 right-3 z-10">
          <VFTag variant={config.variant} filled className="font-bold shadow-sm">{config.label}</VFTag>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1 min-h-0">
        {/* 2. Content Section (Fixed Line Counts) */}
        <div className="flex flex-col min-w-0 mb-3 shrink-0 h-11">
          <Tooltip title={listing.name}>
            <h3 className="text-base font-semibold text-text-primary m-0 line-clamp-1 leading-tight mb-1">
              {listing.name}
            </h3>
          </Tooltip>
          <div className="flex items-center gap-2 text-text-tertiary text-[11px] font-bold uppercase tracking-wider">
             <span className="opacity-60">{listing.type}</span>
             <span className="opacity-30">•</span>
             <span className="opacity-60 lowercase">{dayjs(listing.lastUpdated).fromNow()}</span>
          </div>
        </div>

        {/* 3. Notice Section (Flexible but pushes next section) */}
        <div className="flex-1 flex flex-col justify-start">
          <div className="min-h-[60px]">
            {(isPending || isSuspended || isArchived) ? (
              <div className={`w-full p-3 rounded-tag flex items-start gap-2.5 border ${isSuspended ? 'bg-error/5 border-error/10' : (isPending ? 'bg-warning/5 border-warning/10' : 'bg-bg-page border-divider')}`}>
                {isSuspended ? <AlertCircle size={14} className="text-error shrink-0 mt-0.5" /> : (isPending ? <Clock size={14} className="text-warning shrink-0 mt-0.5" /> : <Archive size={14} className="text-text-tertiary shrink-0 mt-0.5" />)}
                <span className={`text-[11px] font-bold leading-relaxed line-clamp-2 ${isSuspended ? 'text-error' : (isPending ? 'text-warning-700' : 'text-text-secondary')}`}>
                  {isSuspended ? t('marketplace.seller.notices.suspendedReason', { reason: listing.rejectionReason }) : (isPending ? t('marketplace.seller.notices.reviewing') : t('marketplace.seller.notices.archived'))}
                </span>
              </div>
            ) : (
              <p className="text-[12px] text-text-secondary leading-relaxed m-0 line-clamp-2 font-medium opacity-80">
                {listing.shortDescription || "Manage storefront metadata and licensing."}
              </p>
            )}
          </div>
        </div>

        {/* 4. Actions Area (Aligned to baseline) */}
        <div className="mt-auto pt-4 flex flex-col gap-2 shrink-0">
          <div className="grid grid-cols-2 gap-2">
            <Button 
              block 
              size="middle" 
              disabled={isPending || isSuspended || isArchived}
              className="font-bold text-[13px] rounded-control border-divider text-text-secondary hover:text-brand transition-all"
              onClick={() => onAction(listing.id, 'edit')}
            >
              {t('common.edit')}
            </Button>
            <Button 
              block 
              size="middle" 
              className="font-bold text-[13px] rounded-control border-divider text-text-secondary hover:text-brand transition-all"
              onClick={() => onAction(listing.id, 'preview')}
            >
              Preview
            </Button>
          </div>
          
          <div className="h-10">
            {isDraft ? (
              <Button 
                block 
                size="middle" 
                type="primary"
                icon={<Send size={14} />}
                className="font-bold text-[13px] rounded-control h-10 shadow-sm"
                onClick={() => onAction(listing.id, 'submit')}
              >
                Submit for Review
              </Button>
            ) : (
              <Button 
                block 
                size="middle" 
                disabled
                className="font-bold text-[13px] rounded-control border-divider text-text-disabled bg-bg-page/50 cursor-not-allowed h-10"
              >
                {isArchived ? "Archived" : (isSuspended ? "Action Restricted" : "Published")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </VFCard>
  );
};
