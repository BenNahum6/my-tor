import { supabase } from '@/app/lib/supabase';

export async function POST(req) {
    try {
        const { slug, date, time } = await req.json();
        const timeWithZone = time + ':00+02';

        console.log('making-appointment - Date:', date, 'Time:', timeWithZone);

        const { data, error } = await supabase
            .from(slug)
            .update({
                locked: false,
                available: true,
                firstName: null,
                lastName: null,
                phoneNumber: null,
                unlock_time: null,
            })
            .eq('date', date)
            .eq('time', timeWithZone)
            .select('*');

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
