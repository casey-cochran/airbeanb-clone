import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from "./context/Modal";
import './index.css';
import App from './App';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import Modal from 'react-modal';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

Modal.setAppElement(document.getElementById('root'));

function Root() {
  return (
    <Provider store={store}>
        <ModalProvider>
          <BrowserRouter>
          <ScrollToTop />
            <App />
          </BrowserRouter>
        </ModalProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
