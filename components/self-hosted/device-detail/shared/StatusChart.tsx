
import React, { useRef, useEffect } from 'react';
import { ThemeColors, ThemeMode } from '../../../../types';
import * as echarts from 'echarts';

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
                    margin: 10,
                    formatter: function (value: string) {
                        if (value.length > 8) {
                            return value.substring(0, 8) + '...';
                        }
                        return value;
                    }
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
                        fontSize: 12,
                        fontWeight: 'bold',
                        formatter: '{c}',
                        distance: 5
                    },
                    showBackground: false,
                    animationDelay: (idx: number) => idx * 100
                }
            ]
        };
        console.log(option)
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
