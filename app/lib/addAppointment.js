import { supabase } from './supabase';

export const addAppointment = async () => {
    const { data, error } = await supabase
        .from('calendar') // Table name
        .insert([newAppointment]);

    if (error) {
        console.error('Error adding appointment:', error);
    } else {
        console.log('Appointment added successfully:', data);
    }
};

const newAppointment = {
    firstName: 'shay',
    lastName: 'lip',
    phoneNumber: '05',
    date: '2025-01-10',
    time: '14:30'
};