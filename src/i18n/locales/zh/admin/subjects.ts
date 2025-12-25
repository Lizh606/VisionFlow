export const subjects = {
  "detail": {
    "contextNote": "对象信息由领域服务 API 聚合。数据差异反映了边缘节点与管理快照之间的同步延迟。",
    "subjectId": "对象 ID",
    "driftExplanation": "检测到管理库 (AdminDB) 快照与实时真值 (SoT) 存在不一致。这通常意味着集群总线中的事件尚在持久化队列中。",
    "viewAudit": "查看审计日志",
    "runSotQuery": "执行强一致性真值查询",
    "sotEmptyTitle": "需要实时查询",
    "sotEmptyDesc": "向领域服务 API 发起高一致性请求，以获取该资源的当前实时状态。",
    "stateDrift": "检测到状态漂移: {{count}} 处差异",
    "openHealth": "查看系统健康度"
  },
  "types": {
    "device": "硬件设备",
    "entitlement": "权益授权",
    "order": "交易订单",
    "run": "工作流执行"
  },
  "tabs": {
    "snapshot": "运行快照 (AdminDB)",
    "sot": "实时真值 (SoT)",
    "diff": "一致性比对 (Snapshot vs SoT)"
  },
  "sections": {
    "relatedAlerts": "关联活跃告警",
    "recentAudit": "最近管理审计追踪"
  },
  "fields": {
    "domain": "业务域",
    "status": "状态",
    "identity": "对象标识",
    "subjectId": "对象 ID",
    "region": "区域 / 范围",
    "snapshotSource": "快照来源",
    "aggregationSource": "聚合来源",
    "mappedPod": "映射 Pod"
  }
};