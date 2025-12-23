
import { Listing, Order, InferenceResult, Plan, Artifact, Purchase } from '../features/marketplace/types';

// ... 保持原有 mockListings 不变 ...
const mockListings: Listing[] = [
  {
    id: 'l-1',
    name: 'Advanced Traffic Counter',
    shortDescription: 'Enterprise-grade vehicle analytics for high-density intersections.',
    description: 'A comprehensive traffic analysis workflow designed for urban planning and smart city initiatives.',
    type: 'WORKFLOW',
    status: 'PUBLISHED',
    author: { name: 'Vision AI Lab' },
    price: 49.99,
    currency: 'USD',
    tags: ['Traffic', 'YOLOv8'],
    purchased: false,
    rating: 4.8,
    installCount: 1205,
    supportedDevices: ['NVIDIA Jetson', 'Raspberry Pi 4', 'Generic x86'],
    entitlements: { can_cloud_test: true, can_self_host: true, can_use: true, can_open_studio: true },
    plans: [
      { id: 'p1-std', planCode: 'STANDARD', name: 'Standard License', price: 49.99, currency: 'USD', interval: 'one-time', features: ['Up to 5 Streams'] }
    ]
  },
  {
    id: 'l-3',
    name: 'SigNoz Connector',
    shortDescription: 'Seamless telemetry integration for advanced observability.',
    description: 'Export all inference logs to SigNoz dashboard with a single click.',
    type: 'PLUGIN',
    status: 'PUBLISHED',
    author: { name: 'VisionFlow Core' },
    price: 19.99,
    currency: 'USD',
    tags: ['Observability'],
    purchased: true, 
    rating: 4.9,
    installCount: 450,
    supportedDevices: ['All Devices'],
    plans: [
      { id: 'p3-std', planCode: 'STANDARD', name: 'Full Version', price: 19.99, currency: 'USD', interval: 'one-time', features: ['Log Forwarding'] }
    ]
  },
  {
    id: 'l-4',
    name: 'Retail Heatmap Generator',
    shortDescription: 'Track customer movement and dwell time in retail spaces.',
    description: 'Optimized for high-angle ceiling cameras.',
    type: 'WORKFLOW',
    status: 'PUBLISHED',
    author: { name: 'RetailMetrics' },
    price: 129.00,
    currency: 'USD',
    tags: ['Retail'],
    purchased: false,
    rating: 4.7,
    installCount: 230,
    supportedDevices: ['NVIDIA Jetson'],
    entitlements: { can_cloud_test: true, can_self_host: true, can_use: true },
    plans: [{ id: 'p4-mo', planCode: 'MONTHLY', name: 'Professional Monthly', price: 129.00, currency: 'USD', interval: 'month', features: ['All-in-one Analytics'] }]
  },
  {
    id: 'l-6',
    name: 'Slack Alert Bridge',
    shortDescription: 'Forward detection events to Slack channels instantly.',
    description: 'Easy-to-configure alerting plugin.',
    type: 'PLUGIN',
    status: 'PUBLISHED',
    author: { name: 'Community Dev' },
    price: 9.99,
    currency: 'USD',
    tags: ['Alerting'],
    purchased: false,
    rating: 4.2,
    installCount: 120,
    supportedDevices: ['Cloud Runner'],
    entitlements: { can_cloud_test: false, can_self_host: false, can_use: true },
    plans: [{ id: 'p6-std', planCode: 'STANDARD', name: 'Full License', price: 9.99, currency: 'USD', interval: 'one-time', features: ['Unlimited Channels'] }]
  }
];

// UC-MKT-001 资产列表 Mock
const mockPurchases: Purchase[] = [
  {
    id: 'pur-1',
    listingId: 'l-1',
    listingName: 'Advanced Traffic Counter',
    type: 'WORKFLOW',
    status: 'READY',
    planName: 'Enterprise License',
    purchasedAt: '2025-11-15T10:00:00Z',
    expiryAt: '2026-11-15T10:00:00Z',
    entitlements: { can_cloud_test: true, can_self_host: true, can_use: true, can_open_studio: true, seats: 5 }
  },
  {
    id: 'pur-2',
    listingId: 'l-3',
    listingName: 'SigNoz Connector',
    type: 'PLUGIN',
    status: 'READY',
    planName: 'Full Version',
    purchasedAt: '2025-12-01T08:30:00Z',
    expiryAt: null, // Lifetime
    entitlements: { can_cloud_test: false, can_self_host: false, can_use: true, can_open_studio: false }
  },
  {
    id: 'pur-3',
    listingId: 'l-4',
    listingName: 'Retail Heatmap Generator',
    type: 'WORKFLOW',
    status: 'EXPIRED',
    planName: 'Professional Monthly',
    purchasedAt: '2025-10-01T12:00:00Z',
    expiryAt: '2025-11-01T12:00:00Z',
    entitlements: { can_cloud_test: true, can_self_host: true, can_use: false, can_open_studio: true }
  },
  {
    id: 'pur-4',
    listingId: 'l-6',
    listingName: 'Slack Alert Bridge',
    type: 'PLUGIN',
    status: 'PENDING', // ENTITLEMENT_PENDING
    planName: 'Full License',
    purchasedAt: '2025-12-22T09:00:00Z',
    expiryAt: null,
    entitlements: { can_cloud_test: false, can_self_host: false, can_use: false, can_open_studio: false }
  }
];

export const marketplaceService = {
  async listPublicListings(): Promise<Listing[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockListings), 600));
  },
  async getListingDetail(id: string): Promise<Listing | undefined> {
    return new Promise(resolve => setTimeout(() => resolve(mockListings.find(l => l.id === id)), 400));
  },
  async listPurchases(): Promise<Purchase[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockPurchases), 500));
  },
  async getPlans(listingId: string): Promise<Plan[]> {
    const listing = mockListings.find(l => l.id === listingId);
    return new Promise(resolve => setTimeout(() => resolve(listing?.plans || []), 300));
  },
  async toggleFavorite(id: string): Promise<boolean> {
    return new Promise(resolve => setTimeout(() => resolve(true), 300));
  },
  async createOrder(payload: { listingId: string; planCode: string; idempotencyKey: string }): Promise<Order> {
    return new Promise(resolve => {
      setTimeout(() => {
        const listing = mockListings.find(l => l.id === payload.listingId);
        const plan = listing?.plans?.find(p => p.planCode === payload.planCode);
        resolve({
          id: `ord-${Math.floor(Math.random() * 1000000)}`,
          listingId: payload.listingId,
          listingName: listing?.name || 'Resource',
          amount: plan?.price ?? 0,
          currency: 'USD',
          status: 'PENDING_PAYMENT',
          createdAt: new Date().toISOString(),
          paymentUrl: '#'
        });
      }, 800);
    });
  },
  async getOrderStatus(orderId: string): Promise<Order> {
    return new Promise(resolve => setTimeout(() => {
      resolve({
        id: orderId,
        listingId: 'l-1',
        listingName: 'Traffic Counter',
        amount: 49.99,
        currency: 'USD',
        status: 'SUCCESS',
        entitlementStatus: 'READY',
        createdAt: new Date().toISOString()
      });
    }, 600));
  },
  async cloudTest(listingId: string, image: any, params: any): Promise<InferenceResult> {
    return new Promise(resolve => setTimeout(() => {
      resolve({ latency: 42, detections: [{ label: 'Object', confidence: 0.96, bbox: [10, 10, 50, 50] }] });
    }, 1000));
  }
};
