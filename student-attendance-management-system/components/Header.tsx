
import React from 'react';

interface HeaderProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedDate, setSelectedDate }) => {
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // The value from input type="date" is in 'YYYY-MM-DD' format.
    // new Date() will parse it in UTC, which can cause off-by-one day errors depending on timezone.
    // To handle this, we split and construct the date to ensure it's local.
    const dateParts = event.target.value.split('-').map(part => parseInt(part, 10));
    const newDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    setSelectedDate(newDate);
  };
  
  // Format date to 'YYYY-MM-DD' for the input value
  const dateToInputValue = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
          <h1 className="text-2xl font-bold text-gray-800">Attendance Tracker</h1>
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="date-picker" className="text-gray-600 font-medium">Select Date:</label>
          <input
            id="date-picker"
            type="date"
            value={dateToInputValue(selectedDate)}
            onChange={handleDateChange}
            className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
