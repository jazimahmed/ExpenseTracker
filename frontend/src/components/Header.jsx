import React from 'react';
import DarkModeToggle from './DarkModeToggle';

function Header() {
  return (
    <header className="bg-blue-400 text-white p-4 flex items-center justify-between sticky top-0 z-30 dark:bg-purple-950 dark:text-white">
      <h1 className="text-2xl font-semibold">Expense Tracker</h1>
      <DarkModeToggle />
    </header>
  );
}

export default Header;
