
export const zh = {
  translation: {
    "app": { "title": "VisionFlow" },
    "common": {
      "search": "搜索...",
      "refresh": "刷新",
      "export": "导出",
      "filter": "筛选器",
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
      "language": "语言",
      "back": "返回",
      "retry": "重试",
      "noPreview": "无预览图",
      "free": "免费",
      "upload": "上传图像",
      "run": "运行测试"
    },
    "menu": {
      "workflows": "工作流",
      "marketplace": "资源市场",
      "selfHosted": "自托管",
      "overview": "概览",
      "devices": "设备列表",
      "license": "证书管理",
      "support": "帮助与支持",
      "settings": "设置",
      "security": "安全",
      "folders": "文件夹"
    },
    "workflows": {
      "title": "工作流管理",
      "inviteTeam": "邀请成员",
      "helpTooltip": "管理您的视觉处理逻辑与 Pipeline 编排。",
      "searchPlaceholder": "搜索工作流名称...",
      "view": {
        "list": "列表视图",
        "grid": "网格视图"
      },
      "actions": {
        "newFolder": "新建文件夹",
        "explore": "探索模板",
        "create": "创建工作流"
      },
      "table": {
        "name": "工作流名称",
        "updated": "最后更新时间"
      },
      "folders": {
        "count": "{{count}} 个工作流",
        "create": "新建文件夹",
        "nameLabel": "文件夹名称",
        "nameRequired": "请输入文件夹名称",
        "namePlaceholder": "例如：交通分析项目"
      },
      "empty": {
        "global": "暂无工作流",
        "globalDesc": "开始创建您的第一个视觉算法工作流。",
        "folder": "文件夹为空",
        "folderDesc": "该文件夹内尚未添加任何工作流。"
      },
      "templates": {
        "modalTitle": "从模板创建工作流",
        "architecture": "架构预览",
        "customize": "参数定制",
        "customizeDesc": "选择基础模型与运行环境参数。",
        "pickModel": "选择检测模型",
        "noConfig": "默认配置",
        "noConfigDesc": "该模板将使用预设的推荐配置块。",
        "emptyTitle": "请选择一个模板",
        "emptyDesc": "从左侧列表选择模板，查看其处理链路及配置详情。",
        "footerHint": "请先选择一个模板以继续"
      }
    },
    "selfhosted": {
      "overview": {
        "title": "边缘节点概览",
        "kpi": {
          "totalDevices": "设备总数",
          "online": "在线",
          "pendingLicense": "待授权",
          "offline": "离线",
          "licenseUsage": "授权配额",
          "expiringSoon": "{{count}} 个即将过期",
          "usageSummary": "遥测数据摘要",
          "utilization": "配额利用率",
          "activeLicenses": "活跃证书",
          "expiring": "即将过期",
          "pending": "未绑定设备"
        },
        "charts": {
          "deviceStatus": "设备状态分布",
          "count": "数量",
          "usageTrend": "数据处理趋势",
          "edge": "边缘端",
          "cloud": "云端",
          "images": "图像",
          "video": "视频",
          "breakdown": "授权类型分布",
          "usageSeries": "实际用量",
          "quotaSeries": "配额上限"
        },
        "alerts": {
          "title": "最近告警",
          "critical": "致命",
          "warning": "警告",
          "info": "信息",
          "target": "对象",
          "viewAll": "查看全部"
        },
        "timeRange": {
          "24h": "过去 24 小时",
          "7d": "最近 7 天",
          "30d": "最近 30 天"
        },
        "quickActions": {
          "title": "快捷操作"
        },
        "actions": {
          "upload": "上传证书",
          "devices": "查看设备",
          "manage": "管理 Key",
          "guide": "配置指南"
        },
        "shortcuts": {
          "title": "快捷入口",
          "viewDeviceList": "设备列表",
          "manageLicenses": "管理授权",
          "recentDeployments": "最近部署"
        }
      },
      "devices": {
        "title": "边缘设备群",
        "searchPlaceholder": "搜索设备名称或 ID...",
        "noData": "未发现匹配设备",
        "unbound": "需要绑定授权",
        "cols": {
          "name": "设备名称",
          "id": "设备 ID",
          "status": "状态",
          "mode": "运行模式",
          "license": "绑定证书",
          "lastSeen": "最后在线"
        },
        "alert": {
          "pendingMessage": "您有 <bold>{{count}} 台设备</bold> 尚未绑定授权证书。",
          "filterAction": "立即筛选"
        }
      },
      "deviceDetail": {
        "tabs": {
          "overview": "概况",
          "workflow": "任务部署",
          "usage": "数据分析",
          "logs": "系统日志"
        },
        "summary": {
          "overviewTitle": "设备标识",
          "licenseTitle": "授权状态",
          "configTitle": "部署信息",
          "deviceId": "硬件 ID",
          "runtimeId": "运行时 ID",
          "lastSeen": "最后在线",
          "expiry": "到期时间",
          "quota": "流配额",
          "offlineLease": "离线租约",
          "changeLicense": "更换证书",
          "viewHistory": "历史记录",
          "latest": "最新",
          "streamsCount": "活跃数据流",
          "configuredBy": "配置人员",
          "lastModifiedTime": "最后修改",
          "changeMode": "切换部署模式"
        },
        "overview": {
          "units": "推理次数",
          "unitsTooltip": "所有工作流处理的总帧数或推理请求数。",
          "recentAlerts": "设备告警"
        },
        "workflow": {
          "rollback": "回滚至此版本"
        }
      },
      "workflowDeployment": {
        "title": "任务流部署",
        "addStream": "部署新任务",
        "latest": "最新版本",
        "lastUpdated": "最后更新",
        "operator": "操作人",
        "viewHistory": "版本历史",
        "streamName": "任务名称",
        "input": "输入源",
        "workflow": "视觉逻辑",
        "status": "状态",
        "telemetry": "遥测级别",
        "updated": "更新时间",
        "empty": "暂无活跃任务",
        "historyTitle": "版本历史记录",
        "editTitle": "编辑部署配置",
        "createTitle": "新建任务部署",
        "basicInfo": "基础信息",
        "nameLabel": "任务名称",
        "nameRequired": "请输入任务名称",
        "namePlaceholder": "例如：正门入口监控",
        "inputSource": "输入源配置",
        "sourceType": "传输协议",
        "endpoint": "访问地址",
        "endpointRequired": "必须输入地址",
        "workflowBinding": "逻辑绑定",
        "selectWorkflow": "选择工作流",
        "selectWorkflowPlaceholder": "选择视觉 Pipeline",
        "versionStrategy": "版本策略",
        "runPolicy": "运行策略",
        "concurrency": "并行实例",
        "telemetryGranularity": "采集粒度",
        "applyImmediately": "立即应用更改",
        "applyImmediatelyDesc": "保存后将重启任务实例以使配置生效。",
        "updateBtn": "更新部署",
        "createBtn": "立即部署",
        "noSnapshot": "无可用快照",
        "loadingDiff": "正在计算差异...",
        "snapshot": "快照详情",
        "diff": "代码差异",
        "rollbackTitle": "回滚至版本 {{version}}",
        "rollbackDesc": "当前配置将被此历史版本完全覆盖。",
        "rollbackConfirm": "确认回滚"
      },
      "license": {
        "title": "授权证书管理",
        "upload": "上传新证书",
        "noData": "暂无授权证书",
        "selectTitle": "选择授权证书",
        "selectedLabel": "当前选择",
        "quotaAvailable": "{{count}} / {{total}} 可用",
        "daysLeft": "剩余 {{count}} 天",
        "cols": {
          "name": "证书名称",
          "key": "证书秘钥",
          "type": "类型",
          "billing": "计费模式",
          "usage": "利用率",
          "expiry": "到期时间"
        },
        "actions": {
          "viewUsage": "查看用量",
          "extend": "续期"
        }
      },
      "usage": {
        "dim": "分析维度",
        "dimWorkflow": "按工作流",
        "dimStream": "按任务流",
        "metric": "分析指标",
        "metricImg": "图像处理量",
        "metricVid": "视频处理时长",
        "dateRange": "时间范围",
        "modeFilter": "部署模式筛选",
        "modes": {
          "all": "全部模式",
          "edge": "仅边缘端",
          "cloud": "仅云端"
        },
        "tableCols": {
          "calls": "总调用次数",
          "errors": "错误数",
          "errorRate": "错误率"
        },
        "footerNote": "遥测数据在本地缓存并每 5 分钟与云端同步一次。"
      },
      "logs": {
        "title": "深度追踪分析",
        "description": "通过 SigNoz 集成访问设备 <bold>{{id}}</bold> 的全量系统日志与执行链路追踪。",
        "launchBtn": "打开监控控制台"
      },
      "status": {
        "online": "在线",
        "offline": "离线",
        "maintenance": "排空中",
        "error": "异常",
        "pending": "待许可",
        "decommissioned": "已退役",
        "ONLINE": "在线",
        "OFFLINE": "离线",
        "ERROR": "异常",
        "PENDING_LICENSE": "待绑定",
        "DRAINING": "排空中",
        "DECOMMISSIONED": "已退役"
      },
      "mode": {
        "edgeDesc": "本地边缘侧处理。",
        "cloudDesc": "在云端执行单元运行。",
        "edge": "边缘端",
        "cloud": "云端"
      }
    },
    "marketplace": {
      "home": {
        "title": "资源市场",
        "description": "发现模型、工作流与插件。",
        "heroTitle": "为您的项目寻找视觉资源。",
        "heroDesc": "搜索、预览并添加资源到您的工作区资产库。",
        "featuredTitle": "精选推荐",
        "viewAll": "查看全部",
        "browseAll": "浏览分类"
      },
      "detail": {
        "overview": "概述",
        "examples": "示例展示",
        "docs": "技术文档",
        "pricing": "定价计划",
        "author": "开发者",
        "released": "发布时间",
        "installs": "次安装",
        "supportedDevices": "支持设备",
        "cta": {
          "loginToAction": "登录后测试/购买",
          "cloudTest": "云端测试",
          "buyNow": "立即购买",
          "getFree": "免费获取",
          "openStudio": "在编辑器中打开",
          "deploy": "部署到自托管设备",
          "viewEntitlement": "查看权益详情",
          "unavailable": "资源已不可用",
          "suspendedDesc": "该资源已被开发者暂时下架。",
          "archivedDesc": "此为存档版本，已停止新购。"
        }
      },
      "cloudTest": {
        "title": "云端测试沙盒",
        "inputSection": "测试输入",
        "configSection": "运行配置",
        "resultSection": "分析结果",
        "selectExample": "选择示例图",
        "dropZone": "点击或拖拽上传图片",
        "threshold": "置信度阈值",
        "maxDetections": "最大检测数",
        "running": "正在进行云端推理...",
        "queued": "正在排队...",
        "success": "测试已完成",
        "viewRaw": "查看原始 JSON",
        "errors": {
          "quota": "测试次数已耗尽",
          "quotaDesc": "您已用完该资源的免费测试额度。",
          "invalid": "不支持的图像格式",
          "studio": "云端推理引擎故障",
          "buyToContinue": "购买该资源以解锁无限次测试"
        }
      },
      "search": {
        "title": "搜索市场",
        "placeholder": "搜索模型、工作流、插件..."
      },
      "filters": {
        "title": "筛选器",
        "reset": "置",
        "tags": "标签",
        "taskType": "任务类型",
        "devices": "支持设备",
        "priceRange": "价格范围 (USD)",
        "showResults": "查看结果"
      },
      "library": {
        "title": "我的资产",
        "description": "您已购买或订阅的资源。"
      },
      "seller": {
        "dashboard": "卖家中心",
        "myListings": "我的商品",
        "createListing": "发布商品"
      },
      "status": {
        "published": "已发布",
        "draft": "草稿",
        "reviewing": "审核中"
      },
      "installs": "次安装"
    }
  }
};
