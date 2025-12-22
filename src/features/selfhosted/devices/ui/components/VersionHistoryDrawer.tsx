
import React, { useState } from 'react';
import { Drawer, Timeline, Segmented, Button, Popconfirm, Tooltip, Empty } from 'antd';
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
  Info,
  Activity,
  Zap
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
      <div className="py-8">
        <Empty 
          image={Empty.PRESENTED_IMAGE_SIMPLE} 
          description={<span className="text-text-tertiary text-xs">{t('selfhosted.workflowDeployment.noSnapshot')}</span>} 
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5 py-1">
      {data.map((s, idx) => (
        <div 
          key={idx} 
          className="group flex flex-col p-2.5 rounded-card border border-divider bg-bg-page/20 hover:bg-bg-page/40 transition-all"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 min-w-0">
              <Video size={12} className="text-text-tertiary shrink-0" />
              <span className="text-[13px] font-bold text-text-primary truncate">{s.name}</span>
            </div>
            <VFTag variant="neutral" className="h-4 text-[8px] px-1 font-mono uppercase" filled={false}>
              {s.type}
            </VFTag>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 min-w-0">
              <Zap size={10} className="text-brand opacity-60 shrink-0" />
              <span className="text-[11px] text-text-secondary truncate font-medium">{s.workflow}</span>
              <span className="text-[10px] text-text-tertiary opacity-30 mx-0.5">•</span>
              <span className="text-[10px] text-text-tertiary font-mono">{s.version}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-text-tertiary whitespace-nowrap">
              <Activity size={9} className="opacity-40" />
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
    <div className="py-10 flex flex-col items-center justify-center bg-bg-page/20 rounded-card border border-dashed border-border/40">
      <FileCode size={28} className="text-text-tertiary opacity-20 mb-2" />
      <span className="text-[11px] text-text-tertiary">{t('selfhosted.workflowDeployment.loadingDiff')}</span>
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
      ${item.isCurrent ? 'bg-brand/[0.015] border-brand/20 shadow-sm' : 'bg-bg-card border-border hover:border-border-strong'}
    `}>
      <div 
        className="p-3 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="text-[14px] font-bold text-text-primary whitespace-nowrap font-mono tracking-tight">
              {item.version}
            </span>
            <VFTag 
              variant={item.isCurrent ? 'success' : (currentType.variant as any)} 
              filled={item.isCurrent} 
              className={`h-4.5 text-[9px] font-bold tracking-wider px-1.5`}
            >
              {item.isCurrent ? 'CURRENT' : currentType.label}
            </VFTag>
          </div>
          
          <div className="flex items-center gap-2 text-text-tertiary">
             {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
        </div>

        <p className={`text-[12px] text-text-secondary leading-normal mb-1.5 ${expanded ? '' : 'truncate'}`}>
          {item.description}
        </p>

        <div className="flex items-center gap-3 text-[10px] text-text-tertiary font-medium">
          <div className="flex items-center gap-1">
            <User size={10} className="opacity-40" />
            <span>{item.user}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={10} className="opacity-40" />
            <span>{item.timestamp}</span>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-3 pb-3 animate-in slide-in-from-top-1 duration-200">
          <div className="h-px bg-divider w-full mb-3 opacity-40" />
          
          <div className="flex items-center justify-between mb-3">
            <Segmented
              size="small"
              value={activeTab}
              onChange={(v) => setActiveTab(v as string)}
              options={[
                { 
                  label: <div className={`flex items-center gap-1 px-1 h-5 transition-colors ${activeTab === 'snapshot' ? 'text-brand' : 'text-text-tertiary'}`}><Box size={12} /><span>{t('selfhosted.workflowDeployment.snapshot')}</span></div>, 
                  value: 'snapshot' 
                },
                { 
                  label: <div className={`flex items-center gap-1 px-1 h-5 transition-colors ${activeTab === 'diff' ? 'text-brand' : 'text-text-tertiary'}`}><Diff size={12} /><span>{t('selfhosted.workflowDeployment.diff')}</span></div>, 
                  value: 'diff' 
                },
              ]}
              className="vf-history-segmented bg-bg-page/40 border border-border/40 p-0.5"
            />
          </div>

          <div className="min-h-[60px]">
            {activeTab === 'snapshot' ? (
              <SnapshotView data={item.streamsSnapshot} />
            ) : (
              <DiffView />
            )}
          </div>

          {isAdmin && !item.isCurrent && (
            <div className="flex justify-end mt-3 pt-2 border-t border-divider/30">
              <Popconfirm
                title={t('selfhosted.workflowDeployment.rollbackTitle', { version: item.version })}
                description={t('selfhosted.workflowDeployment.rollbackDesc')}
                onConfirm={() => onRollback(item)}
                okText={t('selfhosted.workflowDeployment.rollbackConfirm')}
                cancelText={t('common.cancel')}
                okButtonProps={{ danger: true, className: 'font-bold h-7 px-3 text-[11px]' }}
              >
                <Button 
                  danger 
                  type="link" 
                  size="small"
                  icon={<RotateCcw size={11} />} 
                  className="font-bold text-[11px] h-auto p-1 flex items-center gap-1 hover:bg-error/5 rounded-control transition-colors"
                >
                  {t('selfhosted.deviceDetail.workflow.rollback', { defaultValue: '回滚到此版本' })}
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
        <div className="flex items-center gap-2 text-text-primary">
          <History size={18} className="text-text-secondary" strokeWidth={2.5} />
          <span className="font-bold text-[15px]">{t('selfhosted.workflowDeployment.historyTitle')}</span>
        </div>
      }
      width={isMobile ? '100%' : 640}
      onClose={onClose}
      open={open}
      className="vf-drawer-custom"
      styles={{ body: { padding: '20px 24px' } }}
      destroyOnClose
    >
      <Timeline
        mode="left"
        className="vf-version-timeline"
        items={history.map(item => ({
          dot: (
            <div className={`
              w-3 h-3 rounded-full border-2 bg-bg-card flex items-center justify-center
              ${item.isCurrent ? 'border-brand shadow-[0_0_0_2px_rgba(var(--vf-brand),0.08)]' : 'border-border-strong'}
            `}>
              <div className={`w-1 h-1 rounded-full ${item.isCurrent ? 'bg-brand' : 'bg-text-tertiary opacity-30'}`} />
            </div>
          ),
          children: (
            <div className="mb-4 -mt-1.5">
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
          border-inline-start: 2px solid rgba(var(--vf-divider), 0.3) !important;
          inset-block-start: 10px !important;
          height: calc(100% - 10px) !important;
        }
        .vf-version-timeline .ant-timeline-item-head {
          background: transparent !important;
          padding: 0 !important;
        }
        .vf-drawer-custom .ant-drawer-header {
          border-bottom: 1px solid rgba(var(--vf-divider), var(--vf-divider-alpha));
          padding: 12px 20px !important;
        }
        
        /* 抽屉内 Segmented 专用修正：取消高亮背景覆盖 改用 Token 定义的柔和高亮 */
        .vf-history-segmented.ant-segmented .ant-segmented-item-selected {
          background-color: var(--vf-bg-card) !important;
          color: rgba(var(--vf-brand), 1) !important;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
        }
        
        .ant-segmented-item-label {
          padding: 0 2px !important;
          font-weight: 600 !important;
          font-size: 10px !important;
        }
      `}</style>
    </Drawer>
  );
};
