
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
            <Card title={t.header.deviceInfo} theme={theme} className="relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-16 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50" />
                
                <div className="flex flex-col h-full relative z-10">
                    {/* Header: Name & Mode */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                         <div className="min-w-0 flex-1">
                             <div className="font-bold text-xl leading-tight truncate tracking-tight" title={device.name} style={{ color: theme.text }}>
                                 {device.name}
                             </div>
                         </div>
                         <div className="shrink-0">
                             <ModeSelector currentMode={device.mode} onChange={handleModeChange} theme={theme} />
                         </div>
                    </div>

                    {/* IDs Grid */}
                    <div className="grid grid-cols-1 gap-2 mb-4">
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-transparent hover:border-blue-500/20 transition-all group/id">
                            <span className="text-[10px] font-bold uppercase tracking-wider opacity-50 w-16 shrink-0" style={{ color: theme.textSecondary }}>Device ID</span>
                            <code className="text-[11px] font-mono opacity-80 truncate flex-1 select-all" style={{ color: theme.text }}>{device.deviceId}</code>
                            <button className="opacity-0 group-hover/id:opacity-100 transition-opacity p-1 rounded hover:bg-black/10 dark:hover:bg-white/10" title="Copy">
                                <Copy size={12} style={{ color: theme.text }} />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-transparent hover:border-purple-500/20 transition-all group/id">
                             <span className="text-[10px] font-bold uppercase tracking-wider opacity-50 w-16 shrink-0" style={{ color: theme.textSecondary }}>Runtime</span>
                             <code className="text-[11px] font-mono opacity-80 truncate flex-1 select-all" style={{ color: theme.text }}>{device.runtimeId}</code>
                             <button className="opacity-0 group-hover/id:opacity-100 transition-opacity p-1 rounded hover:bg-black/10 dark:hover:bg-white/10" title="Copy">
                                <Copy size={12} style={{ color: theme.text }} />
                            </button>
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
                    <button onClick={() => setIsLicenseModalOpen(true)} className="text-[10px] font-bold text-blue-500 hover:bg-blue-500/10 px-2 py-1 rounded transition-colors">{t.header.changeLicense}</button>
                 )
            } theme={theme} className="relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-16 bg-purple-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50" />

                 {device.license ? (
                    <div className="flex flex-col h-full relative z-10">
                        {/* Body */}
                        <div className="space-y-6">
                             <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 shrink-0 shadow-sm">
                                    <FileKey size={24} />
                                </div>
                                <div className="min-w-0">
                                    <div className="font-bold text-base truncate" style={{ color: theme.text }}>{device.license.name}</div>
                                    <div className="text-[11px] opacity-60 font-mono" style={{ color: theme.textSecondary }}>Exp: {device.license.expiresAt}</div>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider opacity-80" style={{ color: theme.textSecondary }}>
                                    <span>Device Quota</span>
                                    <span>{device.license.quota.used} / {device.license.quota.total}</span>
                                </div>
                                <div className="h-2.5 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden p-[2px]">
                                    <div 
                                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-sm" 
                                        style={{ width: `${Math.min(100, (device.license.quota.used / device.license.quota.total) * 100)}%` }} 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer: Offline Lease */}
                        <CardFooter theme={theme}>
                            {device.license.offlineLease ? (
                                <div className="flex items-center gap-2 text-xs font-bold text-green-500">
                                    <div className="p-1 rounded-full bg-green-500/10 animate-pulse">
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
                     <div className="flex flex-col h-full relative z-10">
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                             <div className="p-3 mb-3 rounded-full bg-orange-500/10 text-orange-500 shadow-sm border border-orange-500/20">
                                <AlertCircle size={24} />
                            </div>
                            <p className="text-sm font-bold opacity-90 mb-4 max-w-[200px]" style={{ color: theme.text }}>
                                License Unbound
                            </p>
                            <button 
                                onClick={() => setIsLicenseModalOpen(true)}
                                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                            >
                                <Link size={14} />
                                Bind License
                            </button>
                        </div>
                         <CardFooter theme={theme}>
                            <span className="text-xs opacity-50 italic text-center w-full">Functionality Restricted</span>
                         </CardFooter>
                     </div>
                 )}
            </Card>

            {/* Config Info */}
            <Card title={t.header.configInfo} theme={theme} className="relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-16 bg-teal-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50" />
                 
                 {device.config ? (
                    <div className="flex flex-col h-full relative z-10">
                         <div className="space-y-6">
                             {/* Header */}
                             <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-teal-500/10 text-teal-500 shrink-0 shadow-sm">
                                    <Settings size={24} />
                                </div>
                                <div className="min-w-0">
                                    <div className="font-bold text-base truncate" style={{ color: theme.text }}>{device.config.version}</div>
                                    <div className="flex items-center gap-1.5 text-[10px] text-green-500 font-bold bg-green-500/10 px-1.5 py-0.5 rounded w-fit">
                                         <CheckCircle size={10} />
                                         <span>SYNCED</span>
                                    </div>
                                </div>
                             </div>

                             {/* Stream Progress Bar */}
                             <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider opacity-80" style={{ color: theme.textSecondary }}>
                                    <span>Active Streams</span>
                                    <span>{device.activeStreams} / {device.config.streamCount}</span>
                                </div>
                                <div className="h-2.5 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden p-[2px]">
                                    <div 
                                        className="h-full bg-gradient-to-r from-teal-400 to-blue-500 rounded-full shadow-sm" 
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
                    <div className="flex flex-col h-full relative z-10">
                        <div className="flex-1 flex flex-col items-center justify-center opacity-40">
                             <Settings size={32} className="mb-2" />
                             <span className="text-xs font-bold uppercase tracking-widest">No Config</span>
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
