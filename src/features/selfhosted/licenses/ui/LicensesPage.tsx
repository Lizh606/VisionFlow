
import React from 'react';
import { Button, Dropdown, Tooltip } from 'antd';
import { RefreshCw, MoreVertical, Plus, Calendar, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import dayjs from '../../../../config/dayjsConfig';

// Shared
import { PageHeader } from '../../components/PageHeader';
import { VFTable } from '../../../../shared/ui/VFTable';
import { VFTag } from '../../../../shared/ui/VFTag';
import { VFCard } from '../../../../shared/ui/VFCard';
import { VFEmptyState } from '../../../../shared/ui/VFEmptyState';
import { mockLicenses } from '../../common/mockData';
import { License } from '../../common/types';
import { useResponsive } from '../../../../shared/hooks/useResponsive';
import { VFText } from '../../../../ui/VFText';

export const LicensesPage: React.FC = () => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();

  const columns = [
    {
      title: t('selfhosted.license.cols.name'),
      dataIndex: 'name',
      key: 'name',
      // Auto-adaptive width for Name
      render: (text: string) => (
        <span className="text-text-primary font-vf-semibold truncate block">
          {text}
        </span>
      )
    },
    {
      title: t('selfhosted.license.cols.key'),
      dataIndex: 'license_key_masked',
      key: 'key',
      width: 220,
      render: (text: string) => (
        <Tooltip title={text}>
          <span className="font-mono text-[11px] text-text-tertiary block truncate">
            {text}
          </span>
        </Tooltip>
      )
    },
    {
      title: t('selfhosted.license.cols.type'),
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: string) => (
         <VFTag variant={type === 'CLOUD' ? 'brand' : 'info'} filled={false}>{type}</VFTag>
      )
    },
    {
      title: t('selfhosted.license.cols.billing'),
      dataIndex: 'billing_mode',
      key: 'billing',
      width: 140,
      render: (text: string) => <span className="text-text-secondary text-sm font-medium">{text}</span>
    },
    {
      title: t('selfhosted.license.cols.usage'),
      key: 'usage',
      width: 180,
      render: (_: any, r: License) => {
        const usagePct = (r.used_devices / r.total_quota) * 100;
        return (
          <div className="flex flex-col max-w-[140px]">
            <div className="flex justify-between items-end mb-1.5">
               <span className="text-[11px] font-bold text-text-primary leading-none tabular-nums">
                 {r.used_devices} / {r.total_quota}
               </span>
               <span className="text-[10px] text-text-tertiary font-bold leading-none tabular-nums">
                 {Math.round(usagePct)}%
               </span>
            </div>
            <div className="w-full h-1 bg-bg-page rounded-full overflow-hidden border border-divider/50">
               <div 
                 className={`h-full transition-all duration-500 ${usagePct > 90 ? 'bg-error' : 'bg-brand'}`} 
                 style={{ width: `${Math.min(usagePct, 100)}%` }} 
               />
            </div>
          </div>
        );
      }
    },
    {
      title: t('selfhosted.license.cols.expiry'),
      dataIndex: 'expiry_date',
      key: 'expiry',
      width: 160,
      render: (d: string) => {
        const daysLeft = dayjs(d).diff(dayjs(), 'day');
        const isLow = daysLeft < 30;
        return (
          <div className="flex flex-col gap-0.5">
            <span className={`text-sm tabular-nums ${isLow ? 'text-error font-vf-semibold' : 'text-text-secondary font-medium'}`}>
              {dayjs(d).format('YYYY-MM-DD')}
            </span>
            {isLow && (
              <span className="text-[10px] text-error font-bold uppercase tracking-tight">
                {t('selfhosted.license.daysLeft', { count: daysLeft })}
              </span>
            )}
          </div>
        );
      }
    },
    {
      title: '',
      key: 'actions',
      width: 60,
      align: 'right' as const,
      render: () => (
        <Dropdown menu={{ items: [
          { key: '1', label: t('selfhosted.license.actions.viewUsage') }, 
          { key: '2', label: t('selfhosted.license.actions.extend') }
        ] }} placement="bottomRight">
          <Button type="text" size="small" icon={<MoreVertical size={16} />} className="text-text-tertiary" />
        </Dropdown>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-4 md:gap-6 pb-20 w-full animate-in fade-in duration-500">
      {/* V1.4 对齐菜单文案 */}
      <PageHeader 
        title={t('menu.license')}
        actions={
          <div className="flex gap-3">
             <Button icon={<RefreshCw size={16} />} className="h-10 rounded-control font-vf-medium">
               {t('common.refresh')}
             </Button>
             <Button type="primary" icon={<Plus size={16} />} className="h-10 rounded-control font-vf-semibold shadow-md">
               {t('selfhosted.license.upload')}
             </Button>
          </div>
        }
      />

      <div className="min-h-[400px]">
        {isMobile ? (
          <div className="flex flex-col gap-4">
            {mockLicenses.map(license => (
              <VFCard key={license.id} noPadding className="p-4 bg-bg-card border border-border shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-control bg-brand/5 border border-brand/10 flex items-center justify-center text-brand">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <div className="font-vf-semibold text-text-primary text-base leading-tight mb-1">{license.name}</div>
                      <div className="font-mono text-[11px] text-text-tertiary">{license.license_key_masked}</div>
                    </div>
                  </div>
                  <VFTag variant={license.type === 'CLOUD' ? 'brand' : 'info'} filled={false} className="text-[10px] h-5 px-1.5 font-bold">
                    {license.type}
                  </VFTag>
                </div>
                
                <div className="grid grid-cols-2 gap-4 py-3 border-t border-divider/50">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-text-tertiary uppercase font-bold tracking-wider">{t('selfhosted.license.cols.usage')}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-vf-semibold text-text-primary tabular-nums">{license.used_devices} / {license.total_quota}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-text-tertiary uppercase font-bold tracking-wider">{t('selfhosted.license.cols.expiry')}</span>
                    <div className="flex items-center gap-1.5 text-sm text-text-secondary font-medium tabular-nums">
                      <Calendar size={12} className="opacity-50" />
                      <span>{dayjs(license.expiry_date).format('YYYY-MM-DD')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-divider/50 flex justify-end">
                  <Button type="link" size="small" className="font-vf-semibold text-brand p-0 h-auto text-xs">{t('selfhosted.license.actions.viewUsage')}</Button>
                </div>
              </VFCard>
            ))}
          </div>
        ) : (
          <VFTable 
            dataSource={mockLicenses}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            locale={{ 
              emptyText: (
                <div className="py-12">
                  <VFEmptyState 
                    description={t('selfhosted.license.noData')}
                    actionLabel={t('selfhosted.license.upload')}
                    onAction={() => console.log('add')} 
                  /> 
                </div>
              )
            }}
          />
        )}
      </div>
    </div>
  );
};
