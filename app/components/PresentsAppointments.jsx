'use client';
import React, { useState } from 'react';
import Registration from './Registration'; // ייבוא הקומפוננטה החדשה
import { formatDate, formatAppointmentTimes } from '../utils/helper';  // ייבוא הפונקציה מקובץ utils.js
import { fetchSpecificAppointment } from '../lib/api';

const PresentsAppointments = ({ date, data }) => {
    const [showRegistration, setShowRegistration] = useState(false);
    const [selectedDetails, setSelectedDetails] = useState({});
    const formattedDate = formatDate(date);

    // הפקת השעות
    const appointmentTimes = formatAppointmentTimes(data.appointments);
    console.log('appointmentTimes: ', appointmentTimes);

    const handleAppointmentClick = async (date, time) => {
        try {
            const data = await fetchSpecificAppointment(date, time);

            if (data.available) {
                setSelectedDetails({ date, time });
                setShowRegistration(true);
            } else {
                alert(`The appointment at ${time} is not available.`);
            }
        } catch (error) {
            alert("An error occurred while making the appointment.");
            console.error('Error during appointment:', error);  // הדפסת שגיאה אם יש
        }
    };


    return (
        <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
            {/* הצגת התאריך */}
            <h2 className="text-2xl font-bold mb-4 mt-4 text-center text-gray-900 dark:text-gray-100">
                Available Appointments for {formattedDate}
            </h2>
            {appointmentTimes.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {appointmentTimes.map((time, index) => (
                        <li
                            key={index}
                            className="flex justify-center items-center p-3 border-2 border-gray-300 rounded-lg shadow-lg hover:bg-blue-200 cursor-pointer transition-all duration-300 dark:border-gray-700 dark:hover:bg-blue-700"
                            onClick={() => handleAppointmentClick(date, time)} // הוספת פעולת לחיצה
                        >
                            <span className="text-lg font-medium text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100">
                                {time}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-600 dark:text-gray-400">No available appointments for this date.</p>
            )}

            {/* הצגת קומפוננטת ההרשמה במקרה של TRUE */}
            {showRegistration && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <Registration
                        date={selectedDetails.date}
                        time={selectedDetails.time}
                        onClose={() => setShowRegistration(false)} // כפתור לסגירת החלון
                    />
                </div>
            )}
        </div>
    );
};

export default PresentsAppointments;
