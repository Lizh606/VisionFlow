
import React from 'react';
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { Cloud, Server } from 'lucide-react';
import { DeploymentMode } from '../common/types';
import { VFTag } from '../../../shared/ui/VFTag';

interface Props {
  mode: DeploymentMode;
}

export const DeploymentModeTag: React.FC<Props> = ({ mode }) => {
  const { t } = useTranslation();

  const config = {
    EDGE: {
      icon: <Server size={12} />,
      label: t('selfhosted.mode.edge'),
      desc: t('selfhosted.mode.edgeDesc'),
      variant: 'teal' as const, // ✅ 统一使用 Teal
    },
    CLOUD: {
      icon: <Cloud size={12} />,
      label: t('selfhosted.mode.cloud'),
      desc: t('selfhosted.mode.cloudDesc'),
      variant: 'info' as const, // ✅ 切换为 Blue (info)
    },
  };

  const current = config[mode] || config.EDGE;

  return (
    <Tooltip title={current.desc}>
      <span className="inline-block">
        <VFTag 
          variant={current.variant} 
          filled={false} 
          icon={current.icon}
          className="font-mono tracking-tight"
        >
          {mode}
        </VFTag>
      </span>
    </Tooltip>
  );
};
