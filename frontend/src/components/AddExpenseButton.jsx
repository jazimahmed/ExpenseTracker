import React, { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import ExpenseForm from './ExpenseForm';

const AddExpenseButton = () => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  return (
    <div className="flex justify-center items-center mb-4">
      <button
        onClick={handleClick}
        className="flex items-center gap-2 p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        <FiPlusCircle size={20} />
        <span className="text-sm">Add Expense</span>
      </button>

      {showForm && <ExpenseForm setShowForm={setShowForm} />}
    </div>
  );
};

export default AddExpenseButton;
