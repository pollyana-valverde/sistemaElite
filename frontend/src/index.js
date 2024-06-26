import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'primereact/resources/primereact.css';
// import 'primereact/resources/themes/viva-light/theme.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
