// // src/features/authSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../services/api';

// export const loginAsync = createAsyncThunk(
//   'auth/loginAsync',
//   async ({ email, password }, { rejectWithValue }) => {
//     console.log('Thunk triggered ✅'); // 🔹 This must appear
//     try {
//       const response = await api.post('/api/login', { email, password });
//       console.log('Response from backend:', response.data);

//       if (response.data && response.data.admin) {
//         return response.data.admin; // Backend returns `admin` object
//       } else {
//         return rejectWithValue('Login failed: No user in response');
//       }
//     } catch (error) {
//       console.error('Axios error:', error.message);
//       return rejectWithValue(error.response?.data?.message || error.message || 'Network error');
//     }
//   }
// );

// const initialState = {
//   user: JSON.parse(localStorage.getItem('user') || 'null'),
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     clearError: (state) => { state.error = null; },
//     logout: (state) => {
//       state.user = null;
//       localStorage.removeItem('user');
//       localStorage.removeItem('token');
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginAsync.pending, (state) => { state.loading = true; state.error = null; })
//       .addCase(loginAsync.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         localStorage.setItem('user', JSON.stringify(action.payload));
//       })
//       .addCase(loginAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.user = null;
//         state.error = action.payload || 'Login failed';
//       });
//   },
// });

// export const { clearError, logout } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      if (response.data && response.data.admin) {
        return response.data.admin;
      } else {
        return rejectWithValue('Login failed: No user in response');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Network error');
    }
  }
);

export const adminLoginAsync = createAsyncThunk(
  'auth/adminLoginAsync',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/admin/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      if (response.data && response.data.admin) {
        return response.data.admin;
      } else {
        return rejectWithValue('Admin Login failed: No user in response');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Network error');
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    setUser: (state, action) => {  // ✅ Fixed key name
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
      if (!localStorage.getItem('token')) {
        localStorage.setItem('token', 'mock-student-token');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // SuperAdmin
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || 'Login failed';
      })
      // Admin
      .addCase(adminLoginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLoginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(adminLoginAsync.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || 'Admin Login failed';
      });
  },
});

export const { clearError, logout, setUser } = authSlice.actions;
export default authSlice.reducer;



