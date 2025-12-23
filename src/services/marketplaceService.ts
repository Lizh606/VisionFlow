
import { Listing, Order, InferenceResult, Plan, Artifact } from '../features/marketplace/types';

const standardFeatures = ['Up to 5 Streams', 'Standard Updates', 'Community Support'];
const enterpriseFeatures = ['Unlimited Streams', '24/7 Support', 'LTS Version Access', 'Custom Integration'];

const mockListings: Listing[] = [
  {
    id: 'l-1',
    name: 'Advanced Traffic Counter',
    shortDescription: 'Enterprise-grade vehicle analytics for high-density intersections.',
    description: 'A comprehensive traffic analysis workflow designed for urban planning and smart city initiatives. Supports high-speed vehicle detection, multi-lane counting, and vehicle classification (Car, Truck, Bus, Motorcycle).',
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
    highlights: ['Real-time object tracking', 'Multi-zone intrusion detection', 'Low-latency inference', 'Privacy-first processing'],
    useCases: 'Perfect for municipal traffic monitoring, parking lot management, and highway occupancy analysis.',
    entitlements: { can_cloud_test: true, can_self_host: true, can_use: true },
    plans: [
      { id: 'p1-std', planCode: 'STANDARD', name: 'Standard License', price: 49.99, currency: 'USD', interval: 'one-time', features: standardFeatures },
      { id: 'p1-ent', planCode: 'ENTERPRISE', name: 'Enterprise License', price: 199.00, currency: 'USD', interval: 'one-time', features: enterpriseFeatures }
    ],
    examples: [
      { id: 'ex1-1', title: 'Highway Monitoring Output', type: 'IMAGE', url: 'https://images.unsplash.com/photo-1545143333-6382f1d5b93d?auto=format&fit=crop&w=800&q=80' },
      { id: 'ex1-2', title: 'Urban Intersection Count', type: 'IMAGE', url: 'https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&w=800&q=80' }
    ],
    docs: [
      { id: 'doc1-1', title: 'Integration Guide (PDF)', type: 'PDF', url: '#', updatedAt: '2025-11-01' },
      { id: 'doc1-2', title: 'Workflow Configuration Reference', type: 'MD', url: '#', updatedAt: '2025-11-15' }
    ]
  },
  {
    id: 'l-2',
    name: 'Face Mask Detector',
    shortDescription: 'Real-time safety compliance monitoring for sterile environments.',
    description: 'Highly optimized nano-model for edge devices. Detects face masks with 99.2% accuracy in various lighting conditions.',
    type: 'MODEL',
    status: 'PUBLISHED',
    author: { name: 'SafetyFirst' },
    price: 0,
    currency: 'USD',
    tags: ['Safety', 'Health'],
    purchased: false,
    rating: 4.5,
    installCount: 890,
    supportedDevices: ['Generic x86', 'Cloud Runner'],
    highlights: ['Nano-size weight (2MB)', 'Works with low-res cameras', 'Zero-latency on CPU'],
    entitlements: { can_cloud_test: true, can_self_host: true, can_use: true },
    plans: [
      { id: 'p2-free', planCode: 'FREE', name: 'Community Edition', price: 0, currency: 'USD', interval: 'one-time', features: ['Single Stream', 'Community Support'] }
    ],
    examples: [
      { id: 'ex2-1', title: 'Office Entrance Check', type: 'IMAGE', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80' }
    ],
    docs: [
      { id: 'doc2-1', title: 'Model Deployment Manual', type: 'PDF', url: '#', updatedAt: '2025-10-20' }
    ]
  },
  {
    id: 'l-3',
    name: 'SigNoz Connector',
    shortDescription: 'Seamless telemetry integration for advanced observability.',
    description: 'Export all inference logs to SigNoz dashboard with a single click. Ideal for DevOps teams managing large scale vision deployments.',
    type: 'PLUGIN',
    status: 'PUBLISHED',
    author: { name: 'VisionFlow Core' },
    price: 19.99,
    currency: 'USD',
    tags: ['Observability', 'DevOps'],
    purchased: true, 
    rating: 4.9,
    installCount: 450,
    supportedDevices: ['All Devices'],
    plans: [
      { id: 'p3-std', planCode: 'STANDARD', name: 'Full Version', price: 19.99, currency: 'USD', interval: 'one-time', features: ['Log Forwarding', 'Custom Metrics', 'Dashboards'] }
    ],
    examples: [
      { id: 'ex3-1', title: 'Dashboard Visualization', type: 'IMAGE', url: 'https://images.unsplash.com/photo-1551288049-bbbda546697a?auto=format&fit=crop&w=800&q=80' }
    ],
    docs: [
      { id: 'doc3-1', title: 'SigNoz Setup & OTLP Config', type: 'MD', url: '#', updatedAt: '2025-12-01' }
    ]
  },
  {
    id: 'l-4',
    name: 'Retail Heatmap Generator',
    shortDescription: 'Track customer movement and dwell time in retail spaces.',
    description: 'Optimized for high-angle ceiling cameras. Automatically generates daily heatmaps and path analysis for retail layout optimization.',
    type: 'WORKFLOW',
    status: 'PUBLISHED',
    author: { name: 'RetailMetrics' },
    price: 129.00,
    currency: 'USD',
    tags: ['Retail', 'Analytics'],
    purchased: false,
    rating: 4.7,
    installCount: 230,
    supportedDevices: ['NVIDIA Jetson'],
    entitlements: { can_cloud_test: true, can_self_host: true, can_use: true },
    plans: [
      { id: 'p4-mo', planCode: 'MONTHLY', name: 'Professional Monthly', price: 129.00, currency: 'USD', interval: 'month', features: ['All-in-one Analytics', 'Email Reports', 'API Access'] },
      { id: 'p4-yr', planCode: 'YEARLY', name: 'Professional Yearly', price: 999.00, currency: 'USD', interval: 'year', features: ['Priority Support', 'Cloud Sync', '2 Months Free'] }
    ],
    examples: [
      { id: 'ex4-1', title: 'Store Hotspots (Daily)', type: 'IMAGE', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80' }
    ],
    docs: [
      { id: 'doc4-1', title: 'Retail Analytics Guide', type: 'PDF', url: '#', updatedAt: '2025-11-20' }
    ]
  },
  {
    id: 'l-5',
    name: 'OCR Plate Recognition',
    shortDescription: 'Universal LPR system supporting 50+ countries.',
    description: 'High-speed OCR model for gate management and automated access control systems.',
    type: 'MODEL',
    status: 'PUBLISHED',
    author: { name: 'Vision AI Lab' },
    price: 0,
    currency: 'USD',
    tags: ['OCR', 'Traffic'],
    purchased: true,
    rating: 4.6,
    installCount: 5600,
    supportedDevices: ['Generic x86'],
    plans: [
      { id: 'p5-free', planCode: 'FREE', name: 'Open Edition', price: 0, currency: 'USD', interval: 'one-time', features: ['Global Plates', '95% Accuracy'] }
    ],
    examples: [
      { id: 'ex5-1', title: 'Nighttime Recognition', type: 'IMAGE', url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80' }
    ],
    docs: [
      { id: 'doc5-1', title: 'LPR API Specification', type: 'MD', url: '#', updatedAt: '2025-09-12' }
    ]
  },
  {
    id: 'l-6',
    name: 'Slack Alert Bridge',
    shortDescription: 'Forward detection events to Slack channels instantly.',
    description: 'Easy-to-configure alerting plugin that sends rich Slack notifications with event snapshots.',
    type: 'PLUGIN',
    status: 'PUBLISHED',
    author: { name: 'Community Dev' },
    price: 9.99,
    currency: 'USD',
    tags: ['Alerting', 'Tools'],
    purchased: false,
    rating: 4.2,
    installCount: 120,
    supportedDevices: ['Cloud Runner'],
    entitlements: { can_cloud_test: false, can_self_host: false, can_use: true },
    plans: [
      { id: 'p6-std', planCode: 'STANDARD', name: 'Full License', price: 9.99, currency: 'USD', interval: 'one-time', features: ['Unlimited Channels', 'Image Uploads'] }
    ],
    examples: [
      { id: 'ex6-1', title: 'Slack Notification Preview', type: 'IMAGE', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80' }
    ],
    docs: [
      { id: 'doc6-1', title: 'Webhook Setup Instructions', type: 'MD', url: '#', updatedAt: '2025-11-30' }
    ]
  }
];

let pollCount = 0;

export const marketplaceService = {
  async listPublicListings(): Promise<Listing[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockListings), 600));
  },
  async getListingDetail(id: string): Promise<Listing | undefined> {
    return new Promise(resolve => setTimeout(() => resolve(mockListings.find(l => l.id === id)), 400));
  },
  async getPlans(listingId: string): Promise<Plan[]> {
    const listing = mockListings.find(l => l.id === listingId);
    return new Promise(resolve => setTimeout(() => resolve(listing?.plans || []), 300));
  },
  async toggleFavorite(id: string): Promise<boolean> {
    return new Promise(resolve => setTimeout(() => resolve(true), 300));
  },
  async createOrder(payload: { listingId: string; planCode: string; idempotencyKey: string }): Promise<Order> {
    pollCount = 0;
    return new Promise(resolve => {
      setTimeout(() => {
        const listing = mockListings.find(l => l.id === payload.listingId);
        const plan = listing?.plans?.find(p => p.planCode === payload.planCode);
        const price = plan?.price ?? 0;
        resolve({
          id: `ord-${Math.floor(Math.random() * 1000000)}`,
          listingId: payload.listingId,
          listingName: listing?.name || 'Resource',
          planName: plan?.name,
          planCode: payload.planCode,
          amount: price,
          currency: 'USD',
          status: price === 0 ? 'SUCCESS' : 'PENDING_PAYMENT',
          entitlementStatus: price === 0 ? 'READY' : 'PENDING',
          createdAt: new Date().toISOString(),
          paymentUrl: 'https://checkout.visionflow.io/mock-pay'
        });
      }, 800);
    });
  },
  async getOrderStatus(orderId: string): Promise<Order> {
    return new Promise(resolve => {
      setTimeout(() => {
        const order: Order = {
          id: orderId,
          listingId: 'l-1',
          listingName: 'Advanced Traffic Counter',
          planName: 'Standard License',
          amount: 49.99,
          currency: 'USD',
          status: 'SUCCESS',
          entitlementStatus: 'READY',
          createdAt: new Date().toISOString()
        };
        resolve(order);
      }, 600);
    });
  },
  async cloudTest(listingId: string, image: any, params: any): Promise<InferenceResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          latency: 42,
          detections: [{ label: 'Object', confidence: 0.96, bbox: [10, 10, 50, 50] }]
        });
      }, 1000);
    });
  }
};
