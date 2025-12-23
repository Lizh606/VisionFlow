
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Button, Skeleton, Select, App, Tooltip } from 'antd';
import { Search, Plus, RefreshCw, Layers, Database, Settings2, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { VFEmptyState } from '../../../shared/ui/VFEmptyState';
import { sellerService } from '../services/sellerService';
import { Listing } from '../types';
import { SellerListingCard } from './components/SellerListingCard';

const SCENARIO_KEY = "vf_seller_mock_scenario_v2";

export const MarketplaceSellerListingPage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  
  // Dev Mock Scenario Logic (Session Storage Persistence)
  const [scenario, setScenario] = useState(() => {
    return sessionStorage.getItem(SCENARIO_KEY) || 'DEFAULT';
  });

  const fetchListings = async () => {
    setLoading(true);
    try {
      let data = await sellerService.listMyListings();
      if (scenario === 'EMPTY') {
        data = [];
      } else if (scenario === 'REVIEWING_ONLY') {
        data = data.filter(d => d.status === 'PENDING_REVIEW');
      } else if (scenario === 'SUSPENDED_ONLY') {
        data = data.filter(d => d.status === 'SUSPENDED');
      }
      setListings(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [scenario]);

  const handleScenarioChange = (val: string) => {
    setScenario(val);
    sessionStorage.setItem(SCENARIO_KEY, val);
  };

  const filtered = listings.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(searchText.toLowerCase()) || l.id.toLowerCase().includes(searchText.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleAction = (id: string, action: 'edit' | 'preview' | 'submit') => {
    if (action === 'edit' || action === 'submit') {
      onNavigate(`marketplace-seller-wizard?id=${id}`);
    } else if (action === 'preview') {
      onNavigate(`marketplace-listing-preview-${id}`);
    }
  };

  const handleCreate = async () => {
    message.loading({ content: 'Initializing draft...', key: 'create' });
    const draft = await sellerService.createDraft();
    message.success({ content: 'Draft created', key: 'create' });
    onNavigate(`marketplace-seller-wizard?id=${draft.id}`);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-20 max-w-[1400px] mx-auto min-h-full">
      <VFPageHeader 
        title={t('marketplace.seller.myListings')}
        description="Marketplace seller control plane. Track submissions and manage storefront data."
        actions={
          <div className="flex items-center gap-3">
            <Button 
              type="primary" 
              icon={<Plus size={18} />} 
              className="h-10 px-6 font-bold text-sm rounded-control shadow-md" 
              onClick={handleCreate}
            >
              {t('marketplace.seller.createListing')}
            </Button>
            <Tooltip title={t('common.refresh')}>
              <Button 
                icon={<RefreshCw size={16} />} 
                onClick={fetchListings} 
                className="h-10 w-10 flex items-center justify-center rounded-control border-divider text-text-tertiary hover:text-brand" 
              />
            </Tooltip>
          </div>
        }
      />

      {/* Toolbar Layout per V1.4 (Compact) */}
      <div className="bg-bg-card p-3 rounded-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-none">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Input 
            prefix={<Search size={16} className="text-text-tertiary" />}
            placeholder="Search by listing name or ID..."
            className="h-10 rounded-control border-border bg-bg-page/20 w-full sm:max-w-[360px] text-sm font-medium"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            allowClear
          />
          <Select 
            defaultValue="ALL"
            className="h-10 w-48 shrink-0 font-bold"
            onChange={setStatusFilter}
            options={[
              { label: t('common.allStatus'), value: 'ALL' },
              { label: t('marketplace.seller.status.draft'), value: 'DRAFT' },
              { label: t('marketplace.seller.status.pending_review'), value: 'PENDING_REVIEW' },
              { label: t('marketplace.seller.status.published'), value: 'PUBLISHED' },
              { label: t('marketplace.seller.status.suspended'), value: 'SUSPENDED' },
            ]}
          />
        </div>
      </div>

      <div className="min-h-[400px]">
        {loading ? (
          <Row gutter={[24, 24]}>
            {[1, 2, 3].map(i => (
              <Col key={i} xs={24} sm={12} lg={8}>
                <div className="bg-bg-card border border-border rounded-card h-[320px] p-4 flex flex-col gap-4">
                  <Skeleton.Button active block className="!h-40 rounded-lg" />
                  <Skeleton active title={{ width: '40%' }} paragraph={{ rows: 2 }} />
                </div>
              </Col>
            ))}
          </Row>
        ) : filtered.length > 0 ? (
          <Row gutter={[24, 24]}>
            {filtered.map(l => (
              <Col key={l.id} xs={24} sm={12} lg={8}>
                <SellerListingCard listing={l} onAction={handleAction} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="bg-bg-card rounded-card border border-border p-24 flex items-center justify-center shadow-none">
            <VFEmptyState 
              title={listings.length === 0 ? "Your catalog is empty" : "No results found"}
              description={listings.length === 0 ? "Publish your vision logic to the community." : "Refine your filters or search terms."}
              actionLabel={listings.length === 0 ? t('marketplace.seller.createListing') : t('marketplace.filters.reset')}
              onAction={listings.length === 0 ? handleCreate : () => { setSearchText(''); setStatusFilter('ALL'); }}
              icon={<Database size={24} strokeWidth={1.5} />}
            />
          </div>
        )}
      </div>

      {/* DEV Panel: Persistent via sessionStorage */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2 z-[1000]">
          <div className="bg-bg-card p-4 rounded-card border border-border shadow-overlay min-w-[220px] animate-in slide-in-from-right-4">
             <div className="flex items-center gap-2 border-b border-divider pb-2 mb-3">
                <Settings2 size={14} className="text-brand" />
                <span className="text-[11px] font-bold text-text-primary uppercase tracking-widest">Mock Scenarios</span>
             </div>
             <div className="flex flex-col gap-2">
                {[
                  { id: 'DEFAULT', label: 'All Resources' },
                  { id: 'EMPTY', label: 'Empty State' },
                  { id: 'REVIEWING_ONLY', label: 'Review Queue' },
                  { id: 'SUSPENDED_ONLY', label: 'Suspended Items' }
                ].map(opt => (
                  <Button 
                    key={opt.id}
                    size="small" 
                    className={`text-[11px] font-bold justify-start h-8 ${scenario === opt.id ? 'border-brand text-brand bg-brand/5' : 'text-text-secondary border-divider'}`} 
                    onClick={() => handleScenarioChange(opt.id)}
                  >
                    {opt.label}
                  </Button>
                ))}
             </div>
             <div className="mt-3 pt-2 border-t border-divider flex items-center gap-1.5 opacity-40">
                <div className="w-1.5 h-1.5 rounded-full bg-success" />
                <span className="text-[9px] font-bold uppercase tracking-tight">Active State Sync</span>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
