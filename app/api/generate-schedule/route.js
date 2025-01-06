import { supabase } from '../../lib/supabase'; // וודא שהייבוא נכון

// פונקציה ליצירת תאריכים ושעות
const generateDatesAndTimes = (daysAhead, startHour, endHour, intervalMinutes) => {
    const appointments = [];
    const now = new Date();

    // יצירת התאריכים והזמנים לשבוע הבא
    for (let i = 0; i < daysAhead; i++) {
        const day = new Date(now);
        day.setDate(now.getDate() + i); // הוספת יום אחר

        // יצירת שעות בתוך כל יום
        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += intervalMinutes) {
                const time = new Date(day);
                time.setHours(hour);
                time.setMinutes(minute);

                appointments.push({
                    date: time.toISOString().split('T')[0], // התאריך בלבד
                    time: time.toISOString().split('T')[1].substring(0, 5), // הזמן בלבד (שעה ודקה)
                });
            }
        }
    }

    return appointments;
};

const checkIfAppointmentExists = async (date) => {
    const { data, error } = await supabase
        .from('calendar') // Table name
        .select('*') // Select all fields
        .eq('date', date) // Search by date

    if (error) {
        console.error('Error checking existing appointment:', error.message);
        return false;
    }

    return data.length > 0; // אם קיימת רשומה עם תאריך ושעה זהים
};

const deletePreviousDayAppointments = async () => {
    const today = new Date();
    today.setDate(today.getDate() - 1); // קבע את התאריך של אתמול

    const yesterday = today.toISOString().split('T')[0]; // התאריך של אתמול

    const { data, error } = await supabase
        .from('calendar') // שם הטבלה
        .delete() // פעולה של מחיקה
        .lt('date', yesterday); // מחוק את כל התורים שהתאריך שלהם לפני אתמול

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
            const exists = await checkIfAppointmentExists(appointment.date);

            if (exists) {
                console.log(`Appointment already exists for ${appointment.date} at ${appointment.time}`);
                continue;
            }

            const { data, error } = await supabase
                .from('calendar')
                .upsert([{
                    date: appointment.date,
                    time: appointment.time
                }]);

            if (error) {
                console.error('Error inserting appointment:', error.message);
            } else {
                console.log('Appointment added successfully:', data);
            }
        }
    } catch (err) {
        console.error('Unexpected error while inserting appointments:', err.message);
    }
};

export async function POST(req) {
    try {
        const appointments = generateDatesAndTimes(7, 9, 21, 30); // יצירת תורים
        await insertAppointmentsToDb(appointments); // הוספת תורים למסד הנתונים
        return new Response('Appointments generated and inserted successfully.', { status: 200 });
    } catch (error) {
        return new Response('Error generating appointments: ' + error.message, { status: 500 });
    }
}
