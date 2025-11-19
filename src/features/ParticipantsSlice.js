// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const GET_USERS_URL = `https://frolic-backend-1.onrender.com/admin/dashboard/public/getallusers`;

// Async thunk
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(GET_USERS_URL, { withCredentials: true, timeout: 30000 });
    console.log(res.data)
    return res.data
    } catch (error) {
      const message =
        error.response?.data?.message ??
        error.response?.data ??
        error.message ??
        "Failed to fetch users";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    // optional helper to clear state
    clearUsers(state) {
      state.users = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        // sanitize: remove phone numbers & url before storing
        state.users = (action.payload || []).map((u) => ({
          _id: u._id,
          firstName: u.firstName,
          lastName: u.lastName,
          year: u.year,
          branch: u.branch,
          sports: u.sports || [],
          rollNumber: u.rollNumber,
          gender: u.gender,
          status: u.status,
          createdAt: u.createdAt,
        }));
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error?.message ?? "Something went wrong";
      });
  },
});

export const { clearUsers } = userSlice.actions;
export default userSlice.reducer;
