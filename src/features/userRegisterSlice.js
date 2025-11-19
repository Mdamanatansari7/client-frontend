// src/redux/slices/registerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const REGISTER_URL = `https://frolic-backend-1.onrender.com/user/register`;

/**
 * formData: a FormData instance (contains image file + all fields)
 */
export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(REGISTER_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
        timeout: 30000,
      });
      return res.data;
    } catch (err) {
      // prefer server message, else axios error message
      const payload =
        err.response?.data?.message ??
        err.response?.data ??
        err.message ??
        "Registration failed";
      return rejectWithValue(payload);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    loading: false,
    error: null,
    success: null,   // object or string returned from server
  },
  reducers: {
    clearRegisterState(state) {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error?.message;
        state.success = null;
      });
  },
});

export const { clearRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
