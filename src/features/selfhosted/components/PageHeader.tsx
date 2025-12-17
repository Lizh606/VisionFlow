
import React from 'react';
import { useTranslation } from 'react-i18next';
import { VFPageHeader } from '../../../shared/ui/VFPageHeader';

interface Props {
  title: string;
  description?: string;
  breadcrumbs: { title: string | React.ReactNode; href?: string }[];
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<Props> = ({ title, description, breadcrumbs, actions }) => {
  const { t } = useTranslation();
  
  // Base breadcrumb is always Workspace > Self-Hosted
  const baseBreadcrumbs = [
    { title: 'Vision Team' }, // Mock workspace name
    { title: t('menu.selfHosted') },
    ...breadcrumbs
  ];

  return (
    <VFPageHeader
      title={title}
      description={description}
      breadcrumbs={baseBreadcrumbs}
      actions={actions}
    />
  );
};
