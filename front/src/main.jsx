import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider } from './context';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
        <App />
      </GoogleOAuthProvider>
    </AppProvider>
  </React.StrictMode>
);
