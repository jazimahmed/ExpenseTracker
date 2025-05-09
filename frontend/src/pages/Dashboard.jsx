import React from 'react';
import MonthDropdown from '../components/MonthDropdown';
import ProfilePart from '../components/ProfilePart';
import Header from '../components/Header'; 
// import Card from '../components/Card';
// import ExpenseCard from '../components/ExpenseCard';
import ExpenseList from '../components/ExpenseList';
import AddExpenseButton from '../components/AddExpenseButton';
import { useSelector } from 'react-redux';
import ExpenseLineChart from '../components/ExpenseLineChart';


const Dashboard = () => {

    
    const { expenses , loading } = useSelector((state) => state.expenses);

    const safeExpenses = Array.isArray(expenses) ? expenses : [];

      const chartData = safeExpenses.map(exp => ({
        date: new Date(exp.createdAt).toISOString().split('T')[0],
        amount: exp.amount
      }));
      return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-white">
          {/* Header stays on top */}
          <Header />
      
          {/* Responsive Wrapper: Stack on small, row on md+ */}
          <div className="flex flex-col md:flex-row">
      
            {/* Sidebar */}
            <div className="w-full md:w-1/5 p-4 md:h-screen md:sticky md:top-0 bg-gray-100 dark:bg-gray-950 dark:text-white">
              <div className="space-y-4">
                <div className="bg-white shadow-md rounded-lg p-4 dark:bg-gray-900 dark:text-white">
                  <ProfilePart />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 dark:bg-gray-900 dark:text-white">
                  <MonthDropdown />
                </div>
              </div>
            </div>
      
            {/* Main Content Area */}
            <div className="w-full md:w-4/5 p-4 space-y-4">
              <div className="bg-white shadow-md rounded-lg p-4 dark:bg-gray-900 dark:text-white">
                <AddExpenseButton />
              </div>
      
              <div className="bg-white shadow-md rounded-lg p-4 dark:bg-gray-900 dark:text-white">
                <ExpenseList />
              </div>
      
              <div className="bg-white shadow-md rounded-lg p-4 dark:bg-gray-900 dark:text-white">
                {loading ? (
                  <p className="text-gray-500 text-sm">Loading chart...</p>
                ) : (
                  <ExpenseLineChart data={chartData} />
                )}
              </div>
            </div>
      
          </div>
        </div>
      );
      
}

export default Dashboard;
