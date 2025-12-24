
import { Listing, Order, InferenceResult, Plan, Artifact, Purchase } from '../features/marketplace/types';

const mockListings: Listing[] = [
  {
    id: 'l-1',
    name: 'Advanced Traffic Counter',
    shortDescription: 'Enterprise-grade vehicle analytics for high-density intersections.',
    description: 'A comprehensive traffic analysis workflow designed for urban planning and smart city initiatives. It provides high-precision counting and classification using deep learning models optimized for real-world environmental conditions.\n\nBuilt on the latest YOLO architecture, this resource handles occlusion, shadows, and low-light scenarios with industry-leading accuracy.',
    type: 'WORKFLOW',
    status: 'PUBLISHED',
    author: { name: 'Vision AI Lab' },
    price: 49.99,
    currency: 'USD',
    tags: ['Traffic', 'YOLOv8', 'Smart City'],
    purchased: false,
    rating: 4.8,
    installCount: 1205,
    supportedDevices: ['NVIDIA Jetson', 'Raspberry Pi 4', 'Generic x86'],
    entitlements: { can_cloud_test: true, can_self_host: true, can_use: true, can_open_studio: true },
    highlights: [
      'Real-time vehicle classification (Car, Truck, Bike)',
      'Speed estimation and trajectory tracking',
      'Multi-lane support with virtual occupancy lines',
      'Low-latency processing optimized for NVIDIA Jetson',
      'Automated peak-hour report generation'
    ],
    examples: [
      { id: 'ex-1-1', title: 'Urban Intersection Day', type: 'IMAGE', url: 'https://images.unsplash.com/photo-1545147986-a9d6f210df77' },
      { id: 'ex-1-2', title: 'Highway Night Vision', type: 'IMAGE', url: 'https://images.unsplash.com/photo-1566228383441-456070679808' },
      { id: 'ex-1-3', title: 'Traffic Jam Breakdown', type: 'IMAGE', url: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb' }
    ],
    docs: [
      { id: 'doc-1-1', title: 'Quick Start Guide', type: 'PDF', url: '#', updatedAt: '2025-12-01' },
      { id: 'doc-1-2', title: 'API Integration Reference', type: 'MD', url: '#', updatedAt: '2025-12-10' },
      { id: 'doc-1-3', title: 'Model Performance Report', type: 'PDF', url: '#', updatedAt: '2025-12-15' }
    ],
    plans: [
      { id: 'p1-std', planCode: 'STANDARD', name: 'Standard License', price: 49.99, currency: 'USD', interval: 'one-time', features: ['Up to 5 Streams', 'Standard Support', 'Core Analytics'] },
      { id: 'p1-pro', planCode: 'PRO', name: 'Pro License', price: 149.00, currency: 'USD', interval: 'one-time', features: ['Unlimited Streams', 'Priority 24/7 Support', 'Advanced Telemetry', 'Source Access'] }
    ]
  },
  {
    id: 'l-3',
    name: 'SigNoz Connector',
    shortDescription: 'Seamless telemetry integration for advanced observability.',
    description: 'Export all inference logs, traces, and metrics to SigNoz dashboard with a single click. This plugin acts as a high-performance bridge between VisionFlow Edge nodes and your centralized monitoring stack.\n\nMonitor FPS, latency, and error rates across your entire fleet in real-time.',
    type: 'PLUGIN',
    status: 'PUBLISHED',
    author: { name: 'VisionFlow Core' },
    price: 19.99,
    currency: 'USD',
    tags: ['Observability', 'Ops', 'SigNoz'],
    purchased: true, 
    rating: 4.9,
    installCount: 450,
    supportedDevices: ['All Devices'],
    highlights: [
      'One-click SigNoz Cloud/Self-hosted setup',
      'Inference trace ID propagation',
      'Custom metric dashboards',
      'Zero-overhead log forwarding'
    ],
    examples: [
      { id: 'ex-3-1', title: 'Performance Dashboard', type: 'IMAGE', url: '#' },
      { id: 'ex-3-2', title: 'Trace Map Example', type: 'IMAGE', url: '#' }
    ],
    docs: [
      { id: 'doc-3-1', title: 'Configuration Manual', type: 'MD', url: '#', updatedAt: '2025-11-20' },
      { id: 'doc-3-2', title: 'SigNoz Version Compatibility', type: 'PDF', url: '#', updatedAt: '2025-11-25' }
    ],
    plans: [
      { id: 'p3-std', planCode: 'STANDARD', name: 'Full Version', price: 19.99, currency: 'USD', interval: 'one-time', features: ['Log Forwarding', 'Standard Metrics'] }
    ]
  },
  {
    id: 'l-4',
    name: 'Retail Heatmap Generator',
    shortDescription: 'Track customer movement and dwell time in retail spaces.',
    description: 'Optimized for high-angle ceiling cameras, this workflow generates spatial heatmaps to visualize customer behavior. Ideal for store layout optimization and marketing effectiveness analysis.',
    type: 'WORKFLOW',
    status: 'PUBLISHED',
    author: { name: 'RetailMetrics' },
    price: 129.00,
    currency: 'USD',
    tags: ['Retail', 'Heatmap', 'Analytics'],
    purchased: false,
    rating: 4.7,
    installCount: 230,
    supportedDevices: ['NVIDIA Jetson'],
    entitlements: { can_cloud_test: true, can_self_host: true, can_use: true },
    highlights: [
      'Dynamic dwell time calculation',
      'Zone-based engagement metrics',
      'Daily/Weekly density overlay exports',
      'GDPR compliant (no biometric storage)'
    ],
    examples: [
      { id: 'ex-4-1', title: 'Store Floor Overview', type: 'IMAGE', url: '#' },
      { id: 'ex-4-2', title: 'Aisle Traffic Analysis', type: 'IMAGE', url: '#' }
    ],
    docs: [
      { id: 'doc-4-1', title: 'Installation Requirements', type: 'PDF', url: '#', updatedAt: '2025-10-05' },
      { id: 'doc-4-2', title: 'Privacy Compliance Doc', type: 'PDF', url: '#', updatedAt: '2025-10-12' }
    ],
    plans: [{ id: 'p4-mo', planCode: 'MONTHLY', name: 'Professional Monthly', price: 129.00, currency: 'USD', interval: 'month', features: ['All-in-one Analytics', 'API Data Export', 'Premium Support'] }]
  },
  {
    id: 'l-6',
    name: 'Slack Alert Bridge',
    shortDescription: 'Forward detection events to Slack channels instantly.',
    description: 'Easy-to-configure alerting plugin that pushes real-time event notifications with snapshots to specified Slack webhooks. Customize alert severity and frequency rules directly from the VisionFlow UI.',
    type: 'PLUGIN',
    status: 'PUBLISHED',
    author: { name: 'Community Dev' },
    price: 9.99,
    currency: 'USD',
    tags: ['Alerting', 'Slack', 'Ops'],
    purchased: false,
    rating: 4.2,
    installCount: 120,
    supportedDevices: ['Cloud Runner'],
    entitlements: { can_cloud_test: false, can_self_host: false, can_use: true },
    highlights: [
      'Webhook based instant delivery',
      'Rich snapshot message previews',
      'Conditional alert filtering',
      'Multi-channel support'
    ],
    examples: [
      { id: 'ex-6-1', title: 'Slack Notification Preview', type: 'IMAGE', url: '#' }
    ],
    docs: [
      { id: 'doc-6-1', title: 'Slack App Setup Guide', type: 'MD', url: '#', updatedAt: '2025-12-15' }
    ],
    plans: [{ id: 'p6-std', planCode: 'STANDARD', name: 'Full License', price: 9.99, currency: 'USD', interval: 'one-time', features: ['Unlimited Channels', 'Lifetime Updates'] }]
  }
];

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
    expiryAt: null,
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
    status: 'PENDING', 
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
    const item = mockListings.find(l => l.id === id);
    return new Promise(resolve => setTimeout(() => resolve(item), 400));
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
