
import React from 'react';
import { Button, Dropdown } from 'antd';
import { RefreshCw, MoreVertical, Plus, Ticket, Calendar, ShieldCheck } from 'lucide-react';
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

export const LicensesPage: React.FC = () => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();

  const columns = [
    {
      title: t('selfhosted.license.cols.name'),
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (text: string) => <span className="font-bold text-text-primary">{text}</span>
    },
    {
      title: t('selfhosted.license.cols.key'),
      dataIndex: 'license_key_masked',
      key: 'key',
      width: '20%',
      render: (text: string) => <span className="font-mono text-xs text-text-tertiary bg-bg-page px-1.5 py-0.5 rounded border border-border/50">{text}</span>
    },
    {
      title: t('selfhosted.license.cols.type'),
      dataIndex: 'type',
      key: 'type',
      width: '12%',
      render: (type: string) => (
         <VFTag variant={type === 'CLOUD' ? 'brand' : 'info'} filled={false}>{type}</VFTag>
      )
    },
    {
      title: t('selfhosted.license.cols.billing'),
      dataIndex: 'billing_mode',
      key: 'billing',
      width: '12%',
      render: (text: string) => <span className="text-text-secondary text-sm">{text}</span>
    },
    {
      title: t('selfhosted.license.cols.usage'),
      key: 'usage',
      width: '15%',
      render: (_: any, r: License) => {
        const usagePct = (r.used_devices / r.total_quota) * 100;
        return (
          <div className="flex flex-col max-w-[120px]">
            <div className="flex justify-between items-end mb-1">
               <span className="text-xs font-bold text-text-primary">{r.used_devices} / {r.total_quota}</span>
               <span className="text-[10px] text-text-tertiary">{Math.round(usagePct)}%</span>
            </div>
            <div className="w-full h-1 bg-bg-page rounded-full overflow-hidden border border-border/20">
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
      width: '15%',
      render: (d: string) => {
        const daysLeft = dayjs(d).diff(dayjs(), 'day');
        const isLow = daysLeft < 30;
        return (
          <div className="flex flex-col">
            <span className={`text-sm ${isLow ? 'text-error font-bold' : 'text-text-secondary'}`}>
              {dayjs(d).format('YYYY-MM-DD')}
            </span>
            {isLow && <span className="text-[10px] text-error opacity-80 uppercase font-bold">{t('selfhosted.license.daysLeft', { count: daysLeft })}</span>}
          </div>
        );
      }
    },
    {
      title: '',
      key: 'actions',
      width: 60,
      render: () => (
        <Dropdown menu={{ items: [
          { key: '1', label: t('selfhosted.license.actions.viewUsage') }, 
          { key: '2', label: t('selfhosted.license.actions.extend') }
        ] }}>
          <Button type="text" size="small" icon={<MoreVertical size={16} />} className="text-text-tertiary hover:bg-action-hover rounded-control" />
        </Dropdown>
      )
    }
  ];

  if (isMobile) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader 
          title={t('selfhosted.license.title')}
          breadcrumbs={[]}
          actions={<Button type="primary" icon={<Plus size={16} />} onClick={() => {}} />}
        />
        <div className="flex flex-col gap-4">
          {mockLicenses.map(license => (
            <VFCard key={license.id} noPadding className="p-4 bg-bg-card border border-border shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-control bg-brand/5 border border-brand/10 flex items-center justify-center text-brand">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-text-primary text-[15px]">{license.name}</div>
                    <div className="text-[11px] font-mono text-text-tertiary">{license.license_key_masked}</div>
                  </div>
                </div>
                <VFTag variant={license.type === 'CLOUD' ? 'brand' : 'info'} filled={false} className="text-[10px] h-5">
                  {license.type}
                </VFTag>
              </div>
              
              <div className="grid grid-cols-2 gap-4 py-3 border-t border-divider/50">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-text-tertiary uppercase font-bold tracking-wider">{t('selfhosted.license.cols.usage')}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-text-primary">{license.used_devices} / {license.total_quota}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-text-tertiary uppercase font-bold tracking-wider">{t('selfhosted.license.cols.expiry')}</span>
                  <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                    <Calendar size={12} />
                    <span>{dayjs(license.expiry_date).format('YYYY-MM-DD')}</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-3 border-t border-divider/50 flex justify-end">
                <Button type="link" size="small" className="font-bold text-brand">{t('selfhosted.license.actions.viewUsage')}</Button>
              </div>
            </VFCard>
          ))}
          {mockLicenses.length === 0 && <VFEmptyState description={t('selfhosted.license.noData')} />}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title={t('selfhosted.license.title')}
        breadcrumbs={[{ title: t('selfhosted.license.title') }]}
        actions={
          <div className="flex gap-3">
             <Button icon={<RefreshCw size={16} />} className="rounded-control">{t('common.refresh')}</Button>
             <Button type="primary" icon={<Plus size={16} />} className="rounded-control font-bold">{t('selfhosted.license.upload')}</Button>
          </div>
        }
      />

      <VFTable 
        dataSource={mockLicenses}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        locale={{ 
          emptyText: <VFEmptyState 
             description={t('selfhosted.license.noData')}
             actionLabel={t('selfhosted.license.upload')}
             onAction={() => console.log('add')} 
          /> 
        }}
      />
    </div>
  );
};
