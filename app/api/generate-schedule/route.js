// import { supabase } from '../../lib/supabase';
//
// // Creating dates and times
// const generateDatesAndTimes = (daysAhead, startHour, endHour, intervalMinutes) => {
//     const appointments = [];
//     const now = new Date();
//
//     // Creating the dates and times for week
//     for (let i = 0; i < daysAhead; i++) {
//         const day = new Date(now);
//         day.setDate(now.getDate() + i); // Adding another day
//
//         // Creating hours within each day
//         for (let hour = startHour; hour < endHour; hour++) {
//             for (let minute = 0; minute < 60; minute += intervalMinutes) {
//                 const time = new Date(day);
//                 time.setHours(hour);
//                 time.setMinutes(minute);
//
//                 appointments.push({
//                     date: time.toISOString().split('T')[0],
//                     time: time.toISOString().split('T')[1].substring(0, 5),
//                 });
//             }
//         }
//     }
//
//     return appointments;
// };
//
// /*Checking if the appointment already exists*/
// const checkIfAppointmentExists = async (date, time) => {
//     try {
//         const { data, error } = await supabase
//             .from('calendar')
//             .select('*')
//             .eq('date', date)  // חפש תור על פי התאריך
//             .eq('time', time); // וחפש גם לפי הזמן
//
//         if (error) {
//             console.error('Error checking if appointment exists:', error.message);
//             return false;
//         }
//
//         console.log(`Appointments found for ${date} at ${time}:`, data);
//         return data.length > 0; // אם מצא תור עם אותו תאריך ושעה
//     } catch (err) {
//         console.error('Unexpected error while checking appointment existence:', err.message);
//         return false;
//     }
// };
//
// const deletePreviousDayAppointments = async () => {
//     const today = new Date();
//     today.setDate(today.getDate() - 1); // Set yesterday [date]
//
//     const yesterday = today.toISOString().split('T')[0];
//
//     const { data, error } = await supabase
//         .from('calendar')
//         .delete() // Delete operation
//         .eq('date', yesterday); // Deletes all appointments whose [date] equals yesterday
//
//     if (error) {
//         console.error('Error deleting previous day appointments:', error.message);
//     } else {
//         console.log(`Deleted appointments for ${yesterday}`);
//     }
// };
//
// const insertAppointmentsToDb = async (appointments) => {
//     try {
//         await deletePreviousDayAppointments();
//
//         // Add new appointments
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
//                 // Checking if the appointment was actually added
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
//         const appointments = generateDatesAndTimes(7, 9, 21, 30); // Create an appointment
//         await insertAppointmentsToDb(appointments); // Adding an appointment to the database
//         return new Response('Appointments generated and inserted successfully.', { status: 200 });
//     } catch (error) {
//         return new Response('Error generating appointments: ' + error.message, { status: 500 });
//     }
// }

import { supabase } from '../../lib/supabase';

// יצירת תאריכים ושעות
const generateDatesAndTimes = (daysAhead, startHour, endHour, intervalMinutes) => {
    const appointments = [];
    const now = new Date();

    // יצירת תאריכים ושעות לשבוע הקרוב
    for (let i = 0; i < daysAhead; i++) {
        const day = new Date(now);
        day.setDate(now.getDate() + i); // הוספת יום נוסף

        // יצירת שעות בתוך כל יום
        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += intervalMinutes) {
                const time = new Date(day);
                time.setHours(hour);
                time.setMinutes(minute);

                // שמירת התאריך והזמן בפורמט ISO כולל אזור זמן (UTC)
                appointments.push({
                    dateTime: time.toISOString(), // שמירה של תאריך וזמן כולל אזור זמן
                });
            }
        }
    }

    return appointments;
};

/*בדיקת אם קיים תור עם תאריך ושעה אלו*/
const checkIfAppointmentExists = async (dateTime) => {
    try {
        const { data, error } = await supabase
            .from('calendar')
            .select('*')
            .eq('appointment_time', dateTime); // השוואה לתאריך ושעה מלאים כולל אזור זמן

        if (error) {
            console.error('Error checking if appointment exists:', error.message);
            return false;
        }

        console.log(`Appointments found for ${dateTime}:`, data);
        return data.length > 0; // אם קיים תור
    } catch (err) {
        console.error('Unexpected error while checking appointment existence:', err.message);
        return false;
    }
};

// מחיקת תורים מיום קודם
const deletePreviousDayAppointments = async () => {
    const today = new Date();
    today.setDate(today.getDate() - 1); // הגדרת את יום אתמול

    const yesterday = today.toISOString(); // המרת תאריך אתמול לפורמט ISO

    const { data, error } = await supabase
        .from('calendar')
        .delete() // פעולה למחוק
        .lt('appointment_time', yesterday); // מחיקה של כל התורים שהתאריך שלהם קטן מאתמול

    if (error) {
        console.error('Error deleting previous day appointments:', error.message);
    } else {
        console.log(`Deleted appointments for ${yesterday}`);
    }
};

// הוספת תורים למסד נתונים
const insertAppointmentsToDb = async (appointments) => {
    try {
        await deletePreviousDayAppointments(); // מחיקת תורים מיום קודם

        // הוספת תורים חדשים
        for (const appointment of appointments) {
            const exists = await checkIfAppointmentExists(appointment.dateTime); // בדיקה אם התור כבר קיים

            if (exists) {
                console.log(`Appointment already exists for ${appointment.dateTime}`);
                continue;
            }

            // אם התור לא קיים, נכניס אותו למסד הנתונים
            const { data, error } = await supabase
                .from('calendar')
                .insert([{
                    appointment_time: appointment.dateTime, // שדה תאריך ושעה עם אזור זמן
                    available: true
                }]);

            if (error) {
                console.error('Error inserting appointment:', error.message);
            } else {
                console.log('Appointment added successfully:', data);

                // בדיקת אם התור נוסף בהצלחה
                const { data: fetchedData, error: fetchError } = await supabase
                    .from('calendar')
                    .select('*')
                    .eq('appointment_time', appointment.dateTime);

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
        const appointments = generateDatesAndTimes(7, 9, 21, 30); // יצירת תורים לשבוע הקרוב
        await insertAppointmentsToDb(appointments); // הוספת התורים למסד הנתונים
        return new Response('Appointments generated and inserted successfully.', { status: 200 });
    } catch (error) {
        return new Response('Error generating appointments: ' + error.message, { status: 500 });
    }
}
