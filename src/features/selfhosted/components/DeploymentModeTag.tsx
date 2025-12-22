
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
      icon: <Server />,
      desc: t('selfhosted.mode.edgeDesc'),
      variant: 'teal' as const,
    },
    CLOUD: {
      icon: <Cloud />,
      desc: t('selfhosted.mode.cloudDesc'),
      variant: 'info' as const,
    },
  };

  const current = config[mode] || config.EDGE;

  return (
    <Tooltip title={current.desc}>
      <span className="inline-block">
        <VFTag 
          variant={current.variant} 
          icon={current.icon}
          minWidth={72} // 模式列统一占位 72px
        >
          {mode}
        </VFTag>
      </span>
    </Tooltip>
  );
};
