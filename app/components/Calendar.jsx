// 'use client';
//
// import React, { useState } from 'react';
// import GetEvailebelTor from "@/app/components/GetEvailebelTor";
//
// function Calendar() {
//   const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
//   const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
//   const [selectedDate, setSelectedDate] = useState(null);
//
//   const getDaysInMonth = (month, year) => {
//     return new Date(year, month + 1, 0).getDate();
//   };
//
//   const generateCalendarDays = (month, year) => {
//     const days = [];
//     const daysInMonth = getDaysInMonth(month, year);
//     const firstDayOfMonth = new Date(year, month, 1).getDay();
//
//     // הוספת ערכים ריקים לימים הריקים בתחילת החודש
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       days.push('empty');
//     }
//
//     // הוספת הימים האמיתיים של החודש
//     for (let day = 1; day <= daysInMonth; day++) {
//       days.push(day);
//     }
//
//     return days;
//   };
//
//   const handleDayClick = (day) => {
//     if (day && !isPastDate(day)) {
//       setSelectedDate(day); // עדכן את התאריך שנבחר
//     }
//   };
//
//   const handleNextMonth = () => {
//     if (currentMonth === 11) {
//       setCurrentMonth(0);
//       setCurrentYear(currentYear + 1);
//     } else {
//       setCurrentMonth(currentMonth + 1);
//     }
//     setSelectedDate(null);
//   };
//
//   const handlePreviousMonth = () => {
//     if (currentMonth === 0) {
//       setCurrentMonth(11);
//       setCurrentYear(currentYear - 1);
//     } else {
//       setCurrentMonth(currentMonth - 1);
//     }
//     setSelectedDate(null);
//   };
//
//   const isPastDate = (day) => {
//     const today = new Date();
//     const year = currentYear;
//     const month = currentMonth;
//     const selectedDate = new Date(year, month, day);
//
//     return selectedDate < today.setHours(0, 0, 0, 0);
//   };
//
//   const days = generateCalendarDays(currentMonth, currentYear);
//
//   const isToday = (day) => {
//     const today = new Date();
//     return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
//   };
//
//   return (
//     <div className="flex flex-col items-center">
//       <div className="flex items-center mb-4">
//         <button onClick={handlePreviousMonth} className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded-md">
//           &lt;
//         </button>
//         <h2 className="text-2xl font-semibold mx-4">
//           {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
//         </h2>
//         <button onClick={handleNextMonth} className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded-md">
//           &gt;
//         </button>
//       </div>
//       <div className="grid grid-cols-7 gap-2 w-full max-w-sm">
//         {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
//           <div key={day} className="text-center font-semibold">
//             {day}
//           </div>
//         ))}
//
//         {days.map((day, index) => (
//           <div
//             key={index}
//             className={`text-center py-2 rounded-lg cursor-pointer ${
//               day === 'empty'
//                 ? 'bg-transparent cursor-default' // Blank days are not clickable or highlighted
//                 : day === selectedDate
//                 ? 'bg-yellow-300 font-bold dark:bg-yellow-600 dark:text-black'
//                 : isToday(day) && selectedDate === null
//                 ? 'bg-yellow-300 font-bold dark:bg-yellow-600 dark:text-black'
//                 : isPastDate(day)
//                 ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
//                 : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
//             }`}
//             onClick={() => day !== 'empty' && handleDayClick(day)} // Ignores clicking past dates
//           >
//             {day !== 'empty' ? day : ''}
//           </div>
//         ))}
//       </div>
//
//       {/* After selecting a date, a GET request will be made */}
//       {selectedDate && (
//         <GetEvailebelTor year={currentYear} month={currentMonth} day={selectedDate} />
//       )}
//     </div>
//   );
// }
//
// export default Calendar;


'use client';

import React, { useEffect, useState } from 'react';

function Calendar() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarDays = (month, year) => {
    const days = [];
    const daysInMonth = getDaysInMonth(month, year);
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // הוספת ערכים ריקים לימים הריקים בתחילת החודש
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push('empty');
    }

    // הוספת הימים האמיתיים של החודש
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const handleDayClick = async (day) => {
    if (day && !isPastDate(day)) {
      setSelectedDate(day);

      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      try {
        const response = await fetch('/api/appointments/getAllAvailableAppointments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ date: dateString }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('פגישות זמינות עבור', dateString, ':', data);

        // כאן תוכל להוסיף טיפול בנתונים שהתקבלו
        // למשל, לשמור אותם ב-state:
        // setAvailableAppointments(data.appointments);

      } catch (error) {
        console.error('שגיאה בשליחת הבקשה:', error);
        // כאן תוכל להוסיף טיפול בשגיאות, למשל להציג הודעה למשתמש
      }
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