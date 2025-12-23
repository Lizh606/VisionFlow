
import React from 'react';
import { Drawer, Button, Divider, Tooltip, Collapse } from 'antd';
import { 
  Package, CheckCircle2, XCircle, X,
  Zap, ArrowUpRight, Info, Loader2,
  ChevronDown, Activity, ShieldCheck
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Purchase } from '../../types';
import { VFTag } from '../../../../shared/ui/VFTag';
import { useResponsive } from '../../../../shared/hooks/useResponsive';
import { VFText } from '../../../../ui/VFText';
import dayjs from 'dayjs';

interface Props {
  purchase: Purchase | null;
  open: boolean;
  onClose: () => void;
}

const InfoRow = ({ label, value, tabular }: { label: string, value: React.ReactNode, tabular?: boolean }) => (
  <div className="flex items-baseline justify-between py-3 border-b border-divider/40 last:border-none min-h-[44px]">
    {/* V1.4: Label = T6 Caption */}
    <VFText variant="t6" color="secondary" className="shrink-0">{label}</VFText>
    <div className="text-right truncate ml-4 min-w-0">
      {/* V1.4: Value = T5 Strong */}
      <VFText variant="t5-strong" color="primary" tabularNums={tabular} truncate>
        {value}
      </VFText>
    </div>
  </div>
);

const CapabilityCard = ({ label, enabled, desc }: { label: string, enabled: boolean, desc: string }) => (
  <div className={`flex items-start gap-4 p-4 rounded-control border mb-3 transition-all ${enabled ? 'bg-transparent border-border' : 'bg-bg-page/40 border-divider opacity-60'}`}>
    <div className={`shrink-0 mt-0.5 ${enabled ? 'text-success' : 'text-text-tertiary'}`}>
      {enabled ? <CheckCircle2 size={16} strokeWidth={3} /> : <XCircle size={16} />}
    </div>
    <div className="flex flex-col gap-1 min-w-0">
      {/* V1.4: Title = T5 Strong */}
      <VFText variant="t5-strong" color={enabled ? 'primary' : 'tertiary'} className="leading-tight">
        {label}
      </VFText>
      {/* V1.4: Desc = T6 */}
      <VFText variant="t6" color="tertiary" className="leading-relaxed">
        {desc}
      </VFText>
    </div>
  </div>
);

export const EntitlementDrawer: React.FC<Props> = ({ purchase, open, onClose }) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();
  
  if (!purchase) return null;

  return (
    <Drawer
      title={
        <div className="flex items-center gap-3">
          <Package size={20} className="text-brand" strokeWidth={2.5} />
          {/* V1.4: Title = T2 (24px) */}
          <VFText variant="t2" color="primary" className="tracking-tight">
            {t('marketplace.entitlement.drawer.title')}
          </VFText>
        </div>
      }
      placement="right"
      width={isMobile ? '100%' : 520}
      onClose={onClose}
      open={open}
      closable={false}
      extra={<Button type="text" icon={<X size={20} />} onClick={onClose} className="rounded-full w-10 h-10 flex items-center justify-center" />}
      className="vf-drawer-standard"
      footer={
        <div className="flex items-center justify-end gap-3 px-2">
          <Button icon={<ArrowUpRight size={16} />} className="font-bold h-10 px-5 rounded-control">
            {t('marketplace.purchase.label.deploy')}
          </Button>
          <Button type="primary" icon={<Zap size={16} />} className="font-bold h-10 px-6 rounded-control shadow-md">
            {t('marketplace.detail.cta.openStudio')}
          </Button>
        </div>
      }
    >
      <div className={`flex flex-col gap-8 h-full ${isMobile ? 'p-5' : 'p-8'}`}>
        {/* 1. Identity */}
        <section className="flex flex-col gap-2">
           <div className="flex items-center gap-2">
              <VFTag variant="neutral" filled={false} className="font-bold text-[10px] h-5 opacity-60 uppercase">{purchase.type}</VFTag>
              <VFText variant="t6" color="tertiary">
                {t('marketplace.entitlement.drawer.purchasedAt', { date: dayjs(purchase.purchasedAt).format(t('common.dateFormat')) })}
              </VFText>
           </div>
           <VFText variant="t3" color="primary" className="leading-tight tracking-tight">
             {purchase.listingName}
           </VFText>
           <VFText variant="t5-strong" color="brand" className="uppercase tracking-wide">
             {purchase.planName || t('marketplace.purchase.label.fullAccess')}
           </VFText>
        </section>

        {/* 2. Access Section */}
        <section className="flex flex-col gap-4">
           {/* V1.4: Section Title = T4 */}
           <VFText variant="t4" color="secondary" className="flex items-center gap-2 font-bold">
             <Activity size={16} className="text-text-tertiary" /> {t('marketplace.entitlement.sections.access')}
           </VFText>
           <div className="bg-bg-page/20 rounded-card border border-border p-5 flex flex-col">
              <InfoRow label={t('marketplace.entitlement.labels.expiry')} value={purchase.expiryAt ? dayjs(purchase.expiryAt).format(t('common.dateFormat')) : t('marketplace.purchase.label.lifetime')} tabular />
              <InfoRow label={t('marketplace.entitlement.labels.quota')} value={purchase.entitlements.seats ? t('marketplace.entitlement.labels.activeStreams', { count: purchase.entitlements.seats }) : t('marketplace.entitlement.labels.unlimited')} tabular />
              <InfoRow label={t('marketplace.entitlement.labels.status')} value={
                <VFTag variant={purchase.status === 'READY' ? 'success' : 'warning'} filled className="h-5 px-2 font-bold uppercase text-[10px]">
                  {purchase.status}
                </VFTag>
              } />
           </div>
        </section>

        {/* 3. Capabilities */}
        <section className="flex flex-col gap-4">
           <VFText variant="t4" color="secondary" className="flex items-center gap-2 font-bold">
             <ShieldCheck size={16} className="text-text-tertiary" /> {t('marketplace.entitlement.sections.capabilities')}
           </VFText>
           <div className="flex flex-col">
              <CapabilityCard label={t('marketplace.entitlement.capabilities.commercial.title')} enabled={purchase.entitlements.can_use} desc={purchase.entitlements.can_use ? t('marketplace.entitlement.capabilities.commercial.enabled') : t('marketplace.entitlement.capabilities.commercial.disabled')} />
              <CapabilityCard label={t('marketplace.entitlement.capabilities.edge.title')} enabled={purchase.entitlements.can_self_host} desc={purchase.entitlements.can_self_host ? t('marketplace.entitlement.capabilities.edge.enabled') : t('marketplace.entitlement.capabilities.edge.disabled')} />
           </div>
        </section>
      </div>
    </Drawer>
  );
};
