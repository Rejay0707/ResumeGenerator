import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://192.168.1.36:8000/api/resumes";

// POST → create a resume
export const createResumeAsync = createAsyncThunk(
  "resume/createResumeAsync",
  async (resumeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, resumeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create resume");
    }
  }
);

// GET → fetch all resumes
export const fetchResumeAsync = createAsyncThunk(
  "resume/fetchResumeAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch resumes");
    }
  }
);

const resumeSlice = createSlice({
  name: "resume",
  initialState: {
    resumes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Resume
      .addCase(createResumeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createResumeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes.push(action.payload);
      })
      .addCase(createResumeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Resumes
      .addCase(fetchResumeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = action.payload;
      })
      .addCase(fetchResumeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default resumeSlice.reducer;
