
import React, { useState } from 'react';
import { App, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { LayoutGrid, Compass, FolderPlus, Plus } from 'lucide-react';

import { WorkflowsPageHeader } from '../components/WorkflowsPageHeader';
import { WorkflowsToolbar } from '../components/WorkflowsToolbar';
import { WorkflowsTable } from '../components/WorkflowsTable';
import { WorkflowsGrid } from '../components/WorkflowsGrid';
import { FolderGrid } from '../components/FolderGrid';
import { CreateFolderModal } from '../components/CreateFolderModal';
import { WorkflowTemplateModal } from '../components/WorkflowTemplateModal';
import { VFEmptyState } from '../../../shared/ui/VFEmptyState';
import { useWorkflows } from '../hooks/useWorkflows';
import { useResponsive } from '../../../shared/hooks/useResponsive';

/**
 * WorkflowsScreen - V1.4 Refined Layout
 * 采用与“设备列表”一致的模块化结构，弃用大容器包裹，提升画布感。
 */
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
    <div className="flex flex-col gap-4 md:gap-6 pb-20 w-full animate-in fade-in duration-500">
      
      {/* 1. Page Header: 标题与页面级动作 */}
      <WorkflowsPageHeader 
        title={t('workflows.title')} 
        folderName={activeFolder?.name}
        onBack={activeFolderId ? () => setActiveFolderId(null) : undefined}
      />
      
      {/* 2. Toolbar Card: 搜索与筛选 (对齐设备列表的 Filter Card) */}
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

      {/* 3. Folders Section: 仅在非搜索且处于根目录时显示 */}
      {!activeFolderId && !search && folders.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-1">
            <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">
              {t('menu.folders', { defaultValue: 'Folders' })}
            </span>
            <div className="h-px flex-1 bg-divider opacity-60" />
          </div>
          <FolderGrid 
            folders={folders} 
            onFolderClick={setActiveFolderId} 
          />
        </div>
      )}

      {/* 4. Main Content: 列表或网格 */}
      <div className="min-h-[400px]">
        {items.length > 0 ? (
          viewMode === 'list' ? (
            /* VFTable 自身已包含白色背景、圆角和边框，无需额外包装 */
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
          <div className="bg-bg-card rounded-card border border-border p-12 shadow-sm">
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
    </div>
  );
};
