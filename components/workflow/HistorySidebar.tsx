import React from 'react';
import { ThemeColors, ThemeMode, Language } from '../../types';
import { Clock, RotateCcw, PanelLeftClose } from 'lucide-react';
import { translations } from '../../translations';

interface HistorySidebarProps {
  theme: ThemeColors;
  mode: ThemeMode;
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onRestore: (versionId: string) => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({ theme, mode, language, isOpen, onClose, onRestore }) => {
  const t = translations[language].history;

  const HISTORY_ITEMS = [
    { id: 'v2.4.0', labelKey: 'current', timeKey: 'justNow', author: 'You', type: 'current', desc: 'Latest manual save after parameter tuning.' },
    { id: 'v2.3.5', labelKey: 'save', timeKey: 'hoursAgo', author: 'You', type: 'save', desc: 'Integrated object detection model with custom weights.' },
    { id: 'v2.2.0', labelKey: 'save', timeKey: 'daysAgo', author: 'You', type: 'save', desc: 'Project initialization and source configuration.' },
    { id: 'v1.0.0', labelKey: 'init', timeKey: 'daysAgo', author: 'You', type: 'init', desc: 'Canvas Created.' },
  ];

  return (
    <div
      className={`absolute top-0 left-0 bottom-0 z-40 border-r flex flex-col transition-all duration-500 cubic-bezier(0.22, 1, 0.36, 1) ${
        isOpen ? 'w-80 translate-x-0 opacity-100 shadow-2xl' : '-translate-x-full w-80 opacity-0'
      }`}
      style={{
        background: theme.surface,
        borderColor: theme.stroke,
        color: theme.text
      }}
    >
      <div className="p-4 pb-2 shrink-0 relative z-10 border-b" style={{ borderColor: theme.stroke }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
             <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
                <Clock size={16} strokeWidth={2.5} />
             </div>
             <div>
               <h2 className="text-sm font-bold tracking-tight leading-none" style={{ color: theme.text }}>{t.title}</h2>
               <span className="text-[10px] opacity-50 font-medium" style={{ color: theme.textSecondary }}>{HISTORY_ITEMS.length} {t.versionsAvailable}</span>
             </div>
          </div>
          <button
             onClick={onClose}
             className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-60 hover:opacity-100"
           >
             <PanelLeftClose size={18} />
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar relative z-10">
         <div className="relative min-h-full pb-10">
            
            <div
                className="absolute left-[15px] top-3 bottom-6 w-[2px] rounded-full"
                style={{
                    background: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                }}
            />

            <div className="space-y-6">
            {HISTORY_ITEMS.map((item, index) => {
               const isCurrent = index === 0;
               // @ts-ignore
               const label = t.types[item.labelKey];
               // @ts-ignore
               const time = t.time[item.timeKey];

               return (
                 <div
                    key={item.id}
                    className="relative pl-10 group"
                 >
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

                    <div
                        className={`relative rounded-xl p-3.5 border transition-all duration-300 group-hover:-translate-y-0.5 ${
                            isCurrent
                                ? 'shadow-lg shadow-blue-500/5'
                                : 'hover:shadow-md'
                        }`}
                        style={{
                            background: isCurrent
                                ? (mode === 'dark' ? 'linear-gradient(145deg, rgba(59,130,246,0.1), transparent)' : 'linear-gradient(145deg, #eff6ff, #fff)')
                                : (mode === 'dark' ? 'rgba(255,255,255,0.02)' : '#fff'),
                             borderColor: isCurrent ? `${theme.primary}40` : theme.stroke,
                             boxShadow: !isCurrent && mode === 'light' ? '0 1px 2px rgba(0,0,0,0.05)' : undefined
                        }}
                    >
                        <div className="flex justify-between items-start mb-2">
                           <div className="flex flex-col gap-0.5">
                                <div className="flex items-center gap-2">
                                     <span
                                         className={`text-xs font-bold uppercase tracking-tight ${isCurrent ? 'text-blue-500' : ''}`}
                                         style={{ color: isCurrent ? theme.primary : theme.text }}
                                     >
                                         {label}
                                     </span>
                                     {isCurrent && (
                                         <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-green-500/10 text-green-500 border border-green-500/20 uppercase tracking-wider">
                                             Active
                                         </span>
                                     )}
                                </div>
                                <span className="text-[10px] font-mono opacity-50" style={{ color: theme.textSecondary }}>
                                     {item.id} • {time}
                                </span>
                           </div>
                        </div>

                        <p className="text-xs leading-relaxed mb-3 font-medium opacity-70" style={{ color: theme.text }}>
                            {item.desc}
                        </p>

                        <div className="flex items-center justify-between pt-2.5 border-t border-dashed" style={{ borderColor: theme.stroke }}>
                           <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-[9px] font-bold text-white shadow-sm ring-2 ring-white/10">
                                    {item.author[0]}
                                </div>
                                <span className="text-[10px] font-medium opacity-60" style={{ color: theme.text }}>{item.author}</span>
                           </div>

                           {!isCurrent && (
                               <button
                                 onClick={() => onRestore(item.id)}
                                 className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-blue-500/10 hover:text-blue-500 transition-all text-[10px] font-bold opacity-60 hover:opacity-100"
                                 style={{ color: theme.text }}
                               >
                                  <RotateCcw size={10} strokeWidth={2.5} />
                                  <span>{t.restore}</span>
                               </button>
                           )}
                        </div>
                    </div>
                 </div>
               );
            })}
            </div>
            
            <div className="relative pl-10 mt-8 flex items-center gap-3 opacity-40">
                 <div 
                    className="absolute left-[16px] top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full border-2 border-current z-10" 
                    style={{ background: theme.surface, borderColor: theme.textSecondary }} 
                 />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Initial Commit</span>
            </div>

         </div>
      </div>
    </div>
  );
};