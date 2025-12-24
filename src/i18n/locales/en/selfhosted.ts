
export const selfhosted = {
  "overview": {
    "title": "Edge Overview",
    "kpi": {
      "totalDevices": "Total Devices",
      "online": "Online",
      "offline": "Offline",
      "pendingLicense": "Pending License",
      "licenseUsage": "License Quota",
      "expiringSoon": "{{count}} Expiring Soon",
      "usageSummary": "Usage Telemetry",
      "utilization": "Utilization",
      "activeLicenses": "Active Licenses",
      "expiring": "Expiring Soon",
      "pending": "Pending Devices"
    },
    "charts": {
      "edge": "Edge",
      "cloud": "Cloud",
      "images": "Images",
      "video": "Video",
      "count": "Count",
      "deviceStatus": "Device Status Distribution",
      "usageTrend": "Inference Usage Trend",
      "breakdown": "License Distribution",
      "usageSeries": "Actual Usage",
      "quotaSeries": "Quota Limit"
    },
    "alerts": {
      "title": "Recent System Alerts",
      "viewAll": "View All",
      "target": "Target",
      "critical": "Critical",
      "warning": "Warning",
      "info": "Info"
    },
    "shortcuts": {
      "title": "Quick Navigation",
      "viewDeviceList": "View Device Fleet",
      "manageLicenses": "Manage Licenses",
      "recentDeployments": "Check Deployment History"
    },
    "actions": {
      "upload": "Upload License",
      "devices": "Devices",
      "manage": "Manage",
      "guide": "Guides"
    },
    "timeRange": {
      "24h": "24 Hours",
      "7d": "7 Days",
      "30d": "30 Days"
    }
  },
  "status": {
    "online": "Online",
    "offline": "Offline",
    "maintenance": "Draining",
    "error": "Error",
    "pending": "Pending License",
    "decommissioned": "Decommissioned",
    "running": "Running",
    "paused": "Paused",
    "disabled": "Disabled"
  },
  "mode": {
    "edgeDesc": "Local edge processing.",
    "cloudDesc": "Scale on Cloud runners.",
    "edge": "Edge",
    "cloud": "Cloud"
  },
  "actions": {
    "bind": "Bind License",
    "drain": "Drain",
    "view": "View Details",
    "edit": "Edit",
    "delete": "Delete",
    "start": "Start",
    "pause": "Pause"
  },
  "devices": {
    "title": "Device Fleet",
    "searchPlaceholder": "Search by name or device ID...",
    "noData": "No devices found",
    "unbound": "Unbound",
    "cols": {
      "name": "Device Name",
      "id": "Device ID",
      "status": "Status",
      "mode": "Mode",
      "license": "Active License",
      "lastSeen": "Last Seen"
    },
    "alert": {
      "pendingMessage": "You have <bold>{{count}} unbound devices</bold> awaiting license assignment.",
      "filterAction": "Filter pending"
    }
  },
  "license": {
    "title": "License Management",
    "upload": "Upload New License",
    "noData": "No license keys found",
    "daysLeft": "{{count}} days left",
    "selectTitle": "Select License",
    "selectedLabel": "Selected",
    "quotaAvailable": "{{count}} / {{total}} Available",
    "cols": {
      "name": "License Name",
      "key": "License Key",
      "type": "Type",
      "billing": "Billing",
      "usage": "Utilization",
      "expiry": "Expiry"
    },
    "actions": {
      "viewUsage": "View Usage",
      "extend": "Extend"
    }
  },
  "deviceDetail": {
    "tabs": {
      "overview": "Overview",
      "workflow": "Deployment",
      "usage": "Analytics",
      "logs": "System Logs"
    },
    "overview": {
      "units": "Inferences",
      "unitsTooltip": "Combined count of images and video frames processed.",
      "recentAlerts": "Recent Alerts",
      "unboundBanner": "This device is not linked to a valid license. Monitoring and deployment are disabled.",
      "usageDisabledTitle": "Telemetry Unavailable",
      "usageDisabledDesc": "Telemetry and inference tracking are disabled until the device is bound to a valid license."
    },
    "summary": {
      "overviewTitle": "Device Identity",
      "licenseTitle": "License Status",
      "configTitle": "Deployment",
      "deviceId": "Hardware ID",
      "runtimeId": "Runtime ID",
      "lastSeen": "Last Seen",
      "expiry": "Expiration",
      "quota": "Stream Quota",
      "offlineLease": "Offline Lease",
      "changeLicense": "Change License",
      "viewHistory": "History",
      "streamsCount": "Active Streams",
      "configuredBy": "Configured By",
      "lastModifiedTime": "Last Modified",
      "changeMode": "Change Deployment Mode",
      "awaitingLicense": "Awaiting License",
      "noConfigFound": "No configuration found",
      "noConfigDesc": "Configuration sync is disabled until licensed."
    },
    "workflow": {
      "rollback": "Rollback"
    }
  },
  "workflowDeployment": {
    "title": "Stream Deployments",
    "createTitle": "Deploy New Stream",
    "editTitle": "Edit Deployment",
    "addStream": "Deploy Stream",
    "latest": "LATEST",
    "lastUpdated": "Updated",
    "operator": "By",
    "viewHistory": "History",
    "streamName": "Stream Name",
    "input": "Input",
    "workflow": "Vision Logic",
    "status": "Status",
    "telemetry": "Telemetry",
    "updated": "Updated",
    "empty": "No active deployments",
    "basicInfo": "Basic Info",
    "nameLabel": "Stream Name",
    "nameRequired": "Please enter stream name",
    "namePlaceholder": "e.g. Front Gate Camera",
    "inputSource": "Input Source",
    "sourceType": "Protocol",
    "endpoint": "Endpoint",
    "endpointRequired": "Endpoint URL is required",
    "workflowBinding": "Workflow Binding",
    "selectWorkflow": "Select Logic",
    "selectWorkflowPlaceholder": "Choose a workflow",
    "versionStrategy": "Version Strategy",
    "runPolicy": "Execution Policy",
    "concurrency": "Instance Count",
    "telemetryGranularity": "Telemetry Level",
    "applyImmediately": "Apply Changes Immediately",
    "applyImmediatelyDesc": "Restart stream processing to apply new configuration now.",
    "createBtn": "Start Deployment",
    "updateBtn": "Update Config",
    "historyTitle": "Deployment History",
    "snapshot": "Snapshot",
    "diff": "Diff",
    "rollbackTitle": "Confirm Rollback",
    "rollbackDesc": "This will revert the device configuration to version {{version}}.",
    "rollbackConfirm": "Yes, Rollback",
    "noSnapshot": "No configuration details in this version",
    "loadingDiff": "Calculating configuration diff...",
    "historyType": {
      "initial": "INITIAL",
      "update": "UPDATE",
      "rollback": "ROLLBACK"
    },
    "telemetryLevel": {
      "heartbeat": "Heartbeat Only",
      "heartbeatDesc": "Online check with minimal overhead.",
      "metrics": "Standard Metrics",
      "metricsDesc": "Throughput, FPS and Error rates.",
      "diagnostic": "Diagnostic Traces",
      "diagnosticDesc": "Full pipeline trace for debugging."
    }
  },
  "usage": {
    "dim": "Dimension",
    "dimWorkflow": "Workflow",
    "dimStream": "Stream",
    "metric": "Metric",
    "metricImg": "Image Count",
    "metricVid": "Video Secs",
    "dateRange": "Date Range",
    "modeFilter": "Execution Mode",
    "modes": {
      "all": "All Modes",
      "edge": "Edge Only",
      "cloud": "Cloud Only"
    },
    "tableCols": {
      "calls": "Total Runs",
      "errors": "Errors",
      "errorRate": "Error Rate"
    },
    "footerNote": "Usage data is synchronized every 5 minutes from edge nodes."
  },
  "logs": {
    "title": "Advanced Trace Analysis",
    "description": "Access full system logs and execution traces for device <bold>{{id}}</bold> via SigNoz integration.",
    "launchBtn": "Launch Monitoring Console"
  }
};
