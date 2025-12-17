
import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { useChartTheme } from './chartTheme';
import { LoadingOutlined, InboxOutlined } from '@ant-design/icons';

interface VFChartProps {
  options: any;
  height?: number | string;
  loading?: boolean;
  empty?: boolean;
  className?: string;
}

export const VFChart: React.FC<VFChartProps> = ({ 
  options, 
  height = 300, 
  loading = false, 
  empty = false,
  className 
}) => {
  const chartRef = useRef<ReactECharts>(null);
  const themeConfig = useChartTheme();

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      chartRef.current?.getEchartsInstance().resize();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Merge dynamic theme into options if not explicitly overridden
  const finalOptions = themeConfig ? {
    ...themeConfig,
    ...options,
    // Deep merge sensitive parts if needed, but simple spread usually works for top-level
    grid: { ...themeConfig.grid, ...options.grid },
    tooltip: { ...themeConfig.tooltip, ...options.tooltip },
  } : options;

  if (loading) {
    return (
      <div className={`flex items-center justify-center w-full bg-bg-page/20 rounded-lg border border-dashed border-border`} style={{ height }}>
        <LoadingOutlined className="text-brand text-2xl" />
      </div>
    );
  }

  if (empty) {
    return (
      <div className={`flex flex-col items-center justify-center w-full bg-bg-page/20 rounded-lg border border-dashed border-border text-text-tertiary`} style={{ height }}>
        <InboxOutlined className="text-3xl mb-2 opacity-50" />
        <span className="text-sm">No data available</span>
      </div>
    );
  }

  return (
    <div className={className} style={{ height }}>
      {themeConfig && (
        <ReactECharts
          ref={chartRef}
          option={finalOptions}
          style={{ height: '100%', width: '100%' }}
          notMerge={true}
          lazyUpdate={true}
        />
      )}
    </div>
  );
};
