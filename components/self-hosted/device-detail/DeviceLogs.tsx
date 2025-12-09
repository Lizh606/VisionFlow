
import React from 'react';
import { ThemeColors } from '../../types';
import { ExternalLink } from 'lucide-react';
import { MOCK_LOGS } from './mockData';

interface DeviceLogsProps {
    theme: ThemeColors;
    t: any;
}

export const DeviceLogs: React.FC<DeviceLogsProps> = ({ theme, t }) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg" style={{ color: theme.text }}>{t.logs.recentEvents}</h3>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-xs font-bold" style={{ borderColor: theme.stroke, color: theme.text }}>
                        <ExternalLink size={14} />
                        {t.logs.viewObservability}
                    </button>
                </div>

                <div className="rounded-xl border overflow-hidden" style={{ borderColor: theme.stroke, background: theme.surface }}>
                    {MOCK_LOGS.map((log, i) => (
                        <div key={log.id} className="flex items-center gap-4 px-6 py-3 border-b last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors" style={{ borderColor: theme.stroke }}>
                            <span className="font-mono text-xs opacity-60 w-20" style={{ color: theme.text }}>{log.time}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded w-16 text-center ${log.type === 'WARN' ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                {log.type}
                            </span>
                            <span className="text-sm flex-1" style={{ color: theme.text }}>{log.msg}</span>
                        </div>
                    ))}
                </div>
        </div>
    );
};
