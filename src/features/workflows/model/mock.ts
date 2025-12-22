
import { Workflow, WorkspaceSummary, Folder } from './types';
import dayjs from '../../../config/dayjsConfig';

export const mockWorkspace: WorkspaceSummary = {
  name: 'Default Workspace',
  workflowCount: 14
};

export const mockFolders: Folder[] = [
  { id: 'f1', name: 'Traffic Projects', workflowCount: 5, updatedAt: dayjs().toISOString() },
  { id: 'f2', name: 'Quality Control', workflowCount: 3, updatedAt: dayjs().toISOString() },
  { id: 'f3', name: 'Experimental Scripts', workflowCount: 0, updatedAt: dayjs().toISOString() },
];

export const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Smart Traffic Monitor',
    description: 'High-speed vehicle detection, counting, and license plate recognition for urban intersections.',
    lastUpdatedRelative: '2 hours ago',
    updatedAt: dayjs().subtract(2, 'hour').toISOString(),
    status: 'active',
    folderId: 'f1',
    createdBy: { name: 'Admin User', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=64&h=64&q=80' }
  },
  {
    id: '2',
    name: 'Construction PPE Check',
    description: 'Detects hard hats, safety vests, and boots to ensure compliance on hazardous sites.',
    lastUpdatedRelative: '1 day ago',
    updatedAt: dayjs().subtract(1, 'day').toISOString(),
    status: 'active',
    folderId: 'f1',
    createdBy: { name: 'Safety Inspector', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=64&h=64&q=80' }
  },
  {
    id: '3',
    name: 'Retail Heatmap Analysis',
    description: 'Track customer movement and dwell time to optimize store layout.',
    lastUpdatedRelative: '3 days ago',
    updatedAt: dayjs().subtract(3, 'day').toISOString(),
    status: 'draft',
    folderId: null,
    createdBy: { name: 'Marketing Team', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=64&h=64&q=80' }
  },
  {
    id: '4',
    name: 'PCB Defect Detection',
    description: 'Industrial quality control identifying soldering defects in real-time.',
    lastUpdatedRelative: '1 week ago',
    updatedAt: dayjs().subtract(1, 'week').toISOString(),
    status: 'error',
    folderId: 'f2',
    createdBy: { name: 'Admin User', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=64&h=64&q=80' }
  },
  {
    id: '5',
    name: 'Wildfire Early Sentinel',
    description: 'Scanning forest edges for early smoke signatures using thermal and visible cameras.',
    lastUpdatedRelative: '4 hours ago',
    updatedAt: dayjs().subtract(4, 'hour').toISOString(),
    status: 'active',
    folderId: 'f1',
    createdBy: { name: 'EcoWatch Admin', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64&q=80' }
  },
  {
    id: '6',
    name: 'Crowd Flow Dynamics',
    description: 'Monitoring foot traffic density in public transport hubs to prevent overcrowding.',
    lastUpdatedRelative: '5 hours ago',
    updatedAt: dayjs().subtract(5, 'hour').toISOString(),
    status: 'active',
    folderId: 'f1',
    createdBy: { name: 'Transit Authority', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&h=64&q=80' }
  },
  {
    id: '7',
    name: 'Fence Breach Alert',
    description: 'Real-time detection of unauthorized scaling or cutting of security perimeters.',
    lastUpdatedRelative: '2 days ago',
    updatedAt: dayjs().subtract(2, 'day').toISOString(),
    status: 'active',
    folderId: 'f3',
    createdBy: { name: 'Security Chief' }
  },
  {
    id: '8',
    name: 'Face Mask Compliance',
    description: 'Ensuring health safety protocols in sterile laboratory environments.',
    lastUpdatedRelative: '6 hours ago',
    updatedAt: dayjs().subtract(6, 'hour').toISOString(),
    status: 'draft',
    folderId: 'f2',
    createdBy: { name: 'Lab Manager', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=64&h=64&q=80' }
  },
  {
    id: '9',
    name: 'ALPR Gateway 04',
    description: 'Automatic License Plate Recognition for automated toll collection systems.',
    lastUpdatedRelative: '10 mins ago',
    updatedAt: dayjs().subtract(10, 'minute').toISOString(),
    status: 'active',
    folderId: 'f1',
    createdBy: { name: 'Admin User' }
  },
  {
    id: '10',
    name: 'Fruit Quality Sorter',
    description: 'Optical sorting for conveyor belts to identify bruised or undersized produce.',
    lastUpdatedRelative: '1 week ago',
    updatedAt: dayjs().subtract(1, 'week').toISOString(),
    status: 'active',
    folderId: 'f2',
    createdBy: { name: 'AgriTech Admin' }
  },
  {
    id: '11',
    name: 'Vehicle Make Classifier',
    description: 'Identifying car brand and model for parking garage occupancy stats.',
    lastUpdatedRelative: '12 hours ago',
    updatedAt: dayjs().subtract(12, 'hour').toISOString(),
    status: 'draft',
    folderId: null,
    createdBy: { name: 'Data Scientist' }
  },
  {
    id: '12',
    name: 'Abandoned Bag Detection',
    description: 'Security alert for luggage left unattended in airport terminals for over 5 minutes.',
    lastUpdatedRelative: '1 hour ago',
    updatedAt: dayjs().subtract(1, 'hour').toISOString(),
    status: 'active',
    folderId: null,
    createdBy: { name: 'TSA Liaison' }
  },
  {
    id: '13',
    name: 'Shelf Stock Analyzer',
    description: 'Detecting empty shelves in retail grocery aisles for automated restocking.',
    lastUpdatedRelative: '20 mins ago',
    updatedAt: dayjs().subtract(20, 'minute').toISOString(),
    status: 'error',
    folderId: null,
    createdBy: { name: 'Retail Ops' }
  },
  {
    id: '14',
    name: 'Speeding Violator Catch',
    description: 'Calculating instantaneous velocity of vehicles in residential zones.',
    lastUpdatedRelative: '8 hours ago',
    updatedAt: dayjs().subtract(8, 'hour').toISOString(),
    status: 'active',
    folderId: null,
    createdBy: { name: 'Traffic PD' }
  }
];
