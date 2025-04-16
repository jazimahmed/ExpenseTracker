import React, { useState } from "react";
import { convertExpensesToCurrency } from "../../utils/currencyUtils";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setExpenses, setError, setCurrency } from "../redux/slices/expenseSlice";

const currencies = [
    "INR", // Indian Rupee
    "LKR", // Sri Lankan Rupee
    "USD", // US Dollar
    "EUR", // Euro
    "JPY", // Japanese Yen
    "GBP", // British Pound
    "AUD", // Australian Dollar
    "CAD", // Canadian Dollar
    "CHF", // Swiss Franc
    "CNY", // Chinese Yuan
    "HKD", // Hong Kong Dollar
    "NZD", // New Zealand Dollar
    "SEK", // Swedish Krona
    "KRW", // South Korean Won
    "SGD", // Singapore Dollar
    "NOK", // Norwegian Krone
    "MXN", // Mexican Peso
    "RUB", // Russian Ruble
    "ZAR", // South African Rand
    "BRL"  // Brazilian Real
  ];
  

function CurrencyDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();

  const { expenses, currency: selectedCurrency } = useSelector((state) => state.expenses);

  const handleCurrencyChange = async (currency) => {
    const prevCurrency = selectedCurrency;
    setShowDropdown(false);
    dispatch(setLoading(true));
    dispatch(setCurrency(currency)); // ✅ Set currency in global state

    try {
      const convertedExpenses = await convertExpensesToCurrency(prevCurrency, currency, expenses || []);
      dispatch(setExpenses(convertedExpenses));
    } catch (error) {
      console.error("Currency conversion error:", error);
      dispatch(setError("Currency conversion failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="border rounded-md px-2 py-1 text-gray-700 text-xs dark:text-white"
      >
        {selectedCurrency} ▾
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-32 max-h-48 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg z-10 dark:bg-purple-950 dark:text-white">
          {currencies.map((cur) => (
            <div
              key={cur}
              onClick={() => handleCurrencyChange(cur)}
              className="px-4 py-2 hover:bg-blue-500 cursor-pointer"
            >
              {cur}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CurrencyDropdown;
