export const alerts = {
  "title": "Alert Center",
  "description": "Cross-domain alert triage, operations, and policy adjustments.",
  "status": {
    "open": "Open",
    "acknowledged": "Acknowledged",
    "suppressed": "Suppressed",
    "resolved": "Resolved"
  },
  "filters": {
    "allSeverities": "All Severities",
    "allDomains": "All Domains",
    "allStatus": "All Status",
    "p0": "P0 - Critical",
    "p1": "P1 - High",
    "p2": "P2 - Medium"
  },
  "table": {
    "severity": "Severity",
    "status": "Status",
    "type": "Type",
    "subject": "Subject",
    "impact": "Impact Scope",
    "firstSeen": "First Seen",
    "lastSeen": "Recently Seen",
    "count": "Aggregated Count",
    "ackAction": "Acknowledge"
  },
  "ack": {
    "title": "Acknowledge Alert",
    "desc": "Confirm intervention for this alert. Status will be synchronized across the admin dashboard.",
    "alertId": "Alert ID",
    "confirm": "Confirm Acknowledge",
    "comment": "Processing Comment",
    "comment.placeholder": "Enter handling notes or investigation records..."
  },
  "actions": {
    "title": "Actions",
    "viewContext": "View Full Context",
    "suppress": "Suppress Alert",
    "resolve": "Mark as Resolved"
  },
  "detail": {
    "summary": "Alert Summary",
    "timeline": "Occurrence Timeline",
    "currentStatus": "Current Status",
    "impactScope": "Impact Scope",
    "aggregationKey": "Aggregation Rule",
    "timelineBy": "via",
    "subjectId": "Subject ID",
    "subjectState": "Object Details (Snapshot)",
    "openSubjectDetail": "Open {{type}} Detail",
    "runSotQuery": "Strong Consistency Query",
    "lastAggregated": "Last Aggregated",
    "aggregateLag": "Aggregate Lag",
    "lagTooltip": "Persistence lag from AdminDB snapshot",
    "dlqDepth": "DLQ Depth",
    "sotEmptyTitle": "Live Query Required",
    "sotEmptyDesc": "Fetch the live state from Source of Truth (SoT) services. This action is audited.",
    "sotSuccess": "Source of Truth synchronized",
    "stateDrift": "State Drift Detected: {{count}} Fields",
    "driftDesc": "Snapshot (AdminDB) vs SoT (Shared Core) discrepancies detected.",
    "openHealth": "View System Health",
    "recommendedActions": "Recommended Actions",
    "containment": "Risk Containment",
    "noiseReduction": "Noise Reduction",
    "relatedContext": "Related Domain Context",
    "snapshotTab": "Snapshot (AdminDB)",
    "diffTab": "Integrity Check (Snapshot vs SoT)",
    "sotTab": "Source of Truth (SoT)",
    "diffDisabledDesc": "Integrity comparison requires live SoT data synchronization.",
    "rawView": "Raw JSON View"
  },
  "modals": {
    "ack": {
      "commentRequired": "Handling notes are required for audit"
    },
    "freeze": {
      "title": "Freeze Device Entitlement",
      "warningTitle": "High-Risk Operation Warning",
      "warningDesc": "Freezing will immediately terminate edge inferences and block access for this entitlement.",
      "targetLabel": "Target Entitlement ID",
      "reasonLabel": "Justification Reason",
      "reasonRequired": "Justification is mandatory (min 10 chars)",
      "reasonPlaceholder": "Explain why this containment action is required...",
      "ticketLabel": "Jira / Ticket ID (Optional)",
      "ticketPlaceholder": "e.g., OPS-12345",
      "understandLabel": "I understand the operational impact",
      "understandDesc": "This action will impact live production flows and is recorded as an administrative override.",
      "confirm": "Execute Freeze"
    },
    "suppress": {
      "title": "Suppress Alert",
      "statusUpdate": "Transition state to SUPPRESSED for known maintenance window.",
      "guidance": "Suppression window blocks event propagation to notification channels.",
      "windowLabel": "Suppression Window",
      "windows": {
        "2h": "2 Hours",
        "24h": "24 Hours"
      },
      "custom": "Custom Range",
      "reasonLabel": "Suppression Note",
      "reasonRequired": "A suppression reason is required for the audit trail",
      "reasonPlaceholder": "Describe the maintenance window or known issue...",
      "confirm": "Apply Suppression"
    },
    "result": {
      "statusTitle": "Operation Tracking",
      "auditTraceTitle": "Administrative Audit Trace",
      "opIdLabel": "Admin Operation ID (adminOpId)",
      "viewAudit": "View Full Audit Log",
      "doneBtn": "Done",
      "naPlaceholder": "N/A",
      "naCaption": "No downstream trace recorded",
      "operatorLabel": "Operator",
      "startedAt": "Started At",
      "processingTime": "Duration",
      "notReported": "Pending Completion",
      "subjectTypeLabel": "Subject Type",
      "subjectIdLabel": "Subject ID",
      "idempLabel": "Idempotency Key",
      "entitlementIdLabel": "Entitlement ID",
      "reasonLabel": "Reason",
      "payloadLabel": "Request Payload",
      "noPayloadCaption": "Zero-payload transaction",
      "responseCode": "Response Code",
      "responseMsg": "System Message",
      "keyChanges": "Key State Changes (Before/After)",
      "noDelta": "No state delta detected in this transaction",
      "rawJson": "Transaction Snapshot (Raw)",
      "processing": "Processing...",
      "retry": "Safe Retry",
      "sections": {
        "request": "Operation Request",
        "downstream": "Downstream Call Trace",
        "response": "Core Service Response",
        "feedback": "Execution Feedback"
      },
      "tooltips": {
        "idempNotProvided": "Idempotency key omitted"
      }
    }
  }
};