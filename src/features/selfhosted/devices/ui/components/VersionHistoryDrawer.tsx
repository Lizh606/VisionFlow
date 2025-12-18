
import React, { useState } from 'react';
import { Drawer, Timeline, Segmented, Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { History, RotateCcw, Box, Diff, User, Calendar, CheckCircle2 } from 'lucide-react';
import { VFTag } from '../../../../../shared/ui/VFTag';
import { VersionHistory } from '../../hooks/useWorkflowDeployment';

interface Props {
  open: boolean;
  onClose: () => void;
  history: VersionHistory[];
  isAdmin: boolean;
  onRollback: (ver: VersionHistory) => void;
}

export const VersionHistoryDrawer: React.FC<Props> = ({ open, onClose, history, isAdmin, onRollback }) => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<string>('snapshot');

  const renderVersionContent = (item: VersionHistory) => (
    <div className={`p-4 rounded-card border transition-all ${item.isCurrent ? 'bg-brand/5 border-brand/20 ring-1 ring-brand/10' : 'bg-bg-page/40 border-border hover:border-border-strong'}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-text-primary text-base">{item.version}</span>
          <VFTag variant={item.isCurrent ? 'success' : 'neutral'} className="h-5 text-[10px]">
            {item.isCurrent ? 'CURRENT' : item.type}
          </VFTag>
        </div>
        {isAdmin && !item.isCurrent && (
          <Popconfirm
            title={t('selfhosted.workflowDeployment.rollbackTitle', { version: item.version })}
            description={t('selfhosted.workflowDeployment.rollbackDesc')}
            onConfirm={() => onRollback(item)}
            okText={t('selfhosted.workflowDeployment.rollbackConfirm')}
            cancelText={t('common.cancel')}
          >
            <Button size="small" type="link" icon={<RotateCcw size={12} />} className="p-0 h-auto font-bold text-error">
              {t('selfhosted.deviceDetail.workflow.rollback')}
            </Button>
          </Popconfirm>
        )}
        {item.isCurrent && <CheckCircle2 size={16} className="text-success" />}
      </div>

      <p className="text-sm text-text-secondary mb-4 leading-relaxed">{item.description}</p>
      
      <div className="flex items-center gap-4 text-[11px] text-text-tertiary mb-4">
        <span className="flex items-center gap-1"><User size={12} /> {item.user}</span>
        <span className="flex items-center gap-1"><Calendar size={12} /> {item.timestamp}</span>
      </div>

      {/* Snapshot / Diff Area */}
      <div className="bg-bg-card rounded-control border border-divider p-3">
        <div className="flex items-center justify-between mb-3">
          <Segmented
            size="small"
            value={viewMode}
            onChange={setViewMode}
            options={[
              { label: t('selfhosted.workflowDeployment.snapshot'), value: 'snapshot', icon: <Box size={12} /> },
              { label: t('selfhosted.workflowDeployment.diff'), value: 'diff', icon: <Diff size={12} /> },
            ]}
            className="bg-bg-page border border-border"
          />
        </div>

        {viewMode === 'snapshot' ? (
          <div className="flex flex-col gap-2">
            {item.streamsSnapshot.map((s, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-divider last:border-0">
                <span className="font-semibold text-text-primary truncate max-w-[120px]">{s.name}</span>
                <VFTag variant="brand" className="h-4 text-[9px] px-1">{s.version}</VFTag>
              </div>
            ))}
            {item.streamsSnapshot.length === 0 && <span className="text-text-tertiary text-xs italic">{t('selfhosted.workflowDeployment.noSnapshot')}</span>}
          </div>
        ) : (
          <div className="text-xs text-text-tertiary italic p-4 text-center">
            {t('selfhosted.workflowDeployment.loadingDiff')}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Drawer
      title={<div className="flex items-center gap-2"><History size={18} /> {t('selfhosted.workflowDeployment.historyTitle')}</div>}
      width={480}
      onClose={onClose}
      open={open}
      className="vf-drawer-custom"
    >
      <Timeline
        mode="left"
        items={history.map(item => ({
          label: null,
          children: renderVersionContent(item),
          color: item.isCurrent ? 'var(--vf-brand)' : 'var(--vf-border-strong)'
        }))}
      />
      <style>{`
        .vf-drawer-custom .ant-timeline-item-tail { border-inline-start: 2px solid rgb(var(--vf-divider) / 0.5) !important; }
        .vf-drawer-custom .ant-timeline-item-head { background: var(--vf-bg-card) !important; border-width: 2px !important; }
      `}</style>
    </Drawer>
  );
};
