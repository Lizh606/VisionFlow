
import React, { useState } from 'react';
import { AppProviders } from './providers/AppProviders';
import { MainLayout } from '../layouts/MainLayout';
import { WorkflowsPage } from '../pages/WorkflowsPage';
import { SelfHostedOverviewPage } from '../pages/SelfHostedOverviewPage';
import { DevicesPage } from '../features/selfhosted/devices/ui/DevicesPage';
import { LicensesPage } from '../features/selfhosted/licenses/ui/LicensesPage';

// Import i18n configuration to ensure it initializes
import '../i18n/config';

const App: React.FC = () => {
  // Simple state-based router for demonstration
  // In a real app, use react-router-dom
  const [currentPath, setCurrentPath] = useState('workflows');

  const renderContent = () => {
    switch (currentPath) {
      case 'workflows':
        return <WorkflowsPage />;
      case 'sh-overview':
        return <SelfHostedOverviewPage onNavigate={setCurrentPath} />;
      case 'sh-devices':
        return <DevicesPage />;
      case 'sh-license':
        return <LicensesPage />;
      case 'upload-license':
        // Reuse LicensesPage but potentially with a modal open state passed in
        return <LicensesPage />;
      default:
        return <WorkflowsPage />;
    }
  };

  return (
    <AppProviders>
      <MainLayout activePath={currentPath} onNavigate={setCurrentPath}>
        {renderContent()}
      </MainLayout>
    </AppProviders>
  );
};

export default App;
