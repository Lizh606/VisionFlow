export const alerts = {
  "title": "告警中心",
  "description": "跨域告警联动处置与策略调整。",
  "searchPlaceholder": "按 ID、主体或影响范围搜索...",
  "status": {
    "open": "待处理",
    "acknowledged": "已介入",
    "suppressed": "已抑制",
    "resolved": "已解决"
  },
  "filters": {
    "allSeverities": "全部级别",
    "allDomains": "全部领域",
    "allStatus": "全部状态",
    "p0": "P0 - 致命",
    "p1": "P1 - 高危",
    "p2": "P2 - 中等"
  },
  "table": {
    "severity": "严重度",
    "status": "状态",
    "type": "类型",
    "subject": "主体信息",
    "impact": "影响范围",
    "firstSeen": "首次发生",
    "lastSeen": "最近发生",
    "count": "聚合计数",
    "ackAction": "确认介入"
  },
  "ack": {
    "title": "确认介入告警",
    "desc": "确认介入此告警以表明正在处理，该状态将同步至全局看板。",
    "alertId": "告警 ID",
    "confirm": "确认介入",
    "comment": "补充处理记录",
    "comment.placeholder": "请简要描述初步评估结果或已采取的动作..."
  },
  "actions": {
    "title": "管理操作",
    "viewContext": "查看完整上下文",
    "suppress": "抑制告警",
    "resolve": "标记为已解决"
  },
  "detail": {
    "summary": "告警摘要",
    "timeline": "发生时间轴",
    "currentStatus": "当前状态",
    "impactScope": "影响范围",
    "aggregationKey": "聚合规则",
    "timelineBy": "通过",
    "subjectId": "主体 ID",
    "subjectState": "对象详情（快照）",
    "openSubjectDetail": "打开 {{type}} 详情",
    "runSotQuery": "强一致性查询",
    "lastAggregated": "最近聚合时间",
    "aggregateLag": "聚合延迟",
    "lagTooltip": "管理库快照与真值源之间的持久化延迟",
    "dlqDepth": "死信队列深度",
    "sotEmptyTitle": "需要实时查询",
    "sotEmptyDesc": "从领域服务 SoT 执行高一致性查询以获取实时状态，此操作将被审计。",
    "sotSuccess": "真值数据同步成功",
    "stateDrift": "检测到状态漂移: {{count}} 处差异",
    "driftDesc": "管理库 (AdminDB) 快照与实时真值 (SoT) 存在不一致。",
    "openHealth": "查看系统健康度",
    "recommendedActions": "推荐处置 Actions",
    "containment": "风险围堵",
    "noiseReduction": "降噪抑制",
    "relatedContext": "关联领域上下文",
    "snapshotTab": "运行快照 (AdminDB)",
    "diffTab": "一致性比对 (快照 vs 真值)",
    "sotTab": "实时真值 (SoT)",
    "diffDisabledDesc": "一致性比对需要先执行实时真值查询。",
    "rawView": "原始 JSON 视图"
  },
  "modals": {
    "ack": {
      "commentRequired": "必须填写处理记录以供审计"
    },
    "freeze": {
      "title": "冻结设备关联权益",
      "warningTitle": "高风险处置警告",
      "warningDesc": "冻结权益将立即终止该设备的所有边缘推理业务并封禁运行环境。",
      "targetLabel": "目标权益 ID",
      "reasonLabel": "操作原因说明",
      "reasonRequired": "原因说明至少需要 10 个字符",
      "reasonPlaceholder": "请详细说明执行此围堵动作的必要性...",
      "ticketLabel": "工单 ID / Ticket (选填)",
      "ticketPlaceholder": "例如：OPS-12345",
      "understandLabel": "我已了解操作风险",
      "understandDesc": "此动作将直接影响生产环境运行，且操作将被永久记录在管理审计日志中。",
      "confirm": "执行冻结指令"
    },
    "suppress": {
      "title": "告警抑制",
      "statusUpdate": "告警状态将变更为“已抑制”，用于已知维护窗口。",
      "guidance": "抑制窗口将屏蔽该告警向通知渠道的分发。",
      "windowLabel": "抑制时间窗口",
      "windows": {
        "2h": "2 小时",
        "24h": "24 小时"
      },
      "custom": "自定义范围",
      "reasonLabel": "抑制原因 / 注解",
      "reasonRequired": "必须填写抑制原因以供审计",
      "reasonPlaceholder": "请描述维护窗口信息或已知问题详情...",
      "confirm": "应用抑制规则"
    },
    "result": {
      "statusTitle": "操作状态追踪",
      "auditTraceTitle": "管理审计追踪",
      "opIdLabel": "管理操作 ID (adminOpId)",
      "viewAudit": "查看完整审计日志",
      "doneBtn": "完成",
      "naPlaceholder": "无",
      "naCaption": "暂无下游调用链路记录",
      "operatorLabel": "操作员",
      "startedAt": "启动时间",
      "processingTime": "处理耗时",
      "notReported": "等待执行终态",
      "subjectTypeLabel": "主体类型",
      "subjectIdLabel": "主体 ID",
      "idempLabel": "幂等 Key",
      "entitlementIdLabel": "权益 ID",
      "reasonLabel": "原因",
      "payloadLabel": "请求负载 (Payload)",
      "noPayloadCaption": "此事务无请求参数",
      "responseCode": "响应代码",
      "responseMsg": "系统响应信息",
      "keyChanges": "关键状态变更 (Before/After)",
      "noDelta": "该事务未检测到下游状态变更",
      "rawJson": "原始事务快照",
      "processing": "处理中...",
      "retry": "安全重试",
      "sections": {
        "request": "操作请求上下文",
        "downstream": "下游调用链路回放",
        "response": "核心服务响应详情",
        "feedback": "执行终态反馈"
      },
      "tooltips": {
        "idempNotProvided": "调用方未提供幂等 Key"
      }
    }
  }
};