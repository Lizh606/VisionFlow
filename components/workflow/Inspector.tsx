import React, { useState } from 'react';
import { ThemeColors, Node, Language, NodeType, Category, ThemeMode } from '../../types';
import { Settings, Trash2, PanelRightClose, Layers, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { translations } from '../../translations';
import { DRAGGABLE_NODES } from '../../constants';
import { NodeIcon } from './NodeIcon';

export type RightPanelView = 'inspector' | 'nodes';

interface RightPanelProps {
  theme: ThemeColors;
  mode: ThemeMode;
  language: Language;
  selectedNode: Node | null;
  activeView: RightPanelView | null;
  onUpdateNode: (id: string, data: Partial<Node['data']>) => void;
  onDeleteNode: (id: string) => void;
  onClose: () => void;
  onSelectNodeFromLibrary: (type: NodeType) => void;
  onSelectModelFromLibrary: (type: NodeType) => void;
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

export const Inspector: React.FC<RightPanelProps> = ({ 
  theme, 
  mode,
  language,
  selectedNode, 
  activeView,
  onUpdateNode, 
  onDeleteNode,
  onClose,
  onSelectNodeFromLibrary,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Source': true, 'AI Model': true, 'Logic': true, 'Output': true,
  });

  const t = translations[language].inspector;
  const tSidebar = translations[language].sidebar;
  const tNodes = translations[language].nodes;

  const showPanel = activeView !== null;

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const renderContent = () => {
    if (activeView === 'inspector' && selectedNode) {
      return (
        <div className="space-y-6">
           <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold opacity-50 uppercase block">{t.label}</label>
                <input 
                  type="text" 
                  value={selectedNode.data.label}
                  onChange={(e) => onUpdateNode(selectedNode.id, { label: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-sm border focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-medium"
                  style={{ background: theme.background, borderColor: theme.stroke, color: theme.text }}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold opacity-50 uppercase block">{t.description}</label>
                <textarea 
                  value={selectedNode.data.description || ''}
                  onChange={(e) => onUpdateNode(selectedNode.id, { description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl text-sm border focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                  style={{ background: theme.background, borderColor: theme.stroke, color: theme.text }}
                />
              </div>
            </div>

            <div className="h-[1px] w-full" style={{ background: theme.stroke }} />

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider opacity-60 block">{t.parameters}</label>
              
              <div className="p-4 rounded-xl border space-y-5" style={{ borderColor: theme.stroke, background: theme.surfaceHighlight }}>
                 <div className="flex items-center justify-between text-sm">
                   <span className="font-medium opacity-80">{t.activeState}</span>
                   <button 
                    onClick={() => onUpdateNode(selectedNode.id, { status: selectedNode.data.status === 'running' ? 'idle' : 'running' })}
                    className={`w-10 h-5 rounded-full relative cursor-pointer transition-all duration-300 ${selectedNode.data.status === 'running' ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                   >
                     <div className={`absolute top-1 w-3 h-3 rounded-full bg-white shadow-sm transition-all duration-300 ${selectedNode.data.status === 'running' ? 'left-[calc(100%-16px)]' : 'left-1'}`}></div>
                   </button>
                 </div>
                 
                 {(selectedNode.type === 'detection' || selectedNode.type === 'tracking') && (
                   <div className="space-y-4 pt-1">
                     <div className="space-y-2">
                       <div className="flex justify-between text-xs font-medium opacity-80">
                          <span>{t.confThreshold}</span>
                          <span>0.65</span>
                       </div>
                       <div className="h-1.5 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full bg-blue-500 w-[65%] rounded-full"></div>
                       </div>
                     </div>
                   </div>
                 )}
              </div>
            </div>
        </div>
      );
    } 
    
    if (activeView === 'nodes') {
        const groupedNodes = DRAGGABLE_NODES.reduce((acc, node) => {
            if (!acc[node.category]) acc[node.category] = [];
            acc[node.category].push(node);
            return acc;
        }, {} as Record<Category, typeof DRAGGABLE_NODES>);

        const categories: Category[] = ['Source', 'AI Model', 'Logic', 'Output'];
        
        return (
            <div className="space-y-6">
                <div className="relative group">
                    <div className="relative flex items-center px-3 py-2.5 rounded-xl gap-2.5 text-sm transition-all border shadow-sm" style={{ background: theme.background, borderColor: theme.stroke }}>
                        <Search size={16} className="opacity-40" />
                        <input type="text" placeholder={tSidebar.search} className="bg-transparent outline-none w-full placeholder-opacity-40 text-xs font-medium" style={{ color: theme.text }} />
                    </div>
                </div>

                <div className="space-y-4">
                {categories.map((category) => (
                <div key={category}>
                    <button onClick={() => toggleCategory(category)} className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider mb-3 px-1 group" style={{ color: theme.textSecondary }}>
                        <span className="flex items-center gap-2 group-hover:text-blue-500 transition-colors">
                            {expandedCategories[category] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                            {tSidebar.categories[category]}
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
                                <div 
                                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-0"
                                    style={{ 
                                        boxShadow: `inset 0 0 0 1px ${color}80, 0 8px 20px -6px ${color}30`
                                    }}
                                />

                                <div className="relative z-10 p-3 flex items-center gap-3.5">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 shadow-inner group-hover:scale-110" style={{ 
                                        background: mode === 'dark' ? `${color}15` : `${color}10`,
                                        color: color,
                                        boxShadow: `inset 0 0 10px ${color}05`
                                    }}>
                                        <NodeIcon type={node.type} color={color} size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-0.5">
                                            <h3 className="text-xs font-bold truncate group-hover:text-blue-500 transition-colors" style={{ color: theme.text }}>{nodeT.label}</h3>
                                            <div className="opacity-0 group-hover:opacity-40 transition-opacity flex gap-0.5">
                                                <div className="w-0.5 h-3 rounded-full bg-current"></div>
                                                <div className="w-0.5 h-3 rounded-full bg-current"></div>
                                            </div>
                                        </div>
                                        <p className="text-[10px] opacity-50 truncate leading-tight font-medium" style={{ color: theme.textSecondary }}>{nodeT.desc}</p>
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
            </div>
        );
    }

    return null;
  };

  const getTitle = () => {
      switch(activeView) {
          case 'inspector': return t.title;
          case 'nodes': return tSidebar.title;
          default: return '';
      }
  }

  const getIcon = () => {
      switch(activeView) {
          case 'inspector': return <Settings size={16} strokeWidth={2.5} />;
          case 'nodes': return <Layers size={16} strokeWidth={2.5} />;
          default: return null;
      }
  }

  const getHeaderGradient = () => {
      switch(activeView) {
          case 'inspector': return 'from-purple-500 to-pink-600';
          case 'nodes': return 'from-blue-500 to-cyan-600';
          default: return 'from-gray-500 to-gray-600';
      }
  }

  return (
    <div 
      className={`border-l flex flex-col z-30 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] whitespace-nowrap overflow-hidden bg-surface ${showPanel ? 'w-80 opacity-100 translate-x-0' : 'w-0 opacity-0 translate-x-10 border-none'}`}
      style={{ 
        background: theme.surface, 
        borderColor: theme.stroke,
        color: theme.text
      }}
    >
      <div className="p-4 border-b flex-shrink-0" style={{ borderColor: theme.stroke }}>
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg bg-gradient-to-br ${getHeaderGradient()} text-white shadow-lg`}>
                    {getIcon()}
                </div>
                <div>
                    <h2 className="text-sm font-bold tracking-tight leading-none" style={{ color: theme.text }}>{getTitle()}</h2>
                    <span className="text-[10px] opacity-50 font-medium" style={{ color: theme.textSecondary }}>Panel View</span>
                </div>
            </div>
            <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-60 hover:opacity-100"
            >
            <PanelRightClose size={18} />
            </button>
        </div>
        
        {activeView === 'inspector' && selectedNode && (
            <div 
                className="flex items-center justify-between px-3 py-2.5 rounded-xl border bg-black/5 dark:bg-white/5"
                style={{ borderColor: theme.stroke }}
            >
                <div className="flex items-center gap-2 overflow-hidden">
                    <div className="p-1 rounded bg-blue-500/10 text-blue-500 shrink-0">
                        <Settings size={14} />
                    </div>
                    <div className="font-mono text-xs opacity-70 truncate" title={selectedNode.id}>{selectedNode.id}</div>
                </div>
                <button 
                onClick={() => onDeleteNode(selectedNode.id)}
                className="p-1.5 rounded hover:bg-red-500/10 hover:text-red-500 transition-colors opacity-60 hover:opacity-100 shrink-0"
                title={t.delete}
                >
                <Trash2 size={14} />
                </button>
            </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
         {renderContent()}
      </div>
    </div>
  );
};