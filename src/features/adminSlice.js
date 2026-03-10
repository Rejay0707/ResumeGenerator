import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getDepartmentSkillAnalytics,
  getYearSkillAnalytics,
} from "../services/skillApi";

const baseUrls = {
  students: "https://www.scratchprod.in/resume-generator-backend/api/students",
  teachers: "https://www.scratchprod.in/resume-generator-backend/api/teachers",
  parents: "https://www.scratchprod.in/resume-generator-backend/api/guardians",
  departments:
    "https://www.scratchprod.in/resume-generator-backend/api/departments", // New endpoint
  subjects: "https://www.scratchprod.in/resume-generator-backend/api/subjects", // New endpoint
  timetables:
    "https://www.scratchprod.in/resume-generator-backend/api/timetables",
};

// 🔹 1. Fetch entities
export const fetchEntities = createAsyncThunk(
  "admin/fetchEntities",
  async (entityType, { rejectWithValue }) => {
    try {
      const res = await axios.get(baseUrls[entityType]);
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];
      return { entityType, data };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to load data");
    }
  },
);

// 🔹 2. Add entity
export const addEntity = createAsyncThunk(
  "admin/addEntity",
  async ({ entityType, data }, { rejectWithValue }) => {
    try {
      const res = await axios.post(baseUrls[entityType], data);
      const newData = res.data?.data || res.data; // Handle API returning { data: ... } or raw object
      return { entityType, data: newData };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to add item");
    }
  },
);

// 🔹 3. Update entity
// export const updateEntity = createAsyncThunk(
//   "admin/updateEntity",
//   async ({ entityType, id, data }, { rejectWithValue }) => {
//     try {
//       const res = await axios.put(`${baseUrls[entityType]}/${id}`, data);
//       const updatedData = res.data?.data || res.data;
//       return { entityType, id, data: updatedData };
//     } catch (err) {
//       return rejectWithValue(err.response?.data || "Failed to update item");
//     }
//   },
// );
export const updateEntity = createAsyncThunk(
  "admin/updateEntity",
  async ({ entityType, id, data }, { rejectWithValue }) => {
    try {
      if (data instanceof FormData) {
        data.append("_method", "PUT");
      }

      const res = await axios.post(`${baseUrls[entityType]}/${id}`, data);

      const updatedData = res.data?.data || res.data;
      return { entityType, id, data: updatedData };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update item");
    }
  },
);

// 🔹 4. Delete entity
export const deleteEntity = createAsyncThunk(
  "admin/deleteEntity",
  async ({ entityType, id }, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseUrls[entityType]}/${id}`);
      return { entityType, id };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete item");
    }
  },
);

export const importStudents = createAsyncThunk(
  "admin/importStudents",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "https://www.scratchprod.in/resume-generator-backend/api/admin/students/import",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      return res.data; // success, failed, errors[]
    } catch (err) {
      return rejectWithValue(err.response?.data || "Import failed");
    }
  },
);

export const exportStudents = createAsyncThunk(
  "admin/exportStudents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://www.scratchprod.in/resume-generator-backend/api/admin/students/export",
        { responseType: "blob" },
      );

      return res.data; // CSV file blob
    } catch (err) {
      return rejectWithValue(err.response?.data || "Export failed");
    }
  },
);

export const resetStudentPassword = createAsyncThunk(
  "admin/resetStudentPassword",
  async (studentId, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `https://www.scratchprod.in/resume-generator-backend/api/admin/students/${studentId}/reset-password`,
      );

      return { studentId, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Password reset failed");
    }
  },
);

export const fetchDashboardStats = createAsyncThunk(
  "admin/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://www.scratchprod.in/resume-generator-backend/api/admin/dashboard",
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to load dashboard stats",
      );
    }
  },
);

export const fetchSubmissions = createAsyncThunk(
  "admin/fetchSubmissions",
  async ({ type, status = "pending" }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://www.scratchprod.in/resume-generator-backend/api/admin/submissions?type=${type}&status=${status}`,
      );

      return res.data.data; // pagination.data
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to load submissions",
      );
    }
  },
);

export const reviewSubmission = createAsyncThunk(
  "admin/reviewSubmission",
  async ({ id, type, status, feedback, college_id }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `https://www.scratchprod.in/resume-generator-backend/api/admin/submissions/${id}/review`,
        { type, status, feedback, college_id },
      );

      return { id, status: res.data.status };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Review failed");
    }
  },
);

// College Settings

export const fetchCollegeSettings = createAsyncThunk(
  "admin/fetchCollegeSettings",
  async (collegeId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://www.scratchprod.in/resume-generator-backend/api/admin/college/settings?college_id=${collegeId}`,
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch settings");
    }
  },
);

export const updateCollegeSettings = createAsyncThunk(
  "admin/updateCollegeSettings",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        "https://www.scratchprod.in/resume-generator-backend/api/admin/college/settings",
        data,
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update settings");
    }
  },
);

export const fetchDepartmentSkills = createAsyncThunk(
  "admin/fetchDepartmentSkills",
  async () => {
    const response = await getDepartmentSkillAnalytics();
    return response.data;
  },
);

export const fetchYearSkills = createAsyncThunk(
  "admin/fetchYearSkills",
  async () => {
    const response = await getYearSkillAnalytics();
    return response.data;
  },
);

// 🔹 Slice
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    data: {
      students: [],
      teachers: [],
      parents: [],
      submissions: [],
    },
    dashboard: null,
    settings: null,
    departmentSkills: [],
    yearSkills: [],
    settingsLoading: false,
    loading: false,
    error: null,
    importResult: null,

    resetPasswordLoading: false,
    resetPasswordSuccess: null,
    resetPasswordError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchEntities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEntities.fulfilled, (state, action) => {
        state.loading = false;
        state.data[action.payload.entityType] = action.payload.data;
      })
      .addCase(fetchEntities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addEntity.fulfilled, (state, action) => {
        state.data[action.payload.entityType].push(action.payload.data);
        state.error = null;
      })

      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchCollegeSettings.pending, (state) => {
        state.settingsLoading = true;
      })

      .addCase(fetchCollegeSettings.fulfilled, (state, action) => {
        state.settingsLoading = false;
        state.settings = action.payload;
      })

      .addCase(fetchCollegeSettings.rejected, (state) => {
        state.settingsLoading = false;
      })

      .addCase(updateCollegeSettings.fulfilled, (state, action) => {
        state.settings = action.payload.data;
      })

      // RESET PASSWORD
      .addCase(resetStudentPassword.pending, (state) => {
        state.resetPasswordLoading = true;
        state.resetPasswordSuccess = null;
        state.resetPasswordError = null;
      })
      .addCase(resetStudentPassword.fulfilled, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordSuccess = action.payload.data;
      })
      .addCase(resetStudentPassword.rejected, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordError = action.payload;
      })

      // UPDATE
      .addCase(updateEntity.fulfilled, (state, action) => {
        const arr = state.data[action.payload.entityType];
        const index = arr.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) arr[index] = action.payload.data;
        state.error = null;
      })

      // DELETE
      .addCase(deleteEntity.fulfilled, (state, action) => {
        state.data[action.payload.entityType] = state.data[
          action.payload.entityType
        ].filter((item) => item.id !== action.payload.id);
        state.error = null;
      })

      .addCase(importStudents.fulfilled, (state, action) => {
        state.importResult = action.payload;
        state.loading = false;
      })

      .addCase(fetchSubmissions.fulfilled, (state, action) => {
        state.data.submissions = action.payload;
        state.loading = false;
      })

      .addCase(reviewSubmission.fulfilled, (state, action) => {
        state.data.submissions = state.data.submissions.filter(
          (item) => item.id !== action.payload.id,
        );
      })

      .addCase(fetchDepartmentSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDepartmentSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.departmentSkills = action.payload;
      })
      .addCase(fetchDepartmentSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchYearSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchYearSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.yearSkills = action.payload;
      })
      .addCase(fetchYearSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle all rejected thunks
      .addMatcher(
        (action) => action.type.endsWith("rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        },
      );
  },
});

export default adminSlice.reducer;
