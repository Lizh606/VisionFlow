
import React, { useEffect, useState } from 'react';
import { Button, Input, Row, Col, Skeleton } from 'antd';
import { Search, TrendingUp, ArrowRight, Zap, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { marketplaceService } from '../../../services/marketplaceService';
import { Listing } from '../types';
import { ListingCard } from './components/ListingCard';
import { AuthModal } from './components/AuthModal';
import { VFTag } from '../../../shared/ui/VFTag';
import { useResponsive } from '../../../shared/hooks/useResponsive';

export const MarketplaceHome: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    marketplaceService.listPublicListings().then(data => {
      setListings(data);
      setLoading(false);
    });
  }, []);

  const handleFavorite = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setListings(prev => prev.map(l => l.id === id ? { ...l, isFavorite: !l.isFavorite } : l));
  };

  const handleSearchClick = () => {
    onNavigate('marketplace-search');
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-in fade-in duration-500 w-full">
      <VFPageHeader 
        title={t('marketplace.home.title')}
        description={t('marketplace.home.description')}
        actions={
          <Button 
            icon={<Filter size={16} />} 
            onClick={() => onNavigate('marketplace-search')}
            className="h-10 rounded-control font-semibold text-text-secondary"
          >
            {t('marketplace.home.browseAll')}
          </Button>
        }
      />

      {/* Hero Section - V1.4 Refinement */}
      <div className="bg-bg-card rounded-card border border-border p-6 md:p-10 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 opacity-[0.03] pointer-events-none text-brand">
           <Zap size={isMobile ? 120 : 240} strokeWidth={1.5} />
        </div>
        
        <div className="max-w-2xl relative z-10 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-text-primary m-0 tracking-tight leading-tight">
              {t('marketplace.home.heroTitle')}
            </h2>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-[500px]">
              {t('marketplace.home.heroDesc')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
            <Input 
              prefix={<Search size={18} className="text-text-tertiary" />}
              placeholder={t('marketplace.search.placeholder')}
              className="h-11 md:h-12 rounded-control border-border bg-bg-page/40"
              onPressEnter={handleSearchClick}
            />
            <Button 
              type="primary" 
              className="h-11 md:h-12 px-8 rounded-control font-bold"
              onClick={handleSearchClick}
            >
              {t('common.search', { defaultValue: 'Search' })}
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">
              {t('marketplace.search.trending', { defaultValue: 'Trending' })}:
            </span>
            {['YOLOv10', 'PPE Detection', 'OCR'].map(tag => (
              <VFTag 
                key={tag} 
                variant="neutral" 
                className="cursor-pointer hover:border-brand hover:text-brand transition-all"
                onClick={handleSearchClick}
              >
                {tag}
              </VFTag>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
             <TrendingUp size={18} className="text-brand" />
             <h2 className="text-lg md:text-xl font-semibold text-text-primary m-0">
               {t('marketplace.home.featuredTitle')}
             </h2>
          </div>
          <Button 
            type="link" 
            className="font-bold flex items-center gap-1 text-sm p-0"
            onClick={handleSearchClick}
          >
            {t('marketplace.home.viewAll')} <ArrowRight size={14} />
          </Button>
        </div>

        <Row gutter={[20, 20]}>
          {loading ? (
            [1, 2, 3, 4, 5, 6].map(i => (
              <Col xs={24} sm={12} lg={8} xl={6} xxl={4} key={i}>
                <div className="bg-bg-card rounded-card border border-divider p-4 h-[340px] flex flex-col gap-4">
                  <Skeleton.Button active block className="!h-44 rounded-lg" />
                  <Skeleton active title={{ width: '60%' }} paragraph={{ rows: 2 }} />
                </div>
              </Col>
            ))
          ) : (
            listings.map(item => (
              <Col xs={24} sm={12} lg={8} xl={6} xxl={4} key={item.id}>
                <ListingCard 
                  listing={item} 
                  onClick={(id) => onNavigate(`marketplace-listing-${id}`)}
                  onFavorite={handleFavorite}
                />
              </Col>
            ))
          )}
        </Row>
      </div>

      <AuthModal open={authModalOpen} onCancel={() => setAuthModalOpen(false)} />
    </div>
  );
};
