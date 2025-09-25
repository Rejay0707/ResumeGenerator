import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api'; // Updated path: From store/features/ to src/services/

// Async thunk for login: Makes API call to backend
export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Adjust endpoint if your backend uses something else (e.g., '/login' instead of '/api/login')
      const response = await api.post('api/login', { email, password });
      
      // Assume backend response: { success: true, user: { id, name, role, token } } or { error: 'message' }
      if (response.data && response.data.user) {
        return response.data.user; // Return user object for fulfilled case
      } else {
        return rejectWithValue(response.data?.error || 'Login failed');
      }
    } catch (error) {
      // Handle HTTP errors (e.g., 401 Unauthorized, 500 Server Error)
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Network error or invalid credentials';
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for logout (clears state/localStorage; optional backend call)
export const logoutAsync = createAsyncThunk('auth/logoutAsync', async () => {
  // If your backend has a logout endpoint, add: await api.post('/api/logout');
  // For now, just clear localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
});

// Initial state (used if no preloadedState)
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to manually clear errors (e.g., on input change)
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login pending: Show loading
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Login success: Set user, save to localStorage
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        // Persist user and token
        if (action.payload) {
          localStorage.setItem('user', JSON.stringify(action.payload));
          localStorage.setItem('token', action.payload.token || '');
        }
      })
      // Login failure: Show error, clear user
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
        state.user = null;
        // Clear localStorage on failure
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      })
      // Logout: Clear everything
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  },
});

// Export actions and reducer
export const { clearError } = authSlice.actions;
export default authSlice.reducer; // This is imported in store/index.js


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../services/api'; // Axios instance for API calls (adjust path if needed)

// // Async Thunk: Handle login API call (with mock for superadmin testing)
// export const loginAsync = createAsyncThunk(
//   'auth/loginAsync',
//   async ({ email, password }, { rejectWithValue }) => {
//     // Temporary Mock for Superadmin Testing (dev-only: remove for production)
//     // Use: Email = 'mocksuper', Password = 'mockpass123' → Simulates superadmin success
//     if (email === 'mocksuper' && password === 'mockpass123') {
//       console.log('Mock superadmin login successful (for testing)');
//       return {
//         id: 999,
//         name: 'Mock Super Admin',
//         email: 'mocksuper@example.com',
//         role: 'superadmin',  // Triggers backend redirect in LoginPage
//         token: 'mock-jwt-token',  // Optional, for future API auth
//       };
//     }

//     // Real API Call: POST to Laravel backend
//     try {
//       const response = await api.post('/api/login', { email, password });
//       console.log('Real login response:', response.data);  // Debug log
//       if (response.data && response.data.user) {
//         return response.data.user;  // Expect: { id, name, email, role, token }
//       } else {
//         return rejectWithValue(response.data?.error || 'Login failed: Invalid response');
//       }
//     } catch (error) {
//       // Handle API errors (e.g., 401 Invalid credentials)
//       const errorMessage =
//         error.response?.data?.error ||
//         error.response?.data?.message ||
//         error.message ||
//         'Network error or invalid credentials';
//       console.error('Login API error:', errorMessage);  // Debug log
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// // Initial State: Default auth state (overridden by preloadedState in store/index.js)
// const initialState = {
//   user: null,  // { id, name, email, role, token }
//   loading: false,
//   error: null,
// };

// // Create Slice: Reducers and extraReducers for thunk handling
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     // Clear error state (e.g., when user starts typing in form)
//     clearError: (state) => {
//       state.error = null;
//     },
//     // Logout: Clear user and localStorage
//     logout: (state) => {
//       state.user = null;
//       state.loading = false;
//       state.error = null;
//       localStorage.removeItem('user');  // Clear persistence
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Login Pending: Set loading true
//       .addCase(loginAsync.pending, (state) => {
//         state.loading = true;
//         state.error = null;  // Clear previous errors
//       })
//       // Login Fulfilled: Set user, save to localStorage
//       .addCase(loginAsync.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;  // Set user from API/mock response
//         state.error = null;
//         // Persist to localStorage (for preloadedState on refresh)
//         if (action.payload) {
//           localStorage.setItem('user', JSON.stringify(action.payload));
//         }
//       })
//       // Login Rejected: Set error, loading false
//       .addCase(loginAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.user = null;
//         state.error = action.payload || 'Login failed';  // Error message from thunk
//       });
//   },
// });

// // Export Actions (for useAuth hook and components)
// export const { clearError, logout } = authSlice.actions;

// // Export Reducer (mounted in store/index.js as 'auth')
// export default authSlice.reducer;