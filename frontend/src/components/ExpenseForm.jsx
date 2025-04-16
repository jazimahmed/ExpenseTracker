import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { fetchExpensesData } from "../redux/slices/expenseSlice";
import { toast } from 'react-toastify';


const ExpenseForm = ({ setShowForm }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !amount || !category || !date) {
      setError('Please fill in all fields');
      return;
    }

    const expenseData = {
      description,
      amount: Number(amount),
      category,
      date,
    };

    try {
      // Get token from localStorage or sessionStorage
      const token = localStorage.getItem('token'); // Adjust this according to where your token is stored

      // If no token is found, show error message or handle it accordingly
      if (!token) {
        setError('No authentication token found');
        return;
      }

      // Make the POST request with the token in the Authorization header
      await axios.post(
        'http://localhost:4000/expenseTracker/expenses/',
        expenseData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token here
          },
        }
      );

      toast.success("Expense added successfully!");

      dispatch(fetchExpensesData({})); 
      setShowForm(false);
    } catch (err) {
      console.error('Error adding expense:', err);
      toast.error("Expense added failed.");
      setError('Failed to add expense');
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-20">


      <div className="bg-white p-6 rounded-md w-[400px] dark:bg-gray-900 dark:text-white">
        <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md text-sm dark:bg-gray-600 dark:text-white"
              placeholder="Enter expense description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded-md text-sm dark:bg-gray-600 dark:text-white"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-md text-sm dark:bg-gray-600 "
            >
              <option value="">Select Category</option>
              <option value="Transport">Transport</option>
              <option value="Food">Food</option>
              <option value="Health">Health</option>
              <option value="Bills">Bills</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded-md text-sm dark:bg-gray-600 "
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 "
            >
              Add Expense
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="p-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
