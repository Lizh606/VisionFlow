
import React, { useState } from 'react';
import { Modal, Radio, Space } from 'antd';
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

  const columns = [
    {
      title: '',
      key: 'select',
      width: 40,
      render: (_: any, record: License) => (
        <Radio checked={selectedId === record.id} />
      )
    },
    {
      title: 'License Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span className="font-medium text-text-primary">{text}</span>
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <VFTag>{type}</VFTag>
    },
    {
      title: 'Available',
      key: 'quota',
      render: (_: any, r: License) => (
        <span className="text-text-secondary">
          {r.total_quota - r.used_devices} / {r.total_quota} slots
        </span>
      )
    },
    {
      title: 'Expiry',
      dataIndex: 'expiry_date',
      key: 'expiry',
      render: (d: string) => dayjs(d).format('YYYY-MM-DD')
    }
  ];

  const handleOk = () => {
    const lic = mockLicenses.find(l => l.id === selectedId);
    if (lic) onSelect(lic);
  };

  return (
    <Modal
      title={t('selfhosted.license.selectTitle', { defaultValue: 'Select License' })}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      width={700}
      okButtonProps={{ disabled: !selectedId }}
    >
      <div className="py-4">
         <VFTable<License>
           dataSource={mockLicenses}
           columns={columns}
           rowKey="id"
           pagination={false}
           onRow={(record) => ({
             onClick: () => setSelectedId(record.id),
             style: { cursor: 'pointer' }
           })}
           scroll={{ y: 300 }}
         />
      </div>
      
      {/* Selected Summary */}
      {selectedId && (
        <div className="bg-bg-page p-3 rounded-md border border-border text-sm flex justify-between items-center">
          <Space>
             <span className="text-text-tertiary">Selected:</span>
             <span className="font-bold text-text-primary">
               {mockLicenses.find(l => l.id === selectedId)?.name}
             </span>
          </Space>
          <VFTag variant="brand">Ready to Bind</VFTag>
        </div>
      )}
    </Modal>
  );
};
