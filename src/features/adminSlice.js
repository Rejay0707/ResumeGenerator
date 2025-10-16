import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrls = {
  students: "https://www.scratchprod.in/resume-generator-backend/api/students",
  teachers: "https://www.scratchprod.in/resume-generator-backend/api/teachers",
  parents: "https://www.scratchprod.in/resume-generator-backend/api/guardians",
};

// 🔹 1. Fetch entities
export const fetchEntities = createAsyncThunk(
  "admin/fetchEntities",
  async (entityType, { rejectWithValue }) => {
    try {
      const res = await axios.get(baseUrls[entityType]);
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];
      return { entityType, data };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to load data");
    }
  }
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
  }
);

// 🔹 3. Update entity
export const updateEntity = createAsyncThunk(
  "admin/updateEntity",
  async ({ entityType, id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${baseUrls[entityType]}/${id}`, data);
      const updatedData = res.data?.data || res.data;
      return { entityType, id, data: updatedData };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update item");
    }
  }
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
  }
);

// 🔹 Slice
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    data: {
      students: [],
      teachers: [],
      parents: [],
    },
    loading: false,
    error: null,
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

      // Handle all rejected thunks
      .addMatcher(
        (action) => action.type.endsWith("rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        }
      );
  },
});

export default adminSlice.reducer;
