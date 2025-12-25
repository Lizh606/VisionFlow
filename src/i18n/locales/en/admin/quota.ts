
export const quota = {
  "title": "Quota Policy",
  "description": "Global workspace resource limits and rate limiting orchestration.",
  "syncBtn": "Sync Policies",
  "syncSuccess": "Quota catalog synchronized",
  "searchPlaceholder": "Search by workspaceId or name...",
  "statusFilter": {
    "all": "All Status",
    "active": "ACTIVE",
    "draft": "DRAFT",
    "disabled": "DISABLED"
  },
  "table": {
    "workspaceId": "workspaceId",
    "workspaceName": "Workspace Name",
    "freeQuota": "Free Quota",
    "rateLimit": "Rate Limit",
    "status": "Status",
    "lastUpdated": "Recently Updated"
  },
  "drawer": {
    "editTitle": "Adjust Quota Policy",
    "viewTitle": "Policy Configuration",
    "tabs": {
      "overview": "Overview",
      "preview": "Impact Preview",
      "json": "Policy JSON",
      "history": "History"
    },
    "sections": {
      "resource": "Resource Configuration",
      "resourceDesc": "Adjust operational limits based on workspace resource schema.",
      "governance": "Governance",
      "audit": "System Audit"
    },
    "fields": {
      "scope": "Enforcement Scope",
      "enforcement": "Policy Enforcement",
      "enforcementDesc": "Actively block requests exceeding the limits.",
      "version": "Policy Version",
      "syncAt": "Last Modified",
      "operator": "Updated By",
      "target": "Target Workspace ID"
    }
  },
  "modals": {
    "publish": {
      "title": "Publish Policy",
      "confirm": "Confirm Publish",
      "trackingTitle": "Immutable Audit Tracking",
      "trackingDesc": "This action updates the global resource management layer. A permanent record will be created in the audit trail.",
      "reasonLabel": "Reason (Required)",
      "reasonRequired": "A justification is required for the audit log",
      "reasonPlaceholder": "Explain why this policy adjustment is required...",
      "ticketLabel": "Ticket ID (Optional)",
      "ticketPlaceholder": "e.g. OPS-12345",
      "impactTitle": "Impact Assessment",
      "affectedWorkspace": "Affected workspace",
      "affectedWorkflow": "Affected workflow",
      "recentUsage": "Recent 24h usage",
      "propagationHint": "Changes will propagate across the fleet. Track progress in the Operation Status panel."
    }
  },
  "impact": {
    "title": "Last 24h Impact Analysis",
    "hint": "Setting limit to {{limit}} would result in {{count}} rate-limiting triggers.",
    "freshness": "Data Freshness: {{time}}",
    "source": "Source: Cluster usage-meter-svc"
  },
  "json": {
    "draft": "Draft Specification",
    "active": "Active Specification",
    "copy": "Copy JSON",
    "footerHint": "The JSON above represents the raw policy schema enforced by workspace agents."
  },
  "history": {
    "auditLabel": "AUDITED",
    "viewJson": "View JSON",
    "copyDraft": "Copy as new version"
  }
};
