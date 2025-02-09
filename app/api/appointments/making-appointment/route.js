// todo לשנות את שם התקייה לlock-appointment

import { supabase } from '@/app/lib/supabase';
import {getFutureTimeFormatted} from "@/app/utils/helper";

/* Locks the appointment for a predefined time */
export async function POST(req) {
    try {
        const { slug, date, time } = await req.json();
        const timeWithZone = time + ':00+02'; // HH:MM:SS+timeZone

        // console.log('making-appointment - Date:', date, 'Time:', timeWithZone);

        const unlockTimeFormatted = getFutureTimeFormatted(3);

        const { data, error } = await supabase
            .from(slug)
            .update({
                locked: true,
                unlock_time: unlockTimeFormatted
            })
            .eq('date', date)
            .eq('time', timeWithZone)
            .eq('available', true)
            .eq('locked', false)
            .select('*');

        if (error) {
            console.error('Error locking appointment:', error);
            return new Response(
                JSON.stringify({ success: false, error: 'Error locking appointment' }),
                { status: 500 }
            );
        }

        if (data && data.length > 0) {
            supabase.rpc('schedule_unlock_appointment', {
                p_date: date,
                p_time: timeWithZone,
                p_delay_seconds: 10
            });

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
