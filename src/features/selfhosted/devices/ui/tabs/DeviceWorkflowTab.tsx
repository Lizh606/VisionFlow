
import React, { useState, useMemo } from 'react';
import { Button, App, Input, Select } from 'antd';
import { Plus, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VFCard } from '../../../../../shared/ui/VFCard';
import { useWorkflowDeployment, Stream } from '../../hooks/useWorkflowDeployment';
import { CurrentConfigCard } from '../components/CurrentConfigCard';
import { StreamsTable } from '../components/StreamsTable';
import { VersionHistoryDrawer } from '../components/VersionHistoryDrawer';
import { StreamEditorDrawer } from '../components/StreamEditorDrawer';

export const DeviceWorkflowTab: React.FC<{ device: any; isAdmin?: boolean }> = ({ device, isAdmin: propIsAdmin }) => {
  const { t } = useTranslation();
  const { message, modal } = App.useApp();
  const { 
    isAdmin: hookIsAdmin, 
    streams, 
    setStreams, 
    history, 
    currentVersion 
  } = useWorkflowDeployment();

  const isAdmin = propIsAdmin !== undefined ? propIsAdmin : hookIsAdmin;

  const [historyOpen, setHistoryOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingStream, setEditingStream] = useState<Stream | null>(null);

  // Filters State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredStreams = useMemo(() => {
    return streams.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || s.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [streams, search, statusFilter]);

  const handleAddStream = () => {
    setEditingStream(null);
    setEditorOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* 1. Active Configuration Banner */}
      <CurrentConfigCard 
        version={currentVersion} 
        onViewHistory={() => setHistoryOpen(true)} 
      />

      {/* 2. Streams Table Card - Adaptive height */}
      <VFCard 
        title={t('selfhosted.workflowDeployment.title')}
        noPadding
      >
        <div className="flex flex-col">
          {/* Professional Filters Bar */}
          <div className="px-6 py-3 flex flex-wrap items-center justify-between gap-4 border-b border-divider bg-bg-page/10">
            <div className="flex items-center gap-3">
              <Input 
                prefix={<Search size={14} className="text-text-tertiary" />}
                placeholder="搜索名称或 ID..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-72 h-9 rounded-control"
                allowClear
              />
              <Select 
                placeholder="状态"
                value={statusFilter}
                onChange={setStatusFilter}
                className="w-36 h-9"
                options={[
                  { label: t('common.allStatus'), value: 'ALL' },
                  { label: '运行中', value: 'RUNNING' },
                  { label: '已暂停', value: 'PAUSED' },
                ]}
              />
            </div>
            
            {/* Action Area: Button replaces Total Count */}
            <div className="flex items-center">
              {isAdmin && (
                <Button 
                  type="primary" 
                  icon={<Plus size={16} />} 
                  onClick={handleAddStream}
                  className="font-bold rounded-control h-9 px-4 flex items-center gap-1.5"
                >
                  {t('selfhosted.workflowDeployment.addStream')}
                </Button>
              )}
            </div>
          </div>

          {/* Table Area */}
          <StreamsTable 
            data={filteredStreams}
            isAdmin={isAdmin}
            onEdit={(s) => { setEditingStream(s); setEditorOpen(true); }}
            onDelete={(s) => {
              modal.confirm({
                title: '删除 Stream',
                content: `确认从设备部署中移除 "${s.name}"?`,
                okText: '确认删除',
                okType: 'danger',
                onOk: () => setStreams(prev => prev.filter(x => x.id !== s.id))
              });
            }}
            onToggleStatus={(s) => {
              setStreams(prev => prev.map(x => x.id === s.id ? { ...x, status: x.status === 'RUNNING' ? 'PAUSED' : 'RUNNING' } : x));
              message.success('状态已更新');
            }}
          />
        </div>
      </VFCard>

      {/* Auxiliary Components */}
      <VersionHistoryDrawer 
        open={historyOpen} 
        onClose={() => setHistoryOpen(false)}
        history={history}
        isAdmin={isAdmin}
        onRollback={() => {}}
      />

      <StreamEditorDrawer 
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        onSave={() => setEditorOpen(false)}
        initialValues={editingStream}
      />
    </div>
  );
};
