// src/redux/slices/examSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const saveExamScoresAsync = createAsyncThunk(
  "exam/saveExamScores",
  async (examData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://www.scratchprod.in/resume-generator-backend/api/exam-scores",
        examData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to save exam scores" });
    }
  }
);

const examSlice = createSlice({
  name: "exam",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetExamStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveExamScoresAsync.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(saveExamScoresAsync.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(saveExamScoresAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { resetExamStatus } = examSlice.actions;
export default examSlice.reducer;
