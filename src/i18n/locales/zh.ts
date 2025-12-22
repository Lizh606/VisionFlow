
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
      "total": "共 {{total}} 项",
      "loading": "加载中...",
      "allStatus": "全部状态",
      "allModes": "全部模式",
      "copy": "复制",
      "save": "保存",
      "cancel": "取消",
      "delete": "删除",
      "edit": "编辑",
      "choose": "选择",
      "confirm": "确认",
      "status": "状态",
      "ready": "就绪",
      "noData": "暂无数据",
      "pause": "暂停",
      "start": "启动",
      "enabled": "已启用",
      "disabled": "已禁用",
      "language": "语言"
    },
    "menu": {
      "workflows": "工作流",
      "selfHosted": "自托管",
      "overview": "概览",
      "devices": "设备",
      "license": "许可证书",
      "support": "帮助与支持",
      "settings": "设置",
      "security": "安全"
    },
    "workflows": {
      "title": "工作流",
      "inviteTeam": "邀请成员",
      "helpTooltip": "管理您的计算机视觉处理逻辑与工作流。",
      "searchPlaceholder": "搜索工作流...",
      "view": {
        "list": "列表视图",
        "grid": "网格视图"
      },
      "actions": {
        "newFolder": "新建文件夹",
        "explore": "探索模板",
        "create": "创建工作流"
      },
      "folders": {
        "count": "{{count}} 个工作流",
        "count_plural": "{{count}} 个工作流",
        "create": "创建文件夹",
        "nameLabel": "文件夹名称",
        "namePlaceholder": "例如：生产环境工作流",
        "nameRequired": "请输入文件夹名称"
      },
      "table": {
        "name": "工作流名称",
        "updated": "最后更新时间"
      },
      "empty": {
        "folder": "此文件夹为空",
        "folderDesc": "在此文件夹中创建您的第一个工作流。",
        "global": "未找到工作流",
        "globalDesc": "立即创建您的第一个工作流开始使用。"
      },
      "templates": {
        "modalTitle": "选择模板并配置",
        "gallery": "图库",
        "popular": "热门模板",
        "emptyTitle": "选择一个模板进行预览和配置",
        "emptyDesc": "浏览左侧图库，查看工作流架构和自定义选项。",
        "architecture": "工作流架构",
        "customize": "自定义配置",
        "customizeDesc": "选择模型或配置参数。",
        "pickModel": "选择模型：",
        "noConfig": "无需配置",
        "noConfigDesc": "此模板使用内置处理逻辑，无需外部视觉模型即可启动。",
        "footerHint": "请从左侧图库中选择一个模板",
        "advancedHint": "创建后，可以在工作流编辑器中进一步自定义高级逻辑和推理节点。"
      }
    },
    "selfhosted": {
      "overview": {
        "title": "自托管概览",
        "timeRange": {
          "24h": "最近 24 小时",
          "7d": "最近 7 天",
          "30d": "最近 30 天"
        },
        "kpi": {
          "totalDevices": "设备总数",
          "online": "在线",
          "pendingLicense": "待授权",
          "offline": "离线",
          "licenseUsage": "许可配额使用率",
          "expiringSoon": "{{count}} 个即将过期",
          "usageSummary": "处理量统计",
          "utilization": "配额利用率",
          "activeLicenses": "活动证书",
          "expiring": "即将到期",
          "pending": "待处理设备"
        },
        "charts": {
          "deviceStatus": "设备状态分布",
          "usageTrend": "数据处理趋势",
          "edge": "边缘端处理",
          "cloud": "云端处理",
          "images": "图像",
          "video": "视频",
          "count": "数量",
          "breakdown": "许可类型分布",
          "usageSeries": "实际使用",
          "quotaSeries": "总配额"
        },
        "alerts": {
          "title": "活动告警",
          "viewAll": "查看全部",
          "critical": "严重",
          "warning": "警告",
          "info": "提示",
          "target": "目标对象"
        },
        "shortcuts": {
          "title": "快捷入口",
          "viewDeviceList": "查看设备列表",
          "manageLicenses": "管理许可证书",
          "recentDeployments": "最近部署记录"
        },
        "quickActions": {
          "title": "快捷操作"
        },
        "actions": {
          "upload": "上传许可",
          "devices": "设备管理",
          "manage": "管理许可",
          "guide": "配置指南"
        }
      },
      "devices": {
        "title": "设备舰队",
        "searchPlaceholder": "搜索名称或设备 ID...",
        "unbound": "未绑定授权",
        "noData": "未找到符合条件的设备",
        "cols": {
          "name": "设备名称",
          "id": "设备 ID",
          "status": "状态",
          "mode": "模式",
          "license": "所属许可",
          "lastSeen": "最后在线"
        },
        "alert": {
          "pendingMessage": "当前有 <bold>{{count}}</bold> 台设备等待绑定许可证书。",
          "filterAction": "立即查看"
        }
      },
      "deviceDetail": {
        "summary": {
          "overviewTitle": "设备概览",
          "deviceId": "设备 ID",
          "runtimeId": "运行环境 ID",
          "lastSeen": "最后在线",
          "changeMode": "切换模式",
          "licenseTitle": "授权与证书",
          "changeLicense": "更换证书",
          "expiry": "过期时间",
          "quota": "使用配额",
          "offlineLease": "离线租约",
          "configTitle": "部署配置",
          "viewHistory": "历史记录",
          "streamsCount": "活动数据流",
          "configuredBy": "配置人员",
          "lastModifiedTime": "最后修改",
          "mode": "部署模式"
        },
        "overview": {
          "units": "推理调用次数",
          "unitsTooltip": "在所选时间范围内汇总的推理操作次数。",
          "recentAlerts": "最近告警"
        },
        "tabs": {
          "overview": "概览",
          "workflow": "部署配置",
          "usage": "遥测数据",
          "logs": "系统日志"
        },
        "workflow": {
          "rollback": "回滚到此版本"
        }
      },
      "workflowDeployment": {
        "title": "数据流部署",
        "addStream": "添加数据流",
        "streamName": "流名称",
        "input": "输入源",
        "workflow": "工作流",
        "status": "状态",
        "telemetry": "遥测级别",
        "updated": "更新时间",
        "latest": "最新",
        "historyTitle": "部署历史记录",
        "lastUpdated": "最后部署",
        "operator": "操作人",
        "viewHistory": "查看历史",
        "editTitle": "编辑数据流部署",
        "createTitle": "部署新数据流",
        "basicInfo": "基础身份信息",
        "nameLabel": "数据流名称",
        "nameRequired": "请输入数据流名称",
        "namePlaceholder": "例如：南门停车场摄像头",
        "inputSource": "输入源配置",
        "sourceType": "源类型",
        "endpoint": "接入地址 (URL)",
        "endpointRequired": "请输入连接地址",
        "workflowBinding": "工作流与逻辑绑定",
        "selectWorkflow": "视觉工作流",
        "selectWorkflowPlaceholder": "选择要运行的工作流...",
        "versionStrategy": "版本策略",
        "runPolicy": "运行策略",
        "concurrency": "并行处理数",
        "telemetryGranularity": "遥测数据粒度",
        "applyImmediately": "原子重启",
        "applyImmediatelyDesc": "保存后自动重启处理节点以立即应用更改。",
        "updateBtn": "部署更改",
        "createBtn": "启动数据流",
        "snapshot": "快照",
        "diff": "差异",
        "noSnapshot": "无配置快照",
        "loadingDiff": "正在计算配置差异...",
        "rollbackTitle": "回滚到版本 {{version}}?",
        "rollbackDesc": "此操作将停止当前处理并使用所选的历史配置重新启动节点。",
        "rollbackConfirm": "确认回滚"
      },
      "usage": {
        "dim": "统计维度",
        "dimWorkflow": "按工作流",
        "dimStream": "按数据流",
        "metric": "统计指标",
        "metricImg": "图像处理量",
        "metricVid": "视频处理时长",
        "dateRange": "时间范围",
        "modeFilter": "计算模式",
        "modes": {
          "all": "全部模式",
          "edge": "仅边缘端",
          "cloud": "仅云端"
        },
        "tableCols": {
          "calls": "推理调用次数",
          "errors": "失败次数",
          "errorRate": "错误率"
        },
        "footerNote": "遥测数据由所有活动节点汇总，存在约 5 分钟的统计延迟。"
      },
      "logs": {
        "title": "集中式观测",
        "description": "设备 <bold>{{id}}</bold> 的系统日志已实时流向您的集中式日志分析后端。",
        "launchBtn": "打开日志控制台"
      },
      "license": {
        "title": "许可证书管理",
        "upload": "上传证书",
        "noData": "当前工作空间下无可用证书",
        "selectTitle": "选择授权证书",
        "quotaAvailable": "{{count}} / {{total}} 可用",
        "selectedLabel": "已选择授权",
        "daysLeft": "剩余 {{count}} 天",
        "cols": {
          "name": "证书名称",
          "key": "许可密钥",
          "type": "类型",
          "billing": "计费模式",
          "usage": "容量状态",
          "expiry": "过期时间"
        },
        "actions": {
          "viewUsage": "使用统计",
          "extend": "续费证书"
        }
      },
      "status": {
        "online": "在线",
        "offline": "离线",
        "maintenance": "排空中",
        "error": "异常",
        "pending": "待许可",
        "decommissioned": "已退役"
      },
      "mode": {
        "edge": "边缘端",
        "edgeDesc": "本地处理。仅进行许可计量。",
        "cloud": "云端",
        "cloudDesc": "在 VisionFlow 云端处理。按量计费。"
      }
    }
  }
};
