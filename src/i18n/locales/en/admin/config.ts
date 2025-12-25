
export const config = {
  "title": "Configuration",
  "subtitle": "Centralized management for operational logic and business rules.",
  "status": {
    "available": "Available",
    "comingSoon": "Coming Soon",
    "noAccess": "No Access"
  },
  "cards": {
    "alertRules": {
      "title": "Alert Rules",
      "desc": "Logic for anomaly detection across the VisionFlow cluster."
    },
    "notificationRouting": {
      "title": "Notification Channels",
      "desc": "Orchestration of alerts to pre-configured communication channels."
    },
    "templates": {
      "title": "Pricing/RevShare Templates",
      "desc": "Global configuration schemas for pricing and revenue sharing."
    }
  },
  "common": {
    "close": "Close",
    "copy": "Copy",
    "expression": "Expression",
    "overview": "Overview",
    "lastUpdated": "Last Modified",
    "updatedBy": "Updated By"
  },
  "alertRules": {
    "title": "Alert Rule Library",
    "searchPlaceholder": "Filter rules by name...",
    "table": {
      "ruleName": "Rule Name",
      "domain": "Domain",
      "severity": "Severity",
      "status": "Status",
      "updated": "Last Modified"
    },
    "drawer": {
      "title": "Rule Specification",
      "overview": "Policy Overview",
      "definition": "Detection Logic",
      "copyHint": "Read-only mode. Adjustments must be pushed via GitOps pipeline."
    }
  },
  "notificationRouting": {
    "title": "Channel Orchestration",
    "searchPlaceholder": "Search by route name or channel...",
    "table": {
      "routeName": "Route Name",
      "channel": "Channel",
      "target": "Delivery Target",
      "status": "Status",
      "updated": "Last Updated"
    },
    "drawer": {
      "title": "Channel Detail",
      "conditions": "Match Conditions",
      "target": "Secured Endpoint",
      "maskHint": "Target masked for security."
    }
  },
  "templates": {
    "title": "Pricing & RevShare Templates",
    "searchPlaceholder": "Search by template name...",
    "table": {
      "name": "Template Name",
      "type": "Category",
      "version": "Version",
      "status": "State",
      "updated": "Last Modified"
    },
    "drawer": {
      "title": "Template Catalog",
      "versions": "Version Trace",
      "content": "Source Preview",
      "cloneBtn": "Copy as New Version",
      "cloneModalTitle": "Clone Configuration",
      "cloneModalHint": "Specify a reason to create a new audited draft version of this template.",
      "viewAudit": "View in Audit Log"
    }
  }
};
