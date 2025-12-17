
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
      variant: 'teal' as const, 
    },
    CLOUD: {
      icon: <Cloud size={12} />,
      label: t('selfhosted.mode.cloud'),
      desc: t('selfhosted.mode.cloudDesc'),
      variant: 'brand' as const,
    },
  };

  const current = config[mode] || config.EDGE;

  return (
    <Tooltip title={current.desc}>
      {/* Wrapper needed because Tooltip needs a single child ref */}
      <span className="inline-block">
        <VFTag 
          variant={current.variant} 
          filled={false} 
          icon={current.icon}
          className="font-mono tracking-tight"
        >
          {mode} {/* Keep the label brief (ENUM value) in the tag, description is in tooltip */}
        </VFTag>
      </span>
    </Tooltip>
  );
};