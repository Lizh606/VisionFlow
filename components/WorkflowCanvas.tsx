
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ThemeColors, Node, Connection, Position, Language } from '../types';
import { NodeComponent } from './Node';
import { ConnectionLine } from './Connection';
import { Plus, Minus, Scan, Map } from 'lucide-react';

interface WorkflowCanvasProps {
  theme: ThemeColors;
  language: Language;
  nodes: Node[];
  connections: Connection[];
  selectedNodeId: string | null;
  onNodeSelect: (id: string | null) => void;
  onNodesChange: (nodes: Node[]) => void;
  onAddNode: (e: React.MouseEvent, sourceNodeId: string, direction: 'top' | 'right' | 'bottom' | 'left') => void;
  onConnect: (params: { sourceNodeId: string; sourceHandle: string; targetNodeId: string; targetHandle: string }) => void;
}

// CONSTANTS matching Node.tsx
const NODE_WIDTH = 240;
const NODE_HEIGHT = 140;

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({ 
  theme,
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

    // Use event target data attributes to identify which handle was clicked (top/bottom/left/right)
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
        // Fallback default
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

  // --- Toolbar Handlers ---

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.2));

  const handleFitView = () => {
    if (nodes.length === 0 || !canvasRef.current) return;

    // Calculate bounds
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    nodes.forEach(n => {
      minX = Math.min(minX, n.position.x);
      maxX = Math.max(maxX, n.position.x + NODE_WIDTH);
      minY = Math.min(minY, n.position.y);
      maxY = Math.max(maxY, n.position.y + NODE_HEIGHT);
    });

    // Add padding
    const PADDING = 100;
    const contentWidth = maxX - minX + PADDING * 2;
    const contentHeight = maxY - minY + PADDING * 2;

    const { width: canvasWidth, height: canvasHeight } = canvasRef.current.getBoundingClientRect();
    
    const zoom = Math.min(canvasWidth / contentWidth, canvasHeight / contentHeight, 1);
    
    // Center logic
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

      // Define handle coordinates for Source
      const sPos = source.position;
      const sHandles = {
          bottom: { x: sPos.x + NODE_WIDTH / 2, y: sPos.y + NODE_HEIGHT },
          right: { x: sPos.x + NODE_WIDTH, y: sPos.y + NODE_HEIGHT / 2 },
          left: { x: sPos.x, y: sPos.y + NODE_HEIGHT / 2 },
          top: { x: sPos.x + NODE_WIDTH / 2, y: sPos.y }
      };

      // Define handle coordinates for Target
      const tPos = target.position;
      const tHandles = {
          top: { x: tPos.x + NODE_WIDTH / 2, y: tPos.y },
          left: { x: tPos.x, y: tPos.y + NODE_HEIGHT / 2 },
          right: { x: tPos.x + NODE_WIDTH, y: tPos.y + NODE_HEIGHT / 2 },
          bottom: { x: tPos.x + NODE_WIDTH / 2, y: tPos.y + NODE_HEIGHT }
      };

      // Smart Wiring Logic
      const pairs = [
          { start: sHandles.bottom, end: tHandles.top },     // Vertical Down
          { start: sHandles.right, end: tHandles.left },     // Horizontal Right
          { start: sHandles.left, end: tHandles.right },     // Horizontal Left (Feedback)
          { start: sHandles.top, end: tHandles.bottom },     // Vertical Up (Feedback)
          
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

    // Calculate bounding box for minimap mapping
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
    
    // Minimap dimensions
    const mapWidth = 192; // w-48
    const mapHeight = 144; // h-36
    
    const scaleX = mapWidth / worldWidth;
    const scaleY = mapHeight / worldHeight;
    const mapScale = Math.min(scaleX, scaleY);

    // Viewport calculation (what we currently see)
    // Canvas Viewport in World Coords:
    // Left = -offset.x / scale
    // Width = clientWidth / scale
    let viewportX = 0, viewportY = 0, viewportW = 0, viewportH = 0;
    
    if (canvasRef.current) {
       const { width, height } = canvasRef.current.getBoundingClientRect();
       viewportX = -offset.x / scale;
       viewportY = -offset.y / scale;
       viewportW = width / scale;
       viewportH = height / scale;
    }

    return (
      <div 
        className="absolute bottom-20 right-6 w-48 h-36 rounded-lg shadow-xl border overflow-hidden backdrop-blur-md transition-all duration-200 z-40"
        style={{ 
          background: theme.surface, 
          borderColor: theme.stroke,
          opacity: 0.95
        }}
      >
        <div className="relative w-full h-full">
           {/* Nodes on Map */}
           {nodes.map(node => (
             <div 
               key={node.id}
               className="absolute rounded-sm"
               style={{
                 left: (node.position.x - minX + padding) * mapScale,
                 top: (node.position.y - minY + padding) * mapScale,
                 width: NODE_WIDTH * mapScale,
                 height: NODE_HEIGHT * mapScale,
                 background: theme.primary,
                 opacity: 0.6
               }}
             />
           ))}
           
           {/* Viewport Indicator */}
           <div 
             className="absolute border-2 border-red-500 rounded-sm pointer-events-none"
             style={{
               left: (viewportX - minX + padding) * mapScale,
               top: (viewportY - minY + padding) * mapScale,
               width: Math.max(viewportW * mapScale, 0),
               height: Math.max(viewportH * mapScale, 0),
             }}
           />
        </div>
      </div>
    );
  };

  const ButtonBase = ({ onClick, icon: Icon, title }: any) => (
     <button 
        onClick={onClick}
        className="p-2 hover:bg-black/5 dark:hover:bg-white/10 transition-colors rounded-lg flex items-center justify-center"
        style={{ color: theme.text }}
        title={title}
     >
       <Icon size={18} />
     </button>
  );

  return (
    <div 
      ref={canvasRef}
      className="flex-1 relative overflow-hidden"
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
      
      {/* Zoom Level Indicator */}
      <div className="absolute bottom-6 left-6 flex gap-2">
         <div className="px-3 py-1 rounded bg-black/10 backdrop-blur text-xs font-mono font-bold" style={{ color: theme.textSecondary }}>
            {Math.round(scale * 100)}%
         </div>
      </div>

      {/* Toolbar & Minimap */}
      {renderMinimap()}
      
      <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-50">
         <button 
           onClick={() => setShowMinimap(!showMinimap)}
           className="p-2.5 rounded-xl shadow-lg border hover:scale-105 active:scale-95 transition-all bg-white dark:bg-gray-800"
           style={{ 
             borderColor: theme.stroke,
             color: showMinimap ? theme.primary : theme.textSecondary 
            }}
           title="Toggle Minimap"
         >
           <Map size={20} strokeWidth={2.5} />
         </button>

         <div 
            className="flex flex-col gap-1 p-1.5 rounded-xl shadow-lg border backdrop-blur-md"
            style={{ 
              background: theme.surface,
              borderColor: theme.stroke 
            }}
         >
            <ButtonBase onClick={handleZoomIn} icon={Plus} title="Zoom In" />
            <ButtonBase onClick={handleZoomOut} icon={Minus} title="Zoom Out" />
            <div className="h-[1px] w-full my-0.5" style={{ background: theme.stroke }} />
            <ButtonBase onClick={handleFitView} icon={Scan} title="Fit View" />
         </div>
      </div>

    </div>
  );
};
