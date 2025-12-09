import React, { useState, useEffect } from 'react';
import { ThemeColors, NodeType, Category, Language } from '../../types';
import { NodeIcon } from './NodeIcon';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import { DRAGGABLE_NODES } from '../../constants';
import { translations } from '../../translations';

interface NodeLibraryPopoverProps {
  theme: ThemeColors;
  language: Language;
  isOpen: boolean;
  position: { x: number, y: number } | null;
  onClose: () => void;
  onSelect: (type: NodeType) => void;
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

export const NodeLibraryPopover: React.FC<NodeLibraryPopoverProps> = ({ theme, language, isOpen, position, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Source': true,
    'AI Model': true,
    'Logic': true,
    'Output': true,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
        setSearchTerm('');
    }
  }, [isOpen]);

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  if (!isOpen || !position) return null;

  const t = translations[language].sidebar;
  const tNodes = translations[language].nodes;

  const filteredNodes = DRAGGABLE_NODES.filter(node => 
    tNodes[node.type].label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedNodes = filteredNodes.reduce((acc, node) => {
    if (!acc[node.category]) acc[node.category] = [];
    acc[node.category].push(node);
    return acc;
  }, {} as Record<Category, typeof DRAGGABLE_NODES>);

  const categories = Object.keys(groupedNodes) as Category[];

  const stylePos: React.CSSProperties = {
    top: position.y,
    left: position.x,
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div 
        className="fixed z-50 w-64 rounded-xl border shadow-xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-100"
        style={{ 
          background: theme.surface, 
          borderColor: theme.stroke,
          color: theme.text,
          maxHeight: '400px',
          ...stylePos
        }}
      >
        <div className="p-2 border-b flex items-center gap-2" style={{ borderColor: theme.stroke }}>
          <Search size={14} className="opacity-50 ml-1" />
          <input 
            autoFocus
            type="text" 
            placeholder={t.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-xs font-medium placeholder-opacity-40 h-6"
            style={{ color: theme.text }}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-1 custom-scrollbar">
          {filteredNodes.length === 0 ? (
             <div className="text-center py-4 opacity-50 text-xs">No nodes found</div>
          ) : (
            categories.map((category) => (
              <div key={category} className="mb-1">
                <button 
                  onClick={() => toggleCategory(category)}
                  className="flex items-center justify-between w-full px-3 py-1.5 mt-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors group"
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider opacity-60 group-hover:opacity-100 group-hover:text-blue-500 transition-all">
                    {expandedCategories[category] ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
                    {t.categories[category]}
                  </div>
                  <span className="bg-black/5 dark:bg-white/10 px-1.5 rounded text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">
                     {groupedNodes[category]?.length || 0}
                  </span>
                </button>
                
                {expandedCategories[category] && (
                  <div className="space-y-0.5 mt-0.5 pl-1 animate-in slide-in-from-top-1 duration-200">
                    {groupedNodes[category]?.map((node) => {
                      const color = getNodeColor(node.type, theme.node);
                      const nodeT = tNodes[node.type];
                      return (
                        <button
                          key={node.type}
                          onClick={() => onSelect(node.type)}
                          className="flex items-center gap-3 w-full p-2 rounded-lg text-left transition-colors hover:bg-blue-500/5 group"
                        >
                           <div 
                            className="w-7 h-7 rounded flex items-center justify-center shrink-0 transition-colors shadow-sm"
                            style={{ 
                              background: `${color}15`,
                              color: color,
                              boxShadow: `inset 0 0 0 1px ${color}20`
                            }}
                          >
                            <NodeIcon type={node.type} color={color} size={16} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-semibold truncate group-hover:text-blue-500 transition-colors">{nodeT.label}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};