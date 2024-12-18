import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { store } from '../src/redux/store.js';

// store to persit
const persistedStore = persistStore(store);
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate  persistor={persistedStore}>
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    </PersistGate>
  </Provider>

)