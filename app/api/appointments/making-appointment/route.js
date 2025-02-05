import { supabase } from '@/app/lib/supabase';
import { unlockAppointment } from './unlock-appointment/route';

/* Locks the appointment for a predefined time */
export async function POST(req) {
    try {
        const { date, time } = await req.json();
        const timeWithZone = time + ':00+02'; // פורמט HH:MM:SS+timeZone

        console.log('making-appointment - Date:', date, 'Time:', timeWithZone);

        const { data, error } = await supabase
            .from('calendar')
            .update({ locked: true }) // עדכון שדה locked ל-true
            .eq('date', date)
            .eq('time', timeWithZone)
            .eq('available', true) // תנאי שהתור עדיין זמין
            .eq('locked', false)
            .select('*');

        if (error) {
            console.error('Error locking appointment:', error);
            return new Response(
                JSON.stringify({ success: false, error: 'Error locking appointment' }),
                { status: 500 }
            );
        }

        // שליחה של Response למשתמש
        if (data && data.length > 0) {
            // שליחה של Response עם נתוני התור
            const response = new Response(
                JSON.stringify({ success: true, locked: true, data }),
                { status: 200 }
            );

            // התחלת טיימר של 5 דקות לאחר שליחת ה-Response
            setTimeout(async () => {
                // קריאה לפונקציה של unlockAppointment אחרי 5 דקות
                await unlockAppointment(date, time);
            }, 10000); // 5 דקות (300,000 מילי-שניות)


            return response;
        }

        return new Response(
            JSON.stringify({ success: true, locked: false, message: 'Appointment is not available' }),
            { status: 409 } // Conflict
        );

    } catch (error) {
        console.error('API route error:', error);
        return new Response(
            JSON.stringify({ success: false, error: 'Error processing the request' }),
            { status: 500 }
        );
    }
}
