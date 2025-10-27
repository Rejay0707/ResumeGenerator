// src/features/parentChildrenSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch guardian and their children
export const fetchParentChildrenAsync = createAsyncThunk(
  "parent/fetchParentChildren",
  async (guardianId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://www.scratchprod.in/resume-generator-backend/api/guardians/${guardianId}/children`
      );

      // Ensure backend structure is consistent
      return {
        guardian: response.data.guardian || null,
        children: response.data.children || [],
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch parent data" }
      );
    }
  }
);

const parentChildrenSlice = createSlice({
  name: "parentChildren",
  initialState: {
    loading: false,
    error: null,
    guardian: null,
    children: [],
  },
  reducers: {
    clearParentChildrenState: (state) => {
      state.loading = false;
      state.error = null;
      state.guardian = null;
      state.children = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParentChildrenAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParentChildrenAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.guardian = action.payload.guardian;
        state.children = action.payload.children;
      })
      .addCase(fetchParentChildrenAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export const { clearParentChildrenState } = parentChildrenSlice.actions;
export default parentChildrenSlice.reducer;
