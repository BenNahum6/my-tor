// Convert date to dd/mm/yyyy format
export const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
};

export const formatAppointmentTimes = (appointments) => {
    return appointments
        ? appointments.map((appointment) => {
            // Deletes the +02 and the seconds
            return appointment.time.replace('+02', '').split(':').slice(0, 2).join(':');
        })
        : [];
};
