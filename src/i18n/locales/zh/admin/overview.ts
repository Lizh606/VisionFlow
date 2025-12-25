
export const overview = {
  "title": "跨域概览看板",
  "description": "跨域健康度监控与自动化异常检测。",
  "liveEvents": "实时事件",
  "viewAlerts": "管理领域告警",
  "refreshSnapshot": "同步快照",
  "refreshTooltip": "从 AdminDB 立即同步最新的指标快照。",
  "snapshotFreshness": "数据新鲜度",
  "freshnessHint": "快照数据每 60 秒自动更新。",
  "fleetSynced": "已同步设备",
  "awaitingReview": "待审核",
  "versionDistribution": "版本分布",
  "domains": {
    "studio": "Studio",
    "selfhosted": "Self-Hosted",
    "marketplace": "Marketplace",
    "billing": "Billing",
    "usage": "Usage"
  },
  "metrics": {
    "successRate": "Run 成功率",
    "backlog": "队列积压",
    "topFailures": "失败 Top 原因",
    "online": "在线设备数",
    "offline": "离线设备数",
    "coverage": "部署覆盖率",
    "leaseAnomalies": "Lease 异常数",
    "trend": "趋势",
    "pendingListings": "待审核 Listing",
    "refundFailures": "退款失败数",
    "orderAnomalies": "订单异常数",
    "settlementAnomalies": "结算/对账异常数"
  },
  "ranges": {
    "1h": "最近 1h",
    "24h": "最近 24h"
  },
  "filters": {
    "tooltip": "按 {{label}} 筛选",
    "tenant": "租户 ID",
    "workspace": "工作区 ID",
    "env": "环境",
    "allTenants": "所有租户",
    "allWorkspaces": "所有工作区"
  },
  "liveEventsDrawer": {
    "title": "实时事件流",
    "subtitle": "集群实时遥测事件 (SSE)",
    "statusConnected": "已连接",
    "statusReconnecting": "正在重新连接",
    "statusDisconnected": "已断开",
    "clearStream": "清空事件",
    "clearConfirmTitle": "确认清空？",
    "clearConfirmDesc": "此操作仅清空当前界面显示的事件列表。",
    "listening": "正在监听集群事件信号..."
  }
};
