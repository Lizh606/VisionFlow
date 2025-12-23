
export type ListingType = 'MODEL' | 'WORKFLOW' | 'PLUGIN';
export type ListingStatus = 'PUBLISHED' | 'DRAFT' | 'REVIEWING' | 'SUSPENDED' | 'ARCHIVED';

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
}

export interface Listing {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  type: ListingType;
  status: ListingStatus;
  author: {
    name: string;
    avatar?: string;
  };
  price: number;
  currency: string;
  tags: string[];
  thumbnailUrl?: string;
  isFavorite?: boolean;
  purchased?: boolean;
  rating?: number;
  installCount?: number;
  supportedDevices: string[];
  
  // Dynamic Params for Cloud Test
  allowed_params?: ParamSchema[];

  // Tab Contents
  highlights?: string[];
  useCases?: string;
  examples?: Artifact[];
  docs?: Artifact[];
  plans?: Plan[];

  entitlements?: {
    can_cloud_test: boolean;
    can_self_host: boolean;
    can_use: boolean;
    expiry_at?: string;
  };
}

export interface OrderSummaryLine {
  label: string;
  value: string | number;
  isTotal?: boolean;
  isDiscount?: boolean;
}

export type EntitlementStatus = 'PENDING' | 'READY' | 'FAILED' | 'REVOKED';

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
  summaryLines?: OrderSummaryLine[];
  paymentUrl?: string;
  nextAction?: 'RECREATE' | 'RETRY' | 'CONTINUE';
  errorMessage?: string;
}

export interface InferenceResult {
  latency: number;
  detections: {
    label: string;
    confidence: number;
    bbox: [number, number, number, number];
  }[];
}
