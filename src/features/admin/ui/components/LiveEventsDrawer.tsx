
import React from 'react';
import { List, Button, Popconfirm } from 'antd';
import { Radio, Trash2, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFDrawer } from '../../../../ui/VFDrawer';
import { VFText } from '../../../../ui/VFText';
import { AdminEvent } from '../../hooks/useSSEStream';
import dayjs from 'dayjs';

interface Props {
  open: boolean;
  onClose: () => void;
  events: AdminEvent[];
  status: 'connected' | 'reconnecting' | 'disconnected';
  onClear: () => void;
}

export const LiveEventsDrawer: React.FC<Props> = ({ open, onClose, events, status, onClear }) => {
  const { t } = useTranslation();
  
  const statusConfig = {
    connected: { color: 'success', text: t('admin.overview.liveEventsDrawer.statusConnected'), ping: true },
    reconnecting: { color: 'warning', text: t('admin.overview.liveEventsDrawer.statusReconnecting'), ping: false },
    disconnected: { color: 'error', text: t('admin.overview.liveEventsDrawer.statusDisconnected'), ping: false }
  }[status];

  return (
    <VFDrawer
      title={t('admin.overview.liveEventsDrawer.title')}
      subtitle={t('admin.overview.liveEventsDrawer.subtitle')}
      open={open}
      onClose={onClose}
      size="S"
      footer={
        <div className="flex items-center justify-between w-full">
           <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                {statusConfig.ping && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-2 w-2 bg-${statusConfig.color}`}></span>
              </span>
              <VFText variant="t6" color={statusConfig.color as any} className="font-bold uppercase tracking-tight">
                {statusConfig.text}
              </VFText>
           </div>
           
           <Popconfirm
             title={t('admin.overview.liveEventsDrawer.clearConfirmTitle')}
             description={t('admin.overview.liveEventsDrawer.clearConfirmDesc')}
             onConfirm={onClear}
             okText={t('common.confirm')}
             cancelText={t('common.cancel')}
             placement="topRight"
             okButtonProps={{ danger: true }}
           >
             <Button 
               type="text" 
               size="small" 
               icon={<Trash2 size={14} />}
               className="text-[11px] font-bold uppercase tracking-widest text-text-tertiary hover:text-error flex items-center gap-1.5"
             >
               {t('admin.overview.liveEventsDrawer.clearStream')}
             </Button>
           </Popconfirm>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        {events.length === 0 ? (
          <div className="py-20 text-center opacity-30 flex flex-col items-center">
            <Radio size={40} strokeWidth={1} className="mb-4" />
            <VFText variant="t6" color="tertiary" className="font-bold uppercase tracking-widest">{t('admin.overview.liveEventsDrawer.listening')}</VFText>
          </div>
        ) : (
          <List
            dataSource={events}
            split={false}
            renderItem={(item) => (
              <div className="mb-3 p-4 bg-bg-card border border-divider rounded-card hover:border-brand/40 transition-all cursor-pointer group">
                <div className="flex items-start justify-between gap-3 mb-2">
                   <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-${item.type === 'error' ? 'error' : item.type === 'warning' ? 'warning' : 'info'}`} />
                      <VFText variant="t6" color="tertiary" className="font-bold uppercase tracking-tighter">{item.domain}</VFText>
                   </div>
                   <VFText variant="t7" color="disabled" tabularNums>{dayjs(item.time).format('HH:mm:ss')}</VFText>
                </div>
                <VFText variant="t5" color="primary" className="font-medium leading-relaxed block group-hover:text-brand transition-colors">
                  {item.message}
                </VFText>
              </div>
            )}
          />
        )}
      </div>
    </VFDrawer>
  );
};
