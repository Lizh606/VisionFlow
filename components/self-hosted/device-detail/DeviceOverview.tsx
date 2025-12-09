
import React from 'react';
import { ThemeColors } from '../../../types';
import { Card, TimeRangePicker, TrendChart } from './Shared';
import { BarChart2, Check } from 'lucide-react';
import { MOCK_STREAMS, MOCK_DEVICE_ALERTS } from './mockData';

interface DeviceOverviewProps {
    device: any;
    theme: ThemeColors;
    t: any;
    tCommon: any;
    setActiveTab: (tab: any) => void;
    usageTimeRange: string;
    setUsageTimeRange: (r: string) => void;
}

export const DeviceOverview: React.FC<DeviceOverviewProps> = ({
    device, theme, t, tCommon, setActiveTab, usageTimeRange, setUsageTimeRange
}) => {
    
    const AlertItem: React.FC<{ alert: any }> = ({ alert }) => {
        let bg = 'bg-blue-500/10';
        let text = 'text-blue-500';
        let border = 'border-blue-500/20';
        let label = 'INFO';

        if (alert.level === 'CRITICAL') {
            bg = 'bg-red-500/10';
            text = 'text-red-500';
            border = 'border-red-500/20';
            label = 'CRITICAL';
        } else if (alert.level === 'WARNING') {
            bg = 'bg-orange-500/10';
            text = 'text-orange-500';
            border = 'border-orange-500/20';
            label = 'WARNING';
        }

        return (
            <div className="w-full flex items-center gap-3 p-2.5 rounded-lg border transition-all hover:bg-black/5 dark:hover:bg-white/5 group" style={{ borderColor: theme.stroke }}>
                <div className={`px-2 py-0.5 rounded text-[9px] font-bold ${bg} ${text} shrink-0 min-w-[50px] text-center border ${border}`}>
                    {label}
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                <div className="flex justify-between items-start">
                    <span className="text-xs font-bold truncate" style={{ color: theme.text }}>{alert.msg}</span>
                    <span className="text-[10px] opacity-50 font-mono whitespace-nowrap ml-2" style={{ color: theme.textSecondary }}>{alert.time}</span>
                </div>
                </div>
            </div>
        )
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
                
                {/* 1. Usage Summary (Full Width, Compact) */}
                <Card 
                    title={t.overview.usageSummary} 
                    theme={theme}
                    action={
                        <TimeRangePicker 
                            theme={theme} 
                            range={usageTimeRange} 
                            onChange={setUsageTimeRange}
                            labels={tCommon.timeRange}
                        />
                    }
                    className="h-auto" 
                >
                    {device.status === 'PENDING_LICENSE' ? (
                    <div className="flex flex-col items-center justify-center py-12 opacity-50">
                        <BarChart2 size={32} className="mb-2" />
                        <span className="text-sm">Usage data unavailable for unbound device</span>
                    </div>
                    ) : (
                    <div className="flex flex-col gap-6">
                        {/* Stats Row */}
                        <div className="flex items-center gap-12 px-1">
                            <div className="flex items-center gap-4">
                                <div className="text-3xl font-bold font-mono" style={{ color: theme.text }}>
                                    {usageTimeRange === '24h' ? '14,240' : usageTimeRange === '7d' ? '98,520' : '420,100'}
                                </div>
                                <div className="text-xs font-bold uppercase opacity-60 flex items-center gap-2" style={{ color: theme.textSecondary }}>
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    {t.overview.imageCount}
                                </div>
                            </div>
                            <div className="h-8 w-px bg-gray-500/20" />
                            <div className="flex items-center gap-4">
                                <div className="text-3xl font-bold font-mono" style={{ color: theme.text }}>
                                    {usageTimeRange === '24h' ? '450' : usageTimeRange === '7d' ? '3,200' : '12,500'}
                                </div>
                                <div className="text-xs font-bold uppercase opacity-60 flex items-center gap-2" style={{ color: theme.textSecondary }}>
                                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                                    {t.overview.videoSeconds}
                                </div>
                            </div>
                        </div>
                        
                        {/* SVG Chart Container */}
                        <div className="w-full h-32 border-b border-l" style={{ borderColor: theme.stroke }}>
                            <TrendChart theme={theme} color1={theme.node.blue} color2={theme.node.purple} />
                        </div>
                    </div>
                    )}
                </Card>

                {/* 2. Grid for Config and Alerts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Config Summary (Left) */}
                <Card title={t.overview.configSummary} theme={theme} action={
                        <button onClick={() => setActiveTab('deployment')} className="text-[10px] font-bold text-blue-500 hover:underline">View Details</button>
                }>
                    {device.config ? (
                        <div className="space-y-3 mt-1">
                            {MOCK_STREAMS.slice(0, 3).map(stream => (
                                <div key={stream.id} className="flex items-center justify-between p-2.5 rounded-lg border transition-colors hover:bg-black/5 dark:hover:bg-white/5" style={{ borderColor: theme.stroke }}>
                                    <div className="flex items-center gap-3">
                                        {/* Active Dot - Always Green as requested "Active" */}
                                        <div className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] bg-green-500 text-green-500 animate-pulse" />
                                        <div>
                                            <div className="text-sm font-bold leading-none" style={{ color: theme.text }}>{stream.name}</div>
                                            <div className="text-[10px] opacity-60 font-mono mt-1" style={{ color: theme.textSecondary }}>{stream.workflowId}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-500/10 text-green-500">RUNNING</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-40 opacity-50">
                            <span className="text-xs">No active streams</span>
                        </div>
                    )}
                </Card>

                {/* Alerts List (Right) */}
                <Card title={tCommon.alerts.title} theme={theme}>
                        <div className="space-y-3 mt-1 h-full min-h-[160px]">
                            {device.status === 'PENDING_LICENSE' || !device.license ? (
                                <div className="flex flex-col items-center justify-center h-full py-8 opacity-40 text-center">
                                    <div className="p-2 rounded-full bg-black/5 dark:bg-white/5 mb-2">
                                        <Check size={16} />
                                    </div>
                                    <span className="text-xs font-medium">No active alerts</span>
                                    <span className="text-[10px]">Device is not fully active</span>
                                </div>
                            ) : (
                                MOCK_DEVICE_ALERTS.map((alert, i) => (
                                    <AlertItem key={i} alert={alert} />
                                ))
                            )}
                        </div>
                </Card>
                </div>
        </div>
    );
};
