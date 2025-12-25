export const marketplace = {
  "orders": {
    "title": "订单与退款",
    "description": "监控市场交易流水并处理退款异常。",
    "searchPlaceholder": "按订单 ID、工作区或用户搜索...",
    "table": {
      "orderId": "订单 ID",
      "payment": "支付状态",
      "refund": "退款状态",
      "lastSynced": "最近同步",
      "amount": "金额",
      "customer": "客户"
    },
    "detail": {
      "summary": "交易摘要",
      "paymentInfo": "支付详情",
      "refundInfo": "退款详情",
      "failureReason": "失败原因",
      "syncTime": "适配器同步时间",
      "actions": "运营处置动作",
      "timeline": "交易时间轴",
      "sotNote": "订单真值 (SoT) 维护在 BillingAdapter 中。本页面展示运行快照与审计记录。",
      "meta": "环境上下文"
    },
    "actions": {
      "retry": "重试退款",
      "manual": "改为人工处理",
      "chargeback": "标记拒付",
      "modals": {
        "retry": {
          "title": "重试退款",
          "hint": "此操作将被记录在审计日志中。支持安全幂等重试。",
          "confirm": "确认重试"
        },
        "manual": {
          "title": "改为人工处理",
          "hint": "标记后将停止系统自动重试并进入人工处置队列。",
          "confirm": "确认转人工"
        },
        "chargeback": {
          "title": "标记拒付",
          "hint": "高风险操作：将影响财务对账流水及开发者信誉评分。",
          "confirm": "确认标记拒付"
        },
        "fields": {
          "reason": "原因",
          "reasonRequired": "必须填写原因以供审计",
          "reasonPlaceholder": "请说明执行此状态变更的必要性...",
          "comment": "备注",
          "commentRequired": "必须填写备注",
          "commentPlaceholder": "请输入处理细节...",
          "ticket": "工单 ID (选填)",
          "ticketPlaceholder": "例如：OPS-12345"
        }
      }
    }
  }
};