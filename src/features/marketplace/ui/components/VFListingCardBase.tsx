
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
 * VFListingCardBase - V1.4 Marketplace Standard Card
 * 1. Padding 16px (vf-4)
 * 2. Aspect Ratio 16:9 Cover
 * 3. Bottom aligned actions
 */
export const VFListingCardBase: React.FC<Props> = ({ 
  cover, statusTag, title, meta, keyInfo, actions, onClick, disabled 
}) => {
  return (
    <VFCard 
      noPadding 
      className={`h-full flex flex-col group transition-all duration-300 border-border hover:border-brand/40 shadow-none overflow-hidden ${disabled ? 'opacity-70 grayscale-[0.5]' : ''}`}
      onClick={disabled ? undefined : onClick}
    >
      {/* 1. Cover Section */}
      <div className="relative aspect-video w-full border-b border-divider shrink-0 overflow-hidden">
        {cover}
        {statusTag && (
          <div className="absolute top-3 right-3 z-10">
            {statusTag}
          </div>
        )}
        <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>

      {/* 2. Content Section */}
      <div className="p-4 flex flex-col flex-1 min-h-0 gap-3">
        {/* Header Row: Title - Refined to V1.4 T5 Strong */}
        <div className="flex flex-col gap-1">
          <VFText variant="t5-strong" as="h3" color="primary" className="m-0 line-clamp-2 leading-tight tracking-tight min-h-[36px]">
            {title}
          </VFText>
          <VFText variant="t6" color="tertiary" className="font-medium truncate opacity-70">
            {meta}
          </VFText>
        </div>

        {/* Key Info Callout (Optional) */}
        {keyInfo && (
          <div className="bg-bg-page/40 rounded-control border border-divider/40 p-2.5">
            {keyInfo}
          </div>
        )}

        {/* Actions Row (Bottom Aligned) */}
        <div className="mt-auto pt-3 border-t border-divider/40 flex flex-col gap-2">
          {actions}
        </div>
      </div>
    </VFCard>
  );
};