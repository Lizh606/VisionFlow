
import React, { useEffect, useState, useMemo } from 'react';
import { Button, Row, Col, Divider, App, Tabs, Skeleton, Tooltip } from 'antd';
import { 
  User, Calendar, Zap, Package, AlertCircle, RefreshCw, ShoppingCart, Layout,
  CheckCircle2, Play, ArrowUpRight, Image as ImageIcon
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { VFCard } from '../../../shared/ui/VFCard';
import { VFTag } from '../../../shared/ui/VFTag';
import { marketplaceService } from '../../../services/marketplaceService';
import { Listing } from '../types';
import { AuthModal } from './components/AuthModal';
import { FavoriteButton } from './components/FavoriteButton';
import { CloudTestModal } from './components/CloudTestModal';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import { VFText } from '../../../ui/VFText';

// Tabs
import { OverviewPanel } from './tabs/OverviewPanel';
import { ExamplesPanel } from './tabs/ExamplesPanel';
import { DocsPanel } from './tabs/DocsPanel';
import { PricingPanel } from './tabs/PricingPanel';

export const MarketplaceListingDetail: React.FC<{ listingId: string; onNavigate: (p: string) => void }> = ({ listingId, onNavigate }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { isMobile } = useResponsive();
  
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [testModalOpen, setTestModalOpen] = useState(false);
  
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [user] = useState({ isLoggedIn: true }); 

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await marketplaceService.getListingDetail(listingId);
      if (data) {
        setListing(data);
        if (data.plans?.length) setSelectedPlanId(data.plans[0].id);
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [listingId]);

  const activePlan = useMemo(() => 
    listing?.plans?.find(p => p.id === selectedPlanId) || null
  , [listing, selectedPlanId]);

  const handleAction = async () => {
    if (!user.isLoggedIn) { setAuthModalOpen(true); return; }
    if (listing?.purchased) { onNavigate('workflows'); return; }
    onNavigate(`marketplace-checkout?listing_id=${listingId}&plan_code=${activePlan?.planCode || ''}`);
  };

  const tabItems = useMemo(() => {
    if (!listing) return [];
    return [
      { key: 'overview', label: t('marketplace.detail.overview'), children: <OverviewPanel listing={listing} /> },
      { key: 'examples', label: t('marketplace.detail.examples'), children: <ExamplesPanel listing={listing} onUseInTest={() => setTestModalOpen(true)} /> },
      { key: 'docs', label: t('marketplace.detail.docs'), children: <DocsPanel listing={listing} /> },
      { key: 'pricing', label: t('marketplace.detail.pricing'), children: <PricingPanel listing={listing} selectedPlanId={selectedPlanId} onSelectPlan={setSelectedPlanId} /> }
    ];
  }, [listing, selectedPlanId, t]);

  if (loading) {
    return (
      <div className="flex flex-col gap-8 p-4">
        <Skeleton active title={{ width: '30%' }} />
        <Row gutter={24}>
           <Col lg={16} xs={24}><Skeleton.Button active block className="!h-[400px] rounded-card" /></Col>
           <Col lg={8} xs={24}><Skeleton active paragraph={{ rows: 6 }} /></Col>
        </Row>
      </div>
    );
  }

  if (error || !listing) return <div className="p-20 text-center"><AlertCircle size={48} className="mx-auto mb-4 opacity-20" /><Button onClick={fetchData}>{t('common.retry')}</Button></div>;

  const RightSidebar = (
    <div className="flex flex-col gap-6">
      <VFCard className="border-border shadow-none">
         <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              {/* V1.4: Sub Section Header = T6 Caption Strong */}
              <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-wider">
                {listing.purchased ? t('marketplace.purchase.status.ready') : t('marketplace.search.selection')}
              </VFText>
              
              {listing.purchased ? (
                <div className="flex items-center gap-2 text-success mt-1">
                  <CheckCircle2 size={20} />
                  <VFText variant="t4" color="inherit" className="uppercase tracking-tight">
                    {t('marketplace.purchase.status.active')}
                  </VFText>
                </div>
              ) : (
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-baseline gap-2">
                     {/* V1.4: Price = T1 Display */}
                     <VFText variant="t1" color="primary" tabularNums>
                       {activePlan ? (activePlan.price === 0 ? t('common.free') : `$${activePlan.price.toFixed(2)}`) : '---'}
                     </VFText>
                     {activePlan && activePlan.price > 0 && (
                       <VFText variant="t6" color="tertiary" className="font-bold opacity-60">/ {activePlan.interval}</VFText>
                     )}
                  </div>
                  {activePlan && (
                    <VFText variant="t6" color="brand" className="font-bold">{activePlan.name}</VFText>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2.5">
              <Button 
                type="primary" 
                block 
                size="large"
                icon={listing.purchased ? <Zap size={18} /> : (activePlan && activePlan.price > 0 ? <ShoppingCart size={18} /> : undefined)}
                className={`${isMobile ? 'h-[44px]' : 'h-12'} font-bold rounded-control`}
                onClick={handleAction}
              >
                {listing.purchased 
                  ? t('marketplace.detail.cta.openStudio') 
                  : (activePlan?.price === 0 ? t('marketplace.detail.cta.getFree') : t('marketplace.detail.cta.buyNow'))}
              </Button>
              
              {listing.purchased && (
                <Button 
                  block 
                  size="large"
                  icon={<ArrowUpRight size={18} />}
                  className={`${isMobile ? 'h-[44px]' : 'h-11'} font-bold rounded-control border-border`}
                  onClick={() => onNavigate('sh-devices')}
                >
                  {t('marketplace.detail.cta.deploy')}
                </Button>
              )}

              {!listing.purchased && listing.entitlements?.can_cloud_test && (
                 <Button 
                   block 
                   size="large"
                   icon={<Play size={16} />}
                   className={`${isMobile ? 'h-[44px]' : 'h-11'} font-bold rounded-control border-brand text-brand hover:bg-brand/5`}
                   onClick={() => setTestModalOpen(true)}
                 >
                   {t('marketplace.detail.cta.cloudTest')}
                 </Button>
              )}
            </div>

            <div className="pt-5 border-t border-divider flex flex-col gap-3">
               <div className="flex items-center justify-between">
                  <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-tight">{t('marketplace.installs')}</VFText>
                  <VFText variant="t6" color="primary" tabularNums className="font-bold">{listing.installCount?.toLocaleString()}</VFText>
               </div>
               <div className="flex items-center justify-between">
                  <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-tight">{t('marketplace.rating')}</VFText>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 size={14} className="text-success" />
                    <VFText variant="t6" color="primary" tabularNums className="font-bold">{(listing.rating || 0).toFixed(1)}</VFText>
                  </div>
               </div>
            </div>
         </div>
      </VFCard>

      <VFCard title={t('marketplace.detail.sections.details')} className="border-border shadow-none">
         <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              {/* V1.4: Detail Row Label = T6 Strong */}
              <VFText variant="t6" color="tertiary" className="flex items-center gap-2 font-bold uppercase tracking-tight">
                <User size={14} /> {t('marketplace.detail.author')}
              </VFText>
              <VFText variant="t6" color="primary" className="font-bold">{listing.author.name}</VFText>
            </div>
            <div className="flex items-center justify-between">
              <VFText variant="t6" color="tertiary" className="flex items-center gap-2 font-bold uppercase tracking-tight">
                <Layout size={14} /> {t('marketplace.detail.category')}
              </VFText>
              <VFTag variant="neutral" className="scale-90 origin-right font-bold">{t(`marketplace.type.${listing.type.toLowerCase()}` as any)}</VFTag>
            </div>
            <div className="flex items-center justify-between">
              <VFText variant="t6" color="tertiary" className="flex items-center gap-2 font-bold uppercase tracking-tight">
                <Calendar size={14} /> {t('marketplace.detail.published')}
              </VFText>
              <VFText variant="t6" color="secondary" className="font-bold">{dayjs('2025-11-20').format(t('common.dateFormat'))}</VFText>
            </div>
            <Divider className="m-0 opacity-40" />
            <div className="flex flex-col gap-3">
              <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-wider">{t('marketplace.detail.supportedDevices')}</VFText>
              <div className="flex flex-wrap gap-2">
                 {listing.supportedDevices.map(d => (
                   <VFTag key={d} variant="neutral" className="text-[10px] h-5 px-2 opacity-80" filled={false}>{d}</VFTag>
                 ))}
              </div>
            </div>
         </div>
      </VFCard>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-20 max-w-[1280px] mx-auto">
      <VFPageHeader 
        title={listing.name}
        onBack={() => onNavigate('marketplace')}
        actions={<FavoriteButton isFavorite={listing.isFavorite} onToggle={async () => {
          await marketplaceService.toggleFavorite(listingId);
          setListing(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
        }} />}
      />

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <div className="flex flex-col gap-6">
            <div className="aspect-video bg-bg-page rounded-card border border-border flex items-center justify-center text-text-tertiary/10">
               <ImageIcon size={isMobile ? 60 : 100} strokeWidth={1} />
            </div>

            {isMobile && <div className="mt-2">{RightSidebar}</div>}

            <VFCard noPadding className="border-border shadow-none overflow-hidden">
              <Tabs 
                defaultActiveKey="overview"
                className="vf-detail-tabs"
                tabBarStyle={{ padding: isMobile ? '0 16px' : '0 24px', borderBottom: '1px solid rgba(var(--vf-divider), 1)' }}
                items={tabItems}
              />
            </VFCard>
          </div>
        </Col>

        {!isMobile && <Col xs={0} lg={8}><div className="sticky top-6">{RightSidebar}</div></Col>}
      </Row>

      <AuthModal open={authModalOpen} onCancel={() => setAuthModalOpen(false)} />
      <CloudTestModal open={testModalOpen} onCancel={() => setTestModalOpen(false)} listing={listing} />

      <style>{`
        .vf-detail-tabs .ant-tabs-nav::before { border: none !important; }
        .vf-detail-tabs .ant-tabs-tab { padding: 14px 0 !important; margin-right: 32px !important; }
        .vf-detail-tabs .ant-tabs-tab-btn { font-weight: 600 !important; font-size: 14px !important; }
        .vf-detail-tabs .ant-tabs-ink-bar { height: 3px !important; border-radius: 3px 3px 0 0; }
        
        /* V1.4: 解决主内容贴边问题 */
        .vf-detail-tabs .ant-tabs-content-holder { 
          padding: 32px !important; 
        }
        @media (max-width: 767px) {
          .vf-detail-tabs .ant-tabs-content-holder { 
            padding: 20px !important; 
          }
        }
      `}</style>
    </div>
  );
};
