import React, { useState, useEffect } from 'react';
import { Inspector, RightPanelView } from './Inspector';
import { WorkflowCanvas } from './WorkflowCanvas';
import { NodeLibraryPopover } from './NodeLibraryModal'; 
import { ModelLibraryModal } from './ModelLibraryModal';
import { HistorySidebar } from './HistorySidebar';
import { INITIAL_NODES, INITIAL_CONNECTIONS } from '../../constants';
import { ThemeColors, ThemeMode, Node, NodeType, Connection, Language } from '../../types';
import { Plus, BrainCircuit, Layers, History, ChevronRight } from 'lucide-react';

interface WorkflowEditorProps {
    theme: ThemeColors;
    mode: ThemeMode;
    language: Language;
}

export const WorkflowEditor: React.FC<WorkflowEditorProps> = ({ theme, mode, language }) => {
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
  const [connections, setConnections] = useState<Connection[]>(INITIAL_CONNECTIONS);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  const [activePanel, setActivePanel] = useState<RightPanelView | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState<{ x: number, y: number } | null>(null);
  const [pendingNodeAdd, setPendingNodeAdd] = useState<{ sourceId: string; direction: 'top' | 'right' | 'bottom' | 'left' } | null>(null);

  useEffect(() => {
    if (selectedNodeId) {
        setActivePanel('inspector');
    } else if (activePanel === 'inspector') {
        setActivePanel(null);
    }
  }, [selectedNodeId]);

  const handleUpdateNode = (id: string, data: Partial<Node['data']>) => {
    setNodes(prev => prev.map(n => 
      n.id === id ? { ...n, data: { ...n.data, ...data } } : n
    ));
  };

  const handleDeleteNode = (id: string) => {
    setNodes(prev => prev.filter(n => n.id !== id));
    setConnections(prev => prev.filter(c => c.sourceNodeId !== id && c.targetNodeId !== id));
    setSelectedNodeId(null);
    setActivePanel(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('application/reactflow/type');
    if (!type) return;

    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: type as any,
      position: { x: e.clientX - 300, y: e.clientY - 100 }, 
      data: { 
        label: `New ${type}`, 
        status: 'idle', 
        description: 'Configure this node' 
      },
      inputs: ['in-1'],
      outputs: ['out-1']
    };

    setNodes(prev => [...prev, newNode]);
  };

  const handleConnect = (params: { sourceNodeId: string; sourceHandle: string; targetNodeId: string; targetHandle: string }) => {
      const newConnection: Connection = {
          id: `c-${Date.now()}`,
          ...params
      };
      setConnections(prev => [...prev, newConnection]);
  };

  const handleAddNodeFromCanvas = (e: React.MouseEvent, sourceId: string, direction: 'top' | 'right' | 'bottom' | 'left') => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    let x = rect.right;
    let y = rect.bottom;

    if (direction === 'left') { x = rect.left - 270; y = rect.top; }
    if (direction === 'top') { y = rect.top - 200; x = rect.left; }
    if (direction === 'bottom') { y = rect.bottom + 10; x = rect.left; }
    if (direction === 'right') { x = rect.right + 10; y = rect.top; }

    setPopoverPosition({ x, y });
    setPendingNodeAdd({ sourceId, direction });
    setIsPopoverOpen(true);
  };

  const handleSelectNodeFromPopover = (type: NodeType) => {
    if (!pendingNodeAdd) return;

    const sourceNode = nodes.find(n => n.id === pendingNodeAdd.sourceId);
    if (!sourceNode) return;

    const newNodeId = `node-${Date.now()}`;
    const OFFSET_Y = 250; 
    const OFFSET_X = 350;

    let newPos = { ...sourceNode.position };

    switch (pendingNodeAdd.direction) {
      case 'bottom': newPos.y += OFFSET_Y; break;
      case 'top': newPos.y -= OFFSET_Y; break;
      case 'right': newPos.x += OFFSET_X; break;
      case 'left': newPos.x -= OFFSET_X; break;
    }

    const newNode: Node = {
      id: newNodeId,
      type: type,
      position: newPos,
      data: {
        label: `New ${type}`,
        status: 'idle',
        description: 'Newly added node'
      },
      inputs: ['in-1'],
      outputs: ['out-1']
    };

    let newConnection: Connection | null = null;
    const connId = `c-${Date.now()}`;
    
    if (pendingNodeAdd.direction === 'bottom') {
      newConnection = { id: connId, sourceNodeId: sourceNode.id, sourceHandle: 'out-1', targetNodeId: newNode.id, targetHandle: 'in-1' };
    } else if (pendingNodeAdd.direction === 'top') {
      newConnection = { id: connId, sourceNodeId: newNode.id, sourceHandle: 'out-1', targetNodeId: sourceNode.id, targetHandle: 'in-1' };
    } else if (pendingNodeAdd.direction === 'right') {
       newConnection = { id: connId, sourceNodeId: sourceNode.id, sourceHandle: 'out-1', targetNodeId: newNode.id, targetHandle: 'in-1' };
    }

    setNodes(prev => [...prev, newNode]);
    if (newConnection) {
      setConnections(prev => [...prev, newConnection]);
    }

    setIsPopoverOpen(false);
    setPendingNodeAdd(null);
  };

  const handleAddNodeFromPanel = (type: NodeType) => {
      const newNode: Node = {
        id: `node-${Date.now()}`,
        type: type,
        position: { x: 600, y: 500 }, 
        data: { 
            label: `New ${type}`, 
            status: 'idle', 
            description: 'Added from library' 
        },
        inputs: ['in-1'],
        outputs: ['out-1']
      };
      setNodes(prev => [...prev, newNode]);
  };

  const handleRestoreVersion = (versionId: string) => {
     console.log('Restoring version:', versionId);
     setIsHistoryOpen(false);
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || null;

  return (
    <div 
        className="flex-1 flex overflow-hidden relative"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
    >
        <div className="flex-1 relative h-full flex flex-col min-w-0">
           
           <div 
             className="absolute top-6 left-6 z-20 transition-transform duration-500 cubic-bezier(0.25, 1, 0.5, 1)"
             style={{ transform: isHistoryOpen ? 'translateX(320px)' : 'translateX(0)' }}
           >
               <button
                  onClick={() => setIsHistoryOpen(true)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl shadow-lg border backdrop-blur-md transition-all group hover:scale-105 active:scale-95 ${isHistoryOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                  style={{ 
                    background: theme.surface, 
                    borderColor: theme.stroke,
                    color: theme.text 
                  }}
               >
                   <History size={18} className="text-blue-500" />
                   <span className="font-semibold text-xs">History</span>
                   <ChevronRight size={14} className="opacity-40 group-hover:translate-x-0.5 transition-transform" />
               </button>
           </div>

           <div 
             className="absolute top-6 flex flex-col gap-3 z-20 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
             style={{ right: activePanel ? '24px' : '24px' }}
           >
                 <button
                   onClick={() => setActivePanel(activePanel === 'nodes' ? null : 'nodes')}
                   className={`flex items-center gap-2 px-4 py-3 rounded-full font-semibold shadow-xl transition-all duration-200 group border ${activePanel === 'nodes' ? 'ring-2 ring-offset-2 ring-blue-500' : 'hover:scale-105'}`}
                   style={{ 
                     background: theme.surface, 
                     color: theme.text,
                     borderColor: theme.stroke,
                     boxShadow: `0 8px 20px -6px rgba(0,0,0,0.1)`
                   }}
                 >
                   <Layers size={20} className="text-blue-500" />
                   <span>Add Node</span>
                 </button>

                 <button
                   onClick={() => setIsModelModalOpen(true)}
                   className="flex items-center gap-2 px-4 py-3 rounded-full font-semibold shadow-xl transition-all duration-200 group border hover:scale-105"
                   style={{ 
                     background: theme.surface, 
                     color: theme.text,
                     borderColor: theme.stroke
                   }}
                 >
                   <BrainCircuit size={20} className="text-purple-500" />
                   <span>Add Model</span>
                 </button>
           </div>

           <WorkflowCanvas 
            theme={theme}
            mode={mode}
            language={language}
            nodes={nodes}
            connections={connections}
            selectedNodeId={selectedNodeId}
            onNodeSelect={setSelectedNodeId}
            onNodesChange={setNodes}
            onAddNode={handleAddNodeFromCanvas}
            onConnect={handleConnect}
          />
        </div>

        <HistorySidebar 
           theme={theme}
           mode={mode}
           language={language}
           isOpen={isHistoryOpen}
           onClose={() => setIsHistoryOpen(false)}
           onRestore={handleRestoreVersion}
        />
        
        <Inspector 
          theme={theme}
          mode={mode}
          language={language}
          selectedNode={selectedNode}
          activeView={activePanel}
          onUpdateNode={handleUpdateNode}
          onDeleteNode={handleDeleteNode}
          onClose={() => {
              setActivePanel(null);
              setSelectedNodeId(null);
          }}
          onSelectNodeFromLibrary={handleAddNodeFromPanel}
          onSelectModelFromLibrary={handleAddNodeFromPanel}
        />

      <NodeLibraryPopover 
        theme={theme} 
        language={language}
        isOpen={isPopoverOpen} 
        position={popoverPosition}
        onClose={() => setIsPopoverOpen(false)}
        onSelect={handleSelectNodeFromPopover}
      />

      <ModelLibraryModal 
        theme={theme}
        mode={mode}
        language={language}
        isOpen={isModelModalOpen}
        onClose={() => setIsModelModalOpen(false)}
        onSelect={handleAddNodeFromPanel}
      />
    </div>
  );
};