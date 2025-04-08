import React from 'react';
import MonthDropdown from '../components/MonthDropdown';
import ProfilePart from '../components/ProfilePart';
import Header from '../components/Header'; 
import Card from '../components/Card';
import ExpenseCard from '../components/ExpenseCard';
import ExpenseList from '../components/ExpenseList';
import AddExpenseButton from '../components/AddExpenseButton';
import { useSelector } from 'react-redux';
import ExpenseLineChart from '../components/ExpenseLineChart';


const Dashboard = () => {

    
    const { expenses, loading } = useSelector((state) => state.expenses);

    const chartData = expenses.map(exp => ({
        date: new Date(exp.createdAt).toISOString().split('T')[0],
        amount: exp.amount
      }));
      return (
        <div className="flex flex-col min-h-screen bg-gray-100">
          {/* Header stays on top */}
          <Header />
      
          {/* Responsive Wrapper: Stack on small, row on md+ */}
          <div className="flex flex-col md:flex-row">
      
            {/* Sidebar */}
            <div className="w-full md:w-1/5 p-4 md:h-screen md:sticky md:top-0 bg-gray-100">
              <div className="space-y-4">
                <div className="bg-white shadow-md rounded-lg p-4">
                  <ProfilePart />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                  <MonthDropdown />
                </div>
              </div>
            </div>
      
            {/* Main Content Area */}
            <div className="w-full md:w-4/5 p-4 space-y-4">
              <div className="bg-white shadow-md rounded-lg p-4">
                <AddExpenseButton />
              </div>
      
              <div className="bg-white shadow-md rounded-lg p-4">
                <ExpenseList />
              </div>
      
              <div className="bg-white shadow-md rounded-lg p-4">
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
