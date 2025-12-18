
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Space, Segmented, Select, Tooltip, Alert } from 'antd';
import { Info } from 'lucide-react';
import { Device } from '../../../common/types';
import { VFCard } from '../../../../../shared/ui/VFCard';
import { VFChart } from '../../../../../shared/charts/VFChart';
import { VFTable } from '../../../../../shared/ui/VFTable';
import { TimeRangeFilter } from '../../../../../shared/ui/TimeRangeFilter';

export const DeviceUsageTab: React.FC<{ device: Device }> = ({ device }) => {
  const { t } = useTranslation();
  const [metric, setMetric] = useState<any>('img');
  const [dim, setDim] = useState('workflow');

  const chartOptions = {
    tooltip: { trigger: 'axis' },
    legend: { bottom: 0, icon: 'circle' },
    grid: { left: 40, right: 20, top: 20, bottom: 60 },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    yAxis: { type: 'value' },
    series: [
      { name: 'Workflow A', type: 'line', smooth: true, data: [120, 132, 101, 134, 90, 230, 210] },
      { name: 'Workflow B', type: 'line', smooth: true, data: [220, 182, 191, 234, 290, 330, 310] }
    ]
  };

  const detailData = [
    { id: 'w1', name: 'Crowd Analysis v2', calls: 12050, images: 12050, videos: 0, errors: 42, errorRate: '0.34%', mode: 'EDGE' },
    { id: 'w2', name: 'PPE Check v1.5', calls: 520, images: 0, videos: 120, errors: 12, errorRate: '2.3%', mode: 'CLOUD' },
  ];

  const columns = [
    { title: 'Workflow', dataIndex: 'name', key: 'name' },
    { title: t('selfhosted.usage.tableCols.calls'), dataIndex: 'calls', key: 'calls', sorter: true },
    { title: t('selfhosted.usage.metricImg'), dataIndex: 'images', key: 'images' },
    { title: t('selfhosted.usage.metricVid'), dataIndex: 'videos', key: 'videos' },
    { title: t('selfhosted.usage.tableCols.errors'), dataIndex: 'errors', key: 'errors' },
    { title: t('selfhosted.usage.tableCols.errorRate'), dataIndex: 'errorRate', key: 'errorRate' },
    { title: t('selfhosted.usage.mode'), dataIndex: 'mode', key: 'mode' },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Filters Area */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-bg-page/50 border border-border rounded-card">
        <Space size="large" wrap>
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] uppercase font-bold text-text-tertiary tracking-wider">{t('selfhosted.usage.dim')}</span>
            <Segmented 
              value={dim} 
              onChange={setDim}
              options={[
                { label: t('selfhosted.usage.dimWorkflow'), value: 'workflow' },
                { label: t('selfhosted.usage.dimStream'), value: 'stream' }
              ]} 
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] uppercase font-bold text-text-tertiary tracking-wider">{t('selfhosted.usage.metric')}</span>
            <Segmented 
              value={metric} 
              onChange={setMetric}
              options={[
                { label: t('selfhosted.usage.metricImg'), value: 'img' },
                { label: t('selfhosted.usage.metricVid'), value: 'vid' }
              ]} 
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] uppercase font-bold text-text-tertiary tracking-wider">Date Range</span>
            <TimeRangeFilter />
          </div>
        </Space>
        
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] uppercase font-bold text-text-tertiary tracking-wider">Mode Filter</span>
          <Select defaultValue="ALL" className="w-32">
            <Select.Option value="ALL">ALL Modes</Select.Option>
            <Select.Option value="EDGE">EDGE Only</Select.Option>
            <Select.Option value="CLOUD">CLOUD Only</Select.Option>
          </Select>
        </div>
      </div>

      {/* Chart */}
      <VFCard>
         <div className="h-80">
           <VFChart options={chartOptions} height="100%" />
         </div>
      </VFCard>

      {/* Details Table */}
      <VFTable dataSource={detailData} columns={columns} rowKey="id" pagination={false} />

      {/* Footer Note */}
      <Alert 
        message={t('selfhosted.usage.footerNote')} 
        type="info" 
        showIcon 
        icon={<Info size={16} />}
        className="rounded-control"
      />
    </div>
  );
};
