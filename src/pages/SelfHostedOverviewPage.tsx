
import React from 'react';
import { SelfHostedOverviewScreen } from '../features/selfhosted/overview/ui/SelfHostedOverviewScreen';

interface Props {
  onNavigate: (key: string) => void;
}

export const SelfHostedOverviewPage: React.FC<Props> = ({ onNavigate }) => {
  return <SelfHostedOverviewScreen onNavigate={onNavigate} />;
};
