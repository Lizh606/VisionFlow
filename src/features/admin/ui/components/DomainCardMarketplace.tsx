
import React from 'react';
import { CreditCard, Store, Receipt, ChevronRight, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFText } from '../../../../ui/VFText';
import { MarketplaceStats } from '../../types/dashboard';

export const DomainCardMarketplace: React.FC<{ data: MarketplaceStats; onDrillDown: () => void }> = ({ data, onDrillDown }) => {
  const { t } = useTranslation();

  const metrics = [
    { 
      label: t('admin.overview.metrics.refundFailures'), 
      val: data?.refundFailures || 0, 
      icon: CreditCard, 
      err: (data?.refundFailures || 0) > 0 
    },
    { 
      label: t('admin.overview.metrics.orderAnomalies'), 
      val: data?.orderAnomalies || 0, 
      icon: AlertCircle, 
      err: (data?.orderAnomalies || 0) > 0 
    },
    { 
      // V1.4 Fix: Correct i18n key to match locales and MarketplaceStats model
      label: t('admin.overview.metrics.settlementAnomalies'), 
      val: data?.settlementAnomalies || 0, 
      icon: Receipt, 
      err: (data?.settlementAnomalies || 0) > 0 
    }
  ];

  return (
    <VFCard 
      title={
        <div className="flex items-center gap-2 cursor-pointer group/title" onClick={onDrillDown}>
          <span>{t('admin.overview.domains.marketplace')}</span>
          <ChevronRight size={16} className="text-text-tertiary opacity-0 group-hover/title:opacity-100 transition-all -translate-x-1 group-hover/title:translate-x-0" />
        </div>
      } 
      className="h-full border-border hover:border-brand/30 transition-all duration-300"
      extra={
        <div onClick={onDrillDown} className="cursor-pointer hover:opacity-70 select-none">
          <VFText variant="t6" color="brand" className="font-bold tracking-tight">{t('admin.overview.viewAlerts')}</VFText>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {/* 核心指标：待审核 Listing */}
        <div 
          onClick={onDrillDown}
          className="flex items-center justify-between p-5 bg-brand/[0.03] border border-brand/10 rounded-card group/hero cursor-pointer hover:bg-brand/[0.06] transition-all"
        >
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-control bg-brand text-white flex items-center justify-center shadow-sm">
                <Store size={20} />
              </div>
              <div className="flex flex-col">
                <VFText variant="t5-strong" color="primary">{t('admin.overview.metrics.pendingListings')}</VFText>
              </div>
           </div>
           <div className="flex items-center gap-1">
             <VFText variant="t2" color="brand" tabularNums className="font-bold">{data?.pendingListings || 0}</VFText>
             <ChevronRight size={18} className="text-brand opacity-40 group-hover/hero:translate-x-0.5 transition-transform" />
           </div>
        </div>

        {/* 异常指标列表 */}
        <div className="grid grid-cols-1 gap-1">
           {metrics.map((item, i) => (
             <div 
               key={i} 
               onClick={onDrillDown}
               className="flex items-center justify-between py-2.5 border-b border-divider/40 last:border-none group/row cursor-pointer hover:bg-bg-page/60 transition-all px-2 -mx-2 rounded-md"
             >
                <div className="flex items-center gap-3">
                  <item.icon size={14} className={`text-text-tertiary group-hover/row:text-brand transition-colors ${item.err ? 'text-error opacity-70' : ''}`} />
                  <VFText variant="t5" color="secondary" className="group-hover/row:text-text-primary transition-colors font-medium">{item.label}</VFText>
                </div>
                <div className="flex items-center gap-2">
                  <VFText variant="t5-strong" color={item.err ? 'error' : 'primary'} tabularNums>{item.val}</VFText>
                  <ChevronRight size={12} className="text-text-tertiary opacity-0 group-hover/row:opacity-100 transition-all -translate-x-1 group-hover/row:translate-x-0" />
                </div>
             </div>
           ))}
        </div>
      </div>
    </VFCard>
  );
};
