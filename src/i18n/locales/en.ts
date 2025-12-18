
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
      "ready": "Ready"
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
      "overview": {
        "title": "Self-hosted Overview",
        "kpi": {
          "totalDevices": "Total Devices",
          "online": "Online",
          "pendingLicense": "Pending License",
          "offline": "Offline",
          "licenseUsage": "License Usage",
          "expiringSoon": "{{count}} license(s) expiring soon",
          "usageSummary": "Usage Summary"
        },
        "charts": {
          "deviceStatus": "Device Status Distribution",
          "usageTrend": "Usage Trend",
          "edge": "Edge Compute",
          "cloud": "Cloud Runner",
          "images": "Images",
          "video": "Video",
          "count": "Count"
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
        }
      },
      "deviceDetail": {
        "tabs": {
          "overview": "Overview",
          "workflow": "Workflows",
          "usage": "Usage",
          "logs": "Telemetry & Logs"
        },
        "summary": {
          "overviewTitle": "Device Overview",
          "licenseTitle": "License Information",
          "configTitle": "Current Configuration",
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
          "lastModifiedTime": "Last Modified Time",
          "viewHistory": "View History",
          "licenseUpdated": "License updated successfully",
          "mode": "Mode",
          "streamsRunning": "{{count}} Streams Running"
        },
        "overview": {
          "diagnostics": "Health & Diagnostics",
          "reason": "Current Health Reason",
          "kpiHeartbeat": "Last Heartbeat",
          "kpiStreams": "Running Streams",
          "usagePreview": "24h Usage Preview",
          "recentAlerts": "Active Alerts",
          "viewAll": "View All"
        },
        "workflow": {
          "verBanner": "Configuration: {{ver}}",
          "newVerAvailable": "New version available",
          "rollback": "Rollback",
          "history": "History",
          "addStream": "Add Stream",
          "cols": {
            "name": "Stream Name",
            "type": "Type",
            "workflow": "Workflow",
            "telemetry": "Telemetry"
          }
        },
        "usage": {
          "dim": "Dimension",
          "dimWorkflow": "Workflow",
          "dimStream": "Stream",
          "mode": "Mode",
          "metric": "Metric",
          "metricImg": "Images",
          "metricVid": "Video",
          "tableCols": {
            "calls": "Total Calls",
            "errors": "Errors",
            "errorRate": "Error Rate"
          },
          "footerNote": "CLOUD usage incurs cost. EDGE usage is for metering only."
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
        "unbound": "Unbound"
      }
    }
  }
};
