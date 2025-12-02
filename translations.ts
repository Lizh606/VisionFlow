
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
      home: string;
      projects: string;
      workflows: string;
      monitoring: string;
      deployments: string;
      explore: string;
      settings: string;
      help: string;
      notifications: string;
    };
    headers: {
      myWorkflows: string;
      createNew: string;
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
    }
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
        home: 'Home',
        projects: 'Projects',
        workflows: 'Workflows',
        monitoring: 'Monitoring',
        deployments: 'Deployments',
        explore: 'Explore',
        settings: 'Settings',
        help: 'Help & Docs',
        notifications: 'Notifications'
      },
      headers: {
        myWorkflows: 'My Workflows',
        createNew: 'Create New'
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
        home: '首页',
        projects: '项目管理',
        workflows: '工作流',
        monitoring: '监控中心',
        deployments: '部署管理',
        explore: '发现',
        settings: '系统设置',
        help: '帮助与文档',
        notifications: '消息通知'
      },
      headers: {
        myWorkflows: '我的工作流',
        createNew: '新建工作流'
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
    }
  }
};
