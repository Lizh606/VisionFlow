
import React from 'react';
import { useTranslation } from 'react-i18next';

export type DeviceStatus = 'online' | 'offline' | 'maintenance' | 'error';

interface DeviceStatusTagProps {
  status: DeviceStatus;
  showText?: boolean;
}

export const DeviceStatusTag: React.FC<DeviceStatusTagProps> = ({ status, showText = true }) => {
  const { t } = useTranslation();
  
  const config = {
    online: {
      bg: 'bg-success/10',
      text: 'text-success',
      dot: 'bg-success',
      label: t('selfhosted.status.online'),
    },
    offline: {
      bg: 'bg-text-disabled/10',
      text: 'text-text-tertiary',
      dot: 'bg-text-disabled',
      label: t('selfhosted.status.offline'),
    },
    maintenance: {
      bg: 'bg-warning/10',
      text: 'text-warning',
      dot: 'bg-warning',
      label: t('selfhosted.status.maintenance'),
    },
    error: {
      bg: 'bg-error/10',
      text: 'text-error',
      dot: 'bg-error',
      label: t('selfhosted.status.error'),
    },
  };

  const current = config[status];

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-tag ${current.bg} border border-transparent`}>
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
      {showText && (
        <span className={`text-xs font-medium ${current.text}`}>
          {current.label}
        </span>
      )}
    </div>
  );
};
