import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const GET_SCHEDULES_URL = "https://frolic-backend-1.onrender.com/user/schedule/getallschedules";

export const getSchedules = createAsyncThunk(
  "schedule/getSchedules",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(GET_SCHEDULES_URL, { withCredentials: true });
      
      return res.data;
    } catch (error) {
      const payload =
        error.response?.data?.message ?? error.response?.data ?? error.message;
      return rejectWithValue(payload);
    }
  }
);

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    schedules: [],
    loading: false,
    error: null,
  },
  reducers: {

    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload || [];
      })
      .addCase(getSchedules.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload ?? action.error?.message ?? "Unknown error";
      });
  },
});

export const { clearError } = scheduleSlice.actions;
export default scheduleSlice.reducer;
