
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Inline resources to ensure stability without JSON loader
const resources = {
  en: {
    translation: {
      "app": {
        "title": "VisionFlow"
      },
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
        "allModes": "All Modes"
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
        "license": {
          "title": "Licenses",
          "selectTitle": "Select a License",
          "upload": "Upload License",
          "daysLeft": "({{count}} days left)",
          "noData": "No licenses found.",
          "cols": {
            "name": "License Name",
            "key": "Key ID",
            "type": "Type",
            "billing": "Billing",
            "usage": "Usage",
            "expiry": "Expiry"
          },
          "actions": {
            "viewUsage": "View Usage",
            "extend": "Extend"
          }
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
          "actions": {
            "bind": "Bind License",
            "drain": "Set Draining"
          },
          "unbound": "Unbound",
          "unboundTooltip": "License binding is required for operation.",
          "noData": "No devices match your filters."
        },
        "overview": {
          "title": "Self-Hosted Overview",
          "timeRange": {
            "24h": "Last 24h",
            "7d": "Last 7 Days",
            "30d": "Last 30 Days"
          },
          "kpi": {
            "totalDevices": "Total Devices",
            "licenseUsage": "License Usage",
            "usageSummary": "Usage Summary",
            "online": "Online",
            "pendingLicense": "Pending License",
            "offline": "Offline",
            "expiringSoon": "{{count}} expiring soon",
            "utilization": "Utilization",
            "activeLicenses": "Active Licenses",
            "expiring": "Expiring",
            "pending": "Pending Devices"
          },
          "charts": {
            "deviceStatus": "Device Status",
            "usageTrend": "Usage Trend",
            "images": "Images",
            "video": "Video",
            "edge": "Edge",
            "cloud": "Cloud",
            "usageSeries": "Usage",
            "quotaSeries": "Quota",
            "breakdown": "License Breakdown"
          },
          "alerts": {
            "title": "Active Alerts",
            "critical": "Critical",
            "warning": "Warning",
            "info": "Info",
            "target": "Target",
            "viewDetails": "View Details",
            "viewAll": "View All"
          },
          "shortcuts": {
            "title": "Shortcuts",
            "viewDeviceList": "View Device List",
            "manageLicenses": "Manage Licenses",
            "recentDeployments": "Recent Deployments"
          },
          "actions": {
            "upload": "Upload License",
            "devices": "View Devices",
            "manage": "Manage Keys",
            "guide": "Setup Guide"
          },
          "quickActions": {
            "title": "Quick Actions"
          }
        }
      }
    }
  },
  zh: {
    translation: {
      "app": {
        "title": "VisionFlow"
      },
      "common": {
        "search": "搜索...",
        "refresh": "刷新",
        "export": "导出",
        "filter": "筛选",
        "actions": "操作",
        "viewDetails": "查看详情",
        "total": "共 {{total}} 条",
        "loading": "加载中...",
        "allStatus": "全部状态",
        "allModes": "全部模式"
      },
      "menu": {
        "workflows": "工作流",
        "selfHosted": "自托管",
        "overview": "概览",
        "devices": "设备",
        "license": "授权",
        "support": "帮助与支持",
        "settings": "设置",
        "security": "安全"
      },
      "selfhosted": {
        "status": {
          "online": "在线",
          "offline": "离线",
          "maintenance": "排空中",
          "error": "异常",
          "pending": "待绑定 License",
          "decommissioned": "已退役"
        },
        "mode": {
          "edge": "边缘端 (Edge)",
          "edgeDesc": "本地处理，仅上报 License 计量数据。",
          "cloud": "云端 (Cloud)",
          "cloudDesc": "在 VisionFlow 云端处理，按量计费。"
        },
        "license": {
          "title": "授权管理",
          "selectTitle": "选择授权",
          "upload": "上传授权",
          "daysLeft": "(剩余 {{count}} 天)",
          "noData": "未找到授权信息",
          "cols": {
            "name": "授权名称",
            "key": "密钥 ID",
            "type": "类型",
            "billing": "计费模式",
            "usage": "使用情况",
            "expiry": "到期时间"
          },
          "actions": {
            "viewUsage": "查看用量",
            "extend": "续期"
          }
        },
        "devices": {
          "title": "设备列表",
          "searchPlaceholder": "搜索名称、ID...",
          "alert": {
            "pendingMessage": "检测到 <bold>{{count}}</bold> 台新设备等待绑定 License。",
            "filterAction": "筛选待绑定设备"
          },
          "cols": {
            "name": "设备名称",
            "id": "设备 ID",
            "status": "状态",
            "mode": "部署模式",
            "license": "关联 License",
            "lastSeen": "最后在线"
          },
          "actions": {
            "bind": "绑定 License",
            "drain": "设为排空 (Drain)"
          },
          "unbound": "未绑定",
          "unboundTooltip": "设备需绑定 License 才能开始处理任务。",
          "noData": "未找到符合条件的设备。"
        },
        "overview": {
          "title": "自托管概览",
          "timeRange": {
            "24h": "最近24小时",
            "7d": "最近7天",
            "30d": "最近30天"
          },
          "kpi": {
            "totalDevices": "设备总数",
            "licenseUsage": "授权使用",
            "usageSummary": "用量汇总",
            "online": "在线",
            "pendingLicense": "待授权",
            "offline": "离线",
            "expiringSoon": "{{count}} 个即将过期",
            "utilization": "利用率",
            "activeLicenses": "活跃授权",
            "expiring": "即将过期",
            "pending": "待绑定设备"
          },
          "charts": {
            "deviceStatus": "设备状态",
            "usageTrend": "使用趋势",
            "images": "图片",
            "video": "视频",
            "edge": "边缘端",
            "cloud": "云端",
            "usageSeries": "用量",
            "quotaSeries": "配额",
            "breakdown": "授权分布"
          },
          "alerts": {
            "title": "活跃告警",
            "critical": "严重",
            "warning": "警告",
            "info": "信息",
            "target": "目标",
            "viewDetails": "查看详情",
            "viewAll": "查看全部"
          },
          "shortcuts": {
            "title": "快捷入口",
            "viewDeviceList": "查看设备列表",
            "manageLicenses": "管理授权",
            "recentDeployments": "近期部署"
          },
          "actions": {
            "upload": "上传授权",
            "devices": "查看设备",
            "manage": "管理密钥",
            "guide": "安装指南"
          },
          "quickActions": {
            "title": "快捷操作"
          }
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // In a real app, this should detect browser language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
