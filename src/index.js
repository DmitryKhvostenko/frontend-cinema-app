import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Preloader from 'components/Preloader/Preloader';

import './18n';

import store from './redux/store.js';
import App from './App';

import './global.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Suspense fallback={<Preloader />}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>
  // </React.StrictMode>
);
