
export const zh = {
  translation: {
    "app": { "title": "VisionFlow" },
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
      "allModes": "全部模式",
      "copy": "复制",
      "save": "保存",
      "cancel": "取消",
      "delete": "删除",
      "edit": "编辑",
      "confirm": "确认",
      "status": "状态",
      "ready": "就绪"
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
        "pending": "待授权",
        "decommissioned": "已退役"
      },
      "mode": {
        "edge": "边缘端",
        "edgeDesc": "本地处理。仅上报授权统计。",
        "cloud": "云端",
        "cloudDesc": "在 VisionFlow 云端处理。按量计费。"
      },
      "overview": {
        "title": "自托管概览",
        "kpi": {
          "totalDevices": "总设备数",
          "online": "在线",
          "pendingLicense": "待授权",
          "offline": "离线",
          "licenseUsage": "授权使用率",
          "expiringSoon": "{{count}} 个授权即将到期",
          "usageSummary": "用量概览"
        },
        "charts": {
          "deviceStatus": "设备状态分布",
          "usageTrend": "用量趋势",
          "edge": "边缘端计算",
          "cloud": "云端运行器",
          "images": "图片",
          "video": "视频",
          "count": "数量"
        },
        "alerts": {
          "title": "活跃告警",
          "viewAll": "查看全部",
          "critical": "严重",
          "warning": "警告",
          "info": "信息",
          "target": "目标"
        },
        "shortcuts": {
          "title": "快捷入口",
          "viewDeviceList": "查看设备列表",
          "manageLicenses": "管理授权证书",
          "recentDeployments": "最近部署记录"
        },
        "timeRange": {
          "24h": "最近 24h",
          "7d": "最近 7d",
          "30d": "最近 30d"
        }
      },
      "deviceDetail": {
        "tabs": {
          "overview": "总览",
          "workflow": "工作流",
          "usage": "用量",
          "logs": "遥测与日志"
        },
        "summary": {
          "overviewTitle": "设备概览",
          "licenseTitle": "授权信息",
          "configTitle": "当前配置",
          "deviceId": "设备 ID",
          "runtimeId": "运行 ID",
          "lastSeen": "最后在线",
          "changeMode": "切换模式",
          "changeLicense": "更换授权",
          "licenseType": "类型",
          "expiry": "到期时间",
          "quota": "已用/总配额",
          "offlineLease": "离线租约",
          "configVer": "版本号",
          "streamsCount": "活跃 Stream",
          "configuredBy": "配置人",
          "lastModified": "最后修改",
          "lastModifiedTime": "最后修改时间",
          "viewHistory": "查看历史",
          "licenseUpdated": "授权更新成功",
          "mode": "部署模式",
          "streamsRunning": "{{count}} 个运行中"
        },
        "overview": {
          "diagnostics": "状态诊断",
          "reason": "当前状态原因",
          "kpiHeartbeat": "最近心跳",
          "kpiStreams": "运行中 Stream",
          "usagePreview": "24h 用量预览",
          "recentAlerts": "活跃告警",
          "viewAll": "查看全部"
        },
        "workflow": {
          "verBanner": "当前配置版本: {{ver}}",
          "newVerAvailable": "检测到新版本待应用",
          "rollback": "回滚版本",
          "history": "版本历史",
          "addStream": "新增 Stream",
          "cols": {
            "name": "名称",
            "type": "类型",
            "workflow": "工作流",
            "telemetry": "遥测级别"
          }
        },
        "usage": {
          "dim": "聚合维度",
          "dimWorkflow": "按工作流",
          "dimStream": "按 Stream",
          "mode": "计费模式",
          "metric": "统计指标",
          "metricImg": "图片计数",
          "metricVid": "视频时长",
          "tableCols": {
            "calls": "总调用量",
            "errors": "错误数",
            "errorRate": "错误率"
          },
          "footerNote": "CLOUD 模式用量将计入云端账单；EDGE 模式仅供监控。"
        }
      },
      "license": {
        "title": "授权管理",
        "selectTitle": "选择授权",
        "upload": "上传授权",
        "daysLeft": "(剩余 {{count}} 天)",
        "noData": "未找到授权",
        "cols": {
          "name": "授权名称",
          "key": "密钥 ID",
          "type": "类型",
          "billing": "计费",
          "usage": "使用情况",
          "expiry": "到期时间"
        },
        "actions": { "viewUsage": "查看用量", "extend": "续期" },
        "quotaAvailable": "{{count}} / {{total}} 可用",
        "selectedLabel": "已选择授权"
      },
      "devices": {
        "title": "设备列表",
        "searchPlaceholder": "搜索名称、ID...",
        "alert": {
          "pendingMessage": "检测到 <bold>{{count}}</bold> 台新设备待绑定授权。",
          "filterAction": "筛选待绑定设备"
        },
        "cols": {
          "name": "设备名称",
          "id": "设备 ID",
          "status": "状态",
          "mode": "模式",
          "license": "授权",
          "lastSeen": "最后在线"
        },
        "unbound": "未绑定"
      }
    }
  }
};
