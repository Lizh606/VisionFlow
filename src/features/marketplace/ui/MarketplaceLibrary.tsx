
import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Select, Input, Button, Skeleton, App, Tooltip } from 'antd';
import { 
  ShoppingBag, 
  RefreshCw, Layers, Settings2, Search
} from 'lucide-react';
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
  
  const [mockScenario, setMockScenario] = useState<string>(() => {
    return localStorage.getItem(MOCK_SCENARIO_KEY) || 'DEFAULT';
  });

  const fetchPurchases = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      let data = await marketplaceService.listPurchases();
      
      if (mockScenario === 'EMPTY') {
        data = [];
      } else if (mockScenario === 'ALL_PENDING') {
        data = data.map(item => ({ ...item, status: 'PENDING' }));
      } else if (mockScenario === 'ALL_EXPIRED') {
        data = data.map(item => ({ ...item, status: 'EXPIRED' }));
      }

      setItems(data);
    } catch (e) {
      if (!silent) message.error(t('common.retry'));
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, [mockScenario]);

  const handleUpdateMock = (val: string) => {
    setMockScenario(val);
    localStorage.setItem(MOCK_SCENARIO_KEY, val);
  };

  const counts = useMemo(() => {
    return {
      all: items.length,
      ready: items.filter(i => i.status === 'READY').length,
      pending: items.filter(i => i.status === 'PENDING').length,
      expired: items.filter(i => i.status === 'EXPIRED').length,
    };
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchStatus = !statusFilter || item.status === statusFilter;
      const matchSearch = !searchText || 
        item.listingName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.planName.toLowerCase().includes(searchText.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [items, statusFilter, searchText]);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-24 max-w-[1400px] mx-auto min-h-full">
      <VFPageHeader 
        title={t('marketplace.library.title')}
        description={t('marketplace.library.description')}
        actions={
          <Button 
            icon={<ShoppingBag size={16} />} 
            onClick={() => onNavigate('marketplace')}
            className="h-10 rounded-control font-semibold text-text-secondary"
          >
            {t('marketplace.library.browseStore')}
          </Button>
        }
      />

      <div className="bg-bg-card border border-border rounded-card p-3 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-none">
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
              className="h-10 w-full sm:w-[180px]"
              allowClear
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { label: `${t('marketplace.library.filter.active')} (${counts.ready})`, value: 'READY' },
                { label: `${t('marketplace.library.filter.syncing')} (${counts.pending})`, value: 'PENDING' },
                { label: `${t('marketplace.library.filter.expired')} (${counts.expired})`, value: 'EXPIRED' },
              ]}
            />
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 px-1 md:px-0">
            {!isMobile && (
              <div className="flex items-center gap-2 border-r border-divider pr-4 h-6">
                <Layers size={14} className="text-text-tertiary" />
                <span className="text-[12px] font-medium text-text-secondary whitespace-nowrap">
                  {t('marketplace.library.meta.itemsShown', { count: filteredItems.length })}
                </span>
              </div>
            )}
            
            <Tooltip title={t('common.refresh')}>
              <Button 
                type="text" 
                className="w-10 h-10 flex items-center justify-center rounded-control hover:bg-action-hover text-text-tertiary"
                icon={<RefreshCw size={18} className={loading ? 'animate-spin' : ''} />} 
                onClick={() => fetchPurchases()} 
              />
            </Tooltip>
          </div>
      </div>

      <div className="min-h-[400px]">
        {loading ? (
           <Row gutter={[20, 20]}>
             {[1, 2, 3, 4].map(i => (
               <Col xs={24} sm={12} lg={8} xl={6} key={i}>
                 <div className="bg-bg-card rounded-card border border-divider p-4 h-[300px] flex flex-col gap-4">
                   <Skeleton.Button active block className="!h-32 rounded-lg" />
                   <Skeleton active paragraph={{ rows: 2 }} />
                 </div>
               </Col>
             ))}
           </Row>
        ) : filteredItems.length > 0 ? (
          <Row gutter={[20, 20]}>
            {filteredItems.map(item => (
              <Col xs={24} sm={12} lg={8} xl={6} key={item.id}>
                <PurchaseCard 
                  purchase={item}
                  onOpen={() => { setSelectedPurchase(item); setDrawerOpen(true); }}
                  onDeploy={() => { setSelectedPurchase(item); setDrawerOpen(true); }}
                  onViewEntitlement={(p) => {
                    setSelectedPurchase(p);
                    setDrawerOpen(true);
                  }}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="bg-bg-card rounded-card border border-border p-20 flex flex-col items-center">
            <VFEmptyState 
              description={(statusFilter || searchText) ? t('marketplace.library.empty.noMatch') : t('marketplace.library.description')} 
              actionLabel={(statusFilter || searchText) ? t('marketplace.filters.reset') : t('marketplace.library.empty.goStore')}
              onAction={() => {
                if (statusFilter || searchText) {
                  setStatusFilter(null);
                  setSearchText('');
                } else {
                  onNavigate('marketplace');
                }
              }}
            />
          </div>
        )}
      </div>

      <EntitlementDrawer 
        open={drawerOpen} 
        purchase={selectedPurchase} 
        onClose={() => setDrawerOpen(false)} 
      />

      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-3 scale-90 sm:scale-100">
          <div className="bg-bg-card border border-border rounded-card shadow-overlay p-4 min-w-[200px] animate-in slide-in-from-right-4">
             <div className="flex items-center gap-2 border-b border-divider pb-2 mb-3">
                <Settings2 size={14} className="text-brand" />
                <span className="text-[10px] font-bold text-text-primary uppercase tracking-widest">Mock Scenario</span>
             </div>
             <div className="flex flex-col gap-2">
                <Button size="small" className={`text-[10px] text-left font-bold h-8 ${mockScenario === 'DEFAULT' ? 'text-brand border-brand' : ''}`} onClick={() => handleUpdateMock('DEFAULT')}>Default (Mixed)</Button>
                <Button size="small" className={`text-[10px] text-left font-bold h-8 ${mockScenario === 'EMPTY' ? 'text-brand border-brand' : ''}`} onClick={() => handleUpdateMock('EMPTY')}>Empty Library</Button>
                <Button size="small" className={`text-[10px] text-left font-bold h-8 ${mockScenario === 'ALL_PENDING' ? 'text-brand border-brand' : ''}`} onClick={() => handleUpdateMock('ALL_PENDING')}>All Syncing</Button>
                <Button size="small" className={`text-[10px] text-left font-bold h-8 ${mockScenario === 'ALL_EXPIRED' ? 'text-brand border-brand' : ''}`} onClick={() => handleUpdateMock('ALL_EXPIRED')}>All Expired</Button>
             </div>
          </div>
          <div className="bg-text-primary text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
             DEMO MODE: {mockScenario}
          </div>
        </div>
      )}
    </div>
  );
};
