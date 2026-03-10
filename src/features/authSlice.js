import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

/*
|--------------------------------------------------------------------------
| LOGIN (All roles except admin endpoint)
|--------------------------------------------------------------------------
*/
export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/login", { email, password });

      console.log("🔹 Full login response:", response.data);

      // Save token if present
      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
      }

      // ✅ NORMALIZE RESPONSE HERE (VERY IMPORTANT)
      const userData = response.data?.data?.user;
      const collegeId = response.data?.data?.college_id;

      if (!userData) {
        return rejectWithValue("Invalid login response structure");
      }

      // Persist user
      localStorage.setItem("user", JSON.stringify(userData));

      return {
        user: userData,
        collegeId: collegeId,
      }; // 👈 Always return clean user object
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Login failed",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| ADMIN LOGIN (Separate endpoint)
|--------------------------------------------------------------------------
*/
export const adminLoginAsync = createAsyncThunk(
  "auth/adminLoginAsync",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/admin/login", {
        email,
        password,
      });

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
      }

      const adminUser = response.data?.admin;

      if (!adminUser) {
        return rejectWithValue("Invalid admin login response");
      }

      localStorage.setItem("user", JSON.stringify(adminUser));

      return adminUser;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Admin login failed",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| INITIAL STATE
|--------------------------------------------------------------------------
*/
const initialState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  collegeId: null,
  loading: false,
  error: null,
};

/*
|--------------------------------------------------------------------------
| SLICE
|--------------------------------------------------------------------------
*/
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },

  extraReducers: (builder) => {
    builder

      /*
      |--------------------------------------------------------------------------
      | loginAsync
      |--------------------------------------------------------------------------
      */
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // ✅ Already clean user
        state.collegeId = action.payload.collegeId;
      })

      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || "Login failed";
      })

      /*
      |--------------------------------------------------------------------------
      | adminLoginAsync
      |--------------------------------------------------------------------------
      */
      .addCase(adminLoginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(adminLoginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(adminLoginAsync.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || "Admin login failed";
      });
  },
});

export const { clearError, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
