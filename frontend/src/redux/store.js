// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from "./slices/expenseSlice.js";
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    auth: authReducer,
  },
});
