import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api"; // ✅ your axios instance

// ✅ POST Attendance
export const saveAttendanceAsync = createAsyncThunk(
  "attendance/saveAttendanceAsync",
  async (attendanceData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/api/attendance",
        attendanceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to save attendance"
      );
    }
  }
);

// ✅ GET Attendance Records (for teacher to review)
export const fetchAttendanceAsync = createAsyncThunk(
  "attendance/fetchAttendanceAsync",
  async (params, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/api/attendance", {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch attendance"
      );
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    records: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearAttendanceState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Save Attendance
      .addCase(saveAttendanceAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveAttendanceAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.records.push(action.payload);
      })
      .addCase(saveAttendanceAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Attendance
      .addCase(fetchAttendanceAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchAttendanceAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAttendanceState } = attendanceSlice.actions;
export default attendanceSlice.reducer;
