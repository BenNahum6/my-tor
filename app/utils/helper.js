/* Convert date to dd/mm/yyyy format */
export const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
};

/* Deletes the +02 and the seconds from the time*/
export const formatAppointmentTimes = (appointments) => {
    return appointments
        ? appointments.map((appointment) => {
            // Deletes the +02 and the seconds
            return appointment.time.replace('+02', '').split(':').slice(0, 2).join(':');
        })
        : [];
};

/* Gets the current time and returns it plus minutes To Add */
export const getFutureTimeFormatted = (minutesToAdd) => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + minutesToAdd);

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`; // HH:MM:SS
};

/* Check if the full name is valid*/
export const validateFullName = (fullName) => {
    // Length check (at least 2 characters)
    if (fullName.length < 2) {
        return false;
        // return "Full name must be at least 2 characters long.";
    }

    // Maximum length check
    if (fullName.length > 15) {
        return false;
        // return "Full name must be less than 50 characters.";
    }

    // Check for unnecessary spaces
    if (fullName.trim() !== fullName) {
        return false;
        // return "Full name cannot have leading or trailing spaces.";
    }

    // Valid character check - name can only contain letters and spaces
    const nameRegex = /^[A-Za-zא-ת\s]+$/;
    if (!nameRegex.test(fullName)) {
        return "Full name can only contain letters and spaces.";
    }

    return true;
};

/* Check if the Email is valid */
export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

/* Check if the password is valid */
export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]).{10,}$/;
    return passwordRegex.test(password)
};

/* Return appointments on today's date */
export const todayAppointments = (appointments) => {
    if (!Array.isArray(appointments)) {
        console.error("todayAppointments קיבלה ערך לא תקין:", appointments);
        return [];
    }

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return appointments
        .filter(appointment => appointment.date === today)
        .map(appointment => ({
            ...appointment,
            time: appointment.time ? appointment.time.replace("+02", "") : appointment.time // מסיר את +02 מהזמן אם קיים
        }));
};

