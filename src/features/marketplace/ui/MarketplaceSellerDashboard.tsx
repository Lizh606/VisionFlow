
import React from 'react';
import { Button, Row, Col, Space } from 'antd';
import { Plus, BarChart3, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';
import { VFStatCard } from '../../../shared/ui/VFStatCard';
import { VFTable } from '../../../shared/ui/VFTable';
import { VFTag } from '../../../shared/ui/VFTag';

export const MarketplaceSellerDashboard: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <VFPageHeader 
        title={t('marketplace.seller.myListings')}
        onBack={() => onNavigate('marketplace')}
        actions={
          <Button 
            type="primary" 
            icon={<Plus size={16} />} 
            className="h-10 rounded-control font-bold"
          >
            {t('marketplace.seller.createListing')}
          </Button>
        }
      />

      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <VFStatCard title="Total Revenue" value="$1,240" trend="+8%" trendStatus="success" />
        </Col>
        <Col xs={24} md={8}>
          <VFStatCard title="Active Listings" value="5" footer="2 pending review" />
        </Col>
        <Col xs={24} md={8}>
          <VFStatCard title="Total Sales" value="156" trend="+24%" trendStatus="success" />
        </Col>
      </Row>

      <div className="bg-bg-card rounded-card border border-border overflow-hidden shadow-none">
        <div className="px-6 py-4 border-b border-divider flex items-center justify-between">
          <h3 className="text-base font-bold text-text-primary m-0">
            {t('marketplace.seller.myListings')}
          </h3>
          <Space>
            <Button size="small" icon={<BarChart3 size={14} />}>Analytics</Button>
            <Button size="small" icon={<Settings size={14} />}>Seller Settings</Button>
          </Space>
        </div>
        
        <VFTable 
          columns={[
            { title: 'Listing Name', dataIndex: 'name', key: 'name' },
            { 
              title: 'Status', 
              dataIndex: 'status', 
              key: 'status',
              render: (s: string) => <VFTag variant={s === 'PUBLISHED' ? 'success' : 'warning'}>{s}</VFTag>
            },
            { title: 'Type', dataIndex: 'type', key: 'type' },
            { title: 'Sales', dataIndex: 'sales', key: 'sales' },
            { title: 'Revenue', dataIndex: 'revenue', key: 'revenue' },
          ]}
          dataSource={[
            { id: '1', name: 'Traffic Counter Pro', status: 'PUBLISHED', type: 'WORKFLOW', sales: 42, revenue: '$2,100' },
            { id: '2', name: 'Mask Detector v2', status: 'DRAFT', type: 'MODEL', sales: 0, revenue: '$0' },
          ]}
          rowKey="id"
          pagination={false}
          className="!border-none !rounded-none"
        />
      </div>
    </div>
  );
};
