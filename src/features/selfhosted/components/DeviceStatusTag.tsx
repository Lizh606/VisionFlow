
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

  // Logic: 
  // - High Priority (Online/Offline/Error) -> Filled -> Fast Scan
  // - Low Priority (Pending/Draining/Decomm) -> Soft -> Less Visual Noise
  const config = {
    ONLINE: {
      variant: 'success' as const,
      filled: true,
      label: t('selfhosted.status.online'),
      icon: <Activity size={12} strokeWidth={3} /> // Subtle icon for accessibility
    },
    OFFLINE: {
      variant: 'error' as const,
      filled: true,
      label: t('selfhosted.status.offline'),
      icon: <Power size={12} strokeWidth={3} />
    },
    ERROR: {
      variant: 'error' as const,
      filled: true,
      label: t('selfhosted.status.error'),
      icon: <AlertCircle size={12} strokeWidth={3} />
    },
    PENDING_LICENSE: {
      variant: 'warning' as const,
      filled: false, // Soft style to avoid alarming the user too much
      label: t('selfhosted.status.pending'),
      icon: <Clock size={12} />
    },
    DRAINING: {
      variant: 'info' as const,
      filled: false,
      label: t('selfhosted.status.maintenance'),
      icon: <Activity size={12} className="opacity-50" />
    },
    DECOMMISSIONED: {
      variant: 'neutral' as const,
      filled: false, // Grey soft style
      label: t('selfhosted.status.decommissioned'),
      icon: <Archive size={12} />
    }
  };

  const current = config[status] || config.OFFLINE;

  return (
    <VFTag 
      variant={current.variant} 
      filled={current.filled} 
      icon={current.icon}
    >
      {showText && current.label}
    </VFTag>
  );
};
