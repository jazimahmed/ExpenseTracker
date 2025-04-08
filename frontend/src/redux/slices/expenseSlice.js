import { createSlice } from "@reduxjs/toolkit";
import { fetchExpenses } from "../../../utils/dataFetch.js"; // Assuming fetchExpenses is in 'expenseUtils.js'

const initialState = {
  expenses: [],
  loading: false,
  error: null,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setLoading: (state, action) => {
        state.loading = action.payload;
      }
      ,
    setExpenses: (state, action) => {
      state.expenses = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setExpenses, setError } = expensesSlice.actions;

export const fetchExpensesData = ({ category, startDate, endDate }) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const data = await fetchExpenses({ category, startDate, endDate });
    dispatch(setExpenses(data));
  } catch (error) {
    dispatch(setError("Failed to fetch expenses"));
  }
};

export default expensesSlice.reducer;
