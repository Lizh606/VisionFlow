
export const audit = {
  "title": "审计日志",
  "description": "管理操作与事务状态变更的不可篡改记录。支持按 adminOpId 全链路追踪。",
  "searchPlaceholder": "搜索 adminOpId, 操作员或主体...",
  "table": {
    "time": "执行时间 (timestamp)",
    "action": "操作类型",
    "subject": "受影响主体 (subjectId)",
    "operator": "操作人 (operatorId)",
    "status": "最终状态",
    "duration": "处理耗时",
    "finishedAt": "完成时间",
    "result": "执行结果 / 失败原因"
  },
  "status": {
    "inProgress": "操作进行中",
    "succeeded": "成功 (Succeeded)",
    "failed": "失败 (Failed)"
  },
  "tooltips": {
    "copyId": "复制 adminOpId",
    "filterSubject": "按该主体筛选",
    "viewErrorDetails": "查看失败原因",
    "linkTrace": "查看完整链路回放"
  },
  "export": {
    "btn": "导出日志",
    "csv": "导出 CSV 格式",
    "json": "导出 JSON 格式",
    "centerTitle": "导出任务中心",
    "subtitle": "追踪异步数据提取任务进度",
    "checkUpdates": "检查任务更新",
    "empty": "暂无最近的导出任务",
    "taskLabel": "{{format}} 数据提取任务",
    "preparing": "正在生成导出文件...",
    "ready": "文件已就绪",
    "download": "立即下载",
    "retry": "重试"
  }
};
