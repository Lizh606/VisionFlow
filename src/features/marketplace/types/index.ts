
export type ListingType = 'MODEL' | 'WORKFLOW' | 'PLUGIN';
export type ListingStatus = 'PUBLISHED' | 'DRAFT' | 'PENDING_REVIEW' | 'SUSPENDED' | 'ARCHIVED';

export interface ParamSchema {
  id: string;
  label: string;
  type: 'SLIDER' | 'SEGMENTED' | 'INPUT_NUMBER';
  min?: number;
  max?: number;
  step?: number;
  options?: any[];
  default: any;
  help?: string;
}

export interface Plan {
  id: string;
  planCode: string;
  name: string;
  price: number;
  currency: string;
  interval: 'one-time' | 'month' | 'year';
  description?: string;
  features: string[];
}

export interface Artifact {
  id: string;
  title: string;
  type: 'PDF' | 'MD' | 'IMAGE';
  url: string;
  updatedAt?: string;
  progress?: number; // 卖家上传进度
}

export interface Entitlements {
  can_cloud_test: boolean;
  can_self_host: boolean;
  can_use: boolean;
  can_open_studio?: boolean; 
  can_view?: boolean;
  expiry_at?: string | null; 
  seats?: number;
  quantity?: number;
}

export interface Listing {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  type: ListingType;
  status: ListingStatus;
  author: { name: string };
  price: number;
  currency: string;
  tags: string[];
  purchased: boolean;
  isFavorite?: boolean;
  rating: number;
  installCount: number;
  supportedDevices: string[];
  entitlements?: Entitlements;
  plans: Plan[];
  highlights?: string[];
  useCases?: string;
  examples?: Artifact[];
  docs?: Artifact[];
  allowed_params?: ParamSchema[];
  // 卖家侧特有字段
  workflowId?: string;
  workflowVersion?: string;
  rejectionReason?: string; 
  lastUpdated?: string;
}

export type EntitlementStatus = 'PENDING' | 'READY' | 'FAILED' | 'REVOKED' | 'EXPIRED';

export interface Purchase {
  id: string;
  listingId: string;
  listingName: string;
  type: ListingType;
  status: EntitlementStatus;
  planName: string;
  purchasedAt: string;
  expiryAt?: string | null;
  entitlements: Entitlements;
  thumbnailUrl?: string;
  description?: string;
}

export interface Order {
  id: string;
  listingId: string;
  listingName: string;
  planName?: string;
  planCode?: string;
  amount: number;
  currency: string;
  status: 'PENDING_PAYMENT' | 'SUCCESS' | 'FAILED' | 'TIMEOUT' | 'CANCELLED';
  entitlementStatus?: EntitlementStatus;
  createdAt: string;
  paymentUrl?: string;
  errorMessage?: string;
  summaryLines?: { label: string; value: string; isTotal?: boolean }[];
}

export interface InferenceResult {
  latency: number;
  detections: {
    label: string;
    confidence: number;
    bbox: [number, number, number, number];
  }[];
}
