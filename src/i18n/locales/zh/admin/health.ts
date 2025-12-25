
export const health = {
  "title": "系统健康",
  "subtitle": "追踪总线处理延迟、DLQ 积压及外部通知服务，诊断数据不一致的根源。",
  "actions": {
    "audit": "进入审计日志",
    "viewAlerts": "查看受影响告警",
    "clearSearch": "清空搜索",
    "markKnown": "标记为已知问题"
  },
  "filters": {
    "timeRange": "时间范围",
    "tenant": "租户",
    "workspace": "工作区",
    "env": "运行环境",
    "searchDlq": "搜索消息 ID 或事件类型...",
    "allTenants": "全部租户",
    "allWorkspaces": "全部工作区"
  },
  "sections": {
    "pipelineHealth": "事件总线与通知服务健康度",
    "dlqSamples": "DLQ 消息样本",
    "dependencies": "外部系统依赖"
  },
  "cards": {
    "runbusLag": "总线处理延迟",
    "dlqDepth": "DLQ 积压深度",
    "snapshotFreshness": "数据新鲜度",
    "meta": {
      "lastSync": "最近聚合时间",
      "lag": "快照延迟",
      "messages": "条消息",
      "dlqCount": "积压数",
      "lastAggregatedAt": "最近聚合时间"
    }
  },
  "banners": {
    "staleTitle": "检测到数据新鲜度异常",
    "staleDesc": "事件处理积压可能导致管理端显示的状态滞后于实时真值。",
    "currentLag": "当前总线延迟: {{val}}",
    "sseDisconnected": "实时连接已断开，界面更新可能延迟。"
  },
  "table": {
    "firstSeen": "首次发生",
    "eventSchema": "事件类型",
    "domain": "所属领域",
    "targetSubject": "受影响主体",
    "retryCount": "重试次数",
    "status": "状态",
    "foundCount": "共发现 {{count}} 条 DLQ 样本",
    "emptySearch": "未发现匹配的异常消息。",
    "healthyTitle": "系统管道运行正常",
    "actions": {
      "view": "查看消息详情",
      "v01ReadOnly": "当前仅提供只读诊断，处置请记录工单。"
    },
    "empty": "事件总线状态良好，无 DLQ 积压消息。"
  },
  "drawer": {
    "dlqTitle": "DLQ 消息详情",
    "depTitle": "依赖项健康详情",
    "latencyLabel": "平均响应延迟",
    "lastCheckedLabel": "最近自检时间",
    "errorLabel": "错误原因归一化描述",
    "suggestedOpLabel": "处置建议",
    "idLabel": "消息 ID",
    "eventType": "事件类型",
    "target": "受影响主体",
    "retryCount": "重试次数",
    "rawPayload": "原始报文 (Payload)",
    "exception": "执行异常分析",
    "errorSummary": "归一化错误摘要",
    "stackTrace": "堆栈详情 (Stack Trace)",
    "headers": "消息元数据 (Headers)",
    "searchLogs": "在 SigNoz 中检索日志",
    "retryAction": "立即重试消息",
    "suggested": {
      "retry": "稍后重试",
      "manual": "转人工处理",
      "incident": "记录工单",
      "none": "无需立即干预"
    }
  }
};
