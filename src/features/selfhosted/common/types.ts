
export type DeviceStatus = 'ONLINE' | 'OFFLINE' | 'PENDING_LICENSE' | 'DRAINING' | 'DECOMMISSIONED' | 'ERROR';
export type DeploymentMode = 'EDGE' | 'CLOUD';
export type LicenseType = 'SELF_HOSTED' | 'CLOUD' | 'MIXED';

export interface Device {
  id: string;
  name: string;
  device_id: string;
  runtime_id: string;
  status: DeviceStatus;
  deployment_mode: DeploymentMode;
  license_id?: string;
  license_name?: string;
  config_version: string;
  last_seen_at: string; // ISO string
  usage_image_count: number;
  usage_video_seconds: number;
  region: string;
  tags: string[];
}

export interface License {
  id: string;
  name: string;
  license_key_masked: string;
  type: LicenseType;
  billing_mode: string;
  used_devices: number;
  total_quota: number;
  expiry_date: string; // ISO string
  offline_lease_enabled: boolean;
}