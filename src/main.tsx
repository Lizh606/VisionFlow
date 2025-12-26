
import React from 'react';
import ReactDOM from 'react-dom/client';
// Initialize Dayjs plugins before rendering App
import './config/dayjsConfig';
import App from './app/App';
import './styles/tokens.css';
import './styles/tailwind.css';
import './styles/antd-overrides.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
