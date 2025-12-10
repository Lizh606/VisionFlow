
import React, { useState, useRef, useEffect } from 'react';
import { ThemeColors, ThemeMode } from '../../../types';
import { Cpu, Cloud, ChevronDown, Check, Calendar } from 'lucide-react';
import * as echarts from 'echarts';

export const StatusTag = ({ status, tStatus }: { status: string, tStatus: any }) => {
    let styles = "bg-gray-500 text-white";
    let label = status;

    switch (status) {
      case 'ONLINE':
        styles = "bg-green-500 text-white shadow-sm shadow-green-500/20";
        label = tStatus.online;
        break;
      case 'OFFLINE':
        styles = "bg-red-500 text-white shadow-sm shadow-red-500/20";
        label = tStatus.offline;
        break;
      case 'PENDING_LICENSE':
        styles = "bg-orange-500 text-white shadow-sm shadow-orange-500/20";
        label = tStatus.pending;
        break;
      case 'DRAINING':
        styles = "bg-blue-500 text-white shadow-sm shadow-blue-500/20";
        label = tStatus.draining;
        break;
      case 'DECOMMISSIONED':
        styles = "bg-gray-500 text-white";
        label = tStatus.decommissioned;
        break;
    }

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide whitespace-nowrap ${styles}`}>
        {status === 'ONLINE' && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
        {label}
      </span>
    );
};

export const ModeSelector = ({ currentMode, onChange, theme }: { currentMode: string, onChange: (m: 'EDGE' | 'CLOUD') => void, theme: ThemeColors }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isEdge = currentMode === 'EDGE';
    const color = isEdge ? theme.node.green : theme.node.purple;
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div className="relative" ref={dropdownRef}>
          <button 
              onClick={() => setIsOpen(!isOpen)}
              className="px-2 py-0.5 rounded border text-[10px] font-bold flex items-center gap-1.5 transition-all hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 whitespace-nowrap"
              style={{ borderColor: color, color: color }}
          >
              {isEdge ? <Cpu size={10} /> : <Cloud size={10} />}
              {currentMode}
              <ChevronDown size={10} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isOpen && (
              <div 
                  className="absolute right-0 top-full mt-1 w-32 rounded-lg border shadow-xl overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-150"
                  style={{ background: theme.surface, borderColor: theme.stroke }}
              >
                  {['EDGE', 'CLOUD'].map((m) => {
                      const mIsEdge = m === 'EDGE';
                      const mColor = mIsEdge ? theme.node.green : theme.node.purple;
                      const isSelected = m === currentMode;
                      return (
                          <button
                              key={m}
                              onClick={() => {
                                  onChange(m as 'EDGE' | 'CLOUD');
                                  setIsOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 text-[10px] font-bold flex items-center gap-2 transition-colors ${isSelected ? 'bg-black/5 dark:bg-white/5' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                              style={{ color: isSelected ? mColor : theme.text }}
                          >
                              {mIsEdge ? <Cpu size={12} className={isSelected ? 'opacity-100' : 'opacity-50'} color={mColor} /> : <Cloud size={12} className={isSelected ? 'opacity-100' : 'opacity-50'} color={mColor} />}
                              <span>{m}</span>
                              {isSelected && <Check size={10} className="ml-auto opacity-50" />}
                          </button>
                      );
                  })}
              </div>
          )}
      </div>
    );
};

export const Card = ({ children, title, action, className = '', theme, noPadding = false, contentClassName = '' }: any) => (
    <div className={`rounded-2xl border flex flex-col h-full relative overflow-hidden group ${className}`} style={{ background: theme.surface, borderColor: theme.stroke }}>
        <div className={`flex justify-between items-center shrink-0 ${noPadding ? 'p-5 pb-2' : 'p-5 pb-4'}`}>
            <h3 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: theme.textSecondary }}>{title}</h3>
            {action}
        </div>
        <div className={`flex-1 ${noPadding ? '' : 'px-5 pb-5'} ${contentClassName}`}>{children}</div>
    </div>
);

export const CardFooter = ({ children, className = '', theme }: any) => (
    <div className={`mt-auto pt-3 border-t flex items-center h-10 ${className}`} style={{ borderColor: theme.stroke }}>
        {children}
    </div>
);

export const TimeRangePicker = ({ 
    theme, 
    range, 
    onChange, 
    labels 
}: { 
    theme: ThemeColors, 
    range: string, 
    onChange: (r: string) => void,
    labels: { last24h: string, last7d: string, last30d: string }
}) => {
    return (
        <div className="flex items-center bg-black/5 dark:bg-white/5 p-1 rounded-lg border" style={{ borderColor: theme.stroke }}>
             {['24h', '7d', '30d'].map((r) => (
                 <button
                    key={r}
                    onClick={() => onChange(r)}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        range === r 
                            ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-500' 
                            : 'opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                    style={{ color: range === r ? theme.primary : theme.text }}
                 >
                     {r === '24h' ? labels.last24h : r === '7d' ? labels.last7d : labels.last30d}
                 </button>
             ))}
             <div className="w-px h-4 bg-gray-500/20 mx-1" />
             <button
                className="px-2.5 py-1.5 rounded-md text-xs font-bold opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-1.5"
                style={{ color: theme.text }}
             >
                <Calendar size={12} />
             </button>
          </div>
    )
}

interface SeriesData {
    name: string;
    data: number[];
    color: string;
    area?: boolean;
    type?: 'line' | 'bar';
    yAxisIndex?: number;
}

interface UsageChartProps {
    theme: ThemeColors;
    mode: ThemeMode;
    series: SeriesData[];
    xAxisData: string[];
    height?: number | string;
    showLegend?: boolean;
    showYAxis?: boolean;
    showXAxis?: boolean;
}

export const UsageChart: React.FC<UsageChartProps> = ({ 
    theme, 
    mode, 
    series, 
    xAxisData, 
    height = 200, 
    showLegend = false,
    showYAxis = true,
    showXAxis = true
}) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<echarts.ECharts | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        if (!chartInstance.current) {
            chartInstance.current = echarts.init(chartRef.current, null, { renderer: 'svg' });
        }

        const hasSecondAxis = series.some(s => s.yAxisIndex === 1);

        const yAxisBase = {
            type: 'value' as const,
            show: showYAxis,
            splitLine: {
                show: true,
                lineStyle: {
                    color: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                }
            },
            axisLabel: {
                color: theme.textSecondary,
                fontSize: 10,
                formatter: (value: number) => {
                    if (value >= 1000) return (value / 1000).toFixed(0) + 'k';
                    return value.toString();
                }
            }
        };

        const option: echarts.EChartsOption = {
            backgroundColor: 'transparent',
            grid: {
                top: showLegend ? 30 : 10,
                right: hasSecondAxis ? 15 : 10,
                bottom: 10,
                left: 0,
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                // High contrast tooltip: Dark tooltip on light mode, Light tooltip on dark mode
                backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.95)' : 'rgba(20,20,20,0.9)',
                borderColor: 'transparent',
                textStyle: {
                    color: mode === 'dark' ? '#000' : '#fff',
                    fontSize: 12,
                    fontWeight: 500
                },
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: theme.primary,
                        type: 'dashed'
                    }
                },
                padding: [8, 12],
                borderRadius: 8,
                shadowBlur: 10,
                shadowColor: 'rgba(0,0,0,0.2)'
            },
            legend: {
                show: showLegend,
                top: 0,
                right: 0,
                icon: 'circle',
                textStyle: {
                    color: theme.textSecondary,
                    fontSize: 10
                },
                itemWidth: 8,
                itemHeight: 8
            },
            xAxis: {
                type: 'category',
                data: xAxisData,
                show: showXAxis,
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    color: theme.textSecondary,
                    fontSize: 10,
                    margin: 10,
                    interval: 'auto' // Let echarts decide interval to avoid clutter
                }
            },
            yAxis: hasSecondAxis ? [
                {
                    ...yAxisBase,
                    position: 'left' as const,
                },
                {
                    ...yAxisBase,
                    position: 'right' as const,
                    splitLine: { show: false }
                }
            ] : yAxisBase,
            series: series.map(s => ({
                name: s.name,
                type: s.type || 'line',
                yAxisIndex: s.yAxisIndex || 0,
                data: s.data,
                smooth: true,
                showSymbol: false,
                symbol: 'circle',
                symbolSize: 6,
                lineStyle: {
                    width: 2,
                    color: s.color
                },
                itemStyle: {
                    color: s.color,
                    borderRadius: s.type === 'bar' ? [3, 3, 0, 0] : 0
                },
                barWidth: s.type === 'bar' ? 12 : undefined,
                areaStyle: (s.area && (!s.type || s.type === 'line')) ? {
                    opacity: 0.15,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: s.color },
                        { offset: 1, color: 'rgba(0,0,0,0)' }
                    ])
                } : undefined
            }))
        };

        chartInstance.current.setOption(option);

        const handleResize = () => {
            chartInstance.current?.resize();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chartInstance.current?.dispose();
            chartInstance.current = null;
        };
    }, [theme, mode, series, xAxisData, height, showLegend, showXAxis, showYAxis]);

    return <div ref={chartRef} style={{ height, width: '100%' }} />;
};


interface StatusChartProps {
    theme: ThemeColors;
    mode: ThemeMode;
    data: { label: string, value: number, color: string }[];
    height?: number;
}

export const StatusChart: React.FC<StatusChartProps> = ({ 
    theme, 
    mode, 
    data,
    height = 200
}) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<echarts.ECharts | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        if (!chartInstance.current) {
            chartInstance.current = echarts.init(chartRef.current, null, { renderer: 'svg' });
        }

        const option: echarts.EChartsOption = {
            backgroundColor: 'transparent',
            grid: {
                top: 40,
                right: 25,
                bottom: 10,
                left: 10,
                containLabel: true
            },
            tooltip: {
                trigger: 'item',
                backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(20,20,20,0.8)',
                borderColor: 'transparent',
                textStyle: {
                    color: mode === 'dark' ? '#000' : '#fff',
                    fontSize: 12
                },
                padding: [8, 12],
                borderRadius: 8,
                formatter: (params: any) => {
                     const val = params.value;
                     const label = params.name;
                     const marker = params.marker;
                     return `${marker} <span style="font-weight:bold">${label}</span>: ${val}`;
                }
            },
            xAxis: {
                type: 'category',
                data: data.map(d => d.label),
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    color: theme.textSecondary,
                    fontSize: 11,
                    fontWeight: 500,
                    interval: 0,
                    margin: 10,
                    // width: 80, // Removed fixed width constraint
                    // overflow: 'break', // Removed break constraint
                    hideOverlap: true
                }
            },
            yAxis: {
                type: 'value',
                show: true,
                name: 'Count',
                nameTextStyle: {
                     color: theme.textSecondary,
                     fontSize: 10,
                     padding: [0, 0, 0, 0]
                },
                minInterval: 1,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    color: theme.textSecondary,
                    fontSize: 10
                }
            },
            series: [
                {
                    type: 'bar',
                    data: data.map(d => ({
                        value: d.value,
                        itemStyle: { 
                            color: d.color,
                            borderRadius: [6, 6, 0, 0]
                        }
                    })),
                    barWidth: '24px',
                    label: {
                        show: true,
                        position: 'top',
                        color: theme.text,
                        fontSize: 13,
                        fontWeight: 'bold',
                        formatter: '{c}',
                        distance: 5
                    },
                    showBackground: false,
                    animationDelay: (idx: number) => idx * 100
                }
            ]
        };

        chartInstance.current.setOption(option);

        const handleResize = () => {
            chartInstance.current?.resize();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chartInstance.current?.dispose();
            chartInstance.current = null;
        };
    }, [theme, mode, data, height]);

    return <div ref={chartRef} style={{ height, width: '100%' }} />;
};
