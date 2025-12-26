import React, { useState, useMemo, useEffect } from 'react';
import { Input, Button, Row, Col, Select, Slider, Checkbox, Divider, Skeleton, Drawer, Badge } from 'antd';
import { Search, Filter, SlidersHorizontal, RefreshCw } from 'lucide-react';
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
  const [results, setResults] = useState<Listing[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
  // Facet States
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTaskTypes, setSelectedTaskTypes] = useState<string[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const selectedCount = useMemo(() => {
    return (selectedTags.length > 0 ? 1 : 0) + 
           (selectedTaskTypes.length > 0 ? 1 : 0) + 
           (selectedDevices.length > 0 ? 1 : 0) + 
           (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0);
  }, [selectedTags, selectedTaskTypes, selectedDevices, priceRange]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const data = await marketplaceService.listPublicListings();
      setResults(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchResults(); }, []);

  const filteredResults = useMemo(() => {
    return results.filter(item => {
      // Search Text Match
      const matchSearch = item.name.toLowerCase().includes(searchText.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchText.toLowerCase());
      if (!matchSearch) return false;

      // Tags Match
      if (selectedTags.length > 0 && !item.tags.some(tag => selectedTags.includes(tag))) return false;

      // Task Type Match (Model Type mapping)
      if (selectedTaskTypes.length > 0 && !selectedTaskTypes.includes(item.type)) return false;

      // Devices Match
      if (selectedDevices.length > 0 && !item.supportedDevices.some(d => selectedDevices.includes(d))) return false;

      // Price Range Match
      if (item.price < priceRange[0] || item.price > priceRange[1]) return false;

      return true;
    });
  }, [results, searchText, selectedTags, selectedTaskTypes, selectedDevices, priceRange]);

  const clearFilters = () => {
    setSearchText('');
    setSelectedTags([]);
    setSelectedTaskTypes([]);
    setSelectedDevices([]);
    setPriceRange([0, 1000]);
  };

  // Fix: Made children optional to resolve TS error "Property 'children' is missing in type '{}' but required in type '{ children: React.ReactNode; }'" at usage sites.
  const FilterLabel = ({ children }: { children?: React.ReactNode }) => (
    <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest mb-4 block opacity-60">
      {children}
    </VFText>
  );

  const FiltersContent = (
    <div className="flex flex-col gap-8">
      {/* 1. Tags Filter */}
      <div className="flex flex-col">
        <FilterLabel>{t('marketplace.filters.tags')}</FilterLabel>
        <Checkbox.Group 
          className="flex flex-col gap-3.5" 
          value={selectedTags} 
          onChange={(vals) => setSelectedTags(vals as string[])}
        >
          {['Traffic', 'Safety', 'Industrial', 'Retail', 'YOLOv8', 'Smart City'].map(v => (
            <Checkbox key={v} value={v}>
              <VFText variant="t5" color="primary" className="font-medium">{v}</VFText>
            </Checkbox>
          ))}
        </Checkbox.Group>
      </div>

      <Divider className="m-0 opacity-40" />

      {/* 2. Task Type Filter */}
      <div className="flex flex-col">
        <FilterLabel>{t('marketplace.filters.taskType')}</FilterLabel>
        <Checkbox.Group 
          className="flex flex-col gap-3.5" 
          value={selectedTaskTypes} 
          onChange={(vals) => setSelectedTaskTypes(vals as string[])}
        >
          {[
            { label: t('marketplace.type.workflow'), value: 'WORKFLOW' },
            { label: t('marketplace.type.model'), value: 'MODEL' },
            { label: t('marketplace.type.plugin'), value: 'PLUGIN' }
          ].map(opt => (
            <Checkbox key={opt.value} value={opt.value}>
              <VFText variant="t5" color="primary" className="font-medium">{opt.label}</VFText>
            </Checkbox>
          ))}
        </Checkbox.Group>
      </div>

      <Divider className="m-0 opacity-40" />

      {/* 3. Devices Filter */}
      <div className="flex flex-col">
        <FilterLabel>{t('marketplace.filters.devices')}</FilterLabel>
        <Checkbox.Group 
          className="flex flex-col gap-3.5" 
          value={selectedDevices} 
          onChange={(vals) => setSelectedDevices(vals as string[])}
        >
          {['NVIDIA Jetson', 'Raspberry Pi 4', 'Generic x86', 'Cloud Runner', 'All Devices'].map(v => (
            <Checkbox key={v} value={v}>
              <VFText variant="t5" color="primary" className="font-medium">{v}</VFText>
            </Checkbox>
          ))}
        </Checkbox.Group>
      </div>

      <Divider className="m-0 opacity-40" />

      {/* 4. Price Filter */}
      <div className="flex flex-col">
        <FilterLabel>{t('marketplace.filters.priceRange')}</FilterLabel>
        <div className="px-1 mb-4">
          <Slider 
            range 
            max={1000} 
            value={priceRange} 
            onChange={(v) => setPriceRange(v as [number, number])} 
          />
        </div>
        <div className="flex justify-between">
           <VFText variant="t7" color="tertiary" tabularNums className="font-bold">$0</VFText>
           <VFText variant="t7" color="tertiary" tabularNums className="font-bold">$1,000+</VFText>
        </div>
      </div>
    </div>
  );

  const handleFavoriteToggle = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await marketplaceService.toggleFavorite(id);
    setResults(prev => prev.map(item => item.id === id ? { ...item, isFavorite: !item.isFavorite } : item));
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-20 w-full">
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
          <Col xs={0} lg={6} xl={5}>
            <div className="bg-bg-card rounded-card border border-border overflow-hidden sticky top-6 shadow-sm">
              <div className="px-5 py-4 border-b border-divider flex items-center justify-between bg-bg-page/20">
                <VFText variant="t4" color="primary" className="flex items-center gap-2">
                  <SlidersHorizontal size={16} /> {t('marketplace.filters.title')}
                </VFText>
                <Button 
                  type="text" 
                  size="small" 
                  className="text-xs p-0 h-auto font-bold text-brand hover:text-brand-hover" 
                  onClick={clearFilters}
                >
                  {t('marketplace.filters.reset')}
                </Button>
              </div>
              <div className="p-6">
                {FiltersContent}
              </div>
            </div>
          </Col>
        )}

        <Col xs={24} lg={18} xl={19}>
          <div className="flex flex-col gap-6">
            <div className="bg-bg-card p-4 rounded-card border border-border flex flex-col sm:flex-row gap-4 shadow-sm">
              <Input 
                prefix={<Search size={18} className="text-text-tertiary" />}
                placeholder={t('marketplace.search.placeholder')}
                className="h-11 rounded-control flex-1"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                allowClear
              />
              <Select 
                defaultValue="popular" 
                className="w-full sm:w-48 h-11" 
                options={[{ label: 'Most Popular', value: 'popular' }, { label: 'Newest', value: 'newest' }]} 
              />
              <Button 
                icon={<RefreshCw size={16} className={loading ? 'animate-spin' : ''} />} 
                onClick={fetchResults}
                className="h-11 w-11 flex items-center justify-center rounded-control"
              />
            </div>

            <div className="min-h-[400px]">
              {loading ? (
                <Row gutter={[24, 24]}>
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <Col xs={24} sm={12} xl={8} key={i}>
                      <div className="h-[440px] bg-bg-card rounded-card border border-divider p-4"><Skeleton active /></div>
                    </Col>
                  ))}
                </Row>
              ) : filteredResults.length > 0 ? (
                <Row gutter={[24, 24]}>
                  {filteredResults.map(item => (
                    <Col xs={24} sm={12} xl={8} key={item.id}>
                      <ListingCard 
                        listing={item} 
                        onClick={(id) => onNavigate(`marketplace-listing-${id}`)} 
                        onFavorite={handleFavoriteToggle} 
                      />
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="bg-bg-card rounded-card border border-border p-20 shadow-none">
                  <VFEmptyState 
                    description={t('marketplace.library.empty.noMatch')} 
                    actionLabel={t('marketplace.filters.reset')}
                    onAction={clearFilters}
                  />
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Drawer
        title={<VFText variant="t4" color="primary">{t('marketplace.filters.title')}</VFText>}
        placement="bottom" 
        height="80vh" 
        open={isFilterDrawerOpen} 
        onClose={() => setIsFilterDrawerOpen(false)}
        className="vf-drawer-standard"
      >
        <div className="pb-12 px-2">
          {FiltersContent}
        </div>
      </Drawer>
      <AuthModal open={authModalOpen} onCancel={() => setAuthModalOpen(false)} />
    </div>
  );
};