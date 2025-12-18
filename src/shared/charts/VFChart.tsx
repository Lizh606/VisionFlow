
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

const deepMerge = (target: any, source: any) => {
  if (!source) return target;
  const output = { ...target };
  Object.keys(source).forEach(key => {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      output[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      output[key] = source[key];
    }
  });
  return output;
};

export const VFChart: React.FC<VFChartProps> = ({ 
  options, 
  height = 300, 
  loading = false, 
  empty = false,
  className 
}) => {
  const chartRef = useRef<ReactECharts>(null);
  const themeConfig = useChartTheme();

  useEffect(() => {
    const handleResize = () => {
      chartRef.current?.getEchartsInstance().resize();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getFinalOptions = () => {
    if (!themeConfig) return options;

    let final = { ...themeConfig, ...options };

    const processAxis = (axis: any) => {
      if (!axis) return axis;
      const applyTemplate = (a: any) => {
        const type = a.type || 'category';
        const template = type === 'category' ? themeConfig.categoryAxis : themeConfig.valueAxis;
        return deepMerge(template, a);
      };

      if (Array.isArray(axis)) {
        return axis.map(applyTemplate);
      }
      return applyTemplate(axis);
    };

    final.xAxis = processAxis(options.xAxis || final.xAxis);
    final.yAxis = processAxis(options.yAxis || final.yAxis);
    
    final.grid = deepMerge(themeConfig.grid, options.grid || {});
    final.tooltip = deepMerge(themeConfig.tooltip, options.tooltip || {});
    // 显式合并 Legend
    final.legend = deepMerge(themeConfig.legend, options.legend || {});

    return final;
  };

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
          option={getFinalOptions()}
          style={{ height: '100%', width: '100%' }}
          notMerge={true}
          lazyUpdate={true}
        />
      )}
    </div>
  );
};
