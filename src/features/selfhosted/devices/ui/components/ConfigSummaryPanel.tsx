
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Skeleton, Button } from 'antd';
import { Video, Inbox, ShieldAlert } from 'lucide-react';
import { VFCard } from '../../../../../shared/ui/VFCard';
import { VFTag } from '../../../../../shared/ui/VFTag';
import { Device } from '../../../common/types';

interface Props {
  device: Device;
  loading?: boolean;
}

export const ConfigSummaryPanel: React.FC<Props> = ({ device, loading = false }) => {
  const { t } = useTranslation();
  const isUnbound = device.status === 'PENDING_LICENSE';

  const activeStreams = isUnbound ? [] : [
    { id: 's1', name: 'Main Entrance RTSP', workflow: 'Crowd Analysis v2', status: 'RUNNING' },
    { id: 's2', name: 'Loading Dock 04', workflow: 'PPE Check v1.5', status: 'RUNNING' },
    { id: 's3', name: 'Security Corridor', workflow: 'Intrusion Detection v3', status: 'DISABLED' },
  ];

  return (
    <VFCard 
      title={t('selfhosted.deviceDetail.summary.configTitle')}
      noPadding
      className="h-full"
    >
      <div className="flex flex-col h-full">
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-3 items-center">
                <Skeleton.Avatar active size="small" shape="square" />
                <Skeleton active title={false} paragraph={{ rows: 1, width: '80%' }} />
              </div>
            ))}
          </div>
        ) : isUnbound ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center text-warning mb-4">
              <ShieldAlert size={24} />
            </div>
            <h4 className="text-sm font-bold text-text-primary mb-1">
              {t('selfhosted.deviceDetail.summary.awaitingLicense')}
            </h4>
            <p className="text-xs text-text-tertiary max-w-[200px] leading-relaxed mb-4">
              {t('selfhosted.deviceDetail.summary.noConfigDesc')}
            </p>
            <Button type="link" size="small" className="text-brand font-bold p-0 text-xs">
              {t('selfhosted.actions.bind')}
            </Button>
          </div>
        ) : activeStreams.length > 0 ? (
          <div className="flex flex-col">
            {activeStreams.map((stream, idx) => (
              <div 
                key={stream.id} 
                className={`
                  px-6 py-4 flex items-center justify-between hover:bg-action-hover transition-colors cursor-pointer group
                  ${idx !== activeStreams.length - 1 ? 'border-b border-border' : ''}
                `}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-control bg-bg-page border border-border/40 flex items-center justify-center text-text-tertiary shrink-0 group-hover:bg-brand/5 group-hover:text-brand transition-colors">
                    <Video size={16} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="text-sm font-semibold text-text-primary truncate leading-tight mb-0.5">{stream.name}</div>
                    <div className="text-xs text-text-tertiary truncate flex items-center gap-1.5">
                      <span className="opacity-80">{stream.workflow}</span>
                      <span className="opacity-40">•</span>
                      <span className="font-mono text-xs">{stream.id}</span>
                    </div>
                  </div>
                </div>
                <VFTag 
                  variant={stream.status === 'RUNNING' ? 'success' : 'neutral'} 
                  filled={stream.status === 'RUNNING'}
                  className="scale-90"
                >
                  {stream.status}
                </VFTag>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-text-tertiary/40">
             <Inbox size={32} strokeWidth={1} className="mb-2" />
             <span className="text-xs font-medium">{t('common.noData')}</span>
          </div>
        )}
        {!isUnbound && <div className="flex-1 min-h-[40px]" />}
      </div>
    </VFCard>
  );
};
