
import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Select, Input, Button, Skeleton, App, Tooltip } from 'antd';
import { ShoppingBag, RefreshCw, Layers, Search, Settings2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { VFEmptyState } from '../../../shared/ui/VFEmptyState';
import { marketplaceService } from '../../../services/marketplaceService';
import { Purchase } from '../types';
import { PurchaseCard } from './components/PurchaseCard';
import { EntitlementDrawer } from './components/EntitlementDrawer';
import { useResponsive } from '../../../shared/hooks/useResponsive';

const MOCK_SCENARIO_KEY = "vf_mock_entitlement_status";

export const MarketplaceLibrary: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { isMobile } = useResponsive();

  const [items, setItems] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const [mockScenario, setMockScenario] = useState<string>(() => localStorage.getItem(MOCK_SCENARIO_KEY) || 'DEFAULT');

  const fetchPurchases = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      let data = await marketplaceService.listPurchases();
      if (mockScenario === 'EMPTY') data = [];
      else if (mockScenario === 'ALL_PENDING') data = data.map(item => ({ ...item, status: 'PENDING' }));
      else if (mockScenario === 'ALL_EXPIRED') data = data.map(item => ({ ...item, status: 'EXPIRED' }));
      setItems(data);
    } catch (e) {
      if (!silent) message.error(t('common.retry'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPurchases(); }, [mockScenario]);

  const filteredItems = useMemo(() => items.filter(item => {
    const matchStatus = !statusFilter || item.status === statusFilter;
    const matchSearch = !searchText || item.listingName.toLowerCase().includes(searchText.toLowerCase());
    return matchStatus && matchSearch;
  }), [items, statusFilter, searchText]);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-24 w-full min-h-full">
      <VFPageHeader 
        title={t('marketplace.library.title')}
        description={t('marketplace.library.description')}
        actions={
          <Button 
            type="primary"
            icon={<ShoppingBag size={16} />} 
            onClick={() => onNavigate('marketplace')}
            className="h-10 rounded-control font-bold"
          >
            {t('marketplace.library.browseStore')}
          </Button>
        }
      />

      {/* Standard Toolbar */}
      <div className="bg-bg-card border border-border rounded-card p-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 flex-1 min-w-0">
            <Input 
              prefix={<Search size={16} className="text-text-tertiary" />}
              placeholder={t('marketplace.library.searchPlaceholder')}
              className="h-10 rounded-control border-border bg-bg-page/20 w-full sm:max-w-[320px]"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              allowClear
            />
            <Select 
              placeholder={t('marketplace.library.filter.all')}
              className="h-10 w-full sm:w-[180px] font-semibold"
              allowClear
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { label: t('marketplace.library.filter.active'), value: 'READY' },
                { label: t('marketplace.library.filter.syncing'), value: 'PENDING' },
                { label: t('marketplace.library.filter.expired'), value: 'EXPIRED' },
              ]}
            />
          </div>
          <div className="flex items-center gap-4 shrink-0">
            {!isMobile && (
              <div className="flex items-center gap-2 border-r border-divider pr-4 h-6">
                <Layers size={14} className="text-text-tertiary" />
                <span className="text-[12px] font-bold text-text-secondary whitespace-nowrap">
                  {t('marketplace.library.meta.itemsShown', { count: filteredItems.length })}
                </span>
              </div>
            )}
            <Button 
              type="text" 
              className="w-10 h-10 flex items-center justify-center rounded-control text-text-tertiary"
              icon={<RefreshCw size={18} className={loading ? 'animate-spin' : ''} />} 
              onClick={() => fetchPurchases()} 
            />
          </div>
      </div>

      {/* Grid */}
      <div className="min-h-[400px]">
        {loading ? (
           <Row gutter={[24, 24]}>
             {[1, 2, 3, 4].map(i => <Col xs={24} sm={12} lg={8} xl={6} key={i}><Skeleton.Button active block className="!h-[400px] rounded-card" /></Col>)}
           </Row>
        ) : filteredItems.length > 0 ? (
          <Row gutter={[24, 24]}>
            {filteredItems.map(item => (
              <Col xs={24} sm={12} lg={8} xl={6} key={item.id}>
                <PurchaseCard 
                  purchase={item}
                  onOpen={() => message.info(`Launching ${item.listingName}...`)}
                  onDeploy={() => onNavigate('sh-devices')}
                  onViewEntitlement={(p) => { setSelectedPurchase(p); setDrawerOpen(true); }}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <VFEmptyState 
            description={t('marketplace.library.empty.noMatch')} 
            actionLabel={t('marketplace.library.empty.goStore')}
            onAction={() => onNavigate('marketplace')}
          />
        )}
      </div>

      <EntitlementDrawer open={drawerOpen} purchase={selectedPurchase} onClose={() => setDrawerOpen(false)} />

      {/* Dev Scenario Toggle */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-6 right-6 z-[1000] scale-90 sm:scale-100 flex flex-col items-end gap-2">
          <div className="bg-bg-card border border-border rounded-card shadow-overlay p-4 min-w-[200px]">
             <div className="flex items-center gap-2 border-b border-divider pb-2 mb-3">
                <Settings2 size={14} className="text-brand" />
                <span className="text-[11px] font-bold text-text-primary uppercase tracking-widest">Mock Scenario</span>
             </div>
             <div className="flex flex-col gap-2">
                {['DEFAULT', 'EMPTY', 'ALL_PENDING', 'ALL_EXPIRED'].map(s => (
                  <Button 
                    key={s} size="small" 
                    className={`text-[10px] text-left font-bold h-8 ${mockScenario === s ? 'text-brand border-brand' : ''}`} 
                    onClick={() => { setMockScenario(s); localStorage.setItem(MOCK_SCENARIO_KEY, s); }}
                  >
                    {s}
                  </Button>
                ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
