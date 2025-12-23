
import React, { useState } from 'react';
import { MarketplaceHome } from './MarketplaceHome';
import { MarketplaceSearch } from './MarketplaceSearch';
import { MarketplaceLibrary } from './MarketplaceLibrary';
import { MarketplaceListingDetail } from './MarketplaceListingDetail';
import { MarketplaceSellerDashboard } from './MarketplaceSellerDashboard';
import { MarketplaceCheckout } from './MarketplaceCheckout';
import { MarketplaceOrderResult } from './MarketplaceOrderResult';

interface Props {
  subPath: string;
  onNavigate: (path: string) => void;
}

export const MarketplacePage: React.FC<Props> = ({ subPath, onNavigate }) => {
  // Simple routing for marketplace sub-pages
  if (subPath === 'marketplace') return <MarketplaceHome onNavigate={onNavigate} />;
  if (subPath === 'marketplace-search') return <MarketplaceSearch onNavigate={onNavigate} />;
  if (subPath === 'marketplace-library') return <MarketplaceLibrary onNavigate={onNavigate} />;
  if (subPath === 'marketplace-seller') return <MarketplaceSellerDashboard onNavigate={onNavigate} />;
  
  if (subPath.startsWith('marketplace-listing-')) {
    const id = subPath.replace('marketplace-listing-', '');
    return <MarketplaceListingDetail listingId={id} onNavigate={onNavigate} />;
  }

  if (subPath.startsWith('marketplace-checkout')) {
    const searchParams = new URLSearchParams(subPath.split('?')[1]);
    const listingId = searchParams.get('listing_id') || '';
    const planCode = searchParams.get('plan_code') || '';
    return <MarketplaceCheckout listingId={listingId} initialPlanCode={planCode} onNavigate={onNavigate} />;
  }

  if (subPath.startsWith('marketplace-order-result-')) {
    const orderId = subPath.replace('marketplace-order-result-', '');
    return <MarketplaceOrderResult orderId={orderId} onNavigate={onNavigate} />;
  }

  return <MarketplaceHome onNavigate={onNavigate} />;
};
