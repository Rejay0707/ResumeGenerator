import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice'; // Import from your features folder

// Preloaded state: Load user from localStorage on app start (for persistence after refresh)
const preloadedState = {
  auth: {
    user: (() => {
      try {
        const savedUser   = localStorage.getItem('user');
        return savedUser   ? JSON.parse(savedUser  ) : null;
      } catch (e) {
        console.error('Failed to load user from localStorage:', e);
        localStorage.removeItem('user'); // Clean up invalid data
        return null;
      }
    })(),
    loading: false,
    error: null,
  },
};

// Create the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer, // Mount the auth slice under 'auth' namespace
  },
  preloadedState, // Hydrate initial state from localStorage
  // Enable Redux DevTools in development (Vite-compatible: use import.meta.env)
  devTools: import.meta.env.MODE !== 'production', // Fixed: Vite's env API instead of process.env
});

// Export the store as default (this is what main.jsx imports)
export default store;