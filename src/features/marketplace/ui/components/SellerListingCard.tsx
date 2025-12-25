
import React, { useMemo } from 'react';
import { Button, Tooltip } from 'antd';
import { 
  Edit2, Eye, Send, ExternalLink, 
  ShieldCheck, Ban, Archive, Info
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Listing, ListingStatus } from '../../types';
import { VFTag } from '../../../../shared/ui/VFTag';
import { VFListingCardBase } from './VFListingCardBase';
import { ArtifactImage } from './ArtifactImage';
import dayjs from 'dayjs';

interface Props {
  listing: Listing;
  onAction: (id: string, action: 'edit' | 'preview' | 'submit' | 'details') => void;
}

export const SellerListingCard: React.FC<Props> = ({ listing, onAction }) => {
  const { t } = useTranslation();
  
  // UC-MKT-001: 封面异常模拟（特定 ID 触发失败态）
  const isImageFailure = listing.id === 'sl-2'; 

  // 基于状态的 UI 配置引擎
  const statusConfig = useMemo(() => {
    const configs: Record<ListingStatus, {
      variant: any,
      label: string,
      infoIcon?: React.ReactNode,
      infoText?: string,
      infoColor?: string,
      primary: { label: string, icon: React.ReactNode, action: 'edit' | 'preview' | 'details', btnType?: 'primary' | 'warning' },
      secondary?: { label: string, action: 'edit' | 'preview' | 'submit' | 'details' },
      tertiary?: { label: string, action: 'submit', disabled?: boolean, tooltip?: string },
    }> = {
      DRAFT: {
        variant: 'neutral',
        label: t('marketplace.seller.status.draft'),
        infoText: listing.shortDescription ? undefined : "Missing description",
        infoColor: 'text-text-tertiary',
        primary: { label: t('common.edit'), icon: <Edit2 size={14} />, action: 'edit' },
        secondary: { label: 'Preview', action: 'preview' },
        tertiary: { label: 'Submit', action: 'submit', disabled: !listing.shortDescription, tooltip: "Required: Metadata" }
      },
      PENDING_REVIEW: {
        variant: 'warning',
        label: t('marketplace.seller.status.pending_review'),
        infoIcon: <ShieldCheck size={14} />,
        infoText: "Awaiting review (~48h)",
        infoColor: 'text-warning-700',
        primary: { label: 'Preview', icon: <Eye size={14} />, action: 'preview', btnType: 'warning' },
        secondary: { label: 'Submission Info', action: 'details' }
      },
      PUBLISHED: {
        variant: 'success',
        label: t('marketplace.seller.status.published'),
        infoText: "Visible on Marketplace",
        infoColor: 'text-success',
        primary: { label: 'Live Storefront', icon: <ExternalLink size={14} />, action: 'preview' },
        secondary: { label: 'Edit Listing', action: 'edit' }
      },
      SUSPENDED: {
        variant: 'error',
        label: t('marketplace.seller.status.suspended'),
        infoIcon: <Ban size={14} />,
        infoText: listing.rejectionReason || "Violated terms",
        infoColor: 'text-error',
        primary: { label: 'View Details', icon: <Info size={14} />, action: 'details' }
      },
      ARCHIVED: {
        variant: 'default',
        label: t('marketplace.seller.status.archived'),
        infoIcon: <Archive size={14} />,
        infoText: "Retired from market",
        infoColor: 'text-text-disabled',
        primary: { label: 'Details', icon: <Info size={14} />, action: 'details' }
      }
    };
    return configs[listing.status];
  }, [listing, t]);

  return (
    <VFListingCardBase
      cover={<ArtifactImage alt={listing.type} forceFail={isImageFailure} />}
      statusTag={<VFTag variant={statusConfig.variant} filled>{statusConfig.label}</VFTag>}
      title={listing.name}
      meta={
        <div className="flex items-center gap-2">
          <span className="font-bold">{listing.type}</span>
          <span className="opacity-30">{"\u2022"}</span>
          <span className="opacity-60">{dayjs(listing.lastUpdated).fromNow()}</span>
        </div>
      }
      keyInfo={
        statusConfig.infoText && (
          <div className={`flex items-start gap-2 text-[11px] font-bold leading-tight ${statusConfig.infoColor}`}>
            {statusConfig.infoIcon}
            <span className="truncate">{statusConfig.infoText}</span>
          </div>
        )
      }
      actions={
        <div className="flex flex-col gap-2">
          {/* Primary Action */}
          <Button 
            type="primary" 
            block 
            icon={statusConfig.primary.icon}
            className={`h-9 font-bold text-[12px] uppercase tracking-wider rounded-control ${statusConfig.primary.btnType === 'warning' ? 'bg-warning border-warning' : ''}`}
            onClick={(e) => { e.stopPropagation(); onAction(listing.id, statusConfig.primary.action); }}
          >
            {statusConfig.primary.label}
          </Button>

          {/* Sub-actions */}
          <div className="grid grid-cols-2 gap-2">
            {statusConfig.secondary && (
              <Button 
                className="h-9 font-bold text-[12px] text-text-secondary rounded-control"
                onClick={(e) => { e.stopPropagation(); onAction(listing.id, statusConfig.secondary.action); }}
              >
                {statusConfig.secondary.label}
              </Button>
            )}
            {statusConfig.tertiary && (
              <Tooltip title={statusConfig.tertiary.tooltip}>
                <Button 
                  disabled={statusConfig.tertiary.disabled}
                  icon={<Send size={14} />}
                  className="h-9 font-bold text-[12px] rounded-control"
                  onClick={(e) => { e.stopPropagation(); onAction(listing.id, statusConfig.tertiary.action); }}
                >
                  {statusConfig.tertiary.label}
                </Button>
              </Tooltip>
            )}
          </div>
        </div>
      }
    />
  );
};
