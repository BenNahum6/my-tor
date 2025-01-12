import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseAnonserviceKey = process.env.NEXT_PUBLIC_SERVICE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonserviceKey);

/*Check if the database connection exists*/
const fetchAppointments = async () => {
    try {
        const { data, error } = await supabase
            .from('calendar')
            .select('*');

        if (error) {
            console.error('Error fetching generate-schedule:', error.message); // Show the error message with details
            return;
        }
        console.log('Appointments fetched successfully:', data);
    } catch (err) {
        console.error('Unexpected error:', err.message); // Handling unexpected errors
    }
};

fetchAppointments();