/* fetch all available appointment in specific data */
export const fetchAvailableAppointments = async (date) => {
    const apiUrl = process.env.NODE_ENV === 'production'
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/getAllAvailableAppointments`
        : 'http://localhost:3000/api/appointments/getAllAvailableAppointments';

    try {
        const response = await fetch(`${apiUrl}?cacheBuster=${Date.now()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
            body: JSON.stringify({ date: date }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error sending request:', error);
        return null;
    }
};


/* fetch available appointment in specific data & time */
// export const fetchSpecificAppointment = async (date, time) => {
//     try {
//         const apiUrl = process.env.NODE_ENV === 'production'
//             ? `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/making-appointment?date=${date}&time=${time}`
//             : `http://localhost:3000/api/appointments/making-appointment?date=${date}&time=${time}`;
//
//         console.log("API URL:", apiUrl);  // הדפסת ה-URL שמבצע את הקריאה
//
//         const response = await fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'apikey': process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY,
//                 'Cache-Control': 'no-cache, no-store, must-revalidate',
//             },
//         });
//
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error making the appointment:', error);
//         throw error;  // לזרוק את השגיאה לכיוון הקורא
//     }
// };

// שינוי בלקוח: שימוש ב-POST במקום GET
export const fetchSpecificAppointment = async (date, time) => {
    try {
        const apiUrl = process.env.NODE_ENV === 'production'
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/making-appointment`
            : `http://localhost:3000/api/appointments/making-appointment`;

        console.log("API URL:", apiUrl);  // הדפסת ה-URL שמבצע את הקריאה

        const response = await fetch(apiUrl, {
            method: 'POST', // שימוש ב-POST
            headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
            body: JSON.stringify({
                date: date,
                time: time,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error making the appointment:', error);
        throw error;  // לזרוק את השגיאה לכיוון הקורא
    }
};


// TODO deleteAppointment

