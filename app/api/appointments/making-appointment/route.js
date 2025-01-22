// import { supabase } from '@/app/lib/supabase';
//
// export async function GET(req) {
//     try {
//         // Getting the parameters from the query string
//         const { searchParams } = new URL(req.url);
//         const date = searchParams.get('date');
//         const time = searchParams.get('time')+':00+02'; // Format HH:MM:SS+timeZone
//
//
//         console.log('making-appointment - Date:', date, 'Time:', time);
//
//         // Calling Supabase to check if there is an available appointment on the given day and time
//         const { data, error } = await supabase
//             .from('calendar')
//             .select('date, time, available')
//             .eq('date', date)
//             .eq('time', time)
//             .eq('available', true);
//
//         console.log('making-appointment - Data received from Supabase:', data);
//
//         if (error) {
//             console.error('Error fetching available appointments:', error);
//             return new Response(
//                 JSON.stringify({ success: false, error: 'Error fetching appointments' }),
//                 { status: 500 }
//             );
//         }
//
//         // If there is an available appointment on the day and time, return true
//         if (data && data.length > 0) {
//             return new Response(
//                 JSON.stringify({ success: true, available: true }),
//                 { status: 200 }
//             );
//         }
//
//         // If no queue is available, return false.
//         return new Response(
//             JSON.stringify({ success: true, available: false }),
//             { status: 200 }
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


// import { supabase } from '@/app/lib/supabase';
// export async function POST(req) {
//     try {
//         const { searchParams } = new URL(req.url);
//         const date = searchParams.get('date');
//         const time = searchParams.get('time') + ':00+02'; // פורמט HH:MM:SS+timeZone
//
//         console.log('making-appointment - Date:', date, 'Time:', time);
//
//         // קריאה ל-Supabase לנעילת תור אם זמין
//         const { data, error } = await supabase
//             .from('calendar')
//             .update({ locked: true }) // עדכון שדה locked ל-true ו-locked_until
//             .eq('date', date)
//             .eq('time', time)
//             .eq('available', true) // תנאי שהתור עדיין זמין
//             .eq('locked', false)
//             .select(); // החזרת הנתונים לאחר העדכון
//
//         console.log('making-appointment - Data received from Supabase:', data); //delete
//
//         if (error) {
//             console.error('Error locking appointment:', error);
//             return new Response(
//                 JSON.stringify({ success: false, error: 'Error locking appointment' }),
//                 { status: 500 }
//             );
//         }
//
//         // בדיקה אם התור ננעל בהצלחה
//         if (data && data.length > 0) {
//             return new Response(
//                 JSON.stringify({ success: true, locked: true }),
//                 { status: 200 }
//             );
//         }
//
//         // אם התור לא פנוי או ננעל קודם
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
