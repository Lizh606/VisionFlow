
import { Listing } from '../types';

const mockSellerListings: Listing[] = [
  {
    id: 'sl-1',
    name: 'Smart Warehouse Traffic',
    status: 'DRAFT',
    type: 'WORKFLOW',
    shortDescription: 'Optimized for low-light warehouse environments.',
    description: 'A professional-grade traffic analysis workflow.',
    author: { name: 'Admin User' },
    price: 0,
    currency: 'USD',
    tags: ['Logistics'],
    purchased: false,
    rating: 0,
    installCount: 0,
    supportedDevices: ['NVIDIA Jetson'],
    plans: [],
    lastUpdated: '2025-12-22T10:00:00Z'
  },
  {
    id: 'sl-2',
    name: 'PPE Safety Sentinel',
    status: 'PENDING_REVIEW',
    type: 'WORKFLOW',
    shortDescription: 'Ensuring workplace safety.',
    description: 'Detailed description of safety protocols...',
    author: { name: 'Admin User' },
    price: 49,
    currency: 'USD',
    tags: ['Safety'],
    purchased: false,
    rating: 0,
    installCount: 0,
    supportedDevices: ['All Devices'],
    plans: [],
    lastUpdated: '2025-12-21T08:00:00Z'
  },
  {
    id: 'sl-3',
    name: 'SigNoz Connector Pro',
    status: 'PUBLISHED',
    type: 'PLUGIN',
    shortDescription: 'Seamless telemetry integration.',
    description: 'Export all inference logs to SigNoz.',
    author: { name: 'Admin User' },
    price: 19,
    currency: 'USD',
    tags: ['Ops'],
    purchased: false,
    rating: 4.9,
    installCount: 156,
    supportedDevices: ['Cloud Runner'],
    plans: [],
    lastUpdated: '2025-12-15T12:00:00Z'
  },
  {
    id: 'sl-4',
    name: 'Retail Heatmap Analyzer',
    status: 'SUSPENDED',
    type: 'WORKFLOW',
    shortDescription: 'Legacy retail tracking.',
    description: 'Violation detected in licensing terms.',
    author: { name: 'Admin User' },
    price: 99,
    currency: 'USD',
    tags: ['Retail'],
    purchased: false,
    rating: 4.2,
    installCount: 89,
    supportedDevices: ['NVIDIA Jetson'],
    plans: [],
    rejectionReason: 'Subscription API is unreachable. Listing suspended by system.',
    lastUpdated: '2025-11-20T09:00:00Z'
  },
  {
    id: 'sl-5',
    name: 'Old PPE Model v1',
    status: 'ARCHIVED',
    type: 'MODEL',
    shortDescription: 'Deprecated model.',
    description: 'No longer maintained.',
    author: { name: 'Admin User' },
    price: 0,
    currency: 'USD',
    tags: ['Safety'],
    purchased: false,
    rating: 3.5,
    installCount: 12,
    supportedDevices: [],
    plans: [],
    lastUpdated: '2024-10-01T00:00:00Z'
  }
];

export const sellerService = {
  async listMyListings(): Promise<Listing[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockSellerListings), 500));
  },

  async getListing(id: string): Promise<Listing | undefined> {
    return new Promise(resolve => setTimeout(() => resolve(mockSellerListings.find(l => l.id === id)), 300));
  },

  async createDraft(): Promise<Listing> {
    const newId = `sl-${Date.now()}`;
    return {
      id: newId,
      name: 'New Listing Draft',
      status: 'DRAFT',
      type: 'WORKFLOW',
      shortDescription: '',
      description: '',
      author: { name: 'Admin User' },
      price: 0, currency: 'USD', tags: [], purchased: false, rating: 0, installCount: 0, supportedDevices: [], plans: []
    };
  },

  async validateWorkflow(workflowId: string, version: string): Promise<{ ok: boolean; reason?: string }> {
    await new Promise(r => setTimeout(r, 1000));
    return { ok: true };
  },

  async uploadArtifact(file: File, onProgress: (p: number) => void): Promise<string> {
    onProgress(100);
    return `https://cdn.visionflow.io/mock/${file.name}`;
  },

  async submitForReview(id: string): Promise<void> {
    await new Promise(r => setTimeout(r, 1000));
  }
};
