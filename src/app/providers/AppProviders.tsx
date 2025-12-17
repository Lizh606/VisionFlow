
import React from 'react';
import { ConfigProvider, App } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { ThemeProvider, useTheme } from './ThemeContext';
import { getAntdTheme } from '../../design-system/antdTheme';

// Inner component to access ThemeContext
const AntdConfigWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { mode } = useTheme();
  
  return (
    <ConfigProvider theme={getAntdTheme(mode)}>
      <App>
        {children}
      </App>
    </ConfigProvider>
  );
};

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      {/* 
        StyleProvider with hashPriority="high" removes the :where() wrapper from Antd styles.
        This increases CSS specificity to ensure Antd styles override Tailwind's preflight reset.
      */}
      <StyleProvider hashPriority="high">
        <AntdConfigWrapper>
          {children}
        </AntdConfigWrapper>
      </StyleProvider>
    </ThemeProvider>
  );
};
