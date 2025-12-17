
import React from 'react';
import { Tooltip } from 'antd';
import { Cloud, Server, HelpCircle } from 'lucide-react';

export type DeploymentMode = 'edge' | 'cloud' | 'hybrid';

interface DeploymentModeTagProps {
  mode: DeploymentMode;
}

export const DeploymentModeTag: React.FC<DeploymentModeTagProps> = ({ mode }) => {
  const config = {
    edge: {
      icon: <Server size={12} />,
      label: 'Edge Compute',
      desc: 'Processed locally on dedicated hardware. No data leaves your network.',
      color: 'text-brand bg-brand/5 border-brand/20',
    },
    cloud: {
      icon: <Cloud size={12} />,
      label: 'Cloud Runner',
      desc: 'Processed on VisionFlow Cloud. Scalable but requires internet connection.',
      color: 'text-info bg-info/5 border-info/20',
    },
    hybrid: {
      icon: <Server size={12} />,
      label: 'Hybrid',
      desc: 'Distributed processing between Edge and Cloud.',
      color: 'text-warning bg-warning/5 border-warning/20',
    },
  };

  const current = config[mode];

  return (
    <Tooltip title={current.desc} arrow={{ pointAtCenter: true }}>
      <div className={`
        inline-flex items-center gap-1.5 px-2 py-0.5 rounded-tag 
        border cursor-help transition-colors hover:bg-opacity-20
        ${current.color}
      `}>
        {current.icon}
        <span className="text-xs font-semibold">{current.label}</span>
      </div>
    </Tooltip>
  );
};
