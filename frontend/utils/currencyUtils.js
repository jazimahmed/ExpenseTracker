// utils/currencyUtils.js
export const convertExpensesToCurrency = async (prevCurrency , selectedCurrency, expenses) => {
    try {
      let response = await fetch(
        `https://v6.exchangerate-api.com/v6/264ace37573d1022b8d5ba10/latest/${prevCurrency}`
      );
      
  
      const data = await response.json();
  
      if (data.result !== "success") throw new Error("Failed to fetch exchange rates");
  
      const rate = data.conversion_rates[selectedCurrency];
      console.log('111',rate);
      console.log(prevCurrency, selectedCurrency, rate);

  
      if (!rate) throw new Error(`Currency ${selectedCurrency} not found`);

      const convertedExpenses = expenses.map((expense) => ({
        ...expense,
        amount: +(expense.amount * rate).toFixed(2),
        currency: selectedCurrency,
      }));
  
      //console.log('111',convertedExpenses);
      return convertedExpenses;
      
    } catch (error) {
      console.error("Currency conversion failed:", error);
      return expenses; // return original if error
    }
  };
  