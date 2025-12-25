
export const audit = {
  "title": "Audit Logs",
  "description": "Immutable record of administrative operations. Supports end-to-end adminOpId tracing.",
  "searchPlaceholder": "Search adminOpId, Operator, or Subject...",
  "table": {
    "time": "Timestamp",
    "action": "Action Type",
    "subject": "Affected Target (subjectId)",
    "operator": "Operator (operatorId)",
    "status": "Final Status",
    "duration": "Duration",
    "finishedAt": "Finished At",
    "result": "Result / Error Reason"
  },
  "status": {
    "inProgress": "In Progress",
    "succeeded": "Succeeded",
    "failed": "Failed"
  },
  "tooltips": {
    "copyId": "Copy adminOpId",
    "filterSubject": "Filter by this subjectId",
    "viewErrorDetails": "View failure reason",
    "linkTrace": "View full execution trace"
  },
  "export": {
    "btn": "Export Logs",
    "csv": "Export as CSV",
    "json": "Export as JSON",
    "centerTitle": "Export Center",
    "subtitle": "Track asynchronous data extraction tasks",
    "checkUpdates": "Check for updates",
    "empty": "No recent export tasks",
    "taskLabel": "{{format}} Data Extraction",
    "preparing": "Preparing export data...",
    "ready": "Export Ready",
    "download": "Download Now",
    "retry": "Retry"
  }
};
