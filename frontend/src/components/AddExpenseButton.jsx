import React, { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import ExpenseForm from './ExpenseForm';
import { useSelector } from 'react-redux';
import { downloadCSV } from '../../utils/downloadCSV';


const AddExpenseButton = () => {
  const expenses = useSelector((state) => state.expenses.expenses);
  const [showForm, setShowForm] = useState(false);

  const handleDownload = () => {
    downloadCSV(expenses);
  };

  const handleClick = () => {
    setShowForm(true);
  };

  return (
    <div className="flex justify-between items-center mb-4">
  {/* Left: Add Expense Button */}
  <button
    onClick={handleClick}
    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 dark:bg-purple-800 shadow-md transition"
  >
    <FiPlusCircle size={20} />
    <span className="text-sm">Add Expense</span>
  </button>

  {/* Right: Download CSV Button */}
  <button
    onClick={handleDownload}
    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 dark:bg-purple-800 shadow-md transition"
  >
    <span className="text-sm">Download CSV</span>
  </button>

  {showForm && <ExpenseForm setShowForm={setShowForm} />}
</div>

  );
};

export default AddExpenseButton;
