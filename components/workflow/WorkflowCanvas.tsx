import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ThemeColors, Node, Connection, Position, Language, ThemeMode, NodeType } from '../../types';
import { NodeComponent } from './Node';
import { ConnectionLine } from './Connection';
import { Plus, Minus, Scan, Map } from 'lucide-react';

interface WorkflowCanvasProps {
  theme: ThemeColors;
  mode: ThemeMode;
  language: Language;
  nodes: Node[];
  connections: Connection[];
  selectedNodeId: string | null;
  onNodeSelect: (id: string | null) => void;
  onNodesChange: (nodes: Node[]) => void;
  onAddNode: (e: React.MouseEvent, sourceNodeId: string, direction: 'top' | 'right' | 'bottom' | 'left') => void;
  onConnect: (params: { sourceNodeId: string; sourceHandle: string; targetNodeId: string; targetHandle: string }) => void;
}

const NODE_WIDTH = 240;
const NODE_HEIGHT = 140;

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

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({ 
  theme,
  mode,
  language,
  nodes, 
  connections, 
  selectedNodeId, 
  onNodeSelect, 
  onNodesChange, 
  onAddNode,
  onConnect
}) => {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [isDraggingNode, setIsDraggingNode] = useState<string | null>(null);
  const [showMinimap, setShowMinimap] = useState(true);
  
  const [tempConnection, setTempConnection] = useState<{
    startPos: Position;
    currentPos: Position;
    sourceNodeId: string;
    sourceHandle: string;
  } | null>(null);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<Position>({ x: 0, y: 0 });
  const nodeDragStartRef = useRef<Position>({ x: 0, y: 0 });

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomFactor = 0.05;
      const newScale = Math.min(Math.max(scale - Math.sign(e.deltaY) * zoomFactor, 0.2), 3);
      setScale(newScale);
    } else {
      setOffset(prev => ({
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY
      }));
    }
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && !isDraggingNode && !tempConnection)) { 
      setIsDraggingCanvas(true);
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      onNodeSelect(null);
    }
  };

  const handleNodeMouseDown = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setIsDraggingNode(id);
    onNodeSelect(id);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    
    const node = nodes.find(n => n.id === id);
    if (node) {
      nodeDragStartRef.current = { ...node.position };
    }
  }, [nodes, onNodeSelect]);

  const handleConnectStart = useCallback((e: React.MouseEvent, nodeId: string, handleId: string, type: 'source' | 'target') => {
    if (type !== 'source') return;
    e.stopPropagation();
    
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    const handlePos = (e.target as HTMLElement).getAttribute('data-handlepos');
    
    let startX = node.position.x;
    let startY = node.position.y;

    if (handlePos === 'top') {
        startX += NODE_WIDTH / 2;
    } else if (handlePos === 'bottom') {
        startX += NODE_WIDTH / 2;
        startY += NODE_HEIGHT;
    } else if (handlePos === 'left') {
        startY += NODE_HEIGHT / 2;
    } else if (handlePos === 'right') {
        startX += NODE_WIDTH;
        startY += NODE_HEIGHT / 2;
    } else {
        startX += NODE_WIDTH / 2;
        startY += NODE_HEIGHT;
    }

    setTempConnection({
      startPos: { x: startX, y: startY },
      currentPos: { x: startX, y: startY },
      sourceNodeId: nodeId,
      sourceHandle: handleId
    });
  }, [nodes]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingNode) {
        const totalDx = (e.clientX - dragStartRef.current.x) / scale;
        const totalDy = (e.clientY - dragStartRef.current.y) / scale;
        
        onNodesChange(nodes.map(n => {
             if(n.id === isDraggingNode) {
                 return {
                     ...n,
                     position: {
                         x: nodeDragStartRef.current.x + totalDx,
                         y: nodeDragStartRef.current.y + totalDy
                     }
                 }
             }
             return n;
         }));
      } 
      else if (isDraggingCanvas) {
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;
        setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
        dragStartRef.current = { x: e.clientX, y: e.clientY };
      }
      else if (tempConnection && canvasRef.current) {
         const canvasRect = canvasRef.current.getBoundingClientRect();
         const x = (e.clientX - canvasRect.left - offset.x) / scale;
         const y = (e.clientY - canvasRect.top - offset.y) / scale;
         setTempConnection(prev => prev ? { ...prev, currentPos: { x, y } } : null);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (tempConnection) {
        const element = document.elementFromPoint(e.clientX, e.clientY);
        if (element) {
           const handleId = element.getAttribute('data-handleid');
           const nodeId = element.getAttribute('data-nodeid');
           const type = element.getAttribute('data-type');
           
           if (handleId && nodeId && type === 'target' && nodeId !== tempConnection.sourceNodeId) {
              onConnect({
                  sourceNodeId: tempConnection.sourceNodeId,
                  sourceHandle: tempConnection.sourceHandle,
                  targetNodeId: nodeId,
                  targetHandle: handleId
              });
           }
        }
        setTempConnection(null);
      }
      setIsDraggingCanvas(false);
      setIsDraggingNode(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingCanvas, isDraggingNode, tempConnection, scale, offset, nodes, onNodesChange, onConnect]);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.2));

  const handleFitView = () => {
    if (nodes.length === 0 || !canvasRef.current) return;

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    nodes.forEach(n => {
      minX = Math.min(minX, n.position.x);
      maxX = Math.max(maxX, n.position.x + NODE_WIDTH);
      minY = Math.min(minY, n.position.y);
      maxY = Math.max(maxY, n.position.y + NODE_HEIGHT);
    });

    const PADDING = 100;
    const contentWidth = maxX - minX + PADDING * 2;
    const contentHeight = maxY - minY + PADDING * 2;

    const { width: canvasWidth, height: canvasHeight } = canvasRef.current.getBoundingClientRect();
    
    const zoom = Math.min(canvasWidth / contentWidth, canvasHeight / contentHeight, 1);
    
    const contentCenterX = (minX + maxX) / 2;
    const contentCenterY = (minY + maxY) / 2;

    const newOffsetX = canvasWidth / 2 - contentCenterX * zoom;
    const newOffsetY = canvasHeight / 2 - contentCenterY * zoom;

    setScale(zoom);
    setOffset({ x: newOffsetX, y: newOffsetY });
  };

  const renderConnections = () => {
    return connections.map(conn => {
      const source = nodes.find(n => n.id === conn.sourceNodeId);
      const target = nodes.find(n => n.id === conn.targetNodeId);

      if (!source || !target) return null;

      const sPos = source.position;
      const sHandles = {
          bottom: { x: sPos.x + NODE_WIDTH / 2, y: sPos.y + NODE_HEIGHT },
          right: { x: sPos.x + NODE_WIDTH, y: sPos.y + NODE_HEIGHT / 2 },
          left: { x: sPos.x, y: sPos.y + NODE_HEIGHT / 2 },
          top: { x: sPos.x + NODE_WIDTH / 2, y: sPos.y }
      };

      const tPos = target.position;
      const tHandles = {
          top: { x: tPos.x + NODE_WIDTH / 2, y: tPos.y },
          left: { x: tPos.x, y: tPos.y + NODE_HEIGHT / 2 },
          right: { x: tPos.x + NODE_WIDTH, y: tPos.y + NODE_HEIGHT / 2 },
          bottom: { x: tPos.x + NODE_WIDTH / 2, y: tPos.y + NODE_HEIGHT }
      };

      const pairs = [
          { start: sHandles.bottom, end: tHandles.top },
          { start: sHandles.right, end: tHandles.left },
          { start: sHandles.left, end: tHandles.right },
          { start: sHandles.top, end: tHandles.bottom },
          { start: sHandles.bottom, end: tHandles.left },
          { start: sHandles.bottom, end: tHandles.right },
          { start: sHandles.right, end: tHandles.top },
          { start: sHandles.left, end: tHandles.top }
      ];

      let bestPair = pairs[0];
      let minDist = Infinity;

      pairs.forEach(pair => {
          const dx = pair.end.x - pair.start.x;
          const dy = pair.end.y - pair.start.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minDist) {
              minDist = dist;
              bestPair = pair;
          }
      });

      return (
        <ConnectionLine 
          key={conn.id}
          start={bestPair.start}
          end={bestPair.end}
          theme={theme}
          active={true}
        />
      );
    });
  };

  const renderMinimap = () => {
    if (!showMinimap || nodes.length === 0) return null;

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    nodes.forEach(n => {
      minX = Math.min(minX, n.position.x);
      maxX = Math.max(maxX, n.position.x + NODE_WIDTH);
      minY = Math.min(minY, n.position.y);
      maxY = Math.max(maxY, n.position.y + NODE_HEIGHT);
    });

    const padding = 100;
    const worldWidth = Math.max(maxX - minX + padding * 2, 1);
    const worldHeight = Math.max(maxY - minY + padding * 2, 1);
    
    const mapWidth = 240; 
    const mapHeight = 160;
    
    const scaleX = mapWidth / worldWidth;
    const scaleY = mapHeight / worldHeight;
    const mapScale = Math.min(scaleX, scaleY);

    const offsetX = (mapWidth - worldWidth * mapScale) / 2;
    const offsetY = (mapHeight - worldHeight * mapScale) / 2;

    let viewportX = 0, viewportY = 0, viewportW = 0, viewportH = 0;
    
    if (canvasRef.current) {
       const { width, height } = canvasRef.current.getBoundingClientRect();
       viewportX = -offset.x / scale;
       viewportY = -offset.y / scale;
       viewportW = width / scale;
       viewportH = height / scale;
    }

    const isDark = mode === 'dark';
    const bg = isDark ? 'rgba(15, 18, 26, 0.85)' : 'rgba(255, 255, 255, 0.85)';
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    const frameColor = theme.primary;

    return (
      <div 
        className="absolute bottom-6 z-40 transition-all duration-300 animate-in slide-in-from-bottom-2 fade-in"
        style={{ 
          right: '80px', 
          width: mapWidth,
          height: mapHeight,
          background: bg,
          borderRadius: 12,
          backdropFilter: 'blur(8px)',
          boxShadow: isDark 
            ? '0 0 0 1px rgba(255,255,255,0.1), 0 10px 30px -5px rgba(0,0,0,0.5)'
            : '0 0 0 1px rgba(0,0,0,0.05), 0 10px 20px -5px rgba(0,0,0,0.1)',
        }}
      >
        <div className="relative w-full h-full overflow-hidden rounded-[12px]">
           <div 
              className="absolute inset-0 pointer-events-none opacity-50" 
              style={{ 
                 backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
                 backgroundSize: '20px 20px',
              }} 
           />
           <div className="absolute top-1/2 left-0 right-0 h-[1px]" style={{ background: gridColor }} />
           <div className="absolute left-1/2 top-0 bottom-0 w-[1px]" style={{ background: gridColor }} />

           {nodes.map(node => {
             const color = getNodeColor(node.type, theme.node);
             const isSelected = selectedNodeId === node.id;
             return (
               <div 
                 key={node.id}
                 className="absolute transition-all duration-300 rounded-[2px]"
                 style={{
                   left: offsetX + (node.position.x - minX + padding) * mapScale,
                   top: offsetY + (node.position.y - minY + padding) * mapScale,
                   width: Math.max(NODE_WIDTH * mapScale, 6),
                   height: Math.max(NODE_HEIGHT * mapScale, 4),
                   background: isSelected ? color : (isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'),
                   boxShadow: isSelected ? `0 0 8px ${color}` : 'none',
                   zIndex: isSelected ? 10 : 1
                 }}
               />
             );
           })}
           
           <div 
             className="absolute pointer-events-none transition-all duration-100 ease-linear border-2"
             style={{
               left: offsetX + (viewportX - minX + padding) * mapScale,
               top: offsetY + (viewportY - minY + padding) * mapScale,
               width: Math.max(viewportW * mapScale, 0),
               height: Math.max(viewportH * mapScale, 0),
               borderColor: frameColor,
               boxShadow: `0 0 15px ${frameColor}30, inset 0 0 10px ${frameColor}10`,
               borderRadius: 4
             }}
           >
              <div className="absolute -top-1 -left-1 w-2 h-2 border-l-2 border-t-2 bg-transparent" style={{ borderColor: frameColor }} />
              <div className="absolute -top-1 -right-1 w-2 h-2 border-r-2 border-t-2 bg-transparent" style={{ borderColor: frameColor }} />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-l-2 border-b-2 bg-transparent" style={{ borderColor: frameColor }} />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r-2 border-b-2 bg-transparent" style={{ borderColor: frameColor }} />
           </div>
        </div>
      </div>
    );
  };

  const ButtonBase = ({ onClick, icon: Icon, title, active }: any) => (
     <button 
        onClick={onClick}
        className={`p-2.5 transition-colors rounded-xl flex items-center justify-center ${active ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-black/5 dark:hover:bg-white/10'}`}
        style={{ color: active ? '#fff' : theme.text }}
        title={title}
     >
       <Icon size={18} strokeWidth={2.5} />
     </button>
  );

  return (
    <div 
      ref={canvasRef}
      className="flex-1 relative overflow-hidden h-full"
      style={{ 
        background: theme.background,
        cursor: isDraggingCanvas ? 'grabbing' : 'default' 
      }}
      onMouseDown={handleCanvasMouseDown}
      onWheel={handleWheel}
    >
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 dot-pattern"
        style={{ 
          '--dot-color': theme.stroke,
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transformOrigin: '0 0'
        } as React.CSSProperties}
      />
      <div 
        className="absolute inset-0 w-full h-full origin-top-left"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`
        }}
      >
        <svg className="absolute inset-0 w-[5000px] h-[5000px] pointer-events-none overflow-visible">
          {renderConnections()}
          {tempConnection && (
            <ConnectionLine 
              start={tempConnection.startPos}
              end={tempConnection.currentPos}
              theme={theme}
              active={false}
            />
          )}
        </svg>
        <div className="absolute inset-0">
          {nodes.map(node => (
            <NodeComponent 
              key={node.id}
              node={node}
              theme={theme}
              mode={mode}
              language={language}
              isSelected={selectedNodeId === node.id}
              onMouseDown={handleNodeMouseDown}
              onAddClick={onAddNode}
              onConnectStart={handleConnectStart}
              scale={scale}
            />
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-6 left-6 flex gap-2 z-40">
         <div className="px-3 py-1 rounded bg-black/10 backdrop-blur text-xs font-mono font-bold" style={{ color: theme.textSecondary }}>
            {Math.round(scale * 100)}%
         </div>
      </div>

      {renderMinimap()}
      
      <div 
         className="absolute bottom-6 right-6 flex flex-col gap-2 z-50"
      >
         <div 
            className="flex flex-col items-center gap-1 p-1.5 rounded-2xl shadow-lg border backdrop-blur-md"
            style={{ 
              background: theme.surface,
              borderColor: theme.stroke 
            }}
         >
            <ButtonBase onClick={handleZoomIn} icon={Plus} title="Zoom In" />
            <ButtonBase onClick={handleZoomOut} icon={Minus} title="Zoom Out" />
            <div className="w-5 h-[1px] my-0.5" style={{ background: theme.stroke }} />
            <ButtonBase onClick={handleFitView} icon={Scan} title="Fit View" />
         </div>
         
         <button 
           onClick={() => setShowMinimap(!showMinimap)}
           className={`p-3 rounded-2xl shadow-lg border hover:scale-105 active:scale-95 transition-all backdrop-blur-md flex items-center justify-center ${showMinimap ? 'ring-2 ring-blue-500/20' : ''}`}
           style={{ 
             background: theme.surface,
             borderColor: theme.stroke,
             color: showMinimap ? theme.primary : theme.textSecondary 
            }}
           title="Toggle Minimap"
         >
           <Map size={20} strokeWidth={2.5} />
         </button>
      </div>

    </div>
  );
};