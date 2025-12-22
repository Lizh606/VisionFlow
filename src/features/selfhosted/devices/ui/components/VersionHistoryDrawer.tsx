
import React, { useState } from 'react';
import { Drawer, Timeline, Segmented, Button, Popconfirm, Empty } from 'antd';
import { useTranslation } from 'react-i18next';
import { 
  History, 
  RotateCcw, 
  Box, 
  Diff, 
  User, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Video,
  FileCode,
  Activity,
  Zap,
  X
} from 'lucide-react';
import { VFTag } from '../../../../../shared/ui/VFTag';
import { VersionHistory, Stream } from '../../hooks/useWorkflowDeployment';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';

interface Props {
  open: boolean;
  onClose: () => void;
  history: VersionHistory[];
  isAdmin: boolean;
  onRollback: (ver: VersionHistory) => void;
}

const SnapshotView: React.FC<{ data: Partial<Stream>[] }> = ({ data }) => {
  const { t } = useTranslation();
  
  if (!data || data.length === 0) {
    return (
      <div className="py-8 text-center">
        <Empty 
          image={Empty.PRESENTED_IMAGE_SIMPLE} 
          description={<span className="text-text-tertiary text-xs">{t('selfhosted.workflowDeployment.noSnapshot')}</span>} 
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 py-1">
      {data.map((s, idx) => (
        <div 
          key={idx} 
          className="group flex flex-col p-3 rounded-card border border-divider bg-bg-page/20 hover:bg-bg-page/40 transition-all"
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2 min-w-0">
              <Video size={14} className="text-text-tertiary shrink-0" />
              <span className="text-sm font-semibold text-text-primary truncate">{s.name}</span>
            </div>
            <VFTag variant="neutral" className="h-5 text-xs font-mono uppercase" filled={false}>
              {s.type}
            </VFTag>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <Zap size={12} className="text-brand opacity-60 shrink-0" />
              <span className="text-xs text-text-secondary truncate font-medium">{s.workflow}</span>
              <span className="text-xs text-text-tertiary font-mono opacity-40">{s.version}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-text-tertiary whitespace-nowrap">
              <Activity size={10} className="opacity-40" />
              <span className="opacity-60">{s.telemetry}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const DiffView: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="py-12 flex flex-col items-center justify-center bg-bg-page/20 rounded-card border border-dashed border-border/40">
      <FileCode size={32} className="text-text-tertiary opacity-20 mb-3" />
      <span className="text-xs text-text-tertiary font-medium">{t('selfhosted.workflowDeployment.loadingDiff')}</span>
    </div>
  );
};

const HistoryCard: React.FC<{ 
  item: VersionHistory; 
  isAdmin: boolean; 
  onRollback: (ver: VersionHistory) => void;
}> = ({ item, isAdmin, onRollback }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('snapshot');

  const typeConfig = {
    INITIAL: { variant: 'neutral', label: 'INITIAL' },
    UPDATE: { variant: 'brand', label: 'UPDATE' },
    ROLLBACK: { variant: 'warning', label: 'ROLLBACK' },
  };

  const currentType = typeConfig[item.type as keyof typeof typeConfig] || typeConfig.UPDATE;

  return (
    <div className={`
      relative flex flex-col w-full rounded-card border transition-all duration-300
      ${item.isCurrent ? 'bg-brand/[0.01] border-brand/30 shadow-sm' : 'bg-bg-card border-border hover:border-border-strong'}
    `}>
      <div 
        className="p-4 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="text-sm font-bold text-text-primary whitespace-nowrap font-mono tracking-tight bg-bg-page px-1.5 py-0.5 rounded border border-border">
              {item.version}
            </span>
            <VFTag 
              variant={item.isCurrent ? 'success' : (currentType.variant as any)} 
              filled={item.isCurrent} 
              className="h-5 text-xs font-bold tracking-wider px-2"
            >
              {item.isCurrent ? 'CURRENT' : currentType.label}
            </VFTag>
          </div>
          
          <div className="flex items-center text-text-tertiary">
             {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>

        <p className={`text-sm text-text-secondary leading-relaxed mb-3 ${expanded ? '' : 'line-clamp-1'}`}>
          {item.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-text-tertiary font-medium">
          <div className="flex items-center gap-1.5">
            <User size={12} className="opacity-50" />
            <span>{item.user}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="opacity-50" />
            <span>{item.timestamp}</span>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 animate-in slide-in-from-top-1 duration-200">
          <div className="h-px bg-divider w-full mb-4 opacity-40" />
          
          <div className="mb-4">
            <Segmented
              size="small"
              value={activeTab}
              onChange={(v) => setActiveTab(v as string)}
              options={[
                { 
                  label: <div className="flex items-center gap-1.5 px-2 py-1"><Box size={14} /><span>{t('selfhosted.workflowDeployment.snapshot')}</span></div>, 
                  value: 'snapshot' 
                },
                { 
                  label: <div className="flex items-center gap-1.5 px-2 py-1"><Diff size={14} /><span>{t('selfhosted.workflowDeployment.diff')}</span></div>, 
                  value: 'diff' 
                },
              ]}
              className="vf-history-segmented bg-bg-page/50 p-1 border border-border/20"
            />
          </div>

          <div className="min-h-[100px]">
            {activeTab === 'snapshot' ? (
              <SnapshotView data={item.streamsSnapshot} />
            ) : (
              <DiffView />
            )}
          </div>

          {isAdmin && !item.isCurrent && (
            <div className="flex justify-end mt-4 pt-3 border-t border-divider/30">
              <Popconfirm
                title={t('selfhosted.workflowDeployment.rollbackTitle', { version: item.version })}
                description={t('selfhosted.workflowDeployment.rollbackDesc')}
                onConfirm={() => onRollback(item)}
                okText={t('selfhosted.workflowDeployment.rollbackConfirm')}
                cancelText={t('common.cancel')}
                okButtonProps={{ danger: true, className: 'font-bold h-9 px-4' }}
              >
                <Button 
                  danger 
                  type="link" 
                  size="small"
                  icon={<RotateCcw size={14} />} 
                  className="font-bold text-xs h-auto p-1 flex items-center gap-1.5 hover:bg-error/5 rounded-control transition-colors"
                >
                  {t('selfhosted.deviceDetail.workflow.rollback')}
                </Button>
              </Popconfirm>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const VersionHistoryDrawer: React.FC<Props> = ({ open, onClose, history, isAdmin, onRollback }) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();

  return (
    <Drawer
      title={
        <div className="flex items-center gap-3 text-text-primary">
          <History size={20} className="text-brand" strokeWidth={2.5} />
          <span className="font-bold text-base">{t('selfhosted.workflowDeployment.historyTitle')}</span>
        </div>
      }
      width={isMobile ? '100%' : 560}
      onClose={onClose}
      open={open}
      className="vf-drawer-custom"
      styles={{ body: { padding: '24px' } }}
      destroyOnClose
      closeIcon={<X size={20} className="text-text-tertiary" />}
    >
      <Timeline
        mode="left"
        className="vf-version-timeline px-1"
        items={history.map(item => ({
          dot: (
            <div className={`
              w-3.5 h-3.5 rounded-full border-2 bg-bg-card flex items-center justify-center transition-all
              ${item.isCurrent ? 'border-brand shadow-[0_0_0_3px_rgba(var(--vf-brand),0.1)]' : 'border-border-strong'}
            `}>
              <div className={`w-1.5 h-1.5 rounded-full ${item.isCurrent ? 'bg-brand' : 'bg-text-tertiary opacity-30'}`} />
            </div>
          ),
          children: (
            <div className="mb-6 -mt-1.5">
              <HistoryCard 
                item={item} 
                isAdmin={isAdmin} 
                onRollback={onRollback} 
              />
            </div>
          )
        }))}
      />

      <style>{`
        .vf-version-timeline .ant-timeline-item-tail {
          border-inline-start: 2px solid rgba(var(--vf-divider), 0.5) !important;
          inset-block-start: 14px !important;
        }
        .vf-version-timeline .ant-timeline-item-head {
          background: transparent !important;
          padding: 0 !important;
        }
      `}</style>
    </Drawer>
  );
};
