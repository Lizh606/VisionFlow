
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import { getAntdTheme } from '../design-system/antdTheme';
import type { VFMode } from '../design-system/tokens';

interface ThemeContextType {
  mode: VFMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const VFThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<VFMode>(() => {
    // 1. Check local storage
    const saved = localStorage.getItem('vf-theme');
    if (saved === 'light' || saved === 'dark') return saved as VFMode;
    // 2. Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    // Update HTML attribute for Tailwind
    document.documentElement.setAttribute('data-theme', mode);
    // Persist
    localStorage.setItem('vf-theme', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ConfigProvider theme={getAntdTheme(mode)}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a VFThemeProvider');
  }
  return context;
};
