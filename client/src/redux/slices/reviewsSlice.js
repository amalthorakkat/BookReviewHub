import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const addReview = createAsyncThunk(
  "reviews/addReview",
  async ({ bookId, rating, comment }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await api.post(
        `/books/${bookId}/reviews`,
        { rating, comment },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default reviewsSlice.reducer;
