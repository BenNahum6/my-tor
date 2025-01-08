'use client';

import { useRouter } from 'next/navigation';

const AvailableAppointments = () => {
    const router = useRouter();
    const { date, appointments } = router.query;

    // המרת ה-appointments בחזרה לאובייקט
    const appointmentsData = appointments ? JSON.parse(appointments) : [];

    return (
        <div>
            <h1>פגישות זמינות לתאריך: {date}</h1>
            {appointmentsData.length > 0 ? (
                <ul>
                    {appointmentsData.map((appointment, index) => (
                        <li key={index}>{appointment}</li>
                    ))}
                </ul>
            ) : (
                <p>אין פגישות זמינות עבור התאריך הזה.</p>
            )}
        </div>
    );
};

export default AvailableAppointments;