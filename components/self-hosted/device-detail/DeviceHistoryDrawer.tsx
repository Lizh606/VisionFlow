
import React from 'react';
import { ThemeColors, ThemeMode } from '../../types';
import { Clock, PanelRightClose, ChevronDown, Plus, GitCompare, FileDiff, RotateCcw, AlertCircle, Check } from 'lucide-react';
import { MOCK_HISTORY, MOCK_SNAPSHOTS, MOCK_DIFFS } from './mockData';

interface DeviceHistoryDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    theme: ThemeColors;
    mode: ThemeMode;
    t: any;
    expandedVersion: string | null;
    setExpandedVersion: (v: string | null) => void;
    historyViewMode: 'SNAPSHOT' | 'DIFF';
    setHistoryViewMode: (v: 'SNAPSHOT' | 'DIFF') => void;
    setRollbackTarget: (v: string) => void;
}

export const DeviceHistoryDrawer: React.FC<DeviceHistoryDrawerProps> = ({
    isOpen, onClose, theme, mode, t, 
    expandedVersion, setExpandedVersion, 
    historyViewMode, setHistoryViewMode, 
    setRollbackTarget
}) => {
    return (
        <div className={`fixed top-0 bottom-0 right-0 w-[500px] border-l shadow-2xl transform transition-transform duration-300 z-[60] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ background: theme.surface, borderColor: theme.stroke }}>
            <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: theme.stroke }}>
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
                        <Clock size={16} strokeWidth={2.5} />
                    </div>
                    <h2 className="font-bold" style={{ color: theme.text }}>{t.deployment.history}</h2>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded"><PanelRightClose size={18} style={{ color: theme.text }} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar relative">
                 <div className="relative min-h-full pb-10">
                    
                    {/* Main Vertical Line */}
                    <div
                        className="absolute left-[15px] top-3 bottom-6 w-[2px] rounded-full"
                        style={{
                            background: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                        }}
                    />

                    <div className="space-y-6">
                        {MOCK_HISTORY.map((h, i) => {
                             const isCurrent = i === 0;
                             const isExpanded = expandedVersion === h.version;
                             const snapshotData = MOCK_SNAPSHOTS[h.version] || [];
                             const diffData = MOCK_DIFFS[h.version] || [];

                             return (
                                 <div key={i} className="relative pl-10 group">
                                     {/* Node / Dot */}
                                     <div
                                        className={`absolute left-[16px] top-[14px] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-[2px] z-20 transition-all duration-300 ${
                                             isCurrent ? 'scale-125 shadow-[0_0_0_4px_rgba(59,130,246,0.15)]' : 'group-hover:scale-110'
                                        }`}
                                        style={{
                                            borderColor: isCurrent ? theme.primary : theme.stroke,
                                            background: theme.surface,
                                        }}
                                     >
                                        {isCurrent && <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-blue-500" />}
                                     </div>

                                     {/* Card */}
                                     <div
                                        onClick={() => {
                                            if (!isCurrent) {
                                                setExpandedVersion(isExpanded ? null : h.version);
                                                // Reset view to snapshot when opening
                                                if (!isExpanded) setHistoryViewMode('SNAPSHOT');
                                            }
                                        }}
                                        className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${
                                            isCurrent
                                                ? 'shadow-lg shadow-blue-500/5 cursor-default'
                                                : 'cursor-pointer hover:shadow-md'
                                        }`}
                                        style={{
                                            background: isCurrent
                                                ? (mode === 'dark' ? 'linear-gradient(145deg, rgba(59,130,246,0.1), transparent)' : 'linear-gradient(145deg, #eff6ff, #fff)')
                                                : (mode === 'dark' ? 'rgba(255,255,255,0.02)' : '#fff'),
                                             borderColor: isCurrent ? `${theme.primary}40` : theme.stroke,
                                        }}
                                     >
                                         <div className="p-3.5">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex flex-col gap-0.5">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-xs font-bold uppercase tracking-tight ${isCurrent ? 'text-blue-500' : ''}`} style={{ color: isCurrent ? theme.primary : theme.text }}>
                                                            {h.version}
                                                        </span>
                                                        <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-black/5 dark:bg-white/10 opacity-70 border uppercase tracking-wider" style={{ borderColor: theme.stroke }}>
                                                            {h.type}
                                                        </span>
                                                    </div>
                                                    <span className="text-[10px] font-mono opacity-50" style={{ color: theme.textSecondary }}>
                                                        {h.time} • by {h.author}
                                                    </span>
                                                </div>
                                                {!isCurrent && (
                                                    <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} opacity-40`} />
                                                )}
                                            </div>
                                            
                                            <p className="text-xs leading-relaxed font-medium opacity-70" style={{ color: theme.text }}>
                                                {h.desc}
                                            </p>
                                         </div>

                                         {/* Expanded Snapshot/Diff Area */}
                                         {isExpanded && (
                                             <div className="border-t animate-in slide-in-from-top-2 duration-200 bg-black/5 dark:bg-white/5" style={{ borderColor: theme.stroke }}>
                                                 {/* Toolbar */}
                                                 <div className="flex items-center justify-between p-2 border-b" style={{ borderColor: theme.stroke }}>
                                                     <div className="flex bg-black/5 dark:bg-white/5 rounded-lg p-0.5 border" style={{ borderColor: theme.stroke }}>
                                                         <button 
                                                            onClick={(e) => { e.stopPropagation(); setHistoryViewMode('SNAPSHOT'); }}
                                                            className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                                                                historyViewMode === 'SNAPSHOT' 
                                                                    ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-500' 
                                                                    : 'opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
                                                            }`}
                                                            style={{ color: historyViewMode === 'SNAPSHOT' ? theme.primary : theme.text }}
                                                         >
                                                             {t.deployment.snapshot.view}
                                                         </button>
                                                         <button 
                                                            onClick={(e) => { e.stopPropagation(); setHistoryViewMode('DIFF'); }}
                                                            className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all flex items-center gap-1 ${
                                                                historyViewMode === 'DIFF' 
                                                                    ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-500' 
                                                                    : 'opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
                                                            }`}
                                                            style={{ color: historyViewMode === 'DIFF' ? theme.primary : theme.text }}
                                                         >
                                                             {t.deployment.snapshot.diff}
                                                         </button>
                                                     </div>
                                                 </div>

                                                 {/* Content Area */}
                                                 <div className="p-3 max-h-[300px] overflow-y-auto custom-scrollbar">
                                                     {historyViewMode === 'SNAPSHOT' ? (
                                                         <div className="space-y-3">
                                                             {snapshotData.length > 0 ? snapshotData.map((stream, idx) => (
                                                                 <div key={idx} className="p-2.5 rounded-lg border bg-surface/50 text-xs shadow-sm" style={{ borderColor: theme.stroke, background: theme.surface }}>
                                                                     <div className="flex justify-between items-center mb-2 pb-2 border-b" style={{ borderColor: theme.stroke }}>
                                                                         <div className="flex items-center gap-2">
                                                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-50" />
                                                                            <span className="font-bold text-sm" style={{ color: theme.text }}>{stream.name}</span>
                                                                         </div>
                                                                     </div>
                                                                     
                                                                     <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-xs">
                                                                         <span className="text-right opacity-60 font-medium" style={{ color: theme.textSecondary }}>{t.deployment.snapshot.fields.input}:</span>
                                                                         <span className="font-mono truncate select-all" style={{ color: theme.text }}>{stream.input}</span>
                                                                         
                                                                         <span className="text-right opacity-60 font-medium" style={{ color: theme.textSecondary }}>{t.deployment.snapshot.fields.workflow}:</span>
                                                                         <span className="font-mono truncate select-all" style={{ color: theme.text }}>{stream.workflow}</span>

                                                                         <span className="text-right opacity-60 font-medium" style={{ color: theme.textSecondary }}>{t.deployment.snapshot.fields.telemetry}:</span>
                                                                         <span className="font-mono inline-flex items-center px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[10px] w-fit">{stream.telemetry}</span>
                                                                         
                                                                         <span className="text-right opacity-60 font-medium" style={{ color: theme.textSecondary }}>{t.deployment.snapshot.fields.concurrency}:</span>
                                                                         <span className="font-mono" style={{ color: theme.text }}>{stream.concurrency}</span>
                                                                     </div>
                                                                 </div>
                                                             )) : (
                                                                 <div className="text-center py-8 opacity-50 text-xs flex flex-col items-center gap-2">
                                                                     <div className="p-2 rounded-full bg-black/5 dark:bg-white/5"><AlertCircle size={16} /></div>
                                                                     {t.deployment.snapshot.empty}
                                                                 </div>
                                                             )}
                                                         </div>
                                                     ) : (
                                                         <div className="space-y-2">
                                                             {diffData.length > 0 ? diffData.map((diff, idx) => {
                                                                 let colorClass = '';
                                                                 let icon = null;
                                                                 if (diff.type === 'ADD') { colorClass = 'text-green-500 bg-green-500/10 border-green-500/20'; icon = <Plus size={10} />; }
                                                                 else if (diff.type === 'MOD') { colorClass = 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'; icon = <GitCompare size={10} />; }
                                                                 else { colorClass = 'text-red-500 bg-red-500/10 border-red-500/20'; icon = <FileDiff size={10} />; }

                                                                 return (
                                                                     <div key={idx} className={`flex items-start gap-2 p-2 rounded-lg border text-xs ${colorClass}`}>
                                                                         <div className="mt-0.5">{icon}</div>
                                                                         <span className="font-medium">{diff.text}</span>
                                                                     </div>
                                                                 )
                                                             }) : (
                                                                 <div className="text-center py-8 opacity-50 text-xs flex flex-col items-center gap-2">
                                                                    <div className="p-2 rounded-full bg-black/5 dark:bg-white/5"><Check size={16} /></div>
                                                                     {t.deployment.snapshot.emptyDiff}
                                                                 </div>
                                                             )}
                                                         </div>
                                                     )}
                                                 </div>

                                                 {/* Action Footer */}
                                                 <div className="p-3 border-t flex justify-end gap-2" style={{ borderColor: theme.stroke }}>
                                                     <button 
                                                        onClick={(e) => { e.stopPropagation(); setRollbackTarget(h.version); }}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
                                                     >
                                                         <RotateCcw size={12} strokeWidth={2.5} />
                                                         <span>{t.deployment.snapshot.rollback}</span>
                                                     </button>
                                                 </div>
                                             </div>
                                         )}
                                     </div>
                                 </div>
                             );
                        })}
                    </div>
                 </div>
            </div>
        </div>
    );
};
