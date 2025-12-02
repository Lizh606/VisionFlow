
import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Inspector } from './Inspector';
import { WorkflowCanvas } from './WorkflowCanvas';
import { NodeLibraryPopover } from './NodeLibraryModal'; 
import { INITIAL_NODES, INITIAL_CONNECTIONS } from '../constants';
import { ThemeColors, ThemeMode, Node, NodeType, Connection, Language } from '../types';
import { Plus } from 'lucide-react';

interface WorkflowEditorProps {
    theme: ThemeColors;
    mode: ThemeMode;
    language: Language;
}

export const WorkflowEditor: React.FC<WorkflowEditorProps> = ({ theme, mode, language }) => {
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
  const [connections, setConnections] = useState<Connection[]>(INITIAL_CONNECTIONS);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState<{ x: number, y: number } | null>(null);
  const [pendingNodeAdd, setPendingNodeAdd] = useState<{ sourceId: string; direction: 'top' | 'right' | 'bottom' | 'left' } | null>(null);

  useEffect(() => {
    setIsInspectorOpen(!!selectedNodeId);
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
    // Default position for popover
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
    // Vertical Layout Offsets
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

    // Logic for connecting nodes based on direction in vertical flow
    // If adding BOTTOM, Source(Out) -> New(In)
    // If adding TOP, New(Out) -> Source(In)
    
    if (pendingNodeAdd.direction === 'bottom') {
      newConnection = {
        id: connId,
        sourceNodeId: sourceNode.id,
        sourceHandle: 'out-1',
        targetNodeId: newNode.id,
        targetHandle: 'in-1'
      };
    } else if (pendingNodeAdd.direction === 'top') {
      newConnection = {
        id: connId,
        sourceNodeId: newNode.id,
        sourceHandle: 'out-1',
        targetNodeId: sourceNode.id,
        targetHandle: 'in-1'
      };
    } else if (pendingNodeAdd.direction === 'right') {
      // Branching out: Source(Out) -> New(In)
       newConnection = {
        id: connId,
        sourceNodeId: sourceNode.id,
        sourceHandle: 'out-1',
        targetNodeId: newNode.id,
        targetHandle: 'in-1'
      };
    }

    setNodes(prev => [...prev, newNode]);
    if (newConnection) {
      setConnections(prev => [...prev, newConnection]);
    }

    setIsPopoverOpen(false);
    setPendingNodeAdd(null);
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || null;

  return (
    <div 
        className="flex-1 flex overflow-hidden relative"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
    >
        <Sidebar 
          theme={theme} 
          mode={mode} 
          language={language}
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
        />
        
        <div className="flex-1 relative h-full flex flex-col">
           {!isSidebarOpen && (
             <button
               onClick={() => setIsSidebarOpen(true)}
               className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-3 rounded-full font-semibold shadow-xl hover:scale-105 transition-all duration-200 group"
               style={{ 
                 background: theme.primary, 
                 color: '#fff',
                 boxShadow: `0 8px 20px -6px ${theme.primary}80`
               }}
             >
               <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
               <span>Add Node</span>
             </button>
           )}

           <WorkflowCanvas 
            theme={theme}
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
        
        <Inspector 
          theme={theme}
          language={language}
          selectedNode={selectedNode}
          isOpen={isInspectorOpen} 
          onUpdateNode={handleUpdateNode}
          onDeleteNode={handleDeleteNode}
          onClose={() => setIsInspectorOpen(false)}
        />

      <NodeLibraryPopover 
        theme={theme} 
        language={language}
        isOpen={isPopoverOpen} 
        position={popoverPosition}
        onClose={() => setIsPopoverOpen(false)}
        onSelect={handleSelectNodeFromPopover}
      />
    </div>
  );
};
