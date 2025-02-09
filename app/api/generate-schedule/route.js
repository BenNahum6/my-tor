// import { supabase } from '../../lib/supabase';
//
// /* Creating dates and times */
// const generateDatesAndTimes = (daysAhead, startHour, endHour, intervalMinutes) => {
//     const appointments = [];
//     const now = new Date();
//
//     // Creating the dates and times for the coming week
//     for (let i = 0; i < daysAhead; i++) {
//         const day = new Date(now);
//         day.setDate(now.getDate() + i); // Adding another day
//
//         // Check if it's Saturday (day 6)
//         if (day.getDay() === 6) {
//             // Skip Saturdays
//             console.log(`Skipping Saturday: ${day.toISOString().split('T')[0]}`);
//             continue;
//         }
//
//         // Check if it's Friday (day 5)
//         let endTime = endHour;
//         if (day.getDay() === 5) {
//             // On Friday, appointments will only be until 14:00 (2 PM)
//             endTime = 14.5;
//         }
//
//         // Create appointments for each day between 9:00 and the appropriate end time
//         for (let hour = startHour; hour < endTime; hour++) {
//             for (let minute = 0; minute < 60; minute += intervalMinutes) {
//                 const time = new Date(day);
//                 time.setHours(hour); // Set hour for local time (Israel)
//                 time.setMinutes(minute); // Set minutes to the fixed interval (9:00, 9:30, etc.)
//
//                 // Create a time string in timetz format (hour:minute:second+timezone)
//                 const hours = time.getHours().toString().padStart(2, '0');
//                 const minutes = time.getMinutes().toString().padStart(2, '0');
//                 const timeString = `${hours}:${minutes}:00+02`; // Adding +02 for Israel time zone
//
//                 appointments.push({
//                     date: time.toISOString().split('T')[0], // Save the date in ISO format
//                     time: timeString, // Saving time in timetz format
//                 });
//             }
//         }
//     }
//
//     return appointments;
// };
//
// /* Checking if the appointment already exists */
// const checkIfAppointmentExists = async (date, time) => {
//     try {
//         const { data, error } = await supabase
//             .from('calendar')
//             .select('*')
//             .eq('date', date)
//             .eq('time', time);
//
//         if (error) {
//             console.error('Error checking if appointment exists:', error.message);
//             return false;
//         }
//
//         console.log(`Appointments found for ${date} at ${time}:`, data);
//         return data.length > 0; // If found an appointment with the same date and time
//     } catch (err) {
//         console.error('Unexpected error while checking appointment existence:', err.message);
//         return false;
//     }
// };
//
// /* Deleting yesterday's appointment */
// const deletePreviousDayAppointments = async () => {
//     const israelTime = new Date();
//     israelTime.setDate(israelTime.getDate() - 1);
//
//     const yesterday = israelTime.toISOString().split('T')[0];
//
//     const { data, error } = await supabase
//         .from('calendar')
//         .delete()
//         .eq('date', yesterday);
//
//     if (error) {
//         console.error('Error deleting previous day appointments:', error.message);
//     } else {
//         console.log(`Deleted appointments for ${yesterday}`);
//     }
// };
//
// /* Injecting information into the DB */
// const insertAppointmentsToDb = async (appointments) => {
//     try {
//         await deletePreviousDayAppointments();
//
//         // Adding new appointments
//         for (const appointment of appointments) {
//             const exists = await checkIfAppointmentExists(appointment.date, appointment.time);
//
//             if (exists) {
//                 console.log(`Appointment already exists for ${appointment.date} at ${appointment.time}`);
//                 continue;
//             }
//
//             // If the appointment does not exist, we will add it to the database
//             const { data, error } = await supabase
//                 .from('calendar')
//                 .insert([{
//                     date: appointment.date,
//                     time: appointment.time,
//                     available: true
//                 }]);
//
//             if (error) {
//                 console.error('Error inserting appointment:', error.message);
//             } else {
//                 console.log('Appointment added successfully:', data);
//
//                 // Check if the queue was added correctly
//                 const { data: fetchedData, error: fetchError } = await supabase
//                     .from('calendar')
//                     .select('*')
//                     .eq('date', appointment.date)
//                     .eq('time', appointment.time);
//
//                 if (fetchError) {
//                     console.error('Error fetching added appointment:', fetchError.message);
//                 } else {
//                     console.log('Fetched added appointment:', fetchedData);
//                 }
//             }
//         }
//     } catch (err) {
//         console.error('Unexpected error while inserting appointments:', err.message);
//     }
// };
//
// export async function POST(req) {
//     try {
//         const appointments = generateDatesAndTimes(7, 9, 21, 30); // Creating an appointment for the week with 30 min intervals
//         await insertAppointmentsToDb(appointments);
//         return new Response('Appointments generated and inserted successfully.', { status: 200 });
//     } catch (error) {
//         return new Response('Error generating appointments: ' + error.message, { status: 500 });
//     }
// }

import { supabase } from '../../lib/supabase';

/* Creating dates and times */
const generateDatesAndTimes = (daysAhead, startHour, endHour, intervalMinutes) => {
    const appointments = [];
    const now = new Date();

    // Creating the dates and times for the coming week
    for (let i = 0; i < daysAhead; i++) {
        const day = new Date(now);
        day.setDate(now.getDate() + i); // Adding another day

        // Check if it's Saturday (day 6)
        if (day.getDay() === 6) {
            // Skip Saturdays
            continue;
        }

        // Check if it's Friday (day 5)
        let endTime = endHour;
        if (day.getDay() === 5) {
            // On Friday, appointments will only be until 14:00 (2 PM)
            endTime = 14.5;
        }

        // Create appointments for each day between 9:00 and the appropriate end time
        for (let hour = startHour; hour < endTime; hour++) {
            for (let minute = 0; minute < 60; minute += intervalMinutes) {
                const time = new Date(day);
                time.setHours(hour); // Set hour for local time (Israel)
                time.setMinutes(minute); // Set minutes to the fixed interval (9:00, 9:30, etc.)

                const hours = time.getHours().toString().padStart(2, '0');
                const minutes = time.getMinutes().toString().padStart(2, '0');
                const timeString = `${hours}:${minutes}:00+02`; // Adding +02 for Israel time zone

                appointments.push({
                    date: time.toISOString().split('T')[0], // Save the date in ISO format
                    time: timeString, // Saving time in timetz format
                });
            }
        }
    }

    return appointments;
};

/* Insert appointments into all tables */
const insertAppointmentsToDb = async (appointments) => {
    const tables = ['calendar', 'Bibi', 'Itamar']; // List of all tables to handle

    for (let table of tables) {
        // Delete existing appointments from the table
        const { error: deleteError } = await supabase
            .from(table)
            .delete()
            .lt('date', new Date().toISOString().split('T')[0]); // Deletes all appointments before today

        if (deleteError) {
            console.error(`Error deleting appointments from ${table}:`, deleteError.message);
            continue;
        }

        // Insert new appointments into the table
        for (const appointment of appointments) {
            const { error: insertError } = await supabase
                .from(table)
                .insert([{
                    date: appointment.date,
                    time: appointment.time,
                    available: true // Marking appointment as available
                }]);

            if (insertError) {
                console.error(`Error inserting appointment into ${table}:`, insertError.message);
            }
        }
    }
};

/* Main function to insert appointments into all tables */
export async function POST(req) {
    try {
        const appointments = generateDatesAndTimes(7, 9, 21, 30); // Create appointments for the week with 30 min intervals
        await insertAppointmentsToDb(appointments); // Insert appointments into all tables
        return new Response('Appointments generated and inserted successfully.', { status: 200 });
    } catch (error) {
        return new Response('Error generating appointments: ' + error.message, { status: 500 });
    }
}
