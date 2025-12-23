
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

/**
 * MarketplaceSearch - Redefined by UC-MKT-001
 * Strict Filters: Tags, Task Type, Supported Devices, Price Range.
 */
export const MarketplaceSearch: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [results, setResults] = useState<Listing[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
  // UC-MKT-001 Specified Filter States
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTaskTypes, setSelectedTaskTypes] = useState<string[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('popular');

  // Filter Count Logic
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
      // Enrich data with taskType and supportedDevices for filtering logic demo
      const enriched = data.map(item => ({
        ...item,
        taskType: ['Detection', 'Classification', 'OCR'][Math.floor(Math.random() * 3)],
        supportedDevices: ['NVIDIA Jetson', 'Raspberry Pi', 'Generic PC'].slice(0, Math.floor(Math.random() * 3) + 1),
        rating: 4.5 + Math.random() * 0.5,
        installCount: Math.floor(Math.random() * 5000)
      }));
      setResults(enriched as any[]);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const filteredResults = useMemo(() => {
    return results.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(searchText.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchText.toLowerCase());
      const matchTags = selectedTags.length === 0 || selectedTags.some(tag => item.tags.includes(tag));
      const matchTaskType = selectedTaskTypes.length === 0 || selectedTaskTypes.includes((item as any).taskType);
      const matchDevices = selectedDevices.length === 0 || selectedDevices.some(d => (item as any).supportedDevices?.includes(d));
      const matchPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      
      return matchSearch && matchTags && matchTaskType && matchDevices && matchPrice;
    });
  }, [results, searchText, selectedTags, selectedTaskTypes, selectedDevices, priceRange]);

  const clearFilters = () => {
    setSearchText('');
    setSelectedTags([]);
    setSelectedTaskTypes([]);
    setSelectedDevices([]);
    setPriceRange([0, 1000]);
  };

  const FiltersContent = (
    <div className="flex flex-col gap-8">
      {/* 1. Tags (UC-MKT-001.1) */}
      <div className="flex flex-col gap-4">
        <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">
          {t('marketplace.filters.tags')}
        </span>
        <Checkbox.Group 
          className="flex flex-col gap-3" 
          value={selectedTags} 
          onChange={(vals) => setSelectedTags(vals as string[])}
        >
          <Checkbox value="Traffic" className="text-sm font-medium">Traffic</Checkbox>
          <Checkbox value="Safety" className="text-sm font-medium">Safety</Checkbox>
          <Checkbox value="Industrial" className="text-sm font-medium">Industrial</Checkbox>
          <Checkbox value="Retail" className="text-sm font-medium">Retail</Checkbox>
        </Checkbox.Group>
      </div>

      <Divider className="m-0 opacity-40" />

      {/* 2. Task Type (UC-MKT-001.2) */}
      <div className="flex flex-col gap-4">
        <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">
          {t('marketplace.filters.taskType')}
        </span>
        <Checkbox.Group 
          className="flex flex-col gap-3"
          value={selectedTaskTypes}
          onChange={(vals) => setSelectedTaskTypes(vals as string[])}
        >
          <Checkbox value="Detection" className="text-sm font-medium">Detection</Checkbox>
          <Checkbox value="Classification" className="text-sm font-medium">Classification</Checkbox>
          <Checkbox value="OCR" className="text-sm font-medium">OCR</Checkbox>
        </Checkbox.Group>
      </div>

      <Divider className="m-0 opacity-40" />

      {/* 3. Supported Devices (UC-MKT-001.3) */}
      <div className="flex flex-col gap-4">
        <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">
          {t('marketplace.filters.devices')}
        </span>
        <Checkbox.Group 
          className="flex flex-col gap-3"
          value={selectedDevices}
          onChange={(vals) => setSelectedDevices(vals as string[])}
        >
          <Checkbox value="NVIDIA Jetson" className="text-sm font-medium">NVIDIA Jetson</Checkbox>
          <Checkbox value="Raspberry Pi" className="text-sm font-medium">Raspberry Pi</Checkbox>
          <Checkbox value="Generic PC" className="text-sm font-medium">Generic PC</Checkbox>
        </Checkbox.Group>
      </div>

      <Divider className="m-0 opacity-40" />

      {/* 4. Price Range (UC-MKT-001.4) */}
      <div className="flex flex-col gap-4">
        <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">
          {t('marketplace.filters.priceRange')}
        </span>
        <div className="px-1">
          <Slider 
            range 
            max={1000} 
            value={priceRange}
            onChange={(v) => setPriceRange(v as [number, number])}
            tooltip={{ formatter: (v) => `$${v}` }}
            className="vf-search-slider"
          />
        </div>
        <div className="justify-between text-[11px] text-text-tertiary font-mono font-medium hidden sm:flex">
          <span>$0</span>
          <span>$1,000+</span>
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
              <Button 
                icon={<Filter size={16} />} 
                onClick={() => setIsFilterDrawerOpen(true)}
                className="h-10 rounded-control font-semibold"
              />
            </Badge>
          )
        }
      />

      <Row gutter={[24, 24]}>
        {/* Desktop Sidebar Filters */}
        {!isMobile && (
          <Col xs={0} lg={6}>
            <div className="flex flex-col gap-6 sticky top-6">
              <div className="bg-bg-card rounded-card border border-border overflow-hidden shadow-none">
                <div className="px-5 py-4 border-b border-divider flex items-center justify-between bg-bg-page/30">
                  <h4 className="m-0 text-sm font-bold text-text-primary flex items-center gap-2">
                    <SlidersHorizontal size={16} className="text-text-secondary" /> 
                    {t('marketplace.filters.title')}
                    {selectedCount > 0 && (
                      <span className="ml-1 text-[11px] bg-brand text-white w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        {selectedCount}
                      </span>
                    )}
                  </h4>
                  <Button 
                    type="link" 
                    size="small" 
                    className="text-xs p-0 h-auto font-bold disabled:opacity-30" 
                    onClick={clearFilters}
                    disabled={selectedCount === 0 && searchText === ''}
                  >
                    {t('marketplace.filters.reset')}
                  </Button>
                </div>
                <div className="p-6">
                  {FiltersContent}
                </div>
              </div>
            </div>
          </Col>
        )}

        {/* Main Content Area */}
        <Col xs={24} lg={18}>
          <div className="flex flex-col gap-6">
            {/* Toolbar: Search + Sort */}
            <div className="bg-bg-card p-4 rounded-card border border-border flex flex-col sm:flex-row gap-4 shadow-none">
              <Input 
                prefix={<Search size={18} className="text-text-tertiary" />}
                placeholder={t('marketplace.search.placeholder')}
                className="h-11 rounded-control flex-1 text-sm border-border bg-bg-page/20"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                allowClear
              />
              <Select 
                defaultValue="popular" 
                className="w-full sm:w-48 h-11"
                variant="filled"
                onChange={setSortBy}
                options={[
                  { label: 'Sort: Popular', value: 'popular' },
                  { label: 'Sort: Newest', value: 'newest' },
                  { label: 'Price: Asc', value: 'price_asc' },
                  { label: 'Price: Desc', value: 'price_desc' },
                ]}
              />
            </div>

            {/* Results Grid */}
            <div className="min-h-[400px]">
              {loading ? (
                <Row gutter={[20, 20]}>
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <Col xs={24} sm={12} key={i}>
                      <div className="bg-bg-card rounded-card border border-divider p-4 h-[160px] flex gap-4">
                        <Skeleton.Button active className="!w-32 !h-full rounded-lg" />
                        <div className="flex-1 py-1"><Skeleton active paragraph={{ rows: 2 }} /></div>
                      </div>
                    </Col>
                  ))}
                </Row>
              ) : error ? (
                <VFEmptyState 
                  title="Search unavailable" 
                  description="We couldn't connect to the marketplace service."
                  actionLabel="Retry"
                  onAction={fetchResults}
                  icon={<RefreshCcw size={24} />}
                />
              ) : filteredResults.length > 0 ? (
                <Row gutter={[20, 20]}>
                  {filteredResults.map(item => (
                    <Col xs={24} sm={12} key={item.id}>
                      <ListingCard 
                        listing={item} 
                        onClick={(id) => onNavigate(`marketplace-listing-${id}`)}
                        onFavorite={async (id, e) => {
                          e.stopPropagation();
                          setResults(prev => prev.map(l => l.id === id ? { ...l, isFavorite: !l.isFavorite } : l));
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="bg-bg-card rounded-card border border-border p-12">
                  <VFEmptyState 
                    title={results.length === 0 ? "Empty Marketplace" : "No matches found"}
                    description={results.length === 0 ? "Check back later for new resources." : "Try broader terms or reset your filters."}
                    actionLabel={selectedCount > 0 ? t('marketplace.filters.reset') : undefined}
                    onAction={selectedCount > 0 ? clearFilters : undefined}
                  />
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>

      {/* Mobile Filter Drawer */}
      <Drawer
        title={
          <div className="flex items-center justify-between w-full pr-4">
            <span className="font-bold text-base">{t('marketplace.filters.title')} · {selectedCount}</span>
            <Button 
              type="link" 
              size="small" 
              className="font-bold disabled:opacity-30" 
              onClick={clearFilters}
              disabled={selectedCount === 0}
            >
              {t('marketplace.filters.reset')}
            </Button>
          </div>
        }
        placement="bottom"
        height="80vh"
        onClose={() => setIsFilterDrawerOpen(false)}
        open={isFilterDrawerOpen}
        closable={false}
        extra={<Button type="text" icon={<X size={20} />} onClick={() => setIsFilterDrawerOpen(false)} />}
        className="vf-filter-drawer"
        styles={{ 
          body: { padding: '24px' },
          header: { borderBottom: '1px solid rgba(var(--vf-divider), var(--vf-divider-alpha))' }
        }}
      >
        {FiltersContent}
        <div className="mt-12 pb-8">
           <Button 
             type="primary" 
             block 
             size="large" 
             className="font-bold h-12 rounded-control" 
             onClick={() => setIsFilterDrawerOpen(false)}
           >
             {t('marketplace.filters.showResults')}
           </Button>
        </div>
      </Drawer>

      <AuthModal open={authModalOpen} onCancel={() => setAuthModalOpen(false)} />
      
      <style>{`
        .vf-search-slider .ant-slider-track { background-color: rgba(var(--vf-brand), 1) !important; }
        .vf-search-slider .ant-slider-handle::after { box-shadow: 0 0 0 2px rgba(var(--vf-brand), 1) !important; }
      `}</style>
    </div>
  );
};
