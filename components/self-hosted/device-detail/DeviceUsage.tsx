
import React from 'react';
import { ThemeColors, ThemeMode } from '../../../types';
import { Cloud, Activity, ImageIcon, Video } from 'lucide-react';
import { TimeRangePicker, UsageChart } from './Shared';
import { MOCK_USAGE_DETAILS } from './mockData';

interface DeviceUsageProps {
    device: any;
    theme: ThemeColors;
    mode: ThemeMode;
    t: any;
    tCommon: any;
    detailTimeRange: string;
    setDetailTimeRange: (r: string) => void;
    detailModeFilter: string;
    setDetailModeFilter: (m: 'ALL' | 'EDGE' | 'CLOUD') => void;
    detailMetric: 'image' | 'video';
    setDetailMetric: (m: 'image' | 'video') => void;
    selectedUsageRow: string | null;
    setSelectedUsageRow: (id: string | null) => void;
}

export const DeviceUsage: React.FC<DeviceUsageProps> = ({
    device, theme, mode, t, tCommon,
    detailTimeRange, setDetailTimeRange,
    detailModeFilter, setDetailModeFilter,
    detailMetric, setDetailMetric,
    selectedUsageRow, setSelectedUsageRow
}) => {
    
    // Derived data for Table and Chart
    const tableUsageData = MOCK_USAGE_DETAILS.filter(d => detailModeFilter === 'ALL' || d.mode === detailModeFilter);

    // Derived data for Chart based on selection
    const filteredUsageData = tableUsageData
        .filter(d => selectedUsageRow === null || d.id === selectedUsageRow);

    // Generate mock X-Axis data based on time range
    const xAxisData = Array.from({ length: 20 }, (_, i) => `${i}:00`);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Top Filter Area */}
                <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 p-4 rounded-2xl border" style={{ background: theme.surface, borderColor: theme.stroke }}>
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Time Range */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider opacity-60" style={{ color: theme.textSecondary }}>{tCommon.timeRange.custom}</label>
                            <TimeRangePicker 
                            theme={theme} 
                            range={detailTimeRange} 
                            onChange={setDetailTimeRange}
                            labels={tCommon.timeRange}
                            />
                        </div>

                        <div className="h-8 w-px bg-gray-500/20 hidden xl:block" />

                        {/* Deployment Mode */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider opacity-60" style={{ color: theme.textSecondary }}>{t.usage.filters.mode}</label>
                            <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-lg border" style={{ borderColor: theme.stroke }}>
                                {['ALL', 'EDGE', 'CLOUD'].map(m => (
                                    <button 
                                    key={m}
                                    onClick={() => setDetailModeFilter(m as any)}
                                    className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${detailModeFilter === m ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-500' : 'opacity-60 hover:opacity-100 hover:bg-white/50'}`}
                                    style={{ color: detailModeFilter === m ? theme.primary : theme.text }}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Usage Content: Table (Left) + Chart (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Detail Table Area (Left Half) */}
                    <div className="rounded-2xl border p-0 flex flex-col overflow-hidden h-full" style={{ background: theme.surface, borderColor: theme.stroke }}>
                        <div className="p-4 border-b shrink-0" style={{ borderColor: theme.stroke }}>
                            <h3 className="font-bold text-sm" style={{ color: theme.text }}>Usage Details</h3>
                            <div className="text-[10px] opacity-60 mt-0.5" style={{ color: theme.textSecondary }}>Select a row to filter the chart</div>
                        </div>
                        <div className="overflow-x-auto flex-1 custom-scrollbar">
                            <table className="w-full text-left text-xs">
                                <thead className="font-bold uppercase tracking-wider sticky top-0 backdrop-blur-md" style={{ background: mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.8)', color: theme.textSecondary }}>
                                    <tr className="border-b" style={{ borderColor: theme.stroke }}>
                                        <th className="px-4 py-3">{t.usage.table.id}</th>
                                        <th className="px-4 py-3 text-right">{t.usage.table.images}</th>
                                        <th className="px-4 py-3 text-right">{t.usage.table.video}</th>
                                        <th className="px-4 py-3 text-right">{t.usage.table.calls}</th>
                                        <th className="px-4 py-3 text-right">{t.usage.table.errors}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {device.status === 'PENDING_LICENSE' ? (
                                    <tr><td colSpan={5} className="text-center py-8 opacity-50">Usage unavailable</td></tr>
                                    ) : tableUsageData.map((row, index) => {
                                        const isSelected = selectedUsageRow === row.id;
                                        return (
                                            <tr 
                                            key={row.id} 
                                            onClick={() => setSelectedUsageRow(isSelected ? null : row.id)}
                                            className={`cursor-pointer transition-all border-l-2 ${isSelected ? 'bg-blue-500/5 border-l-blue-500' : 'hover:bg-black/5 dark:hover:bg-white/5 border-l-transparent'}`}
                                            style={{ borderBottom: index === tableUsageData.length - 1 ? 'none' : `1px solid ${theme.stroke}` }}
                                            >
                                                <td className="px-4 py-3 font-medium" style={{ color: theme.text }}>
                                                    <div className="truncate w-32" title={row.name}>{row.name}</div>
                                                    <div className="opacity-50 text-[10px]">{row.id}</div>
                                                </td>
                                                <td className="px-4 py-3 text-right font-mono" style={{ color: theme.text }}>{(row.image_count).toLocaleString()}</td>
                                                <td className="px-4 py-3 text-right font-mono" style={{ color: theme.text }}>{(row.video_seconds).toLocaleString()}</td>
                                                <td className="px-4 py-3 text-right font-mono" style={{ color: theme.text }}>{(row.calls).toLocaleString()}</td>
                                                <td className="px-4 py-3 text-right font-mono text-red-500">{row.error_rate}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                {/* Usage Trend Chart (Right Half) */}
                <div className="rounded-2xl border p-5 flex flex-col h-full" style={{ background: theme.surface, borderColor: theme.stroke }}>
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="font-bold text-lg" style={{ color: theme.text }}>{tCommon.charts.usageTrend}</h3>
                                <div className="text-xs opacity-60 mt-1" style={{ color: theme.textSecondary }}>
                                Showing {detailMetric === 'image' ? 'Image Count' : 'Video Seconds'}
                                </div>
                            </div>
                            
                            {/* Metric Toggle */}
                            <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-lg border" style={{ borderColor: theme.stroke }}>
                                <button 
                                onClick={() => setDetailMetric('image')}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-colors ${detailMetric === 'image' ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-500' : 'opacity-60 hover:opacity-100'}`}
                                style={{ color: detailMetric === 'image' ? theme.primary : theme.text }}
                                >
                                    <ImageIcon size={14} />
                                    Images
                                </button>
                                <button 
                                onClick={() => setDetailMetric('video')}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-colors ${detailMetric === 'video' ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-500' : 'opacity-60 hover:opacity-100'}`}
                                style={{ color: detailMetric === 'video' ? theme.primary : theme.text }}
                                >
                                    <Video size={14} />
                                    Video
                                </button>
                            </div>
                        </div>
                        
                        {/* Chart Render */}
                        <div className="flex-1 w-full relative min-h-[250px]">
                            {device.status === 'PENDING_LICENSE' ? (
                                <div className="absolute inset-0 flex items-center justify-center opacity-30">No Data</div>
                            ) : (
                                <UsageChart 
                                    theme={theme}
                                    mode={mode}
                                    height={250}
                                    showLegend={true}
                                    xAxisData={xAxisData}
                                    series={filteredUsageData.map((item, i) => {
                                        const colors = [theme.node.blue, theme.node.purple, theme.node.green];
                                        // Mock random data generation consistent with chart type
                                        const dummyData = Array.from({length: 20}, (_, idx) => 
                                            Math.floor(Math.max(10, Math.sin(idx + i) * 50 + 50 + (Math.random() * 20)) * (detailMetric === 'image' ? 100 : 1))
                                        );
                                        return {
                                            name: item.name,
                                            color: colors[i % colors.length],
                                            data: dummyData
                                        };
                                    })} 
                                />
                            )}
                        </div>
                    </div>

                </div>
                
                {/* Footer Disclaimer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-3 rounded-xl border bg-purple-500/5 border-purple-500/20">
                        <Cloud size={16} className="text-purple-500 mt-0.5" />
                        <div>
                            <div className="text-xs font-bold text-purple-500 mb-0.5">CLOUD Billing</div>
                            <div className="text-xs opacity-70" style={{ color: theme.text }}>{t.usage.disclaimer.cloud}</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl border bg-green-500/5 border-green-500/20">
                        <Activity size={16} className="text-green-500 mt-0.5" />
                        <div>
                            <div className="text-xs font-bold text-green-500 mb-0.5">EDGE Monitoring</div>
                            <div className="text-xs opacity-70" style={{ color: theme.text }}>{t.usage.disclaimer.edge}</div>
                        </div>
                    </div>
                </div>
        </div>
    );
};
