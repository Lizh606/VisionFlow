
import { Listing } from '../types';

let mockSellerListings: Listing[] = [
  {
    id: 'sl-1',
    name: 'Smart Warehouse Traffic v2',
    status: 'DRAFT',
    type: 'WORKFLOW',
    shortDescription: 'Incomplete storefront metadata, missing technical docs.',
    description: 'Optimized for low-light warehouse environments.',
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
    shortDescription: 'Technical validation in progress.',
    description: 'Ensuring workplace safety.',
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
    shortDescription: 'Violation: Missing mandatory GDPR compliance.',
    description: 'Restricted listing due to policy.',
    rejectionReason: 'Missing mandatory GDPR compliance docs.',
    author: { name: 'Admin User' },
    price: 99,
    currency: 'USD',
    tags: ['Retail'],
    purchased: false,
    rating: 0,
    installCount: 12,
    supportedDevices: ['Generic x86'],
    plans: [],
    lastUpdated: '2025-12-10T14:00:00Z'
  },
  {
    id: 'sl-5',
    name: 'Legacy OCR Model',
    status: 'ARCHIVED',
    type: 'MODEL',
    shortDescription: 'Resource retired from marketplace.',
    description: 'Archived resource.',
    author: { name: 'Admin User' },
    price: 0,
    currency: 'USD',
    tags: ['AI'],
    purchased: false,
    rating: 3.5,
    installCount: 890,
    supportedDevices: ['CPU Only'],
    plans: [],
    lastUpdated: '2024-12-01T09:00:00Z'
  }
];

export const sellerService = {
  async listMyListings(): Promise<Listing[]> {
    return new Promise(resolve => setTimeout(() => resolve([...mockSellerListings]), 500));
  },
  async getListing(id: string): Promise<Listing | undefined> {
    const item = mockSellerListings.find(l => l.id === id);
    return new Promise(resolve => setTimeout(() => resolve(item), 300));
  },
  async createDraft(): Promise<Listing> {
    const newId = `sl-${Math.floor(Math.random() * 1000000)}`;
    const newDraft: Listing = {
      id: newId,
      name: 'New Listing Draft',
      status: 'DRAFT',
      type: 'WORKFLOW',
      shortDescription: '',
      description: '',
      author: { name: 'Admin User' },
      price: 0, 
      currency: 'USD', 
      tags: [], 
      purchased: false, 
      rating: 0, 
      installCount: 0, 
      supportedDevices: ['Generic x86'], 
      plans: [],
      lastUpdated: new Date().toISOString()
    };
    mockSellerListings.unshift(newDraft);
    return newDraft;
  },
  async submitForReview(id: string): Promise<void> {
    const idx = mockSellerListings.findIndex(l => l.id === id);
    if (idx !== -1) mockSellerListings[idx].status = 'PENDING_REVIEW';
    return new Promise(resolve => setTimeout(resolve, 800));
  }
};
