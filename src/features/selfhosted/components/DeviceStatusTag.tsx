
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
   * V1.4 状态语义映射更新:
   * - ONLINE: Success
   * - PENDING: Warning
   * - OFFLINE: Warning (从 Neutral 变更为 Warning，提示需要关注)
   * - ERROR: Error
   * - DRAINING: Info
   * - DECOMMISSIONED: Neutral
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
      minWidth={84} // 状态列统一占位 84px
    >
      {showText && current.label}
    </VFTag>
  );
};
