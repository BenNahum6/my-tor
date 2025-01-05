import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// const fetchAppointments = async () => {
//     try {
//         const { data, error } = await supabase
//             .from('calendar')
//             .select('*');
//
//         if (error) {
//             console.error('Error fetching appointments:', error.message); // הצגת הודעת השגיאה עם פרטים
//             return;
//         }
//         console.log('Appointments fetched successfully:', data);
//     } catch (err) {
//         console.error('Unexpected error:', err.message); // טיפול בשגיאות לא צפויות
//     }
// };
//
// fetchAppointments();