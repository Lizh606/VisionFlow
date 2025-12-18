
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
      "confirm": "确认",
      "status": "状态",
      "ready": "就绪",
      "noData": "暂无数据",
      "pause": "暂停",
      "start": "启动",
      "enabled": "已启用",
      "disabled": "已禁用"
    },
    "menu": {
      "workflows": "工作流",
      "selfHosted": "自托管",
      "overview": "概览",
      "devices": "设备",
      "license": "许可",
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
        "pending": "待许可",
        "decommissioned": "已退役"
      },
      "mode": {
        "edge": "边缘端",
        "edgeDesc": "本地处理。仅上报许可统计。",
        "cloud": "云端",
        "cloudDesc": "在 VisionFlow 云端处理。按量计费。"
      },
      "usage": {
        "dim": "分析维度",
        "dimWorkflow": "工作流",
        "dimStream": "Stream",
        "metric": "指标",
        "metricImg": "图像数",
        "metricVid": "视频时长",
        "dateRange": "时间范围",
        "modeFilter": "运行模式",
        "modes": {
          "all": "全部模式",
          "edge": "仅边缘端",
          "cloud": "仅云端"
        },
        "footerNote": "统计数据每 5 分钟同步一次。高可用模式下，节点切换可能导致极小概率的重复统计。",
        "tableCols": {
          "calls": "总调用量",
          "errors": "错误数",
          "errorRate": "错误率"
        }
      },
      "logs": {
        "title": "高级遥测与日志",
        "description": "详细的系统日志和链路追踪数据存储在 VisionFlow 观测平台 (SigNoz) 中。您可以直接在该平台查看设备 <bold>{{id}}</bold> 的原始遥测数据。",
        "launchBtn": "打开观测平台控制台"
      },
      "workflowDeployment": {
        "title": "Streams 部署管理",
        "addStream": "新增 Stream",
        "empty": "未配置任何 Stream",
        "startConfig": "开始配置",
        "currentVersion": "当前",
        "latest": "最新稳定版",
        "lastUpdated": "最后更新时间",
        "operator": "操作员",
        "viewHistory": "版本历史",
        "streamName": "Stream",
        "input": "输入源",
        "workflow": "Workflow 绑定",
        "status": "运行状态",
        "telemetry": "遥测级别",
        "updated": "最后更新",
        "actions": "操作",
        "readOnly": "只读权限",
        "deleteStream": "删除 Stream",
        "editConfig": "编辑配置",
        "historyTitle": "版本历史",
        "snapshot": "快照",
        "diff": "对比",
        "editTitle": "编辑 Stream 配置",
        "createTitle": "新增 Stream 配置",
        "createBtn": "创建并部署",
        "updateBtn": "保存更改",
        "basicInfo": "基础信息",
        "inputSource": "输入源配置",
        "workflowBinding": "工作流绑定",
        "runPolicy": "运行策略",
        "nameLabel": "Stream 名称",
        "nameRequired": "请输入名称",
        "namePlaceholder": "例如: 仓库北门监控",
        "streamId": "Stream ID",
        "autoGen": "系统自动分配",
        "sourceType": "协议类型",
        "endpoint": "URL / 路径",
        "endpointRequired": "请输入源地址",
        "selectWorkflow": "关联工作流",
        "selectWorkflowPlaceholder": "选择工作流模板",
        "versionStrategy": "版本策略",
        "latestStable": "最新稳定版",
        "concurrency": "实例并发",
        "telemetryGranularity": "遥测级别",
        "heartbeatOnly": "仅心跳",
        "heartbeatDesc": "极低功耗，仅上报在线状态。",
        "metricsOnly": "性能指标 (推荐)",
        "metricsDesc": "包含吞吐量、延迟、FPS 等核心数据。",
        "diagnostic": "诊断级遥测",
        "diagnosticDesc": "包含完整链路追踪，资源消耗较高。",
        "applyImmediately": "立即生效",
        "applyImmediatelyDesc": "保存后将重启对应的流任务以应用配置。"
      },
      "deviceDetail": {
        "tabs": {
          "overview": "概览",
          "workflow": "Stream 部署",
          "usage": "用量分析",
          "logs": "遥测日志"
        },
        "summary": {
          "overviewTitle": "设备概览",
          "licenseTitle": "授权信息",
          "configTitle": "配置版本",
          "deviceId": "设备 ID",
          "runtimeId": "运行时 ID",
          "lastSeen": "最后在线",
          "changeMode": "切换模式",
          "changeLicense": "变更授权",
          "licenseType": "类型",
          "expiry": "到期时间",
          "quota": "配额 (已用/总计)",
          "offlineLease": "离线租约",
          "configVer": "版本",
          "streamsCount": "运行 Stream",
          "configuredBy": "操作员",
          "lastModified": "最后修改",
          "lastModifiedTime": "修改时间",
          "viewHistory": "查看历史",
          "licenseUpdated": "授权信息已成功更新",
          "mode": "运行模式",
          "streamsRunning": "{{count}} 个 Stream"
        },
        "overview": {
          "recentAlerts": "最近告警",
          "units": "图像单元",
          "unitsTooltip": "选定时间段内处理的帧数或触发次数总计。"
        }
      },
      "license": {
        "title": "许可管理",
        "selectTitle": "选择授权证书",
        "upload": "上传证书",
        "daysLeft": "(剩余 {{count}} 天)",
        "noData": "未找到授权证书。",
        "cols": {
          "name": "名称",
          "key": "Key ID",
          "type": "类型",
          "billing": "计费模式",
          "usage": "使用情况",
          "expiry": "到期日期"
        },
        "actions": { "viewUsage": "使用详情", "extend": "续期" },
        "quotaAvailable": "{{count}} / {{total}} 可用",
        "selectedLabel": "已选择授权"
      },
      "devices": {
        "title": "设备列表",
        "searchPlaceholder": "搜索名称、ID...",
        "alert": {
          "pendingMessage": "您有 <bold>{{count}}</bold> 台新设备等待绑定授权证书。",
          "filterAction": "筛选待处理"
        },
        "cols": {
          "name": "设备名称",
          "id": "设备 ID",
          "status": "状态",
          "mode": "模式",
          "license": "授权",
          "lastSeen": "最后在线"
        },
        "unbound": "未绑定",
        "noData": "没有符合条件的设备。"
      }
    }
  }
};
