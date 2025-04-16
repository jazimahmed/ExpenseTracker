import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { setExpenses, setError, setLoading } from "../redux/slices/expenseSlice";
import { fetchExpenses } from '../../utils/dataFetch';
import CurrencyDropdown from './CurrencyDropDown';

const Card = ({
  category,
  setCategory,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onApplyFilter
}) => {
  const [showDatePickers, setShowDatePickers] = React.useState(false);
  const [tempStart, setTempStart] = React.useState(startDate);
  const [tempEnd, setTempEnd] = React.useState(endDate);
  const [showSortOptions, setShowSortOptions] = React.useState(false);

  const dispatch = useDispatch();

  const toggleDatePickers = () => {
    setShowDatePickers(!showDatePickers);
    setTempStart(startDate);
    setTempEnd(endDate);
  };

  const handleApply = () => {
    setStartDate(tempStart);
    setEndDate(tempEnd);
    setShowDatePickers(false);
    if (onApplyFilter) {
      onApplyFilter({
        category,
        startDate: tempStart,
        endDate: tempEnd,
      });
    }
  };

  const toggleSortOptions = () => {
    setShowSortOptions(!showSortOptions);
  };

  const handleSort = async (order) => {
    setShowSortOptions(false);
    dispatch(setLoading(true));

    try {
      const sortedData = await fetchExpenses({
        sortBy: "amount",
        order,
      });

      dispatch(setExpenses(sortedData));

      if (onApplyFilter) {
        onApplyFilter({ sortByAmount: order });
      }
    } catch (err) {
      console.error("Error fetching sorted data:", err);
      dispatch(setError("Failed to fetch sorted expenses"));
    }
  };

  return (
    <div className="w-full lg:w-[900px] bg-white shadow-md rounded-md pl-6 pt-3 text-sm text-gray-700 border z-20 relative dark:bg-purple-950 dark:text-white">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
          <span className="text-gray-700 dark:text-white">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-1 bg-white border rounded-md text-gray-700 w-[90px] text-xs z-10 dark:bg-purple-950 dark:text-white"
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

          <span className="lg:flex-1 relative">
            <button
              onClick={toggleSortOptions}
              className="border rounded-md px-2 py-1 text-gray-700 text-xs dark:text-white mr-5 "
            >
              Amount ▾
            </button>
            <CurrencyDropdown/>
            {showSortOptions && (
              <div className="absolute bg-white border rounded-md shadow-md mt-1 text-xs z-50 w-[120px] left-0 dark:bg-purple-950 dark:text-white">
                <button
                  onClick={() => handleSort("asc")}
                  className="block w-full text-left px-2 py-1 hover:bg-gray-100 hover:dark:bg-blue-600"
                >
                  Ascending
                </button>
                <button
                  onClick={() => handleSort("desc")}
                  className="block w-full text-left px-2 py-1 hover:bg-gray-100 hover:dark:bg-blue-600"
                >
                  Descending
                </button>
              </div>
            )}
          </span>
          

          <span className="lg:flex-1">
            <button
              onClick={toggleDatePickers}
              className="border rounded-md pl-1 pr-2 py-1 text-gray-700 mt-2 lg:mt-0 text-xs dark:text-white"
            >
              {startDate || endDate
                ? `${startDate ? new Date(startDate).toLocaleDateString() : ''} ${startDate && endDate ? 'to' : ''} ${endDate ? new Date(endDate).toLocaleDateString() : ''}`
                : "Date"}
            </button>
          </span>
        </div>
      </div>

      {showDatePickers && (
        <div className="relative ">
          <div className="absolute mt-2 border p-2 bg-white shadow-md rounded-md w-[300px] z-30 dark:bg-blue-950 ">
            <div className="flex flex-col gap-2">
              <DatePicker
                selected={tempStart}
                onChange={(date) => setTempStart(date)}
                selectsStart
                startDate={tempStart}
                endDate={tempEnd}
                className="border rounded-md p-1 text-gray-700 text-xs dark:bg-blue-300 dark:text-white dark:placeholder-white"
                placeholderText="Start Date"
              />
              <DatePicker
                selected={tempEnd}
                onChange={(date) => setTempEnd(date)}
                selectsEnd
                startDate={tempStart}
                endDate={tempEnd}
                minDate={tempStart}
                className="border rounded-md p-1 text-gray-700 text-xs dark:bg-blue-300 dark:text-white dark:placeholder-white"
                placeholderText="End Date"
              />
              <button
                className="bg-blue-500 text-white text-xs p-1 rounded mt-2 hover:bg-blue-600 disabled:opacity-50"
                onClick={handleApply}
                disabled={!tempStart && !tempEnd}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
