// frontend/src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const tokenFromStorage = localStorage.getItem("token");

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log("Sending login request:", { email, password });
      const response = await api.post("/auth/login", { email, password });
      console.log("Login response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Login request error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      console.log("Sending register request:", { email, password, username });
      const response = await api.post("/auth/register", {
        email,
        password,
        username,
      });
      console.log("Register response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Register request error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Restore session response:", response.data);
      return { user: response.data.user, token };
    } catch (error) {
      console.error(
        "Restore session error:",
        error.response?.data || error.message
      );
      localStorage.removeItem("token");
      return rejectWithValue(
        error.response?.data || { message: "Session restoration failed" }
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: tokenFromStorage,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Login failed";
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Registration failed";
      })
      .addCase(restoreSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(restoreSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Session restoration failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
