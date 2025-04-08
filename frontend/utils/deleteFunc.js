import axios from 'axios';
import { fetchExpenses } from './dataFetch';

const deleteExpense = async (id, token, filters = {}) => {
  try {
    await axios.delete(`http://localhost:4000/expenseTracker/expenses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    
    const updatedExpenses = await fetchExpenses(filters);
    //console.log("11111");
    return updatedExpenses;

  } catch (error) {
    console.error('Error deleting expense:', error);
    throw new Error('Failed to delete expense');
  }
};

export default deleteExpense;
