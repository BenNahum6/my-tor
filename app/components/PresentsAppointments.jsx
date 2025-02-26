'use client';
import React, { useState } from 'react';
import Registration from './Registration';
import { formatDate, formatAppointmentTimes } from '../utils/helper';
import { fetchSpecificAppointment } from '../lib/api';

export default function PresentsAppointments({slug, date, data }) {
    const [showRegistration, setShowRegistration] = useState(false);
    const [selectedDetails, setSelectedDetails] = useState({});
    const formattedDate = formatDate(date);

    // Changes the time format
    const appointmentTimes = formatAppointmentTimes(data.appointments);
    // console.log('appointmentTimes: ', appointmentTimes);

    const handleAppointmentClick = async (date, time) => {
        try {
            const data = await fetchSpecificAppointment(slug, date, time);
            // console.log("data from fetchSpecificAppointment: ", data);

            if (data.locked && data.data[0].available) {
                setSelectedDetails({ date, time });
                setShowRegistration(true);
            } else {
                alert(`The appointment at ${time} is not available.`);
            }
        } catch (error) {
            alert("An error occurred while making the appointment.");
            console.error('Error during appointment:', error);
        }
    };


    return (
        <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md mt-5">
            <h2 className="text-2xl font-bold mb-4 mt-4 text-center text-gray-900 dark:text-gray-100">
                Available Appointments for {formattedDate}
            </h2>

            {appointmentTimes.length > 0 ? (
                <ul className="grid grid-cols-3 gap-4">
                    {appointmentTimes.map((time, index) => (
                        <li
                            key={index}
                            className="flex justify-center items-center p-3 border border-gray-300 rounded-lg shadow-md
                     hover:bg-blue-500 hover:text-white cursor-pointer transition-all duration-300
                     dark:border-gray-600 dark:hover:bg-blue-700"
                            onClick={() => handleAppointmentClick(date, time)}
                        >
                            <span className="text-lg font-semibold">{time}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-600 dark:text-gray-400">No available appointments for this date.</p>
            )}

            {showRegistration && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Registration
                        slug={slug}
                        date={selectedDetails.date}
                        time={selectedDetails.time}
                        onClose={() => setShowRegistration(false)}
                    />
                </div>
            )}
        </div>
    );
};