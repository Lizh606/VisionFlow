
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

  const formattedRating = listing.rating ? listing.rating.toFixed(1) : '0.0';
  const formattedInstalls = (listing.installCount || 0).toLocaleString();

  return (
    <VFCard 
      noPadding 
      className="h-full flex flex-col group border-border hover:border-brand/40 transition-all cursor-pointer shadow-none bg-bg-card overflow-hidden"
      onClick={() => onClick(listing.id)}
    >
      <div className="aspect-video bg-bg-page relative flex flex-col items-center justify-center text-text-tertiary/10 border-b border-divider/60">
        <ImageIcon size={48} strokeWidth={1} />
        <div className="absolute top-2.5 right-2.5">
          <FavoriteButton isFavorite={listing.isFavorite} onToggle={(e) => onFavorite(listing.id, e)} />
        </div>
        <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-4 flex-1 flex flex-col gap-2.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[14px] font-bold text-text-primary m-0 truncate flex-1 leading-tight tracking-tight">{listing.name}</h3>
          <VFTag variant="neutral" className="scale-90 origin-right shrink-0 font-bold opacity-70 border-divider/50" filled={false}>{listing.type}</VFTag>
        </div>
        
        <p className="text-[12px] text-text-secondary m-0 line-clamp-2 min-h-[36px] leading-relaxed font-medium">
          {listing.shortDescription || listing.description}
        </p>

        <div className="flex items-center gap-3.5 mt-1">
          <div className="flex items-center gap-1.5 text-warning">
             <Star size={12} fill="currentColor" />
             <span className="text-[11px] font-bold tabular-nums">{formattedRating}</span>
          </div>
          <span className="text-[11px] text-text-tertiary font-bold uppercase tracking-tight opacity-60">
             {formattedInstalls} {t('marketplace.installs')}
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-divider/40">
          <span className="text-[11px] text-text-tertiary font-bold truncate max-w-[100px] opacity-40">{listing.author.name}</span>
          <div className="flex items-center gap-2">
            {listing.purchased ? (
              <VFTag variant="success" icon={<CheckCircle2 />} className="h-5 px-1.5 font-bold scale-95 origin-right">OWNED</VFTag>
            ) : (
              <span className={`text-[14px] font-bold tabular-nums ${listing.price === 0 ? 'text-text-tertiary' : 'text-text-primary'}`}>
                {listing.price === 0 ? t('common.free') : `$${listing.price}`}
              </span>
            )}
          </div>
        </div>
      </div>
    </VFCard>
  );
};
