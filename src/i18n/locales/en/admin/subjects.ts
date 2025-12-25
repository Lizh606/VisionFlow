export const subjects = {
  "detail": {
    "contextNote": "Subject information is aggregated from domain-specific APIs. Discrepancies reflect synchronization lag between edge and aggregator.",
    "subjectId": "Subject ID",
    "driftExplanation": "Discrepancy detected between AdminDB snapshot and Live Source of Truth. This usually implies events are pending persistence in the cluster bus.",
    "viewAudit": "View Audit Log",
    "runSotQuery": "Run strong consistency query",
    "sotEmptyTitle": "Live Query Required",
    "sotEmptyDesc": "Execute a high-consistency query to the domain API to fetch the current state of this resource.",
    "stateDrift": "State Drift Detected: {{count}} Fields",
    "openHealth": "Open System Health"
  },
  "types": {
    "device": "Device",
    "entitlement": "Entitlement",
    "order": "Order",
    "run": "Workflow Run"
  },
  "tabs": {
    "snapshot": "Snapshot (AdminDB)",
    "sot": "Source of Truth (SoT)",
    "diff": "Diff (Snapshot vs SoT)"
  },
  "sections": {
    "relatedAlerts": "Active Incident Correlation",
    "recentAudit": "Administrative Audit Trace"
  },
  "fields": {
    "domain": "Domain",
    "status": "Status",
    "identity": "Identity Signature",
    "subjectId": "Subject ID",
    "region": "Region / Scope",
    "snapshotSource": "Snapshot Source",
    "aggregationSource": "Aggregation Source",
    "mappedPod": "Mapped runtime pod"
  }
};