
import React from 'react';
import { ThemeColors, Node, Language } from '../types';
import { Settings, Trash2, PanelRightClose } from 'lucide-react';
import { translations } from '../translations';

interface InspectorProps {
  theme: ThemeColors;
  language: Language;
  selectedNode: Node | null;
  isOpen: boolean;
  onUpdateNode: (id: string, data: Partial<Node['data']>) => void;
  onDeleteNode: (id: string) => void;
  onClose: () => void;
}

export const Inspector: React.FC<InspectorProps> = ({ 
  theme, 
  language,
  selectedNode, 
  isOpen, 
  onUpdateNode, 
  onDeleteNode,
  onClose
}) => {
  const showPanel = isOpen && selectedNode;
  const t = translations[language].inspector;

  return (
    <div 
      className={`border-l flex flex-col z-20 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] whitespace-nowrap overflow-hidden ${showPanel ? 'w-80 opacity-100' : 'w-0 opacity-0 border-none'}`}
      style={{ 
        background: theme.surface, 
        borderColor: theme.stroke,
        color: theme.text
      }}
    >
      {selectedNode && (
        <>
          {/* Header - Unified Style with Sidebar */}
          <div className="p-4 border-b flex-shrink-0" style={{ borderColor: theme.stroke }}>
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/20">
                     <Settings size={16} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold tracking-tight leading-none" style={{ color: theme.text }}>{t.title}</h2>
                    <span className="text-[10px] opacity-50 font-medium" style={{ color: theme.textSecondary }}>Properties</span>
                  </div>
               </div>
               <button 
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-60 hover:opacity-100"
              >
                <PanelRightClose size={18} />
              </button>
            </div>
            
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
          </div>

          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-6">
            {/* Main Info */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold opacity-50 uppercase block">{t.label}</label>
                <input 
                  type="text" 
                  value={selectedNode.data.label}
                  onChange={(e) => onUpdateNode(selectedNode.id, { label: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-sm border focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-medium"
                  style={{ 
                    background: theme.background, 
                    borderColor: theme.stroke,
                    color: theme.text 
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold opacity-50 uppercase block">{t.description}</label>
                <textarea 
                  value={selectedNode.data.description || ''}
                  onChange={(e) => onUpdateNode(selectedNode.id, { description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl text-sm border focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                  style={{ 
                    background: theme.background, 
                    borderColor: theme.stroke,
                    color: theme.text 
                  }}
                />
              </div>
            </div>

            <div className="h-[1px] w-full" style={{ background: theme.stroke }} />

            {/* Configs */}
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
                     
                     <div className="space-y-2">
                       <div className="flex justify-between text-xs font-medium opacity-80">
                          <span>{t.iouThreshold}</span>
                          <span>0.45</span>
                       </div>
                       <div className="h-1.5 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full bg-purple-500 w-[45%] rounded-full"></div>
                       </div>
                     </div>
                   </div>
                 )}

                 {selectedNode.type === 'input' && (
                    <div className="text-xs opacity-70 grid grid-cols-2 gap-3">
                        <div className="p-2 rounded bg-black/5 dark:bg-white/5 border border-transparent">
                            <span className="block opacity-60 mb-1">{t.resolution}</span>
                            <span className="font-mono font-bold">1080p</span>
                        </div>
                        <div className="p-2 rounded bg-black/5 dark:bg-white/5 border border-transparent">
                            <span className="block opacity-60 mb-1">{t.fps}</span>
                            <span className="font-mono font-bold">30</span>
                        </div>
                    </div>
                 )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
