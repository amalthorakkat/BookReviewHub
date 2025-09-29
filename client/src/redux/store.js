import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import booksReducer from './slices/booksSlice';
import reviewsReducer from './slices/reviewsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    reviews: reviewsReducer,
  },
});