// src/utils/expenseUtils.js

import axios from "axios";

export const fetchMonthlyExpense = async (month, year, token) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/expenseTracker/expenses/monthlySummary?month=${month}&year=${year}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data?.message) {
      return { totalExpense: 0, message: response.data.message };
    } else {
      return { totalExpense: response.data[0]?.totalAmount || 0, message: null };
    }
  } catch (error) {
    console.error("Error fetching monthly expense:", error);
    return { totalExpense: 0, message: "Error fetching expense" };
  }
};
