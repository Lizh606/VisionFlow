
import React from 'react';
import { ThemeColors } from '../../../types';
import { Copy, FileKey, Activity, AlertCircle, Link, Settings, CheckCircle, Clock } from 'lucide-react';
import { Card, CardFooter, StatusTag, ModeSelector } from './Shared';

interface DeviceHeaderProps {
    device: any;
    theme: ThemeColors;
    t: any;
    tCommon: any;
    handleModeChange: (m: 'EDGE' | 'CLOUD') => void;
    setIsLicenseModalOpen: (open: boolean) => void;
}

export const DeviceHeader: React.FC<DeviceHeaderProps> = ({ 
    device, theme, t, tCommon, handleModeChange, setIsLicenseModalOpen 
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Device Info */}
            <Card title={t.header.deviceInfo} theme={theme}>
                <div className="flex flex-col h-full">
                    {/* Header: Name & Mode */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                         <div className="min-w-0 flex-1">
                             <div className="font-bold text-lg leading-tight truncate" title={device.name} style={{ color: theme.text }}>
                                 {device.name}
                             </div>
                         </div>
                         <div className="shrink-0">
                             <ModeSelector currentMode={device.mode} onChange={handleModeChange} theme={theme} />
                         </div>
                    </div>

                    {/* IDs Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="p-2.5 rounded-xl border flex flex-col gap-1 relative group transition-colors hover:border-blue-500/30" style={{ background: theme.surfaceHighlight, borderColor: theme.stroke }}>
                            <span className="text-[9px] font-bold uppercase tracking-wider opacity-50" style={{ color: theme.textSecondary }}>Device ID</span>
                            <div className="flex items-center justify-between">
                                <code className="text-[10px] font-mono opacity-90 truncate select-all" style={{ color: theme.text }}>{device.deviceId}</code>
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-black/10 dark:hover:bg-white/10" title="Copy">
                                    <Copy size={10} style={{ color: theme.text }} />
                                </button>
                            </div>
                        </div>
                        <div className="p-2.5 rounded-xl border flex flex-col gap-1 relative group transition-colors hover:border-purple-500/30" style={{ background: theme.surfaceHighlight, borderColor: theme.stroke }}>
                             <span className="text-[9px] font-bold uppercase tracking-wider opacity-50" style={{ color: theme.textSecondary }}>Runtime ID</span>
                             <div className="flex items-center justify-between">
                                <code className="text-[10px] font-mono opacity-90 truncate select-all" style={{ color: theme.text }}>{device.runtimeId}</code>
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-black/10 dark:hover:bg-white/10" title="Copy">
                                    <Copy size={10} style={{ color: theme.text }} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <CardFooter className="justify-between" theme={theme}>
                        <StatusTag status={device.status} tStatus={tCommon.status} />
                        <div className="flex items-center gap-1.5 text-xs font-medium opacity-60 whitespace-nowrap" style={{ color: theme.text }}>
                            <Clock size={12} />
                            <span>{device.lastSeen}</span>
                        </div>
                    </CardFooter>
                </div>
            </Card>

            {/* License Info */}
            <Card title={t.header.licenseInfo} action={
                 device.license && (
                    <button onClick={() => setIsLicenseModalOpen(true)} className="text-[10px] font-bold text-blue-500 hover:underline">{t.header.changeLicense}</button>
                 )
            } theme={theme}>
                 {device.license ? (
                    <div className="flex flex-col h-full">
                        {/* Body */}
                        <div className="space-y-5">
                             <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 shrink-0">
                                    <FileKey size={20} />
                                </div>
                                <div className="min-w-0">
                                    <div className="font-bold text-sm truncate" style={{ color: theme.text }}>{device.license.name}</div>
                                    <div className="text-[10px] opacity-60" style={{ color: theme.textSecondary }}>Expires: {device.license.expiresAt}</div>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-medium">
                                    <span style={{ color: theme.textSecondary }}>Device Quota</span>
                                    <span style={{ color: theme.text }}>{device.license.quota.used} / {device.license.quota.total}</span>
                                </div>
                                <div className="h-2 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-purple-500 rounded-full" 
                                        style={{ width: `${Math.min(100, (device.license.quota.used / device.license.quota.total) * 100)}%` }} 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer: Offline Lease */}
                        <CardFooter theme={theme}>
                            {device.license.offlineLease ? (
                                <div className="flex items-center gap-2 text-xs font-bold text-green-500">
                                    <div className="p-1 rounded-full bg-green-500/10">
                                        <Activity size={12} strokeWidth={2.5} />
                                    </div>
                                    <span>{t.header.offlineLease} Active</span>
                                </div>
                            ) : (
                                <div className="text-xs font-medium opacity-40 flex items-center gap-1.5">
                                    <span>{t.header.offlineLease} Inactive</span>
                                </div>
                            )}
                        </CardFooter>
                    </div>
                 ) : (
                     <div className="flex flex-col h-full">
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                             <div className="p-2 mb-2 rounded-full bg-orange-500/10 text-orange-500">
                                <AlertCircle size={20} />
                            </div>
                            <p className="text-xs font-medium opacity-70 mb-3 max-w-[200px]" style={{ color: theme.text }}>
                                No license bound.
                            </p>
                            <button 
                                onClick={() => setIsLicenseModalOpen(true)}
                                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
                            >
                                <Link size={12} />
                                Bind License
                            </button>
                        </div>
                         <CardFooter theme={theme}>
                            <span className="text-xs opacity-50 italic">Limited Functionality</span>
                         </CardFooter>
                     </div>
                 )}
            </Card>

            {/* Config Info */}
            <Card title={t.header.configInfo} theme={theme}>
                 {device.config ? (
                    <div className="flex flex-col h-full">
                         <div className="space-y-5">
                             {/* Header */}
                             <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 shrink-0">
                                    <Settings size={20} />
                                </div>
                                <div className="min-w-0">
                                    <div className="font-bold text-sm truncate" style={{ color: theme.text }}>{device.config.version}</div>
                                    <div className="flex items-center gap-1.5 text-[10px] text-green-500 font-bold">
                                         <CheckCircle size={10} />
                                         <span>SYNCED</span>
                                    </div>
                                </div>
                             </div>

                             {/* Stream Progress Bar */}
                             <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-medium">
                                    <span style={{ color: theme.textSecondary }}>Active Streams</span>
                                    <span style={{ color: theme.text }}>{device.activeStreams} / {device.config.streamCount}</span>
                                </div>
                                <div className="h-2 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-blue-500 rounded-full transition-all" 
                                        style={{ width: `${Math.min(100, (device.activeStreams / Math.max(1, device.config.streamCount)) * 100)}%` }} 
                                    />
                                </div>
                            </div>
                         </div>

                        {/* Footer: Audit */}
                        <CardFooter theme={theme}>
                            <div className="flex items-center gap-1.5 text-xs opacity-60 truncate" style={{ color: theme.textSecondary }}>
                                <Clock size={12} />
                                <span>{t.header.audit}: {device.config.lastAudit.split(' by ')[0]}</span>
                            </div>
                        </CardFooter>
                    </div>
                 ) : (
                    <div className="flex flex-col h-full">
                        <div className="flex-1 flex flex-col items-center justify-center opacity-60">
                             <Settings size={24} className="mb-2" />
                             <span className="text-xs font-medium">No config.</span>
                        </div>
                        <CardFooter theme={theme}>
                            <span className="text-xs opacity-50">-</span>
                        </CardFooter>
                    </div>
                 )}
            </Card>
        </div>
    );
};
