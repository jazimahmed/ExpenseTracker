import { CiEdit, CiTrash } from "react-icons/ci";
import deleteExpense from '../../utils/deleteFunc';
import { useDispatch } from "react-redux";
import EditExpenseForm from "./EditExpenseForm";
import { useState } from "react";
//import { setExpenses } from '../../redux/slices/expensesSlice'; // Assuming setExpenses is the action

const ExpenseCard = ({ expense, setExpenses }) => {
    const [showForm, setShowForm] = useState(false);
    const handleClick = () => {
        setShowForm(true);
    };

    const dispatch = useDispatch(); // Move useDispatch here to be used correctly

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await deleteExpense(expense._id, token);
            
            dispatch(setExpenses(response)); // Dispatch the action to update the state
        } catch (error) {
            console.error('Failed to delete expense', error);
        }
    };

    return (
        <div className="w-full sm:w-[900px] bg-white shadow-md rounded-lg px-4 py-2 mb-2 flex flex-col sm:flex-row items-center sm:items-center justify-between text-xs border border-gray-200">
            <div className="flex items-center gap-2 w-full sm:w-2/5 text-blue-600 mb-3 sm:mb-0">
                <button className="p-1 hover:bg-blue-100 rounded" onClick={handleClick}>
                    <CiEdit size={18} />
                </button>
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">{expense.category}</span>
            </div>
            {showForm && <EditExpenseForm setShowForm={setShowForm} expense={expense} onUpdate={() => setShowForm(false)}/>}

            <div className="w-full sm:w-1/4 text-gray-500 text-center mb-3 sm:mb-0">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">{expense.description}</span>
            </div>

            <div className="w-full sm:w-1/4 text-red-700 text-center mb-3 sm:mb-0">{expense.amount} LKR</div>

            <div className="w-full sm:w-1/3 text-gray-500 text-right flex items-center justify-end gap-2">
                <span>{new Date(expense.createdAt).toLocaleDateString()}</span>
                <button
                    className="p-1 hover:bg-red-100 rounded text-red-600"
                    onClick={handleDelete}
                >
                    <CiTrash size={18} />
                </button>
            </div>
        </div>
    );
};

export default ExpenseCard;
