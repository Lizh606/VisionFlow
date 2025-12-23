
import React from 'react';
import { Star, ImageIcon, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Listing } from '../../types';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFTag } from '../../../../shared/ui/VFTag';
import { FavoriteButton } from './FavoriteButton';
import { VFText } from '../../../../ui/VFText';

interface Props {
  listing: Listing;
  onClick: (id: string) => void;
  onFavorite: (id: string, e: React.MouseEvent) => Promise<void>;
}

export const ListingCard: React.FC<Props> = ({ listing, onClick, onFavorite }) => {
  const { t } = useTranslation();

  return (
    <VFCard 
      noPadding 
      className="h-full flex flex-col group border-border hover:border-brand/40 transition-all cursor-pointer shadow-none overflow-hidden"
      onClick={() => onClick(listing.id)}
    >
      <div className="aspect-video bg-bg-page relative flex items-center justify-center text-text-tertiary/10 border-b border-divider/60">
        <ImageIcon size={44} strokeWidth={1} />
        <div className="absolute top-2.5 right-2.5 z-20" onClick={(e) => e.stopPropagation()}>
          <FavoriteButton isFavorite={listing.isFavorite} onToggle={(e) => onFavorite(listing.id, e)} />
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2.5">
        <div className="flex items-start justify-between gap-3">
          {/* V1.4: Card Title = T4 Subhead */}
          <VFText variant="t4" color="primary" truncate className="flex-1">
            {listing.name}
          </VFText>
          <VFTag variant="neutral" className="scale-90 origin-right shrink-0 opacity-70 font-bold" filled={false}>
            {t(`marketplace.type.${listing.type.toLowerCase()}` as any)}
          </VFTag>
        </div>
        
        {/* V1.4: Description = T5 Body */}
        <VFText variant="t5" color="secondary" className="line-clamp-2 min-h-[44px] leading-relaxed">
          {listing.shortDescription || listing.description}
        </VFText>

        <div className="flex items-center gap-3.5 mt-1">
          <div className="flex items-center gap-1.5 text-warning">
             <Star size={12} fill="currentColor" />
             {/* V1.4: Numbers = T5 Strong (Tabular) */}
             <VFText variant="t5-strong" color="inherit" tabularNums>{(listing.rating || 0).toFixed(1)}</VFText>
          </div>
          {/* V1.4: Meta = T6 Caption */}
          <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-tight opacity-60">
             {(listing.installCount || 0).toLocaleString()} {t('marketplace.installs')}
          </VFText>
        </div>

        <div className="mt-auto pt-3 border-t border-divider/40 flex items-center justify-between">
          <VFText variant="t6" color="tertiary" truncate className="max-w-[90px] opacity-50 uppercase font-bold tracking-tighter">
            {listing.author.name}
          </VFText>
          <div className="flex items-center gap-2">
            {listing.purchased ? (
              <VFTag variant="success" icon={<CheckCircle2 />} className="h-5 px-1.5 text-[10px] font-bold">
                {t('marketplace.purchase.status.ready').toUpperCase()}
              </VFTag>
            ) : (
              <VFText variant="t5-strong" color="primary" tabularNums>
                {listing.price === 0 ? t('common.free') : `$${listing.price}`}
              </VFText>
            )}
          </div>
        </div>
      </div>
    </VFCard>
  );
};
