import React, { useEffect, useState } from 'react';
import ExpenseCard from './ExpenseCard';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setExpenses, setError } from '../redux/slices/expenseSlice'; // Import Redux actions
import { fetchExpenses } from '../../utils/dataFetch'; // Assuming you have a utility to fetch expenses

const ExpenseList = () => {
  const dispatch = useDispatch();
  
  // Get the expenses, loading, and error from the Redux store
  const { expenses, loading, error } = useSelector((state) => state.expenses);
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  // Function to fetch expenses from backend
  const dataFetch = async () => {
    try {
      dispatch(setLoading(true)); // Set loading state
      const params = {
        category, // Example category (modify as needed)
        startDate, // Example start date
        endDate, // Example end date
      };
      
      const result = await fetchExpenses(params);
      dispatch(setLoading(false));
      
      dispatch(setExpenses(result));
      
      
    } catch (err) {
      dispatch(setError("Failed to fetch expenses"));
      console.error("Error occurred:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    dataFetch();
  }, [dispatch, category, startDate, endDate]); // Add startDate and endDate to the dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white rounded-md p-4 flex flex-col h-[490px]">
      <div className="sticky top-0 z-10 bg-white">
        <Card 
          category={category} 
          setCategory={setCategory} 
          startDate={startDate} 
          setStartDate={setStartDate} 
          endDate={endDate} 
          setEndDate={setEndDate}
        />
      </div>

      <div className="overflow-y-auto mt-2 space-y-2">
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <ExpenseCard key={expense._id} expense={expense} setExpenses={setExpenses}/>
          ))
        ) : (
          <div>No expenses available</div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
