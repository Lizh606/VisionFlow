
export const selfhosted = {
  "overview": {
    "title": "边缘节点概览",
    "kpi": {
      "totalDevices": "设备总数",
      "online": "在线设备",
      "offline": "离线设备",
      "pendingLicense": "待许可设备",
      "licenseUsage": "许可配额",
      "expiringSoon": "{{count}} 项即将到期",
      "usageSummary": "遥测数据概览",
      "utilization": "配额利用率",
      "activeLicenses": "活跃证书",
      "expiring": "即将到期",
      "pending": "待绑定设备"
    },
    "charts": {
      "edge": "边缘端",
      "cloud": "云端",
      "images": "图像",
      "video": "视频",
      "count": "数量",
      "deviceStatus": "设备状态分布",
      "usageTrend": "推理用量趋势",
      "breakdown": "证书类型分布",
      "usageSeries": "实际用量",
      "quotaSeries": "配额限制"
    },
    "alerts": {
      "title": "最近系统告警",
      "viewAll": "查看全部",
      "target": "对象",
      "critical": "致命",
      "warning": "警告",
      "info": "信息"
    },
    "shortcuts": {
      "title": "快捷导航",
      "viewDeviceList": "查看设备列表",
      "manageLicenses": "管理授权证书",
      "recentDeployments": "查看部署历史"
    },
    "actions": {
      "upload": "上传证书",
      "devices": "设备列表",
      "manage": "管理",
      "guide": "使用指南"
    },
    "timeRange": {
      "24h": "最近24小时",
      "7d": "最近7天",
      "30d": "最近30天"
    }
  },
  "status": {
    "online": "在线",
    "offline": "离线",
    "maintenance": "排空中",
    "error": "异常",
    "pending": "待绑定授权",
    "decommissioned": "已退役",
    "running": "运行中",
    "paused": "已暂停",
    "disabled": "已禁用"
  },
  "mode": {
    "edgeDesc": "本地边缘侧处理。",
    "cloudDesc": "在云端执行单元运行。",
    "edge": "边缘端",
    "cloud": "云端"
  },
  "actions": {
    "bind": "绑定证书",
    "drain": "排空",
    "view": "查看详情",
    "edit": "编辑",
    "delete": "删除",
    "start": "启动",
    "pause": "暂停"
  },
  "devices": {
    "title": "设备列表",
    "searchPlaceholder": "搜索设备名称或 ID...",
    "noData": "未发现匹配设备",
    "unbound": "未绑定",
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
  "license": {
    "title": "授权证书管理",
    "upload": "上传新证书",
    "noData": "暂无授权证书",
    "daysLeft": "剩余 {{count}} 天",
    "selectTitle": "选择授权证书",
    "selectedLabel": "已选择",
    "quotaAvailable": "{{count}} / {{total}} 可用",
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
  "deviceDetail": {
    "tabs": {
      "overview": "状态概览",
      "workflow": "部署管理",
      "usage": "遥测分析",
      "logs": "系统日志"
    },
    "overview": {
      "units": "次推理",
      "unitsTooltip": "处理的图像数量及视频帧数的总计。",
      "recentAlerts": "最近告警",
      "unboundBanner": "此设备尚未绑定有效授权证书，监控和部署功能已禁用。",
      "usageDisabledTitle": "遥测不可用",
      "usageDisabledDesc": "在完成授权绑定前，系统无法通过遥测采集其产生的图像或视频处理数据。"
    },
    "summary": {
      "overviewTitle": "设备标识",
      "licenseTitle": "授权状态",
      "configTitle": "部署配置",
      "deviceId": "硬件 ID",
      "runtimeId": "运行 ID",
      "lastSeen": "最后在线",
      "expiry": "到期时间",
      "quota": "数据流配额",
      "offlineLease": "离线租约",
      "changeLicense": "更换证书",
      "viewHistory": "查看历史",
      "streamsCount": "活跃流数量",
      "configuredBy": "配置者",
      "lastModifiedTime": "最后修改",
      "changeMode": "切换运行模式",
      "awaitingLicense": "等待证书绑定",
      "noConfigFound": "未发现配置项",
      "noConfigDesc": "授权未就绪前无法同步配置。"
    },
    "workflow": {
      "rollback": "版本回滚"
    }
  },
  "workflowDeployment": {
    "title": "数据流部署",
    "createTitle": "部署新 Stream",
    "editTitle": "编辑部署配置",
    "addStream": "部署新流",
    "latest": "最新",
    "lastUpdated": "更新于",
    "operator": "操作人",
    "viewHistory": "历史记录",
    "streamName": "流名称",
    "input": "输入源",
    "workflow": "视觉逻辑",
    "status": "状态",
    "telemetry": "遥测级别",
    "updated": "最近更新",
    "empty": "暂无活跃部署",
    "basicInfo": "基础信息",
    "nameLabel": "Stream 名称",
    "nameRequired": "请输入 Stream 名称",
    "namePlaceholder": "例如：正门监控摄像头",
    "inputSource": "输入源设置",
    "sourceType": "传输协议",
    "endpoint": "访问地址",
    "endpointRequired": "必须填写访问地址 URL",
    "workflowBinding": "逻辑绑定",
    "selectWorkflow": "选择视觉逻辑",
    "selectWorkflowPlaceholder": "请选择工作流",
    "versionStrategy": "版本策略",
    "runPolicy": "运行策略",
    "concurrency": "实例并发数",
    "telemetryGranularity": "遥测细节级别",
    "applyImmediately": "立即生效变更",
    "applyImmediatelyDesc": "勾选后将重启 Stream 进程以立即应用新配置。",
    "createBtn": "开始部署",
    "updateBtn": "更新配置",
    "historyTitle": "部署版本历史",
    "snapshot": "快照详情",
    "diff": "变更比对",
    "rollbackTitle": "确认回滚",
    "rollbackDesc": "这将把设备配置恢复到版本 {{version}}。",
    "rollbackConfirm": "确认回滚",
    "noSnapshot": "该版本无具体配置快照",
    "loadingDiff": "正在计算配置变更细节...",
    "historyType": {
      "initial": "初始化",
      "update": "版本更新",
      "rollback": "触发回滚"
    },
    "telemetryLevel": {
      "heartbeat": "仅心跳",
      "heartbeatDesc": "最轻量级的在线检查。",
      "metrics": "标准指标",
      "metricsDesc": "采集吞吐量、帧率与错误率。",
      "diagnostic": "诊断追踪",
      "diagnosticDesc": "完整链路追踪，用于排查逻辑错误。"
    }
  },
  "usage": {
    "dim": "分析维度",
    "dimWorkflow": "按工作流",
    "dimStream": "按数据流",
    "metric": "统计指标",
    "metricImg": "图像推理数",
    "metricVid": "视频处理时长",
    "dateRange": "时间范围",
    "modeFilter": "运行模式",
    "modes": {
      "all": "全部模式",
      "edge": "仅边缘端",
      "cloud": "仅云端"
    },
    "tableCols": {
      "calls": "总运行次数",
      "errors": "错误数",
      "errorRate": "错误率"
    },
    "footerNote": "用量数据每 5 分钟从边缘节点同步一次。"
  },
  "logs": {
    "title": "深度链路分析",
    "description": "通过 SigNoz 集成访问设备 <bold>{{id}}</bold> 的完整系统日志与执行追踪。",
    "launchBtn": "打开监控控制台"
  }
};
