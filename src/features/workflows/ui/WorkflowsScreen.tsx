
import React, { useState } from 'react';
import { App, Button, Skeleton, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { LayoutGrid, Search, Settings2, Plus, ArrowLeft } from 'lucide-react';

import { WorkflowsPageHeader } from '../components/WorkflowsPageHeader';
import { WorkflowsToolbar } from '../components/WorkflowsToolbar';
import { WorkflowsTable } from '../components/WorkflowsTable';
import { WorkflowsGrid } from '../components/WorkflowsGrid';
import { FolderGrid } from '../components/FolderGrid';
import { CreateFolderModal } from '../components/CreateFolderModal';
import { WorkflowTemplateModal } from '../components/WorkflowTemplateModal';
import { VFEmptyState } from '../../../shared/ui/VFEmptyState';
import { useWorkflows, WorkflowsScenario } from '../hooks/useWorkflows';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import { VFText } from '../../../ui/VFText';

export const WorkflowsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { isMobile } = useResponsive();
  const {
    items,
    loading,
    total,
    page,
    setPage,
    pageSize,
    setPageSize,
    search,
    setSearch,
    viewMode,
    setViewMode,
    toggleFavorite,
    toggleSelect,
    folders,
    activeFolderId,
    setActiveFolderId,
    activeFolder,
    addFolder,
    scenario,
    setScenario
  } = useWorkflows();

  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [templateModalState, setTemplateModalState] = useState<{ open: boolean; mode: 'explore' | 'create' }>({
    open: false,
    mode: 'create'
  });

  const handlePageChange = (p: number, ps: number) => {
    setPage(p);
    setPageSize(ps);
  };

  const openTemplateModal = (mode: 'explore' | 'create') => {
    setTemplateModalState({ open: true, mode });
  };

  const handleCreateWorkflow = (templateId: string, config: any) => {
    message.success(`Workflow created successfully with template: ${templateId}`);
    setTemplateModalState(prev => ({ ...prev, open: false }));
  };

  // V1.4: 精细化的空态渲染策略
  const renderEmptyState = () => {
    // 1. 搜索无匹配结果
    if (search && items.length === 0) {
      return (
        <div className="bg-bg-card rounded-card border border-border p-12 shadow-sm">
          <VFEmptyState 
            icon={<Search size={24} />}
            title={t('marketplace.library.empty.noMatch')}
            description={`No workflows found matching "${search}". Try adjusting your keywords.`}
            actionLabel={t('marketplace.filters.reset')}
            onAction={() => setSearch('')}
          />
        </div>
      );
    }

    // 2. 文件夹内无数据
    if (activeFolderId && items.length === 0) {
      return (
        <div className="bg-bg-card rounded-card border border-border p-12 shadow-sm">
          <VFEmptyState 
            icon={<LayoutGrid size={24} />}
            title={t('workflows.empty.folder')}
            description={t('workflows.empty.folderDesc')}
            actionLabel={t('workflows.actions.create')}
            onAction={() => openTemplateModal('create')}
          />
        </div>
      );
    }

    // 3. 全局无数据
    return (
      <div className="bg-bg-card rounded-card border border-border p-12 shadow-sm">
        <VFEmptyState 
          icon={<LayoutGrid size={24} className="text-brand" />}
          title={t('workflows.empty.global')}
          description={t('workflows.empty.globalDesc')}
          actionLabel={t('workflows.actions.create')}
          onAction={() => openTemplateModal('create')}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6 pb-20 w-full animate-in fade-in duration-500">
      
      <WorkflowsPageHeader 
        title={t('menu.workflows')} 
        folderName={activeFolder?.name}
        onBack={activeFolderId ? () => setActiveFolderId(null) : undefined}
      />
      
      <div className="bg-bg-card p-4 rounded-card border border-border shadow-sm">
        <WorkflowsToolbar 
          search={search}
          onSearchChange={setSearch}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onNewFolder={() => setIsFolderModalOpen(true)}
          onExploreTemplates={() => openTemplateModal('explore')}
          onCreateWorkflow={() => openTemplateModal('create')}
        />
      </div>

      {!activeFolderId && !search && folders.length > 0 && scenario === 'DEFAULT' && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-1">
            <VFText variant="t6" color="tertiary" className="uppercase font-bold tracking-widest">
              {t('menu.folders', { defaultValue: 'Folders' })}
            </VFText>
            <div className="h-px flex-1 bg-divider opacity-60" />
          </div>
          <FolderGrid 
            folders={folders} 
            onFolderClick={setActiveFolderId} 
          />
        </div>
      )}

      <div className="min-h-[400px]">
        {loading ? (
          <div className="flex flex-col gap-4">
             {viewMode === 'list' ? (
               <Skeleton active paragraph={{ rows: 8 }} className="bg-bg-card p-6 rounded-card border border-border" />
             ) : (
               <Row gutter={[20, 20]}>
                 {[1, 2, 3, 4].map(i => (
                   <Col xs={24} sm={12} xl={6} key={i}>
                     <div className="h-60 bg-bg-card rounded-card border border-divider p-4 animate-pulse" />
                   </Col>
                 ))}
               </Row>
             )}
          </div>
        ) : items.length > 0 ? (
          viewMode === 'list' ? (
            <WorkflowsTable 
              data={items} 
              loading={loading} 
              total={total}
              page={page}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <WorkflowsGrid 
                data={items} 
                onToggleFavorite={toggleFavorite}
                onToggleSelect={toggleSelect}
              />
            </div>
          )
        ) : (
          renderEmptyState()
        )}
      </div>

      {/* Modals */}
      <CreateFolderModal 
        open={isFolderModalOpen} 
        onCancel={() => setIsFolderModalOpen(false)}
        onCreate={(name) => {
          addFolder(name);
          setIsFolderModalOpen(false);
          message.success('Folder created');
        }}
      />

      <WorkflowTemplateModal 
        open={templateModalState.open}
        onCancel={() => setTemplateModalState(prev => ({ ...prev, open: false }))}
        onCreate={handleCreateWorkflow}
      />

      {/* DEBUG SCENARIO TOGGLE - 仅供展示空态使用 */}
      <div className="fixed bottom-6 right-6 z-[1000] scale-90 sm:scale-100 flex flex-col items-end gap-2">
        <div className="bg-bg-card border border-divider rounded-card shadow-overlay p-4 min-w-[200px]">
           <div className="flex items-center gap-2 border-b border-divider pb-2 mb-3">
              <Settings2 size={14} className="text-brand" />
              <VFText variant="t6" color="primary" className="uppercase font-bold tracking-widest">UI Test: Scenarios</VFText>
           </div>
           <div className="flex flex-col gap-2">
              {(['DEFAULT', 'EMPTY_ALL', 'EMPTY_FOLDER'] as WorkflowsScenario[]).map(s => (
                <Button 
                  key={s} size="small" 
                  className={`text-[10px] text-left font-bold h-8 flex items-center justify-between ${scenario === s ? 'text-brand border-brand bg-brand/5' : ''}`} 
                  onClick={() => { setScenario(s); message.info(`Switched to ${s}`); }}
                >
                  {s}
                  {scenario === s && <Plus size={10} className="rotate-45" />}
                </Button>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};
