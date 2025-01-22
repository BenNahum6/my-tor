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
export const fetchSpecificAppointment = async (date, time) => {
    try {
        const apiUrl = process.env.NODE_ENV === 'production'
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/making-appointment`
            : `http://localhost:3000/api/appointments/making-appointment`;

        console.log("API URL:", apiUrl);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
            body: JSON.stringify({
                date,
                time,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("lib api: ", data);
        return data;
    } catch (error) {
        console.error('Error making the appointment:', error);
        throw error;
    }
};

/* fetch reset specific appointment */
export const fetchResetAppointment = async (date, time) => {
    try {
        const apiUrl = process.env.NODE_ENV === 'production'
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/reset-appointment`
            : `http://localhost:3000/api/appointments/reset-appointment`;

        console.log("API URL:", apiUrl);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: date,
                time: time,
            }),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('API Response:', responseData);
        } else {
            console.log('Error submitting form:', response.statusText);
        }
    } catch (error) {
        console.log('Error submitting form:', error);
    }
};

/*  */
export const fetchSetAppointment = async (date, time, firstName, lastName, phone) => {
    try {
        const apiUrl = process.env.NODE_ENV === 'production'
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/set-appointment`
            : `http://localhost:3000/api/appointments/set-appointment`;

        console.log("API URL:", apiUrl);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: date,
                time: time,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                available: false // עדכון שדה available ל-false
            }),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('API Response:', responseData); // הדפסת התגובה מה-API
        } else {
            console.log('Error submitting form:', response.statusText);
        }
    } catch (error) {
        console.log('Error submitting form:', error);
    }
};