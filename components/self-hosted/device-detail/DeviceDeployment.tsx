
import React from 'react';
import { ThemeColors, ThemeMode } from '../../types';
import { Server, Clock, Plus, Edit2, Pause, Play, Trash2 } from 'lucide-react';
import { MOCK_STREAMS } from './mockData';

interface DeviceDeploymentProps {
    device: any;
    theme: ThemeColors;
    mode: ThemeMode;
    t: any;
    tCommon: any;
    setIsHistoryOpen: (open: boolean) => void;
    setEditingStream: (stream: any) => void;
    setIsStreamDrawerOpen: (open: boolean) => void;
}

export const DeviceDeployment: React.FC<DeviceDeploymentProps> = ({
    device, theme, mode, t, tCommon, setIsHistoryOpen, setEditingStream, setIsStreamDrawerOpen
}) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Config Version Bar */}
                <div className="flex items-center justify-between p-4 rounded-xl border bg-gradient-to-r from-blue-500/5 to-transparent" style={{ borderColor: theme.stroke }}>
                    <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-blue-500 text-white shadow-lg shadow-blue-500/20">
                            <Server size={20} />
                        </div>
                        <div>
                            <div className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: theme.textSecondary }}>{t.deployment.currentVersion}</div>
                            <div className="text-xl font-bold" style={{ color: theme.text }}>{device.config?.version || 'N/A'}</div>
                        </div>
                        {device.config && <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-xs font-bold">Up to date</span>}
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setIsHistoryOpen(true)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-xs font-bold" style={{ color: theme.text }}>
                            <Clock size={14} />
                            {t.deployment.history}
                        </button>
                    </div>
                </div>

                {/* Streams Table Header */}
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg" style={{ color: theme.text }}>{t.deployment.streams}</h3>
                    <button onClick={() => { setEditingStream(null); setIsStreamDrawerOpen(true); }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-500/30 transition-all">
                        <Plus size={14} strokeWidth={3} />
                        {t.deployment.addStream}
                    </button>
                </div>

                {/* Streams Table */}
                <div className="rounded-xl border overflow-hidden" style={{ borderColor: theme.stroke, background: theme.surface }}>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-xs font-bold uppercase tracking-wider border-b" style={{ borderColor: theme.stroke, background: mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.02)' }}>
                                <th className="px-6 py-4" style={{ color: theme.textSecondary }}>{t.deployment.table.stream}</th>
                                <th className="px-6 py-4" style={{ color: theme.textSecondary }}>{t.deployment.table.input}</th>
                                <th className="px-6 py-4" style={{ color: theme.textSecondary }}>{t.deployment.table.workflow}</th>
                                <th className="px-6 py-4" style={{ color: theme.textSecondary }}>{t.deployment.table.status}</th>
                                <th className="px-6 py-4" style={{ color: theme.textSecondary }}>{t.deployment.table.telemetry}</th>
                                <th className="px-6 py-4" style={{ color: theme.textSecondary }}>{t.deployment.table.updated}</th>
                                <th className="px-6 py-4 text-right" style={{ color: theme.textSecondary }}>{tCommon.devices.table.actions}</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {device.config ? MOCK_STREAMS.map((s, i) => (
                                <tr key={s.id} className="group hover:bg-black/5 dark:hover:bg-white/5 transition-colors" style={{ borderBottom: i === MOCK_STREAMS.length - 1 ? 'none' : `1px solid ${theme.stroke}` }}>
                                    <td className="px-6 py-4 font-bold" style={{ color: theme.text }}>{s.name}</td>
                                    <td className="px-6 py-4 font-mono text-xs opacity-80" style={{ color: theme.text }}>{s.input}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium" style={{ color: theme.text }}>{s.workflowId}</span>
                                            <span className="text-xs opacity-60" style={{ color: theme.textSecondary }}>{s.workflowVer}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${s.status === 'RUNNING' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}`}>
                                            {s.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-mono opacity-60" style={{ color: theme.text }}>{s.telemetry}</td>
                                    <td className="px-6 py-4 text-xs opacity-60" style={{ color: theme.text }}>{s.updated}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                            onClick={() => { setEditingStream(s); setIsStreamDrawerOpen(true); }}
                                            className="p-1.5 rounded bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors" 
                                            title="Edit Stream"
                                            >
                                                <Edit2 size={14} />
                                            </button>
                                            <button 
                                            className="p-1.5 rounded bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors" 
                                            title={s.status === 'RUNNING' ? 'Pause Stream' : 'Enable Stream'}
                                            >
                                                {s.status === 'RUNNING' ? <Pause size={14} /> : <Play size={14} />}
                                            </button>
                                            <button 
                                            className="p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors" 
                                            title="Disable (Logical Delete)"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                            <tr>
                                <td colSpan={7} className="text-center py-10 opacity-50">
                                    No streams configured.
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
        </div>
    );
};
