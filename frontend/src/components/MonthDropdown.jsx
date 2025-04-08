import { useState, useEffect } from "react";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { fetchMonthlyExpense } from "../../utils/monthlySummery";
import {  useSelector } from "react-redux";


function MonthDropdown() {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth.toString());
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [totalExpense, setTotalExpense] = useState(null);
  const [message, setMessage] = useState(null);
  const { expenses} = useSelector((state) => state.expenses);


  const token = localStorage.getItem("token");

  useEffect(() => {
    setMessage(null);
    const getExpense = async () => {
      const result = await fetchMonthlyExpense(selectedMonth, selectedYear, token);
      setTotalExpense(result.totalExpense);
      setMessage(result.message);
    };

    getExpense();
  }, [selectedMonth, selectedYear, token, expenses]);

  return (
    <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md text-center">
      <div className="text-sm font-semibold mb-2">Monthly Expense</div>
      
      <div className="flex flex-col mb-4">
        <label htmlFor="month" className="text-xs font-medium mb-1">Month</label>
        <select
          id="month"
          className="p-2 border rounded-md text-sm mb-2"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col mb-2">
        <label htmlFor="year" className="text-xs font-medium mb-1">Year</label>
        <input
          id="year"
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-2 border rounded-md text-sm"
        />
      </div>

      <div className="p-2 flex justify-center items-center gap-2">
        <FaMoneyCheckAlt size={20}/>
        <div>
          {totalExpense >= 0 ? `${totalExpense} LKR` : "Loading..."}
        </div>
      </div>

      {message && <div className="text-red-500 mt-2 text-center">{message}</div>}
    </div>
  );
}

export default MonthDropdown;
