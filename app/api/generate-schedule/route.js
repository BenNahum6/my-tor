import { supabase } from '../../lib/supabase';

// יצירת תאריכים ושעות
const generateDatesAndTimes = (daysAhead, startHour, endHour, intervalMinutes) => {
    const appointments = [];
    const now = new Date();

    // יצירת התאריכים והשעות לשבוע הקרוב
    for (let i = 0; i < daysAhead; i++) {
        const day = new Date(now);
        day.setDate(now.getDate() + i); // הוספת יום נוסף

        // יצירת שעות בתוך כל יום
        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += intervalMinutes) {
                const time = new Date(day);
                time.setHours(hour);
                time.setMinutes(minute);

                appointments.push({
                    timestamp: time.toISOString(), // שמירה ב-timestamptz
                    available: true
                });
            }
        }
    }

    return appointments;
};

/* בדיקה אם יש תור שכבר קיים */
const checkIfAppointmentExists = async (timestamp) => {
    try {
        const { data, error } = await supabase
            .from('calendar')
            .select('*')
            .eq('timestamp', timestamp);  // חיפוש על פי הזמן המלא (כולל אזור הזמן)

        if (error) {
            console.error('Error checking if appointment exists:', error.message);
            return false;
        }

        console.log(`Appointments found for ${timestamp}:`, data);
        return data.length > 0; // אם מצא תור עם אותו זמן
    } catch (err) {
        console.error('Unexpected error while checking appointment existence:', err.message);
        return false;
    }
};

const deletePreviousDayAppointments = async () => {
    const today = new Date();
    today.setDate(today.getDate() - 1); // הגדרת אתמול

    const yesterday = today.toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('calendar')
        .delete() // פעולה של מחיקה
        .eq('timestamp', yesterday); // מחיקת תורים שזמנם ביום של אתמול

    if (error) {
        console.error('Error deleting previous day appointments:', error.message);
    } else {
        console.log(`Deleted appointments for ${yesterday}`);
    }
};

const insertAppointmentsToDb = async (appointments) => {
    try {
        await deletePreviousDayAppointments();

        // הוספת תורים חדשים
        for (const appointment of appointments) {
            const exists = await checkIfAppointmentExists(appointment.timestamp);

            if (exists) {
                console.log(`Appointment already exists for ${appointment.timestamp}`);
                continue;
            }

            // אם התור לא קיים, נוסיף אותו למסד הנתונים
            const { data, error } = await supabase
                .from('calendar')
                .insert([{
                    timestamp: appointment.timestamp,
                    available: appointment.available
                }]);

            if (error) {
                console.error('Error inserting appointment:', error.message);
            } else {
                console.log('Appointment added successfully:', data);

                // בדיקת האם התור הוסף בהצלחה
                const { data: fetchedData, error: fetchError } = await supabase
                    .from('calendar')
                    .select('*')
                    .eq('timestamp', appointment.timestamp);

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
        const appointments = generateDatesAndTimes(7, 9, 21, 30); // יצירת תורים לשבוע
        await insertAppointmentsToDb(appointments); // הוספת תורים למסד הנתונים
        return new Response('Appointments generated and inserted successfully.', { status: 200 });
    } catch (error) {
        return new Response('Error generating appointments: ' + error.message, { status: 500 });
    }
}
