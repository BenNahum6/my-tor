'use client';
import React, { useEffect, useState } from 'react';

const PresentsAppointments = ({ data }) => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (data && data.appointments) {
            setAppointments(data.appointments); // מאחסן את ה-appointments ב-state
        }
    }, [data]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Appointments</h1>
            {/* שימוש בגריד של Tailwind CSS */}
            <div className="grid gap-4 grid-cols-3 grid-rows-3">
                {/* אם יש appointments, מציגים את השעות */}
                {appointments && appointments.length > 0 ? (
                    appointments.map((appointment, index) => (
                        <div
                            key={index}
                            className="border p-2 text-center rounded bg-gray-800 text-white"
                        >
                            {appointment.time} {/* מציג את זמן התור */}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No appointments available.</p> // אם אין תורים
                )}
            </div>
        </div>
    );
};

export default PresentsAppointments;
