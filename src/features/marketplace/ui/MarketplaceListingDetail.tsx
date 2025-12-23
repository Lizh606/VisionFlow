
import React, { useEffect, useState, useMemo } from 'react';
import { Button, Row, Col, Divider, Typography, App, Tabs, Skeleton, Tooltip } from 'antd';
import { 
  User, Calendar, Zap, Package, AlertCircle, RefreshCw, ShoppingCart, Layout,
  CheckCircle2, Play, ArrowUpRight, ImageIcon
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { VFCard } from '../../../shared/ui/VFCard';
import { VFTag } from '../../../shared/ui/VFTag';
import { marketplaceService } from '../../../services/marketplaceService';
import { Listing } from '../types';
import { AuthModal } from './components/AuthModal';
import { FavoriteButton } from './components/FavoriteButton';
import { CloudTestModal } from './components/CloudTestModal';

// Tabs
import { OverviewPanel } from './tabs/OverviewPanel';
import { ExamplesPanel } from './tabs/ExamplesPanel';
import { DocsPanel } from './tabs/DocsPanel';
import { PricingPanel } from './tabs/PricingPanel';

export const MarketplaceListingDetail: React.FC<{ listingId: string; onNavigate: (p: string) => void }> = ({ listingId, onNavigate }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [testModalOpen, setTestModalOpen] = useState(false);
  
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [user] = useState({ isLoggedIn: true }); 

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await marketplaceService.getListingDetail(listingId);
      if (data) {
        setListing(data);
        if (data.plans && data.plans.length > 0) {
          setSelectedPlanId(data.plans[0].id);
        }
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [listingId]);

  const activePlan = useMemo(() => 
    listing?.plans?.find(p => p.id === selectedPlanId) || null
  , [listing, selectedPlanId]);

  const handleAction = async () => {
    if (!user.isLoggedIn) {
      setAuthModalOpen(true);
      return;
    }
    if (listing?.purchased) {
      window.location.hash = '#/workflows';
      return;
    }
    
    // Redirect to Checkout Page with current selection
    onNavigate(`marketplace-checkout?listing_id=${listingId}&plan_code=${activePlan?.planCode || ''}`);
  };

  const tabItems = useMemo(() => {
    if (!listing) return [];
    return [
      {
        key: 'overview',
        label: t('marketplace.detail.overview'),
        children: <OverviewPanel listing={listing} />
      },
      { 
        key: 'examples', 
        label: t('marketplace.detail.examples'), 
        children: <ExamplesPanel listing={listing} onUseInTest={() => setTestModalOpen(true)} /> 
      },
      { 
        key: 'docs', 
        label: t('marketplace.detail.docs'), 
        children: <DocsPanel listing={listing} /> 
      },
      { 
        key: 'pricing', 
        label: t('marketplace.detail.pricing'), 
        children: (
          <PricingPanel 
            listing={listing} 
            selectedPlanId={selectedPlanId}
            onSelectPlan={setSelectedPlanId}
          />
        ) 
      }
    ];
  }, [listing, selectedPlanId, t]);

  if (loading) {
    return (
      <div className="flex flex-col gap-8 p-4">
        <Skeleton active title={{ width: '30%' }} paragraph={{ rows: 1 }} />
        <Row gutter={24}>
           <Col lg={16} xs={24}><Skeleton.Button active block className="!h-[400px] rounded-card" /></Col>
           <Col lg={8} xs={24}><Skeleton active paragraph={{ rows: 6 }} /></Col>
        </Row>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="p-20 flex flex-col items-center justify-center gap-4">
        <AlertCircle size={48} className="text-text-tertiary opacity-30" />
        <h2 className="text-lg font-bold text-text-secondary">Failed to load resource</h2>
        <Button icon={<RefreshCw size={14}/>} onClick={fetchData}>{t('common.retry')}</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-20 max-w-[1280px] mx-auto">
      <VFPageHeader 
        title={listing.name}
        onBack={() => onNavigate('marketplace')}
        actions={<FavoriteButton isFavorite={listing.isFavorite} onToggle={async () => {
          await marketplaceService.toggleFavorite(listingId);
          setListing(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
        }} size={16} className="!w-10 !h-10 border-border" />}
      />

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <div className="flex flex-col gap-6">
            <div className="aspect-video bg-bg-page rounded-card border border-border overflow-hidden relative group shadow-sm flex flex-col items-center justify-center text-text-tertiary/10">
               <ImageIcon size={100} strokeWidth={1} />
               <span className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] opacity-40">Resource Preview Placeholder</span>
            </div>

            <VFCard noPadding className="border-border shadow-none overflow-hidden">
              <Tabs 
                activeKey={undefined}
                defaultActiveKey="overview"
                className="vf-detail-tabs"
                tabBarStyle={{ padding: '0 24px', margin: 0, borderBottom: '1px solid rgba(var(--vf-divider), var(--vf-divider-alpha))' }}
                items={tabItems}
              />
            </VFCard>
          </div>
        </Col>

        <Col xs={24} lg={8}>
          <div className="flex flex-col gap-6 sticky top-6">
            <VFCard className="border-border shadow-none bg-bg-card">
               <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">
                      {listing.purchased ? 'Active Entitlement' : 'Current Selection'}
                    </span>
                    {listing.purchased ? (
                      <div className="flex items-center gap-2 text-success mt-1">
                        <CheckCircle2 size={20} />
                        <span className="text-base font-bold uppercase tracking-wide tracking-tight">Owned & Ready</span>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-baseline gap-2">
                           <span className="text-3xl font-bold text-text-primary tabular-nums">
                             {activePlan ? (activePlan.price === 0 ? t('common.free') : `$${activePlan.price.toFixed(2)}`) : '---'}
                           </span>
                           {activePlan && activePlan.price > 0 && <span className="text-sm text-text-tertiary font-bold opacity-60">/ {activePlan.interval}</span>}
                        </div>
                        {activePlan && <span className="text-xs text-brand font-bold">{activePlan.name}</span>}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <Button 
                      type="primary" 
                      block 
                      size="large"
                      icon={listing.purchased ? <Zap size={18} /> : (activePlan && activePlan.price > 0 ? <ShoppingCart size={18} /> : undefined)}
                      className="h-12 font-bold rounded-control shadow-md"
                      onClick={handleAction}
                    >
                      {listing.purchased 
                        ? t('marketplace.detail.cta.openStudio') 
                        : (activePlan?.price === 0 ? t('marketplace.detail.cta.getFree') : t('marketplace.detail.cta.buyNow'))}
                    </Button>
                    
                    {listing.purchased && listing.entitlements?.can_self_host && (
                      <Button 
                        block 
                        icon={<ArrowUpRight size={18} />}
                        className="h-11 font-bold rounded-control border-border text-text-secondary"
                        onClick={() => { window.location.hash = '#/sh-devices'; }}
                      >
                        {t('marketplace.detail.cta.deploy')}
                      </Button>
                    )}

                    {!listing.purchased && listing.entitlements?.can_cloud_test && (
                       <Button 
                         block 
                         icon={<Play size={16} />}
                         className="h-11 font-bold rounded-control border-brand text-brand hover:bg-brand/5"
                         onClick={() => setTestModalOpen(true)}
                       >
                         {t('marketplace.detail.cta.cloudTest')}
                       </Button>
                    )}
                  </div>

                  <div className="pt-5 border-t border-divider flex flex-col gap-3">
                     <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-text-tertiary uppercase tracking-tight">Total Installs</span>
                        <span className="text-text-primary tabular-nums">{listing.installCount?.toLocaleString()}</span>
                     </div>
                     <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-text-tertiary uppercase tracking-tight">Trust Rating</span>
                        <div className="flex items-center gap-1">
                          <CheckCircle2 size={14} className="text-success" />
                          <span className="text-text-primary tabular-nums">{(listing.rating || 0).toFixed(1)}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </VFCard>

            <VFCard title="Resource Details" className="border-border shadow-none">
               <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-tertiary flex items-center gap-2 font-bold"><User size={14} /> Developer</span>
                    <span className="text-xs font-bold text-text-primary">{listing.author.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-tertiary flex items-center gap-2 font-bold"><Layout size={14} /> Category</span>
                    <VFTag variant="neutral" className="scale-90 origin-right font-bold border-divider/50">{listing.type}</VFTag>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-tertiary flex items-center gap-2 font-bold"><Calendar size={14} /> Published</span>
                    <span className="text-xs font-bold text-text-secondary">Nov 2025</span>
                  </div>
                  
                  <Divider className="m-0 opacity-40" />
                  
                  <div className="flex flex-col gap-3 mt-1">
                    <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">
                      {t('marketplace.detail.supportedDevices')}
                    </span>
                    <div className="flex flex-wrap gap-2">
                       {listing.supportedDevices.map(d => (
                          <VFTag key={d} variant="neutral" className="text-[10px] h-5 px-2 opacity-80 font-bold border-divider/50" filled={false}>{d}</VFTag>
                       ))}
                    </div>
                  </div>
               </div>
            </VFCard>
          </div>
        </Col>
      </Row>

      <AuthModal open={authModalOpen} onCancel={() => setAuthModalOpen(false)} />
      <CloudTestModal open={testModalOpen} onCancel={() => setTestModalOpen(false)} listing={listing} />

      <style>{`
        .vf-detail-tabs .ant-tabs-nav::before { border: none !important; }
        .vf-detail-tabs .ant-tabs-tab { padding: 14px 0 !important; margin-right: 32px !important; }
        .vf-detail-tabs .ant-tabs-tab-btn { font-weight: 600 !important; font-size: 14px !important; }
        .vf-detail-tabs .ant-tabs-ink-bar { height: 3px !important; border-radius: 3px 3px 0 0; }
        .vf-detail-tabs .ant-tabs-content-holder { padding: 32px 32px 48px !important; }
      `}</style>
    </div>
  );
};
