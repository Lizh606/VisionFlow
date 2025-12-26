
import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Tabs, Button, Skeleton, Alert, Tooltip, App, Divider } from 'antd';
import { 
  Eye, User, Calendar, Zap, AlertCircle, ShoppingCart, Layout,
  Play, ArrowUpRight, Image as ImageIcon, Lock, Info, RefreshCw
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { VFCard } from '../../../shared/ui/VFCard';
import { VFTag } from '../../../shared/ui/VFTag';
import { VFEmptyState } from '../../../shared/ui/VFEmptyState';
import { sellerService } from '../services/sellerService';
import { Listing } from '../types';
import { CloudTestModal } from './components/CloudTestModal';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import { VFText } from '../../../ui/VFText';

// Tab Panels
import { OverviewPanel } from './tabs/OverviewPanel';
import { ExamplesPanel } from './tabs/ExamplesPanel';
import { DocsPanel } from './tabs/DocsPanel';
import { PricingPanel } from './tabs/PricingPanel';

export const MarketplaceListingPreview: React.FC<{ listingId: string; onNavigate: (p: string) => void }> = ({ listingId, onNavigate }) => {
  const { t } = useTranslation();
  const { isMobile, isDesktop } = useResponsive();
  
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [testModalOpen, setTestModalOpen] = useState(false);

  const fetchListing = () => {
    setLoading(true);
    sellerService.getListing(listingId).then(data => {
      if (data) {
        setListing(data);
        if (data.plans?.length) setSelectedPlanId(data.plans[0].id);
      } else {
        setListing(null);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchListing();
  }, [listingId]);

  const activePlan = useMemo(() => 
    listing?.plans?.find(p => p.id === selectedPlanId) || null
  , [listing, selectedPlanId]);

  const bannerConfig = useMemo(() => {
    if (!listing) return null;
    if (listing.status === 'PUBLISHED') return { type: 'info' as const, message: t('marketplace.seller.preview.bannerPublished'), icon: <Info size={18} /> };
    if (listing.status === 'SUSPENDED') return { type: 'error' as const, message: t('marketplace.seller.preview.bannerSuspended'), icon: <AlertCircle size={18} /> };
    return { type: 'warning' as const, message: t('marketplace.seller.preview.bannerDraft'), icon: <Eye size={18} /> };
  }, [listing, t]);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500">
        <Skeleton active title={{ width: '30%' }} paragraph={{ rows: 1 }} />
        <Row gutter={24}>
           <Col xl={16} xs={24}><Skeleton.Button active block className="!h-[400px] rounded-card" /></Col>
           <Col xl={8} xs={24}><Skeleton active paragraph={{ rows: 6 }} /></Col>
        </Row>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="flex flex-col gap-6 w-full py-12">
        <VFPageHeader title="Preview Unavailable" onBack={() => onNavigate('marketplace-seller')} />
        <div className="bg-bg-card border border-border rounded-card p-20 shadow-none">
          <VFEmptyState 
            title="Resource Not Found"
            description="The requested listing ID could not be found in your local database. It may have been deleted or the session expired."
            actionLabel="Return to My Listings"
            onAction={() => onNavigate('marketplace-seller')}
            icon={<AlertCircle size={24} className="text-text-tertiary" />}
          />
        </div>
      </div>
    );
  }

  const RightSidebar = (
    <div className="flex flex-col gap-6">
      <VFCard className="border-border shadow-none bg-bg-card">
         <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-wider">
                Current Selection
              </VFText>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-baseline gap-2">
                   <VFText variant="t1" color="primary" tabularNums>
                     {activePlan ? (activePlan.price === 0 ? t('common.free') : `$${activePlan.price.toFixed(2)}`) : '---'}
                   </VFText>
                   {activePlan && activePlan.price > 0 && <VFText variant="t6" color="tertiary" className="font-bold opacity-60">/ {activePlan.interval}</VFText>}
                </div>
                {activePlan && <VFText variant="t6" color="brand" className="font-bold">{activePlan.name}</VFText>}
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <Tooltip title={t('marketplace.seller.preview.ctaDisabled')}>
                <Button 
                  type="primary" 
                  block 
                  size="large"
                  disabled
                  icon={activePlan && activePlan.price > 0 ? <ShoppingCart size={18} /> : undefined}
                  className="h-12 font-bold rounded-control grayscale opacity-70"
                >
                  {activePlan?.price === 0 ? t('marketplace.detail.cta.getFree') : t('marketplace.detail.cta.buyNow')}
                </Button>
              </Tooltip>
              
              <Button 
                block 
                size="large"
                icon={<Play size={16} />}
                className="h-11 font-bold rounded-control border-brand text-brand hover:bg-brand/5"
                onClick={() => setTestModalOpen(true)}
              >
                {t('marketplace.detail.cta.cloudTest')}
              </Button>
            </div>

            <div className="pt-5 border-t border-divider flex flex-col gap-3">
               <div className="flex items-center justify-between">
                  <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-tight">Total Installs</VFText>
                  <VFText variant="t6" color="primary" tabularNums className="font-bold">---</VFText>
               </div>
               <div className="flex items-center justify-between">
                  <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-tight">Trust Rating</VFText>
                  <div className="flex items-center gap-1">
                    <VFText variant="t6" color="disabled" tabularNums className="font-bold">N/A</VFText>
                  </div>
               </div>
            </div>
         </div>
      </VFCard>

      <VFCard title="Resource Details" className="border-border shadow-none">
         <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <VFText variant="t6" color="tertiary" className="flex items-center gap-2 font-bold uppercase tracking-tight"><User size={14} /> Developer</VFText>
              <VFText variant="t6" color="primary" className="font-bold">{listing.author.name}</VFText>
            </div>
            <div className="flex items-center justify-between">
              <VFText variant="t6" color="tertiary" className="flex items-center gap-2 font-bold uppercase tracking-tight"><Layout size={14} /> Category</VFText>
              <VFTag variant="neutral" className="scale-90 origin-right shrink-0 font-bold border-divider/50">{listing.type}</VFTag>
            </div>
            <div className="flex items-center justify-between">
              <VFText variant="t6" color="tertiary" className="flex items-center gap-2 font-bold uppercase tracking-tight"><Calendar size={14} /> Published</VFText>
              <VFText variant="t6" color="secondary" className="font-bold">---</VFText>
            </div>
            
            <Divider className="m-0 opacity-40" />
            
            <div className="flex flex-col gap-3 mt-1">
              <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-wider">
                {t('marketplace.detail.supportedDevices')}
              </VFText>
              <div className="flex flex-wrap gap-2">
                 {(listing.supportedDevices || []).map(d => (
                    <VFTag key={d} variant="neutral" className="text-[10px] h-5 px-2 opacity-80 font-bold border-divider/50" filled={false}>{d}</VFTag>
                 ))}
              </div>
            </div>
         </div>
      </VFCard>

      <div className="px-4 py-3 bg-bg-page/50 border border-divider rounded-card flex gap-3">
         <Lock size={16} className="text-text-tertiary shrink-0 mt-0.5" />
         <VFText variant="t6" color="secondary" className="m-0 leading-relaxed font-medium">
           All data displayed here reflects current storefront metadata. Live synchronization with Studio assets is performed upon submission.
         </VFText>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-20 w-full">
      <VFPageHeader 
        title={listing.name}
        onBack={() => onNavigate('marketplace-seller')}
        description="Storefront Listing Preview"
      />

      {bannerConfig && (
        <Alert 
          message={<span className="font-bold text-sm">{bannerConfig.message}</span>}
          type={bannerConfig.type}
          showIcon
          icon={bannerConfig.icon}
          className="rounded-card border-none shadow-sm"
        />
      )}

      <Row gutter={[24, 24]}>
        <Col xs={24} xl={16}>
          <div className="flex flex-col gap-6">
            <div className="aspect-video bg-bg-page rounded-card border border-border overflow-hidden relative group shadow-sm flex flex-col items-center justify-center text-text-tertiary/10">
               <ImageIcon size={isMobile ? 60 : 100} strokeWidth={1} />
               <div className="absolute inset-0 bg-brand/[0.02]" />
               <span className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] opacity-40">Resource Preview Placeholder</span>
            </div>

            {/* V1.4 FIX: Tablet 模式 (!isDesktop) 下侧栏逻辑归位 */}
            {!isDesktop && <div className="mt-2">{RightSidebar}</div>}

            <VFCard noPadding className="border-border shadow-none overflow-hidden min-h-[400px]">
              <Tabs 
                defaultActiveKey="overview"
                className="vf-detail-tabs"
                tabBarStyle={{ padding: isMobile ? '0 16px' : '0 24px', margin: 0, borderBottom: '1px solid rgba(var(--vf-divider), var(--vf-divider-alpha))' }}
                items={[
                  { key: 'overview', label: t('marketplace.detail.overview'), children: <OverviewPanel listing={listing} /> },
                  { key: 'examples', label: t('marketplace.detail.examples'), children: <ExamplesPanel listing={listing} onUseInTest={() => setTestModalOpen(true)} /> },
                  { key: 'docs', label: t('marketplace.detail.docs'), children: <DocsPanel listing={listing} /> },
                  { key: 'pricing', label: t('marketplace.detail.pricing'), children: <PricingPanel listing={listing} selectedPlanId={selectedPlanId} onSelectPlan={setSelectedPlanId} /> }
                ]}
              />
            </VFCard>
          </div>
        </Col>

        {/* 仅在 Desktop 断点才显示悬浮侧边栏 */}
        {isDesktop && <Col xs={0} xl={8}><div className="sticky top-6">{RightSidebar}</div></Col>}
      </Row>

      <CloudTestModal open={testModalOpen} onCancel={() => setTestModalOpen(false)} listing={listing} />

      <style>{`
        .vf-detail-tabs .ant-tabs-nav::before { border: none !important; }
        .vf-detail-tabs .ant-tabs-tab { padding: 14px 0 !important; margin-right: 32px !important; }
        .vf-detail-tabs .ant-tabs-tab-btn { font-weight: 600 !important; font-size: 14px !important; }
        .vf-detail-tabs .ant-tabs-ink-bar { height: 3px !important; border-radius: 3px 3px 0 0; }
        
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
