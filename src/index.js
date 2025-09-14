import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// 👇 Service Worker import (PWA ke liye)
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// React root render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 👇 Service Worker register (offline support + installable PWA)
serviceWorkerRegistration.register();
