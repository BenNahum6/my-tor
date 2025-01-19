import { supabase } from '@/app/lib/supabase';

export async function GET(req) {
    try {
        // Getting the parameters from the query string
        const { searchParams } = new URL(req.url);
        const date = searchParams.get('date');
        const time = searchParams.get('time')+':00+02'; // Format HH:MM:SS+timeZone


        console.log('making-appointment - Date:', date, 'Time:', time);

        // Calling Supabase to check if there is an available appointment on the given day and time
        const { data, error } = await supabase
            .from('calendar')
            .select('date, time, available')
            .eq('date', date)
            .eq('time', time)
            .eq('available', true);

        console.log('making-appointment - Data received from Supabase:', data);

        if (error) {
            console.error('Error fetching available appointments:', error);
            return new Response(
                JSON.stringify({ success: false, error: 'Error fetching appointments' }),
                { status: 500 }
            );
        }

        // If there is an available appointment on the day and time, return true
        if (data && data.length > 0) {
            return new Response(
                JSON.stringify({ success: true, available: true }),
                { status: 200 }
            );
        }

        // If no queue is available, return false.
        return new Response(
            JSON.stringify({ success: true, available: false }),
            { status: 200 }
        );

    } catch (error) {
        console.error('API route error:', error);
        return new Response(
            JSON.stringify({ success: false, error: 'Error processing the request' }),
            { status: 500 }
        );
    }
}
