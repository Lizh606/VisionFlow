
export const getMockDevice = (id?: string) => {
    // Simulate "Pending" devices based on IDs from SelfHostedDevices list (4, 5, 6)
    if (id && ['4', '5', '6'].includes(id)) {
        return {
            id: id,
            name: `New-Device-00${id}`,
            deviceId: `dev_00000${id}_new_abcdef_long_id`,
            runtimeId: `rt_0000_init_000000_xyz_999`,
            status: 'PENDING_LICENSE',
            mode: 'EDGE', // Default EDGE for pending
            lastSeen: '10m ago',
            activeStreams: 0,
            license: null,
            config: null
        };
    }

    // Default "Online" device
    return { 
        id: '1', 
        name: 'Edge-Gateway-01', 
        deviceId: 'dev_829302_abcdef', 
        runtimeId: 'rt_2201_xyz_998877', 
        status: 'ONLINE', 
        mode: 'EDGE', 
        lastSeen: 'Just now',
        activeStreams: 3,
        license: {
            id: 'lic_enterprise_001',
            name: 'Enterprise-Edge-v2',
            type: 'per-device',
            expiresAt: '2024-12-31',
            quota: { used: 1, total: 100 },
            offlineLease: true
        },
        config: {
            version: 'v2.4.1',
            streamCount: 3,
            lastAudit: '2024-05-20 10:00 by Admin'
        }
    };
};

export const MOCK_STREAMS = [
    { id: 'str_1', name: 'Main Gate Cam', input: 'RTSP', workflowId: 'wf_person_cnt', workflowVer: 'v12', status: 'RUNNING', telemetry: 'METRICS_ONLY', updated: '2h ago' },
    { id: 'str_2', name: 'Lobby Cam', input: 'HTTP', workflowId: 'wf_face_rec', workflowVer: 'v4', status: 'RUNNING', telemetry: 'HEARTBEAT', updated: '1d ago' },
    { id: 'str_3', name: 'Warehouse Feed', input: 'RTSP', workflowId: 'wf_safety', workflowVer: 'stable', status: 'PAUSED', telemetry: 'DIAGNOSTIC', updated: '5m ago' },
];

export const MOCK_LOGS = [
    { id: 1, time: '10:42:01', type: 'HEARTBEAT', msg: 'Device check-in successful. CPU: 45%' },
    { id: 2, time: '10:40:00', type: 'BATCH', msg: 'Uploaded 120 images from stream str_1' },
    { id: 3, time: '10:35:12', type: 'WARN', msg: 'High latency detected on str_3 input source' },
    { id: 4, time: '10:30:00', type: 'HEARTBEAT', msg: 'Device check-in successful. CPU: 42%' },
];

export const MOCK_HISTORY = [
    { version: 'v2.4.1', type: 'CURRENT', author: 'Admin', time: '2024-05-20 10:00', desc: 'Current active configuration.' },
    { version: 'v2.4.0', type: 'UPDATE', author: 'System', time: '2024-05-19 14:30', desc: 'Updated stream configuration for warehouse.' },
    { version: 'v2.3.9', type: 'ROLLBACK', author: 'DevOps', time: '2024-05-19 14:00', desc: 'Rolled back due to error rate spike.' },
    { version: 'v2.3.0', type: 'INIT', author: 'Admin', time: '2024-05-01 09:00', desc: 'Initial provisioning.' },
];

export interface SnapshotStream {
    name: string;
    workflow: string;
    input: string;
    telemetry: string;
    concurrency: number;
}

export interface VersionDiff {
    type: 'ADD' | 'MOD' | 'DEL';
    text: string;
}

export const MOCK_SNAPSHOTS: Record<string, SnapshotStream[]> = {
    'v2.4.0': [
        { name: 'cam_entrance', workflow: 'wf_person_det v10', input: 'rtsp://192.168.1.55', telemetry: 'METRICS_ONLY', concurrency: 2 },
        { name: 'cam_gate', workflow: 'wf_face_rec v3', input: 'rtsp://192.168.1.60', telemetry: 'HEARTBEAT', concurrency: 1 },
    ],
    'v2.3.9': [
        { name: 'cam_entrance', workflow: 'wf_person_det v9', input: 'rtsp://192.168.1.55', telemetry: 'METRICS_ONLY', concurrency: 2 },
    ],
    'v2.3.0': [
        { name: 'cam_test', workflow: 'wf_test v1', input: 'file://test.mp4', telemetry: 'DIAGNOSTIC', concurrency: 1 },
    ]
};

export const MOCK_DIFFS: Record<string, VersionDiff[]> = {
    'v2.4.0': [
        { type: 'ADD', text: 'Added stream cam_gate' },
        { type: 'MOD', text: 'Modified cam_entrance workflow v9 → v10' },
        { type: 'DEL', text: 'Deleted stream cam_test' },
    ],
    'v2.3.9': [
        { type: 'MOD', text: 'Downgraded workflow for cam_entrance' },
    ],
    'v2.3.0': []
};

export const MOCK_DEVICE_ALERTS = [
     { level: 'CRITICAL', msg: 'Device was offline for 2 mins', entityId: 'dev_829302_abcdef', entityType: 'DEVICE', time: '10m ago' },
     { level: 'WARNING', msg: 'High memory usage (85%)', entityId: 'dev_829302_abcdef', entityType: 'DEVICE', time: '1h ago' },
     { level: 'INFO', msg: 'Config v2.4.1 applied successfully', entityId: 'cfg_v2.4.1', entityType: 'CONFIG', time: '2h ago' }
];

export const MOCK_USAGE_DETAILS = [
    { id: 'wf_person_cnt', name: 'Person Counting', type: 'workflow', image_count: 540230, video_seconds: 1200, calls: 24000, error_rate: '0.01%', mode: 'EDGE' },
    { id: 'wf_face_rec', name: 'Face Recognition', type: 'workflow', image_count: 12030, video_seconds: 0, calls: 12000, error_rate: '0.00%', mode: 'CLOUD' },
    { id: 'wf_safety', name: 'Safety Monitoring', type: 'workflow', image_count: 88200, video_seconds: 400, calls: 5000, error_rate: '0.05%', mode: 'EDGE' },
];
