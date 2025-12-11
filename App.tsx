import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { WorkflowEditor } from './components/workflow/WorkflowEditor';
import { LIGHT_THEME, DARK_THEME } from './constants';
import { ThemeMode, Language, ViewMode } from './types';

function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [language, setLanguage] = useState<Language>('en');
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [currentWorkflowId, setCurrentWorkflowId] = useState<string | null>(null);

  const theme = themeMode === 'dark' ? DARK_THEME : LIGHT_THEME;

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  const handleNavigateToEditor = (id: string) => {
    setCurrentWorkflowId(id);
    setViewMode('editor');
  };

  const handleBackToDashboard = () => {
    setCurrentWorkflowId(null);
    setViewMode('dashboard');
  };

  return (
    <div 
      className="w-full h-screen flex flex-col overflow-hidden text-sm"
      style={{ background: theme.background, color: theme.text }}
    >
      <Navbar 
        theme={theme} 
        mode={themeMode} 
        language={language}
        viewMode={viewMode}
        onBackToDashboard={handleBackToDashboard}
        toggleTheme={toggleTheme}
        toggleLanguage={toggleLanguage}
      />
      
      {viewMode === 'dashboard' ? (
        <Dashboard 
          theme={theme} 
          mode={themeMode} 
          language={language}
          onNavigateToEditor={handleNavigateToEditor}
        />
      ) : (
        <WorkflowEditor 
          theme={theme}
          mode={themeMode}
          language={language}
        />
      )}
    </div>
  );
}

export default App;