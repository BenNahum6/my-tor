import { supabase } from './supabase';

const addAppointment = async () => {
    const { data, error } = await supabase
        .from('calendar') // שם הטבלה
        .insert([newAppointment]); // נתוני הפגישה להוספה

    if (error) {
        console.error('Error adding appointment:', error);
    } else {
        console.log('Appointment added successfully:', data);
    }
};

// קריאה לדוגמה לפונקציה
const newAppointment = {
    firstName: 'shay',
    lastName: 'lip',
    phoneNumber: '0547654321',
    date: '2025-01-10',
    time: '14:30'
};

addAppointment();