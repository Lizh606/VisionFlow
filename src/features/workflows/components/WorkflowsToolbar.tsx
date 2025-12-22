
import React from 'react';
import { Input, Button, Tooltip, Dropdown } from 'antd';
import { Search, Compass, Plus, LayoutGrid, LayoutList, FolderPlus, MoreHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { WorkflowsViewMode } from '../model/types';
import { useResponsive } from '../../../shared/hooks/useResponsive';

interface Props {
  search: string;
  onSearchChange: (val: string) => void;
  viewMode: WorkflowsViewMode;
  onViewModeChange: (val: WorkflowsViewMode) => void;
  onNewFolder?: () => void;
  onExploreTemplates: () => void;
  onCreateWorkflow: () => void;
}

export const WorkflowsToolbar: React.FC<Props> = ({ 
  search, 
  onSearchChange, 
  viewMode, 
  onViewModeChange,
  onNewFolder,
  onExploreTemplates,
  onCreateWorkflow
}) => {
  const { t } = useTranslation();
  const { isMobile } = useResponsive();

  if (isMobile) {
    return (
      <div className="flex flex-col gap-3">
        {/* Row 1: Primary Actions */}
        <div className="flex items-center justify-between gap-2">
          <Button 
            type="primary" 
            icon={<Plus size={18} />} 
            onClick={onCreateWorkflow}
            className="flex-1 h-11 font-bold rounded-control flex items-center justify-center gap-2"
          >
            {t('workflows.actions.create')}
          </Button>
          
          <Dropdown
            trigger={['click']}
            menu={{
              items: [
                { 
                  key: 'explore', 
                  label: t('workflows.actions.explore'), 
                  icon: <Compass size={16} />,
                  onClick: onExploreTemplates 
                },
                { 
                  key: 'folder', 
                  label: t('workflows.actions.newFolder'), 
                  icon: <FolderPlus size={16} />,
                  onClick: onNewFolder 
                },
                { type: 'divider' },
                {
                  key: 'view',
                  label: viewMode === 'list' ? t('workflows.view.grid') : t('workflows.view.list'),
                  icon: viewMode === 'list' ? <LayoutGrid size={16} /> : <LayoutList size={16} />,
                  onClick: () => onViewModeChange(viewMode === 'list' ? 'grid' : 'list')
                }
              ]
            }}
          >
            <Button className="h-11 w-11 flex items-center justify-center rounded-control border-border">
              <MoreHorizontal size={20} />
            </Button>
          </Dropdown>
        </div>
        
        {/* Row 2: Search */}
        <Input 
          prefix={<Search size={16} className="text-text-tertiary" />}
          placeholder={t('workflows.searchPlaceholder')}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-11 rounded-control border-border"
          allowClear
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-1 items-center gap-3">
        <div className="flex-1 max-w-lg">
          <Input 
            prefix={<Search size={16} className="text-text-tertiary" />}
            placeholder={t('workflows.searchPlaceholder')}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 rounded-control border-border hover:border-brand/40 focus:border-brand transition-all"
            allowClear
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Tooltip title={t('workflows.actions.newFolder')}>
            <Button 
              onClick={onNewFolder}
              icon={<FolderPlus size={18} />} 
              className="h-10 w-10 flex items-center justify-center rounded-control border-border text-text-tertiary hover:!text-brand hover:!border-brand transition-colors"
            />
          </Tooltip>

          <Button 
            icon={<Compass size={18} />} 
            onClick={onExploreTemplates}
            className="h-10 px-4 font-semibold border-border text-text-secondary flex items-center gap-2 hover:!text-brand hover:!border-brand transition-colors"
          >
            {t('workflows.actions.explore')}
          </Button>

          <Button 
            type="primary" 
            icon={<Plus size={18} />} 
            onClick={onCreateWorkflow}
            className="h-10 px-6 font-bold bg-brand flex items-center gap-2 rounded-control"
          >
            {t('workflows.actions.create')}
          </Button>
        </div>
      </div>

      <div className="flex items-center p-1 bg-bg-page border border-border rounded-control h-10 shrink-0">
        <Tooltip title={t('workflows.view.list')}>
          <button
            onClick={() => onViewModeChange('list')}
            className={`px-3 h-8 flex items-center justify-center rounded-control transition-all ${
              viewMode === 'list' 
                ? 'bg-bg-card border border-divider shadow-sm text-brand font-bold' 
                : 'text-text-tertiary hover:text-text-secondary'
            }`}
          >
            <LayoutList size={18} strokeWidth={viewMode === 'list' ? 2.5 : 2} />
          </button>
        </Tooltip>
        <Tooltip title={t('workflows.view.grid')}>
          <button
            onClick={() => onViewModeChange('grid')}
            className={`px-3 h-8 flex items-center justify-center rounded-control transition-all ${
              viewMode === 'grid' 
                ? 'bg-bg-card border border-divider shadow-sm text-brand font-bold' 
                : 'text-text-tertiary hover:text-text-secondary'
            }`}
          >
            <LayoutGrid size={18} strokeWidth={viewMode === 'grid' ? 2.5 : 2} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
