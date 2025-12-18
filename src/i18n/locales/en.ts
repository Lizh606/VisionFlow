
export const en = {
  translation: {
    "app": { "title": "VisionFlow" },
    "common": {
      "search": "Search...",
      "refresh": "Refresh",
      "export": "Export",
      "filter": "Filters",
      "actions": "Actions",
      "viewDetails": "View Details",
      "total": "Total {{total}} items",
      "loading": "Loading...",
      "allStatus": "All Status",
      "allModes": "All Modes",
      "copy": "Copy",
      "save": "Save",
      "cancel": "Cancel",
      "delete": "Delete",
      "edit": "Edit",
      "confirm": "Confirm",
      "status": "Status",
      "ready": "Ready",
      "noData": "No data available",
      "pause": "Pause",
      "start": "Start",
      "enabled": "Enabled",
      "disabled": "Disabled"
    },
    "menu": {
      "workflows": "Workflows",
      "selfHosted": "Self-hosted",
      "overview": "Overview",
      "devices": "Devices",
      "license": "License",
      "support": "Help & Support",
      "settings": "Settings",
      "security": "Security"
    },
    "selfhosted": {
      "status": {
        "online": "Online",
        "offline": "Offline",
        "maintenance": "Draining",
        "error": "Error",
        "pending": "Pending License",
        "decommissioned": "Decommissioned"
      },
      "mode": {
        "edge": "Edge",
        "edgeDesc": "Processed locally. License metering only.",
        "cloud": "Cloud",
        "cloudDesc": "Processed on VisionFlow Cloud. Usage billing applies."
      },
      "usage": {
        "dim": "Dimension",
        "dimWorkflow": "Workflow",
        "dimStream": "Stream",
        "metric": "Metric",
        "metricImg": "Images",
        "metricVid": "Video",
        "dateRange": "Date Range",
        "modeFilter": "Mode Filter",
        "modes": {
          "all": "All Modes",
          "edge": "EDGE Only",
          "cloud": "CLOUD Only"
        },
        "footerNote": "Data is synchronized every 5 minutes. High availability mode might cause double counting during failover.",
        "tableCols": {
          "calls": "Total Calls",
          "errors": "Errors",
          "errorRate": "Error Rate"
        }
      },
      "logs": {
        "title": "Advanced Telemetry & Logs",
        "description": "Detailed system logs and trace data are stored in VisionFlow Observability (SigNoz). You can view raw telemetry for Device <bold>{{id}}</bold> there.",
        "launchBtn": "Launch Observability Shell"
      },
      "overview": {
        "title": "Self-hosted Overview",
        "kpi": {
          "totalDevices": "Total Devices",
          "online": "Online",
          "pendingLicense": "Pending License",
          "offline": "Offline",
          "licenseUsage": "License Usage",
          "expiringSoon": "{{count}} license(s) expiring soon",
          "usageSummary": "Usage Summary",
          "utilization": "Utilization",
          "activeLicenses": "Active Licenses",
          "expiring": "Expiring Soon",
          "pending": "Pending Devices"
        },
        "charts": {
          "deviceStatus": "Device Status Distribution",
          "usageTrend": "Usage Trend",
          "edge": "Edge Compute",
          "cloud": "Cloud Runner",
          "images": "Images",
          "video": "Video",
          "count": "Count",
          "usageSeries": "Actual Usage",
          "quotaSeries": "Quota Limit",
          "breakdown": "License Distribution"
        },
        "alerts": {
          "title": "Active Alerts",
          "viewAll": "View All",
          "critical": "Critical",
          "warning": "Warning",
          "info": "Info",
          "target": "Target"
        },
        "shortcuts": {
          "title": "Quick Shortcuts",
          "viewDeviceList": "View Device List",
          "manageLicenses": "Manage Licenses",
          "recentDeployments": "Recent Deployments"
        },
        "timeRange": {
          "24h": "Last 24h",
          "7d": "Last 7d",
          "30d": "Last 30d"
        },
        "quickActions": {
          "title": "Quick Actions"
        },
        "actions": {
          "upload": "Upload License",
          "devices": "View Devices",
          "manage": "Manage License",
          "guide": "Setup Guide"
        }
      },
      "workflowDeployment": {
        "title": "Streams Deployment",
        "addStream": "Add Stream",
        "empty": "No streams configured",
        "startConfig": "Start Configuring Now",
        "currentVersion": "Active Config",
        "latest": "Latest Stable",
        "lastUpdated": "Updated",
        "operator": "Operator",
        "viewHistory": "Version History",
        "streamName": "STREAM",
        "input": "INPUT",
        "workflow": "WORKFLOW BINDING",
        "status": "STATUS",
        "telemetry": "TELEMETRY",
        "updated": "LAST UPDATED",
        "actions": "ACTIONS",
        "readOnly": "Read-only access",
        "deleteStream": "Delete Stream",
        "editConfig": "Edit Stream",
        "rollbackTitle": "Rollback to version {{version}}?",
        "rollbackDesc": "This will reset all stream states. Please confirm this action.",
        "rollbackConfirm": "Confirm Rollback",
        "historyTitle": "Version History",
        "snapshot": "Snapshot Summary",
        "diff": "Change Diff",
        "noSnapshot": "No snapshot data",
        "loadingDiff": "Loading Diff view...",
        "editTitle": "Edit Stream Configuration",
        "createTitle": "Add Stream Configuration",
        "createBtn": "Create Stream",
        "updateBtn": "Save Changes",
        "basicInfo": "Basic Info",
        "inputSource": "Input Source Configuration",
        "workflowBinding": "Workflow Binding",
        "runPolicy": "Run Policy",
        "nameLabel": "Stream Name",
        "nameRequired": "Please enter name",
        "namePlaceholder": "e.g. North Gate Monitoring",
        "streamId": "Stream ID",
        "autoGen": "System Assigned",
        "sourceType": "Protocol Type",
        "endpoint": "URL / Path",
        "endpointRequired": "Please enter endpoint",
        "selectWorkflow": "Select Workflow",
        "selectWorkflowPlaceholder": "Select workflow template",
        "versionStrategy": "Version Strategy",
        "concurrency": "Instance Concurrency",
        "telemetryGranularity": "Telemetry Detail Level",
        "heartbeatOnly": "Heartbeat Only",
        "heartbeatDesc": "Ultra-low power, online check only.",
        "metricsOnly": "Metrics (Recommended)",
        "metricsDesc": "Includes throughput, latency, FPS, etc.",
        "diagnostic": "Diagnostic Telemetry",
        "diagnosticDesc": "Full trace data, high resource overhead.",
        "applyImmediately": "Apply changes immediately",
        "applyImmediatelyDesc": "This might cause a brief restart of running streams."
      },
      "deviceDetail": {
        "tabs": {
          "overview": "Overview",
          "workflow": "Deployment (Streams)",
          "usage": "Analytics",
          "logs": "Telemetry"
        },
        "summary": {
          "overviewTitle": "Device Overview",
          "licenseTitle": "License Info",
          "configTitle": "Config Version",
          "deviceId": "Device ID",
          "runtimeId": "Runtime ID",
          "lastSeen": "Last Seen",
          "changeMode": "Switch Mode",
          "changeLicense": "Change License",
          "licenseType": "Type",
          "expiry": "Expiry",
          "quota": "Quota (Used/Total)",
          "offlineLease": "Offline Lease",
          "configVer": "Version",
          "streamsCount": "Active Streams",
          "configuredBy": "Configured By",
          "lastModified": "Last Modified",
          "lastModifiedTime": "Modified At",
          "viewHistory": "View History",
          "licenseUpdated": "License updated successfully",
          "mode": "Mode",
          "streamsRunning": "{{count}} Streams"
        },
        "overview": {
          "recentAlerts": "Recent Alerts",
          "units": "Image Units",
          "unitsTooltip": "Total inferred frames or triggers in selected timeframe."
        }
      },
      "license": {
        "title": "Licenses",
        "selectTitle": "Select License",
        "upload": "Upload License",
        "daysLeft": "({{count}} days left)",
        "noData": "No licenses found.",
        "cols": {
          "name": "Name",
          "key": "Key ID",
          "type": "Type",
          "billing": "Billing",
          "usage": "Usage",
          "expiry": "Expiry"
        },
        "actions": { "viewUsage": "Usage", "extend": "Extend" },
        "quotaAvailable": "{{count}} / {{total}} Available",
        "selectedLabel": "Selected License"
      },
      "devices": {
        "title": "Devices",
        "searchPlaceholder": "Search name, ID...",
        "alert": {
          "pendingMessage": "You have <bold>{{count}}</bold> new devices pending license binding.",
          "filterAction": "Filter Pending"
        },
        "cols": {
          "name": "Device Name",
          "id": "Device ID",
          "status": "Status",
          "mode": "Mode",
          "license": "License",
          "lastSeen": "Last Seen"
        },
        "unbound": "Unbound",
        "noData": "No devices matched your criteria."
      }
    }
  }
};
