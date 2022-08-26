import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CustomTheme from './store/context/ThemeContext';
import { AppProvider } from './store/context/AppContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider>
    <CustomTheme>
      <App />
    </CustomTheme>
  </AppProvider>
);
