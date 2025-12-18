
import React from 'react';
import { Drawer, Timeline, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { History, RotateCcw } from 'lucide-react';
import { VFTag } from '../../../../../shared/ui/VFTag';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const VersionHistoryDrawer: React.FC<Props> = ({ open, onClose }) => {
  const { t } = useTranslation();

  const history = [
    { version: 'v12', type: 'Update', user: 'Admin', time: '2024-05-20 10:00', desc: 'Updated "Main Entrance" workflow to v2.4', current: true },
    { version: 'v11', type: 'Rollback', user: 'System', time: '2024-05-19 14:00', desc: 'Auto-rollback due to error spike in v10' },
    { version: 'v10', type: 'Update', user: 'John Doe', time: '2024-05-18 09:15', desc: 'Initial v2 implementation' },
    { version: 'v09', type: 'ConfigChange', user: 'Admin', time: '2024-05-15 16:30', desc: 'Changed telemetry to DIAGNOSTIC' },
  ];

  return (
    <Drawer
      title={t('selfhosted.deviceDetail.workflow.history')}
      width={400}
      onClose={onClose}
      open={open}
    >
      <Timeline
        mode="left"
        items={history.map(item => ({
          label: <span className="text-xs text-text-tertiary whitespace-nowrap">{item.time}</span>,
          children: (
            <div className="flex flex-col gap-2 pb-6">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-text-primary">{item.version}</span>
                <VFTag variant={item.current ? 'success' : 'neutral'} className="h-5 text-[10px]">
                   {item.current ? 'CURRENT' : item.type}
                </VFTag>
              </div>
              <p className="text-sm text-text-secondary m-0 leading-relaxed">{item.desc}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-text-tertiary">By {item.user}</span>
                {!item.current && (
                  <Button size="small" type="link" icon={<RotateCcw size={12} />} className="p-0 h-auto">
                    Rollback to this
                  </Button>
                )}
              </div>
            </div>
          )
        }))}
      />
    </Drawer>
  );
};
