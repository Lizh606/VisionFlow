
import React from 'react';
import { Workflow } from '../model/types';
import { WorkflowCard } from './WorkflowCard';

interface Props {
  data: Workflow[];
  onToggleFavorite: (id: string) => void;
  onToggleSelect: (id: string) => void;
}

export const WorkflowsGrid: React.FC<Props> = ({ data, onToggleFavorite, onToggleSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
      {data.map((wf) => (
        <WorkflowCard 
          key={wf.id} 
          workflow={wf} 
          onToggleFavorite={onToggleFavorite}
          onToggleSelect={onToggleSelect}
        />
      ))}
    </div>
  );
};
