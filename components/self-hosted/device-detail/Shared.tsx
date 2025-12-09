
import React, { useState, useRef, useEffect } from 'react';
import { ThemeColors } from '../../../types';
import { Cpu, Cloud, ChevronDown, Check, Calendar } from 'lucide-react';

export const StatusTag = ({ status, tStatus }: { status: string, tStatus: any }) => {
    let styles = "bg-gray-500 text-white";
    let label = status;

    switch (status) {
      case 'ONLINE':
        styles = "bg-green-500 text-white shadow-sm shadow-green-500/20";
        label = tStatus.online;
        break;
      case 'OFFLINE':
        styles = "bg-red-500 text-white shadow-sm shadow-red-500/20";
        label = tStatus.offline;
        break;
      case 'PENDING_LICENSE':
        styles = "bg-orange-500 text-white shadow-sm shadow-orange-500/20";
        label = tStatus.pending;
        break;
      case 'DRAINING':
        styles = "bg-blue-500 text-white shadow-sm shadow-blue-500/20";
        label = tStatus.draining;
        break;
      case 'DECOMMISSIONED':
        styles = "bg-gray-500 text-white";
        label = tStatus.decommissioned;
        break;
    }

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide whitespace-nowrap ${styles}`}>
        {status === 'ONLINE' && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
        {label}
      </span>
    );
};

export const ModeSelector = ({ currentMode, onChange, theme }: { currentMode: string, onChange: (m: 'EDGE' | 'CLOUD') => void, theme: ThemeColors }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isEdge = currentMode === 'EDGE';
    const color = isEdge ? theme.node.green : theme.node.purple;
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div className="relative" ref={dropdownRef}>
          <button 
              onClick={() => setIsOpen(!isOpen)}
              className="px-2 py-0.5 rounded border text-[10px] font-bold flex items-center gap-1.5 transition-all hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 whitespace-nowrap"
              style={{ borderColor: color, color: color }}
          >
              {isEdge ? <Cpu size={10} /> : <Cloud size={10} />}
              {currentMode}
              <ChevronDown size={10} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isOpen && (
              <div 
                  className="absolute right-0 top-full mt-1 w-32 rounded-lg border shadow-xl overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-150"
                  style={{ background: theme.surface, borderColor: theme.stroke }}
              >
                  {['EDGE', 'CLOUD'].map((m) => {
                      const mIsEdge = m === 'EDGE';
                      const mColor = mIsEdge ? theme.node.green : theme.node.purple;
                      const isSelected = m === currentMode;
                      return (
                          <button
                              key={m}
                              onClick={() => {
                                  onChange(m as 'EDGE' | 'CLOUD');
                                  setIsOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 text-[10px] font-bold flex items-center gap-2 transition-colors ${isSelected ? 'bg-black/5 dark:bg-white/5' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                              style={{ color: isSelected ? mColor : theme.text }}
                          >
                              {mIsEdge ? <Cpu size={12} className={isSelected ? 'opacity-100' : 'opacity-50'} color={mColor} /> : <Cloud size={12} className={isSelected ? 'opacity-100' : 'opacity-50'} color={mColor} />}
                              <span>{m}</span>
                              {isSelected && <Check size={10} className="ml-auto opacity-50" />}
                          </button>
                      );
                  })}
              </div>
          )}
      </div>
    );
};

export const Card = ({ children, title, action, className = '', theme }: any) => (
    <div className={`rounded-2xl border p-5 flex flex-col h-full ${className}`} style={{ background: theme.surface, borderColor: theme.stroke }}>
        <div className="flex justify-between items-center mb-4 shrink-0">
            <h3 className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: theme.textSecondary }}>{title}</h3>
            {action}
        </div>
        <div className="flex-1">{children}</div>
    </div>
);

export const CardFooter = ({ children, className = '', theme }: any) => (
    <div className={`mt-auto pt-3 border-t flex items-center h-10 ${className}`} style={{ borderColor: theme.stroke }}>
        {children}
    </div>
);

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

export const TrendChart = ({ theme, color1, color2 }: { theme: ThemeColors, color1: string, color2: string }) => {
    const points1 = [10, 40, 30, 70, 50, 90, 80, 50, 70, 100, 80, 60, 40, 60, 80, 60, 40, 20, 40, 60];
    const points2 = [30, 20, 40, 30, 50, 40, 60, 40, 50, 30, 20, 40, 30, 50, 40, 30, 20, 10, 20, 30];
    
    const width = 1000;
    const height = 100;
    
    const makePath = (data: number[]) => {
        const max = 100;
        const step = width / (data.length - 1);
        return data.map((val, i) => {
            const x = i * step;
            const y = height - (val / max) * height;
            return `${x},${y}`;
        }).join(' L ');
    };

    const path1 = `M 0,${height} L ${makePath(points1)} L ${width},${height} Z`;
    const path2 = `M 0,${height} L ${makePath(points2)} L ${width},${height} Z`;
    const stroke1 = `M ${makePath(points1)}`;
    const stroke2 = `M ${makePath(points2)}`;

    return (
        <div className="w-full h-full relative overflow-hidden">
            <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
                 <defs>
                     <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={color1} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={color1} stopOpacity={0} />
                     </linearGradient>
                     <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={color2} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={color2} stopOpacity={0} />
                     </linearGradient>
                 </defs>
                 <path d={path2} fill="url(#grad2)" />
                 <path d={stroke2} fill="none" stroke={color2} strokeWidth="3" vectorEffect="non-scaling-stroke" />
                 <path d={path1} fill="url(#grad1)" />
                 <path d={stroke1} fill="none" stroke={color1} strokeWidth="3" vectorEffect="non-scaling-stroke" />
            </svg>
        </div>
    );
};

export const MultiLineChart = ({ theme, series, height = 150 }: { theme: ThemeColors, series: { label: string, color: string, data: number[] }[], height?: number }) => {
    const width = 1000;
    const maxVal = Math.max(...series.flatMap(s => s.data), 1);

    const makePath = (data: number[]) => {
        const step = width / (data.length - 1);
        return data.map((val, i) => {
            const x = i * step;
            const y = height - (val / maxVal) * height; 
            return `${x},${y}`;
        }).join(' L ');
    };

    return (
        <div className="w-full h-full relative overflow-hidden">
            <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
                {series.map((s, i) => (
                    <path 
                        key={i}
                        d={`M ${makePath(s.data)}`} 
                        fill="none" 
                        stroke={s.color} 
                        strokeWidth="2.5" 
                        vectorEffect="non-scaling-stroke"
                        className="opacity-80 hover:opacity-100 hover:stroke-[4px] transition-all duration-300"
                    />
                ))}
            </svg>
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                <div className="border-t border-current w-full" />
                <div className="border-t border-current w-full" />
                <div className="border-t border-current w-full" />
                <div className="border-t border-current w-full" />
                <div className="border-b border-current w-full h-full" />
            </div>
        </div>
    );
};
