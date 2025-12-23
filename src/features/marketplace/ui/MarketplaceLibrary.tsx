
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from 'lucide-react';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { VFEmptyState } from '../../../shared/ui/VFEmptyState';
import { VFTable } from '../../../shared/ui/VFTable';

export const MarketplaceLibrary: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <VFPageHeader 
        title={t('marketplace.library.title')}
        description={t('marketplace.library.description')}
        onBack={() => onNavigate('marketplace')}
      />

      <div className="min-h-[400px]">
        <VFTable 
          columns={[
            { title: 'Asset Name', dataIndex: 'name', key: 'name' },
            { title: 'Type', dataIndex: 'type', key: 'type' },
            { title: 'Purchase Date', dataIndex: 'date', key: 'date' },
            { title: 'Status', dataIndex: 'status', key: 'status' },
          ]}
          dataSource={[]}
          rowKey="id"
          locale={{ emptyText: <VFEmptyState 
            icon={<Box size={24} />}
            title="Your library is empty" 
            description="Explore the marketplace to find tools for your project."
            actionLabel="Go to Marketplace"
            onAction={() => onNavigate('marketplace')}
          /> }}
        />
      </div>
    </div>
  );
};
