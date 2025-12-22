
import React, { useState } from 'react';
import { App } from 'antd';
import { useTranslation } from 'react-i18next';
import { WorkflowsPageHeader } from '../components/WorkflowsPageHeader';
import { WorkflowsToolbar } from '../components/WorkflowsToolbar';
import { WorkflowsTable } from '../components/WorkflowsTable';
import { WorkflowsGrid } from '../components/WorkflowsGrid';
import { FolderGrid } from '../components/FolderGrid';
import { CreateFolderModal } from '../components/CreateFolderModal';
import { WorkflowTemplateModal } from '../components/WorkflowTemplateModal';
import { VFEmptyState } from '../../../shared/ui/VFEmptyState';
import { useWorkflows } from '../hooks/useWorkflows';
import { LayoutGrid } from 'lucide-react';
import { useResponsive } from '../../../shared/hooks/useResponsive';

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
    addFolder
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

  return (
    <div className={`flex flex-col gap-4 md:gap-6 pb-20 w-full animate-in fade-in duration-500`}>
      
      {/* 1. Page Header */}
      <WorkflowsPageHeader 
        title={t('workflows.title')} 
        folderName={activeFolder?.name}
        onBack={activeFolderId ? () => setActiveFolderId(null) : undefined}
      />
      
      {/* 2. MainPanel */}
      <div className={`bg-bg-card rounded-card border border-border shadow-card overflow-hidden`}>
        
        {/* Toolbar Area */}
        <div className="p-4 md:p-5 border-b border-divider bg-bg-page/5">
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

        {/* Content Area */}
        <div className="p-4 md:p-5 min-h-[400px]">
          
          {/* A) Folders Area */}
          {!activeFolderId && !search && (
            <FolderGrid 
              folders={folders} 
              onFolderClick={setActiveFolderId} 
            />
          )}

          {/* B) Workflows Area */}
          {items.length > 0 ? (
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
              <WorkflowsGrid 
                data={items} 
                onToggleFavorite={toggleFavorite}
                onToggleSelect={toggleSelect}
              />
            )
          ) : (
            <div className="py-12">
              <VFEmptyState 
                title={activeFolderId ? t('workflows.empty.folder') : t('workflows.empty.global')}
                description={activeFolderId ? t('workflows.empty.folderDesc') : t('workflows.empty.globalDesc')}
                actionLabel={t('workflows.actions.create')}
                onAction={() => openTemplateModal('create')}
                icon={<LayoutGrid size={24} />}
              />
            </div>
          )}
        </div>
      </div>

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
    </div>
  );
};
