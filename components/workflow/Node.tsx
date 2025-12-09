import React, { memo, useState } from 'react';
import { Node, ThemeColors, NodeType, Language, ThemeMode } from '../../types';
import { NodeIcon } from './NodeIcon';
import { MoreHorizontal, Plus } from 'lucide-react';
import { translations } from '../../translations';

interface NodeComponentProps {
  node: Node;
  theme: ThemeColors;
  mode: ThemeMode;
  language: Language;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent, id: string) => void;
  onAddClick: (e: React.MouseEvent, id: string, direction: 'top' | 'right' | 'bottom' | 'left') => void;
  onConnectStart: (e: React.MouseEvent, nodeId: string, handleId: string, type: 'source' | 'target') => void;
  scale: number;
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

export const NodeComponent: React.FC<NodeComponentProps> = memo(({ node, theme, mode, language, isSelected, onMouseDown, onAddClick, onConnectStart, scale }) => {
  const accentColor = getNodeColor(node.type, theme.node);
  const [isHovered, setIsHovered] = useState(false);
  
  const tNodes = translations[language].nodes;
  const tStatus = translations[language].status;
  
  const showControls = isSelected;

  const isInputNode = node.type === 'input';
  const isOutputNode = node.type === 'output';
  
  const showTop = !isInputNode;
  const showBottom = !isOutputNode;
  const showLeft = true;
  const showRight = true;

  const inputId = node.inputs[0] || 'in-1';
  const outputId = node.outputs[0] || 'out-1';

  const containerStyle = {
    background: theme.surface,
    boxShadow: isSelected 
      ? `0 10px 40px -10px ${accentColor}40` 
      : `0 1px 2px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.05), 0 0 0 1px ${theme.stroke}`,
  };

  const AddButton = ({ direction, className }: { direction: 'top' | 'right' | 'bottom' | 'left', className: string }) => {
    return (
      <button
        className={`absolute w-5 h-5 rounded-full flex items-center justify-center shadow-md transform transition-all duration-200 z-[60] border border-current hover:scale-110 hover:bg-current hover:text-white ${className} ${showControls ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}`}
        style={{ 
            backgroundColor: theme.surface,
            color: accentColor,
        }}
        onClick={(e) => {
          e.stopPropagation();
          onAddClick(e, node.id, direction);
        }}
        title={`Add node to ${direction}`}
      >
        <Plus size={12} strokeWidth={3} />
      </button>
    );
  };

  const Handle = ({ type, id, pos, className }: { type: 'source' | 'target', id: string, pos: 'top' | 'right' | 'bottom' | 'left', className: string }) => (
    <div 
      className={`absolute w-3 h-3 rounded-full border-[2px] transition-transform duration-200 hover:scale-150 z-[50] cursor-crosshair flex items-center justify-center ${className}`}
      style={{
        background: theme.background,
        borderColor: isSelected || isHovered ? accentColor : theme.textSecondary,
      }}
      data-nodeid={node.id}
      data-handleid={id}
      data-type={type}
      data-handlepos={pos}
      onMouseDown={(e) => {
        e.stopPropagation();
        onConnectStart(e, node.id, id, type);
      }}
    >
       <div className={`w-1 h-1 rounded-full ${isSelected || isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity`} style={{ background: accentColor }} />
    </div>
  );

  const renderMetadata = () => {
    if (node.type === 'input') return <span>1080p • 30FPS</span>;
    if (node.type === 'detection') return <span>4 Objects • 98%</span>;
    if (node.type === 'tracking') return <span>ID: #402 • Active</span>;
    if (node.type === 'output') return <span>1.2k Recs • DB</span>;
    return <span>Active</span>;
  };

  return (
    <div
      className="absolute group select-none"
      style={{
        transform: `translate(${node.position.x}px, ${node.position.y}px)`,
        cursor: 'grab',
        zIndex: isSelected ? 50 : 10,
      }}
      onMouseDown={(e) => onMouseDown(e, node.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative w-[240px] h-[140px] rounded-2xl overflow-hidden transition-all duration-300 flex flex-col"
        style={containerStyle}
      >
        <div 
          className={`absolute top-0 left-0 right-0 h-[3px] z-10 transition-opacity duration-300 ${isSelected ? 'opacity-0' : 'opacity-100'}`}
          style={{ 
            background: `linear-gradient(90deg, ${accentColor}00, ${accentColor}, ${accentColor}00)`
          }}
        />

        <div 
           className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 ${isSelected ? 'opacity-100' : 'opacity-0'}`}
           style={{
              padding: '2px', 
              background: `linear-gradient(135deg, ${accentColor}, ${mode === 'dark' ? '#ffffff' : '#000000'}20, ${accentColor})`,
              backgroundSize: '200% 200%',
              animation: 'borderFlow 3s ease infinite',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor'
           }}
        />
        <style>{`
          @keyframes borderFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>

        <div className="p-3 pb-0 flex items-start gap-3 relative z-10">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-inner"
            style={{ 
              background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}05)`,
              color: accentColor,
              boxShadow: `inset 0 0 0 1px ${accentColor}30`
            }}
          >
            <NodeIcon type={node.type} color={accentColor} size={20} />
          </div>

          <div className="flex-1 min-w-0 pt-0.5">
            <h3 
              className="font-bold text-sm leading-tight truncate tracking-tight"
              style={{ color: theme.text }}
            >
              {node.data.label}
            </h3>
            <p 
              className="text-[10px] font-bold uppercase tracking-wider mt-0.5"
              style={{ color: accentColor }}
            >
              {tNodes[node.type]?.label || node.type}
            </p>
          </div>

          <button 
             className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors -mr-1 -mt-1"
             style={{ color: theme.textSecondary }}
          >
             <MoreHorizontal size={18} />
          </button>
        </div>

        <div className="px-4 py-2 flex-1">
           <p 
              className="text-xs leading-relaxed line-clamp-2 font-medium opacity-70"
              style={{ color: theme.textSecondary }}
           >
              {node.data.description}
           </p>
        </div>

        <div 
           className="mt-auto px-4 py-2.5 border-t flex items-center justify-between text-[10px] font-mono font-medium"
           style={{ 
              borderColor: theme.stroke,
              background: isSelected ? `${accentColor}08` : 'transparent' 
           }}
        >
           <div className="flex items-center gap-1.5">
               <div className={`w-1.5 h-1.5 rounded-full ${node.data.status === 'running' ? 'animate-pulse' : ''}`} 
                    style={{ background: node.data.status === 'running' ? theme.node.green : theme.textSecondary }}
               />
               <span 
                 className="uppercase tracking-wider font-bold"
                 style={{ color: node.data.status === 'running' ? theme.node.green : theme.textSecondary }}
               >
                 {node.data.status ? tStatus[node.data.status] : tStatus.idle}
               </span>
           </div>

           <div className="flex items-center gap-1.5 opacity-60" style={{ color: theme.text }}>
              {renderMetadata()}
           </div>
        </div>
      </div>

      {showTop && (
        <>
          <Handle type="target" id={inputId} pos="top" className="left-1/2 -top-[6px] -translate-x-1/2" />
          <AddButton direction="top" className="-top-9 left-1/2 -translate-x-1/2" />
        </>
      )}

      {showBottom && (
        <>
          <Handle type="source" id={outputId} pos="bottom" className="left-1/2 -bottom-[6px] -translate-x-1/2" />
          <AddButton direction="bottom" className="-bottom-9 left-1/2 -translate-x-1/2" />
        </>
      )}

      {showLeft && (
        <>
          <Handle type="target" id={inputId} pos="left" className="top-1/2 -left-[6px] -translate-y-1/2" />
          <AddButton direction="left" className="-left-9 top-1/2 -translate-y-1/2" />
        </>
      )}

      {showRight && (
        <>
          <Handle type="source" id={outputId} pos="right" className="top-1/2 -right-[6px] -translate-y-1/2" />
          <AddButton direction="right" className="-right-9 top-1/2 -translate-y-1/2" />
        </>
      )}

    </div>
  );
});