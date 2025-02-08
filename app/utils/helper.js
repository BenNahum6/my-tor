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
