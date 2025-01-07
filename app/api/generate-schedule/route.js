import { supabase } from '../../lib/supabase';

// Creating dates and times
const generateDatesAndTimes = (daysAhead, startHour, endHour, intervalMinutes) => {
    const appointments = [];
    const now = new Date();

    // Creating the dates and times for week
    for (let i = 0; i < daysAhead; i++) {
        const day = new Date(now);
        day.setDate(now.getDate() + i); // Adding another day

        // Creating hours within each day
        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += intervalMinutes) {
                const time = new Date(day);
                time.setHours(hour);
                time.setMinutes(minute);

                appointments.push({
                    date: time.toISOString().split('T')[0],
                    time: time.toISOString().split('T')[1].substring(0, 5),
                });
            }
        }
    }

    return appointments;
};

/*Checking if the appointment already exists*/
const checkIfAppointmentExists = async (date, time) => {
    try {
        const { data, error } = await supabase
            .from('calendar')
            .select('*')
            .eq('date', date)  // חפש תור על פי התאריך
            .eq('time', time); // וחפש גם לפי הזמן

        if (error) {
            console.error('Error checking if appointment exists:', error.message);
            return false;
        }

        console.log(`Appointments found for ${date} at ${time}:`, data);
        return data.length > 0; // אם מצא תור עם אותו תאריך ושעה
    } catch (err) {
        console.error('Unexpected error while checking appointment existence:', err.message);
        return false;
    }
};

const deletePreviousDayAppointments = async () => {
    const today = new Date();
    today.setDate(today.getDate() - 1); // Set yesterday date

    const yesterday = today.toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('calendar')
        .delete() // Delete operation
        .lt('date', yesterday); // Deletes all appointments whose date is before yesterday

    if (error) {
        console.error('Error deleting previous day appointments:', error.message);
    } else {
        console.log(`Deleted appointments for ${yesterday}`);
    }
};

const insertAppointmentsToDb = async (appointments) => {
    try {
        await deletePreviousDayAppointments();

        // Add new appointments
        for (const appointment of appointments) {
            const exists = await checkIfAppointmentExists(appointment.date, appointment.time);

            if (exists) {
                console.log(`Appointment already exists for ${appointment.date} at ${appointment.time}`);
                continue;
            }

            // If the appointment does not exist, we will add it to the database
            const { data, error } = await supabase
                .from('calendar')
                .insert([{
                    date: appointment.date,
                    time: appointment.time,
                    available: true
                }]);

            if (error) {
                console.error('Error inserting appointment:', error.message);
            } else {
                console.log('Appointment added successfully:', data);

                // Checking if the appointment was actually added
                const { data: fetchedData, error: fetchError } = await supabase
                    .from('calendar')
                    .select('*')
                    .eq('date', appointment.date)
                    .eq('time', appointment.time);

                if (fetchError) {
                    console.error('Error fetching added appointment:', fetchError.message);
                } else {
                    console.log('Fetched added appointment:', fetchedData);
                }
            }
        }
    } catch (err) {
        console.error('Unexpected error while inserting appointments:', err.message);
    }
};

export async function POST(req) {
    try {
        const appointments = generateDatesAndTimes(7, 9, 21, 30); // Create an appointment
        await insertAppointmentsToDb(appointments); // Adding an appointment to the database
        return new Response('Appointments generated and inserted successfully.', { status: 200 });
    } catch (error) {
        return new Response('Error generating appointments: ' + error.message, { status: 500 });
    }
}