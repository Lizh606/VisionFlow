
export const overview = {
  "title": "Overview Dashboard",
  "description": "Cross-domain operational health and anomaly detection.",
  "liveEvents": "Real-time Events",
  "viewAlerts": "Manage Domain Alerts",
  "refreshSnapshot": "Sync Snapshot",
  "refreshTooltip": "Refresh all metric caches from AdminDB.",
  "snapshotFreshness": "Data Freshness",
  "freshnessHint": "Snapshot sync interval: 60s.",
  "fleetSynced": "Fleet Synced",
  "awaitingReview": "Awaiting Review",
  "versionDistribution": "Version Distribution",
  "domains": {
    "studio": "Studio",
    "selfhosted": "Self-Hosted",
    "marketplace": "Marketplace",
    "billing": "Billing",
    "usage": "Usage"
  },
  "metrics": {
    "successRate": "Run Success Rate",
    "backlog": "Queue Backlog",
    "topFailures": "Top Failure Reasons",
    "online": "Online Devices",
    "offline": "Offline Devices",
    "coverage": "Deployment Coverage",
    "leaseAnomalies": "Lease Anomalies",
    "trend": "Trend",
    "pendingListings": "Pending Listings",
    "refundFailures": "Refund Failures",
    "orderAnomalies": "Order Anomalies",
    "settlementAnomalies": "Settlement/Reconciliation Anomalies"
  },
  "ranges": {
    "1h": "Last 1h",
    "24h": "Last 24h"
  },
  "filters": {
    "tooltip": "Filter by {{label}}",
    "tenant": "Tenant ID",
    "workspace": "Workspace ID",
    "env": "Environment",
    "allTenants": "All Tenants",
    "allWorkspaces": "All Workspaces"
  },
  "liveEventsDrawer": {
    "title": "Real-time Events",
    "subtitle": "Cluster operation stream (SSE)",
    "statusConnected": "CONNECTED",
    "statusReconnecting": "RECONNECTING",
    "statusDisconnected": "DISCONNECTED",
    "clearStream": "Clear Events",
    "clearConfirmTitle": "Confirm Clear?",
    "clearConfirmDesc": "This action only clears the local UI event list.",
    "listening": "Listening for cluster events..."
  }
};
