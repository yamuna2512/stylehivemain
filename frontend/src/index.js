import React from 'react';
import { createRoot } from 'react-dom/client'; // ✅ correct import
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import createStore from './reducks/store/store';

// ✅ Create your Redux store
const store = createStore();

// ✅ Get the root container and create the root
const container = document.getElementById('root');
const root = createRoot(container);

// ✅ Render with Redux Provider and React Router
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// Optional performance measuring
reportWebVitals();
