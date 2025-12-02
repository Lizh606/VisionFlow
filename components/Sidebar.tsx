
import React, { useState } from 'react';
import { ThemeColors, NodeType, Category, ThemeMode, Language } from '../types';
import { NodeIcon } from './NodeIcon';
import { Search, ChevronDown, ChevronRight, PanelLeftClose, Layers } from 'lucide-react';
import { DRAGGABLE_NODES } from '../constants';
import { translations } from '../translations';

interface SidebarProps {
  theme: ThemeColors;
  mode: ThemeMode;
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

const getNodeColor = (type: NodeType, colors: ThemeColors['node']) => {
  switch (type) {
    case 'input': return colors.blue;
    case 'detection': return colors.purple;
    case 'tracking': return colors.orange;
    case 'pose': return colors.pink;
    case 'classifier': return colors.indigo;
    case 'logic': return colors.cyan;
    case 'output': return colors.red;
    default: return colors.blue;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({ theme, mode, language, isOpen, onClose }) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Source': true,
    'AI Model': true,
    'Logic': true,
    'Output': true,
  });

  const t = translations[language].sidebar;
  const tNodes = translations[language].nodes;

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const groupedNodes = DRAGGABLE_NODES.reduce((acc, node) => {
    if (!acc[node.category]) acc[node.category] = [];
    acc[node.category].push(node);
    return acc;
  }, {} as Record<Category, typeof DRAGGABLE_NODES>);

  const categories: Category[] = ['Source', 'AI Model', 'Logic', 'Output'];

  return (
    <div 
      className={`border-r flex flex-col z-20 transition-all duration-500 cubic-bezier(0.22, 1, 0.36, 1) whitespace-nowrap overflow-hidden ${isOpen ? 'w-80 opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-10 border-none'}`}
      style={{ 
        background: theme.surface, 
        borderColor: theme.stroke,
        color: theme.text
      }}
    >
      {/* Header Section */}
      <div className="p-4 pb-2 flex-shrink-0 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
               <Layers size={16} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight leading-none" style={{ color: theme.text }}>{t.title}</h2>
              <span className="text-[10px] opacity-50 font-medium" style={{ color: theme.textSecondary }}>V2.4.0 Build</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-60 hover:opacity-100"
          >
            <PanelLeftClose size={18} />
          </button>
        </div>
        
        <div className="relative group">
          <div 
             className="absolute inset-0 rounded-xl bg-blue-500/5 blur-md transition-opacity opacity-0 group-focus-within:opacity-100"
          />
          <div 
            className="relative flex items-center px-3 py-2.5 rounded-xl gap-2.5 text-sm transition-all border shadow-sm"
            style={{ 
               background: mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'white',
               borderColor: theme.stroke
            }}
          >
            <Search size={16} className="opacity-40 group-focus-within:text-blue-500 group-focus-within:opacity-100 transition-all" />
            <input 
              type="text" 
              placeholder={t.search}
              className="bg-transparent outline-none w-full placeholder-opacity-40 text-xs font-medium"
              style={{ color: theme.text }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-6">
        {categories.map((category) => (
          <div key={category} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <button 
              onClick={() => toggleCategory(category)}
              className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider mb-3 px-1 group"
              style={{ color: theme.textSecondary }}
            >
              <span className="flex items-center gap-2 group-hover:text-blue-500 transition-colors">
                 {expandedCategories[category] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                 {t.categories[category]}
              </span>
              <span className="bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">
                 {groupedNodes[category]?.length || 0}
              </span>
            </button>
            
            {expandedCategories[category] && (
              <div className="space-y-3 pl-1">
                {groupedNodes[category]?.map((node) => {
                  const color = getNodeColor(node.type, theme.node);
                  const nodeT = tNodes[node.type];
                  return (
                    <div
                      key={node.type}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('application/reactflow/type', node.type);
                        e.dataTransfer.effectAllowed = 'move';
                      }}
                      className="group relative rounded-xl border cursor-grab active:cursor-grabbing transition-all duration-300 hover:-translate-y-1"
                      style={{ 
                        background: mode === 'dark' 
                             ? `linear-gradient(145deg, ${theme.surfaceHighlight}, ${theme.surface})` 
                             : '#fff',
                        borderColor: theme.stroke,
                        boxShadow: mode === 'light' ? '0 2px 8px -2px rgba(0,0,0,0.05)' : 'none'
                      }}
                    >
                      {/* Active Border Glow */}
                      <div 
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-0"
                        style={{ 
                            boxShadow: `inset 0 0 0 1px ${color}80, 0 8px 20px -6px ${color}30`
                        }}
                      />

                      <div className="relative z-10 p-3 flex items-center gap-3.5">
                        {/* Icon Container */}
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 shadow-inner group-hover:scale-110"
                          style={{ 
                            background: mode === 'dark' ? `${color}15` : `${color}10`,
                            color: color,
                            boxShadow: `inset 0 0 10px ${color}05`
                          }}
                        >
                          <NodeIcon type={node.type} color={color} size={20} />
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-0.5">
                            <h3 className="text-xs font-bold truncate group-hover:text-blue-500 transition-colors" style={{ color: theme.text }}>
                                {nodeT.label}
                            </h3>
                            {/* Grip Pattern */}
                            <div className="opacity-0 group-hover:opacity-40 transition-opacity flex gap-0.5">
                                <div className="w-0.5 h-3 rounded-full bg-current"></div>
                                <div className="w-0.5 h-3 rounded-full bg-current"></div>
                            </div>
                          </div>
                          <p className="text-[10px] opacity-50 truncate leading-tight font-medium" style={{ color: theme.textSecondary }}>
                             {nodeT.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Footer Gradient Fade */}
      <div 
        className="h-8 -mt-8 relative z-10 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${theme.surface})` }}
      />
    </div>
  );
};
