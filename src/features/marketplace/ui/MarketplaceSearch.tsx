import React, { useState, useMemo, useEffect } from 'react';
import { Input, Button, Row, Col, Select, Slider, Checkbox, Divider, Skeleton, Drawer, Badge } from 'antd';
import { Search, Filter, RefreshCcw, SlidersHorizontal, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { VFEmptyState } from '../../../shared/ui/VFEmptyState';
import { marketplaceService } from '../../../services/marketplaceService';
import { Listing } from '../types';
import { ListingCard } from './components/ListingCard';
import { AuthModal } from './components/AuthModal';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import { VFText } from '../../../ui/VFText';

export const MarketplaceSearch: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [results, setResults] = useState<Listing[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTaskTypes, setSelectedTaskTypes] = useState<string[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('popular');

  const selectedCount = useMemo(() => {
    return (selectedTags.length > 0 ? 1 : 0) + 
           (selectedTaskTypes.length > 0 ? 1 : 0) + 
           (selectedDevices.length > 0 ? 1 : 0) + 
           (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0);
  }, [selectedTags, selectedTaskTypes, selectedDevices, priceRange]);

  const fetchResults = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await marketplaceService.listPublicListings();
      setResults(data as any[]);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchResults(); }, []);

  const filteredResults = useMemo(() => {
    return results.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(searchText.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchText.toLowerCase());
      return matchSearch;
    });
  }, [results, searchText]);

  const clearFilters = () => {
    setSearchText('');
    setSelectedTags([]);
    setSelectedTaskTypes([]);
    setSelectedDevices([]);
    setPriceRange([0, 1000]);
  };

  // Fix: Made children optional to suppress TypeScript error where JSX fails to correctly infer children prop in nested render variables.
  const FilterLabel = ({ children }: { children?: React.ReactNode }) => (
    /* V1.4: Sidebar Filter Title = T6 Strong (Uppercase) */
    <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest mb-4 block">
      {children}
    </VFText>
  );

  const FiltersContent = (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col">
        <FilterLabel>{t('marketplace.filters.tags')}</FilterLabel>
        <Checkbox.Group 
          className="flex flex-col gap-3" 
          value={selectedTags} 
          onChange={(vals) => setSelectedTags(vals as string[])}
        >
          {['Traffic', 'Safety', 'Industrial'].map(v => (
            <Checkbox key={v} value={v}><VFText variant="t5" color="primary" className="font-medium">{v}</VFText></Checkbox>
          ))}
        </Checkbox.Group>
      </div>

      <Divider className="m-0 opacity-40" />

      <div className="flex flex-col">
        <FilterLabel>{t('marketplace.filters.taskType')}</FilterLabel>
        <Checkbox.Group className="flex flex-col gap-3" value={selectedTaskTypes} onChange={(vals) => setSelectedTaskTypes(vals as string[])}>
          {['Detection', 'Classification'].map(v => (
            <Checkbox key={v} value={v}><VFText variant="t5" color="primary" className="font-medium">{v}</VFText></Checkbox>
          ))}
        </Checkbox.Group>
      </div>

      <Divider className="m-0 opacity-40" />

      <div className="flex flex-col">
        <FilterLabel>{t('marketplace.filters.priceRange')}</FilterLabel>
        <div className="px-1 mb-2">
          <Slider range max={1000} value={priceRange} onChange={(v) => setPriceRange(v as [number, number])} className="vf-search-slider" />
        </div>
        <div className="flex justify-between">
           <VFText variant="t7" color="tertiary">$0</VFText>
           <VFText variant="t7" color="tertiary">$1,000+</VFText>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-in fade-in duration-500 pb-20 max-w-[1400px] mx-auto">
      <VFPageHeader 
        title={t('marketplace.search.title')}
        onBack={() => onNavigate('marketplace')}
        actions={
          isMobile && (
            <Badge count={selectedCount} size="small" offset={[-4, 4]}>
              <Button icon={<Filter size={16} />} onClick={() => setIsFilterDrawerOpen(true)} className="h-10 font-bold" />
            </Badge>
          )
        }
      />

      <Row gutter={[24, 24]}>
        {!isMobile && (
          <Col xs={0} lg={6}>
            <div className="bg-bg-card rounded-card border border-border overflow-hidden">
              <div className="px-5 py-4 border-b border-divider flex items-center justify-between bg-bg-page/30">
                {/* V1.4: Card Subhead = T4 (16px) */}
                <VFText variant="t4" color="primary" className="flex items-center gap-2">
                  <SlidersHorizontal size={16} /> {t('marketplace.filters.title')}
                </VFText>
                <Button type="link" size="small" className="text-xs p-0 h-auto font-bold" onClick={clearFilters}>{t('marketplace.filters.reset')}</Button>
              </div>
              <div className="p-6">{FiltersContent}</div>
            </div>
          </Col>
        )}

        <Col xs={24} lg={18}>
          <div className="flex flex-col gap-6">
            <div className="bg-bg-card p-4 rounded-card border border-border flex flex-col sm:flex-row gap-4 shadow-none">
              <Input 
                prefix={<Search size={18} className="text-text-tertiary" />}
                placeholder={t('marketplace.search.placeholder')}
                className="h-11 rounded-control flex-1"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
              <Select defaultValue="popular" className="w-full sm:w-48 h-11" options={[{ label: 'Popular', value: 'popular' }]} />
            </div>

            <div className="min-h-[400px]">
              {loading ? (
                <Skeleton active />
              ) : (
                <Row gutter={[20, 20]}>
                  {filteredResults.map(item => (
                    <Col xs={24} sm={12} key={item.id}>
                      <ListingCard listing={item} onClick={(id) => onNavigate(`marketplace-listing-${id}`)} onFavorite={async () => {}} />
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Drawer
        title={<VFText variant="t4" color="primary">{t('marketplace.filters.title')}</VFText>}
        placement="bottom" height="80vh" open={isFilterDrawerOpen} onClose={() => setIsFilterDrawerOpen(false)}
      >
        {FiltersContent}
      </Drawer>
      <AuthModal open={authModalOpen} onCancel={() => setAuthModalOpen(false)} />
    </div>
  );
};
