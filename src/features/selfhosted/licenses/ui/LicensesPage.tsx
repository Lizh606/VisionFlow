
import React, { useMemo } from 'react';
import { Button, Dropdown } from 'antd';
import { RefreshCw, MoreVertical, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// Import the configured dayjs instance
import dayjs from '../../../../config/dayjsConfig';

// Shared
import { PageHeader } from '../../components/PageHeader';
import { VFTable } from '../../../../shared/ui/VFTable';
import { VFTag } from '../../../../shared/ui/VFTag';
import { VFEmptyState } from '../../../../shared/ui/VFEmptyState';
import { mockLicenses } from '../../common/mockData';
import { License } from '../../common/types';

export const LicensesPage: React.FC = () => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t('selfhosted.license.cols.name'),
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span className="font-semibold text-text-primary">{text}</span>
    },
    {
      title: t('selfhosted.license.cols.key'),
      dataIndex: 'license_key_masked',
      key: 'key',
      render: (text: string) => <span className="font-mono text-xs text-text-tertiary">{text}</span>
    },
    {
      title: t('selfhosted.license.cols.type'),
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
         <VFTag variant={type === 'CLOUD' ? 'brand' : 'info'}>{type}</VFTag>
      )
    },
    {
      title: t('selfhosted.license.cols.billing'),
      dataIndex: 'billing_mode',
      key: 'billing',
    },
    {
      title: t('selfhosted.license.cols.usage'),
      key: 'usage',
      render: (_: any, r: License) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium">
             {r.used_devices} / {r.total_quota}
          </span>
          {/* Simple Utilization Bar */}
          <div className="w-20 h-1 bg-bg-page rounded-full mt-1 overflow-hidden">
             <div 
               className="h-full bg-brand" 
               style={{ width: `${Math.min((r.used_devices/r.total_quota)*100, 100)}%` }} 
             />
          </div>
        </div>
      )
    },
    {
      title: t('selfhosted.license.cols.expiry'),
      dataIndex: 'expiry_date',
      key: 'expiry',
      render: (d: string) => {
        const daysLeft = dayjs(d).diff(dayjs(), 'day');
        const isLow = daysLeft < 30;
        return (
          <span className={isLow ? 'text-warning font-medium' : 'text-text-secondary'}>
            {dayjs(d).format('YYYY-MM-DD')}
            {isLow && <span className="text-xs ml-1">{t('selfhosted.license.daysLeft', { count: daysLeft })}</span>}
          </span>
        );
      }
    },
    {
      title: '',
      key: 'actions',
      render: () => (
        <Dropdown menu={{ items: [
          { key: '1', label: t('selfhosted.license.actions.viewUsage') }, 
          { key: '2', label: t('selfhosted.license.actions.extend') }
        ] }}>
          <Button type="text" size="small" icon={<MoreVertical size={16} />} />
        </Dropdown>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title={t('selfhosted.license.title')}
        breadcrumbs={[{ title: t('selfhosted.license.title') }]}
        actions={
          <div className="flex gap-3">
             <Button icon={<RefreshCw size={16} />}>{t('common.refresh')}</Button>
             <Button type="primary" icon={<Plus size={16} />}>{t('selfhosted.license.upload')}</Button>
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
