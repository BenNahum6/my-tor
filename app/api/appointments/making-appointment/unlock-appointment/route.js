import { supabase } from '@/app/lib/supabase';

// שיפור הפונקציה unlockAppointment
export async function unlockAppointment(date, time) {
    try {
        const timeWithZone = time + ':00+02';

        console.log('Attempting to unlock appointment:', date, timeWithZone);

        const { data, error } = await supabase
            .from('calendar')
            .update({ locked: false })
            .eq('date', date)
            .eq('time', timeWithZone)
            .eq('available', true) // שחרור התור רק אם הוא עדיין זמין
            .select('*');

        if (error) {
            console.error('Error unlocking appointment:', error);
            return new Response(
                JSON.stringify({ success: false, error: 'Error unlocking appointment' }),
                { status: 500 }
            );
        }

        if (data.length > 0) {
            console.log('Appointment successfully unlocked.');
        } else {
            console.log('Appointment was already unavailable or not locked.');
        }

        return new Response(
            JSON.stringify({ success: true, unlocked: true, data }),
            { status: 200 }
        );

    } catch (error) {
        console.error('API error:', error);
        return new Response(
            JSON.stringify({ success: false, error: 'Error processing unlock request' }),
            { status: 500 }
        );
    }
}