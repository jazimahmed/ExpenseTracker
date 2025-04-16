import { CiEdit, CiTrash } from "react-icons/ci";
import deleteExpense from '../../utils/deleteFunc';
import { useDispatch } from "react-redux";
import EditExpenseForm from "./EditExpenseForm";
import { useState } from "react";
import { toast } from 'react-toastify';
import ConfirmModal from "./ConfirmModal";
import { useSelector } from 'react-redux';

const ExpenseCard = ({ expense, setExpenses }) => {
    const currency = useSelector((state) => state.expenses.currency);
    const [showForm, setShowForm] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleClick = () => {
        setShowForm(true);
    };

    const dispatch = useDispatch();

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await deleteExpense(expense._id, token);
            dispatch(setExpenses(response)); // use prop
            toast.success("Expense deleted successfully!");
        } catch (error) {
            toast.error("Expense deletion failed!");
            console.error('Failed to delete expense', error);
        }
    };

    return (
        <>
            <div className="w-full sm:w-[900px] bg-white shadow-md rounded-lg px-4 py-2 mb-2 flex flex-col sm:flex-row items-center sm:items-center justify-between text-xs border border-gray-200 dark:bg-gray-800 dark:text-white">
                <div className="flex items-center gap-2 w-full sm:w-2/5 text-blue-600 mb-3 sm:mb-0">
                    <button className="p-1 hover:bg-blue-100 rounded dark:bg-gray-800 dark:text-white" onClick={handleClick}>
                        <CiEdit size={18} />
                    </button>
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis dark:text-white">{expense.category}</span>
                </div>

                {showForm && (
                    <EditExpenseForm
                        setShowForm={setShowForm}
                        expense={expense}
                        onUpdate={() => setShowForm(false)}
                    />
                )}

                <div className="w-full sm:w-1/4 text-gray-500 text-center mb-3 sm:mb-0">
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis  dark:text-white">{expense.description}</span>
                </div>

                <div className="w-full sm:w-1/4 text-red-700 text-center mb-3 sm:mb-0 dark:text-white">
                    {expense.amount}<span className="border rounded-md px-2 py-1 text-xs dark:text-white text-white ml-5 dark:bg-cyan-800 bg-cyan-950"> {currency}</span>
                </div>

                <div className="w-full sm:w-1/3 text-gray-500 text-right flex items-center justify-end gap-2 dark:text-white">
                    <span>{new Date(expense.createdAt).toLocaleDateString()}</span>
                    <button
                        className="p-1 hover:bg-red-100 rounded text-red-600"
                        onClick={() => setShowConfirm(true)}
                    >
                        <CiTrash size={18} />
                    </button>
                </div>
            </div>

            <ConfirmModal
                show={showConfirm}
                title="Delete Expense"
                message="Are you sure you want to delete this expense?"
                onCancel={() => setShowConfirm(false)}
                onConfirm={() => {
                    handleDelete();
                    setShowConfirm(false);
                }}
            />
        </>
    );
};

export default ExpenseCard;
