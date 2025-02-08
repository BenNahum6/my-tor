// import { supabase } from '@/app/lib/supabase';
// // todo לשנות את שם התקייה לlock-appointment
//
// /* Locks the appointment for a predefined time */
// export async function POST(req) {
//     try {
//         const { date, time } = await req.json(); // קריאה לנתונים מה-body ולא מה-URL
//         const timeWithZone = time + ':00+02'; // פורמט HH:MM:SS+timeZone
//
//         console.log('making-appointment - Date:', date, 'Time:', timeWithZone);
//
//         const { data, error } = await supabase
//             .from('calendar')
//             .update({ locked: true }) // עדכון שדה locked ל-true
//             .eq('date', date)
//             .eq('time', timeWithZone)
//             .eq('available', true) // תנאי שהתור עדיין זמין
//             .eq('locked', false)
//             .select('*');
//
//         // console.log(data)
//
//         if (error) {
//             console.error('Error locking appointment:', error);
//             return new Response(
//                 JSON.stringify({ success: false, error: 'Error locking appointment' }),
//                 { status: 500 }
//             );
//         }
//
//         if (data && data.length > 0) {
//             // send unlock from here
//             return new Response(
//                 JSON.stringify({ success: true, locked: true, data }),
//                 { status: 200 }
//             );
//         }
//
//         return new Response(
//             JSON.stringify({ success: true, locked: false, message: 'Appointment is not available' }),
//             { status: 409 } // Conflict
//         );
//
//     } catch (error) {
//         console.error('API route error:', error);
//         return new Response(
//             JSON.stringify({ success: false, error: 'Error processing the request' }),
//             { status: 500 }
//         );
//     }
// }

import { supabase } from '@/app/lib/supabase';
import {getFutureTimeFormatted} from "@/app/utils/helper";

/* Locks the appointment for a predefined time */
export async function POST(req) {
    try {
        const { date, time } = await req.json(); // קריאה לנתונים מה-body ולא מה-URL
        const timeWithZone = time + ':00+02'; // פורמט HH:MM:SS+timeZone

        // console.log('making-appointment - Date:', date, 'Time:', timeWithZone);

        const unlockTimeFormatted = getFutureTimeFormatted(3);

        const { data, error } = await supabase
            .from('calendar')
            .update({
                locked: true,
                unlock_time: unlockTimeFormatted // שולח את השעה אחרי הוספת 3 דקות
            })
            .eq('date', date)
            .eq('time', timeWithZone)
            .eq('available', true) // אם התור זמין
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
