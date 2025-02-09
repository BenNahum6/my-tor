import { supabase } from '@/app/lib/supabase';

export async function POST(req) {
    try {
        const { slug , date, time, firstName, lastName, phone } = await req.json(); // Reading data from the body
        const timeWithZone = time + ':00+02'; // HH:MM:SS+timeZone

        const { data, error } = await supabase
            .from(slug)
            .update({
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phone,
                available: false,
                locked: true,
            })
            .eq('date', date)
            .eq('time', timeWithZone)
            .select('*');

        // console.log("Updated information: ",data);

        if (error) {
            console.error('Error making appointment:', error);
            return new Response(
                JSON.stringify({ success: false, error: 'Error making appointment' }),
                { status: 500 }
            );
        }

        if (data && data.length > 0) {
            return new Response(
                JSON.stringify({ success: true, appointmentCreated: true, data }),
                { status: 200 }
            );
        }

        return new Response(
            JSON.stringify({ success: false, message: 'Appointment not available' }),
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
