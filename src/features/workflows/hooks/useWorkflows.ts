
import { useState, useMemo, useEffect } from 'react';
import { Workflow, WorkflowsViewMode, Folder } from '../model/types';
import { mockWorkflows, mockFolders } from '../model/mock';

export type WorkflowsScenario = 'DEFAULT' | 'EMPTY_ALL' | 'EMPTY_FOLDER';

export const useWorkflows = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [viewMode, setViewMode] = useState<WorkflowsViewMode>(() => {
    const saved = localStorage.getItem('vf.workflows.viewMode');
    return (saved === 'grid' ? 'grid' : 'list') as WorkflowsViewMode;
  });

  // Mock Scenario Logic for UI Preview
  const [scenario, setScenario] = useState<WorkflowsScenario>('DEFAULT');

  // State for dynamic workflow properties (favorite/selected)
  const [workflowItems, setWorkflowItems] = useState<Workflow[]>(mockWorkflows);

  // Folder Logic
  const [folders, setFolders] = useState<Folder[]>(mockFolders);
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('vf.workflows.viewMode', viewMode);
  }, [viewMode]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [scenario]);

  const activeFolder = useMemo(() => 
    folders.find(f => f.id === activeFolderId) || null
  , [folders, activeFolderId]);

  const toggleFavorite = (id: string) => {
    setWorkflowItems(prev => prev.map(wf => 
      wf.id === id ? { ...wf, isFavorite: !wf.isFavorite } : wf
    ));
  };

  const toggleSelect = (id: string) => {
    setWorkflowItems(prev => prev.map(wf => 
      wf.id === id ? { ...wf, isSelected: !wf.isSelected } : wf
    ));
  };

  const filteredItems = useMemo(() => {
    // Apply Scenario Overrides
    if (scenario === 'EMPTY_ALL') return [];
    if (scenario === 'EMPTY_FOLDER' && activeFolderId) return [];

    return workflowItems
      .filter(wf => {
        // 1. Filter by Folder
        if (activeFolderId && wf.folderId !== activeFolderId) return false;
        if (!activeFolderId && wf.folderId) return false;

        // 2. Filter by Search
        const matchSearch = wf.name.toLowerCase().includes(search.toLowerCase()) ||
          (wf.description?.toLowerCase().includes(search.toLowerCase()) ?? false);
        
        return matchSearch;
      })
      .sort((a, b) => {
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  }, [workflowItems, search, activeFolderId, scenario]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, page, pageSize]);

  const addFolder = (name: string) => {
    const newFolder: Folder = {
      id: `f_${Date.now()}`,
      name,
      workflowCount: 0,
      updatedAt: new Date().toISOString(),
    };
    setFolders([newFolder, ...folders]);
  };

  return {
    items: paginatedItems,
    total: filteredItems.length,
    loading,
    search,
    setSearch,
    page,
    setPage,
    pageSize,
    setPageSize,
    viewMode,
    setViewMode,
    toggleFavorite,
    toggleSelect,
    // Folders
    folders,
    activeFolderId,
    setActiveFolderId,
    activeFolder,
    addFolder,
    // Scenario
    scenario,
    setScenario,
    error: null,
  };
};
