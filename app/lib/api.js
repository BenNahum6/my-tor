/* fetch all available appointment in specific data */
export const fetchAvailableAppointments = async (slug, date) => {
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
            body: JSON.stringify({ slug: slug, date: date }),
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
export const fetchSpecificAppointment = async (slug, date, time) => {
    try {
        const apiUrl = process.env.NODE_ENV === 'production'
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/making-appointment`
            : `http://localhost:3000/api/appointments/making-appointment`;

        // console.log("API URL:", apiUrl);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
            body: JSON.stringify({
                slug,
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
export const fetchResetAppointment = async (slug, date, time) => {
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
                slug: slug,
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

/* fetch set specific appointment */
export const fetchSetAppointment = async (slug, date, time, firstName, lastName, phone) => {
    try {
        const apiUrl = process.env.NODE_ENV === 'production'
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/set-appointment`
            : `http://localhost:3000/api/appointments/set-appointment`;

        // console.log("API URL:", apiUrl);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                slug: slug,
                date: date,
                time: time,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                available: false
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

/* Creates a new user based on the fact that their email exists in the DB */
export const fetchSignUp = async (email, fullName, password) => {
    try {
        const apiUrl = process.env.NODE_ENV === 'production'
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/login/sign-in`
            : `http://localhost:3000/api/login/sign-up`;

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                fullName: fullName,
                password: password }),
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || "Failed to sign up");
        }

        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

/* Check if the email and password are correct */
export const fetchSignIn = async (email, password) => {
    try {
        const apiUrl = process.env.NODE_ENV === 'production'
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/login/sign-in`
            : `http://localhost:3000/api/login/sign-in`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            return { success: false, status: response.status, message: responseData.message || "Login failed" };
        }

        return { success: true, status: response.status, data: responseData };

    } catch (error) {
        return { success: false, status: 500, message: "Server error: " + error.message };
    }
};
