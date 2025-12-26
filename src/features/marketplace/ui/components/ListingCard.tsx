
import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Listing } from '../../types';
import { VFTag } from '../../../../shared/ui/VFTag';
import { FavoriteButton } from './FavoriteButton';
import { VFText } from '../../../../ui/VFText';
import { VFListingCardBase } from './VFListingCardBase';
import { ArtifactImage } from './ArtifactImage';
import { Button } from 'antd';

interface Props {
  listing: Listing;
  onClick: (id: string) => void;
  onFavorite: (id: string, e: React.MouseEvent) => Promise<void>;
}

/**
 * ListingCard - Marketplace Buyer Context
 * V1.4 Alignment:
 * - Card Padding: 16px (vf-4)
 * - Meta: T6 Caption
 * - Price: T4 Strong Tabular
 */
export const ListingCard: React.FC<Props> = ({ listing, onClick, onFavorite }) => {
  const { t } = useTranslation();

  return (
    <VFListingCardBase
      onClick={() => onClick(listing.id)}
      cover={<ArtifactImage alt={listing.type} />}
      statusTag={
        <div onClick={(e) => e.stopPropagation()}>
          <FavoriteButton isFavorite={listing.isFavorite} onToggle={(e) => onFavorite(listing.id, e)} />
        </div>
      }
      title={listing.name}
      meta={
        <div className="flex items-center gap-2">
          {/* V1.4: Meta Row Developer = T6 Caption */}
          <VFText variant="t6" color="tertiary" className="font-bold uppercase tracking-tighter opacity-70">
            {listing.author.name}
          </VFText>
          <span className="opacity-30">{"\u2022"}</span>
          <VFTag variant="neutral" className="scale-90 origin-left h-5 px-1.5 font-bold" filled={false}>
            {t(`marketplace.type.${listing.type.toLowerCase()}` as any)}
          </VFTag>
        </div>
      }
      keyInfo={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-warning">
             <Star size={12} fill="currentColor" />
             {/* V1.4: Rating = T6 Tabular */}
             <VFText variant="t6" color="inherit" className="font-bold" tabularNums>
               {(listing.rating || 0).toFixed(1)}
             </VFText>
             <span className="mx-1 opacity-20 text-text-tertiary">|</span>
             <VFText variant="t6" color="tertiary" className="font-medium opacity-60">
               {(listing.installCount || 0).toLocaleString()} {t('marketplace.installs')}
             </VFText>
          </div>
          
          {listing.purchased ? (
            <VFTag variant="success" icon={<CheckCircle2 />} className="h-5 px-1.5 text-[10px] font-bold uppercase tracking-tight">
              {t('marketplace.purchase.status.ready')}
            </VFTag>
          ) : (
            <div className="flex items-center gap-1">
              {/* V1.4: Price = T4 Semibold Tabular */}
              <VFText variant="t4" color="brand" tabularNums className="font-bold">
                {listing.price === 0 ? t('common.free') : `$${listing.price}`}
              </VFText>
            </div>
          )}
        </div>
      }
      actions={
        <Button 
          type="primary" 
          block 
          className="h-10 font-bold text-[12px] uppercase tracking-wider rounded-control shadow-sm bg-brand border-brand"
        >
          {listing.purchased ? t('marketplace.detail.cta.openStudio') : t('common.viewDetails')}
        </Button>
      }
    />
  );
};
