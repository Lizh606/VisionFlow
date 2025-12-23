
import React from 'react';
import { Star, ImageIcon, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Listing } from '../../types';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFTag } from '../../../../shared/ui/VFTag';
import { FavoriteButton } from './FavoriteButton';

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
          <h3 className="text-[14px] font-bold text-text-primary m-0 line-clamp-1 flex-1 tracking-tight">{listing.name}</h3>
          <VFTag variant="neutral" className="scale-90 origin-right shrink-0 opacity-70" filled={false}>
            {t(`marketplace.type.${listing.type.toLowerCase()}` as any)}
          </VFTag>
        </div>
        
        <p className="text-[12px] text-text-secondary m-0 line-clamp-2 min-h-[36px] font-medium leading-relaxed">
          {listing.shortDescription || listing.description}
        </p>

        <div className="flex items-center gap-3.5 mt-1">
          <div className="flex items-center gap-1.5 text-warning">
             <Star size={12} fill="currentColor" />
             <span className="text-[11px] font-bold tabular-nums">{(listing.rating || 0).toFixed(1)}</span>
          </div>
          <span className="text-[11px] text-text-tertiary font-bold uppercase tracking-tight opacity-60">
             {(listing.installCount || 0).toLocaleString()} {t('marketplace.installs')}
          </span>
        </div>

        <div className="mt-auto pt-3 border-t border-divider/40 flex items-center justify-between">
          <span className="text-[10px] text-text-tertiary font-bold truncate max-w-[90px] opacity-50 uppercase tracking-tighter">
            {listing.author.name}
          </span>
          <div className="flex items-center gap-2">
            {listing.purchased ? (
              <VFTag variant="success" icon={<CheckCircle2 />} className="h-5 px-1.5 text-[10px] font-bold">
                {t('marketplace.purchase.status.ready').toUpperCase()}
              </VFTag>
            ) : (
              <span className="text-[14px] font-bold tabular-nums text-text-primary">
                {listing.price === 0 ? t('common.free') : `$${listing.price}`}
              </span>
            )}
          </div>
        </div>
      </div>
    </VFCard>
  );
};
