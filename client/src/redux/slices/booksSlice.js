import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/books");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBookDetails = createAsyncThunk(
  "books/fetchBookDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async ({ title, author, genre, image }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("genre", genre);
      if (image) formData.append("image", image);

      const response = await api.post("/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    bookDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchBookDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.bookDetails = action.payload;
      })
      .addCase(fetchBookDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.unshift(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default booksSlice.reducer;
