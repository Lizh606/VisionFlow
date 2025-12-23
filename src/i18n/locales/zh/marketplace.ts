
export const marketplace = {
  "nav": {
    "buyer": "资源买家",
    "seller": "卖家中心"
  },
  "home": {
    "title": "资源市场",
    "description": "发现并集成顶尖的视觉算法模型、工作流及插件。",
    "heroTitle": "为您的视觉项目寻找最佳资源",
    "heroDesc": "搜索、预览并直接添加预构建资产到您的工作区，加速开发流程。",
    "featuredTitle": "精选推荐",
    "viewAll": "查看全部",
    "browseAll": "分类浏览"
  },
  "search": {
    "title": "资源搜索",
    "placeholder": "搜索名称、描述或标签...",
    "trending": "热门搜索",
    "selection": "当前选择"
  },
  "type": {
    "workflow": "工作流",
    "model": "算法模型",
    "plugin": "功能插件"
  },
  "library": {
    "title": "资产库",
    "description": "管理您已拥有或订阅的所有资源。",
    "browseStore": "前往资源市场",
    "searchPlaceholder": "搜索资产名称...",
    "filter": {
      "all": "全部状态",
      "active": "已激活",
      "syncing": "同步中",
      "expired": "已过期"
    },
    "meta": {
      "itemsShown": "共展示 {{count}} 项"
    },
    "empty": {
      "noMatch": "未发现符合要求的资产。",
      "goStore": "前往资源市场"
    }
  },
  "seller": {
    "dashboard": "卖家概览",
    "dashboardDesc": "实时监控商品状态、审核进度及营收数据分析。",
    "myListings": "我的商品",
    "createListing": "上架新商品",
    "emptyDesc": "开启您的销售之旅，发布第一个视觉资源。",
    "status": {
      "draft": "草稿",
      "pending_review": "审核中",
      "published": "已发布",
      "suspended": "已禁封",
      "archived": "已归档"
    },
    "actions": {
      "submissionInfo": "提交信息",
      "liveStore": "商品页",
      "submit": "提交"
    },
    "notices": {
      "reviewing": "正在等待技术审核（预计 48 小时内）",
      "live": "商品已对市场公开可见",
      "violation": "违反平台规则，请检查说明",
      "archived": "商品已退市并归档"
    },
    "preview": {
      "bannerDraft": "预览模式 — 商品当前处于草稿状态，对买家不可见。",
      "bannerPublished": "预览模式 — 这是买家看到的商品实际呈现效果。",
      "bannerSuspended": "预览模式 — 商品已被禁封，处于市场隐藏状态。",
      "ctaDisabled": "预览模式下已禁用交易动作"
    },
    "wizard": {
      "newTitle": "创建新商品",
      "editTitle": "编辑商品详情",
      "draftSaved": "草稿已保存",
      "submitTitle": "预览并提交",
      "submitDesc": "资源详情已准备就绪。提交审核前请务必确认所有文档及描述信息准确无误。",
      "previewSection": "商品页预览",
      "previewHint": "买家视角",
      "openPreview": "预览市场详情页",
      "viewAsBuyer": "查看买家如何与您的资源进行交互。",
      "launchPreview": "立即预览",
      "launchSubmit": "正式提交",
      "workflowTitle": "审核流程说明",
      "workflowDesc": "提交后，状态将变更为“审核中”。我们的团队通常会在 2 个工作日内完成技术及合规验证。",
      "submitted": "提交成功",
      "loadFailed": "加载失败",
      "missingMetadata": "需补充：短描述信息",
      "submitBtn": "确认提交审核",
      "backBtn": "上一步",
      "nextBtn": "下一步",
      "steps": {
        "general": "基础信息",
        "source": "逻辑绑定",
        "artifacts": "交付物",
        "pricing": "计划方案",
        "submit": "提交"
      },
      "general": {
        "basicTitle": "基本信息",
        "basicSubtitle": "展示身份",
        "nameLabel": "资源标题",
        "namePlaceholder": "例如：高级 PPE 安全检测",
        "nameRequired": "标题不能为空",
        "descLabel": "短描述",
        "descPlaceholder": "简要说明此资源的功能...",
        "descRequired": "描述不能为空",
        "classTitle": "分类筛选",
        "classSubtitle": "匹配与发现",
        "tagsLabel": "类别 / 标签",
        "taskLabel": "核心任务类型",
        "devicesLabel": "支持硬件",
        "devicesPlaceholder": "输入硬件名称（如 Jetson Orin）"
      },
      "source": {
        "title": "Linked Vision Logic",
        "subtitle": "Studio 资产绑定",
        "description": "选择提供此市场资源逻辑的工作空间工作流及其特定版本。消费者将获得该资产的只读副本。",
        "workflowLabel": "来源工作流",
        "workflowRequired": "请选择一个工作流",
        "versionLabel": "资产版本",
        "syncTitle": "逻辑同步",
        "syncDesc": "当有新版本推送到此版本号时，市场中的二进制文件将自动更新。"
      },
      "artifacts": {
        "docsTitle": "技术文档",
        "docsSubtitle": "买家指南",
        "uploadDocs": "上传 PDF/MD 文档",
        "examplesTitle": "视觉示例",
        "examplesSubtitle": "商品页展示"
      },
      "pricing": {
        "title": "许可与收益",
        "subtitle": "选择最符合您资源能力的定价模式。VisionFlow 将自动向消费者收费。",
        "plans": {
          "free": {
            "name": "社区免费版",
            "desc": "适用于非商业项目和个人学习的标准开源使用。"
          },
          "pro": {
            "name": "专业授权版",
            "desc": "支持多达 3 路并发流，授权小型团队商业使用。"
          },
          "ent": {
            "name": "企业月费版",
            "desc": "无限扩展能力、专属支持及定制化边缘部署选项。"
          }
        },
        "supportTitle": "需要为企业客户定制许可模型或专属定价？",
        "supportLink": "提交支持工单",
        "feeNote": "市场手续费 (15%) 将从所有付费交易中自动扣除。",
        "sellerTerms": "遵循卖家条款"
      }
    }
  },
  "detail": {
    "overview": "概述",
    "examples": "示例展示",
    "docs": "技术文档",
    "pricing": "计划方案",
    "author": "开发者",
    "category": "类别",
    "published": "发布日期",
    "cta": {
      "openStudio": "进入编辑器",
      "deploy": "部署到边缘设备",
      "buyNow": "立即购买",
      "getFree": "免费获取",
      "cloudTest": "云端测试"
    },
    "sections": {
      "details": "资源详情"
    },
    "supportedDevices": "支持硬件"
  },
  "purchase": {
    "status": {
      "active": "已激活",
      "expired": "已过期",
      "syncing": "激活中...",
      "ready": "已拥有",
      "pending": "处理中",
      "failed": "失败"
    },
    "label": {
      "expires": "Expires: {{date}}",
      "lifetime": "Lifetime Access",
      "quota": "Quota: {{count}} Streams",
      "open": "Open",
      "deploy": "Deploy",
      "viewDetails": "Details",
      "fullAccess": "Full Access License"
    }
  },
  "entitlement": {
    "drawer": {
      "title": "授权权益详情",
      "purchasedAt": "购买于 {{date}}",
      "support": "联系技术支持"
    },
    "sections": {
      "access": "访问与配额",
      "capabilities": "核心功能项",
      "metadata": "权益元数据"
    },
    "labels": {
      "expiry": "到期日期",
      "quota": "流配额",
      "status": "当前状态",
      "activeStreams": "{{count}} 路活跃流",
      "unlimited": "无限制",
      "id": "权益 ID",
      "listingId": "商品 ID",
      "billing": "计费模式",
      "oneTime": "一次性买断"
    },
    "capabilities": {
      "commercial": {
        "title": "商业授权",
        "enabled": "授权用于生产环境下的专业视觉推理。",
        "disabled": "仅限非商业测试使用。"
      },
      "cloud": {
        "title": "云端测试",
        "enabled": "支持在 VisionFlow 云端基础设施进行实时推理测试。",
        "disabled": "当前方案不包含云端测试权限。"
      },
      "edge": {
        "title": "边缘部署",
        "enabled": "授权在自托管 SHMgr 边缘设备上执行部署。",
        "disabled": "仅限云端执行，不支持本地化部署。"
      }
    }
  },
  "filters": {
    "title": "筛选器",
    "reset": "重置",
    "tags": "标签",
    "taskType": "任务类型",
    "devices": "支持硬件",
    "priceRange": "价格区间",
    "showResults": "显示结果"
  },
  "installs": "次安装",
  "rating": "评分"
};
