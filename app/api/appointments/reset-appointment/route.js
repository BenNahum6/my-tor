import { supabase } from '@/app/lib/supabase';

export async function POST(req) {
    try {
        const { date, time } = await req.json(); // קריאה לנתונים מה-body ולא מה-URL
        const timeWithZone = time + ':00+02'; // פורמט HH:MM:SS+timeZone

        console.log('making-appointment - Date:', date, 'Time:', timeWithZone);

        // עדכון הנתונים לשדות הדפולטים
        const { data, error } = await supabase
            .from('calendar')
            .update({
                locked: false, // מאפס את ה-"locked" לשדה הדפולטי (אם הוא לא היה true קודם)
                available: true, // מאפס את ה-"available" לערך הדפולטי (אם הוא לא היה true קודם)
                firstName: null, // מאפס את השם לפריט null או הערך הדפולטי שלך
                lastName: null,  // מאפס את שם המשפחה לפריט null או הערך הדפולטי שלך
                phoneNumber: null,     // מאפס את מספר הטלפון או כל שדה אחר שיש לך בטבלה
            })
            .eq('date', date)
            .eq('time', timeWithZone)
            .select('*'); // הוצאה של כל הנתונים הרלוונטיים

        if (error) {
            console.error('Error resetting appointment:', error);
            return new Response(
                JSON.stringify({ success: false, error: 'Error resetting appointment' }),
                { status: 500 }
            );
        }

        if (data && data.length > 0) {
            return new Response(
                JSON.stringify({ success: true, reset: true, data }),
                { status: 200 }
            );
        }

        return new Response(
            JSON.stringify({ success: true, reset: false, message: 'Appointment is not available' }),
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
