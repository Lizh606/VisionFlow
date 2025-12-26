
import React from 'react';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFText } from '../../../../ui/VFText';

interface Props {
  cover: React.ReactNode;
  statusTag?: React.ReactNode;
  title: React.ReactNode;
  meta: React.ReactNode;
  keyInfo?: React.ReactNode;
  actions: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

/**
 * VFListingCardBase - V1.4 Marketplace Standard Pattern
 * Strict Spec Alignment:
 * 1. Padding: 16px (vf-4)
 * 2. Aspect Ratio: 16:9 Cover
 * 3. Typography: Title=T4, Meta=T6, Info=T6 Strong
 * 4. Surface: White Card on #F8FAFC Page
 * 5. Layout: Fixed internal alignment for grid consistency.
 */
export const VFListingCardBase: React.FC<Props> = ({ 
  cover, statusTag, title, meta, keyInfo, actions, onClick, disabled 
}) => {
  return (
    <VFCard 
      noPadding 
      className={`h-full flex flex-col group transition-all duration-300 border-border hover:border-brand/40 shadow-none hover:shadow-card overflow-hidden ${disabled ? 'opacity-70 grayscale-[0.5]' : ''}`}
      onClick={disabled ? undefined : onClick}
    >
      {/* 1. Cover Section (16:9) */}
      <div className="relative aspect-video w-full border-b border-divider shrink-0 overflow-hidden bg-bg-page">
        {cover}
        {statusTag && (
          <div className="absolute top-3 right-3 z-10">
            {statusTag}
          </div>
        )}
        {/* Hover Mask Overlay */}
        <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>

      {/* 2. Content Section (vf-4 Padding) */}
      <div className="p-4 flex flex-col flex-1 min-h-0 gap-4">
        {/* Title & Meta Row */}
        <div className="flex flex-col gap-1.5">
          {/* V1.4: Card Title = T4 (16px, 600 weight) */}
          <VFText variant="t4" as="h3" color="primary" className="m-0 line-clamp-2 leading-tight tracking-tight min-h-[40px]">
            {title}
          </VFText>
          {/* V1.4: Meta Info = T6 (12px) */}
          <div className="flex items-center gap-2 overflow-hidden">
            {meta}
          </div>
        </div>

        {/* Key Info Callout (Optional, e.g. Warnings, Expiry, Rating) */}
        <div className="min-h-[44px]">
          {keyInfo ? (
            <div className="bg-bg-page/50 rounded-control border border-divider/40 p-2.5 group-hover:bg-bg-page transition-colors">
              {keyInfo}
            </div>
          ) : (
            <div className="h-[44px]" />
          )}
        </div>

        {/* Actions Row (Bottom Aligned) */}
        <div className="mt-auto pt-4 border-t border-divider/40 flex flex-col gap-2">
          {actions}
        </div>
      </div>
    </VFCard>
  );
};
