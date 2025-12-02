
import { ThemeColors, Node, Connection, DraggableNode, Workflow } from './types';

export const LIGHT_THEME: ThemeColors = {
  primary: '#4A74FF',
  secondary: '#8AA8FF',
  background: '#F5F7FB',
  surface: '#FFFFFF',
  surfaceHighlight: '#F0F2F5',
  stroke: '#DCE1EB',
  text: '#111827',
  textSecondary: '#6B7280',
  node: {
    blue: '#3B82F6',
    orange: '#F97316',
    purple: '#8B5CF6',
    teal: '#14B8A6',
    green: '#10B981',
    red: '#EF4444',
    pink: '#EC4899',
    indigo: '#6366F1',
    cyan: '#06B6D4',
    yellow: '#F59E0B'
  }
};

export const DARK_THEME: ThemeColors = {
  primary: '#6E8CFF',
  secondary: '#A9B8FF',
  background: '#0F121A',
  surface: '#1A1F2B',
  surfaceHighlight: '#232936',
  stroke: '#2E3443',
  text: '#F3F4F6',
  textSecondary: '#9CA3AF',
  node: {
    blue: '#60A5FA',
    orange: '#FB923C',
    purple: '#A78BFA',
    teal: '#2DD4BF',
    green: '#34D399',
    red: '#F87171',
    pink: '#F472B6',
    indigo: '#818CF8',
    cyan: '#22D3EE',
    yellow: '#FBBF24'
  }
};

// Vertical Layout Coordinates (Center X approx 600)
export const INITIAL_NODES: Node[] = [
  {
    id: '1',
    type: 'input',
    position: { x: 600, y: 100 },
    data: { label: 'Video Source', description: 'RTSP Stream 01', status: 'running' },
    inputs: [],
    outputs: ['out-1']
  },
  {
    id: '2',
    type: 'detection',
    position: { x: 600, y: 350 },
    data: { label: 'YOLOv8 Detection', description: 'Person, Car', status: 'running' },
    inputs: ['in-2'],
    outputs: ['out-2']
  },
  {
    id: '3',
    type: 'tracking',
    position: { x: 600, y: 600 },
    data: { label: 'ByteTrack', description: 'High speed tracking', status: 'idle' },
    inputs: ['in-3'],
    outputs: ['out-3']
  },
  {
    id: '4',
    type: 'logic',
    position: { x: 600, y: 850 },
    data: { label: 'Zone Filter', description: 'Exclude Safe Zone', status: 'idle' },
    inputs: ['in-4'],
    outputs: ['out-4']
  },
  {
    id: '5',
    type: 'output',
    position: { x: 600, y: 1100 },
    data: { label: 'Database Sink', description: 'PostgreSQL', status: 'idle' },
    inputs: ['in-5'],
    outputs: []
  }
];

export const INITIAL_CONNECTIONS: Connection[] = [
  { id: 'c1', sourceNodeId: '1', sourceHandle: 'out-1', targetNodeId: '2', targetHandle: 'in-2' },
  { id: 'c2', sourceNodeId: '2', sourceHandle: 'out-2', targetNodeId: '3', targetHandle: 'in-3' },
  { id: 'c3', sourceNodeId: '3', sourceHandle: 'out-3', targetNodeId: '4', targetHandle: 'in-4' },
  { id: 'c4', sourceNodeId: '4', sourceHandle: 'out-4', targetNodeId: '5', targetHandle: 'in-5' },
];

export const DRAGGABLE_NODES: DraggableNode[] = [
  { type: 'input', label: 'Video Source', desc: 'Camera, RTSP, File', category: 'Source' },
  { type: 'detection', label: 'Object Detection', desc: 'YOLO, SSD, FasterRCNN', category: 'AI Model' },
  { type: 'tracking', label: 'Object Tracking', desc: 'ByteTrack, DeepSort', category: 'AI Model' },
  { type: 'pose', label: 'Pose Estimation', desc: 'MoveNet, PoseNet', category: 'AI Model' },
  { type: 'classifier', label: 'Classification', desc: 'ResNet, MobileNet', category: 'AI Model' },
  { type: 'logic', label: 'Logic Gate', desc: 'Filter, Switch, Merge', category: 'Logic' },
  { type: 'output', label: 'Output Sink', desc: 'DB, API, File', category: 'Output' },
];

export const MOCK_WORKFLOWS: Workflow[] = [
  { 
    id: '1', 
    name: 'Retail Analytics', 
    description: 'Customer counting and heatmap analysis for retail stores.', 
    updatedAt: '2 min ago', 
    status: 'active', 
    nodesCount: 8 
  },
  { 
    id: '2', 
    name: 'Safety Monitoring', 
    description: 'PPE detection and restricted zone monitoring for factory floors.', 
    updatedAt: '1 hour ago', 
    status: 'active', 
    nodesCount: 12 
  },
  { 
    id: '3', 
    name: 'Traffic Control', 
    description: 'Vehicle counting and license plate recognition at main gate.', 
    updatedAt: '2 days ago', 
    status: 'draft', 
    nodesCount: 5 
  },
  { 
    id: '4', 
    name: 'Quality Inspection', 
    description: 'Defect detection on conveyor belt using custom trained models.', 
    updatedAt: '5 days ago', 
    status: 'archived', 
    nodesCount: 15 
  },
];
