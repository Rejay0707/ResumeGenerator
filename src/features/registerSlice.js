import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser  = createAsyncThunk(
  'register/registerUser ',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://192.168.1.36:8000/api/register', userData);
      if (response.data.success === false) {
        return rejectWithValue(response.data.message || 'Registration failed');
      }
      return response.data.data; // Assuming { data: { user/token details } }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Server error. Please try again.');
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser .pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser .fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || action.payload; // Adjust based on response structure
        state.token = action.payload.token;
      })
      .addCase(registerUser .rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = registerSlice.actions;
export default registerSlice.reducer;
