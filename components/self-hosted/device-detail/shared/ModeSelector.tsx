
import React, { useState, useRef, useEffect } from 'react';
import { ThemeColors } from '../../../../types';
import { Cpu, Cloud, ChevronDown, Check } from 'lucide-react';

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
