export const marketplace = {
  "orders": {
    "title": "Orders & Refunds",
    "description": "Monitor marketplace transactions and manage refund exceptions.",
    "searchPlaceholder": "Search by Order ID, Workspace, or User...",
    "table": {
      "orderId": "Order ID",
      "payment": "Payment",
      "refund": "Refund",
      "lastSynced": "Last Synced",
      "amount": "Amount",
      "customer": "Customer"
    },
    "detail": {
      "summary": "Transaction Summary",
      "paymentInfo": "Payment Status",
      "refundInfo": "Refund Status",
      "failureReason": "Failure Reason",
      "syncTime": "Adapter Sync",
      "actions": "Remediation Actions",
      "timeline": "Transaction Timeline",
      "sotNote": "Order SoT is maintained in BillingAdapter. This view reflects operational snapshots and audit records.",
      "meta": "Context"
    },
    "actions": {
      "retry": "Refund Retry",
      "manual": "Manual Handling",
      "chargeback": "Chargeback",
      "modals": {
        "retry": {
          "title": "Refund Retry",
          "hint": "This action will be recorded in the audit log. Safe for idempotent retry.",
          "confirm": "Confirm Retry"
        },
        "manual": {
          "title": "Manual Handling",
          "hint": "Stops automated retries and flags this order for human intervention.",
          "confirm": "Confirm Manual Handling"
        },
        "chargeback": {
          "title": "Chargeback",
          "hint": "High-risk action: impacts financial ledgers and developer reputation.",
          "confirm": "Confirm Chargeback"
        },
        "fields": {
          "reason": "Reason",
          "reasonRequired": "Reason is mandatory for audit",
          "reasonPlaceholder": "Explain why this state change is required...",
          "comment": "Remark",
          "commentRequired": "Remark is mandatory",
          "commentPlaceholder": "Internal notes for record keeping...",
          "ticket": "Ticket ID (Optional)",
          "ticketPlaceholder": "e.g., OPS-12345"
        }
      }
    }
  }
};