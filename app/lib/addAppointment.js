import { supabase } from './supabase';

const addAppointment = async (appointmentData) => {
    const { data, error } = await supabase
        .from('calendar') // שם הטבלה
        .insert([appointmentData]); // נתוני הפגישה להוספה

    if (error) {
        console.error('Error adding appointment:', error);
    } else {
        console.log('Appointment added successfully:', data);
    }
};

// קריאה לדוגמה לפונקציה
const newAppointment = {
    title: 'Dentist Appointment',
    date: '2025-01-10',
    time: '14:30',
    location: 'Dental Clinic',
    description: 'Routine check-up',
};

addAppointment(newAppointment);
