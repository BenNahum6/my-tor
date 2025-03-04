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
// /* Insert appointments into all tables */
// const insertAppointmentsToDb = async (appointments) => {
//     const tables = ['Ben Nahum']; // List of all tables to handle
//
//     for (let table of tables) {
//         // Delete existing appointments from the table (before today)
//         const { error: deleteError } = await supabase
//             .from(table) // Access the correct table
//             .delete()
//             .lt('date', new Date().toISOString().split('T')[0]); // Deletes all appointments before today
//
//         if (deleteError) {
//             console.error(`Error deleting appointments from ${table}:`, deleteError.message);
//             continue;
//         }
//
//         // Insert new appointments into the table (if not already existing)
//         for (const appointment of appointments) {
//             // Check if the appointment already exists in the current table
//             const { data: existingAppointments, error: selectError } = await supabase
//                 .from(table) // Access the correct table
//                 .select('date, time')
//                 .eq('date', appointment.date)
//                 .eq('time', appointment.time);
//
//             if (selectError) {
//                 console.error(`Error checking existing appointments in ${table}:`, selectError.message);
//                 continue;
//             }
//
//             // If the appointment already exists, skip it
//             if (existingAppointments.length === 0) {
//                 const { error: insertError } = await supabase
//                     .from(table) // Access the correct table
//                     .insert([{
//                         date: appointment.date,
//                         time: appointment.time,
//                         available: true // Marking appointment as available
//                     }]);
//
//                 if (insertError) {
//                     console.error(`Error inserting appointment into ${table}:`, insertError.message);
//                 }
//             } else {
//                 console.log(`Appointment already exists for ${appointment.date} at ${appointment.time}, skipping.`);
//             }
//         }
//     }
// };
//
// /* Main function to insert appointments into all tables */
// export async function POST(req) {
//     try {
//         const appointments = generateDatesAndTimes(7, 9, 21, 30); // Create appointments for the week with 30 min intervals
//         await insertAppointmentsToDb(appointments); // Insert appointments into all tables
//         return new Response('Appointments generated and inserted successfully.', { status: 200 });
//     } catch (error) {
//         return new Response('Error generating appointments: ' + error.message, { status: 500 });
//     }
// }

import { supabase } from '../../lib/supabase';

/* יצירת תורים */
const generateDatesAndTimes = (daysAhead, startHour, endHour, intervalMinutes) => {
    const appointments = [];
    const now = new Date();

    // יצירת תורים מהיום ועד 3 שבועות קדימה
    for (let i = 0; i <= daysAhead; i++) {
        const day = new Date(now);
        day.setDate(now.getDate() + i);

        // לדלג על שבתות
        if (day.getDay() === 6) continue;

        // בשישי סיום מוקדם
        let endTime = endHour;
        if (day.getDay() === 5) {
            endTime = 14.5;
        }

        // יצירת תורים לכל שעה
        for (let hour = startHour; hour < endTime; hour++) {
            for (let minute = 0; minute < 60; minute += intervalMinutes) {
                const time = new Date(day);
                time.setHours(hour);
                time.setMinutes(minute);

                const hours = time.getHours().toString().padStart(2, '0');
                const minutes = time.getMinutes().toString().padStart(2, '0');
                const timeString = `${hours}:${minutes}:00+02`;

                appointments.push({
                    date: time.toISOString().split('T')[0],
                    time: timeString,
                });
            }
        }
    }

    console.log(`✔ נוצרו ${appointments.length} תורים חדשים`);
    return appointments;
};

/* הכנסת תורים למסד הנתונים */
const insertAppointmentsToDb = async (appointments) => {
    const tables = ['Ben Nahum'];

    for (let table of tables) {
        // מחיקת תורים ישנים יותר מ-28 ימים אחורה
        const deleteThreshold = new Date();
        deleteThreshold.setDate(deleteThreshold.getDate() - 28);
        const formattedThreshold = deleteThreshold.toISOString().split('T')[0];

        const { error: deleteError } = await supabase
            .from(table)
            .delete()
            .lt('date', formattedThreshold);

        if (deleteError) {
            console.error(`❌ שגיאה במחיקת תורים מהטבלה ${table}:`, deleteError.message);
            continue;
        } else {
            console.log(`🗑️ נמחקו תורים ישנים מהטבלה ${table}`);
        }

        // הכנסת תורים חדשים
        for (const appointment of appointments) {
            const { data: existingAppointments, error: selectError } = await supabase
                .from(table)
                .select('date, time')
                .eq('date', appointment.date)
                .eq('time', appointment.time);

            if (selectError) {
                console.error(`❌ שגיאה בבדיקת תורים קיימים בטבלה ${table}:`, selectError.message);
                continue;
            }

            if (existingAppointments.length === 0) {
                const { error: insertError } = await supabase
                    .from(table)
                    .insert([{
                        date: appointment.date,
                        time: appointment.time,
                        available: true
                    }]);

                if (insertError) {
                    console.error(`❌ שגיאה בהכנסת תור לטבלה ${table}:`, insertError.message);
                } else {
                    console.log(`✅ נוסף תור חדש: ${appointment.date} ב-${appointment.time}`);
                }
            } else {
                console.log(`⚠️ תור כבר קיים: ${appointment.date} ב-${appointment.time}, דילוג.`);
            }
        }
    }
};

/* פונקציה ראשית */
export async function POST(req) {
    try {
        const appointments = generateDatesAndTimes(21, 9, 21, 30); // 3 שבועות קדימה
        await insertAppointmentsToDb(appointments);
        return new Response('✔ תורים נוצרו והוכנסו בהצלחה.', { status: 200 });
    } catch (error) {
        return new Response('❌ שגיאה ביצירת תורים: ' + error.message, { status: 500 });
    }
}
