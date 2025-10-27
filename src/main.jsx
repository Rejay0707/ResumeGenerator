import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // New: Redux Provider
import store from './store'; // New: Import store (adjust if path differs, e.g., './store/index.js')
import './index.css';
import App from './App.jsx';
import logo from './assets/logo.jpeg'; // Your existing logo import

// Dynamically set favicon (unchanged)
const link = document.querySelector("link[rel~='icon']");
if (link) {
  link.href = logo;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* New: Wrap App with Provider for Redux access */}
      <App />
    </Provider>
  </StrictMode>
);
