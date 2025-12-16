
import React from 'react';
import { VFThemeProvider } from './contexts/ThemeContext';
import { MainLayout } from './layouts/MainLayout';
import { WorkflowsPage } from './pages/WorkflowsPage';
import './i18n/config';

const App: React.FC = () => {
  return (
    <VFThemeProvider>
      <MainLayout>
        <WorkflowsPage />
      </MainLayout>
    </VFThemeProvider>
  );
};

export default App;
