
import React from 'react';
import { ThemeColors } from '../../../../types';
import { Calendar } from 'lucide-react';

export const TimeRangePicker = ({ 
    theme, 
    range, 
    onChange, 
    labels 
}: { 
    theme: ThemeColors, 
    range: string, 
    onChange: (r: string) => void,
    labels: { last24h: string, last7d: string, last30d: string }
}) => {
    return (
        <div className="flex items-center bg-black/5 dark:bg-white/5 p-1 rounded-lg border" style={{ borderColor: theme.stroke }}>
             {['24h', '7d', '30d'].map((r) => (
                 <button
                    key={r}
                    onClick={() => onChange(r)}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        range === r 
                            ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-500' 
                            : 'opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                    style={{ color: range === r ? theme.primary : theme.text }}
                 >
                     {r === '24h' ? labels.last24h : r === '7d' ? labels.last7d : labels.last30d}
                 </button>
             ))}
             <div className="w-px h-4 bg-gray-500/20 mx-1" />
             <button
                className="px-2.5 py-1.5 rounded-md text-xs font-bold opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-1.5"
                style={{ color: theme.text }}
             >
                <Calendar size={12} />
             </button>
          </div>
    )
}
