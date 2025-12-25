
export const config = {
  "title": "全局配置",
  "subtitle": "统一管理系统的运行逻辑、通知渠道及业务规则参数。",
  "status": {
    "available": "可用",
    "comingSoon": "待上线",
    "noAccess": "无权访问"
  },
  "cards": {
    "alertRules": {
      "title": "告警规则",
      "desc": "定义集群内各类资源的异常检测逻辑与触发阈值。"
    },
    "notificationRouting": {
      "title": "通知渠道",
      "desc": "编排告警消息分发路径，分发至预设的消息通道。"
    },
    "templates": {
      "title": "定价/分成模板",
      "desc": "定义定价模型、分成比例等全局业务配置 Schema。"
    }
  },
  "common": {
    "close": "关闭",
    "copy": "复制",
    "expression": "表达式",
    "overview": "概览",
    "lastUpdated": "最近变更时间",
    "updatedBy": "最近变更人"
  },
  "alertRules": {
    "title": "告警规则库",
    "searchPlaceholder": "按规则名称筛选...",
    "table": {
      "ruleName": "规则名称",
      "domain": "所属领域",
      "severity": "严重级别",
      "status": "运行状态",
      "updated": "最近变更时间"
    },
    "drawer": {
      "title": "规则定义详情",
      "overview": "策略概览",
      "definition": "检测逻辑",
      "copyHint": "只读模式。修改需经 GitOps 流程核准并推送至集群。"
    }
  },
  "notificationRouting": {
    "title": "通知渠道编排",
    "searchPlaceholder": "搜索路由名称或通道...",
    "table": {
      "routeName": "路由名称",
      "channel": "分发通道",
      "target": "投递目标",
      "status": "状态",
      "updated": "同步时间"
    },
    "drawer": {
      "title": "渠道配置详情",
      "conditions": "匹配条件",
      "target": "安全投递端点",
      "maskHint": "数据已脱敏保护。"
    }
  },
  "templates": {
    "title": "定价/分成模板",
    "searchPlaceholder": "按模板名称搜索...",
    "table": {
      "name": "模板名称",
      "type": "业务分类",
      "version": "版本",
      "status": "发布状态",
      "updated": "最近变更时间"
    },
    "drawer": {
      "title": "模板版本管理",
      "versions": "版本溯源",
      "content": "配置源码",
      "cloneBtn": "复制为新版本",
      "cloneModalTitle": "克隆配置模板",
      "cloneModalHint": "请输入克隆原因，此操作将生成一条可审计的草稿版本记录。",
      "viewAudit": "在审计日志中查看"
    }
  }
};
