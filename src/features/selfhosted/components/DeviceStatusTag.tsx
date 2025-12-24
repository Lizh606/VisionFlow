
import React from 'react';
import { useTranslation } from 'react-i18next';
import { VFTag } from '../../../shared/ui/VFTag';
import { DeviceStatus } from '../common/types';
import { Activity, Power, AlertCircle, Clock, Archive } from 'lucide-react';

interface Props {
  status: DeviceStatus;
  showText?: boolean;
}

export const DeviceStatusTag: React.FC<Props> = ({ status, showText = true }) => {
  const { t } = useTranslation();

  /**
   * V1.4 状态语义映射更新 (严格对齐自托管管理逻辑):
   * - ONLINE: Success - 绿色
   * - PENDING_LICENSE: Warning - 橙色 (原 License Required 标签语义)
   * - OFFLINE: Warning - 橙色 (离线作为告警项)
   * - ERROR: Error - 红色
   * - DRAINING: Info - 蓝色 (排空中，非紧急)
   * - DECOMMISSIONED: Neutral - 灰色 (已失效/归档)
   */
  const config = {
    ONLINE: {
      variant: 'success' as const,
      label: t('selfhosted.status.online'),
      icon: <Activity />
    },
    OFFLINE: {
      variant: 'warning' as const, 
      label: t('selfhosted.status.offline'),
      icon: <Power />
    },
    ERROR: {
      variant: 'error' as const,
      label: t('selfhosted.status.error'),
      icon: <AlertCircle />
    },
    PENDING_LICENSE: {
      variant: 'warning' as const,
      label: t('selfhosted.status.pending'),
      icon: <Clock />
    },
    DRAINING: {
      variant: 'info' as const,
      label: t('selfhosted.status.maintenance'),
      icon: <Activity />
    },
    DECOMMISSIONED: {
      variant: 'neutral' as const,
      label: t('selfhosted.status.decommissioned'),
      icon: <Archive />
    }
  };

  const current = config[status] || config.OFFLINE;

  return (
    <VFTag 
      variant={current.variant} 
      icon={current.icon}
      minWidth={110} // 宽度自适应新标签长度
    >
      {showText && current.label}
    </VFTag>
  );
};
