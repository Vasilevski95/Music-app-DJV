import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';


import './index.css';
import App from './App';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* We are wrapping out application with provider from redux. We are providing one property, and that is store, and that store is coming from store.js */}
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
);
