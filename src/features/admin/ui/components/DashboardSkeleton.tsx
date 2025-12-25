
import React from 'react';
import { Row, Col, Skeleton } from 'antd';

export const DashboardSkeleton: React.FC = () => (
  <Row gutter={[24, 24]}>
    {[1, 2, 3].map(i => (
      <Col xs={24} lg={8} key={i}>
        <div className="bg-bg-card p-6 rounded-card border border-divider h-[500px]">
          <Skeleton active title={{ width: '40%' }} paragraph={{ rows: 8 }} />
        </div>
      </Col>
    ))}
  </Row>
);
