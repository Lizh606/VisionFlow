

import { Language, NodeType, Category } from './types';

interface Translation {
  navbar: {
    deploy: string;
    save: string;
    test: string;
    publish: string;
    project: string;
    backToDash: string;
  };
  sidebar: {
    title: string;
    search: string;
    categories: Record<Category, string>;
  };
  dashboard: {
    menu: {
      platform: string;
      config: string;
      home: string;
      projects: string;
      workflows: string;
      monitoring: string;
      deployments: string;
      explore: string;
      settings: string;
      help: string;
      notifications: string;
      // Self-Hosted Section
      selfHosted: string;
      shOverview: string;
      shDevices: string;
      shLicenses: string;
    };
    headers: {
      myWorkflows: string;
      createNew: string;
      shOverview: string;
      shOverviewStats: string;
    };
    stats: {
      totalFlows: string;
      activeNodes: string;
      uptime: string;
    };
    card: {
      nodes: string;
      edit: string;
      lastUpdated: string;
    };
    usage: {
      title: string;
      used: string;
      reset: string;
      upgrade: string;
    };
    pagination: {
      showing: string;
      of: string;
    }
  };
  // New Self Hosted Translations
  selfHosted: {
    breadcrumbs: {
      root: string;
      overview: string;
      devices: string;
      deviceDetail: string;
    };
    timeRange: {
      last24h: string;
      last7d: string;
      last30d: string;
      custom: string;
    };
    cards: {
      totalDevices: string;
      licenseUsage: string;
      usageSummary: string;
      edge: string;
      cloud: string;
      expiring: string;
    };
    status: {
      online: string;
      offline: string;
      pending: string;
      draining: string;
      decommissioned: string;
    };
    tooltips: {
      edgeMode: string;
      cloudMode: string;
      offlineLease: string;
    };
    charts: {
      deviceStatus: string;
      usageTrend: string;
    };
    alerts: {
      title: string;
      longOffline: string;
      licenseExpiring: string;
      highUsage: string;
      levels: {
        critical: string;
        warning: string;
        info: string;
      }
    };
    shortcuts: {
      title: string;
      viewDevices: string;
      viewLicenses: string;
      recentReleases: string;
    };
    devices: {
        title: string;
        searchPlaceholder: string;
        filters: {
            all: string;
            online: string;
            offline: string;
            pending: string;
            draining: string;
            decommissioned: string;
            edge: string;
            cloud: string;
            region: string;
            tags: string;
        };
        alert: {
            pendingMessage: string;
            filterAction: string;
        };
        table: {
            device: string;
            ids: string;
            status: string;
            mode: string;
            license: string;
            config: string;
            lastSeen: string;
            usage: string;
            actions: string;
            unbound: string;
        };
        actions: {
            refresh: string;
            export: string;
            view: string;
            bind: string;
            drain: string;
        }
    };
    deviceDetail: {
        tabs: {
            overview: string;
            deployment: string;
            usage: string;
            logs: string;
        };
        header: {
            deviceInfo: string;
            licenseInfo: string;
            configInfo: string;
            changeLicense: string;
            changeMode: string;
            offlineLease: string;
            audit: string;
        };
        modeSwitchModal: {
            title: string;
            edgeToCloud: string;
            cloudToEdge: string;
            confirm: string;
            cancel: string;
        };
        overview: {
            runningStatus: string;
            heartbeat: string;
            activeStreams: string;
            billing: {
                edge: string;
                cloud: string;
            };
            configSummary: string;
            usageSummary: string;
            imageCount: string;
            videoSeconds: string;
        };
        deployment: {
            currentVersion: string;
            status: string;
            history: string;
            rollback: string;
            streams: string;
            addStream: string;
            table: {
                stream: string;
                input: string;
                workflow: string;
                status: string;
                telemetry: string;
                updated: string;
            };
            snapshot: {
                view: string;
                diff: string;
                rollback: string;
                empty: string;
                emptyDiff: string;
                fields: {
                    workflow: string;
                    input: string;
                    concurrency: string;
                    telemetry: string;
                }
            };
            drawer: {
                titleAdd: string;
                titleEdit: string;
                basic: string;
                input: string;
                workflow: string;
                policy: string;
                save: string;
                cancel: string;
            }
        };
        usage: {
            filters: {
                dimension: string;
                mode: string;
                metric: string;
            };
            dimensions: {
                workflow: string;
                stream: string;
            };
            table: {
                id: string;
                images: string;
                video: string;
                calls: string;
                errors: string;
                mode: string;
            };
            charts: {
                errorRate: string;
            };
            disclaimer: {
                cloud: string;
                edge: string;
            };
            cloudNotice: string;
        };
        logs: {
            recentEvents: string;
            viewObservability: string;
        }
    };
    licenseModal: {
      title: string;
      searchPlaceholder: string;
      filter: {
        all: string;
        selfHosted: string;
        cloud: string;
      };
      columns: {
        license: string;
        type: string;
        usage: string;
        expiry: string;
        features: string;
      };
      summary: {
        selected: string;
        billingDesc: string;
        capabilities: string;
      };
      confirm: string;
      cancel: string;
    };
    licenses: {
      title: string;
      searchPlaceholder: string;
      actions: {
        activate: string;
      };
      table: {
        details: string;
        type: string;
        allocation: string;
        expiry: string;
        status: string;
        actions: string;
      };
      status: {
        active: string;
        expired: string;
        expiring: string;
      }
    };
  };
  inspector: {
    title: string;
    id: string;
    label: string;
    description: string;
    parameters: string;
    activeState: string;
    delete: string;
    close: string;
    confThreshold: string;
    iouThreshold: string;
    resolution: string;
    fps: string;
  };
  nodes: Record<NodeType, { label: string; desc: string }>;
  status: {
    idle: string;
    running: string;
    completed: string;
    error: string;
  };
  modelLibrary: {
    title: string;
    tabs: {
      types: string;
      custom: string;
      public: string;
    };
    searchPlaceholder: string;
    addModel: string;
    cancel: string;
    popular: string;
  };
  history: {
    title: string;
    versionsAvailable: string;
    restore: string;
    types: {
      current: string;
      save: string;
      init: string;
    };
    time: {
      justNow: string;
      hoursAgo: string;
      yesterday: string;
      daysAgo: string;
    }
  };
  workspace: {
    title: string;
    personal: string;
    team: string;
    addTeam: string;
    settings: string;
    logout: string;
    members: string;
    plan: string;
    searchPlaceholder: string;
    listTitle: string;
  };
}

export const translations: Record<Language, Translation> = {
  en: {
    navbar: {
      deploy: 'DEPLOY',
      save: 'Save',
      test: 'Test',
      publish: 'Publish',
      project: 'Project Alpha',
      backToDash: 'Back to Dashboard',
    },
    sidebar: {
      title: 'Component Library',
      search: 'Search nodes...',
      categories: {
        'Source': 'Source',
        'AI Model': 'AI Model',
        'Logic': 'Logic',
        'Output': 'Output'
      }
    },
    dashboard: {
      menu: {
        platform: 'Platform',
        config: 'Configuration',
        home: 'Home',
        projects: 'Projects',
        workflows: 'Workflows',
        monitoring: 'Monitoring',
        deployments: 'Deployments',
        explore: 'Explore',
        settings: 'Settings',
        help: 'Help & Docs',
        notifications: 'Notifications',
        selfHosted: 'Self-Hosted',
        shOverview: 'Overview',
        shDevices: 'Devices',
        shLicenses: 'Licenses',
      },
      headers: {
        myWorkflows: 'My Workflows',
        createNew: 'Create New',
        shOverview: 'Self-Hosted Overview',
        shOverviewStats: 'Overview',
      },
      stats: {
        totalFlows: 'Total Flows',
        activeNodes: 'Active Nodes',
        uptime: 'System Uptime'
      },
      card: {
        nodes: 'Nodes',
        edit: 'Edit Workflow',
        lastUpdated: 'Updated'
      },
      usage: {
        title: 'Credits used',
        used: '0 credits used',
        reset: 'Resets on December 31',
        upgrade: 'Upgrade'
      },
      pagination: {
        showing: 'Showing',
        of: 'of'
      }
    },
    selfHosted: {
      breadcrumbs: {
        root: 'Self-Hosted',
        overview: 'Overview',
        devices: 'Devices',
        deviceDetail: 'Device Details',
      },
      timeRange: {
        last24h: 'Last 24h',
        last7d: 'Last 7 Days',
        last30d: 'Last 30 Days',
        custom: 'Custom',
      },
      cards: {
        totalDevices: 'Total Devices',
        licenseUsage: 'License Usage',
        usageSummary: 'Usage Summary',
        edge: 'EDGE',
        cloud: 'CLOUD',
        expiring: 'expiring soon',
      },
      status: {
        online: 'Online',
        offline: 'Offline',
        pending: 'Pending License',
        draining: 'Draining',
        decommissioned: 'Decommissioned',
      },
      tooltips: {
        edgeMode: 'Only billed by Self-Hosted Device License. Usage is for observability only and not counted towards Cloud pay-as-you-go.',
        cloudMode: 'Usage on this device counts towards Cloud pay-as-you-go billing.',
        offlineLease: 'Supports running without internet connection for up to 30 days.'
      },
      charts: {
        deviceStatus: 'Device Status',
        usageTrend: 'Usage Trend',
      },
      alerts: {
        title: 'Active Alerts',
        longOffline: 'Device X offline for > 30m',
        licenseExpiring: 'License ABC expiring in 7 days',
        highUsage: 'Unusual Cloud usage spike',
        levels: {
            critical: 'CRITICAL',
            warning: 'WARNING',
            info: 'INFO'
        }
      },
      shortcuts: {
        title: 'Shortcuts',
        viewDevices: 'View Device List',
        viewLicenses: 'Manage Licenses',
        recentReleases: 'Recent Deployments',
      },
      devices: {
        title: 'Device List',
        searchPlaceholder: 'Search Name, Device ID, Runtime ID...',
        filters: {
            all: 'All Status',
            online: 'Online',
            offline: 'Offline',
            pending: 'Pending',
            draining: 'Draining',
            decommissioned: 'Decommissioned',
            edge: 'Edge',
            cloud: 'Cloud',
            region: 'Region',
            tags: 'Tags'
        },
        alert: {
            pendingMessage: '3 New devices detected pending license binding.',
            filterAction: 'Filter Pending Devices'
        },
        table: {
            device: 'Device',
            ids: 'IDs',
            status: 'Status',
            mode: 'Mode',
            license: 'License',
            config: 'Config',
            lastSeen: 'Last Seen',
            usage: 'Usage',
            actions: 'Actions',
            unbound: 'Unbound'
        },
        actions: {
            refresh: 'Refresh',
            export: 'Export',
            view: 'View',
            bind: 'Bind License',
            drain: 'Drain Node'
        }
      },
      deviceDetail: {
        tabs: {
            overview: 'Overview',
            deployment: 'Workflow Deployment',
            usage: 'Usage',
            logs: 'Logs & Telemetry',
        },
        header: {
            deviceInfo: 'Device Info',
            licenseInfo: 'License Info',
            configInfo: 'Config Status',
            changeLicense: 'Change License',
            changeMode: 'Change Mode',
            offlineLease: 'Offline Lease',
            audit: 'Last Update',
        },
        modeSwitchModal: {
            title: 'Change Deployment Mode',
            edgeToCloud: 'You are switching this device to CLOUD mode. All subsequent usage will be metered and billed according to the Cloud Pay-as-you-go rates.',
            cloudToEdge: 'You are switching this device to EDGE mode. Cloud processing capabilities will be disabled, and usage will only be tracked for observability purposes.',
            confirm: 'Confirm Switch',
            cancel: 'Cancel'
        },
        overview: {
            runningStatus: 'Running Status',
            heartbeat: 'Last Heartbeat',
            activeStreams: 'Active Streams',
            billing: {
                edge: 'EDGE: Only billed by device license.',
                cloud: 'CLOUD: Usage enters cloud billing.',
            },
            configSummary: 'Config Summary',
            usageSummary: 'Usage Summary',
            imageCount: 'Image Count',
            videoSeconds: 'Video Seconds'
        },
        deployment: {
            currentVersion: 'Current Config Version',
            status: 'Status',
            history: 'Version History',
            rollback: 'Rollback',
            streams: 'Streams',
            addStream: 'Add Stream',
            table: {
                stream: 'Stream',
                input: 'Input',
                workflow: 'Workflow',
                status: 'Status',
                telemetry: 'Telemetry',
                updated: 'Updated',
            },
            snapshot: {
                view: 'Snapshot',
                diff: 'Diff',
                rollback: 'Rollback to this version',
                empty: 'No streams configured in this version.',
                emptyDiff: 'No changes recorded vs previous version.',
                fields: {
                    workflow: 'Workflow',
                    input: 'Input',
                    concurrency: 'Concurrency',
                    telemetry: 'Telemetry'
                }
            },
            drawer: {
                titleAdd: 'Add New Stream',
                titleEdit: 'Edit Stream',
                basic: 'Basic Info',
                input: 'Input Source',
                workflow: 'Workflow Binding',
                policy: 'Run Policy',
                save: 'Save Changes',
                cancel: 'Cancel',
            }
        },
        usage: {
            filters: {
                dimension: 'Group By',
                mode: 'Deployment Mode',
                metric: 'Metric',
            },
            dimensions: {
                workflow: 'Workflow',
                stream: 'Stream',
            },
            table: {
                id: 'ID',
                images: 'Image Count',
                video: 'Video (s)',
                calls: 'Calls',
                errors: 'Error Rate',
                mode: 'Mode',
            },
            charts: {
                errorRate: 'Error Rate Trend',
            },
            disclaimer: {
                cloud: 'Usage for CLOUD mode contributes to pay-as-you-go billing.',
                edge: 'Usage for EDGE mode is for monitoring only and not billed.',
            },
            cloudNotice: 'Usage shown here for CLOUD mode devices contributes to your monthly bill.',
        },
        logs: {
            recentEvents: 'Recent Telemetry Events',
            viewObservability: 'View in Observability Platform',
        }
      },
      licenseModal: {
        title: 'Select License',
        searchPlaceholder: 'Search License Name, ID...',
        filter: {
          all: 'All Types',
          selfHosted: 'Self-Hosted',
          cloud: 'Cloud'
        },
        columns: {
          license: 'License Details',
          type: 'Type / Billing',
          usage: 'Device Usage',
          expiry: 'Expires',
          features: 'Features'
        },
        summary: {
          selected: 'Selected License',
          billingDesc: 'Billing Description',
          capabilities: 'Capabilities'
        },
        confirm: 'Bind License',
        cancel: 'Cancel'
      },
      licenses: {
        title: 'License Management',
        searchPlaceholder: 'Search license name, ID...',
        actions: {
            activate: 'Activate New License',
        },
        table: {
            details: 'License Details',
            type: 'Type',
            allocation: 'Allocation',
            expiry: 'Valid Until',
            status: 'Status',
            actions: 'Actions'
        },
        status: {
            active: 'Active',
            expired: 'Expired',
            expiring: 'Expiring Soon'
        }
      }
    },
    inspector: {
      title: 'Configuration',
      id: 'Node ID',
      label: 'Label',
      description: 'Description',
      parameters: 'Parameters',
      activeState: 'Active State',
      delete: 'Delete',
      close: 'Close',
      confThreshold: 'Confidence Threshold',
      iouThreshold: 'IOU Threshold',
      resolution: 'Resolution',
      fps: 'FPS'
    },
    nodes: {
      input: { label: 'Video Source', desc: 'Camera, RTSP, File' },
      detection: { label: 'Object Detection', desc: 'YOLO, SSD, FasterRCNN' },
      tracking: { label: 'Object Tracking', desc: 'ByteTrack, DeepSort' },
      pose: { label: 'Pose Estimation', desc: 'MoveNet, PoseNet' },
      classifier: { label: 'Classification', desc: 'ResNet, MobileNet' },
      logic: { label: 'Logic Gate', desc: 'Filter, Switch, Merge' },
      output: { label: 'Output Sink', desc: 'DB, API, File' }
    },
    status: {
      idle: 'IDLE',
      running: 'RUNNING',
      completed: 'COMPLETED',
      error: 'ERROR'
    },
    modelLibrary: {
      title: 'Add a Model',
      tabs: {
        types: 'Model Types',
        custom: 'My Models',
        public: 'Public Models'
      },
      searchPlaceholder: 'Search model blocks...',
      addModel: 'Add Model',
      cancel: 'Cancel',
      popular: 'Popular'
    },
    history: {
      title: 'Version History',
      versionsAvailable: 'versions available',
      restore: 'Restore',
      types: {
        current: 'Current Version',
        save: 'Saved Manually',
        init: 'Project Created'
      },
      time: {
        justNow: 'Just now',
        hoursAgo: '2 hours ago',
        yesterday: 'Yesterday',
        daysAgo: '3 days ago'
      }
    },
    workspace: {
      title: 'Vision Team',
      personal: 'Personal Workspace',
      team: 'Team Plan',
      addTeam: 'Create Workspace',
      settings: 'Workspace Settings',
      logout: 'Log Out',
      members: 'Members',
      plan: 'Free Plan',
      searchPlaceholder: 'Search workspaces...',
      listTitle: 'Workspaces'
    }
  },
  zh: {
    navbar: {
      deploy: '部署',
      save: '保存',
      test: '测试',
      publish: '发布',
      project: '阿尔法项目',
      backToDash: '返回控制台',
    },
    sidebar: {
      title: '组件库',
      search: '搜索节点...',
      categories: {
        'Source': '数据源',
        'AI Model': 'AI 模型',
        'Logic': '逻辑处理',
        'Output': '输出结果'
      }
    },
    dashboard: {
      menu: {
        platform: '平台',
        config: '配置',
        home: '首页',
        projects: '项目管理',
        workflows: '工作流',
        monitoring: '监控中心',
        deployments: '部署管理',
        explore: '发现',
        settings: '系统设置',
        help: '帮助与文档',
        notifications: '消息通知',
        selfHosted: '自托管',
        shOverview: '概览',
        shDevices: '设备',
        shLicenses: '许可证',
      },
      headers: {
        myWorkflows: '我的工作流',
        createNew: '新建工作流',
        shOverview: '自托管概览',
        shOverviewStats: '概览',
      },
      stats: {
        totalFlows: '总工作流',
        activeNodes: '活跃节点',
        uptime: '系统运行时间'
      },
      card: {
        nodes: '节点数',
        edit: '编辑工作流',
        lastUpdated: '更新于'
      },
      usage: {
        title: '额度使用',
        used: '已用 0 额度',
        reset: '12月31日重置',
        upgrade: '升级套餐'
      },
      pagination: {
        showing: '显示',
        of: '共'
      }
    },
    selfHosted: {
      breadcrumbs: {
        root: '自托管',
        overview: '概览',
        devices: '设备',
        deviceDetail: '设备详情',
      },
      timeRange: {
        last24h: '最近 24小时',
        last7d: '最近 7天',
        last30d: '最近 30天',
        custom: '自定义',
      },
      cards: {
        totalDevices: '设备总数',
        licenseUsage: 'License 使用情况',
        usageSummary: '用量汇总',
        edge: '边缘 (EDGE)',
        cloud: '云端 (CLOUD)',
        expiring: '即将到期',
      },
      status: {
        online: '在线',
        offline: '离线',
        pending: '待绑定 License',
        draining: '排空中',
        decommissioned: '已退役',
      },
      tooltips: {
        edgeMode: '仅按自托管设备 License 计费，用量仅作为可观测性指标，不计入云端按量计费。',
        cloudMode: '该设备的用量会计入云端按量计费。',
        offlineLease: '支持在无网络连接的情况下运行长达 30 天。'
      },
      charts: {
        deviceStatus: '设备状态分布',
        usageTrend: '用量趋势',
      },
      alerts: {
        title: '告警列表',
        longOffline: '设备 X 离线超过 30分钟',
        licenseExpiring: '许可证 ABC 将在 7天后到期',
        highUsage: '云端用量异常激增',
        levels: {
            critical: '严重',
            warning: '警告',
            info: '信息'
        }
      },
      shortcuts: {
        title: '快捷入口',
        viewDevices: '查看设备列表',
        viewLicenses: '管理许可证',
        recentReleases: '最近配置发布',
      },
      devices: {
        title: '设备列表',
        searchPlaceholder: '搜索设备名称、ID、Runtime ID...',
        filters: {
            all: '全部状态',
            online: '在线',
            offline: '离线',
            pending: '待绑定',
            draining: '排空中',
            decommissioned: '已退役',
            edge: '边缘端',
            cloud: '云端',
            region: '区域',
            tags: '标签'
        },
        alert: {
            pendingMessage: '检测到 3 台新设备未绑定 License，无法正常运行。',
            filterAction: '仅看待绑定设备'
        },
        table: {
            device: '设备信息',
            ids: '设备标识',
            status: '状态',
            mode: '部署模式',
            license: '许可证',
            config: '配置版本',
            lastSeen: '最近活跃',
            usage: '今日用量',
            actions: '操作',
            unbound: '未绑定'
        },
        actions: {
            refresh: '刷新',
            export: '导出',
            view: '查看详情',
            bind: '绑定 License',
            drain: '标记排空'
        }
      },
      deviceDetail: {
        tabs: {
            overview: '总览',
            deployment: 'Workflow 部署',
            usage: '用量统计',
            logs: '日志与遥测',
        },
        header: {
            deviceInfo: '设备概况',
            licenseInfo: '许可证信息',
            configInfo: '当前配置',
            changeLicense: '更换 License',
            changeMode: '切换模式',
            offlineLease: '离线租约',
            audit: '最近变更',
        },
        modeSwitchModal: {
            title: '切换部署模式',
            edgeToCloud: '您正在将此设备切换为 CLOUD 模式。后续用量将根据云端按量付费费率进行计量和计费。',
            cloudToEdge: '您正在将此设备切换为 EDGE 模式。云端处理能力将被禁用，用量数据仅用于可观测性统计。',
            confirm: '确认切换',
            cancel: '取消'
        },
        overview: {
            runningStatus: '运行状态',
            heartbeat: '最近心跳',
            activeStreams: '正在运行 Streams',
            billing: {
                edge: 'EDGE：仅设备 License 计费',
                cloud: 'CLOUD：用量会进入云端计费',
            },
            configSummary: '配置摘要',
            usageSummary: '用量概要',
            imageCount: 'Image Count',
            videoSeconds: 'Video Seconds(s)'
        },
        deployment: {
            currentVersion: '当前配置版本',
            status: '状态',
            history: '版本历史',
            rollback: '回滚',
            streams: 'Stream 列表',
            addStream: '新增 Stream',
            table: {
                stream: 'Stream',
                input: '输入源',
                workflow: 'Workflow',
                status: '运行状态',
                telemetry: '遥测级别',
                updated: '更新时间',
            },
            snapshot: {
                view: '快照',
                diff: '变更对比',
                rollback: '回滚至此版本',
                empty: '此版本未配置任何 Stream。',
                emptyDiff: '与上个版本相比无变更。',
                fields: {
                    workflow: '工作流',
                    input: '输入源',
                    concurrency: '并发数',
                    telemetry: '遥测级别'
                }
            },
            drawer: {
                titleAdd: '新增 Stream',
                titleEdit: '编辑 Stream',
                basic: '基本信息',
                input: '输入配置',
                workflow: 'Workflow 绑定',
                policy: '运行策略',
                save: '保存配置',
                cancel: '取消',
            }
        },
        usage: {
            filters: {
                dimension: '聚合维度',
                mode: '部署模式',
                metric: '指标',
            },
            dimensions: {
                workflow: '按 Workflow',
                stream: '按 Stream',
            },
            table: {
                id: '标识',
                images: '总 Image Count',
                video: '总 Video (s)',
                calls: '调用次数',
                errors: '错误率',
                mode: '模式',
            },
            charts: {
                errorRate: '错误率趋势',
            },
            disclaimer: {
                cloud: 'deployment_mode=CLOUD 的用量会计入云端按量计费',
                edge: 'deployment_mode=EDGE 的用量仅用于监控，不计费',
            },
            cloudNotice: '此处展示的 CLOUD 模式用量将计入您的月度账单。',
        },
        logs: {
            recentEvents: '最近遥测事件',
            viewObservability: '前往可观测性平台查看完整日志',
        }
      },
      licenseModal: {
        title: '选择许可证',
        searchPlaceholder: '搜索许可证名称、ID...',
        filter: {
          all: '全部类型',
          selfHosted: '自托管',
          cloud: '云端'
        },
        columns: {
          license: '许可证详情',
          type: '类型 / 计费',
          usage: '设备用量',
          expiry: '到期时间',
          features: '特性'
        },
        summary: {
          selected: '已选许可证',
          billingDesc: '计费说明',
          capabilities: '能力'
        },
        confirm: '绑定许可证',
        cancel: '取消'
      },
      licenses: {
        title: '许可证管理',
        searchPlaceholder: '搜索许可证名称、ID...',
        actions: {
            activate: '激活新许可证',
        },
        table: {
            details: '许可证详情',
            type: '类型',
            allocation: '分配情况',
            expiry: '有效期至',
            status: '状态',
            actions: '操作'
        },
        status: {
            active: '生效中',
            expired: '已过期',
            expiring: '即将过期'
        }
      }
    },
    inspector: {
      title: '参数配置',
      id: '节点 ID',
      label: '名称',
      description: '描述',
      parameters: '参数设置',
      activeState: '激活状态',
      delete: '删除',
      close: '关闭',
      confThreshold: '置信度阈值',
      iouThreshold: 'IOU 阈值',
      resolution: '分辨率',
      fps: '帧率'
    },
    nodes: {
      input: { label: '视频源', desc: '摄像头, RTSP, 本地文件' },
      detection: { label: '目标检测', desc: 'YOLO, SSD, FasterRCNN' },
      tracking: { label: '目标跟踪', desc: 'ByteTrack, DeepSort' },
      pose: { label: '姿态估计', desc: 'MoveNet, PoseNet' },
      classifier: { label: '图像分类', desc: 'ResNet, MobileNet' },
      logic: { label: '逻辑控制', desc: '过滤, 开关, 合并' },
      output: { label: '结果输出', desc: '数据库, API, 文件' }
    },
    status: {
      idle: '空闲',
      running: '运行中',
      completed: '已完成',
      error: '错误'
    },
    modelLibrary: {
      title: '添加模型',
      tabs: {
        types: '模型类型',
        custom: '我的模型',
        public: '公共模型'
      },
      searchPlaceholder: '搜索模型组件...',
      addModel: '添加模型',
      cancel: '取消',
      popular: '热门'
    },
    history: {
      title: '版本历史',
      versionsAvailable: '个可用版本',
      restore: '恢复此版本',
      types: {
        current: '当前版本',
        save: '手动保存',
        init: '项目创建'
      },
      time: {
        justNow: '刚刚',
        hoursAgo: '2小时前',
        yesterday: '昨天 16:20',
        daysAgo: '3天前'
      }
    },
    workspace: {
      title: '视觉团队',
      personal: '个人空间',
      team: '团队版',
      addTeam: '创建工作空间',
      settings: '工作空间设置',
      logout: '退出登录',
      members: '成员',
      plan: '免费版',
      searchPlaceholder: '搜索工作空间...',
      listTitle: '工作空间列表'
    }
  }
};