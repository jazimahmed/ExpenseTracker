import axios from "axios";

const API_BASE_URL = "http://localhost:4000/expenseTracker/expenses";

export const fetchExpenses = async ({ category, startDate, endDate }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const params = {};
  if (category) params.category = category;
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  const response = await axios.get(API_BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  //console.log('directfetchedlist',response.data);

  return response.data;
};
