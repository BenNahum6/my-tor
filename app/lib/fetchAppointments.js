import { supabase } from './supabase';

export const fetchAppointments = async () => {
    const { data, error } = await supabase
        .from('calendar')
        .select('*');

    if (error) {
        console.error('Error fetching appointments:', error);
    } else {
        console.log('Appointments:', data);
    }
};