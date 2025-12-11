
import React, { useRef, useEffect } from 'react';
import { ThemeColors, ThemeMode } from '../../../../types';
import * as echarts from 'echarts';

export interface SeriesData {
    name: string;
    data: number[];
    color: string;
    area?: boolean;
    type?: 'line' | 'bar';
    yAxisIndex?: number;
}

export interface UsageChartProps {
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
                right: hasSecondAxis ? 10 : 10,
                bottom: 10,
                left: 10,
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
