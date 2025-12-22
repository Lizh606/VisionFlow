
export interface Folder {
  id: string;
  name: string;
  workflowCount: number;
  updatedAt: string;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  lastUpdatedRelative: string;
  updatedAt: string; // ISO string
  thumbnailUrl?: string;
  status: 'active' | 'draft' | 'error';
  folderId?: string | null; // 关联文件夹 ID
  isFavorite?: boolean;
  isSelected?: boolean;
  createdBy: {
    name: string;
    avatar?: string;
  };
}

export type WorkflowsViewMode = 'list' | 'grid';

export interface WorkspaceSummary {
  name: string;
  workflowCount: number;
}
