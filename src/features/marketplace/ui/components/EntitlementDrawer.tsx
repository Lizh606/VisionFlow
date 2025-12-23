
import React from 'react';
import { Drawer, Button, Divider, Tooltip, Collapse, ConfigProvider } from 'antd';
import { 
  Package, CheckCircle2, XCircle, 
  ShieldCheck, HelpCircle, X,
  Zap, ArrowUpRight, Info, Loader2,
  ChevronDown, Activity
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Purchase } from '../../types';
import { VFTag } from '../../../../shared/ui/VFTag';
import { useResponsive } from '../../../../shared/hooks/useResponsive';
import dayjs from 'dayjs';

interface Props {
  purchase: Purchase | null;
  open: boolean;
  onClose: () => void;
}

const InfoRow = ({ label, value }: { label: string, value: React.ReactNode }) => (
  <div className="flex items-baseline justify-between py-3 border-b border-divider/40 last:border-none min-h-[44px]">
    <span className="text-[12px] font-normal text-text-secondary shrink-0">{label}</span>
    <div className="text-[14px] font-semibold text-text-primary text-right truncate ml-4">
      {value}
    </div>
  </div>
);

const CapabilityCard = ({ label, enabled, desc }: { label: string, enabled: boolean, desc: string }) => (
  <div className={`flex items-start gap-4 p-4 rounded-control border mb-3 transition-all ${enabled ? 'bg-transparent border-border' : 'bg-bg-page/40 border-divider opacity-60'}`}>
    <div className={`shrink-0 mt-0.5 ${enabled ? 'text-success' : 'text-text-tertiary'}`}>
      {enabled ? <CheckCircle2 size={16} strokeWidth={3} /> : <XCircle size={16} />}
    </div>
    <div className="flex flex-col gap-1 min-w-0">
      <span className={`text-[14px] font-semibold leading-tight ${enabled ? 'text-text-primary' : 'text-text-tertiary'}`}>
        {label}
      </span>
      <span className="text-[12px] font-normal text-text-tertiary leading-relaxed line-clamp-2">
        {desc}
      </span>
    </div>
  </div>
);

export const EntitlementDrawer: React.FC<Props> = ({ purchase, open, onClose }) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  
  if (!purchase) return null;

  const isReady = purchase.status === 'READY';
  const isPending = purchase.status === 'PENDING';
  const isExpired = purchase.status === 'EXPIRED';
  const isFailed = purchase.status === 'FAILED';

  const canStudio = isReady && purchase.entitlements.can_use;
  const canDeploy = isReady && purchase.entitlements.can_self_host;

  // Localized date string based on common.dateFormat token
  const formatStr = t('common.dateFormat');
  const purchasedDate = dayjs(purchase.purchasedAt).format(formatStr);
  const expiryDate = purchase.expiryAt ? dayjs(purchase.expiryAt).format(formatStr) : t('marketplace.purchase.label.lifetime');

  return (
    <Drawer
      title={
        <div className="flex items-center gap-3">
          <Package size={20} className="text-brand" strokeWidth={2.5} />
          <span className="font-semibold text-[20px] tracking-tight text-text-primary">
            {t('marketplace.entitlement.drawer.title')}
          </span>
        </div>
      }
      placement="right"
      width={isMobile ? '100%' : 520}
      onClose={onClose}
      open={open}
      closable={false}
      extra={
        <Button 
          type="text" 
          icon={<X size={20} />} 
          onClick={onClose} 
          className="hover:bg-action-hover rounded-full w-11 h-11 flex items-center justify-center transition-colors" 
        />
      }
      className="vf-drawer-standard"
      styles={{ 
        body: { padding: 0, backgroundColor: 'rgba(var(--vf-bg-card), 1)' },
        header: { padding: '16px 24px', borderBottom: '1px solid rgba(var(--vf-divider), var(--vf-divider-alpha))' },
        footer: { padding: '16px 24px', borderTop: '1px solid rgba(var(--vf-divider), 0.5)', backgroundColor: 'white' }
      }}
      footer={
        <div className="flex flex-col gap-6">
          <div className={`flex items-center justify-end gap-3 ${isMobile ? 'flex-col-reverse' : ''}`}>
            <Button 
              block={isMobile}
              disabled={!canDeploy}
              icon={<ArrowUpRight size={16} />}
              className="h-10 px-5 font-semibold rounded-control border-border text-text-secondary hover:text-brand transition-all"
              onClick={() => window.location.hash = '#/sh-devices'}
            >
              {t('marketplace.purchase.label.deploy')}
            </Button>

            <Button 
              block={isMobile}
              type="primary" 
              disabled={!canStudio}
              icon={<Zap size={16} />}
              className="h-10 px-6 font-semibold rounded-control shadow-md"
              onClick={() => window.location.hash = '#/workflows'}
            >
              {t('marketplace.detail.cta.openStudio')}
            </Button>
          </div>
          <div className="flex justify-center">
            <button className="text-text-secondary hover:text-text-primary font-medium text-[12px] h-auto p-0 flex items-center gap-1.5 transition-colors bg-transparent border-none cursor-pointer">
              <HelpCircle size={14} /> {t('marketplace.entitlement.drawer.support')}
            </button>
          </div>
        </div>
      }
    >
      <div className={`flex flex-col gap-8 overflow-y-auto custom-scrollbar h-full ${isMobile ? 'p-5' : 'p-8'}`}>
        
        {/* 1. Identity Block */}
        <section className="flex flex-col gap-2">
           <div className="flex items-center gap-2">
              <VFTag variant="neutral" filled={false} className="font-bold uppercase tracking-tight text-[10px] h-5 opacity-60">
                {purchase.type}
              </VFTag>
              <span className="text-[12px] font-normal text-text-secondary">
                {t('marketplace.entitlement.drawer.purchasedAt', { date: purchasedDate })}
              </span>
           </div>
           <Tooltip title={purchase.listingName}>
              <h3 className="m-0 text-[18px] font-semibold text-text-primary leading-[1.3] line-clamp-2 tracking-tight">
                {purchase.listingName}
              </h3>
           </Tooltip>
           <span className="text-[14px] font-semibold text-brand uppercase tracking-wide">
             {purchase.planName || t('marketplace.purchase.label.fullAccess')}
           </span>
        </section>

        {/* 2. Access & Quota */}
        <section className="flex flex-col gap-4">
           <h4 className="text-[14px] font-semibold text-text-secondary m-0 flex items-center gap-2">
             <Activity size={16} className="text-text-tertiary" /> {t('marketplace.entitlement.sections.access')}
           </h4>
           <div className="bg-transparent rounded-card border border-border p-5 flex flex-col shadow-none">
              <InfoRow 
                label={t('marketplace.entitlement.labels.expiry')} 
                value={expiryDate} 
              />
              <InfoRow 
                label={t('marketplace.entitlement.labels.quota')} 
                value={purchase.entitlements.seats ? t('marketplace.entitlement.labels.activeStreams', { count: purchase.entitlements.seats }) : t('marketplace.entitlement.labels.unlimited')} 
              />
              <InfoRow 
                label={t('marketplace.entitlement.labels.status')} 
                value={
                  isPending ? (
                    <div className="flex items-center gap-2 text-info">
                       <Loader2 size={12} className="animate-spin" />
                       <span className="uppercase text-[10px] font-bold tracking-tight">{t('marketplace.purchase.status.syncing')}</span>
                    </div>
                  ) : (
                    <VFTag variant={isReady ? 'success' : isExpired || isFailed ? 'error' : 'warning'} className="h-5 px-1.5 font-bold text-[10px] uppercase">
                      {t(`marketplace.purchase.status.${purchase.status.toLowerCase()}` as any)}
                    </VFTag>
                  )
                } 
              />
           </div>
        </section>

        {/* 3. Capabilities */}
        <section className="flex flex-col gap-4">
           <h4 className="text-[14px] font-semibold text-text-secondary m-0 flex items-center gap-2">
             <ShieldCheck size={16} className="text-text-tertiary" /> {t('marketplace.entitlement.sections.capabilities')}
           </h4>
           <div className="flex flex-col">
              <CapabilityCard 
                label={t('marketplace.entitlement.capabilities.commercial.title')} 
                enabled={purchase.entitlements.can_use} 
                desc={purchase.entitlements.can_use ? t('marketplace.entitlement.capabilities.commercial.enabled') : t('marketplace.entitlement.capabilities.commercial.disabled')}
              />
              <CapabilityCard 
                label={t('marketplace.entitlement.capabilities.cloud.title')} 
                enabled={purchase.entitlements.can_cloud_test} 
                desc={purchase.entitlements.can_cloud_test ? t('marketplace.entitlement.capabilities.cloud.enabled') : t('marketplace.entitlement.capabilities.cloud.disabled')}
              />
              <CapabilityCard 
                label={t('marketplace.entitlement.capabilities.edge.title')} 
                enabled={purchase.entitlements.can_self_host} 
                desc={purchase.entitlements.can_self_host ? t('marketplace.entitlement.capabilities.edge.enabled') : t('marketplace.entitlement.capabilities.edge.disabled')}
              />
           </div>
        </section>

        {/* 4. Details Collapsible */}
        <section className="mt-2">
           <Collapse 
             ghost 
             expandIcon={({ isActive }) => <ChevronDown size={14} className={`text-text-tertiary transition-transform ${isActive ? 'rotate-180' : ''}`} />}
             items={[{
                key: 'details',
                label: <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest">{t('marketplace.entitlement.sections.metadata')}</span>,
                children: (
                  <div className="bg-bg-page/30 rounded-card border border-divider/60 p-4 flex flex-col gap-0.5">
                    <InfoRow label={t('marketplace.entitlement.labels.id')} value={<span className="font-mono text-[11px] font-normal lowercase opacity-70">{purchase.id}</span>} />
                    <InfoRow label={t('marketplace.entitlement.labels.listingId')} value={<span className="font-mono text-[11px] font-normal lowercase opacity-70">{purchase.listingId}</span>} />
                    <InfoRow label={t('marketplace.entitlement.labels.billing')} value={<span className="font-normal">{t('marketplace.entitlement.labels.oneTime')}</span>} />
                  </div>
                )
             }]}
           />
        </section>
      </div>

      <style>{`
        .vf-drawer-standard .ant-drawer-content-holder { box-shadow: var(--vf-shadow-overlay) !important; }
        .vf-drawer-standard .ant-collapse-header { padding: 0 !important; }
        .vf-drawer-standard .ant-collapse-content-box { padding: 12px 0 0 0 !important; }
      `}</style>
    </Drawer>
  );
};
