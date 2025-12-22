
import React from 'react';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';

interface Props {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  onOpenMenu?: () => void;
}

export const PageHeader: React.FC<Props> = ({ title, description, actions, onOpenMenu }) => {
  return (
    <VFPageHeader
      title={title}
      description={description}
      actions={actions}
      onOpenMenu={onOpenMenu}
    />
  );
};
