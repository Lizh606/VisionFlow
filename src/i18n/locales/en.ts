
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
      "choose": "Choose",
      "confirm": "Confirm",
      "status": "Status",
      "ready": "Ready",
      "noData": "No data available",
      "pause": "Pause",
      "start": "Start",
      "enabled": "Enabled",
      "disabled": "Disabled",
      "language": "Language"
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
    "workflows": {
      "title": "Workflows",
      "inviteTeam": "Invite Team",
      "helpTooltip": "Manage your workflows and computer vision processing logic.",
      "searchPlaceholder": "Search workflows...",
      "view": {
        "list": "List View",
        "grid": "Grid View"
      },
      "actions": {
        "newFolder": "New Folder",
        "explore": "Explore Templates",
        "create": "Create Workflow"
      },
      "folders": {
        "count": "{{count}} Workflow",
        "count_plural": "{{count}} Workflows",
        "create": "Create folder",
        "nameLabel": "Folder Name",
        "namePlaceholder": "e.g. Production Workflows",
        "nameRequired": "Please enter folder name"
      },
      "table": {
        "name": "Workflow Name",
        "updated": "Last Updated"
      },
      "empty": {
        "folder": "This folder is empty",
        "folderDesc": "Start by creating a workflow inside this folder.",
        "global": "No workflows found",
        "globalDesc": "Create your first workflow to get started."
      },
      "templates": {
        "modalTitle": "Choose a template and configure",
        "gallery": "Gallery",
        "popular": "Popular Templates",
        "emptyTitle": "Select a template to preview and configure",
        "emptyDesc": "Browse the gallery on the left to see workflow architectures and customization options.",
        "architecture": "Workflow Architecture",
        "customize": "Customize",
        "customizeDesc": "Select a model or configure parameters.",
        "pickModel": "Pick a model:",
        "noConfig": "No configuration required",
        "noConfigDesc": "This template uses built-in processing logic and does not require an external vision model to start.",
        "footerHint": "Please select a template from the gallery",
        "advancedHint": "Advanced logic and inference nodes can be further customized in the workflow editor after creation."
      }
    },
    "selfhosted": {
      "overview": {
        "title": "Self-hosted Overview",
        "timeRange": {
          "24h": "Last 24h",
          "7d": "Last 7d",
          "30d": "Last 30d"
        },
        "kpi": {
          "totalDevices": "Total Devices",
          "online": "Online",
          "pendingLicense": "Pending License",
          "offline": "Offline",
          "licenseUsage": "License Usage",
          "expiringSoon": "{{count}} expiring soon",
          "usageSummary": "Usage Summary",
          "utilization": "Quota Utilization",
          "activeLicenses": "Active Licenses",
          "expiring": "Expiring Soon",
          "pending": "Pending Devices"
        },
        "charts": {
          "deviceStatus": "Device Status Distribution",
          "usageTrend": "Processing Trend",
          "edge": "Edge Processing",
          "cloud": "Cloud Processing",
          "images": "Images",
          "video": "Video",
          "count": "Count",
          "breakdown": "License Breakdown",
          "usageSeries": "Actual Usage",
          "quotaSeries": "Total Quota"
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
          "title": "Quick Access",
          "viewDeviceList": "Device Fleet",
          "manageLicenses": "License Management",
          "recentDeployments": "Deployment Logs"
        },
        "quickActions": {
          "title": "Quick Actions"
        },
        "actions": {
          "upload": "Upload License",
          "devices": "Manage Devices",
          "manage": "Licenses",
          "guide": "Setup Guide"
        }
      },
      "devices": {
        "title": "Device Fleet",
        "searchPlaceholder": "Search by name or device ID...",
        "unbound": "Unlicensed",
        "noData": "No devices matched your filters",
        "cols": {
          "name": "Device Name",
          "id": "Device ID",
          "status": "Status",
          "mode": "Mode",
          "license": "License",
          "lastSeen": "Last Seen"
        },
        "alert": {
          "pendingMessage": "There are <bold>{{count}}</bold> devices awaiting license assignment.",
          "filterAction": "View Pending"
        }
      },
      "deviceDetail": {
        "summary": {
          "overviewTitle": "Device Overview",
          "deviceId": "Device ID",
          "runtimeId": "Runtime ID",
          "lastSeen": "Last Seen",
          "changeMode": "Change Mode",
          "licenseTitle": "License & Entitlement",
          "changeLicense": "Change",
          "expiry": "Expiration",
          "quota": "Usage Quota",
          "offlineLease": "Offline Lease",
          "configTitle": "Deployment Config",
          "viewHistory": "History",
          "streamsCount": "Active Streams",
          "configuredBy": "Configured By",
          "lastModifiedTime": "Last Modified",
          "mode": "Deployment Mode"
        },
        "overview": {
          "units": "Inference Calls",
          "unitsTooltip": "Total processed inferences in the selected time window.",
          "recentAlerts": "Recent Alerts"
        },
        "tabs": {
          "overview": "Overview",
          "workflow": "Deployment",
          "usage": "Telemetry",
          "logs": "System Logs"
        },
        "workflow": {
          "rollback": "Rollback to this version"
        }
      },
      "workflowDeployment": {
        "title": "Stream Deployments",
        "addStream": "Deploy Stream",
        "streamName": "Stream Name",
        "input": "Input",
        "workflow": "Workflow",
        "status": "Status",
        "telemetry": "Telemetry",
        "updated": "Updated",
        "latest": "LATEST",
        "historyTitle": "Deployment History",
        "lastUpdated": "Last Deployment",
        "operator": "Operator",
        "viewHistory": "History",
        "editTitle": "Edit Stream Deployment",
        "createTitle": "Deploy New Stream",
        "basicInfo": "General Identity",
        "nameLabel": "Stream Name",
        "nameRequired": "Stream name is required",
        "namePlaceholder": "e.g. South Parking Cam",
        "inputSource": "Input Configuration",
        "sourceType": "Source Type",
        "endpoint": "Endpoint URL",
        "endpointRequired": "Connection URL is required",
        "workflowBinding": "Workflow & Logic",
        "selectWorkflow": "Vision Workflow",
        "selectWorkflowPlaceholder": "Choose a workflow...",
        "versionStrategy": "Version Logic",
        "runPolicy": "Inference Policy",
        "concurrency": "Workers",
        "telemetryGranularity": "Telemetry Level",
        "applyImmediately": "Atomic Restart",
        "applyImmediatelyDesc": "Automatically restart processing nodes to apply these changes immediately.",
        "updateBtn": "Deploy Changes",
        "createBtn": "Start Stream",
        "snapshot": "Snapshot",
        "diff": "Diff",
        "noSnapshot": "No configuration snapshot available",
        "loadingDiff": "Calculating configuration differences...",
        "rollbackTitle": "Rollback to {{version}}?",
        "rollbackDesc": "This will stop current processing and restart nodes with the selected historical configuration.",
        "rollbackConfirm": "Confirm Rollback"
      },
      "usage": {
        "dim": "Dimension",
        "dimWorkflow": "By Workflow",
        "dimStream": "By Stream",
        "metric": "Metric",
        "metricImg": "Images",
        "metricVid": "Video",
        "dateRange": "Time Window",
        "modeFilter": "Compute Mode",
        "modes": {
          "all": "All Modes",
          "edge": "Edge Only",
          "cloud": "Cloud Only"
        },
        "tableCols": {
          "calls": "Inference Calls",
          "errors": "Failures",
          "errorRate": "Error Rate"
        },
        "footerNote": "Telemetry data is aggregated across all active nodes with a 5-minute latency."
      },
      "logs": {
        "title": "Centralized Observability",
        "description": "System logs for device <bold>{{id}}</bold> are streamed to your centralized logging backend.",
        "launchBtn": "Open Log Console"
      },
      "license": {
        "title": "License Management",
        "upload": "Add License",
        "noData": "No licenses found in this workspace",
        "selectTitle": "Select Entitlement License",
        "quotaAvailable": "{{count}} / {{total}} Available",
        "selectedLabel": "Selected License",
        "daysLeft": "{{count}} days left",
        "cols": {
          "name": "License Name",
          "key": "License Key",
          "type": "Type",
          "billing": "Billing",
          "usage": "Capacity",
          "expiry": "Expiry"
        },
        "actions": {
          "viewUsage": "Usage Report",
          "extend": "Renew License"
        }
      },
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
      }
    }
  }
};
