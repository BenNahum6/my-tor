import { supabase } from '@/app/lib/supabase';

export async function POST(req) {
    try {
        const { date, time } = await req.json(); // קריאה לנתונים מה-body ולא מה-URL
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

        // console.log(data)

        if (error) {
            console.error('Error locking appointment:', error);
            return new Response(
                JSON.stringify({ success: false, error: 'Error locking appointment' }),
                { status: 500 }
            );
        }

        if (data && data.length > 0) {
            return new Response(
                JSON.stringify({ success: true, locked: true, data }),
                { status: 200 }
            );
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
