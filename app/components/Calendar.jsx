'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

function Calendar() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const router = useRouter();
  const params = useParams();
  const slug = params.slug; // Extracting the slug from the URL

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarDays = (month, year) => {
    const days = [];
    const daysInMonth = getDaysInMonth(month, year);
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Adding blank values to empty days at the beginning of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push('empty');
    }

    // Adding the actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const handleDayClick = async (day) => {
    if (day && !isPastDate(day)) {
      setSelectedDate(day);

      // Checking that the slug exists
      if (!slug) {
        console.error('No slug found in URL');
        return;
      }

      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      // Navigation with the dynamic date
      router.push(`/pages/${slug}/calendar/${dateString}`);

    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
  };

  const isPastDate = (day) => {
    const today = new Date();
    const year = currentYear;
    const month = currentMonth;
    const selectedDate = new Date(year, month, day);

    return selectedDate < today.setHours(0, 0, 0, 0);
  };

  const days = generateCalendarDays(currentMonth, currentYear);

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
  };

  return (
      <div className="flex flex-col items-center">
        <div className="flex items-center mb-4">
          <button onClick={handlePreviousMonth} className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded-md">
            &lt;
          </button>
          <h2 className="text-2xl font-semibold mx-4">
            {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
          </h2>
          <button onClick={handleNextMonth} className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded-md">
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 w-full max-w-sm">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-semibold">
                {day}
              </div>
          ))}

          {days.map((day, index) => (
              <div
                  key={index}
                  className={`text-center py-2 rounded-lg cursor-pointer ${
                      day === 'empty'
                          ? 'bg-transparent cursor-default'
                          : day === selectedDate
                              ? 'bg-yellow-300 font-bold dark:bg-yellow-600 dark:text-black'
                              : isToday(day) && selectedDate === null
                                  ? 'bg-yellow-300 font-bold dark:bg-yellow-600 dark:text-black'
                                  : isPastDate(day)
                                      ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => day !== 'empty' && handleDayClick(day)} // Ignores clicking past dates
              >
                {day !== 'empty' ? day : ''}
              </div>
          ))}
        </div>
      </div>
  );
}

export default Calendar;
