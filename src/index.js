import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import './18n';

import { UserProvider } from './utils/UserProvider';
import App from './App';

import './global.scss';
import Preloader from 'components/Preloader/Preloader';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <Suspense fallback={<Preloader />}>
        <App />
      </Suspense>
    </UserProvider>
  </React.StrictMode>
);
