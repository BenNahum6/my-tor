import { supabase } from './supabase';

export const deleteAppointment = async () => {
    try {
        const { data, error } = await supabase
            .from('calendar') // שם הטבלה
            .delete()
            .match(appointmentToDelete);

        if (error) {
            console.error('Error deleting appointment:', error.message);
        } else if (data.length === 0) {
            console.log('No appointment found with the provided details.');
        } else {
            console.log('Appointment deleted successfully:', data);
        }
    } catch (err) {
        console.error('Unexpected error:', err.message);
    }
};

// קריאה לדוגמה לפונקציה
const appointmentToDelete = {
    firstName: 'ben',
    lastName: 'aaaaaaaaa',
    phoneNumber: '0547654321',
};