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
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/auth/sign-up`
            : `http://localhost:3000/api/auth/sign-up`;

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
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/auth/sign-in`
            : `http://localhost:3000/api/auth/sign-in`;

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

        if (!responseData.success) {
            return { success: false, status: response.status, message: responseData.message || "Login failed" };
        }

        return { success: true, status: response.status, data: responseData };

    } catch (error) {
        return { success: false, status: 500, message: "Server error: " + error.message };
    }
};

/* Checks if token is valid */
export const validateToken = async (token) => {
    // try {
    //     const apiUrl = process.env.NODE_ENV === 'production'
    //         ? `${process.env.NEXT_PUBLIC_API_URL}/api/auth/authenticate`
    //         : `http://localhost:3000/api/auth/authenticate`;
    //
    //     // שולחים את הבקשה עם הטוקן שנשלח לפונקציה
    //     const headers = { 'Authorization': `Bearer ${token}` };
    //
    //     const response = await fetch(apiUrl, {
    //         method: 'GET',
    //         credentials: 'include', // חובה לשלוח את העוגיות אם יש
    //         headers: headers,  // שלח את ה-Headers עם הטוקן
    //     });
    //
    //     const responseData = await response.json();
    //     console.log(responseData)
    //
    //     if (!response.ok) {
    //         return { success: false, status: response.status, message: responseData.message || 'Unauthorized' };
    //     }
    //
    //     return { success: true, status: response.status, data: responseData }; // מחזירים את המידע אם הטוקן תקין
    // } catch (error) {
    //     console.error('Token validation failed', error);
    //     return { success: false, status: 500, message: 'Server error: ' + error.message };
    // }
    try {
        const apiUrl = process.env.NODE_ENV === 'production'
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/auth/authenticate`
            : `http://localhost:3000/api/auth/authenticate`;

        // שולחים את הבקשה עם הטוקן שנשלח לפונקציה
        const headers = { 'Authorization': `Bearer ${token}` };

        const response = await fetch(apiUrl, {
            method: 'GET',
            credentials: 'include', // חובה לשלוח את העוגיות אם יש
            headers: headers,  // שלח את ה-Headers עם הטוקן
        });

        const responseData = await response.json();

        if (!response.ok) {
            return { success: false, status: response.status, message: responseData.message || 'Unauthorized' };
        }

        return { success: true, status: response.status, data: responseData }; // מחזירים את המידע אם הטוקן תקין
    } catch (error) {
        console.error('Token validation failed', error);
        return { success: false, status: 500, message: 'Server error: ' + error.message };
    }
};

/* Save token in server */
export const saveTokenOnServer = async (token, rememberMe) => {
    try {
        const apiUrl = process.env.NODE_ENV === 'production'
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/auth/save-token`
            : `http://localhost:3000/api/auth/save-token`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, rememberMe }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            return { success: false, status: response.status, message: responseData.message || 'Failed to save token' };
        }

        return { success: true, status: response.status, message: 'Token saved successfully' }; // מחזירים שהטוקן נשמר
    } catch (error) {
        console.error('Token saving failed', error);
        return { success: false, status: 500, message: 'Server error: ' + error.message };
    }
};

/* Delete token from cookie */
export const deleteTokenFromServer = async () => {
    try {
        const apiUrl = process.env.NODE_ENV === 'production'
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/auth/delete-token`
            : `http://localhost:3000/api/auth/delete-token`;

        const response = await fetch(apiUrl, {
            method: 'DELETE',
            credentials: 'include',
            headers: {'Content-Type': 'application/json',},
        });

        const responseData = await response.json();

        if (!response.ok) {
            return { success: false, status: response.status, message: responseData.message || 'Failed to delete token' };
        }

        return { success: true, status: response.status, message: 'Token deleted successfully' };
    } catch (error) {
        console.error('Token deletion failed', error);
        return { success: false, status: 500, message: 'Server error: ' + error.message };
    }
};

/* Uploading image to user profile */
export const uploadImage = async (image) => {
    if (!image) {
        return { success: false, message: 'No file selected.' };
    }

    try {
        const apiUrl = process.env.NODE_ENV === 'production'
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/users-function/image-upload`
            : `http://localhost:3000/api/users-function/image-upload`;

        const formData = new FormData();
        formData.append('image', image);

        const response = await fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, message: 'Image uploaded successfully', data };
        } else {
            const errorData = await response.json();
            return { success: false, message: errorData.error || 'Error uploading image' };
        }
    } catch (error) {
        console.error('Error sending request:', error);
        return { success: false, message: `Error sending request: ${error.message}` };
    }
};

/* Gets the logged-in user information */
export const getUserData = async () => {
    try {
        const apiUrl = process.env.NODE_ENV === 'production'
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/users-function/get-user-data`
            : `http://localhost:3000/api/users-function/get-user-data`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, message: 'Data fetched successfully', data };
        } else {
            const errorData = await response.json();
            return { success: false, message: errorData.error || 'Error fetching data' };
        }
    } catch (error) {
        console.error('Error sending request:', error);
        return { success: false, message: `Error sending request: ${error.message}` };
    }
}

