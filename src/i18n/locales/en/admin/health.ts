
export const health = {
  "title": "System Health",
  "subtitle": "Monitor event pipeline lag, DLQ depth, and notification service health to diagnose data inconsistencies.",
  "actions": {
    "audit": "Open Audit Log",
    "viewAlerts": "View Affected Alerts",
    "clearSearch": "Clear Search",
    "markKnown": "Mark Known Issue"
  },
  "filters": {
    "timeRange": "Time Range",
    "tenant": "Tenant",
    "workspace": "Workspace",
    "env": "Environment",
    "searchDlq": "Search Message ID or Event Type...",
    "allTenants": "All Tenants",
    "allWorkspaces": "All Workspaces"
  },
  "sections": {
    "pipelineHealth": "Event Bus & Notification Health",
    "dlqSamples": "DLQ Message Samples",
    "dependencies": "External Dependencies"
  },
  "cards": {
    "runbusLag": "Event Persistence Lag",
    "dlqDepth": "Active DLQ Depth",
    "snapshotFreshness": "Data Freshness",
    "meta": {
      "lastSync": "Last Aggregated",
      "lag": "Snapshot Lag",
      "dlqCount": "DLQ Count",
      "messages": "Messages",
      "lastAggregatedAt": "Last Aggregated At"
    }
  },
  "banners": {
    "staleTitle": "Data Freshness Threshold Exceeded",
    "staleDesc": "Event backlog may cause inconsistencies between AdminDB and Live Source of Truth.",
    "currentLag": "Current Bus Lag: {{val}}",
    "sseDisconnected": "SSE stream disconnected. Real-time updates may be delayed."
  },
  "table": {
    "firstSeen": "First Seen",
    "eventSchema": "Event Type",
    "domain": "Domain",
    "targetSubject": "Affected Subject",
    "retryCount": "Retry Count",
    "status": "Status",
    "foundCount": "{{count}} samples found",
    "emptySearch": "No matching DLQ samples found.",
    "healthyTitle": "Pipeline Operational",
    "actions": {
      "view": "View Message Details",
      "v01ReadOnly": "Read-only mode. Remediation requires ticketing."
    },
    "empty": "Event pipeline is healthy. No DLQ samples detected."
  },
  "drawer": {
    "dlqTitle": "DLQ Message Detail",
    "depTitle": "Dependency Diagnostics",
    "latencyLabel": "Avg Latency",
    "lastCheckedLabel": "Last Checked",
    "errorLabel": "Normalized Error",
    "suggestedOpLabel": "Suggested Action",
    "idLabel": "Message ID",
    "eventType": "Event Type",
    "target": "Subject",
    "retryCount": "Retry Count",
    "rawPayload": "Raw Message Payload",
    "exception": "Execution Exception",
    "errorSummary": "Normalized Error Summary",
    "stackTrace": "Error Stack Trace",
    "headers": "Message Headers",
    "searchLogs": "Search logs in SigNoz",
    "retryAction": "Retry Message",
    "suggested": {
      "retry": "Retry Later",
      "manual": "Manual Handling Required",
      "incident": "Record Ticket",
      "none": "No intervention required"
    }
  }
};
