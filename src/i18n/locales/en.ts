
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
      "language": "Language",
      "back": "Back",
      "retry": "Retry",
      "noPreview": "No Preview",
      "free": "Free",
      "upload": "Upload Image",
      "run": "Run Inference"
    },
    "menu": {
      "workflows": "Workflows",
      "marketplace": "Marketplace",
      "selfHosted": "Self-hosted",
      "overview": "Overview",
      "devices": "Devices",
      "license": "License",
      "support": "Help & Support",
      "settings": "Settings",
      "security": "Security",
      "folders": "Folders"
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
      "table": {
        "name": "Workflow Name",
        "updated": "Last Updated"
      },
      "folders": {
        "count": "{{count}} Workflow",
        "count_plural": "{{count}} Workflows",
        "create": "New Folder",
        "nameLabel": "Folder Name",
        "nameRequired": "Please enter folder name",
        "namePlaceholder": "e.g., Traffic Analysis"
      },
      "empty": {
        "global": "No workflows found",
        "globalDesc": "Get started by creating your first vision pipeline.",
        "folder": "Empty Folder",
        "folderDesc": "There are no workflows in this folder yet."
      },
      "templates": {
        "modalTitle": "Create from Template",
        "architecture": "Architecture",
        "customize": "Customize",
        "customizeDesc": "Select model and runtime parameters.",
        "pickModel": "Pick a detection model",
        "noConfig": "Auto-configuration",
        "noConfigDesc": "This template uses default blocks.",
        "emptyTitle": "Select a template",
        "emptyDesc": "Pick a template from the gallery to view architecture and customize details.",
        "footerHint": "Select a template to continue"
      }
    },
    "selfhosted": {
      "overview": {
        "title": "Edge Overview",
        "kpi": {
          "totalDevices": "Total Devices",
          "online": "Online",
          "pendingLicense": "Pending License",
          "offline": "Offline",
          "licenseUsage": "License Quota",
          "expiringSoon": "{{count}} expiring soon",
          "usageSummary": "Data Telemetry",
          "utilization": "Quota Utilization",
          "activeLicenses": "Active Licenses",
          "expiring": "Expiring Soon",
          "pending": "Unbound Devices"
        },
        "charts": {
          "deviceStatus": "Device Status Distribution",
          "count": "Count",
          "usageTrend": "Processing Trend",
          "edge": "Edge",
          "cloud": "Cloud",
          "images": "Images",
          "video": "Video",
          "breakdown": "License Breakdown",
          "usageSeries": "Actual Usage",
          "quotaSeries": "Quota Limit"
        },
        "alerts": {
          "title": "Recent Alerts",
          "critical": "Critical",
          "warning": "Warning",
          "info": "Info",
          "target": "Target",
          "viewAll": "View All"
        },
        "timeRange": {
          "24h": "Last 24h",
          "7d": "7 Days",
          "30d": "30 Days"
        },
        "quickActions": {
          "title": "Quick Actions"
        },
        "actions": {
          "upload": "Upload License",
          "devices": "View Devices",
          "manage": "Manage Keys",
          "guide": "Setup Guide"
        },
        "shortcuts": {
          "title": "Shortcuts",
          "viewDeviceList": "View Device List",
          "manageLicenses": "Manage Licenses",
          "recentDeployments": "Recent Deployments"
        }
      },
      "devices": {
        "title": "Device Fleet",
        "searchPlaceholder": "Search by name or device ID...",
        "noData": "No devices found",
        "unbound": "License Required",
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
      "deviceDetail": {
        "tabs": {
          "overview": "Overview",
          "workflow": "Deployment",
          "usage": "Analytics",
          "logs": "System Logs"
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
          "latest": "LATEST",
          "streamsCount": "Active Streams",
          "configuredBy": "Configured By",
          "lastModifiedTime": "Last Modified",
          "changeMode": "Change Deployment Mode"
        },
        "overview": {
          "units": "Inferences",
          "unitsTooltip": "Total number of frames processed by all workflows.",
          "recentAlerts": "Device Alerts"
        },
        "workflow": {
          "rollback": "Rollback to this version"
        }
      },
      "workflowDeployment": {
        "title": "Stream Deployments",
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
        "historyTitle": "Deployment History",
        "editTitle": "Edit Deployment",
        "createTitle": "New Deployment",
        "basicInfo": "Basic Information",
        "nameLabel": "Deployment Name",
        "nameRequired": "Enter a name",
        "namePlaceholder": "e.g., Gate Entrance Cam",
        "inputSource": "Input Source",
        "sourceType": "Protocol",
        "endpoint": "Endpoint",
        "endpointRequired": "URL is required",
        "workflowBinding": "Workflow Binding",
        "selectWorkflow": "Select Workflow",
        "selectWorkflowPlaceholder": "Choose a logic pipeline",
        "versionStrategy": "Version Policy",
        "runPolicy": "Execution Policy",
        "concurrency": "Concurrency",
        "telemetryGranularity": "Telemetry Level",
        "applyImmediately": "Apply Changes Immediately",
        "applyImmediatelyDesc": "Restart stream instance to apply new config.",
        "updateBtn": "Deploy Changes",
        "createBtn": "Deploy Stream",
        "noSnapshot": "No configuration snapshot available",
        "loadingDiff": "Calculating differences...",
        "snapshot": "Snapshot",
        "diff": "Diff",
        "rollbackTitle": "Rollback to {{version}}",
        "rollbackDesc": "The current configuration will be replaced by this historical version.",
        "rollbackConfirm": "Confirm Rollback"
      },
      "license": {
        "title": "License Management",
        "upload": "Upload New License",
        "noData": "No license keys found",
        "selectTitle": "Select License",
        "selectedLabel": "Selected",
        "quotaAvailable": "{{count}} / {{total}} Available",
        "daysLeft": "{{count}} days left",
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
          "extend": "Renew License"
        }
      },
      "usage": {
        "dim": "Dimension",
        "dimWorkflow": "Workflow",
        "dimStream": "Stream",
        "metric": "Metric",
        "metricImg": "Images",
        "metricVid": "Video Sec",
        "dateRange": "Time Range",
        "modeFilter": "Deployment Mode",
        "modes": {
          "all": "All Modes",
          "edge": "Edge Only",
          "cloud": "Cloud Only"
        },
        "tableCols": {
          "calls": "Total Calls",
          "errors": "Errors",
          "errorRate": "Error Rate"
        },
        "footerNote": "Telemetry data is cached locally and synchronized with the cloud every 5 minutes."
      },
      "logs": {
        "title": "Advanced Trace Analysis",
        "description": "Access full system logs and execution traces for device <bold>{{id}}</bold> via SigNoz integration.",
        "launchBtn": "Launch Monitoring Console"
      },
      "status": {
        "online": "Online",
        "offline": "Offline",
        "maintenance": "Draining",
        "error": "Error",
        "pending": "Pending License",
        "decommissioned": "Decommissioned",
        "ONLINE": "Online",
        "OFFLINE": "Offline",
        "ERROR": "Error",
        "PENDING_LICENSE": "Pending License",
        "DRAINING": "Draining",
        "DECOMMISSIONED": "Decommissioned"
      },
      "mode": {
        "edgeDesc": "Local edge processing.",
        "cloudDesc": "Scale on Cloud runners.",
        "edge": "Edge",
        "cloud": "Cloud"
      }
    },
    "marketplace": {
      "home": {
        "title": "Marketplace",
        "description": "Discover models, workflows, and plugins.",
        "heroTitle": "Find resources for your project.",
        "heroDesc": "Search, preview, and add assets to your workspace library.",
        "featuredTitle": "Featured Resources",
        "viewAll": "View All",
        "browseAll": "Browse All"
      },
      "detail": {
        "overview": "Overview",
        "examples": "Examples",
        "docs": "Documentation",
        "pricing": "Pricing",
        "author": "Developer",
        "released": "Released",
        "installs": "Installs",
        "supportedDevices": "Supported Devices",
        "cta": {
          "loginToAction": "Log in to Test / Buy",
          "cloudTest": "Cloud Test",
          "buyNow": "Buy Now",
          "getFree": "Get for Free",
          "openStudio": "Open in Studio",
          "deploy": "Deploy to Self-hosted",
          "viewEntitlement": "View Entitlement",
          "unavailable": "Listing Unavailable",
          "suspendedDesc": "This resource is suspended by the developer.",
          "archivedDesc": "This is an archived version and no longer for sale."
        }
      },
      "cloudTest": {
        "title": "Cloud Test Sandbox",
        "inputSection": "Test Input",
        "configSection": "Runtime Config",
        "resultSection": "Analysis Results",
        "selectExample": "Pick from Examples",
        "dropZone": "Drag and drop or click to upload",
        "threshold": "Confidence Threshold",
        "maxDetections": "Max Detections",
        "running": "Inference Running...",
        "queued": "In Queue...",
        "success": "Inference Completed",
        "viewRaw": "View Raw JSON",
        "errors": {
          "quota": "Test Quota Exhausted",
          "quotaDesc": "You have used all your free test credits for this resource.",
          "invalid": "Unsupported Image Format",
          "studio": "Cloud Inference Engine Error",
          "buyToContinue": "Buy Resource to unlock unlimited testing"
        }
      },
      "search": {
        "title": "Search Marketplace",
        "placeholder": "Search models, workflows, plugins..."
      },
      "filters": {
        "title": "Filters",
        "reset": "Reset",
        "tags": "Tags",
        "taskType": "Task Type",
        "devices": "Supported Devices",
        "priceRange": "Price Range (USD)",
        "showResults": "Show Results"
      },
      "library": {
        "title": "My Library",
        "description": "Your purchased and subscribed assets."
      },
      "seller": {
        "dashboard": "Seller Dashboard",
        "myListings": "My Listings",
        "createListing": "New Listing"
      },
      "status": {
        "published": "Published",
        "draft": "Draft",
        "reviewing": "Reviewing"
      },
      "installs": "installs"
    }
  }
};
