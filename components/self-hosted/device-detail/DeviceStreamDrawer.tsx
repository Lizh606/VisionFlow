
import React from 'react';
import { ThemeColors, ThemeMode } from '../../types';
import { X, Check } from 'lucide-react';

interface DeviceStreamDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    theme: ThemeColors;
    mode: ThemeMode;
    t: any;
    editingStream: any;
}

export const DeviceStreamDrawer: React.FC<DeviceStreamDrawerProps> = ({
    isOpen, onClose, theme, mode, t, editingStream
}) => {
    return (
        <div className={`fixed top-0 bottom-0 right-0 w-[480px] border-l shadow-2xl transform transition-transform duration-300 z-[60] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ background: theme.surface, borderColor: theme.stroke }}>
            <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: theme.stroke }}>
                <h2 className="font-bold text-lg" style={{ color: theme.text }}>
                    {editingStream ? t.deployment.drawer.titleEdit : t.deployment.drawer.titleAdd}
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded"><X size={18} style={{ color: theme.text }} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                 {/* Basic Info */}
                 <div className="space-y-4">
                     <h3 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: theme.textSecondary }}>{t.deployment.drawer.basic}</h3>
                     <div className="space-y-1.5">
                         <label className="text-xs font-medium" style={{ color: theme.text }}>Stream Name</label>
                         <input type="text" defaultValue={editingStream?.name} className="w-full px-3 py-2 rounded-lg border bg-transparent text-sm outline-none focus:ring-2 focus:ring-blue-500/20" style={{ borderColor: theme.stroke, color: theme.text }} placeholder="e.g. Entrance Cam" />
                     </div>
                     <div className="space-y-1.5">
                         <label className="text-xs font-medium" style={{ color: theme.text }}>Stream ID (Auto)</label>
                         <input type="text" disabled value={editingStream ? editingStream.id : "Auto Generated"} className="w-full px-3 py-2 rounded-lg border bg-black/5 dark:bg-white/5 text-sm outline-none opacity-60 font-mono" style={{ borderColor: theme.stroke, color: theme.text }} />
                     </div>
                 </div>

                 {/* Input */}
                 <div className="space-y-4 pt-4 border-t" style={{ borderColor: theme.stroke }}>
                     <h3 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: theme.textSecondary }}>{t.deployment.drawer.input}</h3>
                     <div className="grid grid-cols-3 gap-3">
                         {['RTSP', 'HTTP', 'FILE'].map(type => (
                             <button key={type} className={`px-3 py-2 rounded-lg border text-xs font-bold transition-colors text-center ${editingStream && editingStream.input === type ? 'bg-blue-500/10 border-blue-500 text-blue-500' : 'hover:bg-black/5 dark:hover:bg-white/5'}`} style={{ borderColor: editingStream && editingStream.input === type ? undefined : theme.stroke, color: editingStream && editingStream.input === type ? undefined : theme.text }}>
                                 {type}
                             </button>
                         ))}
                     </div>
                     <div className="space-y-1.5">
                         <label className="text-xs font-medium" style={{ color: theme.text }}>Endpoint URL</label>
                         <input type="text" defaultValue={editingStream ? `rtsp://192.168.1.100:554/${editingStream.id}` : ''} className="w-full px-3 py-2 rounded-lg border bg-transparent text-sm outline-none focus:ring-2 focus:ring-blue-500/20 font-mono" style={{ borderColor: theme.stroke, color: theme.text }} placeholder="rtsp://192.168.1.100:554/stream" />
                     </div>
                 </div>

                 {/* Workflow */}
                 <div className="space-y-4 pt-4 border-t" style={{ borderColor: theme.stroke }}>
                     <h3 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: theme.textSecondary }}>{t.deployment.drawer.workflow}</h3>
                     <div className="space-y-1.5">
                         <label className="text-xs font-medium" style={{ color: theme.text }}>Select Workflow</label>
                         <select defaultValue={editingStream?.workflowId} className="w-full px-3 py-2 rounded-lg border bg-transparent text-sm outline-none focus:ring-2 focus:ring-blue-500/20" style={{ borderColor: theme.stroke, color: theme.text }}>
                             <option value="wf_person_cnt">wf_person_cnt (Person Counting)</option>
                             <option value="wf_face_rec">wf_face_rec (Face Recognition)</option>
                             <option value="wf_safety">wf_safety (Safety Monitoring)</option>
                         </select>
                     </div>
                     <div className="space-y-1.5">
                         <label className="text-xs font-medium" style={{ color: theme.text }}>Version Tag</label>
                         <div className="flex gap-2">
                             <button className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-500 text-xs font-bold border border-blue-500/20">LATEST</button>
                             <button className="px-3 py-1.5 rounded-lg border text-xs font-bold opacity-60" style={{ borderColor: theme.stroke, color: theme.text }}>STABLE</button>
                             <button className="px-3 py-1.5 rounded-lg border text-xs font-bold opacity-60" style={{ borderColor: theme.stroke, color: theme.text }}>SPECIFIC...</button>
                         </div>
                     </div>
                 </div>

                 {/* Run Policy */}
                 <div className="space-y-4 pt-4 border-t" style={{ borderColor: theme.stroke }}>
                     <h3 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: theme.textSecondary }}>{t.deployment.drawer.policy}</h3>
                     
                     {/* Max Concurrency */}
                     <div className="space-y-1.5">
                         <label className="text-xs font-medium" style={{ color: theme.text }}>Max Concurrency</label>
                         <input type="number" defaultValue={1} min={1} className="w-full px-3 py-2 rounded-lg border bg-transparent text-sm outline-none focus:ring-2 focus:ring-blue-500/20" style={{ borderColor: theme.stroke, color: theme.text }} />
                     </div>

                     {/* Telemetry Granularity */}
                     <div className="space-y-2">
                         <label className="text-xs font-medium" style={{ color: theme.text }}>Telemetry Granularity</label>
                         <div className="flex flex-col gap-2">
                             {[
                                 { id: 'heartbeat', label: 'Heartbeat Only', desc: 'Minimal overhead', value: 'HEARTBEAT' },
                                 { id: 'metrics', label: 'Metrics', desc: 'Standard monitoring', value: 'METRICS_ONLY' },
                                 { id: 'diagnostic', label: 'Diagnostic', desc: 'Full tracing (High overhead)', value: 'DIAGNOSTIC' }
                             ].map((opt, i) => {
                                 const isChecked = editingStream ? editingStream.telemetry === opt.value : i === 1;
                                 return (
                                     <label key={opt.id} className={`flex items-center gap-3 p-2 rounded-lg border cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${isChecked ? 'bg-blue-500/5 border-blue-500/30' : ''}`} style={{ borderColor: isChecked ? undefined : theme.stroke }}>
                                         <input type="radio" name="telemetry" defaultChecked={isChecked} className="accent-blue-500" />
                                         <div>
                                             <div className="text-sm font-bold" style={{ color: theme.text }}>{opt.label}</div>
                                             <div className="text-[10px] opacity-60" style={{ color: theme.textSecondary }}>{opt.desc}</div>
                                         </div>
                                     </label>
                                 )
                             })}
                         </div>
                     </div>

                     {/* Apply Immediately */}
                     <div className="flex items-center gap-3 pt-2">
                        <div className="relative flex items-center">
                            <input type="checkbox" id="apply_now" className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-500 checked:bg-blue-500 checked:border-blue-500 transition-all" defaultChecked />
                            <Check size={10} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" />
                        </div>
                        <label htmlFor="apply_now" className="text-sm font-medium cursor-pointer" style={{ color: theme.text }}>Apply configuration immediately</label>
                     </div>
                 </div>
            </div>
            <div className="p-5 border-t flex gap-3" style={{ borderColor: theme.stroke }}>
                <button onClick={onClose} className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5" style={{ color: theme.text }}>
                    {t.deployment.drawer.cancel}
                </button>
                <button className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white bg-blue-500 shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition-colors">
                    {t.deployment.drawer.save}
                </button>
            </div>
        </div>
    );
};
