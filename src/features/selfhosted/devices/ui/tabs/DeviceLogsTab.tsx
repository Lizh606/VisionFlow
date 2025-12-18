
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Empty } from 'antd';
import { ExternalLink, Terminal } from 'lucide-react';
import { Device } from '../../../common/types';
import { VFCard } from '../../../../../shared/ui/VFCard';

export const DeviceLogsTab: React.FC<{ device: Device }> = ({ device }) => {
  const { t } = useTranslation();

  return (
    <div className="p-12 flex flex-col items-center justify-center">
      <VFCard className="max-w-lg w-full">
        <Empty
          image={<Terminal size={48} className="text-text-tertiary mb-4 opacity-20 mx-auto" />}
          description={
            <div className="flex flex-col gap-2">
              <span className="text-base font-bold text-text-primary">Advanced Telemetry & Logs</span>
              <span className="text-sm text-text-secondary leading-relaxed">
                Detailed system logs and trace data are stored in VisionFlow Observability (SigNoz). 
                You can view raw telemetry for Device <code className="bg-bg-page px-1 rounded">{device.device_id}</code> there.
              </span>
            </div>
          }
        >
          <Button 
            type="primary" 
            icon={<ExternalLink size={16} />} 
            className="mt-4"
            onClick={() => window.open('https://signoz.io', '_blank')}
          >
            Launch Observability Shell
          </Button>
        </Empty>
      </VFCard>
    </div>
  );
};
