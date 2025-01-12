'use client';
import React from 'react';

const PresentsAppointments = ({ date, data }) => {
    // פונקציה להמיר את התאריך לפורמט DD/MM/YYYY
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString); // יצירת אובייקט Date מתוך המחרוזת
        const day = String(dateObj.getDate()).padStart(2, '0'); // מחזיר את היום עם אפס מוביל אם צריך
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // מחזיר את החודש עם אפס מוביל אם צריך
        const year = dateObj.getFullYear(); // מחזיר את השנה

        return `${day}/${month}/${year}`; // מחזיר את התאריך בפורמט DD/MM/YYYY
    };

    // מסנן את השעות ומסיר את ה- +02
    const appointmentTimes = data.appointments ? data.appointments.map((appointment) => appointment.time.replace('+02', '')) : [];

    // פונקציה שתופעל כאשר נלחץ על שעה
    const handleAppointmentClick = (time) => {
        alert(`You selected the appointment at ${time}`);
        // כאן אפשר להוסיף פעולה אחרת, כמו פתיחת דף נוסף, שליחה של נתונים וכו'..
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800">
            {/* הצגת התאריך לפי הפורמט */}
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
                Available Appointments for {formatDate(date)}
            </h2>
            {appointmentTimes.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {appointmentTimes.map((time, index) => (
                        <li
                            key={index}
                            className="flex justify-center items-center p-4 border-2 border-gray-300 rounded-lg shadow-lg hover:bg-blue-200 cursor-pointer transition-all duration-300 dark:border-gray-700 dark:hover:bg-blue-700"
                            onClick={() => handleAppointmentClick(time)} // הוספת פעולת לחיצה
                        >
                            <span className="text-xl font-medium text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100">
                                {time}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-600 dark:text-gray-400">No available appointments for this date.</p>
            )}
        </div>
    );
};

export default PresentsAppointments;