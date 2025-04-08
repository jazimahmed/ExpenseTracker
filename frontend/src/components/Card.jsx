import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Card = ({ category, setCategory, startDate, setStartDate, endDate, setEndDate }) => {
  const [showDatePickers, setShowDatePickers] = React.useState(false);

  const toggleDatePickers = () => {
    setShowDatePickers(!showDatePickers);
  };

  return (
    <div className="w-full lg:w-[900px] bg-white shadow-md rounded-md pl-6 pt-3 text-sm text-gray-700 border z-20">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
          <span className="text-gray-700">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-1 bg-white border rounded-md text-gray-700 w-[90px] text-xs z-10"
          >
            <option value="">None</option>
            <option value="Transport">Transport</option>
            <option value="Food">Food</option>
            <option value="Health">Health</option>
            <option value="Bills">Bills</option>
          </select>
        </div>

        <div className="flex flex-col lg:flex-row justify-between w-full gap-3 text-center">
          <span className="hidden sm:block lg:flex-1">Description</span>
          <span className="hidden sm:block lg:flex-1">Amount</span>
          <span className="lg:flex-1">
            <button
              onClick={toggleDatePickers}
              className="border rounded-md pl-1 text-gray-700 mt-2 lg:mt-0"
            >
              {startDate && endDate
                ? `${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`
                : "Date"}
            </button>
          </span>
        </div>
      </div>

      {showDatePickers && (
        <div className="relative">
          <div className="absolute mt-2 border p-2 bg-white shadow-md rounded-md w-[300px] z-30">
            <div className="flex flex-col gap-2">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="border rounded-md p-1 text-gray-700 text-xs"
                placeholderText="Start Date"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="border rounded-md p-1 text-gray-700 text-xs"
                placeholderText="End Date"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
