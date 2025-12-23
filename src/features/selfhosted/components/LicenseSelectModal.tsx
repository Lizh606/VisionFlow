
import React, { useState, useMemo } from 'react';
import { Modal, Radio, Space, Input } from 'antd';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFTable } from '../../../shared/ui/VFTable';
import { VFTag } from '../../../shared/ui/VFTag';
import { mockLicenses } from '../common/mockData';
import { License } from '../common/types';
import dayjs from 'dayjs';

interface Props {
  open: boolean;
  onCancel: () => void;
  onSelect: (license: License) => void;
  currentLicenseId?: string;
}

export const LicenseSelectModal: React.FC<Props> = ({ open, onCancel, onSelect, currentLicenseId }) => {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState<string | undefined>(currentLicenseId);
  const [searchText, setSearchText] = useState('');

  const filteredLicenses = useMemo(() => {
    return mockLicenses.filter(l => 
      l.name.toLowerCase().includes(searchText.toLowerCase()) ||
      l.license_key_masked.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const columns = [
    {
      title: '',
      key: 'select',
      width: 56,
      align: 'center' as const,
      render: (_: any, record: License) => (
        <Radio checked={selectedId === record.id} />
      )
    },
    {
      title: t('selfhosted.license.cols.name'),
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span className="font-bold text-text-primary text-sm">{text}</span>
    },
    {
      title: t('selfhosted.license.cols.type'),
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: string) => (
        <VFTag variant={type === 'CLOUD' ? 'brand' : 'info'} filled={false}>
          {type === 'SELF_HOSTED' ? t('selfhosted.mode.edge', { defaultValue: '边缘端' }) : t('selfhosted.mode.cloud', { defaultValue: '云端' })}
        </VFTag>
      )
    },
    {
      title: t('selfhosted.license.cols.usage'),
      key: 'quota',
      render: (_: any, r: License) => {
        const remaining = r.total_quota - r.used_devices;
        return (
          <span className={`text-sm ${remaining <= 0 ? 'text-error font-bold' : 'text-text-secondary font-medium'}`}>
            {t('selfhosted.license.quotaAvailable', { count: remaining, total: r.total_quota, defaultValue: '{{count}} / {{total}} 可用' })}
          </span>
        );
      }
    },
    {
      title: t('selfhosted.license.cols.expiry'),
      dataIndex: 'expiry_date',
      key: 'expiry',
      width: 120,
      render: (d: string) => <span className="text-sm text-text-tertiary tabular-nums font-medium">{dayjs(d).format('YYYY-MM-DD')}</span>
    }
  ];

  const handleOk = () => {
    const lic = mockLicenses.find(l => l.id === selectedId);
    if (lic) onSelect(lic);
  };

  return (
    <Modal
      title={t('selfhosted.license.selectTitle', { defaultValue: '选择授权证书' })}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      width={720}
      okText={t('common.confirm', { defaultValue: '确认' })}
      cancelText={t('common.cancel')}
      okButtonProps={{ disabled: !selectedId, className: 'h-10 px-8 font-bold' }}
      cancelButtonProps={{ className: 'h-10 px-6' }}
      className="vf-modal-custom"
      destroyOnClose
    >
      <div className="flex flex-col gap-5 py-2">
         <Input 
           prefix={<Search size={16} className="text-text-tertiary" />}
           placeholder={t('selfhosted.devices.searchPlaceholder')}
           value={searchText}
           onChange={e => setSearchText(e.target.value)}
           className="h-11 rounded-control text-sm bg-bg-page/40"
           allowClear
         />

         <VFTable<License>
           dataSource={filteredLicenses}
           columns={columns}
           rowKey="id"
           pagination={false}
           onRow={(record) => ({
             onClick: () => setSelectedId(record.id),
             className: `cursor-pointer transition-all ${selectedId === record.id ? 'bg-brand/[0.03]' : ''}`
           })}
           size="middle"
           className="!shadow-none !border-divider"
         />
      </div>
      
      {selectedId && (
        <div className="mt-4 bg-brand/5 p-4 rounded-card border border-brand/20 flex justify-between items-center animate-in slide-in-from-bottom-2 duration-300">
          <Space direction="vertical" size={0}>
             <span className="text-[10px] text-text-tertiary uppercase font-bold tracking-widest leading-none mb-1">
               {t('selfhosted.license.selectedLabel', { defaultValue: '已选择授权' })}
             </span>
             <span className="font-bold text-brand text-sm leading-tight">
               {mockLicenses.find(l => l.id === selectedId)?.name}
             </span>
          </Space>
          <VFTag variant="brand" filled className="h-5 text-[10px] font-bold">
            {t('common.ready', { defaultValue: '就绪' })}
          </VFTag>
        </div>
      )}

      <style>{`
        .vf-modal-custom .ant-modal-content {
          padding: 24px !important;
          border-radius: 12px !important;
        }
        .vf-modal-custom .ant-modal-header {
          margin-bottom: 20px !important;
          border: none !important;
        }
        .vf-modal-custom .ant-modal-title {
          font-size: 18px !important;
          font-weight: 700 !important;
          letter-spacing: -0.02em;
        }
        /* 移除干扰的全局 padding 覆盖 */
        .vf-modal-custom .ant-table-wrapper {
          border-radius: 8px !important;
        }
      `}</style>
    </Modal>
  );
};
