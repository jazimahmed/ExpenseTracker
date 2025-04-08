import { useState, useEffect } from "react";
import axios from "axios";
import { FaMoneyCheckAlt } from "react-icons/fa";


function MonthDropdown() {
  const currentMonth = new Date().getMonth() + 1; // Current month
  const currentYear = new Date().getFullYear(); // Current year

  const [selectedMonth, setSelectedMonth] = useState(currentMonth.toString());
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [totalExpense, setTotalExpense] = useState(null);
  const [message, setMessage] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    setMessage(null);
    const fetchExpense = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/expenseTracker/expenses/monthlySummary?month=${selectedMonth}&year=${selectedYear}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach the token here
            },
          }
        );
        if (response.data?.message) {
          setMessage(response.data?.message);
          setTotalExpense(0);
        } else {
          setTotalExpense(response.data[0]?.totalAmount);
        }
        //console.log("expense", totalExpense);
      } catch (error) {
        console.error("Error fetching monthly expense:", error);
      }
    };

    fetchExpense();
  }, [selectedMonth, selectedYear, token]); // Dependency array ensures this runs when month, year, or token changes

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
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
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
