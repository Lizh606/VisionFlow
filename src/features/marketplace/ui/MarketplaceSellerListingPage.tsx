
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Button, Skeleton, Select, App } from 'antd';
import { Search, Plus, RefreshCw, Settings2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { VFEmptyState } from '../../../shared/ui/VFEmptyState';
import { sellerService } from '../services/sellerService';
import { Listing } from '../types';
import { VFListingCard } from './components/VFListingCard';
import { getStatusConfig } from './components/statusConfig';

export const MarketplaceSellerListingPage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  
  const fetchListings = async () => {
    setLoading(true);
    try {
      const data = await sellerService.listMyListings();
      setListings(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchListings(); }, []);

  const handleAction = (id: string, action: string) => {
    switch (action) {
      case 'edit': onNavigate(`marketplace-seller-wizard?id=${id}`); break;
      case 'preview': onNavigate(`marketplace-listing-preview-${id}`); break;
      case 'live': onNavigate(`marketplace-listing-${id}`); break;
      default: message.info(`Action [${action}] for ${id}`);
    }
  };

  const filtered = listings.filter(l => l.name.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-20 w-full min-h-full">
      <VFPageHeader 
        title={t('marketplace.seller.myListings')}
        description={t('marketplace.seller.dashboardDesc')}
        actions={
          <Button 
            type="primary" 
            icon={<Plus size={18} />} 
            className="h-10 px-6 font-bold text-sm rounded-control shadow-md" 
            onClick={async () => {
              const draft = await sellerService.createDraft();
              onNavigate(`marketplace-seller-wizard?id=${draft.id}`);
            }}
          >
            {t('marketplace.seller.createListing')}
          </Button>
        }
      />

      {/* Toolbar */}
      <div className="bg-bg-card p-3 rounded-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Input 
          prefix={<Search size={16} className="text-text-tertiary" />}
          placeholder={t('marketplace.library.searchPlaceholder')}
          className="h-10 rounded-control border-border bg-bg-page/20 w-full sm:max-w-[360px]"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          allowClear
        />
        <Button icon={<RefreshCw size={16} />} onClick={fetchListings} className="h-10 rounded-control text-text-tertiary" />
      </div>

      <div className="min-h-[400px]">
        {loading ? (
          <Row gutter={[24, 24]}>
            {[1, 2, 3, 4].map(i => <Col key={i} xs={24} sm={12} lg={8} xl={6}><Skeleton.Button active block className="!h-[460px] rounded-card" /></Col>)}
          </Row>
        ) : filtered.length > 0 ? (
          <Row gutter={[24, 24]}>
            {filtered.map(l => (
              <Col key={l.id} xs={24} sm={12} lg={8} xl={6}>
                <VFListingCard 
                  listing={l} 
                  config={getStatusConfig(l, t)} 
                  onAction={handleAction}
                  forceCoverFail={l.id === 'sl-2'} // PPE Safety Sentinel 强制失败
                />
              </Col>
            ))}
          </Row>
        ) : (
          <VFEmptyState title={t('common.noData')} description={t('marketplace.seller.emptyDesc')} actionLabel={t('marketplace.seller.createListing')} onAction={() => {}} />
        )}
      </div>
    </div>
  );
};
