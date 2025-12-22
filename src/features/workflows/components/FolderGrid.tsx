
import React from 'react';
import { Folder } from '../model/types';
import { FolderCard } from './FolderCard';

interface Props {
  folders: Folder[];
  onFolderClick: (id: string) => void;
}

export const FolderGrid: React.FC<Props> = ({ folders, onFolderClick }) => {
  if (folders.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {folders.map(folder => (
        <FolderCard 
          key={folder.id} 
          folder={folder} 
          onClick={onFolderClick} 
        />
      ))}
    </div>
  );
};
