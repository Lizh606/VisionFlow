import React, { useState, useEffect } from 'react';
import { ThemeColors, Language, NodeType, ThemeMode } from '../../types';
import { translations } from '../../translations';
import { 
  X, Search, Box, ScanFace, Activity, BrainCircuit, Type, FileText, Star, Play, Scan
} from 'lucide-react';

interface ModelLibraryModalProps {
  theme: ThemeColors;
  mode: ThemeMode;
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: NodeType) => void;
}

const MODEL_TYPES = [
  { 
    id: 'detection', 
    type: 'detection', 
    label: 'Object Detection', 
    desc: 'Predict the location of objects with bounding boxes.',
    icon: ScanFace, 
    color: '#8B5CF6',
    popular: true,
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1000&q=80'
  },
  { 
    id: 'segmentation', 
    type: 'detection', 
    label: 'Instance Segmentation', 
    desc: 'Predict the shape, size, and location of objects.',
    icon: Box, 
    color: '#F97316',
    popular: true,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80'
  },
  { 
    id: 'classification', 
    type: 'classifier', 
    label: 'Single-Label Classification', 
    desc: 'Apply a single tag to an image.',
    icon: BrainCircuit, 
    color: '#6366F1',
    popular: false,
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1000&q=80'
  },
  { 
    id: 'multi-class', 
    type: 'classifier', 
    label: 'Multi-Label Classification', 
    desc: 'Apply multiple tags to an image.',
    icon: Type, 
    color: '#EC4899',
    popular: false,
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80'
  },
  { 
    id: 'pose', 
    type: 'pose', 
    label: 'Keypoint Detection', 
    desc: 'Predict skeletons on objects.',
    icon: Activity, 
    color: '#14B8A6',
    popular: false,
    image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=1000&q=80'
  },
  { 
    id: 'ocr', 
    type: 'detection', 
    label: 'OCR / Text Recognition', 
    desc: 'Detect and recognize text in images.',
    icon: FileText, 
    color: '#3B82F6',
    popular: true,
    image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&w=1000&q=80'
  },
];

export const ModelLibraryModal: React.FC<ModelLibraryModalProps> = ({ 
  theme, 
  mode,
  language, 
  isOpen, 
  onClose, 
  onSelect 
}) => {
  const [activeTab, setActiveTab] = useState<'types' | 'custom' | 'public'>('types');
  const [selectedModelId, setSelectedModelId] = useState<string>('detection');
  const [searchTerm, setSearchTerm] = useState('');

  const t = translations[language].modelLibrary;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectedModel = MODEL_TYPES.find(m => m.id === selectedModelId) || MODEL_TYPES[0];

  const containerBg = mode === 'dark' ? theme.surface : '#ffffff';
  const rightPanelBg = mode === 'dark' ? 'transparent' : theme.background;
  const borderColor = theme.stroke;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-sm bg-black/40 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-5xl h-[650px] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative transition-all border"
        style={{ 
            background: containerBg, 
            borderColor: borderColor,
            color: theme.text,
            boxShadow: mode === 'dark' ? '0 0 50px -10px rgba(0,0,0,0.5)' : '0 20px 40px -10px rgba(0,0,0,0.1)'
        }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0" style={{ borderColor: borderColor }}>
          <div className="flex items-center gap-4">
             <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
                <BrainCircuit size={20} />
             </div>
             <h2 className="text-lg font-bold tracking-tight">{t.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div 
          className="px-6 border-b shrink-0" 
          style={{ 
            borderColor: borderColor,
            background: 'transparent'
          }}
        >
           <div className="flex gap-8">
             {['types', 'custom', 'public'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`py-3 text-xs font-bold uppercase tracking-wider relative transition-colors ${
                     activeTab === tab ? 'text-blue-500' : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{ color: activeTab === tab ? theme.primary : theme.text }}
                >
                  {t.tabs[tab as keyof typeof t.tabs]}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t-full shadow-[0_-2px_8px_rgba(59,130,246,0.5)]" />
                  )}
                </button>
             ))}
           </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          
          <div 
             className="w-2/5 border-r flex flex-col" 
             style={{ 
               borderColor: borderColor, 
               background: 'transparent' 
             }}
          >
             <div className="p-4 shrink-0">
               <div 
                 className="relative flex items-center px-3 py-2.5 rounded-xl border shadow-sm transition-all focus-within:ring-2 ring-blue-500/20"
                 style={{ 
                   background: mode === 'dark' ? 'rgba(0,0,0,0.2)' : theme.background, 
                   borderColor: borderColor 
                  }}
               >
                 <Search size={16} className="opacity-40 mr-2" />
                 <input 
                   type="text" 
                   placeholder={t.searchPlaceholder}
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="bg-transparent outline-none w-full text-sm font-medium placeholder-opacity-50"
                   style={{ color: theme.text }}
                 />
               </div>
             </div>
             
             <div className="flex-1 overflow-y-auto p-2 custom-scrollbar space-y-1">
                {MODEL_TYPES.filter(m => m.label.toLowerCase().includes(searchTerm.toLowerCase())).map(model => (
                   <button
                     key={model.id}
                     onClick={() => setSelectedModelId(model.id)}
                     className={`w-full p-3 rounded-xl flex items-start gap-4 text-left transition-all border ${
                       selectedModelId === model.id 
                         ? 'border-blue-500/50 bg-blue-500/10' 
                         : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5'
                     }`}
                     style={{ 
                         borderColor: selectedModelId === model.id ? theme.primary : 'transparent',
                         background: selectedModelId === model.id ? `${theme.primary}15` : undefined
                     }}
                   >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden"
                        style={{ 
                          background: `${model.color}15`,
                          color: model.color,
                          boxShadow: selectedModelId === model.id ? `0 0 15px -3px ${model.color}40` : 'none'
                        }}
                      >
                         <model.icon size={20} />
                         {selectedModelId === model.id && (
                             <div className="absolute inset-0 bg-current opacity-10" />
                         )}
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-bold truncate">{model.label}</span>
                            {model.popular && (
                               <div className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-yellow-500/10 text-yellow-500 flex items-center gap-0.5 shrink-0">
                                 <Star size={8} fill="currentColor" />
                                 {t.popular}
                               </div>
                            )}
                         </div>
                         <p className="text-xs opacity-60 line-clamp-2 leading-relaxed">
                            {model.desc}
                         </p>
                      </div>
                   </button>
                ))}
             </div>
          </div>

          <div 
            className="w-3/5 p-6 flex flex-col relative overflow-hidden"
            style={{ 
              background: rightPanelBg 
            }}
          >
              <div 
                 className="absolute inset-0 pointer-events-none opacity-[0.03]"
                 style={{ 
                    backgroundImage: `linear-gradient(${theme.text} 1px, transparent 1px), linear-gradient(90deg, ${theme.text} 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                 }}
              />

              <div className="flex-1 w-full rounded-xl overflow-hidden relative shadow-2xl border group shrink-0" style={{ borderColor: borderColor }}>
                 <div className="absolute inset-0 bg-black">
                    <img 
                       src={selectedModel.image} 
                       alt={selectedModel.label}
                       className="w-full h-full object-cover opacity-80"
                    />
                 </div>
                 
                 <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="w-full h-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)] absolute top-0 animate-scan" />
                    <style>{`
                        @keyframes scan {
                            0% { top: 0%; opacity: 0; }
                            10% { opacity: 1; }
                            90% { opacity: 1; }
                            100% { top: 100%; opacity: 0; }
                        }
                        .animate-scan {
                            animation: scan 3s linear infinite;
                        }
                    `}</style>
                 </div>
                 
                 <div className="absolute top-4 left-4 flex flex-col gap-1">
                    <div className="text-[10px] font-mono text-blue-400 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-blue-500/30">
                        LIVE FEED
                    </div>
                    <div className="text-[10px] font-mono text-white/60 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                        CAM_01
                    </div>
                 </div>

                 <div className="absolute inset-0">
                    <div className="absolute top-[20%] left-[15%] w-[20%] h-[30%] border border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                       <div className="absolute -top-5 left-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 flex items-center gap-1">
                          <Scan size={10} /> Person 0.98
                       </div>
                       <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-red-500"></div>
                       <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-red-500"></div>
                    </div>
                    <div className="absolute top-[40%] right-[20%] w-[25%] h-[20%] border border-blue-500/80 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                        <div className="absolute -top-5 left-0 bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 flex items-center gap-1">
                          <Scan size={10} /> Car 0.85
                       </div>
                       <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-blue-500"></div>
                       <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-blue-500"></div>
                    </div>
                 </div>

                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl scale-100 hover:scale-110 transition-transform cursor-pointer">
                        <Play size={20} fill="currentColor" className="ml-1" />
                    </div>
                 </div>
              </div>
          </div>
        </div>

        <div 
          className="p-4 border-t flex justify-end gap-3 shrink-0" 
          style={{ borderColor: borderColor, background: containerBg }}
        >
            <button 
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10"
              style={{ color: theme.textSecondary }}
            >
              {t.cancel}
            </button>
            <button 
              onClick={() => {
                  onSelect(selectedModel.type as NodeType);
                  onClose();
              }}
              className="px-8 py-2.5 rounded-xl font-bold text-sm text-white shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
            >
              {t.addModel}
            </button>
        </div>

      </div>
    </div>
  );
};