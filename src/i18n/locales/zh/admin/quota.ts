
export const quota = {
  "title": "配额策略",
  "description": "全局工作区资源上限及限流规则编排。",
  "syncBtn": "同步策略库",
  "syncSuccess": "配额目录已同步",
  "searchPlaceholder": "按工作区 ID 或名称搜索...",
  "statusFilter": {
    "all": "全部状态",
    "active": "已激活 (ACTIVE)",
    "draft": "草稿 (DRAFT)",
    "disabled": "已禁用 (DISABLED)"
  },
  "table": {
    "workspaceId": "workspaceId",
    "workspaceName": "所属工作区",
    "freeQuota": "免费额度",
    "rateLimit": "速率限制",
    "status": "策略状态",
    "lastUpdated": "最近变更时间"
  },
  "drawer": {
    "editTitle": "调整配额策略",
    "viewTitle": "策略详情配置",
    "tabs": {
      "overview": "基础配置",
      "preview": "预览影响",
      "json": "策略源码",
      "history": "历史版本"
    },
    "sections": {
      "resource": "资源参数配置",
      "resourceDesc": "根据工作区资源 Schema 调整运行限制。",
      "governance": "治理规则",
      "audit": "系统审计信息"
    },
    "fields": {
      "scope": "执行范围",
      "enforcement": "强制流控",
      "enforcementDesc": "开启后将主动拦截超过上限的请求。",
      "version": "策略版本号",
      "syncAt": "最近变更时间",
      "operator": "最近变更人",
      "target": "目标工作区 ID"
    }
  },
  "modals": {
    "publish": {
      "title": "发布策略",
      "confirm": "确认发布",
      "trackingTitle": "不可篡改的审计追踪",
      "trackingDesc": "此操作将更新全局资源管理层。操作过程将被永久记录在审计日志中。",
      "reasonLabel": "原因 (必填)",
      "reasonRequired": "必须填写变更原因以供审计",
      "reasonPlaceholder": "请详细说明执行此策略调整的必要性...",
      "ticketLabel": "工单号 (可选)",
      "ticketPlaceholder": "例如：OPS-12345",
      "impactTitle": "影响评估",
      "affectedWorkspace": "受影响工作区",
      "affectedWorkflow": "受影响工作流",
      "recentUsage": "最近 24h 用量",
      "propagationHint": "变更将会传播至整个舰队。您可以在“操作状态”面板中实时追踪进度。"
    }
  },
  "impact": {
    "title": "最近 24h 影响评估",
    "hint": "将限流设定为 {{limit}} 将导致 {{count}} 次潜在限流触发。",
    "freshness": "数据新鮮度: {{time}}",
    "source": "数据源: 集群用量计量服务 (UsageMeter)"
  },
  "json": {
    "draft": "草稿定义详情",
    "active": "线上生效定义",
    "copy": "复制 JSON",
    "footerHint": "上述 JSON 为边缘节点实际执行的原始策略 Schema，已省略管理层元数据。"
  },
  "history": {
    "auditLabel": "已审计",
    "viewJson": "查看快照",
    "copyDraft": "复制为新版本"
  }
};
